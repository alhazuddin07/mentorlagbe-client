import { ShieldCheck } from "lucide-react";
import { PricingPlans } from "@/components/payments/PricingPlans";

export const metadata = {
    title: "Pricing | MentorLagbe",
    description:
        "Free and Pro plans for students and tutors on MentorLagbe. Upgrade to Pro for unlimited applications, featured listings, and priority support.",
};

export default function PricingPage() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Pricing / Pro Plans
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Plans for students and tutors
                </h1>

                <p className="mt-3 text-base text-muted-foreground">
                    Start free and upgrade to Pro whenever you&apos;re ready.
                    One plan for learning, one for teaching — both secured by
                    Stripe.
                </p>
            </div>

            <div className="mt-10">
                <PricingPlans />
            </div>

            <div className="mx-auto mt-12 max-w-4xl border-t border-border pt-6">
                <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                    <ShieldCheck className="size-4 shrink-0 text-primary" />
                    Secure checkout by Stripe · Prices in BDT · Cancel anytime
                </p>
            </div>
        </div>
    );
}