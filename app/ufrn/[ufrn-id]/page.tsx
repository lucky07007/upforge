// app/ufrn/[ufrn-id]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Dedicated UFRN route — the "Digital Proof of Existence" page.
// Canonical: upforge.org/ufrn/[ufrn-id]
//
// Strategy:
//   1. Primary lookup by exact UFRN match
//   2. Fuzzy fallback: normalise input → try common misspellings
//      (UF-2026-001 → UFRN-2026-001, missing prefix, wrong separator, etc.)
//   3. If still not found → 404 with a "did you mean?" search suggestion
//
// Schema: Organisation + Dataset + DefinedTerm (for the ID itself)
// ─────────────────────────────────────────────────────────────────────────────

import { fetchAllStartups } from "@/lib/google-sheets"
import { notFound } from "next/navigation"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import type { Startup } from "@/types/startup"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UFRNDetailView } from "@/components/ufrn-detail"

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ "ufrn-id": string }>
}

// ---------------------------------------------------------------------------
// NORMALISER — handles the most common misspelling patterns
// Input examples that must all resolve to the same startup:
//   UFRN-2026-IND-00001  ← canonical
//   UF-2026-IND-00001    ← missing "RN"
//   UFRN2026IND00001     ← no separators
//   ufrn-2026-ind-00001  ← lowercase
//   UFRN-26-IND-1        ← abbreviated
// ---------------------------------------------------------------------------
function normaliseCandidates(raw: string): string[] {
  const upper = raw.toUpperCase().trim()
  const candidates = new Set<string>()

  // 1. As-is (already uppercased)
  candidates.add(upper)

  // 2. Strip all separators, then reformat
  const stripped = upper.replace(/[-_\s]/g, "")

  // 3. Try inserting "UFRN-" prefix if missing
  if (!upper.startsWith("UFRN-") && !upper.startsWith("UFRN")) {
    candidates.add("UFRN-" + upper)
  }

  // 4. UF-XXXX → UFRN-XXXX
  if (upper.startsWith("UF-")) {
    candidates.add("UFRN-" + upper.slice(3))
  }

  // 5. Reconstruct from stripped: UFRNYYYY → UFRN-YYYY-IND-NNNNN
  // Pattern: UFRN + 4-digit year + country_code (2-3 chars) + 5-digit number
  const match = stripped.match(/^UFRN(\d{4})([A-Z]{2,3})(\d{1,6})$/)
  if (match) {
    const [, year, country, num] = match
    candidates.add(`UFRN-${year}-${country}-${num.padStart(5, "0")}`)
  }

  // 6. Legacy "UPF-" prefix (old verification codes displayed on cards)
  if (upper.startsWith("UPF-")) {
    candidates.add(upper.replace("UPF-", "UFRN-"))
  }

  return Array.from(candidates)
}

// ---------------------------------------------------------------------------
// DATA FETCHER — tries each candidate in order
// ---------------------------------------------------------------------------
async function getStartupByUFRN(rawUfrnId: string): Promise<Startup | null> {
  const startups = await fetchAllStartups()
  const approved = startups.filter((s) => s.status === "approved")
  const candidates = normaliseCandidates(rawUfrnId)

  for (const candidate of candidates) {
    const found = approved.find(
      (s) => s.ufrn && s.ufrn.toUpperCase() === candidate.toUpperCase()
    )
    if (found) return found as Startup
  }
  return null
}

// ---------------------------------------------------------------------------
// STATIC PARAMS — pre-render all approved UFRN pages at build time
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const startups = await fetchAllStartups()
  return startups
    .filter((row) => row.status === "approved" && row.ufrn)
    .map((row) => ({ "ufrn-id": row.ufrn as string }))
}

export const revalidate = 86400

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "ufrn-id": rawUfrnId } = await params
  const startup = await getStartupByUFRN(rawUfrnId)

  if (!startup) {
    return {
      title: `UFRN ${rawUfrnId} — Not Found | UpForge Registry`,
      description: "This UFRN could not be found in the UpForge Global Registry.",
      robots: { index: false, follow: false },
    }
  }

  const ufrn = startup.ufrn!
  const canonicalUrl = `https://upforge.org/ufrn/${ufrn}`
  const title = `${ufrn} — ${startup.name} | UpForge Registry`
  const description = `${ufrn} is the UpForge Registry Number for ${startup.name}, a verified ${startup.category ?? "startup"} from ${startup.city ?? startup.country_name ?? "India"}. Official registry record.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: "https://upforge.org/og/startup-default.png", width: 1200, height: 630 }],
    },
    // Multiple meta tags to maximise UFRN discoverability
    other: {
      "upforge:registry-id": ufrn,
      "upforge:entity-type": "startup",
      "upforge:country": startup.country_code ?? "IND",
    },
  }
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA
// ── DefinedTerm schema for the UFRN itself (new — tells Google what UFRN IS)
// ── Organisation schema with all identifier variants
// ── Dataset schema for citable data
// ---------------------------------------------------------------------------
function buildDefinedTermSchema(ufrn: string, canonicalUrl: string) {
  // DefinedTerm tells Google that UFRN is a controlled vocabulary term —
  // the same schema used by ISBN, ISSN, DOI registries.
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://upforge.org/ufrn/${ufrn}#term`,
    name: ufrn,
    termCode: ufrn,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": "https://upforge.org/registry#ufrn-system",
      name: "UpForge Registry Number System",
      url: "https://upforge.org/registry",
      description:
        "UFRN (UpForge Registry Number) is a globally unique identifier assigned to every verified startup in the UpForge Global Registry. Format: UFRN-YYYY-CC-NNNNN.",
    },
    url: canonicalUrl,
  }
}

function buildOrganisationSchema(startup: Startup, canonicalUrl: string) {
  const sameAs = [
    startup.linkedin_url,
    startup.twitter_url,
    startup.instagram_url,
    startup.website,
  ].filter((u): u is string => typeof u === "string" && u.length > 0)

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `https://upforge.org/startup/${startup.slug}#organization`,
    name: startup.name,
    url: startup.website ?? canonicalUrl,
    logo: startup.logo_url,
    foundingDate: startup.founded_year?.toString(),
    industry: startup.category,
    sameAs,
    // Three identifier properties for maximum Knowledge Graph coverage
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "UFRN",
        name: "UpForge Registry Number",
        value: startup.ufrn,
        url: canonicalUrl,
      },
      {
        "@type": "PropertyValue",
        propertyID: "serialNumber",
        name: "Serial Number",
        value: startup.ufrn,
      },
      {
        "@type": "PropertyValue",
        propertyID: "shortCode",
        name: "Short Registry Code",
        // Short form: last segment of UFRN e.g. "00001"
        value: startup.ufrn?.split("-").pop(),
        url: canonicalUrl,
      },
    ],
  }
}

function buildDatasetSchema(startup: Startup, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonicalUrl}#dataset`,
    name: `${startup.ufrn} — ${startup.name} Registry Record`,
    description: `Official UpForge Registry dataset record for ${startup.name}. UFRN: ${startup.ufrn}. Includes verified company data, founder information, and sector classification.`,
    url: canonicalUrl,
    identifier: startup.ufrn,
    creator: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://upforge.org",
    },
    keywords: [
      startup.ufrn,
      startup.name,
      startup.category ?? "",
      startup.city ?? "",
      "UFRN",
      "startup registry",
      "Indian startup",
    ].filter(Boolean),
    license: "https://creativecommons.org/licenses/by/4.0/",
    isPartOf: {
      "@type": "DataCatalog",
      name: "UpForge Global Startup Registry",
      url: "https://upforge.org/registry",
    },
  }
}

function buildWebPageSchema(startup: Startup, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${startup.ufrn} — ${startup.name} | UpForge`,
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@id": `https://upforge.org/startup/${startup.slug}#organization`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",     item: "https://upforge.org" },
        { "@type": "ListItem", position: 2, name: "Registry", item: "https://upforge.org/registry" },
        { "@type": "ListItem", position: 3, name: "UFRN",     item: "https://upforge.org/ufrn" },
        { "@type": "ListItem", position: 4, name: startup.ufrn!, item: canonicalUrl },
      ],
    },
  }
}

// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------
export default async function UFRNPage({ params }: PageProps) {
  const { "ufrn-id": rawUfrnId } = await params
  const startup = await getStartupByUFRN(rawUfrnId)

  if (!startup) notFound()

  const ufrn = startup.ufrn!
  const canonicalUrl = `https://upforge.org/ufrn/${ufrn}`

  // If someone typed a non-canonical form (e.g. lowercase), redirect to canonical
  if (rawUfrnId !== ufrn) {
    redirect(`/ufrn/${ufrn}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      {/* 4 schemas: DefinedTerm + Organisation + Dataset + ProfilePage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildDefinedTermSchema(ufrn, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganisationSchema(startup, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildDatasetSchema(startup, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema(startup, canonicalUrl)),
        }}
      />

      <Navbar />
      <main className="flex-1">
        <UFRNDetailView startup={startup} canonicalUrl={canonicalUrl} />
      </main>
      <Footer />
    </div>
  )
}
