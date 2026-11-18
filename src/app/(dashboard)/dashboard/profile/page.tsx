import { getSession } from "@/lib/get-session";
import Image from "next/image";
import { User, Mail, Shield, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function DashboardProfilePage() {
    const session = await getSession();

    const user = session?.user;
    const role = (user as { role?: string } | undefined)?.role ?? "student";
    const plan = (user as { plan?: string } | undefined)?.plan ?? "free";

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Account Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Your personal profile and account credentials.
                </p>
            </div>

            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-primary/20 via-primary/10 to-muted" />

                <div className="px-6 pb-6 pt-0 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
                        <div className="relative size-24 rounded-full border-4 border-background overflow-hidden bg-muted shadow-md">
                            <Image
                                src={user?.image || "/avatar.svg"}
                                alt={user?.name || "User Avatar"}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge
                                variant={
                                    role === "admin"
                                        ? "destructive"
                                        : role === "tutor"
                                        ? "default"
                                        : "secondary"
                                }
                                className="capitalize font-semibold text-xs px-3 py-1"
                            >
                                <Shield className="size-3 mr-1" />
                                {role} Account
                            </Badge>
                            <Badge variant="outline" className="capitalize text-xs px-3 py-1">
                                <Crown className="size-3 mr-1 text-amber-500" />
                                {plan} Plan
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-foreground">
                            {user?.name || "User"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <User className="size-3.5" /> Full Name
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                {user?.name || "Not provided"}
                            </p>
                        </div>

                        <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Mail className="size-3.5" /> Email Address
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                {user?.email || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
