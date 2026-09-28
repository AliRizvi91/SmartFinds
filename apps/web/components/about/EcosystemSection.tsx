'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Network, Megaphone, Users, CircleDollarSign } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  { key: 'advertiser', label: 'Advertiser', icon: Building2, detail: 'Launches a program with clear commission terms.' },
  { key: 'arclane', label: 'Arclane', icon: Network, detail: 'Matches the program to relevant publishers and tracks every link.' },
  { key: 'publisher', label: 'Publisher', icon: Megaphone, detail: 'Shares tracked links with their audience.' },
  { key: 'audience', label: 'Audience', icon: Users, detail: 'Discovers the brand through content they already trust.' },
  { key: 'conversion', label: 'Conversion', icon: CircleDollarSign, detail: 'A sale happens, and commission is calculated automatically.' },
];

export function EcosystemSection() {
  const reduceMotion = useReducedMotion();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          align="center"
          title="How the ecosystem works"
          supporting="One connected path from a launched program to a paid commission."
        />

        {/* Desktop / tablet: horizontal flow */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-0 right-0 top-9 h-px bg-neutral-200" aria-hidden />
          <motion.div
            className="absolute left-0 top-9 h-px bg-gradient-to-r from-purple via-sky to-gold"
            style={{ transformOrigin: 'left' }}
            initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            aria-hidden
          />

          <div className="relative grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeKey === step.key;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                  onMouseEnter={() => setActiveKey(step.key)}
                  onMouseLeave={() => setActiveKey(null)}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <span
                    className={
                      'flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 bg-white transition-colors duration-300 ' +
                      (isActive ? 'border-purple text-purple' : 'border-neutral-200 text-ink-text/60')
                    }
                    style={{ boxShadow: isActive ? '0 12px 24px -12px rgba(113,41,176,0.5)' : undefined }}
                  >
                    <Icon size={24} />
                  </span>
                  <p className="mt-4 font-display text-base text-ink-text">{step.label}</p>
                  <p
                    className={
                      'mt-1 max-w-[140px] text-[12.5px] leading-relaxed text-neutral-500 transition-opacity duration-200 ' +
                      (isActive ? 'opacity-100' : 'opacity-0')
                    }
                  >
                    {step.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-14 space-y-8 md:hidden">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-neutral-200" aria-hidden />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className="relative flex items-start gap-4 pl-0"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-purple/40 bg-white text-purple">
                  <Icon size={19} />
                </span>
                <div className="pt-1.5">
                  <p className="font-display text-base text-ink-text">{step.label}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-neutral-500">{step.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
