import Link from "next/link";
import {
    BriefcaseBusiness,
    PlusCircle,
    Users,
    MessageCircle,
    CheckCircle2,
    Clock,
    DollarSign,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TutorDashboardProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
}

export default function TutorDashboard({ user }: TutorDashboardProps) {
    const stats = [
        {
            title: "Posted Tuitions",
            value: "3",
            description: "2 active, 1 in review",
            icon: BriefcaseBusiness,
            color: "text-indigo-600 bg-indigo-500/10",
        },
        {
            title: "Student Applicants",
            value: "5",
            description: "2 new this week",
            icon: Users,
            color: "text-emerald-600 bg-emerald-500/10",
        },
        {
            title: "Monthly Estimated",
            value: "18,500 BDT",
            description: "From active tuitions",
            icon: DollarSign,
            color: "text-amber-600 bg-amber-500/10",
        },
        {
            title: "Unread Messages",
            value: "4",
            description: "From applicants",
            icon: MessageCircle,
            color: "text-purple-600 bg-purple-500/10",
        },
    ];

    const recentApplicants = [
        {
            id: "app-101",
            studentName: "Sadman Sakib",
            tuitionTitle: "HSC Physics 1st & 2nd Paper",
            classLevel: "HSC 2nd Year",
            appliedDate: "Nov 18, 2026",
            status: "pending",
        },
        {
            id: "app-102",
            studentName: "Farhana Akter",
            tuitionTitle: "English Medium O-Level Math D",
            classLevel: "Grade 10",
            appliedDate: "Nov 16, 2026",
            status: "accepted",
        },
    ];

    const myTuitions = [
        {
            id: "t-1",
            title: "Comprehensive HSC Physics Mentorship",
            subject: "Physics",
            fee: "6,000 BDT/mo",
            mode: "Online + Offline",
            status: "approved",
            applicantsCount: 3,
        },
        {
            id: "t-2",
            title: "O-Level Mathematics D Crash Course",
            subject: "Mathematics",
            fee: "7,500 BDT/mo",
            mode: "Online",
            status: "approved",
            applicantsCount: 2,
        },
        {
            id: "t-3",
            title: "University Admission ICT & Chemistry",
            subject: "Chemistry & ICT",
            fee: "5,000 BDT/mo",
            mode: "Online",
            status: "pending",
            applicantsCount: 0,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Welcome back, {user.name}! 🎓
                            </h1>
                            <Badge variant="default" className="font-semibold">
                                Tutor
                            </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Manage your tuition listings, evaluate student applicants, and expand your teaching reach.
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
                                Tuitions you have published on MentorLagbe
                            </p>
                        </div>
                        <Link
                            href="/dashboard/tutor/my-tuitions"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            Manage All <ArrowRight className="size-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-border">
                        {myTuitions.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm text-foreground">
                                            {item.title}
                                        </p>
                                        <Badge
                                            variant={item.status === "approved" ? "success" : "warning"}
                                            className="text-[10px] capitalize"
                                        >
                                            {item.status === "approved" ? (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 className="size-3" /> Live
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="size-3" /> Under Review
                                                </span>
                                            )}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Subject: {item.subject} • Mode: {item.mode} • Fee: <span className="font-semibold text-foreground">{item.fee}</span>
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
                            View
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentApplicants.map((applicant) => (
                            <div
                                key={applicant.id}
                                className="rounded-lg border bg-muted/30 p-3 space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-sm text-foreground">
                                        {applicant.studentName}
                                    </p>
                                    <Badge
                                        variant={applicant.status === "accepted" ? "success" : "warning"}
                                        className="text-[10px]"
                                    >
                                        {applicant.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {applicant.tuitionTitle} ({applicant.classLevel})
                                </p>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-[11px] text-muted-foreground">
                                        {applicant.appliedDate}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs"
                                        nativeButton={false}
                                        render={<Link href="/dashboard/messages" />}
                                    >
                                        Message
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 flex items-start gap-2.5">
                        <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            Pro Tip: Fast response times boost your tutor ranking on the public search directory!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

