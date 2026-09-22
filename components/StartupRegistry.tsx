// components/StartupRegistry.tsx  ←  CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// UPGRADE: UFRN search support
// - Search box now detects UFRN patterns (starts with UFRN-, UF-, UPF-)
//   and immediately redirects to the /ufrn/[id] lookup page instead of
//   searching the registry — this is the "Zero-Result" strategy.
// - UFRN chip shown on desktop grid cards and mobile list rows
// - All other logic unchanged
// ─────────────────────────────────────────────────────────────────────────────

"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useTransition,
} from "react"
import {
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ArrowUpRight,
  Calendar,
  Star,
  Search,
  X,
  Loader2,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"
import { StartupCard } from "@/components/startup-card"

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface Startup {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  website?: string
  founders?: string
  founded_year?: number
  category?: string
  city?: string
  is_featured?: boolean
  created_at?: string
  ufrn?: string | null   // ← added for UFRN chip
}

interface Props {
  startups: Startup[]
  totalCount: number
  totalPages: number
  currentPage: number
  searchQuery: string
  yearFilter: string
  sortBy: string
  uniqueYears: number[]
}

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: "name",   label: "Name A–Z"     },
  { value: "newest", label: "Newest First" },
  { value: "year",   label: "Founded Year" },
]

// ── UFRN DETECTOR ────────────────────────────────────────────────────────────
// Detects whether a search query looks like a UFRN / UFRN fragment.
// If so, we redirect to /ufrn/[id] instead of searching.
function detectUFRN(query: string): string | null {
  const q = query.trim().toUpperCase()
  // Exact UFRN format: UFRN-YYYY-CC-NNNNN
  if (/^UFRN-\d{4}-[A-Z]{2,3}-\d{1,6}$/.test(q)) return q
  // UF- prefix (misspelling): UF-YYYY-CC-NNNNN
  if (/^UF-\d{4}-[A-Z]{2,3}-\d{1,6}$/.test(q)) return "UFRN-" + q.slice(3)
  // UPF- prefix (legacy): UPF-XXX-XXXXX
  if (/^UPF-/.test(q)) return null // legacy codes don't have a UFRN page yet
  return null
}

// ---------------------------------------------------------------------------
// LOGO COMPONENT
// ---------------------------------------------------------------------------
function StartupLogo({
  name,
  logo_url,
  size = 40,
}: {
  name: string
  logo_url?: string
  size?: number
}) {
  if (logo_url) {
    return (
      <Image
        src={logo_url}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-cover"
        loading="lazy"
      />
    )
  }
  return (
    <span className="pf reg-logo-letter" aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function StartupRegistry({
  startups,
  totalCount,
  totalPages,
  currentPage,
  searchQuery,
  yearFilter,
  sortBy,
  uniqueYears,
}: Props) {
  const router   = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()
  const [localSearch,   setLocalSearch]   = useState(searchQuery)
  const [yearOpen,      setYearOpen]      = useState(false)
  const [sortOpen,      setSortOpen]      = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  // Whether the current search looks like a UFRN — shows hint to user
  const [ufrnHint, setUfrnHint] = useState<string | null>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const yearRef     = useRef<HTMLDivElement>(null)
  const sortRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalSearch(searchQuery)
  }, [searchQuery])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) setYearOpen(false)
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const buildUrl = useCallback(
    (overrides: Record<string, string | undefined>): string => {
      const base: Record<string, string | undefined> = {
        q:    searchQuery             || undefined,
        year: yearFilter              || undefined,
        sort: sortBy !== "name" ? sortBy : undefined,
        page: currentPage > 1 ? String(currentPage) : undefined,
      }
      const merged = { ...base, ...overrides }
      const p = new URLSearchParams()
      Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v) })
      const qs = p.toString()
      return `${pathname}${qs ? `?${qs}` : ""}`
    },
    [pathname, searchQuery, yearFilter, sortBy, currentPage]
  )

  // ── Debounced search with UFRN intercept ──────────────────────────────────
  useEffect(() => {
    clearTimeout(debounceRef.current)

    // Detect UFRN pattern immediately — show hint
    const ufrn = detectUFRN(localSearch)
    setUfrnHint(ufrn)

    if (localSearch === searchQuery) return

    debounceRef.current = setTimeout(() => {
      // If it's a UFRN, redirect to the dedicated lookup page
      if (ufrn) {
        startTransition(() => { router.push(`/ufrn/${ufrn}`) })
        return
      }
      startTransition(() => {
        router.push(buildUrl({ q: localSearch || undefined, page: undefined }))
      })
    }, 440)

    return () => clearTimeout(debounceRef.current)
  }, [localSearch, buildUrl, router, searchQuery])

  const go = (url: string) => startTransition(() => router.push(url))

  const isFiltered   = !!(searchQuery || yearFilter)
  const showFeatured = currentPage === 1 && !isFiltered
  const featuredList = showFeatured ? startups.filter((s) => s.is_featured).slice(0, 3) : []
  const featuredIds  = new Set(featuredList.map((s) => s.id))
  const gridList     = showFeatured ? startups.filter((s) => !featuredIds.has(s.id)) : startups

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Name A–Z"
  const hasFilters = !!(yearFilter || (sortBy && sortBy !== "name"))

  return (
    <div className="reg-root">

      {/* ── BREADCRUMB ── */}
      <nav className="reg-breadcrumb" aria-label="Breadcrumb">
        <div className="reg-container">
          <ol className="reg-bc-list" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="reg-bc-link" itemProp="item">
                <span itemProp="name">UpForge</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="reg-bc-sep" aria-hidden="true">/</li>
            <li className="reg-bc-current" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Startup Registry</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* ── MASTHEAD ── */}
      <header className="reg-masthead">
        <div className="reg-container">
          <div className="reg-masthead-inner">
            <div className="reg-eyebrow">
              <span className="reg-eyebrow-line" />
              <span className="reg-eyebrow-text">India Edition · 2026</span>
              <span className="reg-eyebrow-line" />
            </div>
            <h1 className="reg-h1 pf">Startup Registry</h1>
            <p className="reg-sub rp">
              India's independent registry of verified builders — free, structured, permanent.
            </p>
            <div className="reg-meta">
              <span className="reg-live">
                <span className="reg-ldot" aria-hidden="true" />
                <span>Live · {totalCount.toLocaleString()} Profiles</span>
              </span>
              <span className="reg-meta-div" aria-hidden="true" />
              <span className="reg-vbadge">
                <BadgeCheck style={{ width: 9, height: 9 }} aria-hidden="true" />
                <span>All Verified</span>
              </span>
              <span className="reg-meta-div" aria-hidden="true" />
              <span className="reg-updated">Updated Daily</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── TOOLBAR ── */}
      <div className="reg-toolbar" role="search">
        <div className="reg-container reg-toolbar-inner">

          {/* Search — now with UFRN intercept */}
          <div className={`reg-search${searchFocused ? " focused" : ""}`}>
            <span className="reg-search-icon" aria-hidden="true">
              {isPending ? (
                <Loader2 style={{ width: 13, height: 13, animation: "reg-spin .8s linear infinite" }} />
              ) : (
                <Search style={{ width: 13, height: 13 }} />
              )}
            </span>
            <input
              type="search"
              className="reg-search-input"
              placeholder="Search startups, founders, or UFRN…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search startups, founders, or UFRN registry number"
              autoComplete="off"
              spellCheck={false}
            />
            {localSearch && (
              <button
                className="reg-search-clear"
                onClick={() => {
                  setLocalSearch("")
                  setUfrnHint(null)
                  go(buildUrl({ q: undefined, page: undefined }))
                }}
                aria-label="Clear search"
                type="button"
              >
                <X style={{ width: 10, height: 10 }} />
              </button>
            )}
            {isPending && <span className="reg-scan" aria-hidden="true" />}
          </div>

          {/* Sort */}
          <div className="reg-dropdown-wrap" ref={sortRef}>
            <button
              className={`reg-ctrl${sortOpen ? " open" : ""}`}
              onClick={() => { setSortOpen((v) => !v); setYearOpen(false) }}
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
              aria-label={`Sort by: ${currentSortLabel}`}
              type="button"
            >
              <span>{currentSortLabel}</span>
              <ChevronDown style={{ width: 10, height: 10, flexShrink: 0, transition: "transform .2s", transform: sortOpen ? "rotate(180deg)" : "none" }} />
            </button>
            {sortOpen && (
              <div className="reg-dropdown" role="listbox" aria-label="Sort options">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    className={`reg-drop-item${sortBy === opt.value ? " active" : ""}`}
                    onClick={() => { setSortOpen(false); go(buildUrl({ sort: opt.value !== "name" ? opt.value : undefined, page: undefined })) }}
                    type="button"
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year filter */}
          <div className="reg-dropdown-wrap" ref={yearRef}>
            <button
              className={`reg-ctrl${yearOpen ? " open" : ""}${yearFilter ? " active-val" : ""}`}
              onClick={() => { setYearOpen((v) => !v); setSortOpen(false) }}
              aria-expanded={yearOpen}
              aria-haspopup="listbox"
              aria-label={yearFilter ? `Filter by year: ${yearFilter}` : "Filter by year"}
              type="button"
            >
              <span>{yearFilter ? `Est. ${yearFilter}` : "Year"}</span>
              <ChevronDown style={{ width: 10, height: 10, flexShrink: 0, transition: "transform .2s", transform: yearOpen ? "rotate(180deg)" : "none" }} />
            </button>
            {yearOpen && (
              <div className="reg-dropdown reg-dropdown-year" role="listbox" aria-label="Year filter options">
                <button
                  role="option"
                  aria-selected={!yearFilter}
                  className={`reg-drop-item${!yearFilter ? " active" : ""}`}
                  onClick={() => { setYearOpen(false); go(buildUrl({ year: undefined, page: undefined })) }}
                  type="button"
                >
                  <span>Any Year</span>
                  {!yearFilter && <span aria-hidden="true">✓</span>}
                </button>
                {uniqueYears.map((yr) => (
                  <button
                    key={yr}
                    role="option"
                    aria-selected={yearFilter === String(yr)}
                    className={`reg-drop-item${yearFilter === String(yr) ? " active" : ""}`}
                    onClick={() => { setYearOpen(false); go(buildUrl({ year: String(yr), page: undefined })) }}
                    type="button"
                  >
                    <span>{yr}</span>
                    {yearFilter === String(yr) && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── UFRN HINT — shown when search looks like a UFRN ── */}
        {ufrnHint && (
          <div className="reg-container" style={{ paddingTop: 6, paddingBottom: 2 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#FFF9E6",
              border: "1px solid #A89060",
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "system-ui, sans-serif",
            }}>
              <ShieldCheck style={{ width: 12, height: 12, color: "#A89060" }} />
              <span style={{ fontSize: 11, color: "#7A6840", fontWeight: 600 }}>
                UFRN detected —
              </span>
              <a
                href={`/ufrn/${ufrnHint}`}
                style={{ fontSize: 11, color: "#A89060", fontWeight: 700, textDecoration: "underline" }}
              >
                Look up {ufrnHint} →
              </a>
            </div>
          </div>
        )}

        {/* Active filter tags */}
        {hasFilters && (
          <div className="reg-container">
            <div className="reg-active-filters">
              {yearFilter && (
                <span className="reg-af-tag">
                  Est. {yearFilter}
                  <button className="reg-af-x" onClick={() => go(buildUrl({ year: undefined, page: undefined }))} aria-label={`Remove year filter: ${yearFilter}`} type="button">×</button>
                </span>
              )}
              {sortBy !== "name" && (
                <span className="reg-af-tag">
                  {currentSortLabel}
                  <button className="reg-af-x" onClick={() => go(buildUrl({ sort: undefined, page: undefined }))} aria-label="Remove sort filter" type="button">×</button>
                </span>
              )}
              <Link href="/startup" className="reg-af-clear">Clear all</Link>
            </div>
          </div>
        )}
      </div>

      {/* ── RESULTS BAR ── */}
      <div className="reg-container reg-results-bar" aria-live="polite" aria-atomic="true">
        <span className="reg-results-label">
          {searchQuery ? `"${searchQuery}"` : yearFilter ? `Est. ${yearFilter}` : "All Startups"}
        </span>
        <span className="reg-results-count rp">— {totalCount.toLocaleString()} profiles</span>
        <span className="reg-results-rule" aria-hidden="true" />
        {isPending && (
          <span className="reg-searching" role="status">
            <Loader2 style={{ width: 9, height: 9, animation: "reg-spin .8s linear infinite" }} aria-hidden="true" />
            <span>Searching…</span>
          </span>
        )}
        <span className="reg-page-label" aria-label={`Page ${currentPage} of ${totalPages || 1}`}>
          Pg. {currentPage} / {totalPages || 1}
        </span>
      </div>

      {/* ── CONTENT ── */}
      <div className={`reg-container reg-content${isPending ? " fading" : ""}`}>

        {/* FEATURED SECTION */}
        {featuredList.length > 0 && (
          <section className="reg-featured-section" aria-label="Featured startups">
            <div className="reg-section-head">
              <Star style={{ width: 10, height: 10, color: "var(--reg-gold2)" }} aria-hidden="true" />
              <span className="reg-sh-label">Featured This Edition</span>
              <span className="reg-sh-rule" aria-hidden="true" />
            </div>
            <div className="reg-feat-grid">
              {featuredList.map((s, fi) => (
                <Link key={s.id} href={`/startup/${s.slug}`} className="reg-feat-card">
                  <div className="reg-feat-img">
                    {s.logo_url ? (
                      <Image
                        src={s.logo_url}
                        alt={`${s.name} — featured startup`}
                        fill
                        className="object-cover"
                        loading={fi === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="reg-feat-ph" aria-hidden="true">
                        <span className="pf reg-feat-ph-letter">{s.name.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="reg-feat-overlay" aria-hidden="true" />
                    <span className="reg-feat-num" aria-hidden="true">No.{String(fi + 1).padStart(2, "0")}</span>
                    <BadgeCheck className="reg-feat-check" aria-label="Verified startup" />
                    <div className="reg-feat-caption">
                      <span className="reg-feat-sector">{s.category || "Startup"}</span>
                      <h2 className="pf reg-feat-name">{s.name}</h2>
                    </div>
                  </div>
                  <div className="reg-feat-body">
                    <p className="rp reg-feat-desc">{s.description || "Building for India's next decade."}</p>
                    {s.founders && (
                      <p className="reg-feat-founders">
                        <span className="reg-founders-label">Founders — </span>
                        {s.founders}
                      </p>
                    )}
                    <div className="reg-feat-footer">
                      <div className="reg-feat-meta">
                        {s.founded_year && (
                          <span className="reg-chip">
                            <Calendar style={{ width: 9, height: 9 }} aria-hidden="true" />
                            <span>{s.founded_year}</span>
                          </span>
                        )}
                        {/* UFRN chip on featured cards */}
                        {s.ufrn && (
                          <a
                            href={`/ufrn/${s.ufrn}`}
                            onClick={(e) => e.stopPropagation()}
                            className="reg-chip"
                            style={{ color: "#A89060", textDecoration: "none" }}
                            aria-label={`UFRN: ${s.ufrn} - Verified Startup Profile`}
                            title={`Registry: ${s.ufrn}`}
                          >
                            <ShieldCheck style={{ width: 9, height: 9 }} />
                            <span style={{ fontFamily: "monospace", fontSize: 9 }}>
                              {s.ufrn.split("-").slice(-2).join("-")}
                            </span>
                          </a>
                        )}
                      </div>
                      <div className="reg-feat-actions">
                        <span className="reg-vbadge">
                          <BadgeCheck style={{ width: 8, height: 8 }} aria-hidden="true" />
                          <span>Verified</span>
                        </span>
                        <ArrowUpRight style={{ width: 13, height: 13, color: "var(--reg-ink4)" }} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* GRID */}
        {gridList.length > 0 && (
          <section aria-label="All startups">
            {showFeatured && featuredList.length > 0 && (
              <div className="reg-section-head">
                <span className="reg-sh-label">All Startups</span>
                <span className="reg-sh-rule" aria-hidden="true" />
              </div>
            )}

            {/* Desktop grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {gridList.map((s) => (
                <StartupCard key={s.id} startup={s} featured={s.is_featured} />
              ))}
            </div>

            {/* Mobile list */}
            <div className="reg-mob-list reg-show-mob">
              {gridList.map((s, idx) => (
                <Link
                  key={s.id}
                  href={`/startup/${s.slug}`}
                  className="reg-mob-row"
                  style={{ borderBottom: idx < gridList.length - 1 ? "1px solid var(--reg-rule2)" : "none" }}
                >
                  <div className="reg-mob-logo" aria-hidden="true">
                    <StartupLogo name={s.name} logo_url={s.logo_url} size={38} />
                  </div>
                  <div className="reg-mob-info">
                    <div className="reg-mob-name-row">
                      <span className="pf reg-mob-name">{s.name}</span>
                      <BadgeCheck style={{ width: 9, height: 9, color: "#15803D", flexShrink: 0 }} aria-label="Verified" />
                    </div>
                    <span className="reg-mob-meta">
                      {s.category || "Startup"}
                      {s.founded_year && ` · ${s.founded_year}`}
                      {/* UFRN in mobile meta row */}
                      {s.ufrn && (
                        <span style={{ color: "#A89060", fontFamily: "monospace", fontSize: 9, marginLeft: 4 }}>
                          · {s.ufrn.split("-").slice(-2).join("-")}
                        </span>
                      )}
                    </span>
                  </div>
                  <ChevronRight style={{ width: 11, height: 11, color: "var(--reg-ink5)", flexShrink: 0 }} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {startups.length === 0 && !isPending && (
          <div className="reg-empty" role="status">
            <span className="pf reg-empty-glyph" aria-hidden="true">∅</span>
            <h3 className="pf reg-empty-title">No startups found</h3>
            <p className="rp reg-empty-body">
              {searchQuery ? (
                <>Nothing matched &ldquo;{searchQuery}&rdquo;. Try a different term or search by UFRN.</>
              ) : (
                <>No startups found for your filters. Try adjusting them.</>
              )}
            </p>
            <Link href="/startup" className="reg-empty-btn">Clear filters</Link>
          </div>
        )}

        {/* SKELETON */}
        {isPending && startups.length === 0 && (
          <div className="reg-grid" aria-label="Loading startups" aria-busy="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="reg-skel-card" aria-hidden="true">
                <div className="reg-skel-head">
                  <div className="reg-skel reg-skel-circle" />
                  <div style={{ flex: 1 }}>
                    <div className="reg-skel" style={{ height: 11, marginBottom: 7, width: "66%" }} />
                    <div className="reg-skel" style={{ height: 8, width: "44%" }} />
                  </div>
                </div>
                <div className="reg-skel-body">
                  <div className="reg-skel" style={{ height: 8, marginBottom: 6 }} />
                  <div className="reg-skel" style={{ height: 8, marginBottom: 6, width: "82%" }} />
                  <div className="reg-skel" style={{ height: 8, width: "58%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav className="reg-pagination" aria-label="Registry pagination">
            <Link
              href={buildUrl({ page: currentPage > 2 ? String(currentPage - 1) : undefined })}
              className={`reg-pg-btn${currentPage === 1 ? " disabled" : ""}`}
              aria-disabled={currentPage === 1}
              aria-label="Previous page"
              tabIndex={currentPage === 1 ? -1 : 0}
            >
              <ChevronLeft style={{ width: 10, height: 10 }} aria-hidden="true" />
              <span>Prev</span>
            </Link>
            <div className="reg-pg-nums" role="list">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p: number
                if (totalPages <= 5)                    p = i + 1
                else if (currentPage <= 3)              p = i + 1
                else if (currentPage >= totalPages - 2) p = totalPages - 4 + i
                else                                    p = currentPage - 2 + i
                return (
                  <Link
                    key={p}
                    href={buildUrl({ page: p === 1 ? undefined : String(p) })}
                    className={`reg-pg-num${p === currentPage ? " on" : ""}`}
                    aria-current={p === currentPage ? "page" : undefined}
                    aria-label={`Page ${p}`}
                    role="listitem"
                  >
                    {p}
                  </Link>
                )
              })}
            </div>
            <Link
              href={buildUrl({ page: String(Math.min(totalPages, currentPage + 1)) })}
              className={`reg-pg-btn${currentPage === totalPages ? " disabled" : ""}`}
              aria-disabled={currentPage === totalPages}
              aria-label="Next page"
              tabIndex={currentPage === totalPages ? -1 : 0}
            >
              <span>Next</span>
              <ChevronRight style={{ width: 10, height: 10 }} aria-hidden="true" />
            </Link>
          </nav>
        )}
      </div>

      {/* ── CTA BLOCK ── */}
      <div className="reg-container">
        <div className="reg-cta">
          <div className="reg-cta-text">
            <p className="reg-cta-eyebrow">UpForge Registry</p>
            <p className="pf reg-cta-headline">Your founder story starts with a verified profile.</p>
            <p className="rp reg-cta-sub">Registry-verified and publicly indexed in independent Indian startup registry. Free forever.</p>
          </div>
          <Link href="/submit" className="reg-cta-btn">List Free →</Link>
        </div>
      </div>

      {/* ── FOOTER NAV ── */}
      <nav className="reg-container reg-footer-nav" aria-label="Explore startup categories">
        <ul className="reg-footer-links">
          {[
            { l: "All Indian Startups 2026", h: "/startup" },
            { l: "Submit Your Startup",       h: "/submit"  },
            { l: "About UpForge",             h: "/about"   },
            { l: "Startup Journal",           h: "/blog"    },
          ].map((lnk) => (
            <li key={lnk.h}>
              <Link href={lnk.h} className="reg-footer-link">{lnk.l}</Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  )
}
