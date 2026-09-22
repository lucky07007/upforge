import { Metadata } from "next"
import { notFound } from "next/navigation"   
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowRight, Globe } from "lucide-react"
import { 
  getAllCountries, 
  getFoundersByCountry,
  getCountryFlag,
  FOUNDERS
} from "@/lib/founders/data"
import { JsonLd } from "@/components/seo/json-ld"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"
import { FounderCard } from "@/components/founder-stories/founder-card"

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  const countries = getAllCountries()
  return countries.map(c => ({ country: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countrySlug } = await params
  const countries = getAllCountries()
  const matched = countries.find(c => c.slug === countrySlug)
  
  if (!matched) {
    return {
      title: "Country Founder Intelligence | UpForge",
      description: "Explore verified founder stories and intelligence across global startup hubs."
    }
  }

  const baseUrl = "https://upforge.org"
  const url = `${baseUrl}/founder-stories/country/${countrySlug}`
  const title = `${matched.flag} ${matched.name} Founder Stories & Intelligence | UpForge`
  const description = `Explore ${matched.count} verified tech founder profiles, leadership analysis, and startup data in ${matched.name} on UpForge.`

  return {
    title,
    description,
    keywords: [
      `${matched.name} founders`,
      `${matched.name} tech CEOs`,
      `verified ${matched.name} startup leaders`,
      `UpForge ${matched.name}`
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpForge",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  }
}

export default async function CountryPage({ params }: PageProps) {
  const { country: countrySlug } = await params
  const countries = getAllCountries()
  const currentCountry = countries.find(c => c.slug === countrySlug)
  
  if (!currentCountry) notFound()

  const founders = getFoundersByCountry(countrySlug)
  const baseUrl = "https://upforge.org"
  const pageUrl = `${baseUrl}/founder-stories/country/${countrySlug}`

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${currentCountry.name} Founder Stories — UpForge`,
    "description": `Verified founder profiles and editorial analysis in ${currentCountry.name}.`,
    "url": pageUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": founders.length,
      "itemListElement": founders.map((f, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${baseUrl}/founder-stories/${f.slug}`,
        "name": `${f.name} — ${f.role} of ${f.company}`
      }))
    }
  }

  return (
    <>
      <JsonLd data={collectionSchema} />

      <div className="bg-background text-foreground min-h-screen selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-200">
        
        <main className="max-w-[1300px] mx-auto px-4 md:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16">
          
          {/* Masthead Header */}
          <div className="text-center py-4 sm:py-6 border-b border-border mb-8">
            <span className="inline-block text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
              THE FOUNDER CHRONICLE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-3 flex items-center justify-center gap-3">
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.name} Founder Intelligence</span>
            </h1>
            <p className="font-serif text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Deep-dive editorial profiles of verified tech founders, CEOs, and innovators in {currentCountry.name}.
            </p>
          </div>

          {/* Filter By Country Section */}
          <section className="mb-10 p-4 sm:p-5 rounded-2xl bg-card/60 border border-border/80 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
              <h2 className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Filter By Country
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                Showing {founders.length} of {FOUNDERS.length} Global Profiles
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              <Link
                href="/founder-stories"
                className="shrink-0 px-4 py-2 rounded-full bg-card border border-border text-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 font-mono text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5"
              >
                <span>🌐</span>
                <span>All Countries ({FOUNDERS.length})</span>
              </Link>

              {countries.map((c) => {
                const isActive = c.slug === countrySlug
                return (
                  <Link
                    key={c.slug}
                    href={`/founder-stories/country/${c.slug}`}
                    className={`shrink-0 px-4 py-2 rounded-full font-mono text-xs transition-all snap-start flex items-center gap-1.5 ${
                      isActive
                        ? "bg-amber-500 text-black font-bold border border-amber-500 shadow-sm"
                        : "bg-card border border-border text-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 font-medium shadow-2xs"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-black/20 text-black font-bold' : 'bg-muted text-muted-foreground'}`}>
                      {c.count}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Founders Grid */}
          <section className="mb-16 sm:mb-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {founders.map((f) => (
                <FounderCard key={f.id} founder={f} />
              ))}
            </div>
          </section>

        </main>

        <FounderNewsletter />
      </div>
    </>
  )
}
