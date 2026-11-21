import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="text-8xl font-bold text-primary">
                404
            </h1>

            <h2 className="mt-4 text-2xl font-semibold">
                Page Not Found
            </h2>

            <p className="mt-2 text-muted-foreground">
                Sorry, the page you are looking for does not exist
                or has been moved.
            </p>

            <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
                Back to Home
            </Link>
        </div>
    );
}