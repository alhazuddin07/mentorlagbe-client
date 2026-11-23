
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { ITuition } from "@/types/tuitions/tuitions";
import { deleteTuition } from "@/lib/api/tuitions/tuitions-api";
import { toast } from "@/components/ui/toast";

interface DeleteTuitionProps {
    item: ITuition;
}

const DeleteTuition = ({ item }: DeleteTuitionProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);

            const result = await deleteTuition(item._id);

            console.log("Delete API response:", result);

            if (!result.success) {
                throw new Error(
                    result.message || "Failed to delete tuition"
                );
            }

            toast.add({
                title: "success",
                description: "Tuition deleted successfully!"
            });

            setOpen(false);

            // Refresh tuition list
            router.refresh();

        } catch (error) {
            console.error("Delete tuition error:", error);

            toast.add({
                title: "error",
                description: "Tuition deleted Failed!"
            });

        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            {/* Delete Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
                <Trash2 className="size-3.5" />
                Delete
            </Button>

            {/* Confirmation Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">

                    <DialogHeader>
                        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <Trash2 className="size-6" />
                        </div>

                        <DialogTitle className="text-lg font-bold">
                            Delete Tuition?
                        </DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete this tuition?
                            This action cannot be undone.
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
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-3">

                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={deleting}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="size-4" />
                                    Confirm Delete
                                </>
                            )}
                        </Button>

                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
};

export default DeleteTuition;