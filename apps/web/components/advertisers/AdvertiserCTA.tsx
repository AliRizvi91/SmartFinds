'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import { Container } from '@/components/ui/Container';

export default function AdvertiserCTA() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-purple via-[#5B1E93] to-[#3B0764] px-7 py-16 text-center sm:px-12 sm:py-20"
        >
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <Sparkles className="mx-auto text-purple-soft" size={25} />

            <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
              Ready to grow through partnerships?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65">
              Launch your affiliate program and start building a network
              around measurable performance.
            </p>

            <Link
              href="/register/advertiser"
              className="group mt-8 inline-flex items-center gap-2 rounded-card bg-white px-6 py-3.5 font-semibold text-purple transition hover:-translate-y-0.5 hover:bg-paper"
            >
              Start growing

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}