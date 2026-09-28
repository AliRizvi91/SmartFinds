'use client';

import { motion } from 'framer-motion';
import { Eye, Lightbulb, TrendingUp, Handshake } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const values = [
  { icon: Eye, title: 'Transparency', description: 'We believe successful partnerships start with trust.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We continuously improve the technology behind affiliate marketing.' },
  { icon: TrendingUp, title: 'Performance', description: 'We focus on measurable outcomes, not vanity metrics.' },
  { icon: Handshake, title: 'Partnership', description: 'We grow when our advertisers and publishers grow.' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

export function ValuesSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading align="center" title="Our values" />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={itemVariants}
                className="text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple/10 text-purple">
                  <Icon size={22} />
                </span>
                <p className="mt-5 font-display text-lg text-ink-text">{value.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
