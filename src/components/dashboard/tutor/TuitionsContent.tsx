import { BookOpen } from "lucide-react";
import TuitionCard from "./TuitionCard";
import SearchTuitions from "./SearchTuitions";
import FilterTuitions from "./FilterTuitions";
import { Badge } from "@/components/ui/badge";
import { connection } from "next/server";
import { ITuition } from "@/types/tuitions/tuitions";
import { BrowseTuitions } from "@/lib/api/tuitions/tuitions-api";
import TuitionList from "./TuitionList";


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

                <TuitionList tuitions={tuition} />
                
            </div>
        </section>
    );
};

export default TuitionsContent;