import Link from "next/link";

const privacySections = [
  {
    number: "1",
    title: "Information We Collect",
    intro:
      "We may collect information that you provide directly, information generated through your use of the Services, and information received from business partners or other lawful sources.",
    subsections: [
      {
        title: "Information you provide",
        items: [
          "Name, email address, phone number, and account credentials.",
          "Business, company, publisher, or advertiser information.",
          "Billing and payment-related information when applicable.",
          "Communications, support requests, and other information you choose to provide.",
        ],
      },
      {
        title: "Information collected automatically",
        paragraphs: [
          "When you use our Services, we may collect technical and usage information such as IP address, browser type, device information, operating system, approximate location, referring URLs, pages viewed, timestamps, and interaction data.",
        ],
      },
      {
        title: "Affiliate and tracking information",
        paragraphs: [
          "Because SmartFinds operates in the affiliate-marketing ecosystem, our Services may process information relating to clicks, referral links, campaigns, conversions, transactions, commissions, and attribution events. Depending on the integration, this information may include identifiers associated with a browser, device, campaign, publisher, advertiser, or referral.",
        ],
      },
    ],
  },

  {
    number: "2",
    title: "How We Use Information",
    intro: "We may use information to:",
    items: [
      "Create and manage accounts.",
      "Provide, operate, maintain, and improve our Services.",
      "Track affiliate referrals, conversions, and campaign performance.",
      "Calculate and report commissions and other performance metrics.",
      "Process payments and maintain financial records where applicable.",
      "Communicate about accounts, services, updates, and support.",
      "Detect fraud, abuse, security incidents, and unauthorized activity.",
      "Analyze usage and improve product performance and user experience.",
      "Meet legal, regulatory, contractual, and security obligations.",
    ],
  },

  {
    number: "3",
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "We may use cookies, pixels, SDKs, local storage, and similar technologies to keep you signed in, remember preferences, measure traffic, understand how our Services are used, and support affiliate attribution.",
      "Third-party services used by SmartFinds may also place or access cookies or similar technologies according to their own privacy policies. Where required by applicable law, we will request consent before using non-essential technologies.",
    ],
  },

  {
    number: "4",
    title: "Affiliate Tracking and Attribution",
    paragraphs: [
      "Affiliate links and tracking technologies may allow us and our partners to determine that a user arrived at a website through a particular publisher or campaign. This helps advertisers measure performance and allows publishers to receive appropriate attribution or commissions.",
      "Tracking identifiers may be retained for a period reasonably necessary to provide attribution, prevent fraud, resolve disputes, and maintain accurate reporting, subject to applicable law.",
    ],
  },

  {
    number: "5",
    title: "How We Share Information",
    intro:
      "We do not sell personal information merely because you use our Services. We may share information with trusted parties when reasonably necessary to operate the platform or for legitimate business and legal purposes.",
    items: [
      {
        label: "Advertisers and publishers:",
        text: "relevant campaign, attribution, and performance information.",
      },
      {
        label: "Service providers:",
        text: "hosting, analytics, storage, communications, payment processing, security, and technical infrastructure providers.",
      },
      {
        label: "Professional advisers:",
        text: "legal, accounting, compliance, and business advisers where appropriate.",
      },
      {
        label: "Authorities:",
        text: "when disclosure is required by applicable law, legal process, or to protect rights and safety.",
      },
      {
        label: "Business transfers:",
        text: "information may be transferred as part of a merger, acquisition, financing, sale, restructuring, or similar transaction.",
      },
    ],
  },

  {
    number: "6",
    title: "Data Security",
    paragraphs: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, alteration, disclosure, or destruction. No internet transmission or storage system can be guaranteed to be completely secure.",
    ],
  },

  {
    number: "7",
    title: "Data Retention",
    paragraphs: [
      "We retain information for as long as reasonably necessary to provide the Services, maintain business and transaction records, support affiliate attribution, resolve disputes, prevent fraud, comply with legal obligations, and enforce agreements. Retention periods may vary depending on the type and purpose of the data.",
    ],
  },

  {
    number: "8",
    title: "Your Privacy Rights",
    paragraphs: [
      "Depending on where you live and the laws that apply to you, you may have rights to access, correct, delete, restrict, or obtain a copy of certain personal information. You may also have the right to object to certain processing or withdraw consent where processing is based on consent.",
      "To exercise an applicable privacy right, contact us using the information in the Contact Us section. We may need to verify your identity before completing a request.",
    ],
  },

  {
    number: "9",
    title: "International Data Transfers",
    paragraphs: [
      "SmartFinds and its service providers may process information in countries other than the country where you live. Where required, we use appropriate safeguards for international transfers in accordance with applicable privacy laws.",
    ],
  },

  {
    number: "10",
    title: "Children’s Privacy",
    paragraphs: [
      "Our Services are intended for business and general audiences and are not directed to children where prohibited by applicable law. We do not knowingly collect personal information from children in circumstances where parental consent is legally required.",
    ],
  },

  {
    number: "11",
    title: "Third-Party Websites and Services",
    paragraphs: [
      "Our Services may contain links to third-party websites, integrations, or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before providing personal information.",
    ],
  },

  {
    number: "12",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes to our Services, technology, business practices, or legal requirements. When we make material changes, we may provide notice through the Services or by other appropriate means. The updated policy will become effective when posted unless otherwise stated.",
    ],
  },

  {
    number: "13",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about this Privacy Policy or want to submit a privacy request, please contact SmartFinds through the official contact channel provided on our website.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 14, 2026";

  return (
    <main className="min-h-screen text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border-b border-slate-200 bg-gradient-to-br from-violet-950 via-purple-900 to-sky-900 md:rounded-3xl">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Legal
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100">
            Your privacy matters to us. This Privacy Policy explains how
            SmartFinds collects, uses, shares, and protects information when
            you use our platform and services.
          </p>

          <p className="mt-8 text-sm text-purple-200">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto  py-2 md:py-16 relative max-w-5xl px-6  lg:px-8">
        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 ">
          {/* Introduction */}
          <p className="lead text-lg leading-8">
            This Privacy Policy applies to SmartFinds and its websites,
            applications, services, and related affiliate-marketing
            technologies (collectively, the “Services”). By accessing or using
            the Services, you acknowledge the practices described below.
          </p>

          {/* Dynamic Sections */}
          {privacySections.map((section) => (
            <section key={section.number} className="mb-10">
              <h2>
                {section.number}. {section.title}
              </h2>

              {/* Intro */}
              {section.intro && <p>{section.intro}</p>}

              {/* Normal paragraphs */}
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {/* Simple string items */}
              {section.items &&
                typeof section.items[0] === "string" && (
                  <ul>
                    {section.items.map((item, index) => (
                      <li key={index}>{item as string}</li>
                    ))}
                  </ul>
                )}

              {/* Label + text items */}
              {section.items &&
                typeof section.items[0] === "object" && (
                  <ul>
                    {section.items.map((item, index) => {
                      const listItem = item as {
                        label: string;
                        text: string;
                      };

                      return (
                        <li key={index}>
                          <strong>{listItem.label}</strong>{" "}
                          {listItem.text}
                        </li>
                      );
                    })}
                  </ul>
                )}

              {/* Subsections */}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title}>
                  <h3>{subsection.title}</h3>

                  {subsection.paragraphs?.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}

                  {subsection.items && (
                    <ul>
                      {subsection.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}

          {/* Important Notice */}
          <div className="not-prose mt-12 rounded-2xl border border-violet-200 bg-violet-50 p-6">
            <p className="text-sm leading-6 text-violet-950">
              <strong>Important:</strong> This page is a general
              privacy-policy template for an affiliate-marketing platform.
              Before publishing it as a final legal policy, replace generic
              company/contact details and have the policy reviewed for the
              countries and privacy laws applicable to your business.
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-10 border-t border-slate-200 pt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}