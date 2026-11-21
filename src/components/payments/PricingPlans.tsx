"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, Check, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

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
            price: "৳0",
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
            price: "৳2,000",
            period: "/month",
            features: [
                "Everything in Free",
                "Unlimited tuition applications",
                "Unlimited tuition bookmarks",
                "Priority application review",
                "Verified student badge",
                "Priority support",
            ],
            cta: "Go Pro",
            href: "/payment",
            highlighted: true,
        },
    ],
    tutors: [
        {
            name: "Free",
            description: "Everything you need to start teaching and take on students.",
            price: "৳0",
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
            price: "৳2,000",
            period: "/month",
            features: [
                "Everything in Free",
                "Featured tuition listings",
                "Verified tutor badge",
                "Applicant insights",
                "Priority support",
            ],
            cta: "Go Pro",
            href: "/payment",
            highlighted: true,
        },
    ],
};

const audiences: { id: Audience; label: string; icon: typeof GraduationCap }[] = [
    { id: "students", label: "For Students", icon: GraduationCap },
    { id: "tutors", label: "For Tutors", icon: BriefcaseBusiness },
];

function PlanCard({ plan }: { plan: Plan }) {
    return (
        <div
            className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 shadow-xs transition-shadow",
                plan.highlighted &&
                    "border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/25"
            )}
        >
            {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                </span>
            )}

            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="mt-1 min-h-10 text-sm text-muted-foreground">
                {plan.description}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                </span>
                {plan.period && (
                    <span className="text-sm text-muted-foreground">
                        {plan.period}
                    </span>
                )}
            </div>

            <div className="my-6 border-t border-border" />

            <ul className="flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                nativeButton={false}
                render={<Link href={plan.href} />}
                variant={plan.highlighted ? "default" : "outline"}
                className={cn(
                    "mt-8 h-11 w-full justify-center",
                    plan.highlighted && "shadow-md shadow-primary/20"
                )}
            >
                {plan.cta}
            </Button>
        </div>
    );
}

export function PricingPlans() {
    const [audience, setAudience] = useState<Audience>("students");

    return (
        <div>
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
                                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
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
                {plans[audience].map((plan) => (
                    <PlanCard key={`${audience}-${plan.name}`} plan={plan} />
                ))}
            </div>
        </div>
    );
}
