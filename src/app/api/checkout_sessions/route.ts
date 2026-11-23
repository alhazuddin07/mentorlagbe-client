
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/get-session";

export async function POST() {
    try {
        const userSession = await getServerSession();

        const user = userSession?.user as {
            id?: string;
            email?: string;
            name?: string;
            role?: string;
            plan?: string;
        } | undefined;

        // Check authentication
        if (!user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please sign in to continue",
                },
                { status: 401 }
            );
        }

        // Check user role
        const role = (user.role || "student").toLowerCase();

        if (!["student", "tutor"].includes(role)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid user role",
                },
                { status: 403 }
            );
        }

        // Set subscription price according to role
        const isTutor = role === "tutor";

        const amountInDollars = isTutor ? 15 : 10;
        const amountInCents = amountInDollars * 100;

        const planName = isTutor
            ? "MentorLagbe Tutor Pro Plan"
            : "MentorLagbe Student Pro Plan";

        const headersList = await headers();

        const origin =
            headersList.get("origin") ||
            process.env.BETTER_AUTH_URL ||
            "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",

            customer_email: user.email,

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: planName,
                            description: isTutor
                                ? "Tutor Pro Subscription - $15/month"
                                : "Student Pro Subscription - $10/month",
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
                userEmail: user.email || "",
                userName: user.name || "",
                userRole: role,
                role,
                plan: "pro",
                planName,
                amount: amountInDollars.toString(),
            },

            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${origin}/pricing?canceled=true`,
        });

        if (!session.url) {
            throw new Error("Stripe checkout URL not found");
        }

        // Return JSON instead of redirect
        return NextResponse.json({
            success: true,
            url: session.url,
        });

    } catch (err) {
        console.error("Stripe Checkout Error:", err);

        return NextResponse.json(
            {
                success: false,
                message:
                    err instanceof Error
                        ? err.message
                        : "Failed to create checkout session",
            },
            { status: 500 }
        );
    }
}