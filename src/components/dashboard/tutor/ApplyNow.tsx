"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRight, X, LogIn, Loader2 } from "lucide-react";
import { applyForTuition } from "@/lib/api/tuitions/tuitions-api";
import { ITuition } from "@/types/tuitions/tuitions";
import { useClientUserSession } from "@/lib/client-side-sessions";
import { useRouter } from "next/navigation";

const ApplyNow = ({ tuition }: { tuition: ITuition }) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const { data: session, isPending } = useClientUserSession();
    const user = session?.user;
    const userRole = (user?.role || "").toLowerCase();

    if (isPending) {
        return null;
    }

    // Unauthenticated user
    if (!user) {
        return (
            <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className="w-full gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0"
            >
                <LogIn className="size-4" />
                Sign in to Apply
            </Button>
        );
    }

    const handleApplyNow = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const phone = String(formData.get("phone") || "");

        if (!user?.id || !user?.email) return;

        try {
            setSubmitting(true);

            const applicationData = {
                tuitionId: tuition._id,
                tutorEmail: tuition.tutorEmail,
                studentName: user.name || "Student",
                studentEmail: user.email,
                phone,
                preferredSchedule: String(formData.get("preferredSchedule") || ""),
                learningNote: String(formData.get("learningNote") || ""),
                appliedDate: new Date(),
                tuitionTitle: tuition.title,
                classLavel: tuition.classLevel,
                status: "pending",
            };

            const result = await applyForTuition(applicationData);

            if (result.duplicate) {
                toast.add({
                    title: "Already Applied",
                    description: "You have already applied for this tuition.",
                });
                return;
            }

            toast.add({
                title: "Application Submitted",
                description: "Your application has been submitted to the tutor.",
            });

            form.reset();
            router.push("/dashboard/student/my-applications");
        } catch (error) {
            console.error("Application submission error:", error);
            toast.add({
                title: "Application Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to submit application. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {userRole === "student" ? (
                <Popover>
                    <PopoverTrigger
                        nativeButton={true}
                        render={
                            <Button
                                size="lg"
                                className="group w-full gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0 cursor-pointer"
                            >
                                Apply Now
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        }
                    />
                    <PopoverContent className="w-80 sm:w-100">
                        <PopoverClose
                            className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                            aria-label="Close popover"
                        >
                            <X size={18} />
                        </PopoverClose>
                        <PopoverHeader>
                            <PopoverTitle>Apply for Tuition</PopoverTitle>
                            <PopoverDescription>
                                Fill out the details below to submit your application to the tutor.
                            </PopoverDescription>
                        </PopoverHeader>
                        <form onSubmit={handleApplyNow} className="mt-4 space-y-4">
                            {/* Phone Number */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            {/* Preferred Schedule */}
                            <div className="space-y-2">
                                <Label htmlFor="schedule">
                                    Preferred Schedule
                                </Label>
                                <Input
                                    id="schedule"
                                    name="preferredSchedule"
                                    placeholder="e.g. Mon, Wed, Fri (5 PM - 7 PM)"
                                    required
                                />
                            </div>

                            {/* Learning Note */}
                            <div className="space-y-2">
                                <Label htmlFor="note">Learning Note</Label>
                                <Textarea
                                    id="note"
                                    name="learningNote"
                                    placeholder="Tell the tutor about your goals and learning needs..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <Button type="submit" disabled={submitting} className="w-full cursor-pointer">
                                {submitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="size-4 animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit Application"
                                )}
                            </Button>
                        </form>
                    </PopoverContent>
                </Popover>
            ) : (
                <p className="text-center text-xs text-muted-foreground py-2">
                    Only students can apply for tuition listings.
                </p>
            )}
        </div>
    );
};

export default ApplyNow;
