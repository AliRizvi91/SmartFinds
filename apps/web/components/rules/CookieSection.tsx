import Link from "next/link";

const cookieSections = [
  {
    number: "1",
    title: "What Are Cookies?",
    text: "Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, understand usage, and provide a better experience.",
  },
  {
    number: "2",
    title: "How We Use Cookies",
    text: "SmartFinds may use cookies and similar technologies to keep users signed in, remember preferences, understand website traffic, improve our Services, and support affiliate tracking and attribution.",
  },
  {
    number: "3",
    title: "Types of Cookies",
    items: [
      "Essential cookies — required for basic website functionality and security.",
      "Preference cookies — remember settings and preferences.",
      "Analytics cookies — help us understand how visitors use our website.",
      "Affiliate cookies — help track referrals, clicks, conversions, and campaign attribution.",
    ],
  },
  {
    number: "4",
    title: "Third-Party Cookies",
    text: "Some third-party services used by SmartFinds may place cookies or similar technologies on your device. These providers may use their own cookies according to their respective privacy policies.",
  },
  {
    number: "5",
    title: "Managing Cookies",
    text: "You can control or delete cookies through your browser settings. Disabling certain cookies may affect some features or functionality of the SmartFinds Services.",
  },
  {
    number: "6",
    title: "Changes to This Policy",
    text: "We may update this Cookie Policy when our Services, technologies, or legal requirements change. Any updated version will be posted on this page with a revised effective date.",
  },
  {
    number: "7",
    title: "Contact Us",
    text: "If you have questions about our use of cookies or this Cookie Policy, please contact SmartFinds through the official contact channel provided on our website.",
  },
];

export default function CookiePolicyPage() {
  const lastUpdated = "September 14, 2026";

  return (
    <main className="min-h-screen text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border-b border-slate-200 bg-gradient-to-br from-violet-950 via-purple-900 to-sky-900 md:rounded-3xl">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-purple-100 backdrop-blur-sm">
            Legal · SmartFinds
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Legal
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100">
            Learn how SmartFinds uses cookies and similar technologies to
            improve your experience and support affiliate tracking.
          </p>

          <p className="mt-8 text-sm text-purple-200">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto py-2 md:py-16 relative max-w-5xl px-6 lg:px-8">
        {/* Intro */}
        <div className="mb-12 rounded-2xl border border-violet-100 bg-violet-50/60 p-6 sm:p-8">
          <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            SmartFinds uses cookies and similar technologies to operate our
            website, understand usage, remember preferences, and support our
            affiliate-marketing services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {cookieSections.map((section) => (
            <section
              key={section.number}
              className="border-b border-slate-200 pb-10 last:border-b-0"
            >
              <div className="flex gap-5">
                {/* Number */}
                <div className="hidden shrink-0 sm:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                    {section.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                    <span className="mr-2 text-violet-600 sm:hidden">
                      {section.number}.
                    </span>
                    {section.title}
                  </h2>

                  {section.text && (
                    <p className="text-base leading-7 text-slate-600">
                      {section.text}
                    </p>
                  )}

                  {section.items && (
                    <ul className="mt-4 space-y-3">
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
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm leading-6 text-amber-900">
            <strong>Important:</strong> Cookie requirements can vary depending
            on where your users are located. Review this policy and your cookie
            consent setup for the laws applicable to your business.
          </p>
        </div>

        {/* Back */}
        <div className="mt-10 border-t border-slate-200 pt-8">
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
