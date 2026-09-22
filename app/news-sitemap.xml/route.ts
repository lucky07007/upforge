import { NextResponse } from "next/server"
import { BLOG_POSTS } from "@/data/blog-posts"

const BASE_URL = "https://upforge.org"
const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const now = Date.now()

  const recent = BLOG_POSTS
    .map((post) => {
      const rawDate = post.publishedAt || post.updatedAt || post.date
      const date = new Date(rawDate)
      return { post, date }
    })
    .filter(({ date }) => !Number.isNaN(date.getTime()))
    .filter(({ date }) => now - date.getTime() >= 0 && now - date.getTime() <= NEWS_WINDOW_MS)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 100)

  const entries = recent.map(({ post, date }) => `
  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>UpForge Journal</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${date.toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`).join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${entries}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
