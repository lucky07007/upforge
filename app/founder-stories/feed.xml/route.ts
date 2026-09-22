import { FOUNDERS } from "@/lib/founders/data" 

export async function GET() {
  const baseUrl = "https://upforge.org"
  const buildDate = new Date().toUTCString()

  const itemsXml = FOUNDERS.map((f) => {
    const pubDate = new Date(f.publishedAt || f.createdAt).toUTCString()
    const link = `${baseUrl}/founder-stories/${f.slug}`
    const category = f.category || "General"

    return `
    <item>
      <title><![CDATA[${f.name} — ${f.role} of ${f.company}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${category}]]></category>
      <description><![CDATA[${f.oneLiner || f.deck || f.headline}]]></description>
      <media:content url="${f.newsImage || f.cardImage || f.imageUrl}" medium="image" type="image/jpeg" />
    </item>`
  }).join("")

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>UpForge Founder Stories — Global Founder Intelligence</title>
    <link>${baseUrl}/founder-stories</link>
    <description>Magazine-style editorial founder stories, verified UFRN profiles, and startup founder intelligence from UpForge.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/founder-stories/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=14400, stale-while-revalidate=86400",
    },
  })
}
