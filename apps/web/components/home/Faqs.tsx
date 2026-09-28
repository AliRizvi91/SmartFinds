
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const defaultFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is SmartFinds?",
    answer:
      "SmartFinds is a platform that helps advertisers and publishers discover partnership opportunities and grow through performance-based marketing.",
  },
  {
    id: "faq-2",
    question: "How does SmartFinds work?",
    answer:
      "Advertisers create campaigns, publishers promote products or services, and SmartFinds helps track clicks, conversions, and commissions.",
  },
  {
    id: "faq-3",
    question: "Who can become a publisher?",
    answer:
      "Anyone with an audience, website, social media presence, or content platform can apply to become a publisher.",
  },
  {
    id: "faq-4",
    question: "How do advertisers benefit?",
    answer:
      "Advertisers can reach new audiences, work with publishers, track campaign performance, and pay based on measurable results.",
  },
  {
    id: "faq-5",
    question: "How are commissions tracked?",
    answer:
      "SmartFinds uses tracking links to monitor clicks, conversions, and other performance metrics so commissions can be calculated accurately.",
  },
  {
    id: "faq-6",
    question: "Is SmartFinds free to join?",
    answer:
      "Yes. Creating an account and exploring available partnership opportunities is free. Specific campaign terms and commission structures may vary.",
  },
];

export function Faqs({ faqs = defaultFaqs }: { faqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <div className="w-full space-y-2">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.id}
            className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
              isOpen
                ? "border-purple/30 shadow-lg"
                : "border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
            >
              <span
                className={`text-[16px] font-semibold md:text-[17px] ${
                  isOpen
                    ? "text-purple-light"
                    : "text-[#1b1b1b]"
                }`}
              >
                {faq.question}
              </span>

              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? "bg-purple-light text-white"
                    : "bg-purple/10 text-gray-700"
                }`}
              >
                {isOpen ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-gray-100 px-6 pb-6 pt-5 text-[16px] leading-7 text-[#313131c5] md:px-8 md:text-[17px]">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
