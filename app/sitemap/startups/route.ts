import { NextResponse } from "next/server"
import { fetchAllStartups } from "@/lib/google-sheets"

const BASE = "https://upforge.org"
const FALLBACK_DATE_STR = "2026-09-12"

// Helper function jo kisi bhi haal me invalid string standard se crash nahi hone degi
function cleanISOString(dateValue: any): string {
  if (!dateValue) return FALLBACK_DATE_STR
  
  const parsedDate = new Date(dateValue)
  if (isNaN(parsedDate.getTime())) return FALLBACK_DATE_STR
  
  // Directly extract YYYY-MM-DD to avoid native runtime runtime errors
  return parsedDate.toISOString().split("T")[0]
}

export async function GET() {
  try {
    const startups = await fetchAllStartups()
    const approvedStartups = startups.filter(s => s.status === "approved" || !s.status)

    // Dynamic xml entries mapping structure
    const sitemapEntries = approvedStartups.map((s) => {
      const lastMod = cleanISOString(s.updated_at || s.created_at)
      
      return `
        <url>
          <loc>${BASE}/startup/${s.slug}</loc>
          <lastmod>${lastMod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${s.is_featured ? "0.9" : "0.75"}</priority>
        </url>
      `
    }).join("")

    const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries}
    </urlset>`

    return new NextResponse(xmlSitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=60",
      },
    })
  } catch (error) {
    console.error("Error generating startups sub-sitemap route:", error)
    
    // Safety fallback xml block so the build NEVER blocks during prerendering
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE}/startup</loc>
        <lastmod>${FALLBACK_DATE_STR}</lastmod>
      </url>
    </urlset>`
    
    return new NextResponse(fallbackXml, {
      headers: { "Content-Type": "application/xml" },
    })
  }
}
