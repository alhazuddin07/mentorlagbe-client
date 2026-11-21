import type { Payment } from "@/types/payment";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const checkoutVerify = async (sessionId: string) => {
  const res = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });

  return res.json();
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const res = await fetch(`${BASE_URL}/payments`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Failed to fetch payments:", err);
    return [];
  }
};
