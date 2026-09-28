'use client';

import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Blocks,
  Globe2,
  Link2,
  BarChart3,
  Wallet,
  ShieldCheck,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const industries = [
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    description:
      'Turn product discovery into measurable sales through creators, deal sites, and content affiliates.',
    points: [
      'Per-SKU or storewide commission rules',
      'Coupon and deal-site tracking support',
      'Seasonal campaign scheduling',
    ],
  },
  {
    icon: Blocks,
    title: 'SaaS',
    description:
      'Build a partner channel that helps your software reach highly relevant, high-intent audiences.',
    points: [
      'Recurring commission on subscription renewals',
      'Longer cookie windows for considered purchases',
      'Trial-to-paid conversion tracking',
    ],
  },
  {
    icon: Globe2,
    title: 'Marketplaces',
    description:
      'Expand customer acquisition across publishers, creators, and niche communities at scale.',
    points: [
      'Multi-vendor commission splitting',
      'Category-level program targeting',
      'Fraud and duplicate-order detection',
    ],
  },
];

const capabilities = [
  {
    icon: Link2,
    title: 'Reliable tracking',
    description: 'Tracking links and cookie-based attribution that hold up across the full customer journey.',
  },
  {
    icon: BarChart3,
    title: 'Real-time reporting',
    description: 'Clicks, conversions, and commission update live — no end-of-week surprises for either side.',
  },
  {
    icon: Wallet,
    title: 'Automated payouts',
    description: 'Commission is calculated from your program rules and queued for payout on a schedule you set.',
  },
  {
    icon: ShieldCheck,
    title: 'Program controls',
    description: 'Approve every publisher yourself, and pause or adjust a program at any time.',
  },
];

export function SolutionsPageContent() {
  return (
    <main className="bg-paper">
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div
          className="pointer-events-none absolute right-0 top-0 -z-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)' }}
          aria-hidden
        />
        <Container className="relative z-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-purple"
          >
            Solutions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 font-display text-4xl text-ink-text md:text-5xl"
          >
            One platform, built for how your business actually sells.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mt-5 text-[17px] leading-relaxed text-neutral-500"
          >
            Whether you sell products, subscriptions, or run a marketplace,
            SmartFinds adapts its tracking and commission rules to fit your
            model — not the other way around.
          </motion.p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-card border border-ink/10 bg-white p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 text-purple">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-7 font-display text-2xl text-ink-text">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    {industry.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-neutral-200 pt-5">
                    {industry.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[13.5px] text-neutral-500">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-ink-text md:text-4xl">
              The same core platform, every time.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
              Whatever you sell, every program runs on the same reliable
              tracking and payout infrastructure.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, i) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                  className="rounded-card border border-neutral-200 bg-white p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10 text-purple">
                    <Icon size={19} />
                  </span>
                  <p className="mt-4 font-display text-lg text-ink-text">{capability.title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
                    {capability.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="max-w-2xl text-center">
          <h2 className="font-display text-3xl text-ink-text md:text-4xl">
            Not sure which fits your business?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
            Tell us how you sell, and we&apos;ll help you set up a program
            that matches.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/register/advertiser" variant="primary">
              Start growing
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to us
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
