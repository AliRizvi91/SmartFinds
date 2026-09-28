'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, LineChart, Sparkles, ArrowUpRight } from 'lucide-react';
import { Container } from '../ui/Container';

const stats = [
  {
    icon: ShieldCheck,
    title: 'Trusted partnerships',
    description:
      'Every program and publisher is carefully verified before it goes live.',
    label: 'Trust first',
  },
  {
    icon: LineChart,
    title: 'Performance tracking',
    description:
      'Clicks, conversions, and commissions are tracked with clear, real-time data.',
    label: 'Real-time',
  },
  {
    icon: Sparkles,
    title: 'Data-driven growth',
    description:
      'Actionable insights help both sides focus their efforts where they perform best.',
    label: 'Smarter growth',
    highlight: true,
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
      delay: i * 0.12,
    },
  }),
};

export function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
      />

      <Container>
        {/* Intro */}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-purple" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple">
                Who we are
              </span>
            </div>

            <h2 className="max-w-md font-display text-3xl leading-[1.15] text-ink-text sm:text-4xl md:text-[44px]">
              We make partnerships
              <span className="block text-purple">simpler.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.1,
            }}
            className="max-w-2xl"
          >
            <p className="text-[16px] leading-8 text-neutral-500 md:text-[17px]">
              Arclane is an affiliate marketing platform designed to bring
              advertisers and publishers together in one connected ecosystem.
              We provide the technology, tracking, and insights needed to
              create measurable partnerships and sustainable growth.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple" />
                Connected ecosystem
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Measurable results
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="relative mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,28,26,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(15,28,26,0.09)] md:p-7"
              >
                {/* Card glow */}
                <div
                  aria-hidden="true"
                  className={
                    'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ' +
                    (stat.highlight ? 'bg-gold/15' : 'bg-purple/10')
                  }
                />

                {/* Top row */}
                <div className="relative flex items-start justify-between">
                  <span
                    className={
                      'flex h-11 w-11 items-center justify-center rounded-xl border ' +
                      (stat.highlight
                        ? 'border-gold/20 bg-gold/10 text-gold'
                        : 'border-purple/15 bg-purple/10 text-purple')
                    }
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-neutral-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-500"
                  />
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    {stat.label}
                  </span>

                  <h3 className="mt-2 font-display text-xl text-ink-text">
                    {stat.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className={
                    'absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full ' +
                    (stat.highlight ? 'bg-gold' : 'bg-purple')
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
