"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-bold text-destructive">
                Something Went Wrong!
            </h1>

            <p className="mt-4 text-muted-foreground">
                Sorry, an unexpected error occurred.
                Please try again.
            </p>

            <div className="mt-6 flex gap-3">
                <Button onClick={reset}>
                    Try Again
                </Button>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium transition hover:bg-accent"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}