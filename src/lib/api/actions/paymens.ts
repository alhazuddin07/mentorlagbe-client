
import {
    authPost,
    authFetch,
} from "@/lib/get-session";

import type { Payment } from "@/types/payment";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Verify Stripe Checkout Payment
export const checkoutVerify = async (sessionId: string) => {
    try {
        const api = `${BASE_URL}/payments/checkout-verify`;

        const result = await authPost(api, { sessionId });

        if (!result.success) {
            throw new Error(
                result.message || "Payment verification failed"
            );
        }

        return result;

    } catch (error) {
        console.error("Checkout verification error:", error);
        throw error;
    }
};

// Get All Payments (Admin Only)
export const getPayments = async (): Promise<Payment[]> => {
    try {
        const api = `${BASE_URL}/payments`;

        const result = await authFetch(api);

        return Array.isArray(result) ? result : [];

    } catch (error) {
        console.error("Failed to fetch payments:", error);
        return [];
    }
};
