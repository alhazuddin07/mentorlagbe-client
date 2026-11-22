
const features = [
    {
        name: "Tuition Post Limit (Tutors)",
        free: "2 Tuitions",
        pro: "Unlimited",
    },
    {
        name: "Bookmark Limit (Students)",
        free: "5 Bookmarks",
        pro: "Unlimited",
    },
    {
        name: "Verified PRO Golden Badge",
        free: "Not Included",
        pro: "Included",
    },
    {
        name: "Search Ranking Priority",
        free: "Standard",
        pro: "High Priority",
    },
    {
        name: "Application Response Visibility",
        free: "Standard",
        pro: "Instant Alert",
    },
    {
        name: "Customer Support",
        free: "Standard Email",
        pro: "24/7 Priority Support",
    },
];

const FeatureComparison = () => {
    return (
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">

            {/* Subtle Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-violet-100/40 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-100/40 blur-[120px]" />

            <div className="relative mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-10 text-center">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                        MEMBERSHIP BENEFITS
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                        Compare Our{" "}
                        <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                            Membership Plans
                        </span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                        Choose the right plan and unlock more opportunities
                        to grow with MentorLagbe.
                    </p>
                </div>

                {/* Comparison Card */}
                <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_12px_45px_-15px_rgba(109,61,245,0.16)]">

                    {/* Header */}
                    <div className="grid grid-cols-3 items-center border-b border-violet-100 bg-violet-50/70 px-4 py-5 sm:px-8">

                        <div className="text-xs font-bold text-gray-800 sm:text-sm">
                            Features
                        </div>

                        <div className="text-center text-xs font-bold text-gray-700 sm:text-sm">
                            Free Tier
                        </div>

                        <div className="flex items-center justify-center gap-2 rounded-lg bg-violet-100/80 py-2 text-xs font-bold text-violet-700 sm:text-sm">
                            PRO Tier

                            <span className="rounded-full border border-violet-200 bg-white px-2 py-0.5 text-[8px] font-bold tracking-wider text-violet-700 sm:text-[9px]">
                                PREMIUM
                            </span>
                        </div>
                    </div>

                    {/* Feature Rows */}
                    <div className="divide-y divide-gray-100">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="group grid grid-cols-3 items-center px-4 py-5 transition-colors duration-200 hover:bg-violet-50/60 sm:px-8"
                            >
                                {/* Feature */}
                                <div className="pr-2 text-xs font-semibold leading-5 text-gray-800 sm:text-sm">
                                    {feature.name}
                                </div>

                                {/* Free */}
                                <div className="text-center text-xs text-gray-500 sm:text-sm">
                                    {feature.free}
                                </div>

                                {/* PRO */}
                                <div className="text-center text-xs font-bold text-violet-700 sm:text-sm">
                                    {feature.pro}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-violet-100 bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 px-5 py-4 text-center">
                        <p className="text-xs text-gray-600 sm:text-sm">
                            <span className="font-bold text-violet-700">
                                Upgrade to PRO
                            </span>{" "}
                            and get more value from your MentorLagbe experience.
                        </p>
                    </div>
                </div>

                {/* Bottom Note */}
                <p className="mt-5 text-center text-xs text-gray-500">
                    All plans are designed to help students and tutors connect
                    more effectively.
                </p>
            </div>
        </section>
    );
};

export default FeatureComparison;