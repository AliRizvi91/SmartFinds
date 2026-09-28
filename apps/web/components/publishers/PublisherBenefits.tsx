'use client';

import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Banknote,
  LineChart,
  UsersRound,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const benefits = [
  {
    icon: BadgeCheck,
    number: '01',
    title: 'Trusted brand programs',
    description:
      'Connect with verified advertisers and understand every program before you promote it.',
  },
  {
    icon: Banknote,
    number: '02',
    title: 'Fast, reliable payouts',
    description:
      'Clear payout schedules and transparent earnings help you know exactly when to expect your money.',
  },
  {
    icon: LineChart,
    number: '03',
    title: 'Real-time tracking',
    description:
      'Monitor clicks, conversions and commissions without waiting for end-of-month reports.',
  },
  {
    icon: UsersRound,
    number: '04',
    title: 'No minimum audience',
    description:
      'You do not need a massive following. Start with the audience and influence you already have.',
  },
];

export default function PublisherBenefits() {
  return (
    <section className="bg-ink py-24 text-white lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-soft">
              Why SmartFinds
            </p>

            <h2 className="mt-5 max-w-md font-display text-4xl leading-tight lg:text-5xl">
              Built around how publishers actually work.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-white/50">
              Everything you need to turn recommendations into a
              sustainable revenue stream.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group bg-ink p-7 transition hover:bg-white/[0.035] lg:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-purple-soft transition group-hover:border-purple/30 group-hover:bg-purple/10">
                      <Icon size={20} />
                    </div>

                    <span className="font-mono text-xs text-white/20">
                      {benefit.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-lg font-medium">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}