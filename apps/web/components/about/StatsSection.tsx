'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Building2, Users, MousePointerClick, CircleCheckBig } from 'lucide-react';
import { Container } from '../ui/Container';

// Placeholder figures — swap these for real, live numbers once the
// analytics endpoint is wired up.
const stats = [
  { icon: Building2, value: 500, suffix: '+', label: 'Advertisers' },
  { icon: Users, value: 2000, suffix: '+', label: 'Publishers' },
  { icon: MousePointerClick, value: 1, suffix: 'M+', label: 'Tracked clicks', display: (v: number) => v },
  { icon: CircleCheckBig, value: 10, suffix: 'K+', label: 'Successful conversions' },
];

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const duration = 1400;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, value]);

  return (
    <span ref={ref} className="font-display text-4xl text-ink-text md:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(113,41,176,0.3), transparent 70%)' }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className="text-center"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sky/10 text-sky">
                  <Icon size={18} />
                </span>
                <div className="mt-4">
                  <CountUpNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-[13.5px] text-neutral-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
