// app/methodology/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Database, CheckCircle, RefreshCw, Scale } from "lucide-react"

export const revalidate = 600

export const metadata: Metadata = {
  title: "Registry Verification Methodology & Data Standards | UpForge",
  description:
    "Learn how UpForge classifies registry-listed startups, assigns UFRN identifiers, handles source data, and maintains public startup profiles.",
  alternates: { canonical: "https://upforge.org/methodology" },
  openGraph: {
    title: "Registry Verification Methodology & Data Standards | UpForge",
    description:
      "The official UpForge registry standard: source-of-truth rules, UFRN taxonomy, data handling, and correction guidelines.",
    url: "https://upforge.org/methodology",
    siteName: "UpForge",
    images: [
      {
        url: "https://upforge.org/og-methodology.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://upforge.org/methodology",
      "url": "https://upforge.org/methodology",
      "name": "Registry Verification Methodology & Data Standards",
      "description":
        "The registry methodology and operational guidelines for classifying startup records and issuing UFRN credentials on UpForge.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://upforge.org",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Methodology",
            "item": "https://upforge.org/methodology",
          },
        ],
      },
    },
  ],
}

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen text-foreground font-serif overflow-x-hidden">

        {/* Header Section */}
        <section className="border-b-[2px] border-foreground max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6 flex flex-col items-center text-center">
          <h1
            className="text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Verification Methodology
          </h1>

          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C59A2E] font-bold mt-2">
            The Standards and Guidelines Powering the UpForge Global Registry
          </p>
        </section>

        {/* Main Body Content */}
        <main className="max-w-[900px] mx-auto px-6 py-12 space-y-12">

          <section className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed">

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic mb-8">
              "Data integrity is the foundation of trust. UpForge uses its Global Database as the authoritative registry source for listed startups, then publishes structured profiles, UFRN identifiers, and connected editorial context. The registry classification should not be read as a claim that every field has been independently corroborated outside the registry record."
            </p>

            <h2 className="text-2xl font-bold font-serif border-b border-foreground pb-2 mb-4">
              1. The Registry Classification Workflow
            </h2>

            <p className="text-foreground/90 leading-relaxed mb-6 font-serif">
              The UpForge Global Database is the authoritative registry source for registry-listed startups. The production site does not perform a second external verification pass before publishing a record. Instead, it normalizes registry data into a stable public profile and applies the UpForge verified registry classification.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 font-sans">

              <div className="border border-foreground p-5 bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="h-5 w-5 text-[#C59A2E]" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Stage 1: Registry Source
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  The UpForge Global Database provides the canonical startup record used by the registry build and public profile pages.
                </p>
              </div>

              <div className="border border-foreground p-5 bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <RefreshCw className="h-5 w-5 text-[#C59A2E]" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Stage 2: Data Normalization
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Names, slugs, website fields, logos, descriptions, founders, sectors, and geography are normalized for consistent public records.
                </p>
              </div>

              <div className="border border-foreground p-5 bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-[#C59A2E]" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Stage 3: Registry Classification
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Registry-listed startups are treated as approved and verified under the UpForge registry policy, with a standardized 90/100 registry tier.
                </p>
              </div>

              <div className="border border-foreground p-5 bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-5 w-5 text-[#C59A2E]" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Stage 4: Public Record
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  The normalized startup receives a canonical UpForge URL, UFRN where applicable, structured metadata, and connected registry links.
                </p>
              </div>

            </div>

            <h2 className="text-2xl font-bold font-serif border-b border-foreground pb-2 mb-4 mt-10">
              2. UFRN Taxonomy & Formatting
            </h2>

            <p className="text-foreground/90 leading-relaxed mb-6 font-serif">
              Every verified startup is assigned a unique{" "}
              <strong>UpForge Registry Number (UFRN)</strong>. The UFRN is a structured identifier that details key company information in its taxonomy:
            </p>

            <div className="bg-muted border border-border p-6 rounded-md my-6 font-mono text-xs text-foreground">
              <p className="font-bold mb-3 text-sm text-[#C59A2E]">
                UFRN Format Example:
              </p>

              <div className="text-center py-4 bg-background border border-foreground font-bold text-lg tracking-widest text-[#B30000] mb-3">
                UF-2026-IND-00001
              </div>

              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">UF:</strong> UpForge registry prefix.
                </li>

                <li>
                  <strong className="text-foreground">2026:</strong> Registry assignment year in this example.
                </li>

                <li>
                  <strong className="text-foreground">IND:</strong> Country code segment, followed by the registry record identifier.
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold font-serif border-b border-foreground pb-2 mb-4 mt-10">
              3. Data Sources & Audit Frequency
            </h2>

            <p className="text-foreground/90 leading-relaxed mb-4 font-serif">
              We rely on a structured registry data pipeline to keep public records consistent:
            </p>

            <ul className="list-disc pl-6 space-y-3 font-serif text-foreground/80 mb-8">

              <li>
                <strong>Registry source:</strong> The UpForge Global Database is the authoritative source for startup records published by the registry.
              </li>

              <li>
                <strong>Registry sync:</strong> The site synchronizes the current registry dataset through the centralized UpForge data layer and caches the result for performance.
              </li>

              <li>
                <strong>Editorial updates:</strong> Founder stories, intelligence reports, and other editorial pages have their own publication and update workflows described in the editorial standards.
              </li>

            </ul>

            <h2 className="text-2xl font-bold font-serif border-b border-foreground pb-2 mb-4 mt-10">
              4. Dispute & Corrections Policy
            </h2>

            <p className="text-foreground/90 leading-relaxed mb-4 font-serif">
              We acknowledge that corporate data changes frequently. To maintain registry accuracy:
            </p>

            <ul className="list-disc pl-6 space-y-3 font-serif text-foreground/80 mb-8">

              <li>
                <strong>Founder corrections:</strong> Founders and authorized representatives can submit corrections to descriptions, logos, links, and company context through the contact workflow.
              </li>

              <li>
                <strong>Third-Party Reports:</strong> Investors, researchers, and public users can submit corrections if they spot inaccurate or outdated information on a profile.
              </li>

              <li>
                <strong>Dispute Handling:</strong> Material disputes are reviewed through the correction workflow and may result in a record being updated, restricted, or removed from the public registry while the issue is resolved.
              </li>

            </ul>

            <div className="bg-[#B30000]/5 border-l-4 border-[#B30000] p-6 my-8">

              <h3 className="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-[#B30000]" />
                Submit a Data Correction
              </h3>

              <p className="text-sm text-foreground/80 font-serif leading-relaxed mb-4">
                If you are a founder wishing to claim your profile, or an analyst identifying an error in our registry dataset, please submit a report immediately.
              </p>

              <Link
                href="/contact"
                className="inline-block bg-foreground hover:bg-[#B30000] text-background hover:text-white px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Go to Contact & Support →
              </Link>

            </div>

          </section>
        </main>
      </div>
    </>
  )
}
