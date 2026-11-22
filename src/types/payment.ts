export interface Payment {
    _id?: string;
    userId: string;
    email: string;
    role: "student" | "tutor" | "admin" | string;
    plan: "pro" | "free" | string;
    amount: number;
    currency: string;
    status: "paid" | "failed" | "pending" | string;
    stripeSessionId?: string | null;
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    paymentIntentId?: string | null;
    transactionId?: string | null;
    createdAt?: string | Date;

    // Optional legacy & UI helper fields
    userName?: string;
    userEmail?: string;
    userRole?: string;
    planName?: string;
    paymentStatus?: string;
    paidAt?: string;
    invoiceId?: string | null;
    eventId?: string | null;
}
