'use client';

import { motion } from 'framer-motion';

/**
 * An original, fully composed SVG/CSS "product visual" for the hero —
 * deliberately not a screenshot of any real dashboard.
 */
export function DashboardVisual() {
  return (
    <div className="relative">
      {/* Purple glow */}
      <div
        className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(113,41,176,0.35), rgba(201,162,39,0.12), transparent)',
        }}
        aria-hidden
      />

      {/* Dashboard */}
      <div className="rounded-card border border-neutral-200 bg-ink p-6 shadow-[0_30px_60px_-25px_rgba(15,28,26,0.45)]">
        <div className="flex items-center justify-between text-paper/70">
          <span className="font-mono text-xs">
            Program performance
          </span>

          <span className="font-mono text-xs text-gold-soft">
            Last 30 days
          </span>
        </div>

        {/* Revenue chart */}
        <svg
          viewBox="0 0 320 120"
          className="mt-5 w-full"
          role="img"
          aria-label="Revenue trending upward over the last 30 days"
        >
          <defs>
            <linearGradient
              id="revenueFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#7129b0"
                stopOpacity="0.5"
              />

              <stop
                offset="100%"
                stopColor="#7129b0"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <motion.polyline
            fill="none"
            stroke="#7129b0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,90 40,78 80,82 120,58 160,64 200,40 240,46 280,20 320,26"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              delay: 0.4,
            }}
          />

          <polygon
            points="0,90 40,78 80,82 120,58 160,64 200,40 240,46 280,20 320,26 320,120 0,120"
            fill="url(#revenueFill)"
          />
        </svg>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            {
              label: 'Clicks',
              value: '48.2k',
            },
            {
              label: 'Conversions',
              value: '2,140',
            },
            {
              label: 'Commission',
              value: '$61,400',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[8px] bg-white/5 p-3"
            >
              <p className="font-mono text-[11px] text-paper/50">
                {stat.label}
              </p>

              <p className="mt-1 font-display text-lg text-paper">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* New conversion notification */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.9,
        }}
        className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-card border border-neutral-200 bg-white px-4 py-3 shadow-[0_16px_32px_-16px_rgba(15,28,26,0.35)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7129b0]/10 text-[#7129b0]">
          ✓
        </span>

        <div>
          <p className="text-xs text-neutral-500">
            New conversion
          </p>

          <p className="font-display text-sm text-ink-text">
            +$84.00 commission
          </p>
        </div>
      </motion.div>
    </div>
  );
}