import { Hero } from '@/components/home/Hero';
import { TrustedByMarquee } from '@/components/home/TrustedByMarquee';
import { PersonaSection } from '@/components/home/PersonaSection';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import AffiliateHero from '@/components/home/AffiliateHero';

export default function HomePage() {
  const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'SmartFinds',
      url: 'https://smartfinds.com',
      logo: 'https://smartfinds.com/logo.png',
      description:
        'SmartFinds connects advertisers and publishers with tracked links, transparent commissions, and real-time performance reporting.',
    },
    {
      '@type': 'WebSite',
      name: 'SmartFinds',
      url: 'https://smartfinds.com',
    },
  ],
};
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Soft background lights */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[80px]" />
        <div className="absolute right-[-180px] top-[25%] h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[90px]" />
        <div className="absolute bottom-[-250px] right-[15%] h-[350px] w-[350px] rounded-full bg-sky-600/20 blur-[90px]" />
      </div>

      <div className="relative z-10">
        <main className="relative h-full space-y-20 pt-[7vh] md:top-0 pb-10 md:space-y-32 md:pt-0">
          <AffiliateHero/>
          <TrustedByMarquee />
          <PersonaSection />
          <Hero />
          <FaqSection />
          <FinalCTA />
        </main>
      </div>
    </div>
  );
}
