'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative mx-4 mb-20 overflow-hidden rounded-[32px] md:mx-8">
      {/* Main background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, #7129B0 0%, #5B1E93 55%, #3B0764 100%)',
        }}
        aria-hidden
      />

      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden
      />

      {/* Large purple glow */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 35, 0],
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.38), transparent 68%)',
        }}
        aria-hidden
      />

      {/* Gold glow */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -right-24 bottom-[-80px] h-[300px] w-[300px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.38), transparent 68%)',
        }}
        aria-hidden
      />

      {/* Decorative ring */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/10"
        aria-hidden
      />

      <Container className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center md:py-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
          Built for better partnerships
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
          className="mt-6 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Ready to grow through partnerships?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
          className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/75 sm:text-base"
        >
          Whether you&apos;re a brand looking to expand your reach or a
          publisher ready to monetize your audience, SmartFinds gives you the
          tools to build better partnerships.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.24 }}
          className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <Button href="/register/advertiser" variant="inverse">
              Join as advertiser
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <Button href="/register/publisher" variant="inverseGhost">
              Join as publisher
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-xs text-white/45"
        >
          Connect brands, publishers, and audiences in one platform.
        </motion.p>
      </Container>
    </section>
  );
}
