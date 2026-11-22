import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MapPin,
  CalendarDays,
} from "lucide-react";

import { ITuition } from "@/types/tuitions/tuitions";
import { getLatestTuitions } from "@/lib/api/tuitions/tuitions-api";
import { Button } from "../ui/button";
import BookmarkButton from "@/components/tuitions/BookmarkButton";


interface TuitionCardProps {
  tuition: ITuition;
}

function TuitionCard({ tuition }: TuitionCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#EEE8FC] bg-white shadow-[0_6px_24px_rgba(91,61,245,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_14px_35px_rgba(91,61,245,0.15)]">

      {/* Bookmark Button */}
      <div className="absolute right-3 top-3 z-20">
        <BookmarkButton
          tuitionId={tuition._id}
          tuitionTitle={tuition.title}
        />
      </div>

      {/* Banner Image */}
      <Link
        href={`/tuitions/${tuition._id}`}
        className="relative block h-40 overflow-hidden bg-linear-to-br from-[#E9DDFF] to-[#F7F2FF]"
      >
        {tuition.bannerImage ? (
          <Image
            src={tuition.bannerImage}
            alt={tuition.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#8050D9]">
            <BookOpen size={45} />
          </div>
        )}

        {/* Subject Badge */}
        <span className="absolute bottom-3 left-3 rounded-full bg-[#742CE5] px-3 py-1 text-xs font-semibold text-white shadow-md">
          {tuition.subject}
        </span>
      </Link>

      {/* Card Content */}
      <div className="p-4">

        {/* Tuition Title */}
        <h3 className="truncate text-base font-semibold tracking-tight text-[#1B1245] transition-colors hover:text-[#6426D9]">
          {tuition.title}
        </h3>

        {/* Tutor Information */}
        <div className="mt-2 flex items-center gap-2">
          {tuition.tutoreImage ? (
            <Image
              src={tuition.tutoreImage}
              alt={tuition.tutorName || "MentorLagbe Tutor"}
              width={28}
              height={28}
              unoptimized
              className="h-7 w-7 rounded-full border border-[#EEE8FC] object-cover"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEE8FF] text-xs font-bold text-[#6426D9]">
              {tuition.tutorName?.charAt(0) || "T"}
            </div>
          )}

          <p className="truncate text-xs sm:text-sm font-medium text-[#858098]">
            by {tuition.tutorName || "MentorLagbe Tutor"}
          </p>
        </div>

        {/* Class and Mode */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[#F1ECFF] px-2 py-1 text-xs font-semibold text-[#6426D9]">
            {tuition.classLevel}
          </span>

          <span className="rounded-md bg-[#F5F3FA] px-2 py-1 text-xs font-medium capitalize text-[#68617E]">
            {tuition.mode}
          </span>
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-xs sm:text-sm text-[#858098]">
          <MapPin size={14} className="shrink-0 text-[#8050D9]" />
          <span className="truncate">{tuition.location}</span>
        </div>

        {/* Days Per Week */}
        <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#858098]">
          <CalendarDays size={14} className="text-[#8050D9]" />
          <span>{tuition.daysPerWeek} days / week</span>
        </div>

        {/* Monthly Fee */}
        <div className="mt-4 flex items-center justify-between border-t border-[#F0ECFA] pt-3">
          <span className="text-xs sm:text-sm font-medium text-[#858098]">
            Monthly Fee
          </span>

          <p className="text-sm sm:text-base font-bold text-[#6426D9]">
            ৳{tuition.monthlyFee?.toLocaleString("en-BD")}
            <span className="ml-1 text-xs font-medium text-[#858098]">
              / month
            </span>
          </p>
        </div>

        <Button
          className={'w-full mt-3 font-semibold'}
        >
          <Link
            href={`/tuitions/${tuition._id}`}
          >
            View Details
          </Link>
        </Button>

      </div>
    </article>
  );
}



export default async function LatestTuitions() {
  const tuitions = await getLatestTuitions();
  console.log("worked", tuitions);

  return (
    <section className="bg-white px-5 py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="relative mb-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#6426D9]">
            🔥 Latest Tuitions
          </span>

          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1B1245]">
            Explore the Best Tuitions
          </h2>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#68617E]">
            Find perfect tutors for any subject, anytime!
          </p>

          {/* View All Button */}
          <Link
            href="/tuitions"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#8B5CF6] px-4 py-2 text-sm font-semibold text-[#6426D9] transition-all duration-300 hover:bg-[#6426D9] hover:text-white sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2"
          >
            View All Tuitions
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tuition Cards */}
        {tuitions.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tuitions.map((tuition) => (
              <TuitionCard
                key={tuition._id}
                tuition={tuition}
              />
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#DCD2FF] bg-[#FBF9FF] px-5 py-14 text-center">
            <BookOpen
              className="mx-auto text-[#8050D9]"
              size={42}
            />

            <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-[#1B1245]">
              No Tuitions Available Yet
            </h3>

            <p className="mt-2 text-sm sm:text-base text-[#858098] leading-relaxed">
              New tuition opportunities will appear here soon.
            </p>

            <Link
              href="/tuitions"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#6426D9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#501BC0]"
            >
              Explore Tuitions
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
