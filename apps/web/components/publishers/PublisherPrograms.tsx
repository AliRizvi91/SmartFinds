'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ShoppingBag,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const programs = [
  {
    category: 'Fashion',
    name: 'Luma Studio',
    commission: '12%',
    cookie: '30 days',
    initial: 'LS',
  },
  {
    category: 'Technology',
    name: 'Northline',
    commission: '8%',
    cookie: '45 days',
    initial: 'N',
  },
  {
    category: 'Wellness',
    name: 'Everform',
    commission: '15%',
    cookie: '60 days',
    initial: 'E',
  },
];

export default function PublisherPrograms() {
  return (
    <section id="programs" className="bg-white py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
              Marketplace
            </p>

            <h2 className="mt-4 font-display text-4xl text-ink lg:text-5xl">
              Programs worth sharing.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-ink/55">
              Browse fictional examples of what your publisher
              marketplace can look like.
            </p>
          </div>

          <Link
            href="/dashboard/publisher/programs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-purple"
          >
            Browse all programs
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-ink/10 bg-paper p-6 transition-shadow hover:shadow-[0_20px_60px_rgba(15,28,26,0.08)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-white">
                  {program.initial}
                </div>

                <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[11px] text-ink/50">
                  {program.category}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-medium text-ink">
                {program.name}
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs text-ink/40">
                    Commission
                  </p>
                  <p className="mt-1 text-lg font-semibold text-purple">
                    {program.commission}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs text-ink/40">
                    Cookie
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink">
                    {program.cookie}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-5">
                <div className="flex items-center gap-2 text-xs text-ink/45">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Verified advertiser
                </div>

                <Clock3 size={16} className="text-ink/25" />
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-medium text-white transition hover:bg-purple">
                <ShoppingBag size={16} />
                View program
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-ink/30">
          Example marketplace data shown for design purposes.
        </p>
      </Container>
    </section>
  );
}