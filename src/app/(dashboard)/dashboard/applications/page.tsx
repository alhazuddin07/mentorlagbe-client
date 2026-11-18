import { redirect } from "next/navigation";

export default function DashboardApplicationsRedirect() {
    redirect("/dashboard/student/my-applications");
}
