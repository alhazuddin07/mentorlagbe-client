import { redirect } from "next/navigation";

export default function DashboardTuitionsRedirect() {
    redirect("/dashboard/tutor/my-tuitions");
}
