import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import StudentDashboard from "@/components/dashboard/student/StudentDashboard";
import TutorDashboard from "@/components/dashboard/tutor/TutorDashboard";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

async function DashboardContent() {
    const session = await getSession();

    const user = session?.user;
    const role = (user as { role?: string } | undefined)?.role ?? "student";

    const userData = {
        name: user?.name || "User",
        email: user?.email || "",
        image: user?.image,
    };

    if (role === "admin") {
        return <AdminDashboard user={userData} />;
    }

    if (role === "tutor") {
        return <TutorDashboard user={userData} />;
    }

    return <StudentDashboard user={userData} />;
}

function DashboardLoading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-sm text-muted-foreground">
                Loading dashboard...
            </p>
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
