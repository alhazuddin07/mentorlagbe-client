export interface IApplication {
    _id?: string;
    tuitionId: string;
    studentName: string;
    studentEmail: string;
    phone: string;
    preferredSchedule: string;
    learningNote: string;
    appliedDate: string;
    tuitionTitle: string;
    classLavel: string;
    status: "Awaiting Decision" | "Accepted" | "Rejected" | "Declined";
}