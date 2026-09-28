'use client';

import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Target, Settings2, BarChart3, Handshake } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const benefits = [
  { icon: Eye, title: 'Transparency', description: 'Every click and commission is visible to both sides, in real time.' },
  { icon: ShieldCheck, title: 'Reliable tracking', description: 'Attribution that holds up, cookie windows that are honored.' },
  { icon: Target, title: 'Performance focus', description: 'Programs are built around outcomes, not vanity metrics.' },
  { icon: Settings2, title: 'Simple management', description: 'Approve, pause, or adjust a program in a few clicks.' },
  { icon: BarChart3, title: 'Data-driven decisions', description: 'Reporting that tells you what to do next, not just what happened.' },
  { icon: Handshake, title: 'Long-term partnerships', description: 'Built for relationships that compound over seasons, not one campaign.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: (i % 3) * 0.1 },
  }),
};

export function WhyArclane() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute right-0 top-0 -z-0 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)' }}
        aria-hidden
      />

      <Container className="relative z-10">
        <SectionHeading align="center" title="Built around better partnerships." />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="rounded-card border border-white/60 bg-white/70 p-6 backdrop-blur-sm transition-shadow duration-300"
                style={{ boxShadow: '0 20px 40px -30px rgba(113,41,176,0.35)' }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10 text-purple">
                  <Icon size={18} />
                </span>
                <p className="mt-4 font-display text-lg text-ink-text">{benefit.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
                  {benefit.description}
                </p>
                <span className="mt-4 block h-1 w-6 rounded-full bg-gold/70" aria-hidden />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
