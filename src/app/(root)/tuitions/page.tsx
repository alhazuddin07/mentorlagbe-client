import { Suspense } from "react";
import TuitionsContent from "@/components/dashboard/tutor/TuitionsContent";


const BrowseTuitionsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          Loading tuitions...
        </div>
      }
    >
      <TuitionsContent />
    </Suspense>
  );
};

export default BrowseTuitionsPage;