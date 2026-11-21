
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Users,
  Star,
  ShieldCheck,
  Sparkles,
  Lightbulb,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF9FF] via-[#F6F2FF] to-[#EEE8FF]">

      {/* Background Decorations */}
      <div className="absolute -right-20 top-0 h-[450px] w-[450px] rounded-full bg-[#DCCFFF]/30 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#C9B7FF]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:px-8 lg:min-h-[520px] lg:py-16">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAE2FF] px-4 py-2 text-xs font-bold text-[#5B21D6]">
            <Sparkles size={14} />
            Learn • Connect • Grow
          </div>

          {/* Heading */}
          <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1B1245] sm:text-5xl lg:text-[56px]">
            Find the Best Tutor for Your{" "}
            <span className="text-[#6426D9]">
              Learning Journey
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-base leading-7 text-[#30294F] sm:text-lg">
            Get personalized tuition from expert mentors
            and achieve your academic goals faster.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 rounded-xl bg-[#6426D9] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#501BC0]"
            >
              Explore Tuitions
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white bg-white/80 px-5 py-3 text-sm font-bold text-[#24164F] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <PlayCircle size={17} fill="currentColor" />
              Watch Video
            </Link>

          </div>

          {/* Statistics */}
          <div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-[#DED5F5] border-t border-[#DED5F5] pt-6">

            {/* Students */}
            <div className="pr-3">
              <div className="flex items-center gap-2">
                <Users size={23} className="text-[#8750E8]" />
                <span className="text-lg font-extrabold text-[#1B1245]">
                  10K+
                </span>
              </div>
              <p className="mt-1 text-xs text-[#68617E]">
                Happy Students
              </p>
            </div>

            {/* Rating */}
            <div className="px-3">
              <div className="flex items-center gap-2">
                <Star
                  size={23}
                  className="text-amber-400"
                  fill="currentColor"
                />
                <span className="text-lg font-extrabold text-[#1B1245]">
                  4.8/5
                </span>
              </div>
              <p className="mt-1 text-xs text-[#68617E]">
                Rating
              </p>
            </div>

            {/* Trusted */}
            <div className="pl-3">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={23}
                  className="text-emerald-500"
                />
                <span className="text-lg font-extrabold text-[#1B1245]">
                  100%
                </span>
              </div>
              <p className="mt-1 text-xs text-[#68617E]">
                Trusted Platform
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="relative mx-auto w-full max-w-[540px]">

          {/* Background Circle */}
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#D9CBFF] to-[#EDE5FF] blur-[1px] sm:h-[430px] sm:w-[430px]" />

          {/* Student Image */}
          <div className="relative z-10 animate-float">
            <Image
              src="/images/hero-student.png"
              alt="Student learning with a laptop"
              width={550}
              height={350}
              priority
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>

          {/* Floating Learning Card */}
          <div className="absolute left-0 top-5 z-20 -rotate-6 rounded-xl bg-white/90 px-4 py-3 shadow-lg sm:-left-3 sm:top-8">
            <p className="text-sm font-bold text-[#24164F]">
              Better Learning
            </p>
            <p className="text-sm font-bold text-[#24164F]">
              Brighter Future
            </p>
            <div className="mt-1 h-0.5 w-20 rounded-full bg-[#8750E8]" />
          </div>

          {/* Floating Lightbulb */}
          <div className="absolute right-8 top-12 z-20 hidden rounded-full bg-white/50 p-3 text-[#24164F] sm:block">
            <Lightbulb size={35} strokeWidth={1.5} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;