export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "student" | "tutor";
    status: "active" | "inactive";
    createdAt: string;
    tuitionsCount?: number;
}


export interface IUser2 {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: "student" | "tutor" | "admin";
    plan: "free" | "pro";
    createdAt: string;
    updatedAt: string;
}