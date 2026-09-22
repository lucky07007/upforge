// app/privacy/page.tsx
// AdSense-compliant Privacy Policy — includes all required Google advertising disclosures

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | UpForge — Global Startup Registry",
  description:
    "UpForge's privacy policy explains how we collect, use, and protect your data. Includes Google AdSense advertising disclosure, cookie policy, and your rights under GDPR and CCPA.",
  alternates: { canonical: "https://upforge.org/privacy" },
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    content: `UpForge ("we," "our," or "us") operates the website upforge.org — a free, independent global startup registry. This Privacy Policy explains what information we collect, how we use it, and your rights as a user.

By using UpForge, you agree to the collection and use of information in accordance with this policy. We are committed to protecting your privacy and being transparent about our data practices.

Last Updated: May 2026`,
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: `We collect the following types of information:

**Information you provide directly:**
— Startup submission details (company name, description, founder names, website, category, location)
— Contact form submissions (name, email, message)
— Account registration data (email address, name) if you create an account

**Information collected automatically:**
— Log data: IP address, browser type, pages visited, time spent on pages, referring URLs
— Device information: browser type, operating system, screen resolution
— Cookies and similar tracking technologies (see Section 5 for full details)

**Information from third parties:**
— Public corporate data, company filings, and publicly available startup information used to populate registry profiles`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use collected information for the following purposes:

— **Registry Operations:** To verify, display, and maintain startup profiles in the UpForge global registry
— **Communication:** To respond to contact form submissions and support requests
— **Analytics:** To understand how visitors use our site and improve the user experience
— **Advertising:** To serve relevant advertisements through Google AdSense (see Section 6 for full details)
— **Security:** To detect and prevent fraudulent activity, spam, and abuse
— **Legal Compliance:** To comply with applicable laws, regulations, and legal obligations

We do not sell your personal data to third parties. We do not use your personal data for automated decision-making that produces legal effects.`,
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing and Disclosure",
    content: `We share information only in the following limited circumstances:

**Service Providers:** We use trusted third-party service providers to operate our website, including:
— Supabase (database hosting and authentication)
— Vercel (website hosting and deployment)
— EmailJS (contact form delivery)
— Google Analytics (website analytics)
— Google AdSense (advertising — see Section 6)
— Groq (AI-powered content features)

These providers are contractually obligated to protect your data and may only use it to provide services to us.

**Legal Requirements:** We may disclose information if required by law, court order, or governmental authority.

**Business Transfers:** In the event of a merger, acquisition, or sale of assets, user information may be transferred. We will notify users via email or prominent notice on our website.

**Public Registry Data:** Startup profiles submitted to UpForge are published publicly as part of our registry. Founders who submit their startups consent to public display of their company information.`,
  },
  {
    id: "cookies",
    title: "5. Cookies and Tracking Technologies",
    content: `We use cookies and similar tracking technologies to operate and improve UpForge. Cookies are small data files stored on your device.

**Types of Cookies We Use:**

**Essential Cookies** (required for site operation):
— Session authentication cookies
— Security tokens
— User preference cookies (theme, language)

**Analytics Cookies** (Google Analytics):
— We use Google Analytics to understand how visitors interact with our website
— These cookies collect anonymised data about page views, traffic sources, and user behaviour
— You can opt out at: https://tools.google.com/dlpage/gaoptout

**Advertising Cookies** (Google AdSense):
— We participate in the Google AdSense program to display advertisements on our website
— Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our website and other websites
— Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to UpForge and other websites on the Internet
— You may opt out of personalised advertising by visiting: https://www.google.com/settings/ads
— You may also opt out of a third-party vendor's use of cookies for personalised advertising by visiting: http://www.aboutads.info/choices/

**Managing Cookies:**
You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of certain features on UpForge. Refer to your browser's help documentation for instructions on managing cookies.`,
  },
  {
    id: "google-advertising",
    title: "6. Google AdSense & Third-Party Advertising",
    content: `UpForge participates in the Google AdSense advertising program. This section provides full disclosure as required by Google's Programme Policies.

**Google AdSense:**
We use Google AdSense to display advertisements on our website. Google AdSense is a service provided by Google LLC. Google AdSense uses cookies and web beacons to serve ads based on a user's prior visits to our website or other websites.

**DoubleClick Cookie:**
Google's use of the DoubleClick cookie enables it and its partners to serve ads to users based on their visit to UpForge and/or other sites on the Internet.

**How Google Uses Your Data:**
Google may use data collected through AdSense cookies to:
— Serve personalised advertisements based on your browsing history
— Measure ad performance and effectiveness
— Prevent fraudulent clicks and impressions
— Improve ad relevance over time

You can view Google's Privacy Policy at: https://policies.google.com/privacy

**Opting Out of Personalised Ads:**
You have the following opt-out options:
1. Visit Google's Ad Settings: https://www.google.com/settings/ads
2. Visit the Network Advertising Initiative opt-out page: http://optout.networkadvertising.org/
3. Visit the Digital Advertising Alliance opt-out page: http://www.aboutads.info/choices/
4. Use the Google Analytics Opt-out Browser Add-on: https://tools.google.com/dlpage/gaoptout

Note: Opting out of personalised ads does not mean you will not see advertisements. You may still see non-personalised ads based on contextual content.

**No Other Ad Networks:**
UpForge uses Google AdSense as its sole advertising partner. We do not run any other third-party ad networks, affiliate ad systems, or direct ad sales programmes that would conflict with AdSense policies.`,
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: `We retain different types of data for different periods:

— **Registry profiles:** Retained indefinitely as part of the public record. Founders may request deletion by contacting us.
— **Contact form submissions:** Retained for up to 2 years for support purposes.
— **Analytics data:** Google Analytics data is retained for 26 months (Google's default).
— **Server logs:** Retained for up to 90 days for security purposes.
— **Account data:** Retained for the duration of your account. Deleted within 30 days of account deletion request.`,
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

**For users in the European Economic Area (GDPR):**
— Right to access your personal data
— Right to rectification of inaccurate data
— Right to erasure ("right to be forgotten")
— Right to restrict processing
— Right to data portability
— Right to object to processing
— Right to withdraw consent (where processing is based on consent)
— Right to lodge a complaint with a supervisory authority

**For users in California (CCPA):**
— Right to know what personal information is collected
— Right to know whether personal information is sold or disclosed
— Right to opt out of the sale of personal information (we do not sell personal information)
— Right to non-discrimination for exercising your privacy rights
— Right to request deletion of personal information

**For all users:**
— Right to opt out of marketing communications
— Right to update or correct your information

To exercise any of these rights, please contact us at: privacy@upforge.org`,
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: `UpForge is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@upforge.org and we will delete such information within 30 days.`,
  },
  {
    id: "security",
    title: "10. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include:

— Encrypted database storage (Supabase with row-level security)
— HTTPS encryption for all data in transit
— Regular security audits
— Access controls limiting data access to authorised personnel only

However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.`,
  },
  {
    id: "international",
    title: "11. International Data Transfers",
    content: `UpForge operates globally. Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from those in your country.

When we transfer personal data internationally, we take steps to ensure appropriate safeguards are in place, including:
— Standard Contractual Clauses approved by the European Commission (for EEA data transfers)
— Contractual obligations with service providers to comply with applicable data protection laws`,
  },
  {
    id: "changes",
    title: "12. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by:
— Posting the new Privacy Policy on this page with an updated "Last Updated" date
— Sending an email notification (if you have provided your email address)

We encourage you to review this Privacy Policy periodically. Continued use of UpForge after changes constitutes your acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: `If you have any questions about this Privacy Policy, your data, or your rights, please contact us:

**Email:** privacy@upforge.org
**Support:** support@upforge.org
**Website:** https://upforge.org/contact

For advertising-related concerns or to report an AdSense policy issue, you may also contact Google directly at: https://support.google.com/adsense/`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6 flex flex-col items-center text-center">
        <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
          <h1
            className="text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="font-serif italic text-base md:text-[17px] text-muted-foreground max-w-lg mb-2 leading-relaxed">
            How UpForge collects, uses, and protects your data — including full Google AdSense advertising disclosure.
          </p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Last Updated: May 2026 · Effective: January 2025
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 py-10">

        {/* Quick Nav */}
        <nav className="mb-12 p-6 md:p-8 bg-card/90 border border-border/80 rounded-3xl shadow-xs" aria-label="Privacy policy sections">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-4">Table of Contents</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="font-serif text-sm text-foreground hover:text-amber-500 transition-colors underline underline-offset-2"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Policy Sections */}
        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="p-6 md:p-8 border border-border/80 bg-card/90 rounded-3xl shadow-xs scroll-mt-6"
              aria-labelledby={`heading-${section.id}`}
            >
              <h2
                id={`heading-${section.id}`}
                className="text-xl md:text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border/60"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {section.title}
              </h2>
              <div className="font-serif text-[15px] md:text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                {section.content.split('\n').map((line, i) => {
                  // Bold text formatting
                  const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  if (line.startsWith('—')) {
                    return (
                      <p key={i} className="mb-2 ml-4" dangerouslySetInnerHTML={{ __html: formatted }} />
                    )
                  }
                  if (line.trim() === '') return <br key={i} />
                  return (
                    <p key={i} className="mb-3" dangerouslySetInnerHTML={{ __html: formatted }} />
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* AdSense Compliance Callout */}
        <div className="mt-12 border border-amber-500/40 p-8 bg-amber-500/5 rounded-3xl shadow-xs">
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-3">
            Advertising Transparency
          </h2>
          <p className="font-serif text-base text-foreground leading-relaxed mb-4">
            UpForge uses <strong>Google AdSense</strong> to display advertisements. Google uses cookies to serve ads based on prior visits to our site. 
            You can opt out of personalised advertising at any time by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-amber-600 dark:text-amber-400 hover:opacity-80 transition-opacity"
            >
              Google&apos;s Ad Settings
            </a>
            {" "}or{" "}
            <a
              href="http://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-amber-600 dark:text-amber-400 hover:opacity-80 transition-opacity"
            >
              aboutads.info
            </a>.
          </p>
          <p className="font-serif text-sm text-muted-foreground italic">
            We do not operate any other advertising networks and do not allow third-party ad networks other than Google AdSense on UpForge.
          </p>
        </div>

        {/* Footer Nav */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-wrap gap-6">
          <Link href="/terms" className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
          <Link href="/contact" className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Contact Us
          </Link>
          <Link href="/about" className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            About UpForge
          </Link>
        </div>

      </main>
    </div>
  )
}
