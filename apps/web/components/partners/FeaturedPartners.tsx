'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import { Container } from '@/components/ui/Container';

const partners = [
  'NOVAFLUX',
  'MERIDIAN',
  'VERTEX',
  'NEXORA',
  'PULSEGRID',
  'LUMEN',
  'ORBITAL',
  'KINETIQ',
];

export function FeaturedPartners() {
  const shouldReduceMotion = useReducedMotion();

  const firstRow = [...partners];
  const secondRow = [...partners].reverse();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-28">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[700px] -translate-x-1/2 rounded-full bg-purple/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-purple-light" />
            Partner Network
          </div>

          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Built to connect{' '}
            <span className="text-purple-light">great teams.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            Our partner ecosystem brings technology, agencies, platforms,
            and growth-focused teams into one connected network.
          </p>
        </motion.div>

        {/* Partner marquee */}
        <div className="relative mt-14 space-y-4">
          {/* Side fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent sm:w-32" />

          {/* Row 1 */}
          <div className="overflow-hidden">
            <motion.div
              className="flex w-max items-center gap-3"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      x: ['0%', '-50%'],
                    }
              }
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...firstRow, ...firstRow].map((partner, index) => (
                <PartnerWordmark
                  key={`${partner}-${index}`}
                  name={partner}
                />
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden">
            <motion.div
              className="flex w-max items-center gap-3"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      x: ['-50%', '0%'],
                    }
              }
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...secondRow, ...secondRow].map((partner, index) => (
                <PartnerWordmark
                  key={`${partner}-${index}`}
                  name={partner}
                  secondary
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Demo disclosure */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 text-center text-xs leading-6 text-white/35"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-light/70" />
          Partner names shown above are illustrative examples for the
          SmartFinds partner ecosystem.
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="mt-14 flex justify-center"
        >
          <a
            href="/publishers"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-purple-light/30 hover:bg-purple/20"
          >
            Become part of the network

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

function PartnerWordmark({
  name,
  secondary = false,
}: {
  name: string;
  secondary?: boolean;
}) {
  return (
    <div
      className={[
        'flex h-20 min-w-[180px] items-center justify-center rounded-lg border px-7 backdrop-blur-sm transition-colors duration-300',
        secondary
          ? 'border-white/[0.07] bg-white/[0.025]'
          : 'border-white/[0.09] bg-white/[0.045]',
      ].join(' ')}
    >
      <span
        className={[
          'font-mono text-sm font-semibold tracking-[0.18em]',
          secondary ? 'text-white/35' : 'text-white/50',
        ].join(' ')}
      >
        {name}
      </span>
    </div>
  );
}