'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Rocket,
  Settings2,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const steps = [
  {
    number: '01',
    title: 'Apply',
    description:
      'Tell us about your company, audience, capabilities, and how you would like to work with SmartFinds.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Review',
    description:
      'Our team reviews your application and identifies the partnership model and opportunities that fit.',
    icon: CheckCircle2,
  },
  {
    number: '03',
    title: 'Setup',
    description:
      'Get the resources, technical guidance, and support needed to prepare your partnership for launch.',
    icon: Settings2,
  },
  {
    number: '04',
    title: 'Go Live',
    description:
      'Launch your partnership and start creating value across the SmartFinds ecosystem.',
    icon: Rocket,
  },
];

export function PartnershipProcess() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
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
    <section className="relative overflow-hidden bg-paper py-20 sm:py-28 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[20%] h-[420px] w-[420px] rounded-full bg-purple/[0.06] blur-3xl" />

        <div className="absolute right-[-160px] bottom-[-120px] h-[400px] w-[400px] rounded-full bg-sky/[0.05] blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex rounded-full border border-purple/15 bg-purple/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-purple">
              HOW IT WORKS
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-5 font-display text-4xl font-bold tracking-tight text-ink-text sm:text-5xl"
          >
            From application to{' '}
            <span className="bg-gradient-to-r from-purple to-fuchsia-500 bg-clip-text text-transparent">
              partnership.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg"
          >
            A simple process designed to get the right partners moving
            quickly while creating a strong foundation for long-term
            collaboration.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[31px] hidden h-px bg-neutral-200 lg:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: shouldReduceMotion ? '100%' : '100%',
              }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 1.2,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full bg-gradient-to-r from-purple/20 via-purple to-purple/20"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Step icon */}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_35px_rgba(15,28,26,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-purple/30 group-hover:shadow-[0_15px_40px_rgba(113,41,176,0.12)]">
                    <Icon className="h-6 w-6 text-purple transition-transform duration-300 group-hover:scale-110" />

                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-[9px] font-semibold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="mt-7 rounded-[24px] border border-neutral-200 bg-white p-6 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(15,28,26,0.07)]">
                    <h3 className="font-display text-2xl font-bold text-ink-text">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-500">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="/publishers"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-purple"
          >
            Start your application

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}