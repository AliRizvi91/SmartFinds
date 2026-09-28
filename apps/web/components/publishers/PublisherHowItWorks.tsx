'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Link2,
  Search,
  Send,
  UserPlus,
  Wallet,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const steps = [
  {
    number: '01',
    title: 'Sign up',
    description: 'Create your free publisher account.',
    icon: UserPlus,
  },
  {
    number: '02',
    title: 'Browse programs',
    description: 'Discover brands that fit your audience.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Apply',
    description: 'Request access to the programs you want.',
    icon: Send,
  },
  {
    number: '04',
    title: 'Generate links',
    description: 'Create your unique tracking link.',
    icon: Link2,
  },
  {
    number: '05',
    title: 'Get paid',
    description: 'Earn when your audience converts.',
    icon: Wallet,
  },
];

export default function PublisherHowItWorks() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            How it works
          </p>

          <h2 className="mt-4 font-display text-4xl text-ink lg:text-5xl">
            From audience to earnings in five simple steps.
          </h2>

          <p className="mt-5 leading-7 text-ink/55">
            No complicated setup. Find programs, share what matters,
            and track the results.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[10%] right-[10%] top-12 hidden border-t border-dashed border-ink/15 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-ink/10 bg-paper">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lg transition duration-300 hover:bg-purple">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="mt-6 font-mono text-xs text-purple">
                    {step.number}
                  </p>

                  <h3 className="mt-2 font-medium text-ink">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[180px] text-sm leading-6 text-ink/50">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-3xl rounded-2xl border border-purple/10 bg-white p-5 shadow-[0_20px_60px_rgba(15,28,26,0.06)] sm:p-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple/10 text-purple">
              <Link2 size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink/40">
                Your tracking link
              </p>

              <p className="mt-1 truncate font-mono text-sm text-ink/70">
                smartfinds.com/go/your-brand-8F3K2
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active
            </div>

            <ArrowRight className="hidden text-ink/20 sm:block" size={18} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}