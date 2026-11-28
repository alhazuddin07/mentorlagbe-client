
import {
    GraduationCap,
    Users,
    MapPin,
    Award,
    BookOpenCheck,
    ArrowUpRight,
} from "lucide-react";

const stats = [
    {
        value: "2,500+",
        label: "Verified Tutors",
        icon: GraduationCap,
    },
    {
        value: "15,000+",
        label: "Students Enrolled",
        icon: Users,
    },
    {
        value: "64",
        label: "Districts Covered",
        icon: MapPin,
    },
    {
        value: "98%",
        label: "Positive Reviews",
        icon: Award,
    },
];

const AboutOverview = () => {
    return (
        <section className="w-full bg-background px-4 py-16 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* Hero Section */}
                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#EEE5FF] bg-[#F7F2FF] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#6426D9] dark:border-primary/20 dark:bg-primary/10 dark:text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6426D9] dark:bg-primary" />
                        ABOUT MENTORLAGBE
                    </div>

                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#1B1245] dark:text-foreground sm:text-4xl lg:text-5xl">
                        Connecting Bangladesh&apos;s
                        <br />
                        Ambitious Students with
                        <br />
                        <span className="bg-gradient-to-r from-[#6426D9] to-[#A855F7] bg-clip-text text-transparent">
                            Exceptional Mentors
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 dark:text-muted-foreground sm:text-base">
                        We are building a trusted educational community
                        where students connect with qualified tutors,
                        discover new opportunities, and achieve their
                        academic goals.
                    </p>
                </div>

                {/* Mission and Statistics */}
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">

                    {/* Mission Card */}
                    <div className="flex flex-col justify-center rounded-2xl border border-[#EEE5FF] bg-white p-7 shadow-[0_8px_30px_-15px_rgba(100,38,217,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D6C3FF] hover:shadow-[0_12px_35px_-12px_rgba(100,38,217,0.20)] sm:p-9 dark:border-primary/20 dark:bg-card dark:hover:border-primary/40">

                        <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-[#EEE5FF] bg-[#F7F2FF] text-[#6426D9] dark:border-primary/20 dark:bg-primary/10 dark:text-primary">
                            <BookOpenCheck className="size-6" />
                        </div>

                        <p className="mb-3 text-xs font-bold tracking-widest text-[#6426D9] dark:text-primary">
                            OUR EDUCATIONAL MISSION
                        </p>

                        <h2 className="mb-4 text-2xl font-bold leading-snug text-[#1B1245] dark:text-foreground">
                            Personalized Mentorship That Transforms Academic Potential
                        </h2>

                        <p className="text-sm leading-7 text-gray-500 dark:text-muted-foreground">
                            We believe every student deserves access to
                            quality education and personalized guidance.
                            MentorLagbe brings students and qualified
                            tutors together through a simple and trusted
                            platform.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-muted-foreground">
                            From finding the right tutor to building
                            meaningful learning relationships, we make
                            the tutoring journey easier, safer, and more
                            accessible.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#6426D9] dark:text-primary">
                            Learn, Grow & Succeed
                            <ArrowUpRight className="size-4" />
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 gap-4">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="group flex flex-col justify-center rounded-2xl border border-[#EEE5FF] bg-white p-5 shadow-[0_8px_30px_-15px_rgba(100,38,217,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D6C3FF] hover:shadow-[0_12px_35px_-12px_rgba(100,38,217,0.20)] sm:p-7 dark:border-primary/20 dark:bg-card dark:hover:border-primary/40"
                                >
                                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-[#EEE5FF] bg-[#F7F2FF] text-[#6426D9] transition-colors group-hover:bg-[#EEE5FF] dark:border-primary/20 dark:bg-primary/10 dark:text-primary dark:group-hover:bg-primary/20">
                                        <Icon className="size-5" />
                                    </div>

                                    <h3 className="text-2xl font-bold tracking-tight text-[#1B1245] dark:text-foreground sm:text-3xl">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-2 text-xs font-medium text-gray-500 dark:text-muted-foreground sm:text-sm">
                                        {stat.label}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutOverview;
