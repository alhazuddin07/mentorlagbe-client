
import AboutOverview from "@/components/about/AboutOverview";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import HowItWorks from "@/components/home/HowItWorks";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      <div>
        <AboutOverview />
      </div>

      <div>
        <HowItWorks />
      </div>

      <div>
        <AboutPrinciples />
      </div>

    </div>
  );
}
