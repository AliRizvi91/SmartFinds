'use client';

import { Container } from '../ui/Container';
import { FeatureCardsGrid } from './FeatureCards';



export function PersonaSection() {
  return (
    <section className="pb-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple">
            Tell us who you are
          </p>
          <h2 className="mt-4 font-display text-3xl text-ink-text md:text-4xl">
            We build opportunities around your goals
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
            Pick your path and discover what we&apos;ve built specifically for
            your business.
          </p>
        </div>

        <div className="mt-14 relative justify-center place-items-center grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCardsGrid/>
        </div>
      </Container>
    </section>
  );
}
