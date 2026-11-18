"use client";

import { useState } from "react";
import { IUser } from "@/types/user";
import { updateUserStatus } from "@/lib/api/users/users-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Props {
    user: IUser;
}

export default function ManageUsers({ user }: Props) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(user.status);
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const handleStatusChange = async () => {
        const newStatus = status === "active" ? "inactive" : "active";

        setIsUpdating(true);

        try {
            await updateUserStatus(user.id, newStatus);

            router.refresh();
            setStatus(newStatus);
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => setOpen(true)}
            >
                Manage
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Manage User</DialogTitle>
                        <DialogDescription>
                            Manage this user&apos;s account status.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span>Current Status</span>
                            <Badge variant="outline" className="capitalize">
                                {status}
                            </Badge>
                        </div>

                        <Button
                            className="w-full"
                            disabled={isUpdating}
                            onClick={handleStatusChange}
                        >
                            {isUpdating
                                ? "Updating..."
                                : status === "active"
                                    ? "Deactivate User"
                                    : "Activate User"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}