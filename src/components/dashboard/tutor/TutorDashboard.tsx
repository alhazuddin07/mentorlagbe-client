import Link from "next/link";
import {
    BriefcaseBusiness,
    PlusCircle,
    Users,
    CheckCircle2,
    Clock,
    XCircle,
    DollarSign,
    ArrowRight,
    Sparkles,
    Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTuitions } from "@/lib/api/tuitions/tuitions-api";
import { getApplications } from "@/lib/api/students/applications";
import { ITuition } from "@/types/tuitions/tuitions";
import { IApplication } from "@/types/applications";

interface TutorDashboardProps {
    user: {
        id?: string;
        name?: string;
        email?: string;
        image?: string | null;
        role?: string | null;
        plan?: string | null;
    };
}

export default async function TutorDashboard({ user }: TutorDashboardProps) {
    const userEmail = user?.email?.toLowerCase() || "";
    const userId = user?.id || "";

    const [allTuitions, allApplications]: [ITuition[], IApplication[]] =
        await Promise.all([getTuitions(), getApplications()]);

    const myTuitions = (allTuitions || []).filter(
        (t) =>
            (t.tutorEmail && t.tutorEmail.toLowerCase() === userEmail) ||
            (userId && t.tutorId === userId)
    );

    const myTuitionIds = new Set(myTuitions.map((t) => t._id?.toString()));
    const myTuitionTitles = new Set(
        myTuitions.map((t) => t.title?.toLowerCase().trim())
    );

    const tutorApplicants = (allApplications || []).filter(
        (app) =>
            (app.tuitionId && myTuitionIds.has(app.tuitionId.toString())) ||
            (app.tuitionTitle &&
                myTuitionTitles.has(app.tuitionTitle.toLowerCase().trim()))
    );

    const myTuitionsWithCounts = myTuitions.map((t) => {
        const count = tutorApplicants.filter(
            (a) =>
                a.tuitionId === t._id ||
                a.tuitionTitle?.toLowerCase().trim() ===
                    t.title?.toLowerCase().trim()
        ).length;
        return { ...t, applicantsCount: count };
    });

    const activeCount = myTuitions.filter(
        (t) => t.approvalStatus === "approved"
    ).length;
    const pendingCount = myTuitions.filter(
        (t) => t.approvalStatus === "pending"
    ).length;
    const newApplicantsCount = tutorApplicants.filter(
        (a) => a.status === "Awaiting Decision"
    ).length;

    const monthlyEstimated = myTuitions
        .filter((t) => t.approvalStatus === "approved")
        .reduce((sum, t) => sum + (Number(t.monthlyFee) || 0), 0);

    const isPro = user?.plan === "pro" || user?.plan === "paid";

    const stats = [
        {
            title: "Posted Tuitions",
            value: myTuitions.length.toString(),
            description: `${activeCount} live, ${pendingCount} in review`,
            icon: BriefcaseBusiness,
            color: "text-indigo-600 bg-indigo-500/10",
        },
        {
            title: "Student Applicants",
            value: tutorApplicants.length.toString(),
            description: `${newApplicantsCount} awaiting your decision`,
            icon: Users,
            color: "text-emerald-600 bg-emerald-500/10",
        },
        {
            title: "Monthly Estimated",
            value: `৳${monthlyEstimated.toLocaleString()}`,
            description: "From active approved listings",
            icon: DollarSign,
            color: "text-amber-600 bg-amber-500/10",
        },
        {
            title: "Tutor Status",
            value: isPro ? "Pro Tutor" : "Standard Tier",
            description: isPro
                ? "Unlimited tuition listings"
                : "Free plan (up to 3 postings)",
            icon: Sparkles,
            color: "text-purple-600 bg-purple-500/10",
        },
    ];

    const recentApplicants = tutorApplicants
        .slice()
        .sort(
            (a, b) =>
                new Date(b.appliedDate || 0).getTime() -
                new Date(a.appliedDate || 0).getTime()
        )
        .slice(0, 5);

    const recentTuitions = myTuitionsWithCounts
        .slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 4);

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Welcome back, {user?.name || "Tutor"}! 🎓
                            </h1>
                            <Badge variant="default" className="font-semibold">
                                Tutor
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Manage your tuition listings, evaluate student applicants, and track your teaching mentorships.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        <Button
                            nativeButton={false}
                            render={<Link href="/dashboard/tutor/post-tuition" />}
                        >
                            <PlusCircle className="size-4" />
                            Post New Tuition
                        </Button>
                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/dashboard/tutor/applicants" />}
                        >
                            <Users className="size-4" />
                            View Applicants
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
                {/* Active Tuitions List */}
                <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                My Tuition Posts
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Tuitions you have submitted on MentorLagbe
                            </p>
                        </div>
                        <Link
                            href="/dashboard/tutor/my-tuitions"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            Manage All <ArrowRight className="size-3" />
                        </Link>
                    </div>

                    {recentTuitions.length === 0 ? (
                        <div className="py-12 text-center space-y-3">
                            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                                <Inbox className="size-6" />
                            </div>
                            <p className="font-semibold text-sm">No tuitions posted yet</p>
                            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                                Publish your first tuition listing to start attracting interested students.
                            </p>
                            <Button
                                size="sm"
                                nativeButton={false}
                                render={<Link href="/dashboard/tutor/post-tuition" />}
                            >
                                <PlusCircle className="size-4" /> Post New Tuition
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {recentTuitions.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-sm text-foreground">
                                                {item.title}
                                            </p>
                                            <Badge
                                                variant={
                                                    item.approvalStatus === "approved"
                                                        ? "success"
                                                        : item.approvalStatus === "pending"
                                                        ? "warning"
                                                        : "destructive"
                                                }
                                                className="text-[10px] capitalize"
                                            >
                                                {item.approvalStatus === "approved" ? (
                                                    <span className="flex items-center gap-1">
                                                        <CheckCircle2 className="size-3" /> Live
                                                    </span>
                                                ) : item.approvalStatus === "pending" ? (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="size-3" /> Under Review
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <XCircle className="size-3" /> Rejected
                                                    </span>
                                                )}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Subject: <span className="font-medium text-foreground">{item.subject}</span> • Mode: {item.mode} • Fee: <span className="font-semibold text-foreground">৳{item.monthlyFee?.toLocaleString()}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-muted-foreground">
                                            {item.applicantsCount} applicants
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            nativeButton={false}
                                            render={<Link href="/dashboard/tutor/applicants" />}
                                        >
                                            Applicants
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Applicants */}
                <div className="rounded-xl border bg-card p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                New Applicants
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Students awaiting your response
                            </p>
                        </div>
                        <Link
                            href="/dashboard/tutor/applicants"
                            className="text-xs text-primary hover:underline"
                        >
                            View All
                        </Link>
                    </div>

                    {recentApplicants.length === 0 ? (
                        <div className="py-8 text-center space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                No applicant requests yet
                            </p>
                            <p className="text-xs text-muted-foreground">
                                When students apply to your tuitions, their profiles will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentApplicants.map((applicant) => (
                                <div
                                    key={applicant._id}
                                    className="rounded-lg border bg-muted/30 p-3 space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-sm text-foreground">
                                            {applicant.studentName}
                                        </p>
                                        <Badge
                                            variant={
                                                applicant.status === "Accepted"
                                                    ? "success"
                                                    : applicant.status === "Awaiting Decision"
                                                    ? "warning"
                                                    : "destructive"
                                            }
                                            className="text-[10px]"
                                        >
                                            {applicant.status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {applicant.tuitionTitle} ({applicant.classLavel})
                                    </p>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[11px] text-muted-foreground">
                                            {new Date(applicant.appliedDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 text-xs"
                                            nativeButton={false}
                                            render={<Link href="/dashboard/tutor/applicants" />}
                                        >
                                            Review
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 flex items-start gap-2.5">
                        <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Pro Tip: Promptly reviewing applications boosts your profile visibility on the search directory!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
