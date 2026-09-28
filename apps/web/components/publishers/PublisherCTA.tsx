'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import { Container } from '@/components/ui/Container';

export default function PublisherCTA() {
  return (
    <section className="relative overflow-hidden bg-paper py-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#7129b0] via-[#5B1E93] to-[#3B0764] px-7 py-16 text-center text-white sm:px-12 lg:py-20"
        >
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles size={21} />
            </div>

            <h2 className="mt-7 font-display text-4xl leading-tight sm:text-5xl">
              Ready to start earning?
            </h2>

            <p className="mx-auto mt-5 max-w-lg leading-7 text-white/65">
              Turn the audience you've already built into a new
              revenue stream with SmartFinds.
            </p>

            <Link
              href="/register/publisher"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-purple transition hover:-translate-y-0.5 hover:bg-paper"
            >
              Start earning
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}