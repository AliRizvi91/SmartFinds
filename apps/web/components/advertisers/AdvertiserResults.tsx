'use client';

import { motion } from 'framer-motion';
import {
  Clock3,
  Network,
  TrendingUp,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const stats = [
  {
    value: '4.8×',
    label: 'Average ROI',
    icon: TrendingUp,
  },
  {
    value: '18 days',
    label: 'Avg. time to first conversion',
    icon: Clock3,
  },
  {
    value: '25K+',
    label: 'Publishers in network',
    icon: Network,
  },
];

export default function AdvertiserResults() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-[24px] bg-ink px-6 py-14 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-soft">
              The numbers
            </p>

            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Built around measurable outcomes.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-card border border-white/10 bg-white/[0.04] p-7 text-center"
                >
                  <Icon
                    size={22}
                    className="mx-auto text-purple-soft"
                  />

                  <p className="mt-5 font-display text-4xl text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm text-white/50">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs text-white/35">
            Illustrative figures for demonstration purposes.
          </p>
        </div>
      </Container>
    </section>
  );
}