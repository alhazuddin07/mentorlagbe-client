export const instant = false;
import { connection } from "next/server";

import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await connection();
    const session = await getServerSession();

    const role = (session?.user as { role?: string } | undefined)?.role;

    if (role !== "admin") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
