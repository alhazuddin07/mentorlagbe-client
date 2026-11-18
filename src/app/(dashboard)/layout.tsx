export const instant = false;
import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/dashboard/DashboardSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { isUserRole, type UserRole } from "@/types/sidebar";

const DashboardContent = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/sign-in");
    }

    const roleValue = (session.user as { role?: unknown }).role;
    const role: UserRole = isUserRole(roleValue) ? roleValue : "student";

    const roleBadgeVariant =
        role === "admin"
            ? "destructive"
            : role === "tutor"
                ? "default"
                : "secondary";

    return (
        <SidebarProvider>
            <AppSidebar
                initialRole={role}
                initialUser={{
                    name: session.user.name,
                    email: session.user.email,
                    image: session.user.image,
                    role: role,
                }}
            />

            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <span className="text-sm font-medium">Dashboard</span>
                        <span className="text-muted-foreground">/</span>
                        <Badge variant={roleBadgeVariant} className="capitalize">
                            {role}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Back to Website
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

const DashboardLoading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-muted-foreground">
                Loading dashboard...
            </p>
        </div>
    );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent>{children}</DashboardContent>
        </Suspense>
    );
}
