import { redirect } from "next/navigation";
import PostTuitionForm from "@/components/dashboard/PostTutionForm";
import { getServerSession } from "@/lib/get-session";
import { getTutorTuitionCount } from "@/lib/api/tuitions/tuitions-api";
import { getUserPremiumById } from "@/lib/api/users/users-api";

const FREE_TUITION_LIMIT = 2;

export default async function TutorPostTuitionPage() {
    const session = await getServerSession();
    const user = session?.user;

    if (!user) {
        return redirect("/sign-in");
    }

    const [premiumResult, tuitionCount] = await Promise.all([
        getUserPremiumById(user.id),
        getTutorTuitionCount(user.id),
    ]);

    // Free tutors get three posts; after that they must upgrade to Pro.
    if (!premiumResult.premium && tuitionCount.count >= FREE_TUITION_LIMIT) {
        return redirect("/pricing");
    }

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
