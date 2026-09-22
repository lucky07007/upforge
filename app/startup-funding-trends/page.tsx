import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { getFundingReports } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { reports, articles } = getFundingReports()
  return {
    title: "Startup Funding Trends — Venture Capital & Funding Intelligence | UpForge",
    description: `Explore UpForge's published startup funding intelligence, including ${reports.length} venture reports and ${articles.length}+ related funding articles.`,
    keywords: ["startup funding trends", "venture capital trends", "startup funding data", "VC funding", "startup investment trends", "funding intelligence"],
    alternates: { canonical: `${BASE}/startup-funding-trends` },
    openGraph: {
      title: "Startup Funding Trends — UpForge",
      description: "Venture capital, funding, valuation, and capital-market intelligence from UpForge.",
      url: `${BASE}/startup-funding-trends`,
      siteName: "UpForge",
      type: "website",
      images: [{ url: `${BASE}/og/global-registry.png`, width: 1200, height: 630, alt: "UpForge Startup Funding Trends" }],
    },
    robots: { index: true, follow: true },
  }
}

export default function StartupFundingTrendsPage() {
  const { reports, articles } = getFundingReports()
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-muted/20"><div className="max-w-6xl mx-auto px-4 md:px-8 py-3 text-xs font-mono text-muted-foreground"><Link href="/" className="hover:text-foreground">UpForge</Link><span className="mx-2">/</span>Startup Funding Trends</div></div>
      <section className="border-b border-border bg-card"><div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20"><span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400"><TrendingUp className="h-3.5 w-3.5" /> Venture Intelligence</span><h1 className="mt-4 max-w-4xl font-serif text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">Startup Funding Trends</h1><p className="mt-5 max-w-3xl text-base md:text-xl leading-relaxed text-muted-foreground">A focused index of UpForge's published funding, venture capital, valuation, and capital-market analysis for founders, investors, and startup researchers.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/startup-intelligence" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background">All Startup Intelligence <ArrowRight className="h-4 w-4" /></Link><Link href="/research" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider">Research Hub</Link></div></div></section>
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold">Funding intelligence reports</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">These pages are the canonical homes for UpForge's existing venture and funding analysis. We surface published research rather than inventing new market numbers for SEO.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-5">{reports.map((report) => <Link key={report.slug} href={`/intelligence/${report.slug}`} className="group rounded-2xl border border-border bg-card p-6 hover:border-amber-500/50 transition-colors"><p className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{report.category}</p><h3 className="mt-2 font-serif text-xl font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{report.title}</h3><p className="mt-3 text-sm text-muted-foreground leading-relaxed">{report.subtitle}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider">Read report <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></span></Link>)}</div>
        <h2 className="mt-14 font-serif text-2xl md:text-3xl font-bold">Related funding coverage</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-5">{articles.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors"><p className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{post.category}</p><h3 className="mt-2 font-bold leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400">{post.title}</h3><p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p></Link>)}</div>
        <div className="mt-14 rounded-3xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-10"><h2 className="font-serif text-2xl font-bold">Use funding research with registry data</h2><p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">After reading a funding theme, move into the UpForge registry to examine the companies, sectors, founders, and geographies represented in the dataset.</p><div className="mt-5 flex flex-wrap gap-4 text-xs font-mono font-bold uppercase tracking-wider"><Link href="/global-startup-registry">Global registry →</Link><Link href="/verified-startup-database">Verified database →</Link></div></div>
      </section>
    </main>
  )
}
