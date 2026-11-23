
"use client";

import Image from "next/image";
import { BookmarkCheck, MapPin, CalendarDays, Wallet, ArrowRight } from "lucide-react";
import { ITuition } from "@/types/tuitions/tuitions";

interface BookmarkCardProps {
    tuition: ITuition;
    onRemove: (tuitionId: string) => void;
    onViewDetails: (tuitionId: string) => void;
}

export default function BookmarkCard({
    tuition,
    onRemove,
    onViewDetails,
}: BookmarkCardProps) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Banner Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={tuition.bannerImage}
                    alt={tuition.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subject Badge */}
                <span className="absolute bottom-3 left-3 rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                    {tuition.subject}
                </span>

                {/* Remove Bookmark */}
                <button
                    onClick={() => onRemove(tuition._id)}
                    aria-label="Remove bookmark"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-md transition hover:bg-red-50 hover:text-red-500"
                >
                    <BookmarkCheck size={21} />
                </button>
            </div>

            {/* Card Content */}
            <div className="space-y-4 p-5">

                <div>
                    <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
                        {tuition.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Class: {tuition.classLevel}
                    </p>
                </div>

                {/* Location & Mode */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-violet-600" />
                        {tuition.location}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 capitalize">
                        {tuition.mode}
                    </span>
                </div>

                {/* Days Per Week */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={17} className="text-violet-600" />
                    {tuition.daysPerWeek} Days / Week
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-1.5 font-bold text-violet-600">
                        <Wallet size={18} />
                        ৳ {tuition.monthlyFee.toLocaleString("en-BD")}
                        <span className="text-xs font-normal text-gray-500">
                            / month
                        </span>
                    </div>

                    <button
                        onClick={() => onViewDetails(tuition._id)}
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-violet-600 px-3 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white"
                    >
                        View Details
                        <ArrowRight size={16} />
                    </button>

                </div>
            </div>
        </div>
    );
}