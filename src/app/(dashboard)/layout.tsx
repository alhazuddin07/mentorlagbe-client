export const instant = false;
import { Suspense } from "react";
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
import { getServerSession } from "@/lib/get-session";
import { ArrowLeft } from "lucide-react";

const DashboardContent = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession();

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
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft size={18} />
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
        <main className="min-h-screen animate-pulse bg-white">

            {/* Navbar Skeleton */}
            <nav className="flex h-16 items-center justify-between border-b border-purple-100 px-6 md:px-12">
                <div className="h-8 w-36 rounded-lg bg-purple-100" />

                <div className="hidden items-center gap-8 md:flex">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="h-4 w-12 rounded bg-gray-100" />
                    ))}
                </div>

                <div className="flex gap-3">
                    <div className="h-9 w-16 rounded-lg bg-purple-100" />
                    <div className="h-9 w-24 rounded-lg bg-purple-200" />
                </div>
            </nav>

            {/* Hero Section Skeleton */}
            <section className="bg-[#FBF9FF] px-6 py-12 md:px-12">
                <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
                    <div className="space-y-5">
                        <div className="h-7 w-36 rounded-full bg-purple-100" />
                        <div className="space-y-3">
                            <div className="h-10 w-full max-w-md rounded-lg bg-purple-100" />
                            <div className="h-10 w-4/5 rounded-lg bg-purple-100" />
                        </div>
                        <div className="h-4 w-4/5 rounded bg-gray-100" />
                        <div className="h-4 w-3/5 rounded bg-gray-100" />

                        <div className="flex gap-3 pt-2">
                            <div className="h-11 w-36 rounded-xl bg-purple-200" />
                            <div className="h-11 w-32 rounded-xl bg-purple-100" />
                        </div>

                        <div className="flex gap-6 pt-5">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="space-y-2">
                                    <div className="h-5 w-16 rounded bg-purple-100" />
                                    <div className="h-3 w-20 rounded bg-gray-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-64 rounded-3xl bg-purple-100 md:h-80" />
                </div>
            </section>

            {/* Latest Tuitions Skeleton */}
            <section className="px-6 py-14 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-9 max-w-md space-y-3 text-center">
                        <div className="mx-auto h-5 w-32 rounded bg-purple-100" />
                        <div className="mx-auto h-8 w-72 max-w-full rounded bg-purple-100" />
                        <div className="mx-auto h-4 w-56 max-w-full rounded bg-gray-100" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="overflow-hidden rounded-2xl border border-purple-100">
                                <div className="h-40 bg-purple-100" />
                                <div className="space-y-4 p-4">
                                    <div className="h-4 w-3/4 rounded bg-purple-100" />
                                    <div className="h-4 w-1/2 rounded bg-gray-100" />
                                    <div className="h-4 w-full rounded bg-gray-100" />
                                    <div className="h-5 w-1/2 rounded bg-purple-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Skeleton */}
            <section className="px-6 py-12 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-10 h-8 w-56 rounded bg-purple-100" />

                    <div className="grid gap-8 md:grid-cols-2">
                        {[1, 2].map((item) => (
                            <div key={item} className="space-y-8 text-center">
                                <div className="mx-auto h-8 w-32 rounded-full bg-purple-100" />
                                <div className="flex justify-around">
                                    {[1, 2, 3].map((step) => (
                                        <div key={step} className="space-y-3">
                                            <div className="mx-auto h-6 w-6 rounded-full bg-purple-200" />
                                            <div className="h-14 w-14 rounded-2xl bg-purple-100" />
                                            <div className="h-3 w-16 rounded bg-gray-100" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Skeleton */}
            <section className="bg-[#FBF9FF] px-6 py-14 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 space-y-3">
                        <div className="h-8 w-64 rounded bg-purple-100" />
                        <div className="h-4 w-48 rounded bg-gray-100" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2].map((item) => (
                            <div key={item} className="rounded-2xl border border-purple-100 bg-white p-7">
                                <div className="mb-5 h-6 w-32 rounded bg-purple-100" />
                                <div className="mb-6 h-10 w-40 rounded bg-purple-100" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((feature) => (
                                        <div key={feature} className="h-4 w-3/4 rounded bg-gray-100" />
                                    ))}
                                </div>
                                <div className="mt-8 h-11 w-full rounded-xl bg-purple-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Skeleton */}
            <section className="px-6 py-14 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-8 h-8 w-64 rounded bg-purple-100" />

                    <div className="grid gap-5 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="rounded-2xl border border-purple-100 p-5">
                                <div className="mb-4 h-4 w-full rounded bg-gray-100" />
                                <div className="mb-2 h-4 w-4/5 rounded bg-gray-100" />
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-purple-100" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-28 rounded bg-purple-100" />
                                        <div className="h-3 w-20 rounded bg-gray-100" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Skeleton */}
            <section className="px-6 py-14 md:px-12">
                <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="h-8 w-64 rounded bg-purple-100" />
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-12 rounded-xl bg-purple-50" />
                        ))}
                    </div>
                    <div className="h-64 rounded-3xl bg-purple-100" />
                </div>
            </section>

            {/* Footer Skeleton */}
            <footer className="bg-[#1B1245] px-6 py-10">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
                    <div className="h-8 w-36 rounded bg-purple-300/20" />
                    <div className="flex gap-5">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="h-4 w-12 rounded bg-purple-300/20" />
                        ))}
                    </div>
                </div>
            </footer>

        </main>
    );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent>{children}</DashboardContent>
        </Suspense>
    );
}
