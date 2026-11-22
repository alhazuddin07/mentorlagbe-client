"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Trophy } from "lucide-react";

const faqs = [
  {
    question: "How do I book a tuition?",
    answer:
      "Browse available tuitions, choose the one that matches your needs, and submit an application. The tutor will review your application and respond.",
  },
  {
    question: "Is MentorLagbe free to use?",
    answer:
      "Yes! You can start with our Free Plan. You can also upgrade to a Pro Plan to unlock additional premium features.",
  },
  {
    question: "How can I become a tutor?",
    answer:
      "Create a Tutor account, complete your profile, and post your tuition details. Once your tuition is approved, students can discover and apply to it.",
  },
  {
    question: "How can I track my application?",
    answer:
      "Visit your Student Dashboard and open My Applications. There you can check whether your application is pending, accepted, or rejected.",
  },
  {
    question: "How do I upgrade to a Pro Plan?",
    answer:
      "Visit the Pricing page, select the Pro Plan that matches your role, and complete the secure Stripe checkout process.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-5 py-14 md:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">

        {/* FAQ Content */}
        <div>
          {/* Heading */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1B1245]">
                Frequently Asked Questions
              </h2>

              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#68617E]">
                Find answers to common questions.
              </p>
            </div>

          </div>

          {/* Accordion */}
          <div className="overflow-hidden rounded-xl border border-[#EEE8FC] bg-white shadow-[0_5px_20px_rgba(91,61,245,0.05)]">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={index}
                  className="border-b border-[#EEE8FC] last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition hover:bg-[#FBF9FF]"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#1B1245]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#6426D9] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4">
                      <p className="text-sm sm:text-base leading-relaxed text-[#68617E]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative flex min-h-[270px] items-center overflow-hidden rounded-[24px] bg-gradient-to-r from-[#501BC0] via-[#7028DF] to-[#9B5CF6] px-6 py-8 text-white sm:px-8">

          {/* Decorative Background */}
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-purple-300/20 blur-2xl" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-[65%]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <Trophy size={28} className="text-[#FFD45C]" />
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug">
              Ready to Start Your Learning Journey?
            </h3>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-purple-100">
              Join thousands of learners and find the best tutor for you today!
            </p>

            <Link
              href="/sign-up"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#6426D9] shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              Get Started Free
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Student Image */}
          <div className="absolute bottom-0 right-0 z-10 h-[90%] w-[43%]">
            <Image
              src="/images/faq-student.png"
              alt="Happy student ready to learn"
              fill
              sizes="(max-width: 768px) 40vw, 250px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
