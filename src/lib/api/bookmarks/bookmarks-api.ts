
import {
    authFetch,
    authPost,
    deleteFetch,
} from "@/lib/get-session";

import { IBookmark } from "@/types/bookmarks/bookmarks";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Get Student Bookmarks
export const getBookmarks = async (
    userId: string
): Promise<IBookmark[]> => {
    try {
        const api = `${BASE_URL}/bookmarks/${encodeURIComponent(userId)}`;

        const result = await authFetch(api);

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch bookmarks");
        }

        return result.data || [];

    } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
        throw error;
    }
};

// Add Bookmark
export const addBookmark = async (
    data: { tuitionId: string }
) => {
    const api = `${BASE_URL}/bookmarks`;

    const result = await authPost(api, data);

    if (!result.success) {
        const error = new Error(
            result.message || "Failed to add bookmark"
        );

        if (result.requiresPayment) {
            (error as Error & { requiresPayment?: boolean }).requiresPayment = true;
        }

        throw error;
    }

    return result;
};

// Remove Bookmark
export const removeBookmark = async (tuitionId: string) => {
    const api = `${BASE_URL}/bookmarks/${encodeURIComponent(tuitionId)}`;

    return await deleteFetch(api);
};