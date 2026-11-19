
import {
    ClipboardList,
    CheckCircle2,
    Clock,
    XCircle,
    BookOpen,
    Users,
    Wallet,
    MapPin,
    CalendarDays,
    GraduationCap,
    Monitor,
    Building2,
} from "lucide-react";

import TuitionActions from "@/components/dashboard/admin/TuitionActions";
import { Badge } from "@/components/ui/badge";
import { getTuitions } from "@/lib/api/tuitions/tuitions-api";
import { ITuition } from "@/types/tuitions/tuitions";
import Image from "next/image";

export default async function AdminTuitionsPage() {
    const tuitions: ITuition[] = await getTuitions();

    const pendingTuitions = tuitions.filter(
        (item) => item.approvalStatus === "pending"
    );

    const approvedTuitions = tuitions.filter(
        (item) => item.approvalStatus === "approved"
    );

    const rejectedTuitions = tuitions.filter(
        (item) => item.approvalStatus === "rejected"
    );

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const stats = [
        {
            title: "Total Tuitions",
            value: tuitions.length,
            icon: ClipboardList,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            title: "Pending Review",
            value: pendingTuitions.length,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-500/10",
        },
        {
            title: "Approved",
            value: approvedTuitions.length,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-500/10",
        },
        {
            title: "Rejected",
            value: rejectedTuitions.length,
            icon: XCircle,
            color: "text-rose-600",
            bg: "bg-rose-500/10",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                        <ClipboardList className="size-4" />
                        Tuition Management
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Moderate Tuitions
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review tuition submissions and manage their approval status.
                    </p>
                </div>

                <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                    {tuitions.length} Total Listings
                </Badge>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </p>

                                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                                    <Icon className={`size-5 ${stat.color}`} />
                                </div>
                            </div>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight">
                                {stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* Tuition Listings */}
            <div className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            All Platform Tuitions
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manage and review all submitted tuition posts.
                        </p>
                    </div>
                </div>

                {tuitions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
                        <div className="mb-4 rounded-full bg-muted p-4">
                            <BookOpen className="size-8 text-muted-foreground" />
                        </div>

                        <h3 className="text-lg font-semibold">
                            No Tuitions Found
                        </h3>

                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            There are no tuition submissions available right now.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tuitions.map((item) => (
                            <div
                                key={item._id}
                                className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                            >
                                <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center">
                                    {/* Tuition Image */}
                                    <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-48 lg:h-32 lg:w-44">
                                        {item.bannerImage ? (
                                            <Image
                                                src={item.bannerImage}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 176px"
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center">
                                                <BookOpen className="size-10 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Tuition Information */}
                                    <div className="min-w-0 flex-1 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-lg font-semibold">
                                                {item.title}
                                            </h3>

                                            {item.approvalStatus === "approved" && (
                                                <Badge className="gap-1 border-0 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                                                    <CheckCircle2 className="size-3" />
                                                    Approved
                                                </Badge>
                                            )}

                                            {item.approvalStatus === "pending" && (
                                                <Badge className="gap-1 border-0 bg-amber-500/10 text-amber-600 hover:bg-amber-500/10">
                                                    <Clock className="size-3" />
                                                    Pending
                                                </Badge>
                                            )}

                                            {item.approvalStatus === "rejected" && (
                                                <Badge className="gap-1 border-0 bg-rose-500/10 text-rose-600 hover:bg-rose-500/10">
                                                    <XCircle className="size-3" />
                                                    Rejected
                                                </Badge>
                                            )}

                                            {!item.isActive && (
                                                <Badge variant="secondary">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <GraduationCap className="size-4" />
                                                {item.subject}
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <BookOpen className="size-4" />
                                                {item.classLevel}
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                {item.mode === "online" ? (
                                                    <Monitor className="size-4" />
                                                ) : (
                                                    <Building2 className="size-4" />
                                                )}
                                                <span className="capitalize">
                                                    {item.mode}
                                                </span>
                                            </span>

                                            {item.mode === "offline" && item.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="size-4" />
                                                    {item.location}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                                <Users className="size-4" />
                                                Tutor:
                                                <strong className="text-foreground">
                                                    {item.tutorName || "Not provided"}
                                                </strong>
                                            </span>

                                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                                <Wallet className="size-4" />
                                                <strong className="text-foreground">
                                                    ৳{item.monthlyFee.toLocaleString()}
                                                </strong>
                                                / month
                                            </span>

                                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                                <CalendarDays className="size-4" />
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>

                                        {item.tutorEmail && (
                                            <p className="truncate text-xs text-muted-foreground">
                                                {item.tutorEmail}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex shrink-0 flex-wrap items-center gap-2 border-t pt-4 lg:flex-col lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                                        {item.approvalStatus === "pending" && (
                                            <TuitionActions tuitionId={item._id} />
                                        )}

                                        {item.approvalStatus === "approved" && (
                                            <Badge className="border-0 bg-emerald-500/10 text-emerald-600">
                                                <CheckCircle2 className="mr-1 size-3" />
                                                Published
                                            </Badge>
                                        )}

                                        {item.approvalStatus === "rejected" && (
                                            <Badge variant="secondary">
                                                Review completed
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="border-t bg-muted/20 px-5 py-3">
                                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
