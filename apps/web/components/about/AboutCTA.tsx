'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function AboutCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          'linear-gradient(155deg, #7129B0 0%, #5B1E93 55%, #3B0764 100%)',
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cyan glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.28, 0.38, 0.28],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.45), transparent 70%)',
        }}
      />

      {/* Gold glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-[-80px] h-[340px] w-[340px] rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.32, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.5), transparent 70%)',
        }}
      />

      {/* Content */}
      <Container className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-gold" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
            Start building
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.1,
          }}
          className="mt-7 font-display text-4xl leading-tight text-white sm:text-5xl md:text-[52px]"
        >
          Let&apos;s grow
          <span className="block text-white/80">together.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.2,
          }}
          className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-white/65 md:text-[17px]"
        >
          Whether you&apos;re a brand looking to expand your reach or a
          publisher ready to monetize your audience, Arclane gives you the
          tools to build better partnerships.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.3,
          }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          
          <Button href="/register/advertiser" variant="inverse">
            Join as advertiser
            <ArrowRight size={16} />
          </Button>

          <Button href="/register/publisher" variant="inverseGhost">
            Join as publisher
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3 text-xs text-white/40"
        >
          <span className="h-px w-8 bg-white/15" />
          <span>Built for meaningful partnerships</span>
          <span className="h-px w-8 bg-white/15" />
        </motion.div>
      </Container>
    </section>
  );
}
