import { IApplyTuition, ITuition, ITuitionPost } from "@/types/tuitions/tuitions";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const getTuitions = async (params?: { status?: string; tutorEmail?: string }) => {
    try {
        let url = `${BASE_URL}/all-tuitions`;
        if (params?.status || params?.tutorEmail) {
            const searchParams = new URLSearchParams();
            if (params.status) searchParams.set("status", params.status);
            if (params.tutorEmail) searchParams.set("tutorEmail", params.tutorEmail);
            url = `${BASE_URL}/tutions?${searchParams.toString()}`;
        }
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch (err) {
        console.error("Failed to fetch tuitions:", err);
        return [];
    }
};


export const getTuitionById = async (id: string): Promise<ITuition | null> => {
    const res = await fetch(`${BASE_URL}/tuitions/${id}`, {
        cache: "no-store",
    }
    );

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
    const res = await fetch(`${BASE_URL}/tutions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tuitionData),
    }
    );

    const result = await res.json();

    if (!res.ok) {
        // The backend blocks free tutors once their post limit is reached.
        if (result.requiresPayment) {
            throw new TuitionPaymentRequiredError(
                result.message || "Upgrade to Pro to post more tuitions."
            );
        }

        throw new Error(result.message || "Failed to create tuition.");
    }

    return result;
};

export const getTutorTuitionCount = async (tutorId: string): Promise<{ count: number }> => {
    const res = await fetch(`${BASE_URL}/tuitions/count/${encodeURIComponent(tutorId)}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to get tuition count");
    }

    return res.json();
};

export const updateTuitionStatus = async (tuitionId: string, approvalStatus: "approved" | "rejected") => {

    const res = await fetch(`${BASE_URL}/tuitions/${tuitionId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ approvalStatus }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to update tuition status");
    }

    return result;
};

export const applyForTuition = async (applicationData: IApplyTuition) => {
    const res = await fetch(`${BASE_URL}/apply-tuitions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to apply for tuition.");
    }

    return result;
};

export const getTuitionApplicationCount = async (tuitionId: string): Promise<{ count: number }> => {
    const res = await fetch(`${BASE_URL}/tutions/${tuitionId}/applications/count`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to get application count");
    }

    return res.json();
};

export const getStudentApplicationCount = async (email: string): Promise<{ count: number }> => {
    const res = await fetch(`${BASE_URL}/applications/count/${encodeURIComponent(email)}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to get application count");
    }

    return res.json();
};

export async function getLatestTuitions(): Promise<ITuition[]> {
    try {
        const response = await fetch(`${BASE_URL}/all-tuitions`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tuitions");
        }

        const result = await response.json();

        const tuitions: ITuition[] = Array.isArray(result)
            ? result
            : result.data || [];

        return tuitions
            .filter(
                (tuition) =>
                    tuition.approvalStatus === "approved" &&
                    tuition.isActive === true
            )
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
