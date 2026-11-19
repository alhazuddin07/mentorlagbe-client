
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApplicationStatus = "Accepted" | "Declined";

export const getApplications = async () => {
    const res = await fetch(`${BASE_URL}/appplications`);

    if (!res.ok) {
        throw new Error("Failed to fetch tuition");
    }

    return res.json();
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