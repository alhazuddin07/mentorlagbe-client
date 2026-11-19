import Link from "next/link";
import { Suspense } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyTuitionsPage from "@/components/dashboard/tutor/MyTuitions";

export default function TutorMyTuitionsPage() {
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Tuitions
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your tuition postings, view details, and track performance.
                    </p>
                </div>

                <Button
                    nativeButton={false}
                    render={<Link href="/dashboard/tutor/post-tuition" />}
                >
                    <PlusCircle className="size-4" />
                    Post New Tuition
                </Button>
            </div>

            <Suspense fallback={<p>Loading your tuitions...</p>}>
                <MyTuitionsPage />
            </Suspense>
        </div>
    );
}

