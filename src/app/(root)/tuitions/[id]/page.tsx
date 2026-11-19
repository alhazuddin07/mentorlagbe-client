import TuitionDetails from "@/components/dashboard/tutor/TuitionDetails";
import { Suspense } from "react";

interface Props {
    params: Promise<{ id: string }>;
}

const TuitionDetailsPage = async ({ params }: Props) => {
    return (
        <Suspense fallback={<div>Loading tuition details...</div>}>
            <TuitionDetails params={params} />
        </Suspense>
    );
};

export default TuitionDetailsPage;