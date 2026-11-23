"use client";

import { Bookmark } from "lucide-react";

interface BookmarkHeaderProps {
    bookmarkCount: number;
}

export default function BookmarkHeader({ bookmarkCount }: BookmarkHeaderProps) {
    return (
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                    <Bookmark size={34} fill="currentColor" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        My Bookmarks
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Your saved tuitions for later 💜
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-violet-50 p-5">
                <Bookmark size={30} className="text-violet-600" />
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        {bookmarkCount} Bookmarks
                    </h2>
                    <p className="text-sm text-gray-500">
                        Keep track of your favorite tuitions
                    </p>
                </div>
            </div>
        </div>
    );
}