import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getUser } from "@/lib/api/users/users-api";
import ManageUsers from "@/components/users/ManageUsers";
import { IUser } from "@/types/user";



export default async function AdminUsersPage() {

    const users: IUser[] = await getUser();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
                    <p className="text-sm text-muted-foreground">
                        View, monitor, and regulate platform members and roles.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="size-5 text-primary" />
                        <span className="font-semibold text-sm">Platform Members</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {users.length} Registered Accounts
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b text-xs font-semibold uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3.5">User</th>
                                <th className="px-6 py-3.5">Assigned Role</th>
                                <th className="px-6 py-3.5">Activity</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5">Joined</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((u: IUser) => (
                                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground">{u.name}</div>
                                        <div className="text-xs text-muted-foreground">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={
                                                u.role === "admin"
                                                    ? "destructive"
                                                    : u.role === "tutor"
                                                        ? "default"
                                                        : "secondary"
                                            }
                                            className="capitalize text-xs font-medium"
                                        >
                                            {u.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {u.role === "tutor"
                                            ? `${u.tuitionsCount ?? 0} Tuitions Posted`
                                            : u.role === "student"
                                                ? `${u.tuitionsCount ?? 0} Applications`
                                                : "System Admin"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={u.status === "active" ? "success" : "secondary"}
                                            className="text-xs capitalize"
                                        >
                                            {u.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {/* <Button size="sm" variant="outline" className="text-xs">
                                            Manage
                                        </Button> */}
                                        <ManageUsers user={u} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

