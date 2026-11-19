"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/lib/api/students/applications";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


interface Props {
    applicationId: string;
    status: "Awaiting Decision" | "Accepted" | "Declined";
}

const UpdateApplicationStatus = ({ applicationId, status }: Props) => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleStatusUpdate = async ( newStatus: "Accepted" | "Declined" ) => {
        try {
            setIsPending(true);

            await updateApplicationStatus(applicationId, newStatus);
            
            router.refresh()
            toast.add({
                title: "success",
                description: `Application ${newStatus.toLowerCase()} successfully!`
            });

        } catch (error) {
            toast.add({
                title: "error",
                description: error instanceof Error ? error.message : "Something went wrong"
            });
        } finally {
            setIsPending(false);
        }
    };

    if (status !== "Awaiting Decision") return null;

    return (
        <>
            <Button
                size="sm"
                disabled={isPending}
                onClick={() => handleStatusUpdate("Accepted")}
            >
                <Check className="size-3.5" />
                Accept
            </Button>

            <Button
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() => handleStatusUpdate("Declined")}
            >
                <X className="size-3.5" />
                Decline
            </Button>
        </>
    );
};

export default UpdateApplicationStatus;