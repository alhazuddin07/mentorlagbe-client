
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const getTuitions = async () => {
    const res = await fetch(`${BASE_URL}/all-tuitions`);
    return res.json();
};

export const BrowseTuitions = async () => {
    const res = await fetch(`${BASE_URL}/browse-tuitions`);
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