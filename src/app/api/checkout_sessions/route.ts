// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '@/lib/stripe';
// import { getServerSession } from '@/lib/get-session';


// export async function POST() {

//     const session = await getServerSession();
//     const user = session?.user;

//     try {
//         const headersList = await headers()
//         const origin = headersList.get('origin')

//         // Create Checkout Sessions from body params.
//         const checkoutSession = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price: 'price_1UdpUgJZn5Vh8IX8Bj5w4WXt',
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             customer_email: user?.email ?? undefined,
//             metadata: {
//                 userId: user?.id ?? null,
//             },
//             success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${origin}/payment?canceled=true`,
//         });
//         return NextResponse.redirect(checkoutSession.url as string, 303)
//     } catch (err) {
//         const error = err instanceof Error ? err : new Error(String(err))
//         return NextResponse.json(
//             { error: error.message },
//             { status: 500 }
//         )
//     }
// }



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
            },

            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${origin}/payment?canceled=true`,
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
