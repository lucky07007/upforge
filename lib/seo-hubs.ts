import { fetchAllStartups } from "@/lib/google-sheets"
import { FOUNDERS } from "@/lib/founders/data"
import { INTELLIGENCE_REPORTS } from "@/lib/intelligenceData"
import { BLOG_POSTS } from "@/data/blog-posts"
import type { Startup } from "@/types/startup"

export const MIN_HUB_RECORDS = 5

export function seoSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function normalize(value?: string | null): string {
  return (value || "").trim().toLowerCase()
}

function approved(startups: Startup[]): Startup[] {
  return startups.filter((startup) => startup.status === "approved" && startup.slug)
}

export async function getRegistrySnapshot() {
  const startups = approved(await fetchAllStartups())

  const categoryMap = new Map<string, { name: string; count: number }>()
  const countryMap = new Map<string, { name: string; code: string; count: number }>()

  for (const startup of startups) {
    const category = startup.category?.trim()
    if (category) {
      const key = normalize(category)
      const current = categoryMap.get(key)
      categoryMap.set(key, {
        name: current?.name || category,
        count: (current?.count || 0) + 1,
      })
    }

    const country = startup.country_name?.trim()
    if (country && country.toLowerCase() !== "global") {
      const key = normalize(country)
      const current = countryMap.get(key)
      countryMap.set(key, {
        name: current?.name || country,
        code: current?.code || startup.country_code || "",
        count: (current?.count || 0) + 1,
      })
    }
  }

  const categories = [...categoryMap.values()].sort((a, b) => b.count - a.count)
  const countries = [...countryMap.values()].sort((a, b) => b.count - a.count)
  const featured = startups
    .filter((startup) => startup.is_featured)
    .slice(0, 12)
  const latest = [...startups]
    .sort((a, b) => {
      const ad = a.updated_at || a.created_at || ""
      const bd = b.updated_at || b.created_at || ""
      return bd.localeCompare(ad)
    })
    .slice(0, 12)

  return {
    startups,
    total: startups.length,
    categories,
    countries,
    featured,
    latest,
  }
}

export async function getCountryDirectory() {
  const { startups } = await getRegistrySnapshot()
  const map = new Map<string, { name: string; code: string; startups: Startup[] }>()

  for (const startup of startups) {
    const name = startup.country_name?.trim()
    if (!name || name.toLowerCase() === "global") continue
    const key = normalize(name)
    const current = map.get(key)
    if (current) current.startups.push(startup)
    else map.set(key, { name, code: startup.country_code || "", startups: [startup] })
  }

  return [...map.values()]
    .filter((country) => country.startups.length >= MIN_HUB_RECORDS)
    .sort((a, b) => b.startups.length - a.startups.length)
    .map((country) => ({
      ...country,
      slug: seoSlug(country.name),
      count: country.startups.length,
    }))
}

export async function getCityDirectory() {
  const { startups } = await getRegistrySnapshot()
  const map = new Map<string, { name: string; country: string; startups: Startup[] }>()

  for (const startup of startups) {
    const name = startup.city?.trim()
    if (!name || name.toLowerCase() === "global") continue
    const country = startup.country_name?.trim() || "Global"
    const key = `${normalize(name)}|${normalize(country)}`
    const current = map.get(key)
    if (current) current.startups.push(startup)
    else map.set(key, { name, country, startups: [startup] })
  }

  return [...map.values()]
    .filter((city) => city.startups.length >= MIN_HUB_RECORDS)
    .sort((a, b) => b.startups.length - a.startups.length)
    .map((city) => ({
      ...city,
      slug: seoSlug(`${city.name}-${city.country}`),
      count: city.startups.length,
    }))
}

export async function getAiFounders() {
  return FOUNDERS.filter((founder) => {
    const text = `${founder.category || ""} ${founder.context || ""} ${founder.oneLiner || ""}`.toLowerCase()
    return text.includes("ai") || text.includes("artificial intelligence") || text.includes("machine learning") || text.includes("llm")
  })
}

export function getFundingReports() {
  const reports = Object.values(INTELLIGENCE_REPORTS).filter((report) => {
    const text = `${report.title} ${report.subtitle} ${report.category} ${report.tag}`.toLowerCase()
    return text.includes("fund") || text.includes("venture") || text.includes("capital") || text.includes("series")
  })

  const articles = BLOG_POSTS.filter((post) => {
    const text = `${post.title} ${post.excerpt} ${post.category} ${(post.tags || []).join(" ")}`.toLowerCase()
    return text.includes("fund") || text.includes("venture") || text.includes("capital") || text.includes("valuation") || text.includes("vc")
  }).slice(0, 12)

  return { reports, articles }
}
