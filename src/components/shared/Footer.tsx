import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";


const CONTACT = {
    email: "support@mentorlagbe.com",
    phone: "+880 12345678912",
    address: "Dhaka , Bangladesh",
};

const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "Explore Tuitions", href: "/tuitions" },
    { label: "About Us", href: "/about" },
];

const SOCIALS = [
    { label: "MentorLagbe on Facebook", href: "https://facebook.com/", icon: "facebook" },
    { label: "MentorLagbe on X", href: "https://x.com/", icon: "x" },
    { label: "MentorLagbe on Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "MentorLagbe on LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
    { label: "MentorLagbe on YouTube", href: "https://youtube.com/", icon: "youtube" },
] as const;


type SocialName = (typeof SOCIALS)[number]["icon"];

const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

const SocialIcon = ({ name }: { name: SocialName }) => {
    const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true } as const;

    switch (name) {
        case "x":
            return (
                <svg {...common} fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
            );
        case "facebook":
            return (
                <svg {...common} {...strokeProps}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            );
        case "instagram":
            return (
                <svg {...common} {...strokeProps}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
            );
        case "linkedin":
            return (
                <svg {...common} {...strokeProps}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            );
        case "youtube":
            return (
                <svg {...common} {...strokeProps}>
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                </svg>
            );
    }
};

const Footer = () => {

    return (
        <footer className="relative overflow-hidden bg-[#1B1245] text-white">
            {/* Background decorations (same soft glows as the hero) */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#6426D9]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#8750E8]/15 blur-3xl" />

            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-[#8750E8] to-transparent" />

            <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 md:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9B7FF]"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6426D9] shadow-lg shadow-purple-900/40">
                                <GraduationCap size={24} />
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight">
                                Mentor<span className="text-[#C9B7FF]">Lagbe</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm sm:text-base leading-relaxed text-[#D8CFF5]">
                            Find a trusted tutor who fits your goals, your schedule and your
                            budget, and start learning with confidence.
                        </p>

                        {/* Social links */}
                        <ul className="mt-7 flex flex-wrap items-center gap-3">
                            {SOCIALS.map((s) => (
                                <li key={s.icon}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#E4DBFF] transition-all duration-300 hover:-translate-y-1 hover:border-[#8750E8] hover:bg-[#6426D9] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B7FF]"
                                    >
                                        <SocialIcon name={s.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick links */}
                    <nav aria-label="Footer navigation" className="lg:col-span-3">
                        <h2 className="text-sm font-semibold tracking-wider uppercase text-white/90">Quick links</h2>
                        <div className="mt-2 h-0.5 w-10 rounded-full bg-[#8750E8]" />
                        <ul className="mt-5 space-y-3">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#D8CFF5] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9B7FF]"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#8750E8] transition-all duration-300 group-hover:w-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div className="lg:col-span-4">
                        <h2 className="text-sm font-semibold tracking-wider uppercase text-white/90">Get in touch</h2>
                        <div className="mt-2 h-0.5 w-10 rounded-full bg-[#8750E8]" />
                        <ul className="mt-5 space-y-4 text-sm text-[#D8CFF5]">
                            <li>
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="group flex items-center gap-3 transition-colors hover:text-white"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#C9B7FF] transition-colors group-hover:bg-[#6426D9] group-hover:text-white">
                                        <Mail size={17} />
                                    </span>
                                    {CONTACT.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                                    className="group flex items-center gap-3 transition-colors hover:text-white"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#C9B7FF] transition-colors group-hover:bg-[#6426D9] group-hover:text-white">
                                        <Phone size={17} />
                                    </span>
                                    {CONTACT.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#C9B7FF]">
                                    <MapPin size={17} />
                                </span>
                                <span className="pt-2 leading-relaxed">{CONTACT.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs sm:text-sm text-[#B9AEE0] sm:flex-row sm:text-left">
                    <p>© 2026 MentorLagbe. All rights reserved.</p>

                    <div className="flex items-center gap-5">
                        <p className="transition-colors hover:text-white cursor-pointer">
                            Privacy policy
                        </p>
                        <p className="transition-colors hover:text-white cursor-pointer">
                            Terms of service
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
