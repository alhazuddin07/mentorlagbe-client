import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const plan = {
    name: "MentorLagbe Pro Plan",
    description: "Access to all features",
    price: "৳1,500",
};

export const metadata = {
    title: "Payment | MentorLagbe",
};

export default function PaymentPage() {
    return (
        <div className="flex-1 bg-background text-foreground">
            <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
                <Link
                    href="/tuitions"
                    className="inline-flex w-fit items-center gap-2 rounded-lg text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                    <ArrowLeft className="size-4" />
                    MentorLagbe
                </Link>

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
                                {plan.price}
                            </p>
                        </div>

                        <div className="my-6 border-t border-border" />

                        <div className="flex items-center justify-between gap-6 text-lg font-semibold">
                            <span>Total</span>
                            <span className="tabular-nums">{plan.price}</span>
                        </div>
                    </section>

                    {/* Payment method */}
                    <section>
                        <h2 className="text-lg font-semibold">Payment method</h2>

                        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3 text-sm font-medium">
                                <CreditCard className="size-4 text-muted-foreground" />
                                Card
                            </div>
                            <p className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                                You&apos;ll be redirected to Stripe&apos;s secure
                                checkout to complete your payment. Card details
                                are never stored on MentorLagbe.
                            </p>
                        </div>

                        <Button
                            type="button"
                            className="mt-6 h-14 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
                        >
                            Pay {plan.price}
                        </Button>

                        <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Powered by Stripe
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
