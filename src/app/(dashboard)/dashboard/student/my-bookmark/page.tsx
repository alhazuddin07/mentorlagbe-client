
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { IBookmark } from "@/types/bookmarks/bookmarks";
import { Loader2, BookmarkX } from "lucide-react";
import { toast } from "@/components/ui/toast";

import {
    getBookmarks,
    removeBookmark,
} from "@/lib/api/bookmarks/bookmarks-api";

import BookmarkHeader from "@/components/dashboard/bookmark/BookmarkHeader";
import BookmarkCard from "@/components/dashboard/bookmark/BookmarkCard";

export default function MyBookmarkPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = session?.user?.id;

    // Fetch bookmarks
    useEffect(() => {
        if (isPending || !userId) return;

        let isMounted = true;

        const fetchBookmarks = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getBookmarks(userId);

                if (isMounted) {
                    setBookmarks(data);
                }
            } catch (error) {
                console.error("Fetch bookmarks error:", error);

                if (isMounted) {
                    setError("Failed to load bookmarks.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchBookmarks();

        return () => {
            isMounted = false;
        };
    }, [userId, isPending]);

    // Remove bookmark
    const handleRemoveBookmark = async (tuitionId: string) => {
        try {
            const result = await removeBookmark(tuitionId);

            if (!result.success) {
                throw new Error(
                    result.message || "Failed to remove bookmark"
                );
            }

            // Update UI
            setBookmarks((prev) =>
                prev.filter(
                    (bookmark) => bookmark.tuitionId !== tuitionId
                )
            );

            // Update localStorage
            const storageKey = `mentorlagbe_bookmarks_${userId}`;

            const currentBookmarks: string[] = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            const updatedBookmarks = currentBookmarks.filter(
                (id) => id !== tuitionId
            );

            localStorage.setItem(
                storageKey,
                JSON.stringify(updatedBookmarks)
            );

            window.dispatchEvent(
                new CustomEvent("mentorlagbe-bookmarks-changed")
            );

            toast.add({
                title: "Bookmark removed",
                description: "Tuition removed from your bookmarks.",
            });
        } catch (error) {
            console.error("Remove bookmark error:", error);

            toast.add({
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to remove bookmark.",
            });
        }
    };

    // Navigate to tuition details
    const handleViewDetails = (tuitionId: string) => {
        router.push(`/tuitions/${tuitionId}`);
    };

    if (isPending || (userId && loading)) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <Loader2
                    className="animate-spin text-violet-600"
                    size={35}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <BookmarkHeader bookmarkCount={bookmarks.length} />

            {bookmarks.length === 0 ? (
                <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                    <BookmarkX
                        size={55}
                        className="mb-4 text-gray-400"
                    />

                    <h2 className="text-xl font-bold text-gray-800">
                        No Bookmarks Yet!
                    </h2>

                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                        You haven&apos;t saved any tuition yet.
                        Explore available tuitions and bookmark your favorites.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark._id}
                            tuition={bookmark.tuition}
                            onRemove={handleRemoveBookmark}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}