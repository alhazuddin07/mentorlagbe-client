
import {
    authFetch,
    authUpdate,
} from "@/lib/get-session";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Get All Users (Admin Only)
export const getUser = async () => {
    try {
        const api = `${BASE_URL}/users`;

        return await authFetch(api);

    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
};

// Get User Premium Status
export const getUserPremiumById = async (userId: string) => {
    const api = `${BASE_URL}/users/${encodeURIComponent(userId)}/premium`;

    return await authFetch(api);
};

// Update User Status (Admin Only)
export const updateUserStatus = async (
    userId: string,
    status: "active" | "inactive"
) => {
    const api = `${BASE_URL}/users/${encodeURIComponent(userId)}/status`;

    return await authUpdate(api, { status });
};

// Update User Role (Admin Only)
export const updateUserRole = async (
    id: string,
    role: "admin" | "student" | "tutor"
) => {
    const api = `${BASE_URL}/users/${encodeURIComponent(id)}/role`;

    return await authUpdate(api, { role });
};