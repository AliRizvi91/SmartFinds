'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Sparkles,
  Sprout,
  
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

export function PartnersHero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[-180px] h-[480px] w-[480px] rounded-full bg-purple/10 blur-3xl" />

        <div className="absolute right-[-160px] top-[12%] h-[420px] w-[420px] rounded-full bg-sky/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative mx-auto max-w-5xl py-24 text-center sm:py-32 lg:py-40"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-purple/15 bg-purple/[0.06] px-4 py-2 text-sm font-medium text-purple">
              <Handshake className="h-4 w-4" />
              SmartFinds Partner Network
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-7 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-ink-text sm:text-6xl lg:text-7xl"
          >
            Build what&apos;s next in{' '}
            <span className="bg-gradient-to-r from-purple via-purple to-fuchsia-500 bg-clip-text text-transparent">
              performance marketing.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg"
          >
            Join the SmartFinds partner ecosystem and create new
            opportunities through technology, integrations, agencies,
            and strategic referrals.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/publishers"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple/25"
            >
              Become a Partner

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#partner-types"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink-text transition-all duration-300 hover:border-purple/30 hover:bg-purple/[0.03]"
            >
              Explore partnerships

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Trust signal */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 text-sm text-neutral-400"
          >
            <span className="h-px w-10 bg-neutral-200" />

            <Sparkles className="h-4 w-4 text-purple/70" />

            <span>
              Built for ambitious teams, platforms &amp; creators
            </span>

            <span className="h-px w-10 bg-neutral-200" />
          </motion.div>

          {/* Floating decorative cards */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -10, 0],
                    rotate: [0, 1.5, 0],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute -left-8 top-[42%] hidden rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-xl shadow-black/[0.05] backdrop-blur-sm lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple/10">
                <Handshake className="h-4 w-4 text-purple" />
              </div>

              <div className="text-left">
                <p className="text-xs font-semibold text-ink-text">
                  Partnership
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  Built together
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 10, 0],
                    rotate: [0, -1.5, 0],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute -right-8 top-[55%] hidden rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-xl shadow-black/[0.05] backdrop-blur-sm lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-sky/10"><Sprout className="h-5 w-5 text-sky" /></div>

              <div className="text-left">
                <p className="text-xs font-semibold text-ink-text">
                  Growth
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  Together
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </section>
  );
}