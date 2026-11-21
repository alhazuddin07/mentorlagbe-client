export interface ITuition {
    _id: string;
    tutorId?: string;
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
    tutoreImage: string;
    applicantsCount?: number;
}

export interface ITuitionPost {
    tutorId?: string;
    title: string;
    subject: string;
    classLevel: string;
    mode: "online" | "offline";
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    description: string;
    bannerImage: string;
    tutorName?: string;
    tutorEmail?: string;
    tutoreImage?: string | null;
}

export interface IApplyTuition {
    tuitionId: string;
    phone: string;
    preferredSchedule: string;
    learningNote: string;
}