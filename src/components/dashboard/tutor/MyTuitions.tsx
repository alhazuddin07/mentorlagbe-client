import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTuitionApplicationCount, getTuitions } from "@/lib/api/tuitions/tuitions-api";
import { ITuition } from "@/types/tuitions/tuitions";
import Link from "next/link";
import { connection } from "next/server";
import { BriefcaseBusiness, CheckCircle2, Clock, Users } from "lucide-react";
import EditTuition from "./EditTuition";
import DeleteTuition from "./DeleteTuition";
import ToggleTuition from "./ToggleTuition";

type TuitionWithStatus = ITuition & {
    applicantsCount: number;
};

const MyTuitionsPage = async () => {

    await connection();

    const tuitions = await getTuitions();

    const tuitionsWithCount: TuitionWithStatus[] = await Promise.all(
        tuitions.map(async (item: ITuition) => {
            const { count } = await getTuitionApplicationCount(item._id);

            return {
                ...item,
                applicantsCount: count,
            };
        })
    );

    return (
        <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
            <div className="border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="size-5 text-primary" />
                    <span className="font-semibold text-sm">All Posted Tuitions</span>
                </div>
                <span className="text-xs text-muted-foreground">
                    {tuitionsWithCount.length} Listings
                </span>
            </div>

            <div className="divide-y divide-border">
                {tuitionsWithCount.map((item) => (
                    <div
                        key={item._id}
                        className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-muted/30 transition-colors"
                    >
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-base text-foreground">
                                    {item.title}
                                </h3>
                                <Badge
                                    variant={item.approvalStatus === "approved" ? "success" : "warning"}
                                    className="text-xs capitalize"
                                >
                                    {item.approvalStatus === "approved" ? (
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
                                <span>Fee: <strong className="text-foreground">{item.monthlyFee}</strong></span>
                                <span>Mode: {item.mode}</span>
                                <span>Days: {item.daysPerWeek} days/week</span>
                                <span>Posted: {item.createdAt}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <div>
                                <EditTuition item={item} />
                            </div>

                            <div>
                                <DeleteTuition item={item} />
                            </div>

                            <div>
                                <ToggleTuition item={item} />
                            </div>

                            <div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    nativeButton={false}
                                    render={
                                        <Link href={`/dashboard/tutor/applicants?tuitionId=${item._id}`} />
                                    }
                                >
                                    <Users className="size-3.5" />
                                    {item.applicantsCount}{" "}
                                    {item.applicantsCount === 1 ? "Applicant" : "Applicants"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTuitionsPage;