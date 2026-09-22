// app/research/page.tsx
// SERVER COMPONENT - World-Class Startup Research & Intelligence

import { Suspense } from "react"
import { Metadata } from "next"
import { fetchAllStartups } from "@/lib/google-sheets"
import { ResearchSearch } from "@/components/research/research-search"
import { ResearchCategories } from "@/components/research/research-categories"
import { ResearchInsights } from "@/components/research/research-insights"
import { JsonLd } from "@/components/seo/json-ld"
import { ArrowRight, Globe, Shield, Zap, Layers, GitCompare, Sparkles } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600

async function getDomain(): Promise<"org" | "in"> {
  return "org"
}


const ALL_COMPARISONS = [
  { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai", category: "AI Models", description: "Anthropic vs OpenAI — which AI assistant wins?" },
  { name: "ChatGPT vs Gemini", slug: "/compare/chatgpt-vs-gemini", category: "AI Models", description: "OpenAI vs Google — battle of the AI giants" },
  { name: "GitHub Copilot vs Cursor AI", slug: "/compare/github-copilot-vs-cursor-ai", category: "Developer Tools", description: "AI code completion vs AI-native editor" },
  { name: "Notion vs Coda", slug: "/compare/notion-vs-coda", category: "Productivity", description: "All-in-one workspace comparison for teams" },
  { name: "Notion vs Obsidian", slug: "/compare/notion-vs-obsidian", category: "Knowledge Management", description: "Cloud workspace vs local knowledge garden" },
  { name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch", category: "Design Tools", description: "Which UI/UX design tool is right for you?" },
  { name: "Canva vs CapCut", slug: "/compare/canva-vs-capcut", category: "Creative Tools", description: "Design platform vs video editing powerhouse" },
  { name: "Slack vs Teams", slug: "/compare/slack-vs-teams", category: "Collaboration", description: "Which team communication tool wins?" },
  { name: "Zoom vs Google Meet", slug: "/compare/zoom-vs-google-meet", category: "Video Conferencing", description: "Best video meeting platform for 2026" },
  { name: "iPhone vs Samsung", slug: "/compare/iphone-vs-samsung", category: "Smartphones", description: "iPhone 17 Pro Max vs Galaxy S25 Ultra" },
  { name: "Fiverr vs Upwork", slug: "/compare/fiverr-vs-upwork", category: "Freelance Platforms", description: "Which freelance marketplace is best?" },
  { name: "Stripe vs Razorpay", slug: "/compare/stripe-vs-razorpay", category: "Payment Gateways", description: "Global payments vs India's fintech champion" }
]

const DISPLAY_COUNT = 12
const displayedComparisons = ALL_COMPARISONS.slice(0, DISPLAY_COUNT)
const hasMoreComparisons = ALL_COMPARISONS.length > DISPLAY_COUNT

async function getResearchData() {
  const startups = await fetchAllStartups()
  const approved = startups.filter((s) => s.status === "approved")

  const categoryCounts: Record<string, number> = {}
  approved.forEach(item => {
    if (item.category) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    }
  })

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name, count]) => ({ name, count }))

  const totalStartups = approved.length

  const uniqueCountries = new Set(approved.map(c => c.country_code).filter(Boolean))
  const totalCountries = uniqueCountries.size || 0

  return {
    topCategories,
    totalStartups,
    totalCountries
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const canonicalUrl = isOrg ? "https://upforge.org/research" : "https://www.upforge.in/research"

  return {
    title: "Startup Research & Market Intelligence | UpForge Global Registry",
    description: "Research verified startups worldwide. Compare AI models, SaaS tools, and startup solutions. Access UFRN-verified data on thousands of companies. Free, forever.",
    keywords: ["startup research", "market intelligence", "startup database", "verified startups", "UFRN lookup", "AI comparison", "tool comparison"],
    alternates: { canonical: canonicalUrl, languages: { 'en': 'https://upforge.org/research', 'x-default': 'https://upforge.org/research' } },
    openGraph: { title: "Startup Research & Intelligence | UpForge", description: "Verified data on thousands of startups.", url: canonicalUrl, siteName: "UpForge", locale: "en", type: "website", images: [{ url: "https://upforge.org/og/research.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", site: "@UpForgeHQ", title: "Startup Research — UpForge", description: "Verified startup intelligence.", images: ["https://upforge.org/og/research.png"] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
  }
}

export default async function ResearchPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"
  
  const { topCategories, totalStartups, totalCountries } = await getResearchData()

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${baseUrl}/research#dataset`,
    "name": "UpForge Global Startup Research Database",
    "description": `Verified startup intelligence on ${totalStartups.toLocaleString()}+ companies across ${totalCountries}+ countries.`,
    "url": `${baseUrl}/research`,
    "creator": { "@type": "Organization", "name": "UpForge", "url": baseUrl },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isAccessibleForFree": true
  }

  return (
    <>
      <JsonLd data={datasetSchema} />
      
      <div className="bg-background min-h-screen text-foreground">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          
          {/* 1. MASTHEAD - Refined typography */}
          <section className="pt-8 pb-6 flex flex-col items-center text-center w-full">
            <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-mono">Research & Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold leading-[1.08] text-foreground mb-5 max-w-4xl tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>Startup Research & Intelligence</h1>
              <p className="font-serif text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">Access verified data on <span className="text-foreground font-semibold">{totalStartups.toLocaleString()}+ startups</span> across <span className="text-foreground font-semibold">{totalCountries}+ countries</span>. Compare tools, AI models, and SaaS platforms with confidence.</p>
            </div>
          </section>

          {/* 2. STATS BAR - Cleaner metrics display */}
          <section className="py-6 border-b border-border/60">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Verified Startups", value: totalStartups.toLocaleString(), icon: Shield },
                { label: "Global Markets", value: totalCountries.toString(), icon: Globe },
                { label: "Industry Sectors", value: topCategories.length.toString(), icon: Layers },
                { label: "Free Access", value: "Forever", icon: Zap }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-5 border border-border/80 bg-card/90 rounded-2xl shadow-xs hover:border-amber-500/60 transition-all duration-300 group">
                  <stat.icon className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="font-serif text-2xl font-bold text-foreground tracking-tight">{stat.value}</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. SEARCH - Elevated prominence */}
          <section className="py-10 border-b border-border/60">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-5">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold">Instant Lookup</span>
                <p className="text-xs text-muted-foreground font-serif mt-1">Search by startup name, UFRN, or keyword</p>
              </div>
              <ResearchSearch />
            </div>
          </section>

          {/* 4. POPULAR COMPARISONS - Premium card design */}
          <section className="py-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/40" />
              <h2 className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <GitCompare className="w-3.5 h-3.5" />
                Intelligence Reports
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/40" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedComparisons.map((comp, i) => (
                <Link key={i} href={comp.slug} className="group relative p-5 border border-border/80 bg-card/90 rounded-2xl hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-mono font-bold uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2 block">{comp.category}</span>
                    <h4 className="font-serif text-base font-bold text-foreground group-hover:text-amber-500 transition-colors leading-snug tracking-tight">{comp.name}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1.5 font-serif italic leading-relaxed line-clamp-2">{comp.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 pt-2 text-amber-600 dark:text-amber-400 text-[8px] font-mono font-bold uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all duration-200">
                    Full Analysis <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* VIEW ALL BUTTON - Centered, refined animation */}
            {hasMoreComparisons && (
              <div className="flex justify-center mt-10">
                <Link
                  href="/compare"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-amber-500 hover:text-black shadow-sm"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    View All {ALL_COMPARISONS.length} Comparisons
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            )}
          </section>

          {/* 5. CATEGORIES & INSIGHTS - Clean two-column layout */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 py-10">
            <ResearchCategories categories={topCategories} />
            <ResearchInsights />
          </div>

        </div>

        {/* 6. BOTTOM CTA - World-class finish */}
        <section className="bg-muted/20 border-t border-border/60 py-16 mt-8">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 text-center">
            <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md max-w-3xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-6">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 font-bold">UFRN Verified</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Get Your Startup Verified</h2>
              <p className="font-serif italic text-muted-foreground text-base mb-8 leading-relaxed">Join <span className="text-foreground font-semibold not-italic">{totalStartups.toLocaleString()}+ verified companies</span> and secure your UFRN credential today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/submit" className="group font-mono font-bold text-[10px] text-black bg-amber-500 rounded-full px-8 py-3.5 uppercase tracking-[0.2em] transition-all duration-300 hover:bg-amber-400 shadow-sm">
                  Submit Your Startup
                </Link>
                <Link href="/registry" className="group font-mono font-bold text-[10px] text-foreground border border-border/80 bg-card/80 rounded-full px-8 py-3.5 uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300">
                  Explore Registry
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
