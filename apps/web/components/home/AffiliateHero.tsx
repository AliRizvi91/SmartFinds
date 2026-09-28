'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '../ui/Container';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AffiliateHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate h-screen overflow-hidden bg-[#05020d] text-white  flex flex-col justify-center items-center">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.45, 0.65, 0.45],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-[5%] top-[10%] h-[420px] w-[420px] rounded-full bg-purple/30 blur-[130px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 100, -40, 0],
                  y: [0, -50, 60, 0],
                  scale: [1, 1.15, 0.95, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-[-8%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#3B0764]/70 blur-[120px]"
        />

        {/* =====================================================
            MOVING PURPLE RIBBONS
        ====================================================== */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ['-8%', '4%', '-8%'],
                  y: ['-3%', '5%', '-3%'],
                  rotate: [-8, -3, -8],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-[12%] -top-[22%] h-[500px] w-[125%] rotate-[-8deg]"
        >
          <div className="absolute inset-0 rounded-[45%] border-[3px] border-purple/35 blur-[1px]" />
          <div className="absolute inset-[35px] rounded-[45%] border-[2px] border-purple-light/25" />
          <div className="absolute inset-[70px] rounded-[45%] border border-purple-soft/20" />
        </motion.div>

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ['4%', '-5%', '4%'],
                  rotate: [-12, -7, -12],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-[25%] top-[-5%] h-[500px] w-[125%] rotate-[-12deg]"
        >
          <div className="absolute inset-0 rounded-[45%] border-[2px] border-[#7C3AED]/30" />
          <div className="absolute inset-[45px] rounded-[45%] border border-purple-light/20" />
        </motion.div>

        {/* =====================================================
            FLOATING LIGHTS
        ====================================================== */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 80, 0],
                  y: [0, -50, 0],
                  opacity: [0.2, 0.7, 0.2],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-[20%] top-[35%] h-2 w-2 rounded-full bg-purple-light shadow-[0_0_30px_10px_rgba(168,85,247,0.5)]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -70, 0],
                  y: [0, 40, 0],
                  opacity: [0.2, 0.8, 0.2],
                }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-[20%] top-[45%] h-1.5 w-1.5 rounded-full bg-purple-soft shadow-[0_0_25px_8px_rgba(192,132,252,0.45)]"
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05020d] to-transparent" />

        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#05020d_100%)] opacity-70" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <Container>
        <div className="w-full flex flex-col justify-center items-center">
          {/* Small label */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-7 flex sm:flex-row flex-col justify-center items-center gap-3"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-gold-real ring-1 ring-purple/30">
              <span className="text-xl">✦</span>
            </span>

            <span className="md:text-[13px] text-[10px]  font-medium tracking-[0.18em] text-white/55 uppercase">
              Performance Affiliate Platform
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.12 }}
            className="max-w-5xl font-display text-[52px] leading-[0.95] tracking-[-0.035em] sm:text-7xl md:text-8xl lg:text-[108px]"
          >
            <span className="block font-thin text-white">
              <span className="mr-3 text-purple-light sm:mr-5">
                ✦
              </span>
              Affiliate   
            </span>

            <span className="mt-2 italic text-purple-light sm:mt-3">
              Marketing
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.25 }}
            className="mt-8 flex max-w-2xl flex-col gap-6 sm:mt-10 items-center"
          >
            <p className="w-full text-center leading-7 text-white/55 sm:text-lg">
              Connect brands with high-performing publishers, grow your
              audience, and turn every meaningful click into measurable
              results.
            </p>

            {/* CTA */}
            <Link href="/register">
              <motion.span
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 40px rgba(113,41,176,0.35)',
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full border border-purple/40 bg-purple/15 px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition-colors hover:bg-purple/25"
              >
                Get Started

                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: [0, 4, 0],
                        }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#351052]"
                >
                  ↗
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>

          {/* =====================================================
              BOTTOM STATS
          ====================================================== */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="mt-16 flex justify-center items-center flex-wrap gap-x-10 gap-y-6 sm:mt-20"
          >
            <div className='flex flex-col justify-center items-center'>
              <div className="font-display text-2xl text-white sm:text-3xl">
                10K+
              </div>
              <div className="mt-1 text-xs tracking-wide text-white/35">
                Publishers
              </div>
            </div>

            <div className="hidden h-12 w-px bg-white/10 sm:block" />

            <div className='flex flex-col justify-center items-center'>
              <div className="font-display text-2xl text-white sm:text-3xl">
                2.5K+
              </div>
              <div className="mt-1 text-xs tracking-wide text-white/35">
                Brands
              </div>
            </div>

            <div className="hidden h-12 w-px bg-white/10 sm:block" />

            <div className='flex flex-col justify-center items-center'>
              <div className="font-display text-2xl text-white sm:text-3xl">
                $50M+
              </div>
              <div className="mt-1 text-xs tracking-wide text-white/35">
                Revenue Generated
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}