
import Image from "next/image";
import {
  Search,
  CalendarDays,
  BookOpenCheck,
  UserRoundPlus,
  CalendarCheck,
  Handshake,
  ArrowRight,
} from "lucide-react";

const studentSteps = [
  {
    number: "1",
    title: "Find a Tutor",
    icon: Search,
  },
  {
    number: "2",
    title: "Book a Session",
    icon: CalendarDays,
  },
  {
    number: "3",
    title: "Start Learning",
    icon: BookOpenCheck,
  },
];

const tutorSteps = [
  {
    number: "1",
    title: "Create Profile",
    icon: UserRoundPlus,
  },
  {
    number: "2",
    title: "Your Availability",
    icon: CalendarCheck,
  },
  {
    number: "3",
    title: "Start Earning",
    icon: Handshake,
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-hidden bg-white px-5 py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1B1245] sm:text-4xl">
            How It Works?
          </h2>

          <p className="mt-2 text-sm text-[#68617E] sm:text-base">
            Getting started with MentorLagbe is simple!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[180px_1fr_180px]">

          {/* Student Illustration */}
          <div className="relative hidden h-48 items-end justify-center lg:flex">
            <div className="absolute bottom-4 h-36 w-36 rounded-full bg-[#EEE5FF]" />

            <Image
              src="/images/student-how-it-works.png"
              alt="Student learning"
              width={190}
              height={190}
              className="relative z-10 h-auto max-h-48 w-full object-contain"
            />
          </div>

          {/* Student and Tutor Steps */}
          <div className="grid gap-10 md:grid-cols-2 md:gap-0">

            {/* For Students */}
            <div className="text-center md:border-r md:border-[#E6D9FF] md:pr-7">
              <span className="inline-flex rounded-full bg-[#6426D9] px-5 py-2 text-sm font-bold text-white shadow-md shadow-purple-200">
                For Students
              </span>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {studentSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="relative flex flex-col items-center"
                    >
                      {/* Step Number */}
                      <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#6426D9] text-xs font-bold text-white">
                        {step.number}
                      </span>

                      {/* Icon Box */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F2FF] text-[#6426D9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EEE5FF]">
                        <Icon size={25} strokeWidth={2.2} />
                      </div>

                      {/* Step Title */}
                      <h3 className="mt-3 text-xs font-bold text-[#1B1245] sm:text-sm">
                        {step.title}
                      </h3>

                      {/* Arrow */}
                      {index !== studentSteps.length - 1 && (
                        <ArrowRight
                          size={18}
                          className="absolute -right-3 top-12 text-[#A77BFF]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* For Tutors */}
            <div className="text-center md:pl-7">
              <span className="inline-flex rounded-full bg-[#6426D9] px-5 py-2 text-sm font-bold text-white shadow-md shadow-purple-200">
                For Tutors
              </span>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {tutorSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="relative flex flex-col items-center"
                    >
                      {/* Step Number */}
                      <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#6426D9] text-xs font-bold text-white">
                        {step.number}
                      </span>

                      {/* Icon Box */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F2FF] text-[#6426D9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EEE5FF]">
                        <Icon size={25} strokeWidth={2.2} />
                      </div>

                      {/* Step Title */}
                      <h3 className="mt-3 text-xs font-bold text-[#1B1245] sm:text-sm">
                        {step.title}
                      </h3>

                      {/* Arrow */}
                      {index !== tutorSteps.length - 1 && (
                        <ArrowRight
                          size={18}
                          className="absolute -right-3 top-12 text-[#A77BFF]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tutor Illustration */}
          <div className="relative hidden h-48 items-end justify-center lg:flex">
            <div className="absolute bottom-4 h-36 w-36 rounded-full bg-[#EEE5FF]" />

            <Image
              src="/images/tutor-how-it-works.png"
              alt="Tutor helping students"
              width={190}
              height={190}
              className="relative z-10 h-auto max-h-48 w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}