import { ArrowLeft, CreditCard, XCircle, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getServerSession } from "@/lib/get-session";

export async function PaymentContent({ searchParams }: { searchParams: Promise<{ canceled?: string }>}) {
    const { canceled } = await searchParams;
    const session = await getServerSession();
    const userRole = (session?.user?.role || "student").toLowerCase();
    const isTutor = userRole === "tutor";

    const plan = {
        name: isTutor ? "MentorLagbe Tutor Pro Plan" : "MentorLagbe Student Pro Plan",
        description: isTutor
            ? "Unlimited tuition postings, featured tutor listings, applicant insights, and priority support."
            : "Unlimited tuition applications, unlimited bookmarks, priority review, verified badge, and priority support.",
        price: isTutor ? "$15" : "$10",
        period: "/month",
    };

    return (
        <div className="flex-1 bg-background text-foreground">
            <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
                <Link
                    href="/pricing"
                    className="inline-flex w-fit items-center gap-2 rounded-lg text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                    <ArrowLeft className="size-4" />
                    Back to Pricing
                </Link>

                {/* Cancellation notice */}
                {canceled && (
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                        <p className="text-sm text-destructive">
                            Your payment was cancelled. No charge was made. You can choose a plan whenever you&apos;re ready.
                        </p>
                    </div>
                )}

                <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
                    {/* Order summary */}
                    <section>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Order summary
                        </h1>

                        <div className="mt-6 flex items-start justify-between gap-6">
                            <div>
                                <p className="text-lg font-semibold">
                                    {plan.name}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>
                            <p className="text-lg font-semibold tabular-nums">
                                {plan.price}{plan.period}
                            </p>
                        </div>

                        <div className="my-6 border-t border-border" />

                        <div className="flex items-center justify-between gap-6 text-lg font-semibold">
                            <span>Total Due Today</span>
                            <span className="tabular-nums">{plan.price}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Billed monthly until cancelled. Cancel anytime from your account.
                        </p>
                    </section>

                    {/* Payment method */}
                    <section>
                        <h2 className="text-lg font-semibold">Payment method</h2>

                        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3 text-sm font-medium">
                                <CreditCard className="size-4 text-muted-foreground" />
                                Stripe Subscription Checkout
                            </div>
                            <p className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                                You&apos;ll be redirected to Stripe&apos;s secure
                                checkout to activate your monthly subscription. Card details
                                are securely processed by Stripe.
                            </p>
                        </div>

                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <Button
                                    type="submit"
                                    role="link"
                                    className="mt-6 h-14 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 cursor-pointer"
                                >
                                    Subscribe for {plan.price}/month
                                </Button>
                            </section>
                        </form>

                        <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            <ShieldCheck className="size-3.5 text-primary" />
                            Powered by Stripe
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
