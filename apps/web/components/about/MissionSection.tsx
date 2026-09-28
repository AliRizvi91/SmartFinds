'use client';

import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

export function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-28">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.28), transparent 68%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[440px] w-[440px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(113,41,176,0.4), transparent 68%)',
        }}
      />

      {/* Subtle center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.22), transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: 'easeOut',
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold shadow-[0_0_40px_rgba(201,162,39,0.08)]"
          >
            <Target size={24} strokeWidth={1.7} />
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-white/20" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              What drives us
            </span>

            <span className="h-px w-8 bg-white/20" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: 'easeOut',
            }}
            className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl"
          >
            Our mission
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: 'easeOut',
            }}
            className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-white/60 md:text-[17px]"
          >
            Our mission is to make affiliate marketing more transparent,
            accessible, and performance-driven for businesses and creators of
            every size.
          </motion.p>

          {/* Bottom statement */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: 'easeOut',
            }}
            className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.7)]" />

            <span className="text-xs font-medium tracking-wide text-white/55">
              Better partnerships. Better outcomes.
            </span>

            <ArrowRight size={14} className="text-white/35" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
