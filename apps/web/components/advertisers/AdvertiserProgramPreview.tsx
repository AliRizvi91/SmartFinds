'use client';

import { motion } from 'framer-motion';
import {
  CalendarDays,
  ChevronDown,
  Percent,
  Tag,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

export default function AdvertiserProgramPreview() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">
              Simple program setup
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Launch a program without the complexity.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-500">
              Define the rules of your program once, then let SmartFinds
              handle the tracking and partnership workflow.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[20px] border border-ink/10 bg-white p-6 shadow-[0_25px_70px_rgba(15,28,26,0.08)] sm:p-8"
          >
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Create program
              </p>

              <h3 className="mt-2 font-display text-2xl text-ink">
                New affiliate program
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Commission type
                </label>

                <div className="flex items-center justify-between rounded-card border border-ink/10 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Percent size={18} className="text-purple" />
                    <span className="text-sm text-ink">
                      Percentage
                    </span>
                  </div>

                  <ChevronDown size={16} className="text-neutral-500" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">
                    Commission
                  </label>

                  <div className="rounded-card border border-ink/10 px-4 py-3 text-sm text-ink">
                    15%
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">
                    Cookie duration
                  </label>

                  <div className="flex items-center gap-3 rounded-card border border-ink/10 px-4 py-3 text-sm text-ink">
                    <CalendarDays size={17} className="text-purple" />
                    30 days
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Category
                </label>

                <div className="flex items-center gap-3 rounded-card border border-ink/10 px-4 py-3 text-sm text-ink">
                  <Tag size={17} className="text-purple" />
                  E-commerce
                </div>
              </div>

              <button className="w-full rounded-card bg-purple py-3.5 text-sm font-semibold text-white transition hover:bg-purple-dark">
                Create program
              </button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}