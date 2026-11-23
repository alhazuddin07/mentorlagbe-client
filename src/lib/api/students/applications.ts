
import {
    authFetch,
    authUpdate,
    deleteFetch,
} from "@/lib/get-session";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApplicationStatus = "Accepted" | "Declined";

// Get Student Applications
export const getStudentApplications = async (email?: string) => {
    const api = email
        ? `${BASE_URL}/applications?applicantEmail=${encodeURIComponent(email)}`
        : `${BASE_URL}/applications`;

    return authFetch(api);
};

// Get Applications for a Tuition
export const getApplications = async (query: string) => {
    const api = `${BASE_URL}/applications?${query}`;

    return authFetch(api);
};

// Delete Application
export const deleteApplication = async (id: string) => {
    const api = `${BASE_URL}/applications/${id}`;

    return deleteFetch(api);
};

// Get Applications Count
export const getApplicationsCount = async (
    query: string
): Promise<{ success: boolean; count: number }> => {
    const api = `${BASE_URL}/applications/count?${query}`;

    return authFetch(api);
};

// Update Application Status
export const updateApplicationStatus = async (
    id: string,
    status: ApplicationStatus
) => {
    const api = `${BASE_URL}/applications/${id}/status`;

    return authUpdate(api, { status });
};
