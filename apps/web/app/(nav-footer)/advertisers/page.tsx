import AdvertiserHero from '@/components/advertisers/AdvertiserHero';
import AdvertiserBenefits from '@/components/advertisers/AdvertiserBenefits';
import AdvertiserHowItWorks from '@/components/advertisers/AdvertiserHowItWorks';
import AdvertiserProgramPreview from '@/components/advertisers/AdvertiserProgramPreview';
import AdvertiserResults from '@/components/advertisers/AdvertiserResults';
import AdvertiserIndustries from '@/components/advertisers/AdvertiserIndustries';
import AdvertiserFAQ from '@/components/advertisers/AdvertiserFAQ';
import AdvertiserCTA from '@/components/advertisers/AdvertiserCTA';

export const metadata = {
  title: 'Advertisers | SmartFinds',
  description:
    'Grow your business through measurable affiliate partnerships with SmartFinds.',
};

export default function AdvertisersPage() {
  return (
    <main>
      <AdvertiserHero />
      <AdvertiserBenefits />
      <AdvertiserHowItWorks />
      <AdvertiserProgramPreview />
      <AdvertiserResults />
      <AdvertiserIndustries />
      <AdvertiserFAQ />
      <AdvertiserCTA />
    </main>
  );
}