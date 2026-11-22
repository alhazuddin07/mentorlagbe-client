import { authFetch, deleteFetch } from "@/lib/get-session";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApplicationStatus = "Accepted" | "Declined";


export const getStudentApplications = async (email?: string) => {
    const api = email
        ? `${BASE_URL}/applications?applicantEmail=${encodeURIComponent(email)}`
        : `${BASE_URL}/applications`;

    return await authFetch(api);
};

export const getApplications = async (query: string) => {
    const api = `${BASE_URL}/applications?${query}`
    const res = await authFetch(api)
    return res;
};

export const deleteApplication = async (id: string) => {
    const api = `${BASE_URL}/applications/${id}`;
    return await deleteFetch(api);
};

export const getApplicationsCount = async (query: string): Promise<{ count: number }> => {

    const api = `${BASE_URL}/applications/count?${query}`

    const result = await authFetch(api)

    return result;

};

export const updateApplicationStatus = async (id: string, status: ApplicationStatus) => {
    const res = await fetch(`${BASE_URL}/applications/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to update status");
    }

    return result;
};
