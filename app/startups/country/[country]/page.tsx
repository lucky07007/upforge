import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { getCountryDirectory } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"
export const revalidate = 3600

export async function generateStaticParams() {
  const countries = await getCountryDirectory()
  return countries.map((country) => ({ country: country.slug }))
}

async function getCountry(countrySlug: string) {
  const countries = await getCountryDirectory()
  return countries.find((country) => country.slug === countrySlug) || null
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: slug } = await params
  const country = await getCountry(slug)
  if (!country) return { title: "Country Startup Hub Not Found | UpForge", robots: { index: false, follow: true } }
  return {
    title: `${country.name} Startups — Verified Startup Database | UpForge`,
    description: `Explore ${country.count.toLocaleString()} verified startup listings from ${country.name} in the UpForge Global Startup Registry.`,
    keywords: [`${country.name} startups`, `${country.name} startup database`, `${country.name} startup registry`, `startups in ${country.name}`],
    alternates: { canonical: `${BASE}/startups/country/${country.slug}` },
    openGraph: { title: `${country.name} Startups | UpForge`, description: `Verified startup listings from ${country.name}.`, url: `${BASE}/startups/country/${country.slug}`, siteName: "UpForge", type: "website", images: [{ url: `${BASE}/og/registry.png`, width: 1200, height: 630, alt: `${country.name} Startups — UpForge` }] },
    robots: { index: true, follow: true },
  }
}

export default async function CountryStartupHub({ params }: { params: Promise<{ country: string }> }) {
  const { country: slug } = await params
  const country = await getCountry(slug)
  if (!country) notFound()

  const startups = [...country.startups].sort((a, b) => a.name.localeCompare(b.name))
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${country.name} Startups — UpForge`,
    "description": `Verified startup listings from ${country.name}.`,
    "url": `${BASE}/startups/country/${country.slug}`,
    "mainEntity": { "@type": "ItemList", "numberOfItems": startups.length, "itemListElement": startups.slice(0, 50).map((startup, index) => ({ "@type": "ListItem", "position": index + 1, "name": startup.name, "url": `${BASE}/startup/${startup.slug}` })) },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <nav className="text-xs font-mono text-muted-foreground"><Link href="/" className="hover:text-foreground">UpForge</Link><span className="mx-2">/</span><Link href="/global-startup-registry" className="hover:text-foreground">Global Registry</Link><span className="mx-2">/</span>{country.name}</nav>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl font-black tracking-tight">{country.name} Startups</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">Explore {country.count.toLocaleString()} verified startup listings from {country.name}, with direct links to company profiles, sectors, founders, websites, and UFRN records where available.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/registry" className="rounded-xl bg-foreground text-background px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider">Full Registry</Link><Link href="/global-startup-registry" className="rounded-xl border border-border px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider">Global Registry</Link></div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{startups.map((startup) => <Link key={startup.slug} href={`/startup/${startup.slug}`} className="group rounded-2xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors"><h2 className="font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{startup.name}</h2><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{startup.category || "Startup"}</p><p className="mt-3 text-sm text-muted-foreground line-clamp-3">{startup.description_short || startup.description || `${startup.name} — UpForge registry profile.`}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider">View profile <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}</div>
        </div>
      </main>
    </>
  )
}
