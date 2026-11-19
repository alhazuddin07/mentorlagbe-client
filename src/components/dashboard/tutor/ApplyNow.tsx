
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRight, X } from "lucide-react";
import { applyForTuition } from "@/lib/api/tuitions/tuitions-api";
import { ITuition } from "@/types/tuitions/tuitions";
import { useClientUserSession } from "@/lib/client-side-sessions";



const ApplyNow = ({ tuition }: { tuition: ITuition }) => {

    const { data: session, isPending } = useClientUserSession();
    const user = session?.user;

    const userRole = user?.role;

    if (isPending) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const phone = String(formData.get("phone") || "");

        console.log("Current Tuition ID:", tuition._id);
        console.log("Current Tuition Title:", tuition.title);

        try {
            const applicationData = {
                tuitionId: tuition._id,
                studentName: user?.name,
                studentEmail: user?.email,
                phone,
                preferredSchedule: String(formData.get("preferredSchedule") || ""),
                learningNote: String(formData.get("learningNote") || ""),
                appliedDate: new Date(),
                tuitionTitle: tuition.title,
                classLavel: tuition.classLevel,
                status: "Awaiting Decision",

            };

            const result = await applyForTuition(applicationData);

            console.log(result);

            form.reset();

        } catch (error) {
            console.error(error);
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
                                className="group w-full gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0"
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
                                Fill out the form below to apply for this tuition.
                            </PopoverDescription>
                        </PopoverHeader>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                                    placeholder="e.g. 5 PM - 7 PM"
                                    required
                                />
                            </div>

                            {/* Learning Note */}
                            <div className="space-y-2">
                                <Label htmlFor="note">Learning Note</Label>
                                <Textarea
                                    id="note"
                                    name="learningNote"
                                    placeholder="Tell the tutor why you are interested..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Submit Application
                            </Button>
                        </form>
                    </PopoverContent>
                </Popover>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Only students can apply for this tuition.
                </p>
            )}
        </div>
    );
};

export default ApplyNow;