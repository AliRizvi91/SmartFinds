'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut' as const,
      delay,
    },
  }),
};

function EcosystemVisual() {
  const reduceMotion = useReducedMotion();

  /**
   * IMPORTANT:
   * Everything is kept inside the 360 x 300 visual boundary.
   * SVG viewBox is 0 0 360 260.
   *
   * The outer container has overflow-hidden so nothing can
   * visually escape its boundaries.
   */

  const nodes = [
    {
      key: 'advertiser',
      label: 'Advertiser',
      x: 54,
      y: 52,
      type: 'outer',
    },
    {
      key: 'publisher',
      label: 'Publisher',
      x: 54,
      y: 182,
      type: 'outer',
    },
    {
      key: 'arclane',
      label: 'Arclane',
      x: 180,
      y: 117,
      type: 'center',
    },
    {
      key: 'customers',
      label: 'Customers',
      x: 306,
      y: 117,
      type: 'outer',
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-8 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(113,41,176,0.16) 0%, rgba(56,189,248,0.10) 45%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Visual Card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#7129b0 1px, transparent 1px), linear-gradient(90deg, #7129b0 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />

        {/* Top label */}
        <div className="relative z-10 mb-3 flex items-center justify-between px-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-600">
              Ecosystem
            </p>

            <p className="mt-1 text-xs text-slate-400">
              One platform. Connected growth.
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-medium text-emerald-700">
              Connected
            </span>
          </div>
        </div>

        {/* SVG boundary */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <svg
            viewBox="0 0 360 260"
            className="block h-auto w-full overflow-hidden"
            role="img"
            aria-label="Advertisers and publishers connect through Arclane to reach customers"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="flowLine"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#7129B0" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              <radialGradient
                id="centerGlow"
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop
                  offset="0%"
                  stopColor="#7129B0"
                  stopOpacity="0.20"
                />
                <stop
                  offset="100%"
                  stopColor="#7129B0"
                  stopOpacity="0"
                />
              </radialGradient>

              <filter
                id="softShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="8"
                  floodColor="#3B0764"
                  floodOpacity="0.12"
                />
              </filter>
            </defs>

            {/* Background glow inside SVG */}
            <circle
              cx="180"
              cy="130"
              r="100"
              fill="url(#centerGlow)"
            />

            {/* Subtle decorative circles */}
            <circle
              cx="180"
              cy="130"
              r="76"
              fill="none"
              stroke="#7129B0"
              strokeWidth="1"
              strokeDasharray="3 7"
              opacity="0.12"
            />

            <circle
              cx="180"
              cy="130"
              r="52"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeDasharray="2 6"
              opacity="0.10"
            />

            {/* Connection paths */}

            {/* Advertiser → Arclane */}
            <motion.path
              d="M80 78 C120 78 135 112 154 124"
              fill="none"
              stroke="url(#flowLine)"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={
                reduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                ease: 'easeOut',
                delay: 0.4,
              }}
            />

            {/* Publisher → Arclane */}
            <motion.path
              d="M80 202 C120 202 135 168 154 145"
              fill="none"
              stroke="url(#flowLine)"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={
                reduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                ease: 'easeOut',
                delay: 0.6,
              }}
            />

            {/* Arclane → Customers */}
            <motion.path
              d="M206 130 C235 130 255 130 280 130"
              fill="none"
              stroke="url(#flowLine)"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={
                reduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                ease: 'easeOut',
                delay: 0.8,
              }}
            />

            {/* Nodes */}
            {nodes.map((node, index) => {
              const isCenter = node.type === 'center';

              return (
                <g key={node.key}>
                  {/* Node glow */}
                  {isCenter && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="43"
                      fill="none"
                      stroke="#7129B0"
                      strokeWidth="1"
                      opacity="0.15"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: reduceMotion ? 1 : [1, 1.08, 1],
                        opacity: reduceMotion
                          ? 0.15
                          : [0.15, 0.28, 0.15],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        transformOrigin: `${node.x}px ${node.y}px`,
                      }}
                    />
                  )}

                  {/* Node */}
                  <motion.g
                    initial={
                      reduceMotion
                        ? {
                          opacity: 1,
                          scale: 1,
                        }
                        : {
                          opacity: 0,
                          scale: 0.75,
                        }
                    }
                    animate={
                      reduceMotion
                        ? {
                          opacity: 1,
                          scale: 1,
                        }
                        : {
                          opacity: 1,
                          scale: 1,
                          y: [0, -3, 0],
                        }
                    }
                    transition={{
                      opacity: {
                        duration: 0.45,
                        delay: 0.3 + index * 0.12,
                      },
                      scale: {
                        duration: 0.45,
                        delay: 0.3 + index * 0.12,
                      },
                      y: {
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.35,
                      },
                    }}
                    style={{
                      transformOrigin: `${node.x}px ${node.y}px`,
                    }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCenter ? 31 : 27}
                      fill={isCenter ? '#7129B0' : '#FFFFFF'}
                      stroke={isCenter ? '#38BDF8' : '#C084FC'}
                      strokeWidth={isCenter ? 2 : 1.5}
                      filter="url(#softShadow)"
                    />

                    {/* Inner ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isCenter ? 25 : 21}
                      fill="none"
                      stroke={isCenter ? '#FFFFFF' : '#7129B0'}
                      strokeWidth="0.8"
                      opacity={isCenter ? 0.2 : 0.12}
                    />

                    {/* Node label */}
                    <text
                      x={node.x}
                      y={node.y + 3}
                      textAnchor="middle"
                      fontSize={isCenter ? '9.5' : '8.5'}
                      fontWeight={isCenter ? '600' : '500'}
                      fill={isCenter ? '#FFFFFF' : '#10201D'}
                      fontFamily="var(--font-plex-sans)"
                    >
                      {node.label}
                    </text>
                  </motion.g>
                </g>
              );
            })}

            {/* Decorative dots */}
            <circle
              cx="24"
              cy="30"
              r="2.5"
              fill="#C9A227"
              opacity="0.8"
            />

            <circle
              cx="336"
              cy="40"
              r="2"
              fill="#38BDF8"
              opacity="0.7"
            />

            <circle
              cx="330"
              cy="220"
              r="2.5"
              fill="#7129B0"
              opacity="0.6"
            />

            <circle
              cx="25"
              cy="232"
              r="2"
              fill="#C9A227"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 mt-3 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-100 bg-slate-50/70 py-3">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">01</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-400">
              Platform
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">03</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-400">
              Connections
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">∞</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-400">
              Possibilities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Main background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(113,41,176,0.22), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary glow */}
      <div
        className="pointer-events-none absolute -right-40 top-40 -z-10 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.20), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16 lg:gap-20">
        {/* Left Content */}
        <div className="relative">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-violet-600" />

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
              The future of partnerships
            </span>
          </motion.div>

          <motion.h1
            custom={0.08}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl font-display text-[2.7rem] leading-[1.06] tracking-tight text-ink-text sm:text-5xl md:text-[3.35rem] lg:text-[3.8rem]"
          >
            We&apos;re building the future of{' '}
            <span className="bg-gradient-to-r from-violet-700 via-purple-600 to-sky-500 bg-clip-text text-transparent">
              affiliate partnerships.
            </span>
          </motion.h1>

          <motion.p
            custom={0.18}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-xl text-[16px] leading-7 text-neutral-500 sm:text-[17px] sm:leading-8"
          >
            Arclane connects advertisers and publishers through transparent
            partnerships, intelligent tracking, and performance-driven growth.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            custom={0.26}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-2"
          >
            {[
              'Transparent tracking',
              'Smart attribution',
              'Performance-driven',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            custom={0.34}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href="/register/publisher" variant="primary">
              Become a publisher
            </Button>

            <Button href="/contact" variant="ghost">
              Partner with us
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            custom={0.42}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex items-center gap-3 text-xs text-neutral-400"
          >
            <div className="flex -space-x-2">
              <span className="h-7 w-7 rounded-full border-2 border-white bg-violet-100" />
              <span className="h-7 w-7 rounded-full border-2 border-white bg-sky-100" />
              <span className="h-7 w-7 rounded-full border-2 border-white bg-amber-100" />
            </div>

            <span>
              Built for advertisers, publishers & growth teams
            </span>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: 'easeOut',
            delay: 0.18,
          }}
          className="relative flex justify-center md:justify-end"
        >
          <EcosystemVisual />
        </motion.div>
      </Container>
    </section>
  );
}
