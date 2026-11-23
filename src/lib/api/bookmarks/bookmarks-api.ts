const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

import { authFetch, authPost, deleteFetch } from "@/lib/get-session";
import { IBookmark } from "@/types/bookmarks/bookmarks";

export const getBookmarks = async ( userId: string ): Promise<IBookmark[]> => {
    try {
        const api =  `${BASE_URL}/bookmarks/${userId}`
        const result = await authFetch(api);

        return result.data;
    } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
        throw error;
    }
};

export const addBookmark = async (data: { userId?: string, userEmail?: string; tuitionId: string }) => {
    const api = `${BASE_URL}/bookmarks`
    const result = await authPost(api, data);

    if (!result.success) {
        const error = new Error(result.message || "Failed to add bookmark");

        if (result.requiresPayment) {
            (error as Error & { requiresPayment?: boolean }).requiresPayment = true;
        }

        throw error;
    }

    return result;
};

export const removeBookmark = async (tuitionId: string) => {
    return await deleteFetch(
        `${BASE_URL}/bookmarks/${tuitionId}`
    );
};