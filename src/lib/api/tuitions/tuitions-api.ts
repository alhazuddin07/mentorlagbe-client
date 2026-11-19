
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const getTuitions = async () => {
    const res = await fetch(`${BASE_URL}/all-tuitions`);
    return res.json();
};

export const getSingleTuition = async (id: string) => {
    const res = await fetch(`${BASE_URL}/tuition/${id}`,{
        cache: "no-cache"
    });

    const result = await res.json();

    console.log("Single Tuition API Status:", res.status);
    console.log("Single Tuition API Response:", result);

    if (!res.ok) {
        throw new Error(
            result.message || "Failed to fetch tuition"
        );
    }

    return result;
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