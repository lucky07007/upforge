// perf: SSG + ISR revalidate 300s for zero-CPU hot-path execution
import { fetchAllStartups } from "@/lib/google-sheets"
import type { Metadata } from "next"
import { SITE_STATS } from "@/lib/site-stats"
import { FOUNDERS } from "@/lib/founders/data"
import { TrustStrip } from "@/components/homepage/TrustStrip"
import { ForbesIndex } from "@/components/forbes/forbes-index"
import { StartupIntelligenceJournal } from "@/components/forbes/startup-intelligence-journal"
import { ArrowRight, CheckCircle2, Rss } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://upforge.org"

  return {
    title: "UpForge — Global Startup Registry & Verified Founder Intelligence",
    description: `Discover ${SITE_STATS.trackedStartupsText} verified startups across ${SITE_STATS.countriesText} countries. Access UFRN credentials, deep-dive founder profiles, and global startup intelligence.`,
    keywords: [
      "startup registry",
      "founder database",
      "verified founders",
      "UpForge Founder Chronicle",
      "global startup database",
      "startup intelligence",
      "startup funding trends",
      "AI startup founders",
      "verified startup database",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "UpForge — Global Startup Registry & Founder Intelligence",
      description: `${SITE_STATS.trackedStartupsText} verified startups. Global founder database and startup intelligence.`,
      url: canonicalUrl,
      siteName: "UpForge",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://images.upforge.org/Magazine/michael-truell-cursor-founder-news.jpg",
          width: 1200,
          height: 675,
          alt: "UpForge Founder Intelligence Magazine Cover"
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "UpForge — Global Startup Registry & Founder Intelligence",
      description: `${SITE_STATS.trackedStartupsText} verified startups. Global founder database and startup intelligence.`,
      images: ["https://images.upforge.org/Magazine/michael-truell-cursor-founder-news.jpg"],
    },
    robots: { index: true, follow: true },
  }
}

export default async function HomePage() {
  const allStartups = await fetchAllStartups()

  const sortedStartups = [...allStartups].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1
    if (!a.is_featured && b.is_featured) return 1
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0
    return tb - ta
  })

  const indexStartups = sortedStartups.slice(0, 12)

  // FOUNDERS is sorted by publishedAt descending
  const heroFounder = FOUNDERS[0] // Michael Truell
  const latestFoundersStrip = FOUNDERS.slice(1, 7)

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-200">
      
      {/* Editorial Masthead Bar - Hidden on mobile view */}
      <header className="hidden md:block border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold text-foreground uppercase tracking-widest text-[10px] sm:text-[11px]">
              FOUNDER CHRONICLE • EDITION NO. 26
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline font-mono font-bold tracking-wider">GLOBAL REGISTRY & INTELLIGENCE</span>
          </div>

        </div>
      </header>

      {/* Main Magazine Container */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8 pt-6 sm:pt-8 pb-20">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO = LATEST FOUNDER ENTRY (Magazine Cover Treatment)          */}
        {/* ========================================================================= */}
        {heroFounder && (
          <section className="mb-12 sm:mb-16 border-b border-border pb-12 sm:pb-16">
            <Link 
              href={`/founder-stories/${heroFounder.slug}`}
              className="group grid lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-8 hover:border-amber-500/50 transition-all duration-300 shadow-xl overflow-hidden relative"
            >
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
              
              {/* Left Column: 4:5 Portrait Magazine Cover Image */}
              <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-muted border border-border shadow-md">
                <Image
                  src={heroFounder.cardImage || heroFounder.imageUrl}
                  alt={`${heroFounder.name}, ${heroFounder.role} of ${heroFounder.company} — UpForge Verified Founder`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Cover Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 text-black bg-amber-400 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded shadow-md">
                    COVER STORY
                  </span>
                  {heroFounder.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-xs">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white font-mono text-xs">
                  <p className="text-amber-300 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">{heroFounder.category || "AI & TECHNOLOGY"}</p>
                </div>
              </div>

              {/* Right Column: Magazine Masthead & Pull Quote */}
              <div className="lg:col-span-7 flex flex-col justify-between py-1 space-y-4 sm:space-y-6">
                <div>
                  {/* Eyebrow Label */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {heroFounder.category || "AI & TECHNOLOGY"}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      FEATURED PROFILE
                    </span>
                  </div>

                  {/* Serif Name Headline */}
                  <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-foreground leading-[1.1] tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                    {heroFounder.name}
                  </h1>

                  {/* Role / Company Subheading */}
                  <p className="font-sans font-bold text-lg sm:text-xl text-amber-600 dark:text-amber-400/90 tracking-wide mb-4">
                    {heroFounder.role} of {heroFounder.company}
                  </p>

                  {/* 1-2 Line Pull Quote Description */}
                  <div className="p-4 sm:p-5 rounded-xl bg-muted/60 border border-border backdrop-blur-sm mb-4">
                    <blockquote className="font-serif italic text-base sm:text-xl text-foreground leading-relaxed">
                      "{heroFounder.oneLiner || heroFounder.deck}"
                    </blockquote>
                  </div>

                  {heroFounder.headline && (
                    <p className="font-serif text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3">
                      {heroFounder.headline}
                    </p>
                  )}
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-4 sm:pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                    <span>Published {heroFounder.publishedAt}</span>
                    <span>•</span>
                    <span>{heroFounder.city || "San Francisco"}</span>
                  </div>

                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background font-bold text-xs uppercase tracking-wider transition-all group-hover:translate-x-1 shadow-md">
                    Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: LATEST FOUNDERS HORIZONTAL STRIP                               */}
        {/* ========================================================================= */}
        <section className="mb-14 sm:mb-20">
          <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-border">
            <div className="flex items-center gap-2.5">
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-foreground">
                Latest Verified Founders
              </h2>
            </div>

            <Link
              href="/founder-stories"
              aria-label="View all verified founder stories"
              className="font-mono text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              All<ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
            {latestFoundersStrip.map((f) => (
              <Link
                key={f.id}
                href={`/founder-stories/${f.slug}`}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <Image
                    src={f.cardImage || f.imageUrl}
                    alt={`${f.name}, ${f.role} of ${f.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/80 text-amber-300 border border-zinc-800">
                      {f.category || "FOUNDER"}
                    </span>
                    {f.verified && (
                      <span className="text-emerald-300 bg-black/80 p-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {f.name}
                    </h3>
                    <p className="font-mono text-[10px] text-muted-foreground line-clamp-1">
                      {f.role} • {f.company}
                    </p>
                  </div>
                  <p className="font-serif text-[11px] sm:text-xs text-muted-foreground line-clamp-2 italic">
                    "{f.oneLiner || f.deck}"
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Strip */}
        <div className="mb-14 sm:mb-20">
          <TrustStrip />
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: GLOBAL STARTUP REGISTRY INDEX                                  */}
        {/* ========================================================================= */}
        <section className="mb-14 sm:mb-20">
          <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-border">
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-foreground">
              Verified Index
            </h2>
            <Link
              href="/registry"
              aria-label="View full verified startup registry"
              className="font-mono text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              All <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>

          <ForbesIndex startups={indexStartups} />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: STARTUP INTELLIGENCE JOURNAL                                    */}
        {/* ========================================================================= */}
        <section className="mb-14 sm:mb-20">
          <StartupIntelligenceJournal />
        </section>

      </main>

      <section className="border-t border-border bg-card/40 py-12 sm:py-16">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest">Explore UpForge</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-black text-foreground">Start with the right intelligence hub</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">Move from broad startup discovery to verified registry data, founder profiles, and funding research through dedicated topic hubs.</p>
            </div>
            <Link href="/global-startup-registry" className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 hover:underline">Global Registry →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Global Startup Registry", "Discover startups worldwide by company, sector and geography.", "/global-startup-registry"],
              ["Verified Startup Database", "Understand UFRN records and the UpForge registry standard.", "/verified-startup-database"],
              ["AI Startup Founders", "Explore founder profiles across AI and emerging technology.", "/ai-startup-founders"],
              ["Startup Funding Trends", "Read venture, funding and valuation intelligence.", "/startup-funding-trends"],
            ].map(([title, text, href]) => (
              <Link key={href} href={href} className="group rounded-2xl border border-border bg-background p-5 hover:border-amber-500/50 transition-colors">
                <h3 className="font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <span className="mt-4 inline-flex text-[10px] font-mono font-bold uppercase tracking-wider">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Register Startup Banner */}
      <section className="bg-muted/40 border-t border-border py-12 sm:py-16">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">VERIFIED GLOBAL REGISTRY</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-foreground mb-2 sm:mb-3">
                Register Your Startup Globally
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
                Get your official UFRN credential. Appear in the global founder database. Attract international investors. Free submission.
              </p>
            </div>
            <Link
              href="/submit"
              className="font-mono font-bold text-xs text-background bg-foreground hover:opacity-90 px-6 sm:px-8 py-3.5 rounded-xl uppercase tracking-widest transition-all shrink-0 whitespace-nowrap shadow-lg"
            >
              Apply For Listing →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
