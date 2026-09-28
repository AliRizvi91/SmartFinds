
import { PartnersHero } from '@/components/partners/PartnersHero';
import { PartnerCategories } from '@/components/partners/PartnerCategories';
import { PartnerBenefits } from '@/components/partners/PartnerBenefits';
import { FeaturedPartners } from '@/components/partners/FeaturedPartners';
import { PartnershipProcess } from '@/components/partners/PartnershipProcess';
import  PartnersCTA  from '@/components/partners/PartnersCTA';
// import { PartnerTier } from '@/components/partners/PartnerTier';
// import { PartnerCaseStudy } from '@/components/partners/PartnerCaseStudy';
// import { PartnerFAQ } from '@/components/partners/PartnerFAQ';

export const metadata = {
  title: 'Partners | SmartFinds',
  description:
    'Build, integrate, and grow with SmartFinds through our partner ecosystem.',
};

export default function PartnersPage() {
  return (
    <>

      <main className="overflow-hidden bg-white">
        <PartnersHero />
        <PartnerCategories />
        <PartnerBenefits />
        <FeaturedPartners />
        <PartnershipProcess />
        <PartnersCTA />
        {/* <PartnerTier />
        <PartnerCaseStudy />
        <PartnerFAQ /> */}
      </main>

    </>
  );
}