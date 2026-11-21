const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getBookmarks = async (userIdentifier: string) => {
    try {
        const res = await fetch(
            `${BASE_URL}/bookmarks/${encodeURIComponent(userIdentifier)}`,
            {
                cache: "no-store",
            }
        );
        if (!res.ok) return [];
        return res.json();
    } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
        return [];
    }
};

export const addBookmark = async (data: {
    userId?: string;
    userEmail?: string;
    tuitionId: string;
}) => {
    const res = await fetch(`${BASE_URL}/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        const error = new Error(
            result.message || "Upgrade to Pro for unlimited bookmarks."
        );
        if (result.requiresPayment) {
            (error as unknown as { requiresPayment: boolean }).requiresPayment = true;
        }
        throw error;
    }

    return result;
};

export const removeBookmark = async (
    userIdentifier: string,
    tuitionId: string
) => {
    try {
        const res = await fetch(
            `${BASE_URL}/bookmarks/${encodeURIComponent(
                userIdentifier
            )}/${encodeURIComponent(tuitionId)}`,
            {
                method: "DELETE",
            }
        );
        return res.json();
    } catch (err) {
        console.error("Failed to delete bookmark:", err);
        return { success: false };
    }
};
