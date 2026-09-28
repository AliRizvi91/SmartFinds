'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/ui/Container';

const faqs = [
  {
    question: 'Setup karne mein kitna time lagta hai?',
    answer:
      'Aap apna advertiser account create karke apne affiliate program ki basic settings kuch hi minutes mein configure kar sakte hain.',
  },
  {
    question: 'Main apni commission rate kaise set karun?',
    answer:
      'Aap percentage-based ya fixed commission choose kar sakte hain aur apna program create karte waqt commission amount define kar sakte hain.',
  },
  {
    question: 'Main publishers ko kaise approve karun?',
    answer:
      'Publishers aapke program ke liye apply kar sakte hain. Aap unki application review karke un partners ko approve kar sakte hain jo aapki requirements ko meet karte hain.',
  },
  {
    question: 'Kya setup fee hai?',
    answer:
      'Pricing aur applicable platform fees aapke selected SmartFinds plan aur affiliate program ki configuration par depend karti hain.',
  },
];

export default function AdvertiserFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">
            FAQ
          </p>

          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl text-ink">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-purple transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? 'grid-rows-[1fr] pb-6 opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-sm leading-7 text-neutral-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}