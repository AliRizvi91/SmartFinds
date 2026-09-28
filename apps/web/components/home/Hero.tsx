'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { DashboardVisual } from './DashboardVisual';

export function Hero() {
  return (
    <section className="relative h-full flex flex-col justify-center items-center py-30">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 md:grid-cols-[1fr_0.9fr] md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="max-w-lg font-display text-[2.75rem] leading-[1.08] text-ink-text md:text-[3.4rem]">
            Turn partnerships into measurable growth.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-neutral-500">
            smartfinds gives advertisers and publishers one shared source of
            truth for clicks, conversions, and commissions — so every
            partnership can be judged on what it actually returns.
          </p>
          <div className="mt-9 flex flex-wrap sm:gap-4 gap-2">
            <Button href="/register/advertiser" variant="primary">
              Join as an advertiser
            </Button>
            <Button href="/register/publisher" variant="ghost">
              Join as a publisher
            </Button>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <DashboardVisual />
        </motion.div>
      </div>

    </section>
  );
}
