'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  CreditCard,
  DollarSign,
  Landmark,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const stats = [
  {
    value: '12.4%',
    label: 'Avg. commission rate',
  },
  {
    value: '$3.82',
    label: 'Avg. EPC',
  },
  {
    value: '$48.6K',
    label: 'Top publisher earnings',
  },
];

const paymentMethods = [
  {
    name: 'PayPal',
    icon: CreditCard,
  },
  {
    name: 'Bank transfer',
    icon: Landmark,
  },
  {
    name: 'Wise',
    icon: Building2,
  },
];

export default function PublisherEarnings() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-ink text-white">
          <div className="relative p-7 sm:p-10 lg:p-14">
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-purple/20 blur-[100px]" />

            <div className="relative grid gap-14 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-soft">
                  Earnings potential
                </p>

                <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight lg:text-5xl">
                  Your audience has value.
                  <span className="text-purple-soft">
                    {' '}Make it measurable.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg leading-7 text-white/50">
                  See the metrics that matter and understand how
                  your content can translate into measurable revenue.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <p className="text-2xl font-semibold">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-white/40">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple/20 p-3 text-purple-soft">
                      <DollarSign size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-white/40">
                        Payment options
                      </p>
                      <p className="font-medium">
                        Choose what works for you
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;

                      return (
                        <div
                          key={method.name}
                          className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              size={17}
                              className="text-white/50"
                            />
                            <span className="text-sm">
                              {method.name}
                            </span>
                          </div>

                          <ArrowUpRight
                            size={15}
                            className="text-white/20"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-ink/30">
          Earnings figures are illustrative placeholders for UI purposes.
        </p>
      </Container>
    </section>
  );
}