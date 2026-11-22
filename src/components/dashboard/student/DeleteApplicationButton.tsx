"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteApplication } from "@/lib/api/students/applications";
import { toast } from "@/components/ui/toast";

interface Props {
    applicationId: string;
}

export default function DeleteApplicationButton({
    applicationId,
}: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            await deleteApplication(applicationId);

            toast.add({
                title: "success",
                description: "Application deleted successfully!"
            })

            router.refresh();
        } catch (error) {
            console.error("Failed to delete application:", error);
            toast.add({
                title: "error",
                description: "Failed to delete application!"
            })
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            <Trash2 className="mr-2 size-4" />
            {isDeleting ? "Deleting..." : "Delete"}
        </Button>
    );
}