import Link from 'next/link';
import { Container } from './Container';
import Image from 'next/image';

const columns = [
  {
    heading: 'Platform',
    links: [
      { href: '/advertisers', label: 'For advertisers' },
      { href: '/publishers', label: 'For publishers' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/partners', label: 'Partners' },
      { href: '/resources', label: 'Resources' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
      { href: '/cookie-policy', label: 'Cookie policy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200/70 bg-ink text-paper/80">
      <Container className="grid gap-12 pt-16 pb-3 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div
            className="font-display text-xl text-paper flex justify-start items-center gap-2">
            <Image
              src="https://res.cloudinary.com/dkbz23qyt/image/upload/v1789395841/Logo_e4qjnz.png"
              alt="SmartFinds"
              width={32}
              height={32}
              className="w-8 h-auto"
            />
            SmartFinds
          </div>
          {/* <p className="font-display text-xl text-paper">SmartFinds</p> */}
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
            Partnership infrastructure for advertisers and publishers who track
            performance, not impressions.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="text-sm font-medium text-paper">{col.heading}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-paper/60 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-paper/10 py-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SmartFinds, Inc. All rights reserved.</p>
        <p>SmartFinds is an original brand and is not affiliated with any existing affiliate network.</p>
      </Container>
    </footer>
  );
}
