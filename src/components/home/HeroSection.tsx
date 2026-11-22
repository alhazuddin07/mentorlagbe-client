import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    CalendarCheck,
    GraduationCap,
    Search,
    Star,
    ShieldCheck,
    Users,
} from "lucide-react";

const subjects = ["Mathematics", "English", "Physics", "Chemistry", "ICT"];

const stats = [
    { icon: Users, value: "10K+", label: "Students learning", tone: "text-violet-600" },
    { icon: Star, value: "4.8/5", label: "Average rating", tone: "text-amber-500" },
    { icon: ShieldCheck, value: "100%", label: "Verified mentors", tone: "text-emerald-600" },
];

const HeroSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF7FF] via-white to-white">
            {/* Soft dotted grid background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#D9C9FA_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
            />
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-violet-200/40 blur-3xl"
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:py-24">
                {/* LEFT CONTENT */}
                <div className="relative z-10">
                    {/* Badge */}
                    <div
                        className="ml-rise inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/80 py-1.5 pl-2 pr-4 text-xs font-medium text-[#4B3A7A] shadow-sm backdrop-blur sm:text-sm"
                        style={{ animationDelay: "0ms" }}
                    >
                        <span className="flex size-6 items-center justify-center rounded-full bg-[#6426D9] text-white">
                            <GraduationCap size={14} />
                        </span>
                        Trusted by 10,000+ students across Bangladesh
                    </div>

                    {/* Heading: each line slides up from a mask */}
                    <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#1B1245] sm:text-5xl lg:text-[64px]">
                        <span className="block overflow-hidden pb-1">
                            <span
                                className="ml-line block"
                                style={{ animationDelay: "150ms" }}
                            >
                                Find the right tutor.
                            </span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <span
                                className="ml-line block"
                                style={{ animationDelay: "300ms" }}
                            >
                                <span className="ml-shine">Learn with confidence.</span>
                            </span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="ml-rise mt-6 max-w-lg text-base leading-7 text-[#5E5778] sm:text-lg sm:leading-8"
                        style={{ animationDelay: "500ms" }}
                    >
                        Book one-to-one sessions with verified mentors who
                        teach at your pace, in your subject, on your schedule.
                    </p>

                    {/* Search */}
                    <form
                        action="/tuitions"
                        method="GET"
                        className="ml-rise mt-9 flex max-w-xl flex-col gap-2 rounded-2xl border border-violet-100 bg-white p-2 shadow-[0_18px_45px_-20px_rgba(100,38,217,0.35)] transition-shadow duration-300 focus-within:border-violet-300 focus-within:shadow-[0_22px_55px_-18px_rgba(100,38,217,0.45)] sm:flex-row sm:items-center"
                        style={{ animationDelay: "650ms" }}
                    >
                        <label htmlFor="hero-search" className="sr-only">
                            Search by subject or tutor
                        </label>
                        <div className="flex flex-1 items-center gap-3 px-3">
                            <Search size={20} className="shrink-0 text-violet-500" />
                            <input
                                id="hero-search"
                                name="search"
                                type="text"
                                placeholder="Search a subject or tutor"
                                className="h-12 w-full bg-transparent text-sm text-[#1B1245] placeholder:text-[#9A93B0] focus:outline-none sm:text-base"
                            />
                        </div>
                        <button
                            type="submit"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6426D9] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#501BC0] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6426D9] sm:text-base"
                        >
                            Find a tutor
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    {/* Popular subjects */}
                    <div
                        className="ml-rise mt-5 flex flex-wrap items-center gap-2"
                        style={{ animationDelay: "800ms" }}
                    >
                        <span className="mr-1 text-sm text-[#7A7391]">Popular:</span>
                        {subjects.map((subject) => (
                            <Link
                                key={subject}
                                href={`/tuitions?search=${encodeURIComponent(subject)}`}
                                className="rounded-full border border-violet-100 bg-white px-3.5 py-1.5 text-xs font-medium text-[#3A2D66] transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 sm:text-sm"
                            >
                                {subject}
                            </Link>
                        ))}
                    </div>

                    {/* Statistics */}
                    <dl
                        className="ml-rise mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-violet-100 pt-7"
                        style={{ animationDelay: "950ms" }}
                    >
                        {stats.map(({ icon: Icon, value, label, tone }) => (
                            <div key={label}>
                                <dt className="flex items-center gap-2">
                                    <Icon
                                        size={20}
                                        className={`shrink-0 ${tone}`}
                                        fill={Icon === Star ? "currentColor" : "none"}
                                    />
                                    <span className="text-xl font-bold tracking-tight text-[#1B1245] sm:text-2xl">
                                        {value}
                                    </span>
                                </dt>
                                <dd className="mt-1.5 text-xs text-[#6F6888] sm:text-sm">
                                    {label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* RIGHT VISUAL */}
                <div className="relative mx-auto w-full max-w-[540px] pb-10 pt-6 lg:pb-0 lg:pt-0">
                    {/* Image panel: fades in while the photo slowly settles */}
                    <div className="ml-reveal group relative aspect-[4/4.6] w-full overflow-hidden rounded-[2.5rem] border border-violet-100 bg-gradient-to-br from-[#EFE6FF] via-[#F6F0FF] to-white shadow-[0_30px_70px_-30px_rgba(100,38,217,0.45)]">
                        <div
                            aria-hidden="true"
                            className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl"
                        />
                        <div className="ml-zoom absolute inset-0">
                            <Image
                                src="/images/hero-student-clean.png"
                                alt="Student learning with a laptop"
                                fill
                                priority
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 540px, 480px"
                                className="object-cover object-center mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Tutor preview card */}
                    <div className="ml-card-a absolute -left-2 top-10 z-20 w-[230px] rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-[0_20px_45px_-18px_rgba(100,38,217,0.35)] backdrop-blur sm:-left-8 sm:w-[250px]">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6426D9] to-[#A855F7] text-sm font-bold text-white">
                                NJ
                            </div>
                            <div className="min-w-0">
                                <p className="flex items-center gap-1 truncate text-sm font-semibold text-[#1B1245]">
                                    Nusrat Jahan
                                    <BadgeCheck size={15} className="shrink-0 text-violet-600" />
                                </p>
                                <p className="truncate text-xs text-[#6F6888]">
                                    Mathematics Mentor
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-violet-50 pt-3 text-xs">
                            <span className="flex items-center gap-1 font-semibold text-[#1B1245]">
                                <Star size={13} className="text-amber-400" fill="currentColor" />
                                4.9
                                <span className="font-normal text-[#8A83A0]">(212)</span>
                            </span>
                            <span className="font-semibold text-[#6426D9]">৳500 / hour</span>
                        </div>
                    </div>

                    {/* Booking confirmation card */}
                    <div className="ml-card-b absolute -right-1 bottom-4 z-20 flex items-center gap-3 rounded-2xl border border-violet-100 bg-white/95 px-4 py-3 shadow-[0_20px_45px_-18px_rgba(100,38,217,0.35)] backdrop-blur sm:-right-6 sm:bottom-14">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CalendarCheck size={20} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-[#1B1245]">Session booked</p>
                            <p className="flex items-center gap-1.5 text-xs text-[#6F6888]">
                                <span className="relative flex size-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                                </span>
                                Tomorrow, 5:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
        </section>
    );
};

export default HeroSection;