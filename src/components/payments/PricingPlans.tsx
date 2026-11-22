"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BriefcaseBusiness, Check, GraduationCap, Loader2, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";

type Audience = "students" | "tutors";

type Plan = {
    name: string;
    description: string;
    price: string;
    period?: string;
    features: string[];
    cta: string;
    href: string;
    highlighted?: boolean;
};

const plans: Record<Audience, Plan[]> = {
    students: [
        {
            name: "Free",
            description: "Everything a student needs to start finding the right tutor.",
            price: "$0",
            period: "/month",
            features: [
                "Browse all tuition listings",
                "Apply to up to 5 tuitions per month",
                "Bookmark up to 5 tuitions",
                "Standard support",
            ],
            cta: "Start for free",
            href: "/sign-up",
        },
        {
            name: "Pro",
            description: "For students who want to apply without limits and stand out.",
            price: "$10",
            period: "/month",
            features: [
                "Everything in Free",
                "Unlimited tuition applications",
                "Unlimited tuition bookmarks",
                "Priority application review",
                "Verified student badge",
                "Priority support",
            ],
            cta: "Upgrade to Pro",
            href: "#",
            highlighted: true,
        },
    ],
    tutors: [
        {
            name: "Free",
            description: "Everything you need to start teaching and take on students.",
            price: "$0",
            period: "/month",
            features: [
                "Post tuition listings",
                "Receive student applications",
                "Chat with students",
                "Standard support",
            ],
            cta: "Start for free",
            href: "/sign-up",
        },
        {
            name: "Pro",
            description: "For tutors who want maximum visibility and more students.",
            price: "$15",
            period: "/month",
            features: [
                "Everything in Free",
                "Unlimited tuition postings",
                "Featured tuition listings",
                "Verified tutor badge",
                "Applicant insights",
                "Priority support",
            ],
            cta: "Upgrade to Pro",
            href: "#",
            highlighted: true,
        },
    ],
};

const audiences: { id: Audience; label: string; icon: typeof GraduationCap }[] = [
    { id: "students", label: "For Students ($10/mo)", icon: GraduationCap },
    { id: "tutors", label: "For Tutors ($15/mo)", icon: BriefcaseBusiness },
];

export function PricingPlans() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isCanceled = searchParams.get("canceled") === "true";

    const { data: session } = useSession();
    const user = session?.user;
    const userRole = (user?.role || "").toLowerCase();
    const isUserPro = user?.plan === "pro";

    const defaultAudience: Audience = userRole === "tutor" ? "tutors" : "students";
    const [audience, setAudience] = useState<Audience>(defaultAudience);
    const [isPending, startTransition] = useTransition();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubscribe = async () => {
        if (!user) {
            router.push("/sign-in?callbackUrl=/pricing");
            return;
        }

        setErrorMsg(null);
        startTransition(async () => {
            try {
                const res = await fetch("/api/checkout_sessions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (!res.ok || !data.url) {
                    throw new Error(data.message || data.error || "Failed to create checkout session");
                }

                window.location.href = data.url;
            } catch (err) {
                console.error("Subscription error:", err);
                setErrorMsg(err instanceof Error ? err.message : "Failed to initiate Stripe Checkout");
            }
        });
    };

    return (
        <div>
            {/* Payment Canceled Notice */}
            {isCanceled && (
                <div className="mx-auto mb-8 max-w-2xl flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3.5 text-left">
                    <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    <div>
                        <p className="text-sm font-semibold text-destructive">Payment Cancelled</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                            Your Stripe checkout session was cancelled. No charges were made. You can review the plans below and upgrade at any time.
                        </p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {errorMsg && (
                <div className="mx-auto mb-8 max-w-2xl flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3.5 text-left text-destructive">
                    <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    <p className="text-sm font-medium">{errorMsg}</p>
                </div>
            )}

            {/* Audience toggle */}
            <div
                role="tablist"
                aria-label="Choose your audience"
                className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-muted p-1"
            >
                {audiences.map(({ id, label, icon: Icon }) => {
                    const active = audience === id;

                    return (
                        <button
                            key={id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setAudience(id)}
                            className={cn(
                                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                                active
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="size-4" />
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Plans */}
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
                {plans[audience].map((plan) => {
                    const isProPlan = plan.name === "Pro";
                    const isCurrentPlan = (isProPlan && isUserPro) || (!isProPlan && !!user && !isUserPro);

                    return (
                        <div
                            key={`${audience}-${plan.name}`}
                            className={cn(
                                "relative flex flex-col rounded-2xl border bg-card p-6 sm:p-7 shadow-xs transition-shadow",
                                plan.highlighted &&
                                    "border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/25"
                            )}
                        >
                            {plan.highlighted && (
                                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground tracking-wide">
                                    <Sparkles className="size-3" />
                                    Recommended
                                </span>
                            )}

                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight">{plan.name}</h2>
                                {isCurrentPlan && (
                                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 border border-emerald-500/20">
                                        Current Plan
                                    </span>
                                )}
                            </div>

                            <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                                {plan.description}
                            </p>

                            <div className="mt-6 flex items-baseline gap-1.5">
                                <span className="text-4xl font-extrabold tracking-tight">
                                    {plan.price}
                                </span>
                                {plan.period && (
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {plan.period}
                                    </span>
                                )}
                            </div>

                            <div className="my-6 border-t border-border" />

                            <ul className="flex-1 space-y-3 text-sm leading-relaxed">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-2.5">
                                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {isProPlan ? (
                                <Button
                                    type="button"
                                    onClick={handleSubscribe}
                                    disabled={isPending || isCurrentPlan}
                                    variant={plan.highlighted ? "default" : "outline"}
                                    className={cn(
                                        "mt-8 h-11 w-full justify-center text-sm sm:text-base font-semibold cursor-pointer",
                                        plan.highlighted && "shadow-md shadow-primary/20"
                                    )}
                                >
                                    {isPending ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Loader2 className="size-4 animate-spin" />
                                            Redirecting to Stripe...
                                        </span>
                                    ) : isCurrentPlan ? (
                                        "Plan Active"
                                    ) : (
                                        plan.cta
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    nativeButton={false}
                                    render={<Link href={user ? "/dashboard" : plan.href} />}
                                    variant="outline"
                                    className="mt-8 h-11 w-full justify-center text-sm sm:text-base font-semibold"
                                >
                                    {user ? "View Dashboard" : plan.cta}
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
