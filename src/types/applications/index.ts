export interface IApplication {
    id?: string;
    _id?: string;
    tuitionId: string;
    tutorEmail?: string | null;
    studentName: string;
    studentEmail: string;
    phone: string;
    preferredSchedule: string;
    learningNote: string;
    appliedDate: string;
    tuitionTitle: string;
    classLavel: string;
    status: "pending" | "Awaiting Decision" | "Accepted" | "Rejected" | "Declined";
}
