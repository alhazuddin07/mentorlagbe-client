
import { Suspense } from "react";

import HeroSection from "@/components/home/HeroSection";
import LatestTuitions from "@/components/home/LatestTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import PricingPage from "./pricing/page";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense
        fallback={
          <section className="bg-white px-5 py-16 text-center">
            <p className="text-[#6426D9] font-semibold">
              Loading latest tuitions...
            </p>
          </section>
        }
      >
        <LatestTuitions />
      </Suspense>

      <HowItWorks />
      <PricingPage />
      <Testimonials />
      <FAQSection />

    </>
  );
}
