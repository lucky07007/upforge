import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { getCityDirectory } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"
export const revalidate = 3600

export async function generateStaticParams() {
  const cities = await getCityDirectory()
  return cities.map((city) => ({ city: city.slug }))
}

async function getCity(citySlug: string) {
  const cities = await getCityDirectory()
  return cities.find((city) => city.slug === citySlug) || null
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const city = await getCity(slug)
  if (!city) return { title: "City Startup Hub Not Found | UpForge", robots: { index: false, follow: true } }
  return {
    title: `${city.name} Startups — Startup Database & Registry | UpForge`,
    description: `Explore ${city.count.toLocaleString()} verified startup listings from ${city.name}, ${city.country} in the UpForge Global Startup Registry.`,
    keywords: [`${city.name} startups`, `startups in ${city.name}`, `${city.name} startup database`, `${city.name} startup ecosystem`],
    alternates: { canonical: `${BASE}/startups/city/${city.slug}` },
    openGraph: { title: `${city.name} Startups | UpForge`, description: `Verified startup listings from ${city.name}.`, url: `${BASE}/startups/city/${city.slug}`, siteName: "UpForge", type: "website", images: [{ url: `${BASE}/og/registry.png`, width: 1200, height: 630, alt: `${city.name} Startups — UpForge` }] },
    robots: { index: true, follow: true },
  }
}

export default async function CityStartupHub({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = await getCity(slug)
  if (!city) notFound()
  const startups = [...city.startups].sort((a, b) => a.name.localeCompare(b.name))
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", "name": `${city.name} Startups — UpForge`, "description": `Verified startup listings from ${city.name}, ${city.country}.`, "url": `${BASE}/startups/city/${city.slug}`, "mainEntity": { "@type": "ItemList", "numberOfItems": startups.length, "itemListElement": startups.slice(0, 50).map((startup, index) => ({ "@type": "ListItem", "position": index + 1, "name": startup.name, "url": `${BASE}/startup/${startup.slug}` })) } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-background text-foreground"><div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16"><nav className="text-xs font-mono text-muted-foreground"><Link href="/" className="hover:text-foreground">UpForge</Link><span className="mx-2">/</span><Link href="/global-startup-registry" className="hover:text-foreground">Global Registry</Link><span className="mx-2">/</span>{city.name}</nav><h1 className="mt-5 font-serif text-4xl md:text-6xl font-black tracking-tight">{city.name} Startups</h1><p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">Explore {city.count.toLocaleString()} verified startup listings from {city.name}, {city.country}. These city hubs are only generated where the registry contains enough records to make the page useful.</p><div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{startups.map((startup) => <Link key={startup.slug} href={`/startup/${startup.slug}`} className="group rounded-2xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors"><h2 className="font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{startup.name}</h2><p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{startup.category || "Startup"}</p><p className="mt-3 text-sm text-muted-foreground line-clamp-3">{startup.description_short || startup.description || `${startup.name} — UpForge registry profile.`}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider">View profile <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}</div></div></main>
    </>
  )
}
