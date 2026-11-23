// // import { NextRequest, NextResponse } from "next/server";
// // import { headers } from "next/headers";
// // import { getServerSession } from "@/lib/get-session";

// // export async function POST(req: NextRequest) {
// //     try {
// //         const session = await getServerSession();
// //         const user = session?.user as {
// //             id?: string;
// //             email?: string;
// //             name?: string;
// //             role?: string;
// //             plan?: string;
// //         } | undefined;

// //         if (!user || !user.id) {
// //             return NextResponse.json(
// //                 { message: "Please login first to subscribe" },
// //                 { status: 401 }
// //             );
// //         }

// //         // Retrieve verified role from authenticated session (managed securely by Better Auth)
// //         const role = (user.role || "student").toLowerCase();
// //         const isTutor = role === "tutor";

// //         // Role-based pricing: Tutor $15/mo, Student $10/mo
// //         const amountInDollars = isTutor ? 15 : 10;
// //         const amountInCents = amountInDollars * 100;
// //         const planName = isTutor ? "MentorLagbe Tutor Pro Plan" : "MentorLagbe Student Pro Plan";

// //         const headersList = await headers();
// //         const origin = headersList.get("origin") || process.env.BETTER_AUTH_URL || "http://localhost:3000";

// //         const checkoutSession = await stripe.checkout.sessions.create({
// //             mode: "subscription",
// //             customer_email: user.email,
// //             line_items: [
// //                 {
// //                     price_data: {
// //                         currency: "usd",
// //                         product_data: {
// //                             name: planName,
// //                             description: isTutor
// //                                 ? "Tutor Pro Subscription - Unlimited listings, verified badge, and priority placement ($15/month)"
// //                                 : "Student Pro Subscription - Unlimited applications, bookmarks, and priority review ($10/month)",
// //                         },
// //                         unit_amount: amountInCents,
// //                         recurring: {
// //                             interval: "month",
// //                         },
// //                     },
// //                     quantity: 1,
// //                 },
// //             ],
// //             metadata: {
// //                 userId: user.id,
// //                 userEmail: user.email || "",
// //                 userName: user.name || "",
// //                 userRole: isTutor ? "tutor" : "student",
// //                 role: isTutor ? "tutor" : "student",
// //                 plan: "pro",
// //                 planName,
// //                 amount: amountInDollars.toString(),
// //             },
// //             success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
// //             cancel_url: `${origin}/pricing?canceled=true`,
// //         });

// //         // If the request was made via fetch/AJAX (e.g., from Pricing page button), return JSON
// //         const contentType = req.headers.get("content-type") || "";
// //         const accept = req.headers.get("accept") || "";

// //         if (contentType.includes("application/json") || accept.includes("application/json")) {
// //             return NextResponse.json({ url: checkoutSession.url });
// //         }

// //         // Otherwise (e.g. form submission), redirect the browser
// //         return NextResponse.redirect(checkoutSession.url!, 303);
// //     } catch (err) {
// //         console.error("Stripe Checkout Error:", err);
// //         const error = err instanceof Error ? err : new Error(String(err));
// //         return NextResponse.json(
// //             { error: error.message },
// //             { status: 500 }
// //         );
// //     }
// // }



// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '@/lib/stripe';
// import { getServerSession } from '@/lib/get-session';

// export async function POST() {
//     try {
//         const UserSession = await getServerSession();
//         const user = UserSession?.user as {
//             id?: string;
//             email?: string;
//             name?: string;
//             role?: string;
//             plan?: string;
//         } | undefined;

//         const isTutor = (user?.role || 'student').toLowerCase() === 'tutor';
//         const amountInDollars = isTutor ? 15 : 10;
//         const amountInCents = amountInDollars * 100;
//         const planName = isTutor
//             ? 'MentorLagbe Tutor Pro Plan'
//             : 'MentorLagbe Student Pro Plan';

//         const headersList = await headers()
//         const origin = headersList.get('origin')

//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create({
//             mode: 'subscription',
//             customer_email: user?.email,
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "usd",
//                         product_data: {
//                             name: planName,
//                             description: isTutor
//                                 ? "Tutor Pro Subscription - Unlimited listings, verified badge, and priority placement ($15/month)"
//                                 : "Student Pro Subscription - Unlimited applications, bookmarks, and priority review ($10/month)",
//                         },
//                         unit_amount: amountInCents,
//                         recurring: {
//                             interval: "month",
//                         },
//                     },
//                     quantity: 1,
//                 },
//             ],
//             metadata: {
//                 userId: user?.id || "",
//                 userEmail: user?.email || "",
//                 userName: user?.name || "",
//                 userRole: isTutor ? "tutor" : "student",
//                 role: isTutor ? "tutor" : "student",
//                 plan: "pro",
//                 planName,
//                 amount: amountInDollars.toString(),
//             },

//             success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
//             // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
//             integration_identifier: 'mentorLagbe_web_001',
//         });
//         return NextResponse.redirect(session.url as string, 303)
//     } catch (err) {
//         const error = err instanceof Error ? err : new Error(String(err));
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
        const UserSession = await getServerSession();

        const user = UserSession?.user as {
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
                    message: "Please login first to subscribe",
                },
                { status: 401 }
            );
        }

        const isTutor =
            (user.role || "student").toLowerCase() === "tutor";

        const amountInDollars = isTutor ? 15 : 10;
        const amountInCents = amountInDollars * 100;

        const planName = isTutor
            ? "MentorLagbe Tutor Pro Plan"
            : "MentorLagbe Student Pro Plan";

        const headersList = await headers();

        const origin = headersList.get("origin") || process.env.BETTER_AUTH_URL || "http://localhost:3000";

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
                userEmail: user.email || "",
                userName: user.name || "",
                userRole: isTutor ? "tutor" : "student",
                role: isTutor ? "tutor" : "student",
                plan: "pro",
                planName,
                amount: amountInDollars.toString(),
            },

            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${origin}/pricing?canceled=true`,

            integration_identifier: "mentorLagbe_web_001",
        });

        // Return JSON instead of redirect
        return NextResponse.json({
            success: true,
            url: session.url,
        });

    } catch (err) {
        console.error("Stripe Checkout Error:", err);

        const error =
            err instanceof Error ? err : new Error(String(err));

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}