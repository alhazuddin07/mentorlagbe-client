import Link from "next/link";
import {
    FileText,
    Search,
    MessageCircle,
    Crown,
    CheckCircle2,
    Clock,
    BookOpen,
    ArrowRight,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentDashboardProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
    const stats = [
        {
            title: "Applied Tuitions",
            value: "2",
            description: "1 pending review",
            icon: FileText,
            color: "text-blue-600 bg-blue-500/10",
        },
        {
            title: "Connected Mentors",
            value: "1",
            description: "Mathematics",
            icon: BookOpen,
            color: "text-emerald-600 bg-emerald-500/10",
        },
        {
            title: "Unread Messages",
            value: "3",
            description: "From 2 tutors",
            icon: MessageCircle,
            color: "text-purple-600 bg-purple-500/10",
        },
        {
            title: "Current Plan",
            value: "Free Tier",
            description: "Up to 5 applications/mo",
            icon: Crown,
            color: "text-amber-600 bg-amber-500/10",
        },
    ];

    const recentApplications = [
        {
            id: "app-1",
            subject: "HSC Higher Math (Calculus)",
            tutor: "Engr. Tanvir Ahmed",
            fee: "5,000 BDT/mo",
            appliedDate: "Nov 17, 2026",
            status: "pending",
        },
        {
            id: "app-2",
            subject: "SSC English & Grammar",
            tutor: "Nusrat Jahan",
            fee: "3,500 BDT/mo",
            appliedDate: "Nov 14, 2026",
            status: "accepted",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Welcome back, {user.name}! 👋
                            </h1>
                            <Badge variant="secondary" className="font-semibold text-primary">
                                Student
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Track your tuition applications, chat with your mentors, and discover expert tutors.
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

            {/* Recent Applications Section */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Recent Tuition Applications
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Live status of your sent tuition requests
                            </p>
                        </div>
                        <Link
                            href="/dashboard/student/my-applications"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            View All <ArrowRight className="size-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-border">
                        {recentApplications.map((app) => (
                            <div
                                key={app.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm text-foreground">
                                            {app.subject}
                                        </p>
                                        <Badge
                                            variant={
                                                app.status === "accepted"
                                                    ? "success"
                                                    : app.status === "pending"
                                                        ? "warning"
                                                        : "destructive"
                                            }
                                            className="text-[10px] capitalize"
                                        >
                                            {app.status === "accepted" ? (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 className="size-3" /> Accepted
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="size-3" /> Pending Review
                                                </span>
                                            )}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Tutor: <span className="font-medium text-foreground">{app.tutor}</span> • Fee: {app.fee}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground">
                                        {app.appliedDate}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        nativeButton={false}
                                        render={<Link href="/dashboard/messages" />}
                                    >
                                        Message
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
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
                        Be specific with your learning goals and schedule availability when sending messages to tutors. Pro mentors respond 3x faster!
                    </p>

                    <div className="rounded-lg bg-muted/60 p-4 space-y-2">
                        <p className="text-xs font-semibold text-foreground">
                            Need priority application reviews?
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                            Unlock unlimited tutor contact, verified badge, and instant notifications.
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

