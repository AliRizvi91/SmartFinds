"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Clock3,
  FileText,
  HelpCircle,
  Mail,
  Search,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { Guide } from "@packages/src/types/guide.types";
import { useGetGuidesQuery } from "@/features/Guide/guidesApi";

const categories = [
  { label: "All Resources", icon: Sparkles },
];


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ResourcesPage() {
const { data } = useGetGuidesQuery();

const resources: Guide[] = data?.data ?? [];

const featuredResource = resources.find(
  (resource) => resource.featured
);

const latestResources = resources.filter(
  (resource) => resource._id !== featuredResource?._id
);

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-280px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple/10 blur-3xl" />

          <div className="absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-gold/10 blur-3xl" />

          <div className="absolute bottom-[-180px] left-[-100px] h-[300px] w-[300px] rounded-full bg-sky/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-content px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-ink/60 shadow-sm backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Resource Library
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-7 font-display text-5xl leading-[0.95] tracking-[-0.035em] text-ink sm:text-6xl lg:text-7xl"
            >
              Resources to{" "}
              <span className="relative inline-block">
                help you grow
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 320 16"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 11.5C82 2 229 2 317 8"
                    stroke="#C9A227"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-base leading-7 text-ink/60 sm:text-lg"
            >
              Practical guides, industry insights, success stories, and
              everything you need to build a smarter affiliate program.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY FILTER
      ========================================================= */}
      <section className="sticky top-0 z-20 border-b border-neutral-200 bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto max-w-content overflow-x-auto px-5 sm:px-8">
          <div className="flex min-w-max items-center gap-1 py-3">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.label}
                  className={`group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${index === 0
                      ? "bg-ink text-white shadow-sm"
                      : "text-ink/55 hover:bg-white hover:text-ink"
                    }`}
                >
                  <Icon
                    className={`h-4 w-4 ${index === 0
                        ? "text-gold"
                        : "text-ink/35 group-hover:text-purple"
                      }`}
                  />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================
          RESOURCE GRID
      ========================================================= */}
      <section className="border-t border-neutral-200 bg-white/45">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
                Explore
              </p>

              <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Latest resources
              </h2>
            </div>

            <span className="hidden text-sm text-ink/40 sm:block">
              24 resources available
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.07,
                },
              },
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {latestResources.map((resource) => {
              const Icon =
                resource.icon === "BookOpen"
                  ? BookOpen
                  : resource.icon === "FileText"
                    ? FileText
                    : resource.icon === "HelpCircle"
                      ? HelpCircle
                      : resource.icon === "Video"
                        ? Video
                        : TrendingUp;

              return (
                <motion.article
                  key={resource._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  className="group flex min-h-[320px] flex-col overflow-hidden rounded-card border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(15,28,26,0.09)]"
                >
                  <div className="relative h-40 overflow-hidden border-b border-neutral-200 bg-paper">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(113,41,176,0.22),transparent_38%),radial-gradient(circle_at_85%_85%,rgba(234,179,8,0.16),transparent_40%),linear-gradient(135deg,#160b24_0%,#24102f_45%,#120d19_100%)]" />

                    <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-purple" />
                    </div>

                    <span className="absolute bottom-5 left-6 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                      {resource.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl leading-snug tracking-tight text-ink transition-colors group-hover:text-purple">
                      {resource.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/55">
                      {resource.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-7">
                      <span className="flex items-center gap-1.5 text-xs text-ink/40">
                        <Clock3 className="h-3.5 w-3.5" />
                        {resource.readTime}
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-ink/40 transition-all group-hover:border-purple/30 group-hover:bg-purple group-hover:text-white">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          NEWSLETTER
      ========================================================= */}
      <section className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[16px] bg-ink px-7 py-12 sm:px-12 lg:px-16 lg:py-14"
        >
          {/* Background */}
          <div className="pointer-events-none absolute right-[-100px] top-[-160px] h-[400px] w-[400px] rounded-full bg-purple/20 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-160px] left-[25%] h-[350px] w-[350px] rounded-full bg-gold/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Mail className="h-5 w-5 text-gold" />
              </div>

              <h2 className="max-w-xl font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
                Get smarter affiliate insights, once a month.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/50">
                No noise. Just practical strategies, industry trends, and
                useful resources delivered to your inbox.
              </p>
            </div>

            <div>
              <form className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <div
                  className="h-13 min-w-0 flex justify-center items-center rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/40 outline-none placeholder:text-white/30 focus:border-gold/50 focus:ring-4 focus:ring-gold/5"
                >--Thanks for Watching--</div>

                <button
                  type="submit"
                  className="flex h-13 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-semibold text-ink transition-all hover:bg-gold-soft"
                >
                  Get monthly insights
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-3 text-[11px] text-white/30">
                By subscribing, you agree to receive occasional emails from
                us. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          SUPPORT STRIP
      ========================================================= */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-content px-5 py-10 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper">
                <HelpCircle className="h-5 w-5 text-purple" />
              </div>

              <div>
                <h3 className="font-display text-xl text-ink">
                  Can't find what you need?
                </h3>

                <p className="mt-1 text-sm text-ink/50">
                  Our support team is here to help you find the right answer.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="/terms"
                className="text-sm font-medium text-ink/60 transition-colors hover:text-purple"
              >
                Help Center
              </a>

              <a
                href="/contact"
                className="group flex items-center gap-2 text-sm font-semibold text-ink"
              >
                Contact us
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}