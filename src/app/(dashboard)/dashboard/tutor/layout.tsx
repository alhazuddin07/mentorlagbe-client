import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function TutorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    const role = (session?.user as { role?: string } | undefined)?.role;

    if (role !== "tutor" && role !== "admin") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
