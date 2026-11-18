"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateTuitionStatus } from "@/lib/api/tuitions/tuitions-api";

interface TuitionActionsProps {
    tuitionId: string;
}

export default function TuitionActions({ tuitionId }: TuitionActionsProps) {
    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");

    const handleStatusUpdate = async ( approvalStatus: "approved" | "rejected" ) => {
        setError("");
        setIsUpdating(true);

        try {
            await updateTuitionStatus(tuitionId, approvalStatus);

            router.refresh();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("approved")}
                >
                    {isUpdating ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Check className="size-4" />
                    )}
                    Approve
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("rejected")}
                >
                    <X className="size-4" />
                    Reject
                </Button>
            </div>

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}