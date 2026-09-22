// app/startups/[category]/page.tsx — Google Sheets powered (no Supabase)

import { fetchAllStartups } from "@/lib/google-sheets"
import { formatFounders } from "@/types/startup"
import { getSectorHero } from "@/lib/sector-heroes"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight, Search, ShieldCheck } from "lucide-react"
import {
  categoryToSlug, getDisplayName, slugToDbCategory,
  generateCategoryDescription,
} from "@/lib/categories"
import { generateCategoryKeywords } from "@/lib/seo-keywords"

const PAGE_SIZE = 24
const BASE_URL = "https://upforge.org"

interface PageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page?: string; q?: string }>
}

interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founded_year?: number | null; city?: string | null
  category?: string | null; is_featured?: boolean
}

async function getAllDbCategories(): Promise<string[]> {
  const all = await fetchAllStartups()
  return [...new Set(all.map(s => s.category).filter(Boolean) as string[])].sort()
}

async function getCategoryStartups(dbCat: string, page: number, q: string) {
  const all = await fetchAllStartups()
  let filtered = all.filter(s => s.category?.toLowerCase() === dbCat.toLowerCase())
  if (q) {
    const lq = q.toLowerCase()
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(lq) ||
      (s.description?.toLowerCase() ?? "").includes(lq) ||
      formatFounders(s.founders).toLowerCase().includes(lq)
    )
  }
  filtered.sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1
    if (!a.is_featured && b.is_featured) return 1
    return a.name.localeCompare(b.name)
  })
  const total = filtered.length
  const from = (page - 1) * PAGE_SIZE
  return { startups: filtered.slice(from, from + PAGE_SIZE) as StartupRow[], total }
}

export async function generateStaticParams() {
  const cats = await getAllDbCategories()
  const seen = new Set<string>()
  return cats.reduce<{ category: string }[]>((acc, cat) => {
    const s = categoryToSlug(cat)
    if (!seen.has(s)) { seen.add(s); acc.push({ category: s }) }
    return acc
  }, [])
}

export const revalidate = 300


export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { category: slug } = await params
  const sp = await searchParams
  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug, all)

  if (!dbCat) return { title: "Not Found | UpForge Registry", robots: { index: false, follow: false } }

  const startups = await fetchAllStartups()
  const count = startups.filter(s => s.category?.toLowerCase() === dbCat.toLowerCase()).length

  const displayName = getDisplayName(dbCat)
  const n = count.toLocaleString()
  const title = `${displayName} Startups Global Registry: Companies Top Companies & Innovators Innovators | UpForge`
  const description = `Discover ${n}+ verified ${displayName} startups globally. View founding teams, cities, valuations, and registry IDs on the UpForge Global Startup Registry.`

  const keywords = generateCategoryKeywords(displayName, count)
  const url = `${BASE_URL}/startups/${slug}`
  const hasQueryVariant = Boolean(sp?.q || Number(sp?.page || 1) > 1)

  return {
    title, description, keywords,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: "UpForge Global Registry",
      images: [{ url: `${BASE_URL}/og/registry.png`, width: 1200, height: 630 }],
      locale: "en_US", type: "website"
    },
    twitter: { card: "summary_large_image", title, description, images: [`${BASE_URL}/og/registry.png`] },
    robots: { index: !hasQueryVariant, follow: true, googleBot: { index: !hasQueryVariant, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params
  const sp = await searchParams
  const page = Math.max(1, Number(sp?.page ?? 1))
  const q = sp?.q?.trim() ?? ""

  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug, all)
  if (!dbCat) notFound()

  const [{ startups, total }, related] = await Promise.all([
    getCategoryStartups(dbCat, page, q),
    Promise.resolve(all.filter(c => categoryToSlug(c) !== slug).sort((a, b) => a.localeCompare(b)).slice(0, 12)),
  ])
  if (total === 0 && !q) notFound()

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const displayName = getDisplayName(dbCat)
  const description = generateCategoryDescription(dbCat, total)
  const url = `${BASE_URL}/startups/${slug}`
  const catSlug = (c: string) => categoryToSlug(c)

  const pgHref = (p: number) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (p > 1) params.set("page", String(p))
    const s = params.toString()
    return `/startups/${slug}${s ? `?${s}` : ""}`
  }
  const winSize = Math.min(5, totalPages)
  const winStart = page <= 3 || totalPages <= 5 ? 1 : page >= totalPages - 2 ? totalPages - 4 : page - 2
  const pgNums = Array.from({ length: winSize }, (_, i) => winStart + i)

  const schemas = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "UpForge", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Registry", "item": `${BASE_URL}/registry` },
        { "@type": "ListItem", "position": 3, "name": "Sectors", "item": `${BASE_URL}/registry/sectors` },
        { "@type": "ListItem", "position": 4, "name": `${displayName} Startups`, item: url },
      ]
    },
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#cp`,
      "name": `Top ${displayName} Startups Database`, "description": description,
      "url": url, "inLanguage": "en-US", "numberOfItems": total
    },
    {
      "@context": "https://schema.org", "@type": "ItemList",
      "name": `Top ${displayName} Startups Directory`,
      "itemListElement": startups.slice(0, 10).map((s, i) => ({
        "@type": "ListItem", "position": i + 1, "name": s.name,
        "url": `${BASE_URL}/startup/${s.slug}`,
      }))
    },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Navbar />

      {/* Header Container */}
      <div className="relative border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-2xl py-12 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-primary px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20">
                Global Sector Explorer
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">/ {displayName}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
              {displayName}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-light">
              {description}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-2 min-w-[200px]">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Verified Listings</span>
            <span className="text-4xl font-mono font-bold text-accent-gold text-glow">{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <form action={`/startups/${slug}`} method="GET" className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent-primary transition-colors" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              className="w-full bg-muted/40 border border-[var(--glass-border)] rounded-full pl-12 pr-32 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all font-light"
              placeholder={`Search ${total.toLocaleString()} ${displayName} records by name, keyword, or location...`}
            />
            <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 bg-accent-primary hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-6 rounded-full transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">

        {/* Results Stream */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--glass-border)]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {q ? `Search Results for "${q}"` : "Verified Directory"}
            </h2>
            {q && <Link href={`/startups/${slug}`} className="text-xs text-accent-primary hover:text-white transition-colors">Clear Search ✕</Link>}
          </div>

          {startups.length > 0 ? (
            <div className="space-y-4">
              {startups.map((s, idx) => (
                <Link key={s.id} href={`/startup/${s.slug}`} className="glass-card group flex flex-col sm:flex-row items-start sm:items-center p-5 gap-6">
                  <div className="w-16 h-16 rounded-xl bg-muted/40 border border-[var(--glass-border)] flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-accent-primary/50 transition-colors">
                    {s.logo_url
                      ? <Image src={s.logo_url} alt={s.name} width={64} height={64} className="object-contain" />
                      : <span className="font-bold text-xl text-muted-foreground">{s.name.charAt(0)}</span>
                    }
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent-primary transition-colors truncate">{s.name}</h3>
                      {s.is_featured && <span className="text-[10px] uppercase tracking-widest font-bold text-accent-gold border border-accent-gold/20 px-2 py-0.5 rounded-full bg-accent-gold/10">Featured</span>}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-1">{s.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-medium text-muted-foreground">
                      {s.city && <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" /> {s.city}</span>}
                      {s.founded_year && <span>Est. {s.founded_year}</span>}
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full border border-[var(--glass-border)] items-center justify-center group-hover:bg-accent-primary group-hover:text-white text-muted-foreground transition-all">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-[var(--glass-border)]">
              <span className="text-4xl text-muted-foreground mb-4 block">∅</span>
              <h3 className="text-xl font-bold text-foreground mb-2">No profiles found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or clear the filters to see all registry records.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[var(--glass-border)]">
              <Link href={pgHref(page - 1)} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--glass-border)] transition-colors ${page === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/40 hover:text-foreground'} text-muted-foreground`}>Prev</Link>
              {pgNums.map(p => (
                <Link key={p} href={pgHref(p)} className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-full transition-all ${p === page ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border border-[var(--glass-border)] text-muted-foreground hover:bg-muted/40 hover:text-foreground'}`}>{p}</Link>
              ))}
              <Link href={pgHref(page + 1)} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--glass-border)] transition-colors ${page === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/40 hover:text-foreground'} text-muted-foreground`}>Next</Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">

          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden text-center bg-[var(--glass-bg)]">
            <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-2xl pointer-events-none" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-gold mb-2 relative z-10">Free Listing</h3>
            <h4 className="text-xl font-bold text-foreground mb-4 relative z-10">Add your {displayName} startup to the registry</h4>
            <Link href="/submit" className="inline-block bg-foreground text-background font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-accent-gold hover:text-white transition-colors relative z-10">
              Submit Directory →
            </Link>
          </div>

          <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Registry Intelligence</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-foreground">Verified Coverage</span>
                <span className="text-sm font-bold text-accent-primary">100%</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-foreground">Pricing</span>
                <span className="text-sm font-bold text-accent-primary">Free forever</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-foreground">Authority Trust</span>
                <span className="text-sm font-bold text-accent-gold">UpForge Certified</span>
              </li>
            </ul>
          </div>

          {related.length > 0 && (
            <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Related Sectors</h3>
              <div className="flex flex-col gap-2">
                {related.map(c => (
                  <Link key={c} href={`/startups/${catSlug(c)}`} className="text-sm text-foreground hover:text-accent-secondary py-2 border-b border-border last:border-0 flex items-center justify-between group transition-colors">
                    <span>{getDisplayName(c)}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
