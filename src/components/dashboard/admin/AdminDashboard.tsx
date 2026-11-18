import Link from "next/link";
import {
    Users,
    ClipboardList,
    CreditCard,
    ShieldAlert,
    Check,
    X,
    ArrowRight,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminDashboardProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
    const stats = [
        {
            title: "Total Registered Users",
            value: "148",
            description: "96 students, 52 tutors",
            icon: Users,
            color: "text-blue-600 bg-blue-500/10",
        },
        {
            title: "Total Tuitions",
            value: "84",
            description: "78 approved, 6 pending",
            icon: ClipboardList,
            color: "text-emerald-600 bg-emerald-500/10",
        },
        {
            title: "Pending Approval",
            value: "6",
            description: "Requires administrator review",
            icon: ShieldAlert,
            color: "text-amber-600 bg-amber-500/10",
        },
        {
            title: "Platform Revenue",
            value: "124,500 BDT",
            description: "From subscription & fees",
            icon: CreditCard,
            color: "text-purple-600 bg-purple-500/10",
        },
    ];

    const pendingTuitions = [
        {
            id: "t-pending-1",
            title: "Advanced Math & Physics for Admission",
            tutor: "Dr. Farhan Chowdhury",
            email: "farhan.c@example.com",
            fee: "8,000 BDT/mo",
            submitted: "2 hours ago",
        },
        {
            id: "t-pending-2",
            title: "Class 9-10 Biology & Chemistry Special",
            tutor: "Sultana Razia",
            email: "sultana.r@example.com",
            fee: "4,500 BDT/mo",
            submitted: "5 hours ago",
        },
    ];

    const recentUsers = [
        {
            name: "Zubair Rahman",
            email: "zubair@example.com",
            role: "tutor",
            joined: "Today",
        },
        {
            name: "Ayesha Siddiqa",
            email: "ayesha.s@example.com",
            role: "student",
            joined: "Yesterday",
        },
        {
            name: "Mahmud Hasan",
            email: "m.hasan@example.com",
            role: "tutor",
            joined: "Nov 16, 2026",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent p-6 sm:p-8">
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
                            Logged in as {user.name} ({user.email}). Complete platform oversight, user management, and tuition approvals.
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
                                New posts requiring admin approval before public listing
                            </p>
                        </div>
                        <Link
                            href="/dashboard/admin/tuitions"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            All Moderation <ArrowRight className="size-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-border">
                        {pendingTuitions.map((item) => (
                            <div
                                key={item.id}
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
                                        Tutor: <span className="font-medium text-foreground">{item.tutor}</span> ({item.email}) • Fee: {item.fee} • Submitted {item.submitted}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                                        <Check className="size-3.5" /> Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                        <X className="size-3.5" /> Reject
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
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

                    <div className="divide-y divide-border">
                        {recentUsers.map((u, i) => (
                            <div key={i} className="flex items-center justify-between py-3">
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
                                        variant={u.role === "tutor" ? "default" : "secondary"}
                                        className="text-[10px] capitalize"
                                    >
                                        {u.role}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground">
                                        {u.joined}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-lg bg-muted/60 p-4 space-y-1">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="size-4 text-primary" />
                            <p className="text-xs font-semibold text-foreground">
                                Platform Growth
                            </p>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                            +24 new signups this week. Server health 100% operational.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

