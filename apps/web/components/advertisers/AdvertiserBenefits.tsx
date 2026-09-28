'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Eye,
  Gauge,
  ShieldCheck,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const benefits = [
  {
    icon: Gauge,
    title: 'Pay only for performance',
    description:
      'Pay commissions when publishers generate real conversions — not simply for impressions.',
  },
  {
    icon: ShieldCheck,
    title: 'Vetted publisher network',
    description:
      'Connect with quality creators, affiliates, and publishers aligned with your brand.',
  },
  {
    icon: Eye,
    title: 'Full transparency',
    description:
      'Track clicks, conversions, revenue, and commissions without a black box.',
  },
  {
    icon: CheckCircle2,
    title: 'Fast program setup',
    description:
      'Create your affiliate program, define your terms, and get ready to launch in minutes.',
  },
];

export default function AdvertiserBenefits() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">
            Built for advertisers
          </p>

          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Everything you need to grow through partnerships.
          </h2>

          <p className="mt-5 text-lg leading-8 text-neutral-500">
            SmartFinds gives brands the tools and network they need to build
            predictable, measurable affiliate growth.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-card border border-ink/10 bg-paper p-7 transition-shadow hover:shadow-xl hover:shadow-ink/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 text-purple transition group-hover:bg-purple group-hover:text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mt-7 font-display text-2xl text-ink">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}