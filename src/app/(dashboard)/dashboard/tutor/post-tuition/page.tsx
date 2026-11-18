import PostTuitionForm from "@/components/dashboard/PostTutionForm";

export default function TutorPostTuitionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Post a New Tuition</h1>
                <p className="text-sm text-muted-foreground">
                    Create a detailed tuition posting to attract students seeking mentorship.
                </p>
            </div>
            <PostTuitionForm />
        </div>
    );
}

