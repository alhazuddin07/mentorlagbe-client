import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, LayoutDashboard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Payment Cancelled | MentorLagbe",
    description: "Your payment was cancelled. No charges were made to your card.",
};

export default function PaymentCancelPage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-50 to-white px-4 py-16 sm:py-24">
            <div className="mx-auto max-w-xl">
                <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
                    {/* Cancel Icon */}
                    <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-8 ring-rose-50/50">
                        <XCircle className="size-10" />
                    </div>

                    <Badge variant="destructive" className="mb-3 font-medium">
                        Payment Cancelled
                    </Badge>

                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Payment Was Not Completed
                    </h1>

                    <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
                        Your checkout session was cancelled. No charge has been made to your account or payment card.
                    </p>

                    {/* Summary box */}
                    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5 text-left space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Intended Plan</span>
                            <span className="font-semibold text-foreground">MentorLagbe Pro Plan</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-semibold text-foreground">৳2,000 / month</span>
                        </div>
                        <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                            <span className="text-muted-foreground">Status</span>
                            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                                Incomplete / Cancelled
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            nativeButton={false}
                            render={<Link href="/payment" />}
                            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md"
                        >
                            <RefreshCw className="size-4" />
                            Try Payment Again
                        </Button>

                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/dashboard" />}
                            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
                        >
                            <LayoutDashboard className="size-4" />
                            Return to Dashboard
                        </Button>
                    </div>

                    <div className="mt-6">
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="size-3.5" />
                            Compare all pricing plans
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <HelpCircle className="size-3.5" />
                    <span>Having trouble checking out? Feel free to contact our support team.</span>
                </div>
            </div>
        </main>
    );
}
