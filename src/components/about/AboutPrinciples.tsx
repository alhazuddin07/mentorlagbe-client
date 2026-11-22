
import {
    ShieldCheck,
    Target,
    Lightbulb,
    HeartHandshake,
} from "lucide-react";

const principles = [
    {
        title: "Academic Integrity",
        description:
            "We build a trusted educational community where students and tutors learn with honesty, transparency, and mutual respect.",
        icon: ShieldCheck,
    },
    {
        title: "Equal Opportunity",
        description:
            "We connect students with qualified tutors and make quality educational support accessible across Bangladesh.",
        icon: Target,
    },
    {
        title: "Empowering Mentors",
        description:
            "We help dedicated educators share their knowledge, grow professionally, and create meaningful learning experiences.",
        icon: Lightbulb,
    },
];

const AboutPrinciples = () => {
    return (
        <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* Section Heading */}
                <div className="mb-9 text-center">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                        WHAT WE STAND FOR
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Our Guiding Principles
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                        Every feature and policy on MentorLagbe is
                        designed with student safety, educational
                        excellence, and educator respect at the center.
                    </p>
                </div>

                {/* Principles Cards */}
                <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {principles.map((principle, index) => {
                        const Icon = principle.icon;

                        return (
                            <div
                                key={principle.title}
                                className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-white p-6 shadow-[0_8px_30px_-15px_rgba(109,61,245,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_15px_40px_-15px_rgba(109,61,245,0.18)]"
                            >
                                <span className="absolute right-6 top-6 text-3xl font-bold text-violet-100 transition-colors group-hover:text-violet-200">
                                    0{index + 1}
                                </span>

                                <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-700 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white">
                                    <Icon className="size-5" />
                                </div>

                                <h3 className="mb-3 text-lg font-bold text-gray-900">
                                    {principle.title}
                                </h3>

                                <p className="text-sm leading-7 text-gray-500">
                                    {principle.description}
                                </p>

                                <div className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-300 group-hover:w-20" />
                            </div>
                        );
                    })}

                </div>

                {/* Commitment Card */}
                <div className="rounded-2xl border border-violet-100 bg-white p-7 text-center shadow-[0_8px_30px_-15px_rgba(109,61,245,0.15)] sm:p-10">

                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-700">
                        <HeartHandshake className="size-6" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Building a Better Learning Future
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500">
                        Our commitment goes beyond connecting students
                        with tutors. We aim to create a supportive
                        educational ecosystem where knowledge is shared,
                        potential is nurtured, and success is achievable
                        for everyone.
                    </p>

                </div>

            </div>
        </section>
    );
};

export default AboutPrinciples;