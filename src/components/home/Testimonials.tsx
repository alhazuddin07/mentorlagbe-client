
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const testimonials = [
    {
        id: 1,
        name: "Ariful Islam",
        role: "HSC Student",
        review:
            "MentorLagbe helped me a lot in HSC preparation. The tutor was amazing!",
        image: "/images/testimonial-1.png",
        rating: 4,
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        role: "Tutor",
        review:
            "A great platform for tutors too. I got more students here.",
        image: "/images/testimonial-2.png",
        rating: 5,
    },
    {
        id: 3,
        name: "Rafiul Hasan",
        role: "University Student",
        review:
            "Very user-friendly and helpful. Highly recommended!",
        image: "/images/testimonial-3.png",
        rating: 4,
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#FBF9FF] px-5 py-14 md:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-7 text-center">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-[#1B1245] sm:text-3xl">
                            What Our Users Say
                        </h2>

                        <p className="mt-1 text-sm text-[#68617E]">
                            Real stories. Real success.
                        </p>
                    </div>
                </div>

                {/* Testimonial Cards */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className="flex items-start gap-4 rounded-2xl border border-[#EEE8FC] bg-white p-4 shadow-[0_5px_20px_rgba(91,61,245,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(91,61,245,0.12)] sm:p-5"
                        >
                            {/* User Avatar */}
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#EEE5FF] bg-[#EEE5FF]">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Review Content */}
                            <div className="min-w-0 flex-1">
                                <p className="text-sm leading-relaxed text-[#332957]">
                                    “{testimonial.review}”
                                </p>

                                <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
                                    <div>
                                        <h3 className="text-xs font-bold text-[#1B1245]">
                                            {testimonial.name}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-[#858098]">
                                            {testimonial.role}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                key={index}
                                                size={13}
                                                className={
                                                    index < testimonial.rating
                                                        ? "fill-[#FFB21D] text-[#FFB21D]"
                                                        : "fill-[#E5E0ED] text-[#E5E0ED]"
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}