import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    const role = (session?.user as { role?: string } | undefined)?.role;

    if (role !== "admin") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
