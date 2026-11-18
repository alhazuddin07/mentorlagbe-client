
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TuitionActionsProps {
    tuitionId: string;
}

export default function TuitionActions({ tuitionId }: TuitionActionsProps) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const updateStatus = async (approvalStatus: "approved" | "rejected") => {
        setError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tuitions/${tuitionId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ approvalStatus }),
                }
            );

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to update tuition status"
                );
            }

            startTransition(() => {
                router.refresh();
            });

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    className="flex-1 gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
                    disabled={isPending}
                    onClick={() => updateStatus("approved")}
                >
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Check className="size-4" />
                    )}
                    Approve
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    disabled={isPending}
                    onClick={() => updateStatus("rejected")}
                >
                    <X className="size-4" />
                    Reject
                </Button>
            </div>

            {error && (
                <p className="text-xs text-rose-600">
                    {error}
                </p>
            )}
        </div>
    );
}