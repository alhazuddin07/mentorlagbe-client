import Link from "next/link";
import { FileText, Search, MessageCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentApplicationsPage() {
    const applications = [
        {
            id: "app-1",
            subject: "HSC Higher Math (Calculus & Coordinate Geometry)",
            tutorName: "Engr. Tanvir Ahmed",
            tutorEmail: "tanvir.engr@example.com",
            fee: "5,000 BDT/month",
            schedule: "3 days/week • 1.5 hrs/day",
            status: "pending",
            appliedAt: "Nov 17, 2026",
        },
        {
            id: "app-2",
            subject: "SSC English First & Second Paper",
            tutorName: "Nusrat Jahan",
            tutorEmail: "nusrat.j@example.com",
            fee: "3,500 BDT/month",
            schedule: "4 days/week • 1 hr/day",
            status: "accepted",
            appliedAt: "Nov 14, 2026",
        },
        {
            id: "app-3",
            subject: "IELTS Speaking & Writing Preparation",
            tutorName: "Kamrul Hasan",
            tutorEmail: "kamrul.h@example.com",
            fee: "6,000 BDT/month",
            schedule: "2 days/week • 2 hrs/day",
            status: "rejected",
            appliedAt: "Nov 02, 2026",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
                    <p className="text-sm text-muted-foreground">
                        Track and manage tuitions you have applied for.
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
                        <span className="font-semibold text-sm">Submitted Applications</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Total {applications.length} applications
                    </span>
                </div>

                <div className="divide-y divide-border">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-muted/30 transition-colors"
                        >
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-semibold text-base text-foreground">
                                        {app.subject}
                                    </h3>
                                    <Badge
                                        variant={
                                            app.status === "accepted"
                                                ? "success"
                                                : app.status === "pending"
                                                ? "warning"
                                                : "destructive"
                                        }
                                        className="capitalize text-xs"
                                    >
                                        {app.status === "accepted" && (
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="size-3" /> Accepted
                                            </span>
                                        )}
                                        {app.status === "pending" && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3" /> Pending Review
                                            </span>
                                        )}
                                        {app.status === "rejected" && (
                                            <span className="flex items-center gap-1">
                                                <XCircle className="size-3" /> Declined
                                            </span>
                                        )}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                                    <span>
                                        Tutor: <strong className="text-foreground">{app.tutorName}</strong>
                                    </span>
                                    <span>
                                        Fee: <strong className="text-foreground">{app.fee}</strong>
                                    </span>
                                    <span>Schedule: {app.schedule}</span>
                                    <span>Applied on: {app.appliedAt}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    nativeButton={false}
                                    render={<Link href="/dashboard/messages" />}
                                >
                                    <MessageCircle className="size-3.5" />
                                    Chat with Tutor
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

