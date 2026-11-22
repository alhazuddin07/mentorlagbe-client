import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (webhookSecret && signature) {
            event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        } else if (!webhookSecret) {
            // In development / testing environments before STRIPE_WEBHOOK_SECRET is set
            console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not set. Processing event payload directly.");
            event = JSON.parse(rawBody) as Stripe.Event;
        } else {
            return NextResponse.json(
                { error: "Missing stripe-signature header" },
                { status: 400 }
            );
        }
    } catch (err) {
        console.error("[Stripe Webhook] Signature verification failed:", err);
        return NextResponse.json(
            { error: `Webhook signature verification failed: ${err instanceof Error ? err.message : "Unknown error"}` },
            { status: 400 }
        );
    }

    const db = await getDb();
    const userCol = db.collection("user");
    const paymentsCol = db.collection("payments");

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.mode === "subscription") {
                    const metadata = session.metadata || {};
                    const userId = metadata.userId;
                    const email = (session.customer_details?.email || metadata.userEmail || session.customer_email || "").toLowerCase();
                    const userRole = (metadata.userRole || metadata.role || "student").toLowerCase();
                    const userName = metadata.userName || session.customer_details?.name || "";
                    const planName = metadata.planName || (userRole === "tutor" ? "MentorLagbe Tutor Pro Plan" : "MentorLagbe Student Pro Plan");
                    const amount = session.amount_total ? session.amount_total / 100 : (userRole === "tutor" ? 15 : 10);

                    const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
                    const stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
                    const paymentIntentId = typeof session.payment_intent === "string"
                        ? session.payment_intent
                        : session.payment_intent?.id || null;

                    // Idempotency check: prevent duplicate payment records
                    const existing = await paymentsCol.findOne({
                        $or: [
                            { stripeSessionId: session.id },
                            { eventId: event.id },
                        ],
                    });

                    if (!existing) {
                        const paymentDoc = {
                            userId: userId || "",
                            email,
                            role: userRole,
                            plan: "pro",
                            amount,
                            currency: session.currency || "usd",
                            status: "paid",
                            stripeSessionId: session.id,
                            stripeCustomerId: stripeCustomerId || null,
                            stripeSubscriptionId: stripeSubscriptionId || null,
                            paymentIntentId,
                            eventId: event.id,
                            userName,
                            planName,
                            paymentStatus: "pro",
                            paidAt: new Date().toISOString(),
                            createdAt: new Date(),
                        };

                        await paymentsCol.insertOne(paymentDoc);
                    }

                    // Update user plan in DB
                    const filter = userId && ObjectId.isValid(userId)
                        ? { $or: [{ _id: new ObjectId(userId) }, { email }] }
                        : { email };

                    await userCol.updateOne(filter, {
                        $set: {
                            plan: "pro",
                            premium: true,
                            stripeCustomerId: stripeCustomerId || undefined,
                            stripeSubscriptionId: stripeSubscriptionId || undefined,
                            subscriptionStatus: "active",
                            updatedAt: new Date(),
                        },
                    });
                }
                break;
            }

            case "invoice.payment_succeeded": {
                const invoice = event.data.object as Stripe.Invoice;
                const invoiceData = invoice as unknown as { subscription?: string | { id?: string }; payment_intent?: string | { id?: string } };
                const stripeSubscriptionId = typeof invoiceData.subscription === "string"
                    ? invoiceData.subscription
                    : invoiceData.subscription?.id;
                const stripeCustomerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;

                // Handle recurring subscription renewal
                if (invoice.billing_reason === "subscription_cycle" && stripeSubscriptionId) {
                    const existing = await paymentsCol.findOne({
                        $or: [
                            { invoiceId: invoice.id },
                            { eventId: event.id },
                        ],
                    });

                    if (!existing) {
                        const userDoc = await userCol.findOne({
                            $or: [
                                { stripeSubscriptionId },
                                { stripeCustomerId },
                            ],
                        });

                        const userRole = userDoc?.role || "student";
                        const amount = invoice.amount_paid ? invoice.amount_paid / 100 : (userRole === "tutor" ? 15 : 10);
                        const paymentIntentId = typeof invoiceData.payment_intent === "string"
                            ? invoiceData.payment_intent
                            : invoiceData.payment_intent?.id || null;

                        await paymentsCol.insertOne({
                            userId: userDoc?._id?.toString() || "",
                            email: (invoice.customer_email || userDoc?.email || "").toLowerCase(),
                            role: userRole,
                            plan: "pro",
                            amount,
                            currency: invoice.currency || "usd",
                            status: "paid",
                            stripeSessionId: null,
                            stripeCustomerId: stripeCustomerId || null,
                            stripeSubscriptionId,
                            paymentIntentId,
                            invoiceId: invoice.id,
                            eventId: event.id,
                            userName: userDoc?.name || "",
                            planName: userRole === "tutor" ? "MentorLagbe Tutor Pro Plan" : "MentorLagbe Student Pro Plan",
                            paymentStatus: "pro",
                            paidAt: new Date().toISOString(),
                            createdAt: new Date(),
                        });
                    }

                    await userCol.updateOne(
                        {
                            $or: [
                                { stripeSubscriptionId },
                                { stripeCustomerId },
                            ],
                        },
                        {
                            $set: {
                                plan: "pro",
                                premium: true,
                                subscriptionStatus: "active",
                                updatedAt: new Date(),
                            },
                        }
                    );
                }
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                const invoiceData = invoice as unknown as { subscription?: string | { id?: string } };
                const stripeSubscriptionId = typeof invoiceData.subscription === "string"
                    ? invoiceData.subscription
                    : invoiceData.subscription?.id;
                const stripeCustomerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;

                if (stripeSubscriptionId || stripeCustomerId) {
                    await userCol.updateOne(
                        {
                            $or: [
                                { stripeSubscriptionId },
                                { stripeCustomerId },
                            ],
                        },
                        {
                            $set: {
                                subscriptionStatus: "past_due",
                                updatedAt: new Date(),
                            },
                        }
                    );
                }
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const stripeSubscriptionId = subscription.id;
                const stripeCustomerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

                await userCol.updateOne(
                    {
                        $or: [
                            { stripeSubscriptionId },
                            { stripeCustomerId },
                        ],
                    },
                    {
                        $set: {
                            plan: "free",
                            premium: false,
                            subscriptionStatus: "canceled",
                            updatedAt: new Date(),
                        },
                    }
                );
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const stripeSubscriptionId = subscription.id;
                const stripeCustomerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
                const status = subscription.status;

                if (status === "active") {
                    await userCol.updateOne(
                        {
                            $or: [
                                { stripeSubscriptionId },
                                { stripeCustomerId },
                            ],
                        },
                        {
                            $set: {
                                plan: "pro",
                                premium: true,
                                subscriptionStatus: "active",
                                updatedAt: new Date(),
                            },
                        }
                    );
                } else if (status === "canceled" || status === "unpaid") {
                    await userCol.updateOne(
                        {
                            $or: [
                                { stripeSubscriptionId },
                                { stripeCustomerId },
                            ],
                        },
                        {
                            $set: {
                                plan: "free",
                                premium: false,
                                subscriptionStatus: status,
                                updatedAt: new Date(),
                            },
                        }
                    );
                }
                break;
            }

            default:
                break;
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error(`[Stripe Webhook] Error processing event ${event.type}:`, err);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
