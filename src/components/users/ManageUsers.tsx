
"use client";

import { useState } from "react";
import { IUser } from "@/types/user";
import {
    updateUserRole,
    updateUserStatus,
} from "@/lib/api/users/users-api";

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
import { toast } from "../ui/toast";

interface Props {
    user: IUser;
}

export default function ManageUsers({ user }: Props) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(user.status);
    const [role, setRole] = useState(user.role);
    const [isUpdating, setIsUpdating] = useState(false);

    const router = useRouter();

    // Update User Status
    const handleStatusChange = async () => {
        const newStatus =
            status === "active" ? "inactive" : "active";

        setIsUpdating(true);

        try {
            const result = await updateUserStatus(user.id, newStatus);

            if (result.success === false) {
                throw new Error(result.message || "Failed to update status");
            }

            setStatus(newStatus);
            setOpen(false);
            router.refresh();

        } catch (error) {
            console.error("Status update error:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Update User Role
    const handleRoleChange = async ( newRole: "admin" | "student" | "tutor" ) => {
        setIsUpdating(true);

        try {
            const result = await updateUserRole(user.id, newRole);

            if (!result.success) {
                throw new Error(result.message || "Failed to update role");
            }

            setRole(newRole);
            setOpen(false);
            router.refresh();

            toast.add({
                title: "Role Updated",
                description: `User role changed to ${newRole} successfully.`,
                type: "success",
            });

        } catch (error) {
            console.error("Role update error:", error);

            toast.add({
                title: "Update Failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to update user role.",
                type: "error",
            });

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
                <DialogContent className="sm:max-w-md">

                    <DialogHeader>
                        <DialogTitle>Manage User</DialogTitle>

                        <DialogDescription>
                            Manage this user&apos;s account status and role.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">

                        {/* User Information */}
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>

                        {/* User Status */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Account Status
                                </span>

                                <Badge
                                    variant="outline"
                                    className="capitalize"
                                >
                                    {status}
                                </Badge>
                            </div>

                            <Button
                                className="w-full"
                                variant={status === "active" ? "destructive" : "default"}
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

                        {/* User Role */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    User Role
                                </span>

                                <Badge
                                    variant="outline"
                                    className="capitalize"
                                >
                                    {role}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    size="sm"
                                    variant={role === "student" ? "default" : "outline"}
                                    disabled={isUpdating || role === "student"}
                                    onClick={() => handleRoleChange("student")}
                                >
                                    Student
                                </Button>

                                <Button
                                    size="sm"
                                    variant={role === "tutor" ? "default" : "outline"}
                                    disabled={isUpdating || role === "tutor"}
                                    onClick={() => handleRoleChange("tutor")}
                                >
                                    Tutor
                                </Button>

                                <Button
                                    size="sm"
                                    variant={role === "admin" ? "default" : "outline"}
                                    disabled={isUpdating || role === "admin"}
                                    onClick={() => handleRoleChange("admin")}
                                >
                                    Admin
                                </Button>
                            </div>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}