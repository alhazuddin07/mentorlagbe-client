import { Suspense } from "react";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";
import TutorDashboard from "@/components/dashboard/tutor/TutorDashboard";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import { getServerSession } from "@/lib/get-session";

async function DashboardContent() {
    const session = await getServerSession();

    const user = session?.user;

    if (!user) {
        return null;
    }

    const role = (user as { role?: string } | undefined)?.role ?? "student";

    const userObj = {
        id: user.id,
        name: user.name || "User",
        email: user.email || "",
        image: user.image,
        role: (user as { role?: string }).role || "student",
        plan: (user as { plan?: string }).plan === "paid" ? "pro" : ((user as { plan?: string }).plan || "free"),
    };

    if (role === "admin") {
        return <AdminDashboard user={userObj} />;
    }

    if (role === "tutor") {
        return <TutorDashboard user={userObj} />;
    }

    return <StudentDashboard user={userObj} />;
}

function DashboardLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Banner skeleton */}
            <div className="h-36 rounded-2xl bg-muted/60" />

            {/* Stat cards skeleton */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-28 rounded-xl border bg-card p-5 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="h-3 w-24 rounded bg-muted" />
                            <div className="size-8 rounded-lg bg-muted" />
                        </div>
                        <div className="h-6 w-16 rounded bg-muted" />
                        <div className="h-3 w-32 rounded bg-muted" />
                    </div>
                ))}
            </div>

            {/* Content grid skeleton */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 h-80 rounded-xl border bg-card p-6 space-y-4">
                    <div className="h-5 w-48 rounded bg-muted" />
                    <div className="h-3 w-64 rounded bg-muted" />
                    <div className="space-y-3 pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 rounded-lg bg-muted/50" />
                        ))}
                    </div>
                </div>

                <div className="h-80 rounded-xl border bg-card p-6 space-y-4">
                    <div className="h-5 w-36 rounded bg-muted" />
                    <div className="space-y-3 pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-14 rounded-lg bg-muted/50" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent />
        </Suspense>
    );
}
