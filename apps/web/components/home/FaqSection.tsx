'use client';

import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Faqs } from './Faqs';

export function FaqSection() {
  return (
    <section className="pb-24">
      <Container className="max-w-3xl">
        <SectionHeading
          align="center"
          title="Frequently asked questions"
          supporting="Everything you need to know before you get started."
        />

        <div className="mt-12">
          <Faqs />
        </div>
      </Container>
    </section>
  );
}
