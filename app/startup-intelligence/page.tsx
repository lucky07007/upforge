import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, Newspaper } from "lucide-react"
import { INTELLIGENCE_REPORTS } from "@/lib/intelligenceData"
import { BLOG_POSTS } from "@/data/blog-posts"

const BASE = "https://upforge.org"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const reports = Object.values(INTELLIGENCE_REPORTS)
  return {
    title: "Startup Intelligence — Research, Reports & Market Analysis | UpForge",
    description: `Read UpForge startup intelligence: ${reports.length} market reports, founder analysis, sector research, and data-led startup coverage.`,
    keywords: ["startup intelligence", "startup research", "startup market analysis", "startup reports", "venture intelligence", "founder intelligence"],
    alternates: { canonical: `${BASE}/startup-intelligence` },
    openGraph: {
      title: "Startup Intelligence — UpForge Research",
      description: "Market reports, founder intelligence, sector analysis, and startup research from UpForge.",
      url: `${BASE}/startup-intelligence`,
      siteName: "UpForge",
      type: "website",
      images: [{ url: `${BASE}/og/founder-chronicle.png`, width: 1200, height: 630, alt: "UpForge Startup Intelligence" }],
    },
    robots: { index: true, follow: true },
  }
}

export default function StartupIntelligencePage() {
  const reports = Object.values(INTELLIGENCE_REPORTS)
  const latestArticles = BLOG_POSTS.slice(0, 9)

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "UpForge Startup Intelligence",
    "description": "Startup market research, intelligence reports, founder analysis, and editorial coverage.",
    "url": `${BASE}/startup-intelligence`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": reports.length + latestArticles.length,
      "itemListElement": [...reports, ...latestArticles].slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "url": `${BASE}/${"slug" in item && "category" in item && "summary" in item ? `intelligence/${item.slug}` : `blog/${item.slug}`}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-muted/20"><div className="max-w-6xl mx-auto px-4 md:px-8 py-3 text-xs font-mono text-muted-foreground"><Link href="/" className="hover:text-foreground">UpForge</Link><span className="mx-2">/</span>Startup Intelligence</div></div>
        <section className="border-b border-border bg-card"><div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20"><span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Research & Analysis</span><h1 className="mt-4 max-w-4xl font-serif text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">Startup Intelligence</h1><p className="mt-5 max-w-3xl text-base md:text-xl leading-relaxed text-muted-foreground">A connected research layer for startup markets: intelligence reports, founder stories, sector analysis, funding coverage, and registry-backed discovery.</p><div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl"><div className="rounded-2xl border border-border p-5"><BarChart3 className="h-5 w-5 text-amber-500" /><div className="mt-3 text-3xl font-black font-mono">{reports.length}</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Intelligence reports</div></div><div className="rounded-2xl border border-border p-5"><BookOpen className="h-5 w-5 text-amber-500" /><div className="mt-3 text-3xl font-black font-mono">{latestArticles.length}+</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Recent journal items</div></div><div className="rounded-2xl border border-border p-5 col-span-2 md:col-span-1"><Newspaper className="h-5 w-5 text-amber-500" /><div className="mt-3 text-3xl font-black font-mono">Global</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Editorial scope</div></div></div></div></section>
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold">Intelligence reports</h2><p className="mt-2 text-muted-foreground max-w-3xl">Read structured market briefings with executive summaries, key metrics, tables, and founder takeaways.</p>
          <div className="mt-6 grid md:grid-cols-2 gap-5">{reports.map((report) => <Link key={report.slug} href={`/intelligence/${report.slug}`} className="group rounded-2xl border border-border bg-card p-6 hover:border-amber-500/50 transition-colors"><p className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{report.category}</p><h3 className="mt-2 font-serif text-xl font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{report.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.subtitle}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider">Read report <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></span></Link>)}</div>
          <div className="mt-14 flex items-center justify-between gap-4"><div><h2 className="font-serif text-2xl md:text-3xl font-bold">Startup Journal</h2><p className="mt-2 text-muted-foreground">Timely editorial coverage connected to founders, sectors, and funding themes.</p></div><Link href="/blog" className="text-xs font-mono font-bold uppercase tracking-wider hover:text-amber-500">All articles →</Link></div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">{latestArticles.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors"><p className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{post.category}</p><h3 className="mt-2 font-bold leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400">{post.title}</h3><p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p></Link>)}</div>
          <div className="mt-14 rounded-3xl border border-border bg-muted/20 p-7 md:p-10"><h2 className="font-serif text-2xl md:text-3xl font-bold">Connect intelligence to the registry</h2><p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">Use the research layer to understand a market, then move directly into the companies and founders represented in UpForge's registry.</p><div className="mt-5 flex flex-wrap gap-4 text-xs font-mono font-bold uppercase tracking-wider"><Link href="/global-startup-registry">Global registry →</Link><Link href="/verified-startup-database">Verified database →</Link><Link href="/ai-startup-founders">AI founders →</Link></div></div>
        </section>
      </main>
    </>
  )
}
