
"use client";

import { useSyncExternalStore, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import {
    addBookmark,
    removeBookmark,
} from "@/lib/api/bookmarks/bookmarks-api";
import { cn } from "cn";

interface BookmarkButtonProps {
    tuitionId: string;
    tuitionTitle?: string;
    className?: string;
}

const FREE_BOOKMARK_LIMIT = 5;

function subscribe(callback: () => void) {
    window.addEventListener("mentorlagbe-bookmarks-changed", callback);
    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener("mentorlagbe-bookmarks-changed", callback);
        window.removeEventListener("storage", callback);
    };
}

function getStoredBookmarks(key: string): string[] {
    try {
        if (typeof window === "undefined") return [];

        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export default function BookmarkButton({
    tuitionId,
    tuitionTitle,
    className,
}: BookmarkButtonProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const userPlan =
        (user as { plan?: string } | undefined)?.plan || "free";

    const isPro =
        userPlan === "pro" ||
        (user as { premium?: boolean } | undefined)?.premium === true;

    const storageKey = user
        ? `mentorlagbe_bookmarks_${user.id || user.email}`
        : "mentorlagbe_bookmarks_guest";

    const getSnapshot = useCallback(() => {
        const bookmarks = getStoredBookmarks(storageKey);
        return bookmarks.includes(tuitionId);
    }, [storageKey, tuitionId]);

    const isBookmarked = useSyncExternalStore(
        subscribe,
        getSnapshot,
        () => false
    );

    const handleToggle = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.add({
                title: "Sign in required",
                description: "Please sign in to bookmark tuitions.",
            });

            router.push("/sign-in");
            return;
        }

        const currentBookmarks = getStoredBookmarks(storageKey);
        const currentlyBookmarked = currentBookmarks.includes(tuitionId);

        // Remove bookmark
        if (currentlyBookmarked) {
            try {
                const result = await removeBookmark(tuitionId);

                if (!result.success) {
                    throw new Error(
                        result.message || "Failed to remove bookmark"
                    );
                }

                const updated = currentBookmarks.filter(
                    (id) => id !== tuitionId
                );

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(updated)
                );

                window.dispatchEvent(
                    new CustomEvent("mentorlagbe-bookmarks-changed")
                );

                toast.add({
                    title: "Bookmark removed",
                    description: tuitionTitle
                        ? `"${tuitionTitle}" removed from bookmarks.`
                        : "Tuition removed from bookmarks.",
                });
            } catch (error) {
                console.error("Remove bookmark error:", error);

                toast.add({
                    title: "Error",
                    description:
                        error instanceof Error
                            ? error.message
                            : "Failed to remove bookmark. Please try again.",
                });
            }

            return;
        }

        // Check free bookmark limit
        if (!isPro && currentBookmarks.length >= FREE_BOOKMARK_LIMIT) {
            toast.add({
                title: "Upgrade to Pro",
                description: `Free plan limit reached (${FREE_BOOKMARK_LIMIT} bookmarks). Upgrade to Pro for unlimited bookmarks!`,
            });

            router.push("/pricing");
            return;
        }

        // Add bookmark
        try {
            const result = await addBookmark({
                userId: user.id,
                userEmail: user.email,
                tuitionId,
            });

            if (!result.success) {
                if (result.requiresPayment) {
                    router.push("/pricing");
                }

                throw new Error(
                    result.message || "Failed to add bookmark"
                );
            }

            const updated = [...currentBookmarks, tuitionId];

            localStorage.setItem(
                storageKey,
                JSON.stringify(updated)
            );

            window.dispatchEvent(
                new CustomEvent("mentorlagbe-bookmarks-changed")
            );

            toast.add({
                title: "Bookmarked!",
                description: tuitionTitle
                    ? `"${tuitionTitle}" saved to your bookmarks.`
                    : "Tuition saved to your bookmarks.",
            });
        } catch (error) {
            console.error("Add bookmark error:", error);

            const err = error as Error & {
                requiresPayment?: boolean;
            };

            if (err.requiresPayment) {
                toast.add({
                    title: "Upgrade to Pro",
                    description:
                        err.message ||
                        "Upgrade to Pro for unlimited bookmarks.",
                });

                router.push("/pricing");
                return;
            }

            toast.add({
                title: "Error",
                description:
                    err.message || "Failed to add bookmark.",
            });
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            title={isBookmarked ? "Remove bookmark" : "Bookmark tuition"}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark tuition"}
            className={cn(
                "group/btn relative flex size-9 items-center justify-center rounded-full bg-white/95 dark:bg-card/95 text-foreground shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isBookmarked && "text-primary ring-1 ring-primary/30",
                className
            )}
        >
            <Bookmark
                className={cn(
                    "size-4.5 transition-all",
                    isBookmarked
                        ? "fill-primary text-primary scale-110"
                        : "text-muted-foreground group-hover/btn:text-primary"
                )}
            />
        </button>
    );
}