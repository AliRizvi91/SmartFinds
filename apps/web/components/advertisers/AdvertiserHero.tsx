'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  MousePointerClick,
  TrendingUp,
  WalletCards,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

export default function AdvertiserHero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative overflow-hidden bg-paper h-screen flex justify-center items-center py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-purple/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-sky/10 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple/15 bg-purple/5 px-4 py-2 text-sm font-medium text-purple">
              <TrendingUp size={16} />
              Partnership growth, simplified
            </div>

            <h1 className="font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Turn partnerships into{' '}
              <span className="text-purple">measurable growth.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-neutral-500">
              Grow revenue through a trusted network of publishers,
              creators, and affiliates — while keeping every conversion
              measurable.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register/advertiser"
                className="group inline-flex items-center gap-2 rounded-card bg-purple px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-dark"
              >
                Start growing
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-card border border-ink/10 bg-white px-6 py-3.5 font-semibold text-ink transition hover:border-purple/30 hover:text-purple"
              >
                See how it works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[24px] bg-purple/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[20px] border border-ink/10 bg-white shadow-[0_30px_80px_rgba(15,28,26,0.12)]">
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
                <div>
                  <p className="text-xs font-medium text-neutral-500">
                    PROGRAM PERFORMANCE
                  </p>
                  <p className="mt-1 font-display text-xl text-ink">
                    Growth overview
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
                {[
                  {
                    label: 'Revenue',
                    value: '$48.2K',
                    icon: WalletCards,
                  },
                  {
                    label: 'Conversions',
                    value: '1,284',
                    icon: MousePointerClick,
                  },
                  {
                    label: 'Publishers',
                    value: '284',
                    icon: BarChart3,
                  },
                  {
                    label: 'Growth',
                    value: '+28.4%',
                    icon: TrendingUp,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-card border border-ink/10 bg-paper p-4"
                    >
                      <Icon size={18} className="text-purple" />
                      <p className="mt-4 text-xs text-neutral-500">
                        {item.label}
                      </p>
                      <p className="mt-1 font-display text-xl text-ink">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mx-6 mb-6 rounded-card border border-ink/10 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Revenue performance
                    </p>
                    <p className="text-xs text-neutral-500">
                      Last 30 days
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-purple">
                    +24.8%
                  </span>
                </div>

                <div className="flex h-40 items-end gap-2">
                  {[30, 42, 36, 55, 48, 67, 61, 76, 69, 84, 78, 94].map(
                    (height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{
                          duration: 0.7,
                          delay: 0.25 + index * 0.04,
                        }}
                        className="flex-1 rounded-t-md bg-purple/70"
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}