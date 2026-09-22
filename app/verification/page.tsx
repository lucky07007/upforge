import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllStartups } from "@/lib/google-sheets";

export const revalidate = 3600;

const SITE_URL = "https://upforge.org";

export const metadata: Metadata = {
  title: "What UpForge Verified Means | UpForge Global Database",
  description:
    "UpForge Verified marks a startup record that has passed UpForge's registry review and received a UFRN. What it confirms, what it doesn't, and how the registry process works.",
  alternates: {
    canonical: `${SITE_URL}/verification`,
  },
  openGraph: {
    title: "What UpForge Verified Means | UpForge Global Database",
    description:
      "What UpForge Verified means, how a record earns a UFRN, and what the status does and doesn't confirm.",
    url: `${SITE_URL}/verification`,
    siteName: "UpForge",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og/global-registry.png`,
        width: 1200,
        height: 630,
        alt: "UpForge Global Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What UpForge Verified Means | UpForge",
    description:
      "What UpForge Verified means inside the UpForge Global Database.",
    images: [`${SITE_URL}/og/global-registry.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/verification#webpage`,
        url: `${SITE_URL}/verification`,
        name: "What UpForge Verified Means | UpForge Global Database",
        description:
          "What UpForge Verified means and how startup records earn a UFRN inside the UpForge Global Database.",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@id": `${SITE_URL}/verification#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/verification#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "UpForge", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Verification",
            item: `${SITE_URL}/verification`,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "UpForge",
        url: SITE_URL,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/verification#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What does UpForge Verified mean?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UpForge Verified marks a startup record that has passed UpForge's editorial registry review and been issued a UFRN (UpForge Registry Number) inside the UpForge Global Database.",
            },
          },
          {
            "@type": "Question",
            name: "Does UpForge Verified mean UpForge endorses a startup?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. It is a registry and data status, not an investment recommendation, quality rating, profitability claim, or prediction of future success.",
            },
          },
          {
            "@type": "Question",
            name: "Is startup verification free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. UpForge does not charge a fee for a verified registry record or UFRN issuance.",
            },
          },
          {
            "@type": "Question",
            name: "Can a verified record be corrected?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Founders and other parties can request corrections, and UpForge's editorial team reviews and updates records as information changes.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const CONFIRMS = [
  "The record was reviewed by UpForge's editorial team",
  "Founder and operational details were checked against public sources",
  "The startup holds a permanent UFRN inside the Global Database",
  "The entry can be looked up and cited as a registry reference",
];

const NOT = [
  "An investment recommendation",
  "A quality or performance ranking",
  "A profitability guarantee",
  "A prediction of future success",
];

const STEPS = [
  {
    n: "01",
    title: "Submission",
    text: "A founder or team submits company and founder data through the registry intake process.",
  },
  {
    n: "02",
    title: "Editorial review",
    text: "UpForge's editorial team checks founders, operational status, and public records for accuracy.",
  },
  {
    n: "03",
    title: "UFRN assignment",
    text: "Approved records receive a permanent UFRN and enter the UpForge Global Database.",
  },
  {
    n: "04",
    title: "Ongoing correction",
    text: "Records stay open to correction — founders and researchers can flag information that needs an update.",
  },
];

const FAQS = [
  {
    q: "What does UpForge Verified mean?",
    a: "It marks a startup record that has passed UpForge's editorial registry review and been issued a UFRN inside the UpForge Global Database.",
  },
  {
    q: "Does verified mean UpForge endorses the startup?",
    a: "No. The status is a registry and data signal — not an investment recommendation, quality ranking, profitability guarantee, or prediction of future success.",
  },
  {
    q: "Is verification free?",
    a: "Yes. UpForge does not charge a fee for a verified registry record or UFRN issuance.",
  },
  {
    q: "Can a startup record be updated?",
    a: "Yes. Startup information changes over time. Founders and other relevant parties can contact UpForge to request corrections or updates.",
  },
];

export default async function VerificationPage() {
  let startupCount = 0;

  try {
    const startups = await fetchAllStartups();
    startupCount = Array.isArray(startups) ? startups.length : 0;
  } catch {
    startupCount = 0;
  }

  const formattedCount =
    startupCount > 0 ? startupCount.toLocaleString("en-IN") : "—";

  return (
    <>
      <JsonLd />

      <main className="min-h-screen bg-background text-foreground">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 pb-10 pt-14 sm:px-6 sm:pt-16">
            <p className="text-xs font-medium text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                UpForge
              </Link>
              <span className="mx-1.5">/</span>
              Verification
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
              What UpForge Verified means
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              How to read the ✓ status on a startup record in the UpForge
              Global Database — what it confirms, what it doesn't, and how a
              record earns it.
            </p>

            <div className="mt-8 flex items-center gap-6 border-t border-border pt-5 text-sm">
              <div>
                <span className="font-semibold">{formattedCount}</span>{" "}
                <span className="text-muted-foreground">registry records</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="text-muted-foreground">Free to earn</div>
              <div className="h-4 w-px bg-border" />
              <div className="text-muted-foreground">Public &amp; searchable</div>
            </div>
          </div>
        </section>

        {/* =========================================================
            DEFINITION
        ========================================================= */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6">
            <div className="border-l-2 border-[#C59A2E] pl-5">
              <p className="text-sm font-semibold">
                UpForge Verified{" "}
                <span className="font-normal text-muted-foreground">
                  — status, noun
                </span>
              </p>
              <p className="mt-2 max-w-xl text-base leading-7 text-foreground/90">
                A startup record accepted into the UpForge Global Database
                after editorial review, and issued a permanent registry
                number (UFRN).
              </p>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
              The badge is a registry signal, not a marketing claim. It
              distinguishes a reviewed UpForge record from an unclassified
              listing — nothing more, nothing less.
            </p>
          </div>
        </section>

        {/* =========================================================
            CONFIRMS / NOT — two-column definition list
        ========================================================= */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold">Verified confirms</h2>
                <ul className="mt-4 space-y-3">
                  {CONFIRMS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <span className="mt-0.5 text-[#C59A2E]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold">Verified is not</h2>
                <ul className="mt-4 space-y-3">
                  {NOT.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <span className="mt-0.5 text-muted-foreground">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROCESS — genuinely sequential, so numbered here is earned
        ========================================================= */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6">
            <h2 className="text-sm font-semibold">How a record gets verified</h2>

            <div className="mt-6 divide-y divide-border border-y border-border">
              {STEPS.map((step) => (
                <div key={step.n} className="flex gap-5 py-4">
                  <span className="w-6 shrink-0 pt-0.5 text-sm text-muted-foreground">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================= */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6">
            <h2 className="text-sm font-semibold">Questions</h2>

            <div className="mt-4 divide-y divide-border border-t border-border">
              {FAQS.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
            <h2 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
              Look up a record or apply for one
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Search verified startups in the Global Registry, or submit your
              own company for review.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Link
                href="/startup"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#C59A2E] px-5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Explore the Global Registry
              </Link>

              <Link
                href="/methodology"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Read the registry methodology
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
