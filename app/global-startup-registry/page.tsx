import type { Metadata } from "next"
import { IntentHub } from "@/components/seo/intent-hub"
import { getRegistrySnapshot, seoSlug } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { total, countries, categories } = await getRegistrySnapshot()
  return {
    title: "Global Startup Registry — Worldwide Startup Database | UpForge",
    description: `Explore ${total.toLocaleString()}+ verified startup listings across ${countries.length}+ countries and ${categories.length}+ sectors in the UpForge Global Startup Registry.`,
    keywords: ["global startup registry", "worldwide startup database", "startup directory", "global startups", "startup companies database"],
    alternates: { canonical: `${BASE}/global-startup-registry` },
    openGraph: {
      title: "Global Startup Registry — UpForge",
      description: `A searchable global registry of ${total.toLocaleString()}+ verified startup listings.`,
      url: `${BASE}/global-startup-registry`,
      siteName: "UpForge",
      type: "website",
      images: [{ url: `${BASE}/og/global-registry.png`, width: 1200, height: 630, alt: "UpForge Global Startup Registry" }],
    },
    robots: { index: true, follow: true },
  }
}

export default async function GlobalStartupRegistryPage() {
  const { total, countries, categories, featured } = await getRegistrySnapshot()
  const topCountries = countries.slice(0, 12)
  const topCategories = categories.slice(0, 12)

  return (
    <IntentHub
      eyebrow="Global Startup Registry"
      title="Global Startup Registry: Discover Startups Worldwide"
      description="Explore UpForge's public startup registry by company, sector, country, and founder context. The registry is designed as a durable reference layer for discovering emerging companies and their UFRN identifiers."
      canonical={`${BASE}/global-startup-registry`}
      primaryHref="/registry"
      primaryLabel="Explore the Registry"
      stats={[
        { label: "Verified listings", value: `${total.toLocaleString()}+` },
        { label: "Countries represented", value: `${countries.length}+` },
        { label: "Sectors represented", value: `${categories.length}+` },
        { label: "Access", value: "Free" },
      ]}
      sections={[
        {
          title: "Browse the global startup database",
          text: "Use the main registry for company-level discovery, then move into sector and geography hubs for narrower research. Each indexable profile has its own canonical UpForge URL.",
          items: [
            { title: "Verified Startup Database", description: "Understand the registry's data model, UFRN identifiers, and verification standard.", href: "/verified-startup-database", meta: "Registry methodology" },
            { title: "Startup Intelligence", description: "Read market reports, research briefs, and founder intelligence connected to the registry.", href: "/startup-intelligence", meta: "Research & analysis" },
            { title: "Startup Funding Trends", description: "Follow UpForge's published venture, funding, valuation, and capital-market analysis.", href: "/startup-funding-trends", meta: "Funding intelligence" },
          ],
        },
        {
          title: "Popular startup sectors",
          text: "These sector hubs are generated from the live registry taxonomy rather than a static list, so the site can expand as the source dataset grows.",
          items: topCategories.map((category) => ({
            title: `${category.name} startups`,
            description: `Browse ${category.count.toLocaleString()} verified ${category.name} listings in the UpForge sector registry.`,
            href: `/startups/${seoSlug(category.name)}`,
            meta: `${category.count.toLocaleString()} listings`,
          })),
        },
        {
          title: "Global geography",
          text: "Country hubs are only created when the registry has enough records to make the page genuinely useful. This avoids thin location pages and keeps the information architecture focused.",
          items: topCountries.map((country) => ({
            title: `${country.name} startups`,
            description: `Explore ${country.count.toLocaleString()} registry listings from ${country.name}.`,
            href: `/startups/country/${seoSlug(country.name)}`,
            meta: `${country.count.toLocaleString()} listings`,
          })),
        },
      ]}
      items={featured.slice(0, 6).map((startup) => ({
        title: startup.name,
        description: startup.description_short || startup.description || `${startup.name} — UpForge verified registry profile.`,
        href: `/startup/${startup.slug}`,
        meta: startup.category || "Startup profile",
      }))}
    />
  )
}
