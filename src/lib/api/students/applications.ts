const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApplicationStatus = "Accepted" | "Declined";

export const getStudentApplications = async (email: string) => {
    try {
        const res = await fetch(
            `${BASE_URL}/applications/student/${encodeURIComponent(email)}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            // Fallback to query param
            const queryRes = await fetch(
                `${BASE_URL}/appplications?email=${encodeURIComponent(email)}`,
                {
                    cache: "no-store",
                }
            );
            if (queryRes.ok) return queryRes.json();
            throw new Error("Failed to fetch student applications");
        }

        return res.json();
    } catch (err) {
        console.error("Failed to fetch student applications:", err);
        return [];
    }
};

export const getApplications = async (email?: string) => {
    try {
        const url = email
            ? `${BASE_URL}/applications/student/${encodeURIComponent(email)}`
            : `${BASE_URL}/appplications`;

        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch applications");
        }

        return res.json();
    } catch (err) {
        console.error("Failed to fetch applications:", err);
        return [];
    }
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
