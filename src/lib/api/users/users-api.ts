

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getUser = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
}

export const updateUserStatus = async ( userId: string, status: "active" | "inactive" ) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) {
        throw new Error("Failed to update user status");
    }

    return res.json();
};