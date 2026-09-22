import type { Metadata } from "next"
import { notFound } from "next/navigation"

import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import { StartupDetail } from "@/components/startup-detail"
import { StartupProfileJsonLd } from "@/components/json-ld"
import { findRelatedStartups, findStartupBySlug, fetchAllStartups } from "@/lib/google-sheets"
import { generateStartupKeywords } from "@/lib/seo-keywords"

const BASE_URL = "https://upforge.org"
const DEFAULT_OG = `${BASE_URL}/logo.jpg`

interface PageProps {
  params: Promise<{ slug: string }>
}

function normalizeSlug(value: string): string {
  try {
    value = decodeURIComponent(value)
  } catch {
    // Keep the raw value when decoding fails.
  }

  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function buildDescription(startup: Startup): string {
  const direct =
    startup.description_short?.trim() ||
    startup.description?.trim() ||
    startup.description_long?.trim()

  if (direct) {
    return direct.length > 200
      ? `${direct.slice(0, 197).trimEnd()}...`
      : direct
  }

  const parts: string[] = []
  let sentence = `${startup.name} is a startup listed in the UpForge Global Startup Registry`

  if (startup.category) {
    sentence += ` in the ${startup.category} sector`
  }

  const location = [startup.city, startup.country_name]
    .filter(Boolean)
    .join(", ")

  if (location) {
    sentence += ` based in ${location}`
  }

  sentence += "."
  parts.push(sentence)

  const founders = formatFounders(startup.founders)
  if (founders) parts.push(`Founded by ${founders}.`)
  if (startup.founded_year) {
    parts.push(`Established in ${startup.founded_year}.`)
  }
  if (startup.ufrn) {
    parts.push(`UpForge Registry Number: ${startup.ufrn}.`)
  }

  parts.push("Listed on the UpForge Global Startup Registry.")
  return parts.join(" ").slice(0, 300)
}

function getCanonicalSlug(startup: Startup, requestedSlug: string): string {
  return startup.slug || normalizeSlug(requestedSlug)
}

function getOgImage(startup: Startup): string {
  return startup.logo_url && /^https?:\/\//i.test(startup.logo_url)
    ? startup.logo_url
    : DEFAULT_OG
}

/**
 * The Google Sheet is the vetted registry source. The page never performs a
 * second verification pass and never creates a fabricated fallback record.
 */
export async function generateStaticParams() {
  const startups = await fetchAllStartups()

  return startups
    .filter((startup) => startup.status === "approved" && startup.slug)
    .map((startup) => ({ slug: startup.slug }))
}

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const startup = await findStartupBySlug(normalizeSlug(slug))

  if (!startup) {
    return {
      title: "Startup Not Found | UpForge Registry",
      description: "The requested startup could not be found in the UpForge Global Startup Registry.",
      robots: { index: false, follow: false },
    }
  }

  const canonicalSlug = getCanonicalSlug(startup, slug)
  const canonicalUrl = `${BASE_URL}/startup/${canonicalSlug}`
  const description = buildDescription(startup)
  const title = `${startup.name} — Founders, Founded, Location, Industry & Valuation | UpForge Registry`
  const keywords = generateStartupKeywords({
    name: startup.name,
    category: startup.category,
    city: startup.city,
    country: startup.country_name,
    founders: formatFounders(startup.founders),
    year: startup.founded_year,
  })

  return {
    title,
    description,
    keywords: [
      ...keywords,
      `what is ${startup.name}`,
      `who founded ${startup.name}`,
      `where is ${startup.name} based`,
      `when was ${startup.name} founded`,
      `what does ${startup.name} do`,
      `${startup.name} valuation`,
      `is ${startup.name} a startup`,
      `${startup.name} industry`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "profile",
      url: canonicalUrl,
      siteName: "UpForge Global Registry",
      title,
      description,
      images: [
        {
          url: getOgImage(startup),
          width: 1200,
          height: 630,
          alt: `${startup.name} — UpForge Registry`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getOgImage(startup)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: startup.ufrn
      ? {
          "upforge:registry-id": startup.ufrn,
          "upforge:ufrn-url": `${canonicalUrl}#ufrn`,
        }
      : undefined,
  }
}

export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params
  const requestedSlug = normalizeSlug(slug)
  const startup = await findStartupBySlug(requestedSlug)

  if (!startup || startup.status !== "approved") {
    notFound()
  }

  const canonicalSlug = getCanonicalSlug(startup, slug)

  // Prevent duplicate slug variants from producing separate indexable documents.
  if (requestedSlug !== normalizeSlug(canonicalSlug)) {
    const { permanentRedirect } = await import("next/navigation")
    permanentRedirect(`/startup/${canonicalSlug}`)
  }

  const canonicalUrl = `${BASE_URL}/startup/${canonicalSlug}`
  const relatedStartups = startup.category
    ? await findRelatedStartups(startup.category, canonicalSlug, 4)
    : []

  return (
    <div className="flex min-h-screen w-full flex-col">
      <StartupProfileJsonLd startup={startup} />

      <main className="w-full flex-1">
        <StartupDetail
          startup={startup}
          relatedStartups={relatedStartups}
          profileUrl={canonicalUrl}
        />
      </main>

      <footer className="border-t border-border/80 bg-muted/20 px-4 py-6 text-center font-serif text-xs text-muted-foreground">
        <p className="line-relaxed">
          Listed on the{" "}
          <a
            href={`${BASE_URL}/registry`}
            className="font-bold text-amber-600 hover:underline dark:text-amber-400"
          >
            UpForge Global Startup Registry
          </a>{" "}
          · Verifiable Machine-Readable Ledger ·{" "}
          <a
            href={`${BASE_URL}/submit`}
            className="font-bold text-amber-600 hover:underline dark:text-amber-400"
          >
            Submit Startup →
          </a>
        </p>
        {startup.ufrn && (
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            UFRN: {startup.ufrn}
          </p>
        )}
      </footer>
    </div>
  )
}
