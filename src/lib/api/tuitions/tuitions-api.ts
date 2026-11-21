import { IApplyTuition, ITuition, ITuitionPost } from "@/types/tuitions/tuitions";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const getTuitions = async () => {
    const res = await fetch(`${BASE_URL}/all-tuitions`);
    return res.json();
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