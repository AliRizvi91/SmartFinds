import Link from "next/link";

const termsSections = [
  {
    number: "1",
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using SmartFinds, you agree to be bound by these Terms of Service and any applicable laws and regulations. If you do not agree with these Terms, you should not access or use our Services.",
      "These Terms apply to all users of the platform, including advertisers, publishers, partners, and visitors.",
    ],
  },
  {
    number: "2",
    title: "About SmartFinds",
    paragraphs: [
      "SmartFinds is an affiliate-marketing platform that helps advertisers and publishers connect, manage partnerships, track referrals, and measure campaign performance.",
      "SmartFinds may provide tracking, reporting, attribution, communication, and other technology services to support affiliate and performance-based marketing activities.",
    ],
  },
  {
    number: "3",
    title: "User Accounts",
    paragraphs: [
      "Certain features may require you to create an account. You are responsible for providing accurate information and keeping your account credentials secure.",
      "You are responsible for all activities performed through your account. You must notify us promptly if you believe your account has been accessed without authorization.",
    ],
  },
  {
    number: "4",
    title: "Advertisers and Publishers",
    paragraphs: [
      "Advertisers are responsible for the accuracy of their offers, campaigns, products, services, commission structures, and promotional requirements.",
      "Publishers are responsible for following applicable campaign rules, advertising requirements, disclosure obligations, and applicable laws when promoting advertiser offers.",
      "SmartFinds does not guarantee that any particular campaign, partnership, conversion, or commission opportunity will be available or successful.",
    ],
  },
  {
    number: "5",
    title: "Affiliate Tracking & Commissions",
    paragraphs: [
      "SmartFinds may use tracking links, cookies, pixels, identifiers, and related technologies to attribute clicks, conversions, and other performance events.",
      "Commission calculations may depend on tracking data received from advertisers, publishers, networks, or integrated third-party systems. Where applicable, commissions may be adjusted or rejected for invalid, fraudulent, duplicated, cancelled, or otherwise ineligible transactions.",
    ],
  },
  {
    number: "6",
    title: "Acceptable Use",
    intro: "You agree not to use the Services to:",
    items: [
      "Engage in fraud, manipulation, or misleading promotional activity.",
      "Generate artificial clicks, impressions, conversions, or other performance events.",
      "Distribute malware, harmful code, or unauthorized software.",
      "Violate applicable laws, regulations, intellectual property rights, or third-party rights.",
      "Attempt to gain unauthorized access to accounts, systems, data, or platform infrastructure.",
      "Interfere with the security, availability, or normal operation of the Services.",
    ],
  },
  {
    number: "7",
    title: "Payments",
    paragraphs: [
      "Where SmartFinds provides payment or commission-related services, payment eligibility, timing, minimum thresholds, adjustments, and applicable fees may depend on the specific program or agreement.",
      "Users are responsible for providing accurate payment and tax information where required. SmartFinds may delay or withhold payments where reasonably necessary to investigate suspected fraud, invalid activity, disputes, or compliance issues.",
    ],
  },
  {
    number: "8",
    title: "Intellectual Property",
    paragraphs: [
      "The SmartFinds platform, including its software, design, branding, content, logos, graphics, and other materials, is owned by or licensed to SmartFinds and is protected by applicable intellectual property laws.",
      "You may not copy, modify, distribute, reverse engineer, sell, or create derivative works from our Services or materials unless you have received appropriate authorization.",
    ],
  },
  {
    number: "9",
    title: "Third-Party Services",
    paragraphs: [
      "SmartFinds may integrate with third-party platforms, advertising networks, payment providers, analytics services, hosting providers, and other external services.",
      "Third-party services may have their own terms, privacy policies, and requirements. SmartFinds is not responsible for the availability, security, or practices of third-party services that are outside our control.",
    ],
  },
  {
    number: "10",
    title: "Suspension & Termination",
    paragraphs: [
      "We may suspend or terminate access to the Services when we reasonably believe that a user has violated these Terms, engaged in fraudulent or harmful activity, created security risks, or otherwise misused the platform.",
      "You may stop using the Services or request account closure subject to any outstanding obligations, transactions, disputes, or applicable retention requirements.",
    ],
  },
  {
    number: "11",
    title: "Disclaimers",
    paragraphs: [
      "The Services are provided on an available basis. While we work to maintain reliable and secure services, we do not guarantee that the platform will always be uninterrupted, error-free, or available.",
      "SmartFinds does not guarantee specific revenue, traffic, conversions, commissions, business results, or performance from using the platform.",
    ],
  },
  {
    number: "12",
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, SmartFinds will not be responsible for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Services.",
      "Nothing in these Terms is intended to exclude or limit liability that cannot legally be excluded or limited under applicable law.",
    ],
  },
  {
    number: "13",
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time to reflect changes to our Services, business practices, technology, or legal requirements.",
      "When material changes are made, we may provide notice through the Services or by other appropriate means. Continued use of the Services after updated Terms become effective means that you accept the revised Terms.",
    ],
  },
  {
    number: "14",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about these Terms of Service, your account, campaigns, partnerships, or other SmartFinds services, please contact us through the official contact channel provided on our website.",
    ],
  },
];

export default function TermsOfServicePage() {
  const lastUpdated = "September 14, 2026";

  return (
    <main className="min-h-screen text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border-b border-slate-200 bg-gradient-to-br from-violet-950 via-purple-900 to-sky-900 md:rounded-3xl">
        {/* Decorative background */}
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-purple-100 backdrop-blur-sm">
            Legal · SmartFinds
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Legal
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight font-display text-white sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100">
            These Terms explain the rules and responsibilities that apply when
            advertisers, publishers, partners, and visitors use SmartFinds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-purple-200">
            <span>Last updated: {lastUpdated}</span>
            <span className="h-1 w-1 rounded-full bg-purple-300" />
            <span>SmartFinds</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto py-2 md:py-16 relative max-w-5xl px-6  lg:px-8">
        {/* Intro Card */}
        <div className="mb-12 rounded-2xl border border-violet-100 bg-violet-50/60 p-6 sm:p-8">
          <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            Welcome to SmartFinds. These Terms of Service govern your access to
            and use of our affiliate-marketing platform, websites,
            applications, and related services.
          </p>
        </div>

        {/* Terms */}
        <div className="space-y-12">
          {termsSections.map((section) => (
            <section
              key={section.number}
              className="relative border-b border-slate-200 pb-12 last:border-b-0"
            >
              <div className="flex gap-5">
                {/* Number */}
                <div className="hidden shrink-0 sm:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                    {section.number}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    <span className="mr-2 text-violet-600 sm:hidden">
                      {section.number}.
                    </span>
                    {section.title}
                  </h2>

                  {section.intro && (
                    <p className="mb-4 text-base leading-7 text-slate-600">
                      {section.intro}
                    </p>
                  )}

                  {section.paragraphs?.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 text-base leading-7 text-slate-600 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.items && (
                    <ul className="mt-5 space-y-3">
                      {section.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-base leading-7 text-slate-600"
                        >
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              !
            </div>

            <div>
              <h3 className="mb-2 text-base font-bold text-amber-950">
                Important Notice
              </h3>

              <p className="text-sm leading-6 text-amber-900/80">
                These Terms are a general template for an affiliate-marketing
                platform. Before publishing them as final legal terms, review
                and customize them for your business structure, jurisdiction,
                contracts, payment arrangements, and applicable laws.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Need more information?
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Visit our website or contact the SmartFinds team.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 hover:shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
