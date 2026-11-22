"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getServerSession = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

export const getToken = async () => {
    const session = await getServerSession();
    if (!session || !session.session?.token) {
        redirect('/unauthorized');
    }
    return session.session.token;
}

export const authFetch = async (api: string) => {
    const token = await getToken();
    const res = await fetch(api, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (res.status === 401 || res.status === 403) {
        redirect('/unauthorized');
    }

    return res.json();
}

export const deleteFetch = async (api: string) => {
    const token = await getToken();

    const res = await fetch(api, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized");
    }

    if (!res.ok) {
        throw new Error("Failed to delete");
    }

    return await res.json();
};