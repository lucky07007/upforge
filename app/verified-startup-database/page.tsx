import type { Metadata } from "next"
import { IntentHub } from "@/components/seo/intent-hub"
import { getRegistrySnapshot } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { total, countries, categories } = await getRegistrySnapshot()
  return {
    title: "Verified Startup Database — UFRN Registry | UpForge",
    description: `Learn how the UpForge verified startup database works, how UFRN identifiers are used, and how registry records are organized across ${countries.length}+ countries and ${categories.length}+ sectors.`,
    keywords: ["verified startup database", "startup verification database", "UFRN startup", "startup registry number", "verified startup directory"],
    alternates: { canonical: `${BASE}/verified-startup-database` },
    openGraph: {
      title: "Verified Startup Database & UFRN Registry | UpForge",
      description: "Understand the UpForge registry standard and UFRN-based startup records.",
      url: `${BASE}/verified-startup-database`,
      siteName: "UpForge",
      type: "website",
      images: [{ url: `${BASE}/og/registry.png`, width: 1200, height: 630, alt: "UpForge Verified Startup Database" }],
    },
    robots: { index: true, follow: true },
  }
}

export default async function VerifiedStartupDatabasePage() {
  const { total, countries, categories } = await getRegistrySnapshot()

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "UpForge Verified Startup Database",
    "description": `A public registry dataset containing ${total.toLocaleString()}+ startup records classified under the UpForge registry standard.`,
    "url": `${BASE}/verified-startup-database`,
    "identifier": `${BASE}/registry`,
    "creator": { "@type": "Organization", "name": "UpForge", "url": BASE },
    "publisher": { "@type": "Organization", "name": "UpForge", "url": BASE },
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <IntentHub
        eyebrow="Verified Startup Database"
        title="Verified Startup Database with UFRN Records"
        description="UpForge maintains a structured public startup database where registry-listed companies are treated as verified under the UpForge registry policy. Each record can carry a UFRN, company description, website, founders, sector, geography, and related registry metadata."
        canonical={`${BASE}/verified-startup-database`}
        primaryHref="/registry"
        primaryLabel="Browse Verified Startups"
        stats={[
          { label: "Registry listings", value: `${total.toLocaleString()}+` },
          { label: "Countries", value: `${countries.length}+` },
          { label: "Sectors", value: `${categories.length}+` },
          { label: "Identifier", value: "UFRN" },
        ]}
        sections={[
          {
            title: "What a verified UpForge listing means",
            text: "The Google Sheet maintained for the UpForge registry is the vetted source of truth. A startup included in that source is treated as an approved, verified registry record; the site does not run a second external verification pass before publishing the profile.",
            items: [
              { title: "UFRN identifier", description: "A stable UpForge Registry Number gives a startup record a machine-readable identity within the registry.", href: "/verify", meta: "Registry identity" },
              { title: "Registry methodology", description: "See the principles behind registry classification, data handling, and the distinction between source data and independent corroboration.", href: "/methodology", meta: "Methodology" },
              { title: "Editorial standards", description: "Review the standards used for UpForge editorial and intelligence content.", href: "/editorial-standards", meta: "Editorial trust" },
            ],
          },
          {
            title: "Data fields that strengthen each profile",
            text: "The profile system is designed to make useful startup facts easy to discover and cross-reference: company identity, website, description, founders, founding year, sector, location, social links, UFRN, and related companies.",
          },
          {
            title: "Built for research and discovery",
            text: "The database connects company profiles to sector hubs, country hubs, founder stories, research reports, and funding intelligence. This internal linking structure helps users move from a broad market question to the specific companies behind it.",
            items: [
              { title: "Global Startup Registry", description: "Browse the full startup discovery layer.", href: "/global-startup-registry", meta: "Global directory" },
              { title: "AI Startup Founders", description: "Explore founder profiles connected to AI and technology companies.", href: "/ai-startup-founders", meta: "Founder intelligence" },
              { title: "Startup Intelligence", description: "Read research and market briefings connected to startup data.", href: "/startup-intelligence", meta: "Market research" },
            ],
          },
        ]}
      />
    </>
  )
}
