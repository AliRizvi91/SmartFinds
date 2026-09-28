'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Check,
  MousePointerClick,
  Sparkles,
  TrendingUp,
  WalletCards,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

const stats = [
  {
    label: 'Clicks',
    value: '42.8K',
    icon: MousePointerClick,
  },
  {
    label: 'Conversions',
    value: '1,284',
    icon: TrendingUp,
  },
  {
    label: 'EPC',
    value: '$3.82',
    icon: BarChart3,
  },
];

export default function PublisherHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden flex justify-center items-center h-screen bg-paper">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Main glow */}
        <div className="absolute left-[42%] top-[-180px] h-[620px] w-[620px] rounded-full bg-purple/10 blur-[140px]" />

        {/* Secondary glow */}
        <div className="absolute right-[-180px] top-[35%] h-[420px] w-[420pxfooter] rounded-full bg-sky/10 blur-[130px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,28,26,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,28,26,.8) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid min-h-[760px] items-center gap-16 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:py-28">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            {/* Eyebrow */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple/15 bg-white/70 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-purple shadow-sm backdrop-blur-xl"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple/10">
                <Sparkles size={11} />
              </span>

              Publisher network
            </motion.div>

            {/* Heading */}
            <h1 className="max-w-3xl font-display text-[3.5rem] leading-[0.94] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[5.5rem]">
              Turn your
              <br />
              audience
              <br />
              <span className="relative inline-block text-purple">
                into revenue
                <motion.span
                  initial={
                    reducedMotion
                      ? false
                      : { scaleX: 0, transformOrigin: 'left' }
                  }
                  animate={
                    reducedMotion
                      ? undefined
                      : { scaleX: 1 }
                  }
                  transition={{
                    delay: 0.8,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-purple/30"
                />
              </span>
              <span className="text-ink">.</span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-base leading-7 text-ink/55 sm:text-lg sm:leading-8">
              Apni audience ko monetize karna jitna simple ho sakta hai.
              Discover trusted programs, share products you believe in,
              and turn every meaningful recommendation into measurable
              earnings.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register/publisher"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(15,28,26,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-purple hover:shadow-[0_16px_35px_rgba(113,41,176,0.25)]"
              >
                <span className="relative z-10">
                  Start earning
                </span>

                <ArrowUpRight
                  size={17}
                  className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>

              <Link
                href="#programs"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-6 py-3.5 text-sm font-medium text-ink backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-purple/20 hover:bg-white hover:text-purple"
              >
                Explore programs

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {[
                'No minimum audience',
                'Real-time tracking',
                'Reliable payouts',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-ink/45"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple/10 text-purple">
                    <Check size={10} strokeWidth={3} />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 50,
                    scale: 0.96,
                  }
            }
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Glow behind dashboard */}
            <div className="absolute -inset-10 rounded-[50px] bg-purple/10 blur-[70px]" />

            {/* Decorative orbit */}
            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : { rotate: 360 }
              }
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-purple/10"
            />

            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : { rotate: -360 }
              }
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full border border-sky/10"
            />

            {/* Dashboard */}
            <div className="relative rounded-[28px] border border-white/80 bg-white/80 p-2 shadow-[0_40px_100px_rgba(15,28,26,0.14)] backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white">
                {/* Browser header */}
                <div className="flex h-12 items-center justify-between border-b border-ink/[0.07] px-5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-ink/10" />
                    <span className="h-2 w-2 rounded-full bg-ink/10" />
                    <span className="h-2 w-2 rounded-full bg-ink/10" />
                  </div>

                  <div className="rounded-full border border-ink/5 bg-paper px-3 py-1">
                    <span className="font-mono text-[9px] text-ink/35">
                      app.smartfinds.com
                    </span>
                  </div>

                  <div className="w-12" />
                </div>

                {/* Dashboard */}
                <div className="p-5 sm:p-7">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/35">
                        Total earnings
                      </p>

                      <div className="mt-2 flex items-end gap-3">
                        <p className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                          $8,426.40
                        </p>

                        <span className="mb-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600">
                          +24.8%
                        </span>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple">
                      <WalletCards size={20} />
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="relative mt-8 h-48 overflow-hidden rounded-2xl border border-ink/[0.05] bg-paper">
                    {/* Chart header */}
                    <div className="absolute left-4 right-4 top-4 z-10 flex justify-between">
                      <span className="text-[10px] text-ink/35">
                        Earnings overview
                      </span>

                      <span className="rounded-full bg-white px-2 py-1 text-[9px] text-ink/40 shadow-sm">
                        Last 30 days
                      </span>
                    </div>

                    {/* Grid */}
                    <div className="absolute inset-x-4 top-[35%] border-t border-dashed border-ink/[0.07]" />
                    <div className="absolute inset-x-4 top-[55%] border-t border-dashed border-ink/[0.07]" />
                    <div className="absolute inset-x-4 top-[75%] border-t border-dashed border-ink/[0.07]" />

                    <svg
                      viewBox="0 0 600 180"
                      className="absolute inset-x-3 bottom-2 h-[75%] w-[calc(100%-24px)]"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="premiumPublisherChart"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#7129b0"
                            stopOpacity="0.22"
                          />
                          <stop
                            offset="100%"
                            stopColor="#7129b0"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0 150 C45 145 65 132 105 137 C150 143 175 105 215 116 C255 127 275 75 315 89 C350 101 375 62 415 70 C455 79 480 38 520 49 C550 57 575 30 600 25 L600 180 L0 180 Z"
                        fill="url(#premiumPublisherChart)"
                      />

                      <motion.path
                        d="M0 150 C45 145 65 132 105 137 C150 143 175 105 215 116 C255 127 275 75 315 89 C350 101 375 62 415 70 C455 79 480 38 520 49 C550 57 575 30 600 25"
                        fill="none"
                        stroke="#7129b0"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={
                          reducedMotion
                            ? false
                            : {
                                pathLength: 0,
                              }
                        }
                        animate={
                          reducedMotion
                            ? undefined
                            : {
                                pathLength: 1,
                              }
                        }
                        transition={{
                          delay: 0.8,
                          duration: 1.8,
                          ease: 'easeOut',
                        }}
                      />

                      <circle
                        cx="600"
                        cy="25"
                        r="5"
                        fill="#7129b0"
                      />

                      <circle
                        cx="600"
                        cy="25"
                        r="10"
                        fill="#7129b0"
                        opacity=".12"
                      />
                    </svg>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;

                      return (
                        <motion.div
                          key={stat.label}
                          initial={
                            reducedMotion
                              ? false
                              : { opacity: 0, y: 10 }
                          }
                          animate={
                            reducedMotion
                              ? undefined
                              : { opacity: 1, y: 0 }
                          }
                          transition={{
                            delay: 1 + index * 0.1,
                          }}
                          className="rounded-xl border border-ink/[0.06] bg-paper p-3"
                        >
                          <Icon
                            size={14}
                            className="text-purple"
                          />

                          <p className="mt-3 text-[10px] text-ink/35">
                            {stat.label}
                          </p>

                          <p className="mt-0.5 text-sm font-semibold text-ink">
                            {stat.value}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FLOATING EARNING CARD
            ================================================= */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: [0, -7, 0],
                    }
              }
              transition={{
                opacity: {
                  delay: 1,
                  duration: 0.6,
                },
                y: {
                  delay: 1,
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="absolute -bottom-7 -left-5 rounded-2xl border border-white bg-white/95 p-3.5 shadow-[0_20px_50px_rgba(15,28,26,0.14)] backdrop-blur-xl sm:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-ink/35">
                    Monthly growth
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-ink">
                    +24.8%
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating conversion card */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: 20 }
              }
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: [0, 5, 0],
                    }
              }
              transition={{
                opacity: {
                  delay: 1.2,
                  duration: 0.6,
                },
                x: {
                  delay: 1.2,
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="absolute -right-4 top-[28%] hidden rounded-2xl border border-white bg-white/95 p-3 shadow-[0_20px_50px_rgba(15,28,26,0.12)] backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple/10 p-2.5 text-purple">
                  <MousePointerClick size={16} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-ink/35">
                    Conversion
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-ink">
                    +18.6%
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
    </section>
  );
}
