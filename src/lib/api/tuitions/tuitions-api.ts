import { authFetch, authPost, authUpdate, deleteFetch } from "@/lib/get-session";
import { IApplyTuition, ITuition, ITuitionPost } from "@/types/tuitions/tuitions";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const getTuitions = async (params?: { status?: string, tutorEmail?: string }) => {
    try {
        const searchParams = new URLSearchParams();

        if (params?.status) {
            searchParams.set("status", params.status);
        }

        if (params?.tutorEmail) {
            searchParams.set("tutorEmail", params.tutorEmail);
        }

        const query = searchParams.toString();
        const url = `${BASE_URL}/tutions${query ? `?${query}` : ""}`;

        const result = await authFetch(url);

        return result;

    } catch (err) {
        console.error("Failed to fetch tuitions:", err);
        return [];
    }
};

export const toggleTuitionStatus = async (id: string, isActive: boolean) => {
    try {
        const api = `${BASE_URL}/tuitions/${id}/toggle-status`;

        const result = await authUpdate(api, { isActive });

        return result;

    } catch (error) {
        console.error("Toggle tuition status error:", error);
        throw error;
    }
};


export const getTuitionById = async (id: string): Promise<ITuition | null> => {
    const res = await fetch(`${BASE_URL}/tuitions/${id}`, {
        cache: "no-store",
    });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Failed to fetch tuition");
    }

    return res.json();
};



export const BrowseTuitions = async () => {
    const res = await fetch(`${BASE_URL}/browse-tuitions`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch tuitions");
    }

    return res.json();
};

export class TuitionPaymentRequiredError extends Error {
    requiresPayment = true;
}

export const createTuition = async (tuitionData: ITuitionPost) => {
    try {
        const api = `${BASE_URL}/tutions`
        const result = await authPost(api, tuitionData)

        if (result.requiresPayment) {
            throw new TuitionPaymentRequiredError(
                result.message || "Upgrade to Pro to post more tuitions."
            );
        }

        return result;

    } catch (error) {
        console.error("Create tuition error:", error);
        throw error;
    }
};

export const getTutorTuitionCount = async ( tutorId: string ): Promise<{ count: number }> => {
    const result = await authFetch(
        `${BASE_URL}/tuitions/count/${encodeURIComponent(tutorId)}`
    );

    return result;
};

export const updateTuitionStatus = async ( tuitionId: string, approvalStatus: "approved" | "rejected" ) => {
    const result = await authUpdate(
        `${BASE_URL}/tuitions/${tuitionId}/status`,
        { approvalStatus }
    );

    return result;
};


export const applyForTuition = async ( applicationData: IApplyTuition ) => {
    const api = `${BASE_URL}/apply-tuitions`
    const result = await authPost(api, applicationData)

    return result;
};


export const getTuitionApplicationCount = async (  tuitionId: string ): Promise<{ count: number }> => {
    const result = await authFetch(
        `${BASE_URL}/tutions/${tuitionId}/applications/count`
    );

    return result;
};


export async function getLatestTuitions(): Promise<ITuition[]> {
    try {
        const res = await fetch(
            `${BASE_URL}/browse-tuitions`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch latest tuitions");
        }

        const result = await res.json();

        const tuitions: ITuition[] = result.data || [];

        return tuitions
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            .slice(0, 4);

    } catch (error) {
        console.error("Latest tuitions error:", error);
        return [];
    }
}

export const updateTuition = async (
    id: string,
    updatedData: Partial<ITuition>
) => {
    try {
        return await authUpdate(
            `${BASE_URL}/tuitions/${id}`,
            updatedData
        );
    } catch (error) {
        console.error("Update tuition error:", error);
        throw error;
    }
};

export const deleteTuition = async (id: string) => {
    try {
        return await deleteFetch(`${BASE_URL}/tuitions/${id}`);
    } catch (error) {
        console.error("Delete tuition error:", error);
        throw error;
    }
};