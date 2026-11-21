import Link from "next/link";
import {
    Users,
    ClipboardList,
    CreditCard,
    ShieldAlert,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUser } from "@/lib/api/users/users-api";
import { getTuitions } from "@/lib/api/tuitions/tuitions-api";
import { getPayments } from "@/lib/api/actions/paymens";
import TuitionActions from "@/components/dashboard/admin/TuitionActions";
import { ITuition } from "@/types/tuitions/tuitions";

interface AdminDashboardProps {
    user: {
        id?: string;
        name?: string;
        email?: string;
        image?: string | null;
        role?: string | null;
    };
}

interface UserRecord {
    id: string;
    name: string;
    email: string;
    role: "student" | "tutor" | "admin";
    status?: string;
    createdAt?: string;
}

interface PaymentRecord {
    _id?: string;
    amount?: number;
    currency?: string;
    paidAt?: string;
    userName?: string;
}

export default async function AdminDashboard({ user }: AdminDashboardProps) {
    const [allUsers, allTuitions, allPayments]: [
        UserRecord[],
        ITuition[],
        PaymentRecord[]
    ] = await Promise.all([getUser(), getTuitions(), getPayments()]);

    const usersList = allUsers || [];
    const tuitionsList = allTuitions || [];
    const paymentsList = allPayments || [];

    const studentsCount = usersList.filter((u) => u.role === "student").length;
    const tutorsCount = usersList.filter((u) => u.role === "tutor").length;

    const approvedCount = tuitionsList.filter(
        (t) => t.approvalStatus === "approved"
    ).length;
    const pendingTuitions = tuitionsList.filter(
        (t) => t.approvalStatus === "pending"
    );

    // Sum platform revenue from Stripe payments (amount in cents/poisha for Stripe, convert to BDT)
    const totalRevenueBDT = paymentsList.reduce((sum, p) => {
        const amt = Number(p.amount) || 0;
        // Stripe usually records amounts in smallest currency unit (cents/poisha)
        const inUnits = amt > 1000 ? Math.round(amt / 100) : amt;
        return sum + inUnits;
    }, 0);

    const stats = [
        {
            title: "Total Registered Users",
            value: usersList.length.toString(),
            description: `${studentsCount} students, ${tutorsCount} tutors`,
            icon: Users,
            color: "text-blue-600 bg-blue-500/10",
        },
        {
            title: "Total Tuitions",
            value: tuitionsList.length.toString(),
            description: `${approvedCount} approved, ${pendingTuitions.length} pending`,
            icon: ClipboardList,
            color: "text-emerald-600 bg-emerald-500/10",
        },
        {
            title: "Pending Approval",
            value: pendingTuitions.length.toString(),
            description: "Requires administrator review",
            icon: ShieldAlert,
            color: "text-amber-600 bg-amber-500/10",
        },
        {
            title: "Platform Revenue",
            value: `৳${totalRevenueBDT.toLocaleString()}`,
            description: `${paymentsList.length} verified subscriptions`,
            icon: CreditCard,
            color: "text-purple-600 bg-purple-500/10",
        },
    ];

    const recentUsers = usersList
        .slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 5);

    const pendingQueue = pendingTuitions
        .slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-red-500/20 bg-linear-to-r from-red-500/10 via-red-500/5 to-transparent p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                System Administration
                            </h1>
                            <Badge variant="destructive" className="font-semibold">
                                Administrator
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Logged in as {user?.name || "Admin"} ({user?.email}). Platform oversight, user management, and tuition approvals.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        <Button
                            nativeButton={false}
                            render={<Link href="/dashboard/admin/users" />}
                        >
                            <Users className="size-4" />
                            Manage Users
                        </Button>
                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/dashboard/admin/tuitions" />}
                        >
                            <ClipboardList className="size-4" />
                            Moderate Tuitions
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-card p-5 shadow-xs transition hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-muted-foreground">
                                {stat.title}
                            </p>
                            <div className={`flex size-9 items-center justify-center rounded-lg ${stat.color}`}>
                                <stat.icon className="size-4" />
                            </div>
                        </div>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Moderation Queue */}
                <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Tuitions Moderation Queue
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Posts awaiting administrative review prior to public listing
                            </p>
                        </div>
                        <Link
                            href="/dashboard/admin/tuitions"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            All Moderation <ArrowRight className="size-3" />
                        </Link>
                    </div>

                    {pendingQueue.length === 0 ? (
                        <div className="py-12 text-center space-y-2">
                            <CheckCircle2 className="size-8 text-emerald-500 mx-auto" />
                            <p className="font-semibold text-sm">All caught up!</p>
                            <p className="text-xs text-muted-foreground">
                                No tuition posts are currently pending administrative review.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {pendingQueue.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-sm text-foreground">
                                                {item.title}
                                            </p>
                                            <Badge variant="warning" className="text-[10px]">
                                                Pending Review
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Tutor: <span className="font-medium text-foreground">{item.tutorName || "Tutor"}</span> {item.tutorEmail && `(${item.tutorEmail})`} • Fee: ৳{item.monthlyFee?.toLocaleString()}
                                            {item.createdAt && ` • Submitted ${new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <TuitionActions tuitionId={item._id} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Registrations */}
                <div className="rounded-xl border bg-card p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Recent Registrations
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Latest members on MentorLagbe
                            </p>
                        </div>
                        <Link
                            href="/dashboard/admin/users"
                            className="text-xs text-primary hover:underline"
                        >
                            View All
                        </Link>
                    </div>

                    {recentUsers.length === 0 ? (
                        <p className="py-4 text-center text-xs text-muted-foreground">
                            No registered users yet.
                        </p>
                    ) : (
                        <div className="divide-y divide-border">
                            {recentUsers.map((u) => (
                                <div key={u.id} className="flex items-center justify-between py-3">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold text-foreground">
                                            {u.name}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground">
                                            {u.email}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge
                                            variant={
                                                u.role === "admin"
                                                    ? "destructive"
                                                    : u.role === "tutor"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className="text-[10px] capitalize"
                                        >
                                            {u.role}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">
                                            {u.createdAt
                                                ? new Date(u.createdAt).toLocaleDateString("en-US", {
                                                      month: "short",
                                                      day: "numeric",
                                                  })
                                                : "Active"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="rounded-lg bg-muted/60 p-4 space-y-1">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="size-4 text-primary" />
                            <p className="text-xs font-semibold text-foreground">
                                Platform Overview
                            </p>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                            {usersList.length} total users across {tuitionsList.length} tuitions. Server operational.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
