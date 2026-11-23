
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Power, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { ITuition } from "@/types/tuitions/tuitions";
import { toggleTuitionStatus } from "@/lib/api/tuitions/tuitions-api";
import { toast } from "@/components/ui/toast";

interface ToggleTuitionProps {
    item: ITuition;
}

const ToggleTuition = ({ item }: ToggleTuitionProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    const nextStatus = !item.isActive;

    const handleToggle = async () => {
        try {
            setUpdating(true);

            const result = await toggleTuitionStatus(
                item._id,
                nextStatus
            );

            console.log("Toggle API response:", result);

            if (!result.success) {
                throw new Error(
                    result.message || "Failed to update tuition status"
                );
            }

            toast.add({
                title: "Success",
                description: "Tuition status updated successfully.",
            });

            setOpen(false);

            router.refresh();

        } catch (error) {
            console.error("Toggle tuition error:", error);

            toast.add({
                title: "error",
                description: "Failed to update tuition status"
            })
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className={
                    item.isActive
                        ? "border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                        : "border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                }
            >
                <Power className="size-3.5" />

                {item.isActive ? "Deactivate" : "Activate"}
            </Button>

            {/* Confirmation Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">

                    <DialogHeader>
                        <div
                            className={`mb-3 flex size-12 items-center justify-center rounded-full ${item.isActive
                                ? "bg-orange-100 text-orange-600"
                                : "bg-green-100 text-green-600"
                                }`}
                        >
                            <Power className="size-6" />
                        </div>

                        <DialogTitle className="text-lg font-bold">
                            {item.isActive
                                ? "Deactivate Tuition?"
                                : "Activate Tuition?"}
                        </DialogTitle>

                        <DialogDescription>
                            {item.isActive
                                ? "Are you sure you want to deactivate this tuition?"
                                : "Are you sure you want to activate this tuition?"}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Tuition Information */}
                    <div className="rounded-lg border bg-muted/40 p-3">
                        <p className="text-sm font-semibold">
                            {item.title}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            {item.subject} · {item.classLevel}
                        </p>

                        <p className="mt-2 text-xs">
                            Current status:{" "}
                            <span
                                className={
                                    item.isActive
                                        ? "font-semibold text-green-600"
                                        : "font-semibold text-red-600"
                                }
                            >
                                {item.isActive ? "Active" : "Inactive"}
                            </span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-3">

                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={updating}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleToggle}
                            disabled={updating}
                            className={
                                item.isActive
                                    ? "bg-orange-600 text-white hover:bg-orange-700"
                                    : "bg-green-600 text-white hover:bg-green-700"
                            }
                        >
                            {updating ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                item.isActive
                                    ? "Confirm Deactivate"
                                    : "Confirm Activate"
                            )}
                        </Button>

                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
};

export default ToggleTuition;