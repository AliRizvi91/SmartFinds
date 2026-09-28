'use client';

import { motion } from 'framer-motion';
import { HiOutlineLink, HiOutlineChartBar, HiOutlineLightBulb, HiOutlineArrowTrendingUp } from 'react-icons/hi2';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const items = [
  {
    icon: HiOutlineLink,
    title: 'Smart connections',
    description: 'Connect advertisers with relevant, vetted publishers.',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Transparent tracking',
    description: 'Track clicks, conversions, and performance with clarity.',
  },
  {
    icon: HiOutlineLightBulb,
    title: 'Performance insights',
    description: 'Turn campaign data into meaningful business decisions.',
  },
  {
    icon: HiOutlineArrowTrendingUp,
    title: 'Sustainable growth',
    description: 'Help both sides build long-term, valuable partnerships.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
};

export function WhatWeDo() {
  return (
    <section className="bg-white py-24 flex items-center">
      <Container>
        <div className="flex justify-center items-center w-full  text-center">
          <SectionHeading
            title="What we do"
            supporting="Four pieces of infrastructure that make partnerships easy to run and easy to trust."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="rounded-card border border-neutral-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_36px_-24px_rgba(113,41,176,0.45)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10 text-purple">
                  <Icon size={19} />
                </span>
                <p className="mt-4 font-display text-lg text-ink-text">{item.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
                  {item.description}
                </p>
                <span className="mt-4 block h-px w-8 bg-sky/60 transition-all duration-300 group-hover:w-12" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
