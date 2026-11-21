// The applicant list comes from the backend with an uncached fetch, so this
// route cannot be prerendered as part of an instant navigation. Allow it to
// block on the server instead.
export const instant = false;

import {
    Users,
    CheckCircle2,
    XCircle,
    Clock,
    Mail,
    Phone,
    CalendarDays,
    BookOpen,
    Inbox,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getApplications } from "@/lib/api/students/applications";
import { IApplication } from "@/types/applications";
import UpdateApplicationStatus from "@/components/dashboard/tutor/UpdateApplicationStatus";

const getInitials = (name?: string) =>
    (name || "S")
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const statusStyles: Record<string, { label: string; icon: React.ElementType; className: string}> = {
    Accepted: {
        label: "Accepted",
        icon: CheckCircle2,
        className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    Declined: {
        label: "Declined",
        icon: XCircle,
        className:
            "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400",
    },
    "Awaiting Decision": {
        label: "Awaiting Decision",
        icon: Clock,
        className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
    },
};

export default async function TutorApplicantsPage() {
    const applicants: IApplication[] = await getApplications();

    const pendingCount = applicants.filter((a) => a.status === "Awaiting Decision").length;
    const acceptedCount = applicants.filter((a) => a.status === "Accepted").length;

    const stats = [
        { label: "Total Applicants", value: applicants.length, icon: Users, color: "bg-primary/10 text-primary" },
        { label: "Awaiting Decision", value: pendingCount, icon: Clock, color: "bg-amber-500/10 text-amber-600" },
        { label: "Accepted", value: acceptedCount, icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Student Applicants</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review and communicate with students who applied for your tuition listings.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div
                        key={label}
                        className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm"
                    >
                        <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
                            <Icon className="size-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold leading-none">{value}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Applicants */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Users className="size-5 text-primary" />
                    <h2 className="text-lg font-semibold">Applicant Requests</h2>
                </div>

                {applicants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-16 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                            <Inbox className="size-7 text-muted-foreground" />
                        </div>
                        <p className="mt-4 font-semibold">No applicants yet</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            When students apply to your tuitions, they will show up here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {applicants.map((item) => {
                            const status = statusStyles[item.status] ?? statusStyles["Awaiting Decision"];
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={item._id}
                                    className="flex flex-col gap-5 rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-start md:justify-between"
                                >
                                    <div className="flex min-w-0 flex-1 gap-4">
                                        <Avatar className="size-12 shrink-0">
                                            <AvatarFallback className="bg-linear-to-br from-indigo-500 to-violet-500 font-semibold text-white">
                                                {getInitials(item.studentName)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1 space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-base font-semibold text-foreground">
                                                    {item.studentName}
                                                </h3>
                                                <Badge variant="outline" className={`gap-1 text-xs ${status.className}`}>
                                                    <StatusIcon className="size-3" />
                                                    {status.label}
                                                </Badge>
                                            </div>

                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                <BookOpen className="size-3.5" />
                                                {item.tuitionTitle} ({item.classLavel})
                                            </div>

                                            <blockquote className="rounded-lg border-l-4 border-primary/40 bg-muted/50 px-4 py-3 text-sm italic text-foreground/80">
                                                &ldquo;{item.learningNote}&rdquo;
                                            </blockquote>

                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="size-3.5" />
                                                    {item.studentEmail}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Phone className="size-3.5" />
                                                    {item.phone}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <CalendarDays className="size-3.5" />
                                                    {new Date(item.appliedDate).toLocaleDateString("en-US", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 flex-wrap gap-2 md:w-36 md:flex-col">

                                        <UpdateApplicationStatus
                                            applicationId={item._id!}
                                            status={item.status === "Rejected" ? "Declined" : item.status}
                                        />

                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}