import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-4">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <ShieldAlert className="size-8" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
                <p className="text-sm text-muted-foreground">
                    You do not have permission to access this page. Please sign in with an authorized account.
                </p>
                <div className="pt-2">
                    <Button nativeButton={false} render={<Link href="/" />}>
                        Return Home
                    </Button>
                </div>
            </div>
        </main>
    );
}
