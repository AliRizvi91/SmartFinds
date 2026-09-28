import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 14, 2026";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-violet-950 via-purple-900 to-sky-900">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Legal
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
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

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">
          <p className="lead text-lg leading-8">
            This Privacy Policy applies to SmartFinds and its websites,
            applications, services, and related affiliate-marketing
            technologies (collectively, the “Services”). By accessing or using
            the Services, you acknowledge the practices described below.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information that you provide directly, information
            generated through your use of the Services, and information
            received from business partners or other lawful sources.
          </p>

          <h3>Information you provide</h3>
          <ul>
            <li>Name, email address, phone number, and account credentials.</li>
            <li>Business, company, publisher, or advertiser information.</li>
            <li>Billing and payment-related information when applicable.</li>
            <li>Communications, support requests, and other information you choose to provide.</li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            When you use our Services, we may collect technical and usage
            information such as IP address, browser type, device information,
            operating system, approximate location, referring URLs, pages
            viewed, timestamps, and interaction data.
          </p>

          <h3>Affiliate and tracking information</h3>
          <p>
            Because SmartFinds operates in the affiliate-marketing ecosystem,
            our Services may process information relating to clicks, referral
            links, campaigns, conversions, transactions, commissions, and
            attribution events. Depending on the integration, this information
            may include identifiers associated with a browser, device,
            campaign, publisher, advertiser, or referral.
          </p>

          <h2>2. How We Use Information</h2>
          <p>We may use information to:</p>
          <ul>
            <li>Create and manage accounts.</li>
            <li>Provide, operate, maintain, and improve our Services.</li>
            <li>Track affiliate referrals, conversions, and campaign performance.</li>
            <li>Calculate and report commissions and other performance metrics.</li>
            <li>Process payments and maintain financial records where applicable.</li>
            <li>Communicate about accounts, services, updates, and support.</li>
            <li>Detect fraud, abuse, security incidents, and unauthorized activity.</li>
            <li>Analyze usage and improve product performance and user experience.</li>
            <li>Meet legal, regulatory, contractual, and security obligations.</li>
          </ul>

          <h2>3. Cookies and Similar Technologies</h2>
          <p>
            We may use cookies, pixels, SDKs, local storage, and similar
            technologies to keep you signed in, remember preferences, measure
            traffic, understand how our Services are used, and support
            affiliate attribution.
          </p>
          <p>
            Third-party services used by SmartFinds may also place or access
            cookies or similar technologies according to their own privacy
            policies. Where required by applicable law, we will request
            consent before using non-essential technologies.
          </p>

          <h2>4. Affiliate Tracking and Attribution</h2>
          <p>
            Affiliate links and tracking technologies may allow us and our
            partners to determine that a user arrived at a website through a
            particular publisher or campaign. This helps advertisers measure
            performance and allows publishers to receive appropriate
            attribution or commissions.
          </p>
          <p>
            Tracking identifiers may be retained for a period reasonably
            necessary to provide attribution, prevent fraud, resolve disputes,
            and maintain accurate reporting, subject to applicable law.
          </p>

          <h2>5. How We Share Information</h2>
          <p>
            We do not sell personal information merely because you use our
            Services. We may share information with trusted parties when
            reasonably necessary to operate the platform or for legitimate
            business and legal purposes.
          </p>
          <ul>
            <li>
              <strong>Advertisers and publishers:</strong> relevant campaign,
              attribution, and performance information.
            </li>
            <li>
              <strong>Service providers:</strong> hosting, analytics, storage,
              communications, payment processing, security, and technical
              infrastructure providers.
            </li>
            <li>
              <strong>Professional advisers:</strong> legal, accounting,
              compliance, and business advisers where appropriate.
            </li>
            <li>
              <strong>Authorities:</strong> when disclosure is required by
              applicable law, legal process, or to protect rights and safety.
            </li>
            <li>
              <strong>Business transfers:</strong> information may be
              transferred as part of a merger, acquisition, financing, sale,
              restructuring, or similar transaction.
            </li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational
            safeguards designed to protect information against unauthorized
            access, alteration, disclosure, or destruction. No internet
            transmission or storage system can be guaranteed to be completely
            secure.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain information for as long as reasonably necessary to
            provide the Services, maintain business and transaction records,
            support affiliate attribution, resolve disputes, prevent fraud,
            comply with legal obligations, and enforce agreements. Retention
            periods may vary depending on the type and purpose of the data.
          </p>

          <h2>8. Your Privacy Rights</h2>
          <p>
            Depending on where you live and the laws that apply to you, you may
            have rights to access, correct, delete, restrict, or obtain a copy
            of certain personal information. You may also have the right to
            object to certain processing or withdraw consent where processing
            is based on consent.
          </p>
          <p>
            To exercise an applicable privacy right, contact us using the
            information in the Contact Us section. We may need to verify your
            identity before completing a request.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            SmartFinds and its service providers may process information in
            countries other than the country where you live. Where required,
            we use appropriate safeguards for international transfers in
            accordance with applicable privacy laws.
          </p>

          <h2>10. Children’s Privacy</h2>
          <p>
            Our Services are intended for business and general audiences and
            are not directed to children where prohibited by applicable law.
            We do not knowingly collect personal information from children in
            circumstances where parental consent is legally required.
          </p>

          <h2>11. Third-Party Websites and Services</h2>
          <p>
            Our Services may contain links to third-party websites,
            integrations, or services. We are not responsible for the privacy
            practices of those third parties. We encourage you to review their
            privacy policies before providing personal information.
          </p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes to our Services, technology, business practices, or legal
            requirements. When we make material changes, we may provide notice
            through the Services or by other appropriate means. The updated
            policy will become effective when posted unless otherwise stated.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or want to submit a
            privacy request, please contact SmartFinds through the official
            contact channel provided on our website.
          </p>

          <div className="not-prose mt-12 rounded-2xl border border-violet-200 bg-violet-50 p-6">
            <p className="text-sm leading-6 text-violet-950">
              <strong>Important:</strong> This page is a general privacy-policy
              template for an affiliate-marketing platform. Before publishing
              it as a final legal policy, replace generic company/contact
              details and have the policy reviewed for the countries and
              privacy laws applicable to your business.
            </p>
          </div>

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
