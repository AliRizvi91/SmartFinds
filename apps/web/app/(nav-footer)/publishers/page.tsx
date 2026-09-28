import PublisherHero from '@/components/publishers/PublisherHero';
import PublisherBenefits from '@/components/publishers/PublisherBenefits';
import PublisherHowItWorks from '@/components/publishers/PublisherHowItWorks';
import PublisherPrograms from '@/components/publishers/PublisherPrograms';
import PublisherEarnings from '@/components/publishers/PublisherEarnings';
import PublisherFAQ from '@/components/publishers/PublisherFAQ';
import PublisherCTA from '@/components/publishers/PublisherCTA';

export const metadata = {
  title: 'Publishers | Turn your audience into revenue',
  description:
    'Join SmartFinds as a publisher, discover trusted programs, and turn your audience into revenue.',
};

export default function PublishersPage() {
  return (
    <main>
      <PublisherHero />

      <PublisherBenefits />

      <PublisherHowItWorks />

      <PublisherPrograms />

      <PublisherEarnings />

      <PublisherFAQ />

      <PublisherCTA />
    </main>
  );
}