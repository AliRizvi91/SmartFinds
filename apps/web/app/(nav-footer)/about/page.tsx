import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { MissionSection } from '@/components/about/MissionSection';
import { WhatWeDo } from '@/components/about/WhatWeDo';
import { EcosystemSection } from '@/components/about/EcosystemSection';
import { WhyArclane } from '@/components/about/WhyArclane';
import { ValuesSection } from '@/components/about/ValuesSection';
import { StatsSection } from '@/components/about/StatsSection';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata = {
  title: 'About Arclane',
  description:
    "Arclane connects advertisers and publishers through transparent partnerships, intelligent tracking, and performance-driven growth.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <WhoWeAre />
        <MissionSection />
        <WhatWeDo />
        <EcosystemSection />
        <WhyArclane />
        <ValuesSection />
        <StatsSection />
        <AboutCTA />
      </main>
    </>
  );
}
