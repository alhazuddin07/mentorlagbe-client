import { PaymentPageSkeleton } from "@/components/payments/PaymentPageSkeleton";
import { PaymentContent } from "@/components/payments/PaymentsPage";
import { Suspense } from "react";

export default function PaymentPage({
    searchParams,
}: {
    searchParams: Promise<{ canceled?: string }>;
}) {
    return (
        <Suspense fallback={<PaymentPageSkeleton />}>
            <PaymentContent searchParams={searchParams} />
        </Suspense>
    );
}
