export interface ITuition {
    _id: string;
    title: string;
    subject: string;
    classLevel: string;
    mode: "online" | "offline";
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    description: string;
    bannerImage: string;
    tutorName: string | null;
    tutorEmail: string | null;
    approvalStatus: "pending" | "approved" | "rejected";
    isActive: boolean;
    createdAt: string;
}