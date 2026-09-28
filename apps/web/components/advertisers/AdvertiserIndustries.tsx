'use client';

import { motion } from 'framer-motion';
import {
  Blocks,
  Globe2,
  ShoppingBag,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const industries = [
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    text: 'Turn product discovery into measurable sales through creators and affiliate partners.',
  },
  {
    icon: Blocks,
    title: 'SaaS',
    text: 'Build a partner channel that helps your software reach highly relevant audiences.',
  },
  {
    icon: Globe2,
    title: 'Marketplaces',
    text: 'Expand customer acquisition across publishers, creators, and niche communities.',
  },
];

export default function AdvertiserIndustries() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">
            Built for ambitious brands
          </p>

          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Wherever your customers discover products.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-card border border-ink/10 bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 text-purple">
                  <Icon size={22} />
                </div>

                <h3 className="mt-7 font-display text-2xl text-ink">
                  {industry.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {industry.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}