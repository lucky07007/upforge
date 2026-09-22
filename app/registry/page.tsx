import { cache } from "react"
import { queryStartups, getSheetFilters } from "@/lib/google-sheets"
import type { Startup } from "@/types/startup"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight, Search, ShieldCheck, Filter, X } from "lucide-react"

export const revalidate = 300

const PAGE_SIZE = 12
const BASE_URL = "https://upforge.org"

interface PageProps {
  searchParams: Promise<{
    page?: string; q?: string; year?: string; sort?: string
    sector?: string; country?: string
  }>
}

// ─── DATA FETCHERS (Google Sheets) ───
const getData = cache(async (
  q: string, year: string, sort: string,
  cat: string, country: string, page: number
) => {
  return queryStartups({ q, year, sort, category: cat, country, page, pageSize: PAGE_SIZE })
})

const getFilters = cache(async () => {
  return getSheetFilters()
})

// ─── HELPERS ───

function buildPageUrl(page: number, extra?: Record<string, string>): string {
  const p = new URLSearchParams()
  if (extra?.q)       p.set("q", extra.q)
  if (extra?.year)    p.set("year", extra.year)
  if (extra?.sort && extra.sort !== "name") p.set("sort", extra.sort)
  if (extra?.sector)  p.set("sector", extra.sector)
  if (extra?.country) p.set("country", extra.country)
  if (page > 1)       p.set("page", String(page))
  const s = p.toString()
  return `${BASE_URL}/registry${s ? `?${s}` : ""}`
}

function buildDynamicTitle(sp: {
  q?: string; year?: string; sort?: string; sector?: string; country?: string; page?: string
}, total: number): string {
  const n = total > 0 ? total.toLocaleString() : "1,000+"
  const pg = Number(sp?.page ?? 1)
  const pgSuffix = pg > 1 ? ` — Page ${pg}` : ""
  if (sp?.q)      return `"${sp.q}" Startup Search — Global Registry${pgSuffix} | UpForge`
  if (sp?.sector) return `${sp.sector} Startups — Global Registry${pgSuffix} | UpForge`
  if (sp?.country) return `${sp.country} Startups — Global Registry${pgSuffix} | UpForge`
  if (sp?.year)   return `Startups Founded ${sp.year} — Global Registry${pgSuffix} | UpForge`
  if (pg > 1)     return `Global Startup Registry — Page ${pg} | UpForge`
  return `Global Startup Registry 2026 — ${n}+ Verified Startups | UpForge`
}

function buildDynamicDescription(sp: {
  q?: string; year?: string; sort?: string; sector?: string; country?: string
}, total: number): string {
  const n = total > 0 ? total.toLocaleString() : "1,000+"
  if (sp?.sector) return `Browse ${n}+ verified ${sp.sector} startups on UpForge Global Registry. Every listing comes from the vetted UpForge registry source and can carry a unique UFRN. Free to access.`
  if (sp?.country) return `Explore verified startups from ${sp.country} on UpForge Global Registry. ${n}+ listings, each with a unique UFRN identifier. Free to access.`
  if (sp?.year)   return `Discover ${n}+ startups founded in ${sp.year} on UpForge Global Registry. Every listing is classified as verified under the UpForge registry standard and assigned a UFRN.`
  if (sp?.q)      return `Search results for "${sp.q}" across ${n}+ verified global startups on UpForge Registry. Find founders, sectors, cities and more.`
  return `The open, independent, verified global registry of ${n}+ startups. Every listing is sourced from the vetted registry dataset and assigned a unique UpForge Registry Number (UFRN). Search by founder, sector, city, country, year. Free to access, forever.`
}

// ─── METADATA ───

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const { total } = await getData("", "", "name", "", "", 1)
  const page = Math.max(1, Number(sp?.page ?? 1))
  const isFiltered = !!(sp?.q || sp?.year || sp?.sector || sp?.country)
  const sort = sp?.sort ?? "name"

  const title       = buildDynamicTitle(sp ?? {}, total)
  const description = buildDynamicDescription(sp ?? {}, total)

  const canonicalParams: Record<string, string> = {}
  if (sp?.q)           canonicalParams.q       = sp.q
  if (sp?.year)        canonicalParams.year    = sp.year
  if (sort !== "name") canonicalParams.sort    = sort
  if (sp?.sector)      canonicalParams.sector  = sp.sector
  if (sp?.country)     canonicalParams.country = sp.country
  const canonicalUrl = buildPageUrl(page, canonicalParams)

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const prevUrl = page > 1          ? buildPageUrl(page - 1, canonicalParams) : undefined
  const nextUrl = page < totalPages ? buildPageUrl(page + 1, canonicalParams) : undefined
  const shouldIndex = !isFiltered && page === 1 && sort === "name"

  return {
    title,
    description,
    keywords: [
      "global startup registry", "verified startup database", "UFRN startup registry number",
      "open startup data", "startup proof of existence", "independent startup registry",
      "Indian startup founders 2026", "India unicorn founders", "upforge registry",
      "startup verification", "startup database", "global startup database 2026",
      "startup directory", "startup search", "founder registry",
    ],
    alternates: {
      canonical: canonicalUrl,
      ...(prevUrl || nextUrl ? {
        types: {
          ...(prevUrl ? { prev: prevUrl } : {}),
          ...(nextUrl ? { next: nextUrl } : {}),
        },
      } : {}),
      languages: {
        "en":    canonicalUrl,
        "en-US": canonicalUrl,
        "en-IN": canonicalUrl,
        "x-default": `${BASE_URL}/registry`,
      },
    },
    openGraph: {
      title, description,
      url: canonicalUrl,
      siteName: "UpForge Global Registry",
      images: [{ url: `${BASE_URL}/og/startup-default.png`, width: 1200, height: 630, alt: title }],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title, description,
      site: "@UpForgeHQ",
      creator: "@UpForgeHQ",
      images: [`${BASE_URL}/og/startup-default.png`],
    },
    robots: {
      index: shouldIndex, follow: true,
      googleBot: {
        index: shouldIndex, follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: { "speakable-css-selector": ".mast-h1,.mast-tagline,.results-q" },
  }
}

// ─── PAGE ───

export default async function RegistryPage({ searchParams }: PageProps) {
  const sp      = await searchParams
  const q       = sp?.q?.trim()       ?? ""
  const year    = sp?.year?.trim()    ?? ""
  const sort    = sp?.sort?.trim()    ?? "name"
  const cat     = sp?.sector?.trim()  ?? ""
  const country = sp?.country?.trim() ?? ""
  const page    = Math.max(1, Number(sp?.page ?? 1))

  const [{ startups, total }, { years, cats, countries }] = await Promise.all([
    getData(q, year, sort, cat, country, page),
    getFilters(),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = !!(q || year || cat || country || (sort && sort !== "name"))

  const qs = (ov: Record<string, string | undefined>) => {
    const base: Record<string, string | undefined> = {
      q:       q       || undefined,
      year:    year    || undefined,
      sort:    sort !== "name" ? sort : undefined,
      sector:  cat     || undefined,
      country: country || undefined,
      page:    page > 1 ? String(page) : undefined,
    }
    const m = { ...base, ...ov }
    const p = new URLSearchParams()
    Object.entries(m).forEach(([k, v]) => { if (v) p.set(k, v) })
    const s = p.toString()
    return `/registry${s ? `?${s}` : ""}`
  }

  const pgHref = (p: number) => qs({ page: p === 1 ? undefined : String(p) })

  const winSize  = Math.min(5, totalPages)
  const winStart =
    page <= 3 || totalPages <= 5
      ? 1
      : page >= totalPages - 2
      ? totalPages - 4
      : page - 2
  const pgNums = Array.from({ length: winSize }, (_, i) => winStart + i)

  const featured =
    page === 1 && !isFiltered
      ? startups.filter(s => s.is_featured).slice(0, 3)
      : []

  const featIds = new Set(featured.map(s => s.id))
  const grid =
    page === 1 && !isFiltered
      ? startups.filter(s => !featIds.has(s.id))
      : startups

  const baseNum = (page - 1) * PAGE_SIZE
  const activeFilterCount = [year, cat, country, sort !== "name" ? sort : ""].filter(Boolean).length

  const canonicalParams: Record<string, string> = {}
  if (q)             canonicalParams.q       = q
  if (year)          canonicalParams.year    = year
  if (sort !== "name") canonicalParams.sort  = sort
  if (cat)           canonicalParams.sector  = cat
  if (country)       canonicalParams.country = country
  const canonicalUrl = buildPageUrl(page, canonicalParams)
  const prevUrl = page > 1          ? buildPageUrl(page - 1, canonicalParams) : undefined
  const nextUrl = page < totalPages ? buildPageUrl(page + 1, canonicalParams) : undefined

  const allPageStartups = [...featured, ...grid]

  // ─── SCHEMA BLOCKS ───
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/registry#dataset`,
    name: "UpForge Global Startup Registry",
    alternateName: ["UpForge Registry", "Global Startup Database", "UFRN Registry"],
    description: `Open, verified, independent database of ${total.toLocaleString()}+ startups worldwide.`,
    url: `${BASE_URL}/registry`,
    keywords: ["startups", "founders", "startup database", "UFRN", "startup registry"],
    temporalCoverage: "2010/..",
    creator: { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "UpForge", url: BASE_URL },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl}#itemlist`,
    name: `Verified Startups — Page ${page}`,
    numberOfItems: allPageStartups.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: allPageStartups.map((s, idx) => ({
      "@type": "ListItem",
      position: baseNum + idx + 1,
      name: s.name,
      url: `https://upforge.org/startup/${s.slug}`,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UpForge", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Global Registry", item: `${BASE_URL}/registry` },
      ...(cat ? [{ "@type": "ListItem", position: 3, name: cat, item: `${BASE_URL}/registry?sector=${encodeURIComponent(cat)}` }] : []),
      ...(page > 1 ? [{ "@type": "ListItem", position: cat ? 4 : 3, name: `Page ${page}`, item: canonicalUrl }] : []),
    ],
  }

  const allSchemas = [datasetSchema, itemListSchema, breadcrumbSchema]

  return (
    <>
      <Navbar />
      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      {/* ── Header Hero Section ── */}
      <div className="relative border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-2xl py-12 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-primary px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20">
                Independent Startup Intelligence
              </span>
            </div>
            <h1 className="mast-h1 text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
              Global Startup Registry
            </h1>
            <p className="mast-tagline text-base md:text-lg text-muted-foreground max-w-2xl font-light">
              The standardized public ledger of verified emerging companies, UFRN identifiers, and founder records.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-2 min-w-[220px]">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Verified Listings</span>
            <span className="text-4xl font-mono font-bold text-accent-gold text-glow">{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ── Search Toolbar ── */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          
          <div className="relative" id="search-wrapper">
            <form action="/registry" method="GET" className="relative group" id="search-form">
              {year    && <input type="hidden" name="year"    value={year} />}
              {cat     && <input type="hidden" name="sector"  value={cat} />}
              {country && <input type="hidden" name="country" value={country} />}
              {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
              
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent-primary transition-colors pointer-events-none" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                id="search-input"
                className="w-full bg-muted/40 border border-[var(--glass-border)] rounded-full pl-12 pr-36 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all font-light"
                placeholder={`Search ${total.toLocaleString()} records by name, sector, city, or UFRN...`}
                aria-label="Search global registry"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-accent-primary hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-6 rounded-full transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
              >
                Search
              </button>
            </form>

            <div
              id="autocomplete-dropdown"
              className="absolute left-0 right-0 top-full mt-2 bg-card/95 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl shadow-2xl overflow-hidden z-50 hidden"
            />
          </div>

          {/* Filter toggle & Sort Toolbar */}
          <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
            <button
              type="button"
              id="filter-toggle-btn"
              aria-expanded="false"
              aria-controls="filter-panel"
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilterCount > 0
                  ? "border-accent-gold text-accent-gold bg-accent-gold/10"
                  : "border-[var(--glass-border)] text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent-gold text-black rounded-full px-2 py-0.5 text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort options */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs text-muted-foreground font-medium mr-1 hidden sm:inline">Sort:</span>
              {[
                { label: "A–Z",     val: "name"   },
                { label: "Newest",  val: "newest" },
                { label: "Founded", val: "year"   },
              ].map(s => (
                <Link
                  key={s.val}
                  href={qs({ sort: s.val, page: undefined })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    sort === s.val
                      ? "bg-accent-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
              {isFiltered && (
                <Link
                  href="/registry"
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-accent-gold hover:bg-accent-gold/10 transition-colors flex items-center gap-1 ml-2"
                >
                  <X className="w-3 h-3" /> Clear
                </Link>
              )}
            </div>
          </div>

          {/* Slide-down Filter Panel */}
          <div
            id="filter-panel"
            role="region"
            aria-label="Filters"
            className="filter-panel-wrap overflow-hidden max-h-0 opacity-0 transition-all duration-300 pointer-events-none"
          >
            <div className="bg-card border border-[var(--glass-border)] rounded-2xl p-5 mt-4 shadow-lg flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="rg-year-sel">Founded Year</label>
                <select id="rg-year-sel" className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50">
                  <option value="">Any Year</option>
                  {years.map(yr => (
                    <option key={yr} value={String(yr)} selected={year === String(yr)}>{yr}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="rg-cat-sel">Sector</label>
                <select id="rg-cat-sel" className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50">
                  <option value="">All Sectors</option>
                  {cats.map(c => (
                    <option key={c} value={c} selected={cat === c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="rg-country-sel">Country</label>
                <select id="rg-country-sel" className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50">
                  <option value="">All Countries</option>
                  {countries.map(ct => (
                    <option key={ct.code} value={ct.code} selected={country === ct.code}>
                      {ct.name} ({ct.code})
                    </option>
                  ))}
                </select>
              </div>

              {isFiltered && (
                <Link href="/registry" className="h-10 bg-accent-gold hover:bg-amber-600 text-black font-bold uppercase tracking-wider text-xs px-5 rounded-xl flex items-center justify-center transition-colors">
                  Clear All
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* Results Stream */}
        <div className="lg:col-span-8">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--glass-border)]">
            <h2 className="results-q text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {q ? `Search Results for "${q}"` : cat ? `${cat} Directory` : country ? `${country} Startups` : "Verified Directory"}
            </h2>
            <span className="text-xs text-muted-foreground">
              Showing {grid.length > 0 ? baseNum + 1 : 0}–{Math.min(baseNum + grid.length, total)} of {total.toLocaleString()}
            </span>
          </div>

          {/* Featured Section (Page 1 without active filters) */}
          {featured.length > 0 && (
            <div className="mb-10 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-accent-gold px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
                  Featured Profiles
                </span>
              </div>
              <div className="grid gap-4">
                {featured.map(s => (
                  <Link
                    key={s.id}
                    href={`/startup/${s.slug}`}
                    className="glass-card group flex flex-col sm:flex-row items-start sm:items-center p-6 gap-6 rounded-2xl border border-accent-gold/30 bg-gradient-to-r from-accent-gold/5 via-card to-card shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl bg-muted/50 border border-accent-gold/30 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-accent-gold transition-colors">
                      {s.logo_url ? (
                        <img src={s.logo_url} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <span className="font-bold text-xl text-accent-gold">{s.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent-gold transition-colors truncate">{s.name}</h3>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent-gold border border-accent-gold/20 px-2.5 py-0.5 rounded-full bg-accent-gold/10">Featured</span>
                        {s.category && <span className="text-[10px] uppercase tracking-widest font-bold text-accent-primary border border-accent-primary/20 px-2.5 py-0.5 rounded-full bg-accent-primary/10">{s.category}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs font-medium text-muted-foreground">
                        {s.city && <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" /> {s.city}</span>}
                        {s.founded_year && <span>Est. {s.founded_year}</span>}
                        {s.ufrn && <span className="font-mono text-accent-gold">UFRN Verified</span>}
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full border border-accent-gold/30 items-center justify-center group-hover:bg-accent-gold group-hover:text-black text-accent-gold transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Directory Grid (Separated Floating Cards) */}
          {grid.length > 0 ? (
            <div className="space-y-4">
              {grid.map((s) => (
                <Link
                  key={s.id}
                  href={`/startup/${s.slug}`}
                  className="glass-card group flex flex-col sm:flex-row items-start sm:items-center p-5 gap-6 rounded-2xl border border-[var(--glass-border)] bg-card shadow-sm hover:shadow-md transition-all hover:border-accent-primary/50"
                >
                  <div className="w-16 h-16 rounded-xl bg-muted/40 border border-[var(--glass-border)] flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-accent-primary/50 transition-colors">
                    {s.logo_url ? (
                      <img
                        src={s.logo_url}
                        alt={s.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="font-bold text-xl text-muted-foreground">{s.name.charAt(0)}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent-primary transition-colors truncate">{s.name}</h3>
                      {s.is_featured && (
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent-gold border border-accent-gold/20 px-2.5 py-0.5 rounded-full bg-accent-gold/10">Featured</span>
                      )}
                      {s.category && (
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent-primary border border-accent-primary/20 px-2.5 py-0.5 rounded-full bg-accent-primary/10">
                          {s.category}
                        </span>
                      )}
                      {s.ufrn && (
                        <span className="text-[10px] font-mono font-bold text-muted-foreground border border-border px-2 py-0.5 rounded-full bg-muted">
                          {s.ufrn}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{s.description || "Verified entity on the UpForge Global Startup Registry."}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-1 text-xs font-medium text-muted-foreground">
                      {s.city && (
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" /> {s.city}{s.country_code ? `, ${s.country_code}` : ''}
                        </span>
                      )}
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
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or clear the filters to see all registry records.</p>
              <Link href="/registry" className="inline-block bg-accent-primary text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                Clear Filters
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[var(--glass-border)]">
              <Link
                href={pgHref(page - 1)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--glass-border)] transition-colors ${
                  page === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/40 hover:text-foreground'
                } text-muted-foreground`}
              >
                Prev
              </Link>
              {pgNums.map(p => (
                <Link
                  key={p}
                  href={pgHref(p)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-full transition-all ${
                    p === page
                      ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'border border-[var(--glass-border)] text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  }`}
                >
                  {p}
                </Link>
              ))}
              <Link
                href={pgHref(page + 1)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--glass-border)] transition-colors ${
                  page === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/40 hover:text-foreground'
                } text-muted-foreground`}
              >
                Next
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card 1: Free Listing */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden text-center bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-2xl pointer-events-none" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent-gold mb-2 relative z-10">Free Listing</h3>
            <h4 className="text-xl font-bold text-foreground mb-3 relative z-10">Add your startup to the registry</h4>
            <p className="text-xs text-muted-foreground mb-5 relative z-10">Get your startup listed in the vetted registry and receive a global UFRN identifier.</p>
            <Link
              href="/submit"
              className="inline-block bg-foreground text-background font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-accent-gold hover:text-white transition-colors relative z-10 shadow-sm"
            >
              Submit Directory →
            </Link>
          </div>

          {/* Card 2: Registry Intelligence */}
          <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
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

          {/* Card 3: What is a UFRN? */}
          <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent-gold mb-2">What is a UFRN?</h3>
            <h4 className="text-base font-bold text-foreground mb-2">Your startup's global ID</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              A unique permanent identifier assigned to every approved startup. Shareable on LinkedIn, pitch decks, and investor diligence.
            </p>
            <div className="font-mono text-xs font-bold text-accent-primary bg-background border border-[var(--glass-border)] py-2.5 px-4 rounded-xl text-center shadow-inner">
              UF-2026-IND-00001
            </div>
          </div>

          {/* Card 4: Browse Sectors */}
          {cats.length > 0 && (
            <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Explore Sectors</h3>
              <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto pr-1">
                {cats.slice(0, 12).map(c => (
                  <Link
                    key={c}
                    href={`/registry?sector=${encodeURIComponent(c)}`}
                    className="text-sm text-foreground hover:text-accent-primary py-2 border-b border-border/50 last:border-0 flex items-center justify-between group transition-colors"
                  >
                    <span>{c}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-primary" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Card 5: Browse Countries */}
          {countries.length > 0 && (
            <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Browse by Country</h3>
              <div className="flex flex-col gap-1 max-h-[280px] overflow-y-auto pr-1">
                {countries.slice(0, 10).map(ct => (
                  <Link
                    key={ct.code}
                    href={`/registry?country=${encodeURIComponent(ct.code)}`}
                    className="text-sm text-foreground hover:text-accent-primary py-2 border-b border-border/50 last:border-0 flex items-center justify-between group transition-colors"
                  >
                    <span>{ct.name}</span>
                    <span className="font-mono text-xs font-bold text-accent-gold">{ct.code}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Client-side Filter & Autocomplete JavaScript ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function () {
          var btn     = document.getElementById('filter-toggle-btn');
          var panel   = document.getElementById('filter-panel');

          if (btn && panel) {
            var hasActive = ${activeFilterCount > 0 ? "true" : "false"};

            function openPanel() {
              panel.classList.remove('max-h-0','opacity-0','pointer-events-none');
              panel.classList.add('max-h-[400px]','opacity-100','pointer-events-auto');
              btn.setAttribute('aria-expanded','true');
            }
            function closePanel() {
              panel.classList.add('max-h-0','opacity-0','pointer-events-none');
              panel.classList.remove('max-h-[400px]','opacity-100','pointer-events-auto');
              btn.setAttribute('aria-expanded','false');
            }

            if (hasActive) openPanel();
            btn.addEventListener('click', function () {
              panel.classList.contains('max-h-0') ? openPanel() : closePanel();
            });
          }

          function buildUrl(params) {
            var p = new URLSearchParams();
            if (params.q)       p.set('q',       params.q);
            if (params.year)    p.set('year',    params.year);
            if (params.sector)  p.set('sector',  params.sector);
            if (params.country) p.set('country', params.country);
            if (params.sort && params.sort !== 'name') p.set('sort', params.sort);
            var s = p.toString();
            return '/registry' + (s ? '?' + s : '');
          }

          function getCurrentParams() {
            var u = new URLSearchParams(window.location.search);
            return {
              q:       u.get('q')       || '',
              year:    u.get('year')    || '',
              sector:  u.get('sector')  || '',
              country: u.get('country') || '',
              sort:    u.get('sort')    || 'name',
            };
          }

          var yearSel    = document.getElementById('rg-year-sel');
          var catSel     = document.getElementById('rg-cat-sel');
          var countrySel = document.getElementById('rg-country-sel');

          if (yearSel)    yearSel.addEventListener('change',    function () { var c = getCurrentParams(); c.year    = this.value; window.location.href = buildUrl(c); });
          if (catSel)     catSel.addEventListener('change',     function () { var c = getCurrentParams(); c.sector  = this.value; window.location.href = buildUrl(c); });
          if (countrySel) countrySel.addEventListener('change', function () { var c = getCurrentParams(); c.country = this.value; window.location.href = buildUrl(c); });

          var searchForm = document.getElementById('search-form');
          if (searchForm) searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var c = getCurrentParams();
            c.q = this.querySelector('input[name="q"]').value;
            window.location.href = buildUrl(c);
          });

          // Autocomplete
          var searchInput = document.getElementById('search-input');
          var dropdown = document.getElementById('autocomplete-dropdown');
          var debounceTimer;

          if (searchInput && dropdown) {
            searchInput.addEventListener('input', function() {
              clearTimeout(debounceTimer);
              var query = this.value.trim();
              
              if (query.length < 2) {
                dropdown.classList.add('hidden');
                return;
              }

              debounceTimer = setTimeout(function() {
                fetch('/api/registry/suggestions?q=' + encodeURIComponent(query))
                  .then(function(res) { return res.json(); })
                  .then(function(data) {
                    if (data.suggestions && data.suggestions.length > 0) {
                      dropdown.innerHTML = '<div class="p-2">' + 
                        data.suggestions.map(function(s) {
                          return '<button type="button" class="w-full text-left px-4 py-2.5 hover:bg-muted text-sm font-medium transition-colors border-b border-border/50 last:border-0 flex items-center justify-between" data-suggestion="' + s.replace(/"/g, '&quot;') + '"><span>' + s + '</span><span class="text-xs text-muted-foreground">↗</span></button>';
                        }).join('') + 
                        '</div>';
                      dropdown.classList.remove('hidden');
                      
                      dropdown.querySelectorAll('button').forEach(function(btn) {
                        btn.addEventListener('click', function() {
                          searchInput.value = this.dataset.suggestion;
                          dropdown.classList.add('hidden');
                          searchForm.dispatchEvent(new Event('submit'));
                        });
                      });
                    } else {
                      dropdown.classList.add('hidden');
                    }
                  })
                  .catch(function() { dropdown.classList.add('hidden'); });
              }, 300);
            });

            document.addEventListener('click', function(e) {
              if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
              }
            });

            searchInput.addEventListener('focus', function() {
              if (this.value.trim().length >= 2) {
                dropdown.classList.remove('hidden');
              }
            });

            searchInput.addEventListener('keydown', function(e) {
              if (e.key === 'Escape') {
                dropdown.classList.add('hidden');
              }
            });
          }
        })();
      `}} />
    </>
  )
}
