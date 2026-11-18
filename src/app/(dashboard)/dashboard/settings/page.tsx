import { Lock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardSettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your account security, notifications, and personal preferences.
                </p>
            </div>

            <div className="rounded-xl border bg-card shadow-xs p-6 space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <Lock className="size-5 text-primary" />
                    <div>
                        <h2 className="text-base font-semibold text-foreground">Security & Password</h2>
                        <p className="text-xs text-muted-foreground">Update your password to keep your account secure</p>
                    </div>
                </div>

                <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <Label htmlFor="current-pass">Current Password</Label>
                        <Input id="current-pass" type="password" placeholder="••••••••" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-pass">New Password</Label>
                        <Input id="new-pass" type="password" placeholder="At least 8 characters" />
                    </div>

                    <Button size="sm">
                        Update Password
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border bg-card shadow-xs p-6 space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <Bell className="size-5 text-primary" />
                    <div>
                        <h2 className="text-base font-semibold text-foreground">Notifications</h2>
                        <p className="text-xs text-muted-foreground">Configure email alerts and message notifications</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-border text-primary" />
                        <span>Email notifications for new tuition applications & replies</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-border text-primary" />
                        <span>Instant alerts for new chat messages</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="rounded border-border text-primary" />
                        <span>Weekly digest of new tuition posts in your preferred subjects</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
