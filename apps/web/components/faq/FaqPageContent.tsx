'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Faqs, type FaqItem } from '../home/Faqs';

const categories: { title: string; items: FaqItem[] }[] = [
  {
    title: 'Getting started',
    items: [
      {
        id: 'gs-1',
        question: 'What is SmartFinds?',
        answer:
          'SmartFinds is an affiliate marketing platform that connects advertisers running partner programs with publishers who promote them, and tracks every click, conversion, and commission in between.',
      },
      {
        id: 'gs-2',
        question: 'Is SmartFinds free to join?',
        answer:
          'Yes. Creating an account and browsing available programs is free for both advertisers and publishers. Specific program terms and commission structures are set by each advertiser.',
      },
      {
        id: 'gs-3',
        question: 'Do I need a website to become a publisher?',
        answer:
          'A website helps, but it is not required — publishers with a social media following, newsletter, or content platform can also apply to promote programs.',
      },
    ],
  },
  {
    title: 'Tracking & commissions',
    items: [
      {
        id: 'tc-1',
        question: 'How are clicks and conversions tracked?',
        answer:
          'Every publisher gets a unique tracking link per program. When someone clicks it, we record the referral; if that visit leads to a conversion within the program\u2019s cookie window, it is attributed back to the publisher automatically.',
      },
      {
        id: 'tc-2',
        question: 'When do I get paid?',
        answer:
          'Once an advertiser approves a conversion, the commission moves from pending to approved. Approved commissions are included in the next scheduled payout, which you can track from your dashboard.',
      },
      {
        id: 'tc-3',
        question: 'What is a cookie window?',
        answer:
          'It\u2019s the length of time after a click during which a conversion is still credited to the referring publisher. Cookie windows are set per program and typically range from 7 to 60 days.',
      },
    ],
  },
  {
    title: 'Advertisers',
    items: [
      {
        id: 'ad-1',
        question: 'How do I launch a program?',
        answer:
          'Register as an advertiser, then create a program with your commission type, rate, cookie duration, and terms. Once submitted, your program becomes visible to matching publishers.',
      },
      {
        id: 'ad-2',
        question: 'Do I have to approve every publisher?',
        answer:
          'Yes — you review and approve or decline each publisher application, so you stay in control of who promotes your brand.',
      },
    ],
  },
];

export function FaqPageContent() {
  return (
    <main className="bg-paper">
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(113,41,176,0.3), transparent 70%)' }}
          aria-hidden
        />
        <Container className="relative z-10 max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-4xl text-ink-text md:text-5xl"
          >
            Frequently asked questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mt-4 text-[17px] leading-relaxed text-neutral-500"
          >
            Everything you need to know about programs, tracking, and
            payouts. Can&apos;t find your answer? Reach out and we&apos;ll
            help directly.
          </motion.p>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="max-w-3xl space-y-16">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.05 }}
            >
              <h2 className="font-display text-xl text-ink-text md:text-2xl">
                {category.title}
              </h2>
              <div className="mt-6">
                <Faqs faqs={category.items} />
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      <section className="pb-24">
        <Container className="max-w-2xl">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-neutral-200 bg-white p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple/10 text-purple">
              <Mail size={20} />
            </span>
            <div>
              <p className="font-display text-lg text-ink-text">
                Still have questions?
              </p>
              <p className="mt-1 text-[14.5px] text-neutral-500">
                Our team is happy to walk you through anything not covered here.
              </p>
            </div>
            <Button href="/contact" variant="primary">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
