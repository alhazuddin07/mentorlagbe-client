import Link from "next/link";
import { PlusCircle, BriefcaseBusiness, CheckCircle2, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TutorMyTuitionsPage() {
    const tuitions = [
        {
            id: "t-1",
            title: "Comprehensive HSC Physics Mentorship (Paper 1 & 2)",
            subject: "Physics",
            classLevel: "HSC 1st & 2nd Year",
            fee: "6,000 BDT/month",
            daysPerWeek: 3,
            mode: "Online + Offline",
            location: "Dhanmondi, Dhaka",
            status: "approved",
            applicantsCount: 3,
            postedAt: "Nov 10, 2026",
        },
        {
            id: "t-2",
            title: "O-Level Mathematics D & Additional Math Crash Course",
            subject: "Mathematics",
            classLevel: "Grade 9 & 10 (Cambridge/Edexcel)",
            fee: "7,500 BDT/month",
            daysPerWeek: 4,
            mode: "Online",
            location: "Online",
            status: "approved",
            applicantsCount: 2,
            postedAt: "Nov 12, 2026",
        },
        {
            id: "t-3",
            title: "University Admission ICT & Chemistry Masterclass",
            subject: "Chemistry & ICT",
            classLevel: "Admission Examinee 2026",
            fee: "5,000 BDT/month",
            daysPerWeek: 2,
            mode: "Online",
            location: "Online",
            status: "pending",
            applicantsCount: 0,
            postedAt: "Nov 17, 2026",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Tuitions</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your tuition postings, view details, and track performance.
                    </p>
                </div>

                <Button nativeButton={false} render={<Link href="/dashboard/tutor/post-tuition" />}>
                    <PlusCircle className="size-4" />
                    Post New Tuition
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="size-5 text-primary" />
                        <span className="font-semibold text-sm">All Posted Tuitions</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {tuitions.length} Listings
                    </span>
                </div>

                <div className="divide-y divide-border">
                    {tuitions.map((item) => (
                        <div
                            key={item.id}
                            className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-muted/30 transition-colors"
                        >
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-semibold text-base text-foreground">
                                        {item.title}
                                    </h3>
                                    <Badge
                                        variant={item.status === "approved" ? "success" : "warning"}
                                        className="text-xs capitalize"
                                    >
                                        {item.status === "approved" ? (
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="size-3" /> Approved & Live
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3" /> Pending Admin Review
                                            </span>
                                        )}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                                    <span>Subject: <strong className="text-foreground">{item.subject}</strong></span>
                                    <span>Class: {item.classLevel}</span>
                                    <span>Fee: <strong className="text-foreground">{item.fee}</strong></span>
                                    <span>Mode: {item.mode}</span>
                                    <span>Days: {item.daysPerWeek} days/week</span>
                                    <span>Posted: {item.postedAt}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    nativeButton={false}
                                    render={<Link href="/dashboard/tutor/applicants" />}
                                >
                                    <Users className="size-3.5" />
                                    {item.applicantsCount} Applicants
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

