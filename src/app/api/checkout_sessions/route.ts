import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/get-session";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json(
                { message: "Please login first to subscribe" },
                { status: 401 }
            );
        }

        // Fetch actual user role from the database to prevent client spoofing
        const db = await getDb();
        const userCol = db.collection("user");

        let userDoc = null;
        if (ObjectId.isValid(user.id)) {
            userDoc = await userCol.findOne({ _id: new ObjectId(user.id) });
        }
        if (!userDoc && user.email) {
            userDoc = await userCol.findOne({ email: user.email.toLowerCase() });
        }

        const role = (userDoc?.role || user.role || "student").toLowerCase();
        const isTutor = role === "tutor";

        // Role-based pricing: Tutor $15/mo, Student $10/mo
        const amountInDollars = isTutor ? 15 : 10;
        const amountInCents = amountInDollars * 100;
        const planName = isTutor ? "MentorLagbe Tutor Pro Plan" : "MentorLagbe Student Pro Plan";

        const headersList = await headers();
        const origin = headersList.get("origin") || process.env.BETTER_AUTH_URL || "http://localhost:3000";

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: userDoc?.email || user.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: planName,
                            description: isTutor
                                ? "Tutor Pro Subscription - Unlimited listings, verified badge, and priority placement ($15/month)"
                                : "Student Pro Subscription - Unlimited applications, bookmarks, and priority review ($10/month)",
                        },
                        unit_amount: amountInCents,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id,
                userEmail: userDoc?.email || user.email,
                userName: userDoc?.name || user.name || "",
                userRole: isTutor ? "tutor" : "student",
                role: isTutor ? "tutor" : "student",
                plan: "pro",
                planName,
                amount: amountInDollars.toString(),
            },
            subscription_data: {
                metadata: {
                    userId: user.id,
                    userEmail: userDoc?.email || user.email,
                    userRole: isTutor ? "tutor" : "student",
                    role: isTutor ? "tutor" : "student",
                    plan: "pro",
                },
            },
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pricing?canceled=true`,
        });

        // If the request was made via fetch/AJAX (e.g., from Pricing page button), return JSON
        const contentType = req.headers.get("content-type") || "";
        const accept = req.headers.get("accept") || "";

        if (contentType.includes("application/json") || accept.includes("application/json")) {
            return NextResponse.json({ url: checkoutSession.url });
        }

        // Otherwise (e.g. form submission), redirect the browser
        return NextResponse.redirect(checkoutSession.url!, 303);
    } catch (err) {
        console.error("Stripe Checkout Error:", err);
        const error = err instanceof Error ? err : new Error(String(err));
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
