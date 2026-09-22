import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from "lucide-react"
import { FOUNDERS, getAllCountries, getCountryFlag } from "@/lib/founders/data"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"
import { JsonLd } from "@/components/seo/json-ld"
import { CountryFilterSection } from "@/components/founder-stories/country-filter-section"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://upforge.org/founder-stories"

  return {
    title: "Verified Founder Intelligence — The Founder Chronicle | UpForge",
    description: "Deep-dive editorial profiles of the world's most consequential founders, CEOs, and technology pioneers. Verified credentials and leadership analysis.",
    keywords: [
      "founder stories", "startup founders", "entrepreneur profiles",
      "global unicorn founders", "founder interviews", "AI founders",
      "tech billionaires", "startup success stories", "UpForge Founder Chronicle"
    ],
    alternates: { 
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Verified Founder Intelligence — The Founder Chronicle | UpForge",
      description: "Editorial deep-dives into the founders building tomorrow's economy.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "website",
      images: [{
        url: "https://images.upforge.org/Magazine/michael-truell-cursor-founder-news.jpg",
        width: 1200,
        height: 675,
        alt: "UpForge Founder Chronicle Cover"
      }]
    },
    twitter: {
      card: "summary_large_image",
      site: "@UpForgeHQ",
      title: "The Founder Chronicle — UpForge",
      description: "Deep-dive founder profiles. Real stories, verified data.",
    },
    robots: { index: true, follow: true }
  }
}

export default async function FounderStoriesPage() {
  const countries = getAllCountries()
  const latestHeroFounder = FOUNDERS[0]

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "The Founder Chronicle — UpForge",
    "description": "Editorial profiles of startup founders building the future economy",
    "url": "https://upforge.org/founder-stories",
    "numberOfItems": FOUNDERS.length,
    "itemListElement": FOUNDERS.map((founder, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://upforge.org/founder-stories/${founder.slug}`,
      "name": `${founder.name} — ${founder.role} of ${founder.company}`
    }))
  }

  return (
    <>
      <JsonLd data={collectionSchema} />

      <div className="bg-background text-foreground min-h-screen selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-200">
        
        <main className="max-w-[1300px] mx-auto px-4 md:px-8 pt-2 sm:pt-4 pb-12 sm:pb-16">
          
          {/* Header Masthead Banner - Direct start with THE FOUNDER CHRONICLE */}
          <section className="text-center py-4 sm:py-6 border-b border-border mb-8">
            <span className="inline-block text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
              THE FOUNDER CHRONICLE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">
              Verified Founder Intelligence
            </h1>
            <p className="font-serif text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              Deep-dive editorial profiles of the world's most consequential founders, CEOs, and technology pioneers.
            </p>

            {/* Institutional Trust Highlights Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 font-mono text-[11px] text-muted-foreground border-t border-border/40">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> {FOUNDERS.length} VERIFIED PROFILES
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> {countries.length} GLOBAL INNOVATION HUBS
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium hidden sm:inline text-amber-600 dark:text-amber-400">
                INSTITUTIONAL GRADE EDITORIAL
              </span>
            </div>
          </section>

          {/* Featured Cover Story Hero */}
          {latestHeroFounder && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
                <h2 className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  LATEST COVER STORY
                </h2>
                <div className="flex-1" />
                <span className="font-mono text-xs text-muted-foreground hidden sm:inline">Published {latestHeroFounder.publishedAt}</span>
              </div>

              <Link 
                href={`/founder-stories/${latestHeroFounder.slug}`}
                className="group grid lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl border border-border bg-card p-5 sm:p-8 hover:border-amber-500/50 transition-all duration-500 shadow-md overflow-hidden"
              >
                {/* 4:5 Portrait Card Image */}
                <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border border-border shadow-lg">
                  <Image
                    src={latestHeroFounder.cardImage || latestHeroFounder.imageUrl}
                    alt={`${latestHeroFounder.name}, ${latestHeroFounder.role} of ${latestHeroFounder.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/80 text-amber-300 border border-zinc-700">
                    {latestHeroFounder.category || "COVER STORY"}
                  </span>
                </div>

                {/* Info & One-Liner */}
                <div className="lg:col-span-7 flex flex-col justify-between py-1 space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {latestHeroFounder.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED FOUNDER
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif font-black text-2xl sm:text-4xl text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight mb-2">
                      {latestHeroFounder.name}
                    </h2>
                    <p className="font-sans font-bold text-lg sm:text-xl text-amber-600 dark:text-amber-400/90 mb-4">
                      {latestHeroFounder.role} of {latestHeroFounder.company}
                    </p>

                    <p className="font-serif italic text-base sm:text-xl text-foreground leading-relaxed mb-4">
                      "{latestHeroFounder.oneLiner || latestHeroFounder.deck}"
                    </p>

                    {latestHeroFounder.headline && (
                      <p className="font-serif text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {latestHeroFounder.headline}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span>{getCountryFlag(latestHeroFounder.country)}</span>
                      <span>{latestHeroFounder.city || "San Francisco"} • Est. {latestHeroFounder.founded || "2022"}</span>
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs sm:text-sm">
                      Read Cover Story <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Country Filter & Founders Grid Section */}
          <CountryFilterSection countries={countries} founders={FOUNDERS} />

        </main>

        <FounderNewsletter />
      </div>
    </>
  )
}
