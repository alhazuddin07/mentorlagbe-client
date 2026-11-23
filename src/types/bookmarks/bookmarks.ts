import { ITuition } from "@/types/tuitions/tuitions";

export interface IBookmark {
    _id: string;
    userId: string;
    userEmail: string;
    tuitionId: string;
    createdAt: string;
    tuition: ITuition;
}