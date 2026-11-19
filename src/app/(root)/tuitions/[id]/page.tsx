import { getSingleTuition } from "@/lib/api/tuitions/tuitions-api";
import { ITuition } from "@/types/tuitions/tuitions";
import Image from "next/image";
import { notFound } from "next/navigation";


interface PageProps {
    params: Promise<{ id: string }>;
}


const TuitionDetailsPage = async({ params }: PageProps) => {

    const { id } = await params;

    const result = await getSingleTuition(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const tuition: ITuition = result.data;

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <div className="overflow-hidden rounded-2xl border bg-card">

                {tuition.bannerImage && (
                    <div className="relative h-72 w-full">
                        <Image
                            src={tuition.bannerImage}
                            alt={tuition.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="space-y-5 p-6">
                    <h1 className="text-3xl font-bold">
                        {tuition.title}
                    </h1>

                    <p className="text-muted-foreground">
                        {tuition.description}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <p>Subject: {tuition.subject}</p>
                        <p>Class: {tuition.classLevel}</p>
                        <p>Mode: {tuition.mode}</p>
                        <p>Monthly Fee: ৳{tuition.monthlyFee}</p>
                        <p>Days Per Week: {tuition.daysPerWeek}</p>
                        {tuition.location && (
                            <p>Location: {tuition.location}</p>
                        )}
                        <p>Tutor: {tuition.tutorName || "Not provided"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetailsPage;