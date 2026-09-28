'use client';

import { motion } from 'framer-motion';
import {
  Check,
  FilePlus2,
  Handshake,
  MousePointerClick,
  UserPlus,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign up',
    text: 'Create your advertiser account and tell us about your brand.',
  },
  {
    number: '02',
    icon: FilePlus2,
    title: 'Create your program',
    text: 'Set commission rates, cookie duration, categories, and terms.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Get matched',
    text: 'Discover publishers whose audience aligns with your products.',
  },
  {
    number: '04',
    icon: Check,
    title: 'Approve applications',
    text: 'Review publisher applications and approve the right partners.',
  },
  {
    number: '05',
    icon: MousePointerClick,
    title: 'Track & pay',
    text: 'Monitor conversions and pay commissions based on performance.',
  },
];

export default function AdvertiserHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-ink py-24 text-white sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-soft">
            How it works
          </p>

          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            From signup to your first partnership.
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/60">
            A simple workflow designed to get your affiliate program running
            without unnecessary complexity.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative rounded-card border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-purple-soft">
                    {step.number}
                  </span>

                  <Icon size={20} className="text-white/60" />
                </div>

                <h3 className="mt-8 font-display text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}