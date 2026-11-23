
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    ArrowRight,
    LogIn,
    Loader2,
} from "lucide-react";

import { applyForTuition } from "@/lib/api/tuitions/tuitions-api";
import { ITuition } from "@/types/tuitions/tuitions";
import { useClientUserSession } from "@/lib/client-side-sessions";
import { getApplicationsCount, getStudentApplications } from "@/lib/api/students/applications";
import { getUserPremiumById } from "@/lib/api/users/users-api";

const ApplyNow = ({ tuition }: { tuition: ITuition }) => {
    const router = useRouter();

    const { data: session, isPending } = useClientUserSession();

    const user = session?.user;
    const userRole = (user?.role || "").toLowerCase();

    const [hasApplied, setHasApplied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [checkingApplication, setCheckingApplication] = useState(true);

    // Check whether the student has already applied
    useEffect(() => {
        if (isPending || !user?.email || userRole !== "student") {
            return;
        }

        let active = true;

        const checkApplication = async () => {
            try {
                const result = await getStudentApplications(user.email);

                const applications = Array.isArray(result)
                    ? result
                    : result?.data || result?.applications || [];

                const alreadyApplied = applications.some(
                    (application: { tuitionId?: string }) =>
                        application.tuitionId === tuition._id
                );

                if (active) {
                    setHasApplied(alreadyApplied);
                }
            } catch (error) {
                console.error("Check application error:", error);
            } finally {
                if (active) {
                    setCheckingApplication(false);
                }
            }
        };

        checkApplication();

        return () => {
            active = false;
        };
    }, [user?.email, userRole, tuition._id, isPending]);

    // Handle application submission
    const handleApplyNow = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!user?.email || hasApplied || submitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            setSubmitting(true);

            // Check premium status and application limit
            const premiumResult = await getUserPremiumById(user.id);

            const countResult = await getApplicationsCount(
                `applicantId=${user.id}`
            );

            if (!premiumResult.premium && countResult.count >= 2) {
                router.push("/payment");
                return;
            }

            const applicationData = {
                tuitionId: tuition._id,
                tutorEmail: tuition.tutorEmail,
                studentName: user.name || "Student",
                studentEmail: user.email,
                phone: String(formData.get("phone") || ""),
                preferredSchedule: String(
                    formData.get("preferredSchedule") || ""
                ),
                learningNote: String(
                    formData.get("learningNote") || ""
                ),
                appliedDate: new Date(),
                tuitionTitle: tuition.title,
                classLavel: tuition.classLevel,
                status: "pending",
            };

            const result = await applyForTuition(applicationData);

            if (!result.success) {
                if (result.alreadyApplied) {
                    setHasApplied(true);

                    toast.add({
                        title: "Already Applied",
                        description:
                            "You have already applied for this tuition.",
                    });

                    return;
                }

                throw new Error(
                    result.message || "Application failed"
                );
            }

            setHasApplied(true);
            form.reset();

            toast.add({
                title: "Application Submitted",
                description:
                    "Your application has been submitted to the tutor.",
            });

            router.push("/dashboard/student/my-applications");

        } catch (error) {
            console.error("Application error:", error);

            toast.add({
                title: "Application Failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.",
            });
        } finally {
            setSubmitting(false);
        }
    };

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

    // Only students can apply
    if (userRole !== "student") {
        return (
            <p className="py-2 text-center text-xs text-muted-foreground">
                Only students can apply for tuition listings.
            </p>
        );
    }

    // Checking previous application
    if (isPending || (userRole === "student" && checkingApplication)) {
        return (
            <Button
                size="lg"
                disabled
                className="w-full gap-2 rounded-xl"
            >
                <Loader2 className="size-4 animate-spin" />
                Checking Application...
            </Button>
        );
    }

    // Already applied
    if (hasApplied) {
        return (
            <Button
                size="lg"
                disabled
                className="w-full gap-2 rounded-xl"
            >
                Already Applied
            </Button>
        );
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger
                    render={
                        <Button
                            size="lg"
                            className="group w-full gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0"
                        >
                            Apply Now
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    }
                />

                <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Apply for Tuition
                        </DialogTitle>

                        <DialogDescription>
                            Fill out the details below to submit your
                            application to the tutor.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleApplyNow}
                        className="mt-3 space-y-4"
                    >
                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                Phone Number
                            </Label>

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
                            <Label htmlFor="note">
                                Learning Note
                            </Label>

                            <Textarea
                                id="note"
                                name="learningNote"
                                placeholder="Tell the tutor about your goals and learning needs..."
                                rows={4}
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <DialogClose
                                render={
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </Button>
                                }
                            />

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="flex-1"
                            >
                                {submitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="size-4 animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    <>
                                        Submit Application
                                        <ArrowRight className="ml-1 size-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ApplyNow;