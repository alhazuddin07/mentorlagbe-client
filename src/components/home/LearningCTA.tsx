import Link from "next/link";
import {
    ArrowRight,
    GraduationCap,
    Sparkles,
    BookOpenCheck,
} from "lucide-react";

const LearningCTA = () => {
    return (
        <section className="w-full bg-white px-5 py-16 sm:px-8 lg:py-20">
            <div className="mx-auto max-w-6xl">
                <div className="relative isolate overflow-hidden rounded-3xl border border-[#E9DFFF] bg-gradient-to-br from-[#FBF9FF] via-white to-[#F3EDFF] px-6 py-14 text-center shadow-[0_15px_50px_-20px_rgba(100,38,217,0.18)] sm:px-12 sm:py-16 lg:px-20">

                    {/* Background Decorations */}
                    <div className="pointer-events-none absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-[#DCCBFF]/35 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-80 rounded-full bg-[#E9DFFF]/50 blur-3xl" />

                    {/* Top Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E4D6FF] bg-white/80 px-4 py-2 text-xs font-bold tracking-wider text-[#6426D9] shadow-sm">
                        <Sparkles className="size-4" />
                        YOUR FUTURE STARTS HERE
                    </div>

                    {/* Heading */}
                    <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#1B1245] sm:text-4xl lg:text-5xl">
                        Ready to Start Your{" "}
                        <span className="bg-gradient-to-r from-[#6426D9] to-[#A33BEB] bg-clip-text text-transparent">
                            Learning Journey?
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#68617E] sm:text-base">
                        Find the right tutor, discover new opportunities,
                        and take the next step toward your academic goals.
                        Your success story starts with MentorLagbe.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                        <Link
                            href="/tuitions"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6426D9] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6426D9]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#501BC0] hover:shadow-xl hover:shadow-[#6426D9]/25 sm:w-auto"
                        >
                            <BookOpenCheck className="size-5" />
                            Explore Tuitions
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/about"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#DED0FF] bg-white px-7 py-3.5 text-sm font-semibold text-[#6426D9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6426D9] hover:bg-[#F8F4FF] sm:w-auto"
                        >
                            <GraduationCap className="size-5" />
                            Learn About Us
                        </Link>
                    </div>

                    {/* Bottom Trust Message */}
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-[#68617E] sm:text-sm">
                        <span className="inline-flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            Trusted Learning Community
                        </span>

                        <span className="hidden h-4 w-px bg-[#DED5F5] sm:block" />

                        <span className="inline-flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#8750E8]" />
                            Students & Expert Tutors
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LearningCTA;