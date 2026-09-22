import type { MetadataRoute } from "next"

import { fetchAllStartups } from "@/lib/google-sheets"
import { BLOG_POSTS } from "@/data/blog-posts"
import { QUIZ_REGISTRY } from "@/lib/quizData"
import { FOUNDERS, getAllCategories } from "@/lib/founders/data"
import { categoryToSlug } from "@/lib/categories"
import { getCountryDirectory, getCityDirectory } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"
const DEFAULT_DATE = "2026-09-12"

function safeDate(value?: string | null): string {
  if (!value) return DEFAULT_DATE
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return DEFAULT_DATE
  return date.toISOString().slice(0, 10)
}

function uniqueByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const startups = await fetchAllStartups()

  const staticRoutes = [
    ["/", 1.0, "daily"],
    ["/registry", 0.95, "daily"],
    ["/startup", 0.9, "daily"],
    ["/startups", 0.9, "daily"],
    ["/quiz", 0.85, "weekly"],
    ["/submit", 0.8, "monthly"],
    ["/verify", 0.8, "monthly"],
    ["/verification", 0.8, "monthly"],
    ["/blog", 0.85, "weekly"],
    ["/founder-stories", 0.9, "weekly"],
    ["/industries", 0.75, "weekly"],
    ["/global-startup-registry", 0.9, "weekly"],
    ["/verified-startup-database", 0.88, "weekly"],
    ["/ai-startup-founders", 0.86, "weekly"],
    ["/startup-intelligence", 0.86, "weekly"],
    ["/startup-funding-trends", 0.84, "weekly"],
    ["/press", 0.55, "monthly"],
    ["/research", 0.75, "weekly"],
    ["/news-gallery", 0.65, "weekly"],
    ["/newsletter", 0.65, "monthly"],
    ["/faq", 0.65, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/methodology", 0.7, "monthly"],
    ["/editorial-standards", 0.65, "monthly"],
    ["/careers", 0.6, "monthly"],
    ["/contact", 0.4, "yearly"],
  ] as const

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ([path, priority, changeFrequency]) => ({
      url: `${BASE}${path}`,
      lastModified: DEFAULT_DATE,
      priority,
      changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    })
  )

  // Only generate sector URLs that are backed by the actual registry data.
  const categoryEntries: MetadataRoute.Sitemap = [
    ...new Map(
      startups
        .map((startup) => startup.category)
        .filter((category): category is string => Boolean(category))
        .map((category) => [categoryToSlug(category), category] as const)
    ).entries(),
  ].map(([slug]) => ({
    url: `${BASE}/startups/${slug}`,
    lastModified: DEFAULT_DATE,
    changeFrequency: "daily",
    priority: 0.78,
  }))

  const startupEntries: MetadataRoute.Sitemap = startups
    .filter((startup) => startup.status === "approved" && startup.slug)
    .map((startup) => ({
      url: `${BASE}/startup/${startup.slug}`,
      lastModified: safeDate(startup.updated_at || startup.data_as_of || startup.created_at),
      changeFrequency: "weekly" as const,
      priority: startup.is_featured ? 0.9 : 0.75,
    }))

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: safeDate(post.updatedAt || post.updated || post.publishedAt || post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.65,
  }))

  const founderEntries: MetadataRoute.Sitemap = FOUNDERS.map((founder) => ({
    url: `${BASE}/founder-stories/${founder.slug}`,
    lastModified: safeDate(founder.updatedAt || founder.publishedAt || founder.createdAt),
    changeFrequency: "weekly" as const,
    priority: founder.featured ? 0.88 : 0.78,
  }))

  const founderCategoryEntries: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${BASE}/founder-stories/category/${category.slug}`,
    lastModified: DEFAULT_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }))

  const countryDirectory = await getCountryDirectory()
  const countryEntries: MetadataRoute.Sitemap = countryDirectory.map((country) => ({
    url: `${BASE}/startups/country/${country.slug}`,
    lastModified: DEFAULT_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.76,
  }))

  const cityDirectory = await getCityDirectory()
  const cityEntries: MetadataRoute.Sitemap = cityDirectory.map((city) => ({
    url: `${BASE}/startups/city/${city.slug}`,
    lastModified: DEFAULT_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }))

  const quizEntries: MetadataRoute.Sitemap = QUIZ_REGISTRY.map((quiz) => ({
    url: `${BASE}/quiz/${quiz.slug}`,
    lastModified: DEFAULT_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  /*
   * Intentionally excluded:
   * - /registry/:slug → permanent redirect to /startup/:slug
   * - /ufrn/:ufrn-id → duplicate credential view; page is noindex
   * - query-string registry/search pages → not stable landing pages
   * - blog category URLs → no dedicated route exists
   * - hard-coded founder names under /startup/* → can create 404s
   */
  return uniqueByUrl([
    ...staticEntries,
    ...categoryEntries,
    ...startupEntries,
    ...blogEntries,
    ...founderEntries,
    ...founderCategoryEntries,
    ...countryEntries,
    ...cityEntries,
    ...quizEntries,
  ])
}
