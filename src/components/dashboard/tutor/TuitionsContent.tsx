import { BookOpen } from "lucide-react";
import TuitionCard from "./TuitionCard";
import SearchTuitions from "./SearchTuitions";
import FilterTuitions from "./FilterTuitions";
import { Badge } from "@/components/ui/badge";
import { connection } from "next/server";
import { ITuition } from "@/types/tuitions/tuitions";
import { BrowseTuitions } from "@/lib/api/tuitions/tuitions-api";


const TuitionsContent = async () => {

    await connection();

    const tuitions = await BrowseTuitions();
    const tuition: ITuition[] = tuitions.data ?? [];

    return (
        <section className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 text-center">
                    <Badge className="mb-3">
                        Explore Opportunities
                    </Badge>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Find Your Ideal <span className="text-primary">Tuition</span>
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Discover qualified tutors and find the perfect
                        learning opportunity for your academic journey.
                    </p>
                </div>

                <div className="flex justify-between">
                    <SearchTuitions tuitions={tuition} />
                    <FilterTuitions tuitions={tuition} />
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Available Tuitions
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {tuition.length} Listings Found
                    </p>
                </div>

                {tuition.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tuition.map((item) => (
                            <TuitionCard key={item._id} tuition={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-20 text-center">
                        <div className="mb-4 rounded-full bg-muted p-4">
                            <BookOpen className="size-10 text-muted-foreground" />
                        </div>

                        <h3 className="text-xl font-semibold">
                            No Tuitions Available
                        </h3>

                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                            No approved tuition listings are available right now.
                            Please check back later.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TuitionsContent;