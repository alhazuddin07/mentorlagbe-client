import Link from "next/link";
import {
    FileText,
    Search,
    Crown,
    CheckCircle2,
    Clock,
    XCircle,
    BookOpen,
    ArrowRight,
    TrendingUp,
    Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStudentApplications } from "@/lib/api/students/applications";
import { IApplication } from "@/types/applications";

interface StudentDashboardProps {
    user: {
        id?: string;
        name?: string;
        email?: string;
        image?: string | null;
        role?: string | null;
        plan?: string | null;
    };
}

export default async function StudentDashboard({ user }: StudentDashboardProps) {
    const userEmail = user?.email?.toLowerCase() || "";
    const myApplications: IApplication[] = userEmail
        ? await getStudentApplications(userEmail)
        : [];

    const appliedCount = myApplications.length;
    const pendingCount = myApplications.filter(
        (a) => a.status === "Awaiting Decision"
    ).length;
    const acceptedCount = myApplications.filter(
        (a) => a.status === "Accepted"
    ).length;
    const isPro = user?.plan === "pro" || user?.plan === "paid";

    const stats = [
        {
            title: "Applied Tuitions",
            value: appliedCount.toString(),
            description: `${pendingCount} pending review`,
            icon: FileText,
            color: "text-blue-600 bg-blue-500/10",
        },
        {
            title: "Connected Mentors",
            value: acceptedCount.toString(),
            description: `${acceptedCount} applications accepted`,
            icon: BookOpen,
            color: "text-emerald-600 bg-emerald-500/10",
        },
        {
            title: "Current Plan",
            value: isPro ? "Pro Plan" : "Free Tier",
            description: isPro ? "Unlimited applications" : "Up to 3 applications/mo",
            icon: Crown,
            color: "text-amber-600 bg-amber-500/10",
        },
    ];

    const recentApplications = myApplications
        .slice()
        .sort(
            (a, b) =>
                new Date(b.appliedDate || 0).getTime() -
                new Date(a.appliedDate || 0).getTime()
        )
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Welcome back, {user?.name || "Student"}! 👋
                            </h1>
                            <Badge variant="secondary" className="font-semibold text-primary capitalize">
                                {user?.role || "Student"}
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Track your tuition applications, monitor approvals, and connect with expert tutors.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        <Button nativeButton={false} render={<Link href="/tuitions" />}>
                            <Search className="size-4" />
                            Browse Tuitions
                        </Button>
                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/dashboard/student/my-applications" />}
                        >
                            <FileText className="size-4" />
                            My Applications
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

            {/* Recent Applications Section */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Recent Tuition Applications
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Live status of your submitted tuition requests
                            </p>
                        </div>
                        <Link
                            href="/dashboard/student/my-applications"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            View All <ArrowRight className="size-3" />
                        </Link>
                    </div>

                    {recentApplications.length === 0 ? (
                        <div className="py-12 text-center space-y-3">
                            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                                <Inbox className="size-6" />
                            </div>
                            <p className="font-semibold text-sm">No applications submitted yet</p>
                            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                                Explore available tuitions and submit your application to learn with top mentors.
                            </p>
                            <Button size="sm" nativeButton={false} render={<Link href="/tuitions" />}>
                                <Search className="size-4" /> Browse Tuitions
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {recentApplications.map((app) => (
                                <div
                                    key={app._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-sm text-foreground">
                                                {app.tuitionTitle}
                                            </p>
                                            <Badge
                                                variant={
                                                    app.status === "Accepted"
                                                        ? "success"
                                                        : app.status === "Awaiting Decision"
                                                            ? "warning"
                                                            : "destructive"
                                                }
                                                className="text-[10px] capitalize"
                                            >
                                                {app.status === "Accepted" ? (
                                                    <span className="flex items-center gap-1">
                                                        <CheckCircle2 className="size-3" /> Accepted
                                                    </span>
                                                ) : app.status === "Awaiting Decision" ? (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="size-3" /> Awaiting Decision
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <XCircle className="size-3" /> Declined
                                                    </span>
                                                )}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Class: <span className="font-medium text-foreground">{app.classLavel}</span>
                                            {app.preferredSchedule && ` • Schedule: ${app.preferredSchedule}`}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(app.appliedDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right side helper card */}
                <div className="rounded-xl border bg-card p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="size-5 text-primary" />
                        <h2 className="text-base font-semibold text-foreground">
                            Learning Tips
                        </h2>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                        Be specific with your learning goals and preferred schedule when applying for tuitions. Clear notes help tutors respond faster!
                    </p>

                    <div className="rounded-lg bg-muted/60 p-4 space-y-2">
                        <p className="text-xs font-semibold text-foreground">
                            Need priority application reviews?
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                            Unlock unlimited tuition applications, verified student badge, and priority support.
                        </p>
                        <Button
                            size="sm"
                            variant="default"
                            className="w-full mt-2"
                            nativeButton={false}
                            render={<Link href="/pricing" />}
                        >
                            Explore Pro Plans
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
