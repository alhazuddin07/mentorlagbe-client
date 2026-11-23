
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getServerSession = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
};

// Get authenticated user's token
export const getToken = async () => {
    const session = await getServerSession();

    if (!session || !session.session?.token) {
        redirect("/unauthorized");
    }

    return session.session.token;
};

// GET request - Protected API
export const authFetch = async (api: string) => {
    const token = await getToken();

    const res = await fetch(api, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (res.status === 401) {
        redirect("/unauthorized");
    }

    return res.json();
};

// POST request - Protected API
export const authPost = async (api: string, data: unknown) => {
    const token = await getToken();

    const res = await fetch(api, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (res.status === 401) {
        redirect("/unauthorized");
    }

    return res.json();
};

// PATCH request - Protected API
export const authUpdate = async (api: string, data: unknown) => {
    const token = await getToken();

    const res = await fetch(api, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (res.status === 401) {
        redirect("/unauthorized");
    }

    return res.json();
};

// DELETE request - Protected API
export const deleteFetch = async (api: string) => {
    const token = await getToken();

    const res = await fetch(api, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        redirect("/unauthorized");
    }

    const result = await res.json();

    if (!res.ok) {
        console.error("Delete API Error:", result);

        throw new Error(
            result.message || "Failed to delete"
        );
    }

    return result;
};