'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  BadgeCheck,
  Code2,
  Headphones,
  Rocket,
  WalletCards,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const benefits = [
  {
    number: '01',
    title: 'Revenue Share',
    description:
      'Create a new revenue stream by bringing valuable brands, publishers, and opportunities into the SmartFinds ecosystem.',
    icon: WalletCards,
  },
  {
    number: '02',
    title: 'API & Webhooks',
    description:
      'Build powerful workflows with developer-friendly APIs and webhook access designed for flexible integrations.',
    icon: Code2,
  },
  {
    number: '03',
    title: 'Dedicated Support',
    description:
      'Get direct guidance from our team as you build, launch, and grow your partnership with SmartFinds.',
    icon: Headphones,
  },
  {
    number: '04',
    title: 'Partner Badge',
    description:
      'Showcase your relationship with SmartFinds with a partner badge designed to strengthen your professional credibility.',
    icon: BadgeCheck,
  },
  {
    number: '05',
    title: 'Early Feature Access',
    description:
      'Get closer to what is coming next with early access to selected platform capabilities and partner-focused updates.',
    icon: Rocket,
  },
];

export function PartnerBenefits() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-180px] top-[10%] h-[480px] w-[480px] rounded-full bg-purple/[0.07] blur-3xl" />

        <div className="absolute bottom-[-220px] left-[-180px] h-[440px] w-[440px] rounded-full bg-sky/[0.05] blur-3xl" />
      </div>

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex rounded-full border border-purple/15 bg-purple/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-purple">
              WHY SMARTFINDS
            </span>

            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-ink-text sm:text-5xl">
              More than a partnership.
              <span className="block text-purple">
                A platform to grow with.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base leading-8 text-neutral-500 lg:ml-auto lg:pb-1 lg:text-lg"
          >
            We give partners the tools, support, and opportunities they
            need to create meaningful value across the performance
            marketing ecosystem.
          </motion.p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            const isLarge = index === 0;
            const isLast = index === benefits.length - 1;

            return (
              <motion.article
                key={benefit.title}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -5,
                        transition: {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
                className={[
                  'group relative overflow-hidden rounded-[26px] border border-neutral-200 bg-paper p-6 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(15,28,26,0.08)] sm:p-7',
                  isLarge ? 'lg:col-span-7' : '',
                  index === 1 ? 'lg:col-span-5' : '',
                  index === 2 ? 'lg:col-span-4' : '',
                  index === 3 ? 'lg:col-span-4' : '',
                  isLast ? 'lg:col-span-4' : '',
                ].join(' ')}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Number */}
                <div className="relative flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple/10 text-purple transition-colors duration-300 group-hover:bg-purple group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="font-mono text-xs text-neutral-400">
                    {benefit.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <h3
                    className={`font-display font-bold text-ink-text ${
                      isLarge
                        ? 'text-3xl sm:text-4xl'
                        : 'text-2xl'
                    }`}
                  >
                    {benefit.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-neutral-500">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative line */}
                <div className="relative mt-8 h-px w-full overflow-hidden bg-neutral-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: shouldReduceMotion ? '30%' : '38%',
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full bg-purple"
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple" />

          <p className="text-sm text-neutral-400">
            Built for long-term partnerships, not one-off connections.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}