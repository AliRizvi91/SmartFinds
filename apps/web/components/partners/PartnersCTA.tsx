"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Handshake,
  Sparkles,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

export default function PartnersCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28 lg:py-32">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-purple/20 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-sky/10 blur-[120px]"
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-14 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-16 lg:px-20 lg:py-20"
        >
          {/* Inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-purple/20 blur-[90px]"
          />

          {/* Decorative icons */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-light/20 bg-purple/10 text-purple-light"
          >
            <Handshake className="h-7 w-7" />

            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-ink text-gold-real">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </motion.div>

          {/* Eyebrow */}
          <div className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            <Zap className="h-3.5 w-3.5 text-gold-real" />
            SmartFinds Partner Network
          </div>

          {/* Heading */}
          <h2 className="relative mx-auto max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to build with{" "}
            <span className="bg-gradient-to-r from-purple-light via-purple-soft to-sky-light bg-clip-text text-transparent">
              SmartFinds?
            </span>
          </h2>

          {/* Description */}
          <p className="relative mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            Join a partner ecosystem built for meaningful collaboration,
            scalable growth, and long-term opportunities.
          </p>

          {/* CTA */}
          <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/publishers"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-light hover:shadow-purple/30"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#partner-types"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              Explore Partnership Types
            </Link>
          </div>

          {/* Bottom note */}
          <p className="relative mt-7 text-xs text-white/40">
            Built for technology, agency, integration, and referral partners.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}