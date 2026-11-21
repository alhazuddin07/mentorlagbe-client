import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/get-session";


export async function POST() {
    try {
        const session = await getServerSession();
        const user = session?.user;

        if (!user) {
            return NextResponse.json(
                { message: "Please login first" },
                { status: 401 }
            );
        }

        const headersList = await headers();

        const origin = headersList.get("origin");

        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1UdpUgJZn5Vh8IX8Bj5w4WXt",
                    quantity: 1,
                },
            ],

            mode: "payment",

            customer_email: user.email,

            metadata: {
                userId: user.id,
                userName: user.name,
                userRole: user.role || "student",
                planName: "MentorLagbe Pro Plan",
            },

            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${origin}/payment/cancel`,
        });

        // 5. Redirect user to Stripe Checkout
        return NextResponse.redirect(checkoutSession.url!, 303);

    } catch (err) {
        console.error("Checkout Error:", err);

        const error = err instanceof Error ? err : new Error(String(err));

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
