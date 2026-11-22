export const instant = false;

import Link from "next/link";
import {
    FileText,
    Search,
    Clock,
    CheckCircle2,
    XCircle,
    Inbox,
    CalendarDays,
    BookOpen,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStudentApplications } from "@/lib/api/students/applications";
import { getServerSession } from "@/lib/get-session";
import { IApplication } from "@/types/applications";
import DeleteApplicationButton from "@/components/dashboard/student/DeleteApplicationButton";

export default async function StudentApplicationsPage() {
    const session = await getServerSession();
    const userEmail = session?.user?.email?.toLowerCase();

    const response = userEmail
        ? await getStudentApplications(userEmail)
        : [];

    const applications: IApplication[] = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
            ? response.data
            : [];

    const sortedApplications = [...applications].sort(
        (a, b) =>
            new Date(b.appliedDate || 0).getTime() -
            new Date(a.appliedDate || 0).getTime()
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Applications</h1>
                    <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Track and manage all your submitted tuition applications.
                    </p>
                </div>

                <Button nativeButton={false} render={<Link href="/tuitions" />}>
                    <Search className="size-4" />
                    Browse More Tuitions
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="size-5 text-primary" />
                        <span className="font-semibold text-sm sm:text-base">Submitted Applications</span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        Total {sortedApplications.length} {sortedApplications.length === 1 ? "application" : "applications"}
                    </span>
                </div>

                {sortedApplications.length === 0 ? (
                    <div className="py-16 text-center space-y-3 px-4">
                        <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                            <Inbox className="size-7" />
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg">No applications yet</h3>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                            You haven&apos;t applied to any tuitions yet. Browse our active tuition listings to find the right mentor for you.
                        </p>
                        <div className="pt-2">
                            <Button nativeButton={false} render={<Link href="/tuitions" />}>
                                <Search className="size-4" />
                                Browse Tuitions
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {sortedApplications.map((app) => {
                            const isAccepted = app.status === "Accepted";
                            const isPending = (app.status || "").toLowerCase() === "pending" || app.status === "Awaiting Decision";
                            const isDeclined = !isAccepted && !isPending;

                            return (
                                <div
                                    key={app._id || `${app.tuitionId}-${app.appliedDate}`}
                                    className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-muted/30 transition-colors"
                                >
                                    <div className="space-y-3 flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-semibold text-base sm:text-lg text-foreground tracking-tight">
                                                {app.tuitionTitle}
                                            </h3>
                                            <Badge
                                                variant={
                                                    isAccepted
                                                        ? "success"
                                                        : isPending
                                                            ? "warning"
                                                            : "destructive"
                                                }
                                                className="capitalize text-xs"
                                            >
                                                {isAccepted && (
                                                    <span className="flex items-center gap-1">
                                                        <CheckCircle2 className="size-3" /> Accepted
                                                    </span>
                                                )}
                                                {isPending && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="size-3" /> Awaiting Decision
                                                    </span>
                                                )}
                                                {isDeclined && (
                                                    <span className="flex items-center gap-1">
                                                        <XCircle className="size-3" /> Declined
                                                    </span>
                                                )}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <BookOpen className="size-3.5" />
                                                Class: <strong className="text-foreground">{app.classLavel}</strong>
                                            </span>
                                            {app.preferredSchedule && (
                                                <span>
                                                    Schedule: <strong className="text-foreground">{app.preferredSchedule}</strong>
                                                </span>
                                            )}
                                            {app.phone && (
                                                <span>Contact Phone: {app.phone}</span>
                                            )}
                                            <span className="inline-flex items-center gap-1">
                                                <CalendarDays className="size-3.5" />
                                                Applied on:{" "}
                                                {new Date(app.appliedDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        {app.learningNote && (
                                            <blockquote className="rounded-lg border-l-4 border-primary/40 bg-muted/40 px-3.5 py-2 text-xs italic text-foreground/80">
                                                &ldquo;{app.learningNote}&rdquo;
                                            </blockquote>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <DeleteApplicationButton
                                            applicationId={app._id!}
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
