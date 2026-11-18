import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    return (
        <div>
            <h1 className="text-xl font-semibold tracking-tight">
                Welcome back! 👋
            </h1>
            <h2>
                {user?.role} Dashboard
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Here is an overview of your MentorLagbe activity.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { title: "Active Tuitions", value: "0" },
                    { title: "Applications", value: "0" },
                    { title: "Unread Messages", value: "0" },
                ].map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-card p-5"
                    >
                        <p className="text-sm text-muted-foreground">
                            {stat.title}
                        </p>
                        <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
