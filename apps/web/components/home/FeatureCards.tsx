import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type FeatureCardData = {
  key: string;
  heading: string;
  description: string;
  cta: string;
  href: string;
  gradient: string;
  icon: string;
};

/* ---------------------------------------------------------------------- */
/* 3D-style illustrations — built as glossy gradient SVGs (no raster       */
/* assets), so every card shares the same lighting/material language.      */
/* Orange accents are swapped for sky blue to match the Arclane palette.   */
/* ---------------------------------------------------------------------- */

function BriefcaseIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="h-[150px] w-[150px]" aria-hidden>
      <defs>
        <linearGradient id="briefcaseBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7129b0" />
        </linearGradient>
        <linearGradient id="briefcaseLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#3B0764" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#softShadow)">
        <rect x="24" y="66" width="112" height="76" rx="14" fill="url(#briefcaseBody)" />
        <rect x="24" y="66" width="112" height="26" rx="10" fill="url(#briefcaseLid)" opacity="0.9" />
        <rect x="64" y="48" width="32" height="26" rx="8" fill="none" stroke="#F5E8FF" strokeWidth="6" />
        <rect x="70" y="98" width="20" height="10" rx="4" fill="#38BDF8" />
        <ellipse cx="52" cy="80" rx="10" ry="5" fill="#FFFFFF" opacity="0.35" />
      </g>
    </svg>
  );
}

function PhoneAnalyticsIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="h-[150px] w-[150px]" aria-hidden>
      <defs>
        <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
        <linearGradient id="phoneScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F1C1A" />
          <stop offset="100%" stopColor="#16241F" />
        </linearGradient>
        <filter id="softShadow2" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#3B0764" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#softShadow2)">
        <rect x="46" y="20" width="68" height="122" rx="16" fill="url(#phoneBody)" />
        <rect x="52" y="30" width="56" height="90" rx="8" fill="url(#phoneScreen)" />
        <rect x="60" y="88" width="8" height="24" rx="2" fill="#38BDF8" />
        <rect x="72" y="76" width="8" height="36" rx="2" fill="#7DD3FC" />
        <rect x="84" y="64" width="8" height="48" rx="2" fill="#38BDF8" />
        <circle cx="80" cy="130" r="4" fill="#E9D5FF" />
        <ellipse cx="94" cy="40" rx="18" ry="6" fill="#FFFFFF" opacity="0.15" />
      </g>

      <circle cx="128" cy="34" r="14" fill="#38BDF8" opacity="0.9" />
      <path d="M122 34 L127 39 L136 28" stroke="#0F1C1A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashboardIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="h-[150px] w-[150px]" aria-hidden>
      <defs>
        <linearGradient id="dashPanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <filter id="softShadow3" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#3B0764" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#softShadow3)">
        <rect x="28" y="46" width="104" height="80" rx="14" fill="url(#dashPanel)" />
        <rect x="42" y="90" width="14" height="24" rx="4" fill="#7129b0" />
        <rect x="62" y="76" width="14" height="38" rx="4" fill="#6B21A8" />
        <rect x="82" y="62" width="14" height="52" rx="4" fill="#7129b0" />
        <rect x="102" y="82" width="14" height="32" rx="4" fill="#6B21A8" />
      </g>

      <circle cx="120" cy="40" r="13" fill="#38BDF8" opacity="0.95" />
      <circle cx="34" cy="34" r="8" fill="#7DD3FC" opacity="0.9" />
      <circle cx="46" cy="128" r="6" fill="#38BDF8" opacity="0.6" />
    </svg>
  );
}

function ShoppingBagIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="h-[150px] w-[150px]" aria-hidden>
      <defs>
        <linearGradient id="bagBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7129b0" />
        </linearGradient>
        <filter id="softShadow4" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#3B0764" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#softShadow4)">
        <path d="M40 62 H120 L112 138 H48 Z" fill="url(#bagBody)" />
        <path
          d="M58 62 V46 a22 22 0 0 1 44 0 V62"
          fill="none"
          stroke="#E9D5FF"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="70" y="86" width="20" height="20" rx="5" fill="#38BDF8" />
        <ellipse cx="58" cy="76" rx="8" ry="4" fill="#FFFFFF" opacity="0.3" />
      </g>

      <path d="M126 34 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#7DD3FC" />
      <path d="M32 100 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#38BDF8" opacity="0.8" />
    </svg>
  );
}

const cards: FeatureCardData[] = [
  {
    key: 'advertisers',
    heading: 'Advertisers',
    description: "Turn partnerships into profit, whether you're a new brand or scaling fast.",
    cta: 'Start growing',
    href: '/register/advertiser',
    gradient: 'linear-gradient(155deg, #A855F7 0%, #7129b0 55%, #4A1877 100%)',
    icon: 'https://res.cloudinary.com/dkbz23qyt/image/upload/v1789326466/Gemini_Generated_Image_ca7cplca7cplca7c_v4s8zr.png',
  },
  {
    key: 'publishers',
    heading: 'Publishers',
    description: 'Turn your audience into revenue with trusted brand partnerships.',
    cta: 'Start earning',
    href: '/register/publisher',
    gradient: 'linear-gradient(155deg, #C084FC 0%, #6B21A8 55%, #3B0764 100%)',
    icon: 'https://res.cloudinary.com/dkbz23qyt/image/upload/v1789326461/Gemini_Generated_Image_qo69wqo69wqo69wq_ohxrwo.png',
  },
  {
    key: 'agencies',
    heading: 'Agencies',
    description: 'Manage powerful partnerships and grow campaigns at scale.',
    cta: 'Explore solutions',
    href: '/solutions',
    gradient: 'linear-gradient(155deg, #A855F7 0%, #7129b0 55%, #4A1877 100%)',
    icon: 'https://res.cloudinary.com/dkbz23qyt/image/upload/v1789326462/Gemini_Generated_Image_np53zanp53zanp53_epw4s1.png',
  },
  {
    key: 'brands',
    heading: 'Brands',
    description: 'Build meaningful partnerships that drive measurable growth.',
    cta: 'Grow your brand',
    href: '/advertisers',
    gradient: 'linear-gradient(155deg, #C084FC 0%, #6B21A8 55%, #3B0764 100%)',
    icon: 'https://res.cloudinary.com/dkbz23qyt/image/upload/v1789326466/Gemini_Generated_Image_i66xpgi66xpgi66x_mdkshl.png',
  },
];

function FeatureCard({ heading, description, cta, href, gradient, icon }: FeatureCardData) {
  return (
    <div
      className="group relative h-[260px] w-[240px] overflow-visible rounded-[22px] p-6 shadow-[0_20px_40px_-22px_rgba(59,7,100,0.55)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-18px_rgba(59,7,100,0.65)]"
      style={{ background: gradient }}
    >
      <div className="relative z-10 max-w-[140px]">
        <h3 className="font-display text-2xl leading-tight text-white">{heading}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-white/80">{description}</p>
        <Link
          href={href}
          className="mt-4 inline-block text-[13px] font-medium text-gold-soft hover:text-gold-real  transition-text duration-200"
        >
          {cta}
        </Link>
      </div>

      <div className="pointer-events-none absolute -bottom-4 z-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-2">
        <Image
          src={icon}
          alt=""
          width={350}
          height={350}
          className="relative left-[55px]"
          aria-hidden
          unoptimized
        />
      </div>
    </div>
  );
}

export function FeatureCardsGrid() {
  return (
    <>
      {cards.map(({ key, ...card }) => (
        <FeatureCard key={key} {...card} />
      ))}
    </>
  );
}

export { FeatureCard };
