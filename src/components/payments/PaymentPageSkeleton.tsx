export function PaymentPageSkeleton() {
    return (
        <div className="mx-auto w-full max-w-4xl animate-pulse px-5 py-10 sm:px-8 sm:py-14">
            <div className="h-5 w-32 rounded bg-muted" />

            <div className="mt-14 grid gap-12 md:grid-cols-2">
                <div className="space-y-5">
                    <div className="h-4 w-32 rounded bg-muted" />
                    <div className="h-8 w-48 rounded bg-muted" />
                    <div className="h-5 w-32 rounded bg-muted" />
                </div>

                <div className="space-y-5">
                    <div className="h-7 w-40 rounded bg-muted" />
                    <div className="h-32 rounded-xl bg-muted" />
                    <div className="h-14 rounded-xl bg-muted" />
                </div>
            </div>
        </div>
    );
}