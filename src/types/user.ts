export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "student" | "tutor";
    status: "active" | "inactive";
    createdAt: string;
    tuitionsCount?: number;
}