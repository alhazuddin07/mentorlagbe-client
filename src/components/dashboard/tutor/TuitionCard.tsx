import Image from "next/image";
import Link from "next/link";
import {
    BookOpen,
    GraduationCap,
    MapPin,
    Monitor,
    Building2,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ITuition } from "@/types/tuitions/tuitions";
import BookmarkButton from "@/components/tuitions/BookmarkButton";

interface TuitionCardProps {
    tuition: ITuition;
}

const TuitionCard = ({ tuition }: TuitionCardProps) => {
    return (

        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">

            {/* Banner Image */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {tuition.bannerImage ? (
                    <Image
                        src={tuition.bannerImage}
                        alt={tuition.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="eager"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center">
                        <BookOpen className="size-12 text-muted-foreground" />
                    </div>
                )}

                <Badge className="absolute left-3 top-3 capitalize">
                    {tuition.mode}
                </Badge>

                <Badge
                    variant="secondary"
                    className="absolute right-3 top-3"
                >
                    {tuition.classLevel}
                </Badge>

                <BookmarkButton
                    tuitionId={tuition._id}
                    tuitionTitle={tuition.title}
                    className="absolute right-3 bottom-3 z-10"
                />
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">

                {/* Title and Subject */}
                <div>
                    <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-primary">
                        <GraduationCap className="size-4" />
                        {tuition.subject}
                    </p>

                    <h3 className="line-clamp-1 text-xl font-bold transition-colors group-hover:text-primary">
                        {tuition.title}
                    </h3>
                </div>

                {/* Tuition Information */}
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">

                    <div className="flex items-center gap-2">
                        {tuition.mode === "online" ? (
                            <Monitor className="size-4 text-primary" />
                        ) : (
                            <Building2 className="size-4 text-primary" />
                        )}

                        <span className="capitalize">
                            {tuition.mode} Tuition
                        </span>
                    </div>

                    {tuition.mode === "offline" && tuition.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-primary" />
                            <span className="line-clamp-1">
                                {tuition.location}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-primary" />
                        <span>
                            {tuition.daysPerWeek} Days / Week
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-primary" />
                        <span>
                            Tutor: {tuition.tutorName || "Not provided"}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-5">
                    <div className="mb-4 flex items-center justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">
                            Monthly Fee
                        </span>

                        <p className="text-xl font-bold text-primary">
                            ৳{tuition.monthlyFee.toLocaleString()}
                        </p>
                    </div>

                    <Link
                        href={`/tuitions/${tuition._id}`}
                        className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        View Details
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TuitionCard;