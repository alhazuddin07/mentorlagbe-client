import Link from "next/link";
import { Users, MessageCircle, CheckCircle2, Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TutorApplicantsPage() {
    const applicants = [
        {
            id: "app-101",
            studentName: "Sadman Sakib",
            studentEmail: "sadman.s@example.com",
            studentPhone: "+880 1712-345678",
            tuitionTitle: "Comprehensive HSC Physics Mentorship",
            classLevel: "HSC 2nd Year",
            note: "I need targeted preparation in Thermodynamics and Electrostatics before test exam.",
            appliedDate: "Nov 18, 2026",
            status: "pending",
        },
        {
            id: "app-102",
            studentName: "Farhana Akter",
            studentEmail: "farhana.akter@example.com",
            studentPhone: "+880 1819-876543",
            tuitionTitle: "O-Level Mathematics D & Additional Math",
            classLevel: "Grade 10",
            note: "Looking for intensive past paper solving 3 days a week.",
            appliedDate: "Nov 16, 2026",
            status: "accepted",
        },
        {
            id: "app-103",
            studentName: "Mehedi Hasan",
            studentEmail: "mehedi.h@example.com",
            studentPhone: "+880 1911-223344",
            tuitionTitle: "Comprehensive HSC Physics Mentorship",
            classLevel: "HSC 1st Year",
            note: "Online batch preferred in evening hours.",
            appliedDate: "Nov 15, 2026",
            status: "pending",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Student Applicants</h1>
                <p className="text-sm text-muted-foreground">
                    Review and communicate with students who applied for your tuition listings.
                </p>
            </div>

            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="size-5 text-primary" />
                        <span className="font-semibold text-sm">Applicant Requests</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {applicants.length} Total Applicants
                    </span>
                </div>

                <div className="divide-y divide-border">
                    {applicants.map((item) => (
                        <div
                            key={item.id}
                            className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-muted/30 transition-colors"
                        >
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-semibold text-base text-foreground">
                                        {item.studentName}
                                    </h3>
                                    <Badge
                                        variant={item.status === "accepted" ? "success" : "warning"}
                                        className="text-xs capitalize"
                                    >
                                        {item.status === "accepted" ? (
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="size-3" /> Accepted
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3" /> Awaiting Decision
                                            </span>
                                        )}
                                    </Badge>
                                </div>

                                <p className="text-xs font-medium text-primary">
                                    Applied for: {item.tuitionTitle} ({item.classLevel})
                                </p>

                                <div className="rounded-md bg-muted/50 p-3 text-xs text-foreground/80 italic">
                                    &ldquo;{item.note}&rdquo;
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                                    <span>Email: {item.studentEmail}</span>
                                    <span>Phone: {item.studentPhone}</span>
                                    <span>Applied on: {item.appliedDate}</span>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col gap-2 shrink-0">
                                {item.status === "pending" && (
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                                            <Check className="size-3.5" /> Accept
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                            <X className="size-3.5" /> Decline
                                        </Button>
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    nativeButton={false}
                                    render={<Link href="/dashboard/messages" />}
                                >
                                    <MessageCircle className="size-3.5" /> Message
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

