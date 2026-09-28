'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/ui/Container';

const faqs = [
  {
    question: 'Kitna commission milta hai?',
    answer:
      'Commission advertiser aur program ke hisaab se vary karta hai. Har program join karne se pehle commission structure clearly show kiya jayega.',
  },
  {
    question: 'Payout kab milta hai?',
    answer:
      'Payout schedule program ke terms par depend karta hai. Program details mein payment schedule aur applicable conditions clearly displayed hongi.',
  },
  {
    question: 'Kya minimum audience chahiye?',
    answer:
      'Nahi. SmartFinds ka goal publishers ko unki existing audience se start karne dena hai, chahe audience chhoti ho ya large.',
  },
  {
    question: 'Kya main multiple programs join kar sakta hoon?',
    answer:
      'Haan. Publishers apni audience ke liye relevant multiple advertiser programs discover aur join kar sakte hain, subject to individual program approval.',
  },
];

export default function PublisherFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 lg:py-32">
      <Container className="max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            FAQ
          </p>

          <h2 className="mt-4 font-display text-4xl text-ink lg:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div key={faq.question}>
                <button
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-medium text-ink sm:text-lg">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="shrink-0 text-ink/40"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-10 text-sm leading-7 text-ink/55">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}