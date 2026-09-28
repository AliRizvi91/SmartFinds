'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Link2,
  UsersRound,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const partnerTypes = [
  {
    number: '01',
    title: 'Technology Partners',
    description:
      'Connect your attribution, analytics, payments, or infrastructure technology with the SmartFinds ecosystem.',
    icon: BarChart3,
    accent: 'bg-purple/10 text-purple',
    tags: ['Attribution', 'Analytics', 'Payments'],
  },
  {
    number: '02',
    title: 'Agency Partners',
    description:
      'Help brands build, manage, and scale their affiliate programs while creating more value for your clients.',
    icon: UsersRound,
    accent: 'bg-sky/10 text-sky',
    tags: ['Client Growth', 'Program Management', 'Strategy'],
  },
  {
    number: '03',
    title: 'Integration Partners',
    description:
      'Build seamless connections between SmartFinds and the commerce platforms your customers already use.',
    icon: Link2,
    accent: 'bg-purple/10 text-purple',
    tags: ['E-commerce', 'Automation', 'One-click Setup'],
  },
  {
    number: '04',
    title: 'Referral Partners',
    description:
      'Introduce ambitious brands and publishers to SmartFinds and create a new revenue opportunity through referrals.',
    icon: Code2,
    accent: 'bg-sky/10 text-sky',
    tags: ['Referrals', 'Revenue Share', 'Network Growth'],
  },
];

export function PartnerCategories() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
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
    <section
      id="partner-types"
      className="relative overflow-hidden bg-paper py-20 sm:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-purple/[0.045] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#0F1C1A 1px, transparent 1px), linear-gradient(90deg, #0F1C1A 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <Container className="relative">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={cardVariants}>
            <span className="inline-flex rounded-full border border-purple/15 bg-purple/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-purple">
              PARTNER ECOSYSTEM
            </span>
          </motion.div>

          <motion.h2
            variants={cardVariants}
            className="mt-5 font-display text-4xl font-bold tracking-tight text-ink-text sm:text-5xl"
          >
            There&apos;s a place for{' '}
            <span className="bg-gradient-to-r from-purple to-fuchsia-500 bg-clip-text text-transparent">
              every partner.
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg"
          >
            Whether you build technology, manage client programs, power
            commerce, or connect businesses, SmartFinds gives you a way
            to grow alongside the ecosystem.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {partnerTypes.map((partner) => {
            const Icon = partner.icon;

            return (
              <motion.article
                key={partner.title}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -6,
                        transition: {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
                className="group relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-7 shadow-[0_12px_50px_rgba(15,28,26,0.04)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(15,28,26,0.09)] sm:p-8"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top row */}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${partner.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="font-mono text-xs font-medium text-neutral-400">
                    {partner.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <h3 className="font-display text-2xl font-bold text-ink-text sm:text-[28px]">
                    {partner.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
                    {partner.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative mt-7 flex flex-wrap gap-2">
                  {partner.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors duration-300 group-hover:border-purple/15 group-hover:bg-purple/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="relative mt-8 flex items-center justify-between border-t border-neutral-100 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    Grow partnership
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover:border-purple/30 group-hover:bg-purple group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 max-w-3xl text-center"
        >
          <p className="text-sm leading-7 text-neutral-400">
            Different capabilities. One connected ecosystem.{' '}
            <span className="font-medium text-ink-text">
              Built to create more together.
            </span>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}