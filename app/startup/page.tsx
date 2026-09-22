// app/startup/page.tsx — Google Sheets powered (no Supabase)
import { queryStartups, getSheetFilters } from "@/lib/google-sheets"
import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { headers } from "next/headers"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight, MapPin, Calendar, Users } from "lucide-react"
import { getDomainMeta } from "@/lib/domain"
import type { DomainContext } from "@/lib/domain"

export const revalidate = 300

const PAGE_SIZE = 10

type StartupRow = Startup

interface PageProps {
  searchParams?: Promise<{
    page?: string; q?: string; year?: string; sort?: string; category?: string
  }>
}

// ─── DATA FETCHERS (Google Sheets) ───

async function getData(q: string, year: string, sort: string, cat: string, page: number) {
  return queryStartups({ q, year, sort, category: cat, countryCode: "IND", page, pageSize: PAGE_SIZE })
}

async function getFilters() {
  const f = await getSheetFilters()
  // Filter to India only for the India registry
  return {
    years: f.years,
    cats: f.cats,
  }
}

// ─── METADATA (domain-aware) ───

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const { total } = await getData("", "", "name", "", 1)
  const n = total > 0 ? total.toLocaleString() : "1,000+"
  const isFiltered = !!(sp?.q || sp?.year || sp?.sort || sp?.category)
  const page = Number(sp?.page ?? 1)

  // ✅ Read domain context from middleware header
  const headersList = await headers()
  const domainContext = (headersList.get("x-upforge-domain") ?? "in") as DomainContext
  const { baseUrl, locale } = getDomainMeta(domainContext)

  const canonicalUrl = `${baseUrl}/startup`
  const inUrl  = "https://www.upforge.in/startup"
  const orgUrl = "https://upforge.org/startup"

  const title = `Indian Startup Registry 2026 — ${n}+ Verified Indian Startups | UpForge`
  const description = `Discover ${n}+ verified Indian startups across AI, FinTech, SaaS, EdTech, HealthTech, Climate Tech, AgriTech, Web3 and 30+ sectors. Search by founder, city, year. India-focused startup database — updated through the registry source.`

  return {
    title,
    description,
    keywords: "Indian startups 2026, startup registry India, verified startups India, AI startups India, fintech startups India, SaaS startups India, edtech startups India, healthtech India, startup founders India, Bengaluru startups, Mumbai startups, Delhi NCR startups, Indian unicorns 2026",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-IN":     inUrl,
        "en":        orgUrl,
        "x-default": orgUrl,
      },
    },
    openGraph: {
      title: `Indian Startup Registry 2026 — ${n}+ Verified | UpForge`,
      description: `Browse ${n}+ verified Indian startups. Free, structured, updated daily.`,
      url: canonicalUrl,
      siteName: "UpForge",
      images: [{ url: `${baseUrl}/og/registry.png`, width: 1200, height: 630 }],
      locale: locale.replace("-", "_"),
      type: "website",
    },
    robots: {
      index: !isFiltered && page <= 1,
      follow: true,
      googleBot: {
        index: !isFiltered && page <= 1,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  }
}

// ─── PAGE ───

export default async function StartupPage({ searchParams }: PageProps) {

  // ✅ Read domain context for page-level use (JSON-LD baseUrl)
  const headersList = await headers()
  const domainContext = (headersList.get("x-upforge-domain") ?? "in") as DomainContext
  const { baseUrl } = getDomainMeta(domainContext)

  const sp   = await searchParams
  const q    = sp?.q?.trim()        ?? ""
  const year = sp?.year?.trim()     ?? ""
  const sort = sp?.sort?.trim()     ?? "name"
  const cat  = sp?.category?.trim() ?? ""
  const page = Math.max(1, Number(sp?.page ?? 1))

  const [{ startups, total }, { years, cats }] = await Promise.all([
    getData(q, year, sort, cat, page),
    getFilters(),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = !!(q || year || cat || (sort && sort !== "name"))

  const qs = (ov: Record<string, string | undefined>) => {
    const base: Record<string, string | undefined> = {
      q:        q    || undefined,
      year:     year || undefined,
      sort:     sort !== "name" ? sort : undefined,
      category: cat  || undefined,
      page:     page > 1 ? String(page) : undefined,
    }
    const m = { ...base, ...ov }
    const p = new URLSearchParams()
    Object.entries(m).forEach(([k, v]) => { if (v) p.set(k, v) })
    const s = p.toString()
    return `/startup${s ? `?${s}` : ""}`
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

  const featured = page === 1 && !isFiltered ? startups.filter(s => s.is_featured).slice(0, 3) : []
  const featIds  = new Set(featured.map(s => s.id))
  const grid     = page === 1 && !isFiltered ? startups.filter(s => !featIds.has(s.id)) : startups
  const baseNum  = (page - 1) * PAGE_SIZE

  const activeFilterCount = [year, cat, sort !== "name" ? sort : ""].filter(Boolean).length

  // ✅ JSON-LD uses dynamic baseUrl, not hardcoded upforge.in
  const schemas = [
    {
      "@context": "https://schema.org", "@type": "WebSite", "name": "UpForge", "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${baseUrl}/startup?q={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${baseUrl}/startup#cp`,
      "name": "Indian Startup Registry 2026", "url": `${baseUrl}/startup`,
      "description": `India's independent registry of ${total.toLocaleString()}+ verified startups across 30+ sectors.`,
      "numberOfItems": total, "inLanguage": "en-IN"
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "UpForge", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": `${baseUrl}/startup` },
      ]
    },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        :root {
          --saffron: #FF9933;
          --green: #138808;
          --ink: #1A1208;
          --parch: #FDFAF5;
          --parch-dark: #F5F0E6;
          --rule: #E2D9CC;
          --rule2: #D8D2C4;
          --muted: #8B7355;
          --accent: #D97706;
          --accent-light: #F59E0B;
          --gold: #C59A2E;
        }

        .page-root {
          min-height: 100vh;
          background: var(--parch);
          font-family: 'Georgia', 'Times New Roman', serif;
          display: flex;
          flex-direction: column;
        }
        .page-content { flex: 1; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
        .ri-0 { animation: riseIn 0.5s 0s ease both; }

        /* ─── HERO ─── */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, rgba(26,18,8,0.88) 0%, rgba(26,18,8,0.75) 100%);
          overflow: hidden; border-bottom: 1px solid var(--rule);
        }
        .hero-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('https://static.vecteezy.com/system/resources/thumbnails/021/972/990/small/flat-india-map-set-illustration-vector.jpg');
          background-size: cover; background-position: center 25%;
          opacity: 0.22; z-index: 0;
        }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(26,18,8,0.85) 0%, rgba(26,18,8,0.5) 50%, rgba(26,18,8,0.85) 100%);
        }
        .hero-section::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%); z-index: 2;
        }
        .mast { position: relative; z-index: 2; }
        .mast-content { position: relative; z-index: 10; text-align: center; padding: 100px 24px 80px; }
        .mast-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 6vw, 64px); font-weight: 900;
          letter-spacing: -0.02em; color: white; line-height: 1.1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3); margin-bottom: 20px;
        }
        .mast-rule {
          display: block; width: 200px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--saffron), var(--accent), var(--saffron), transparent);
          margin: 20px auto 24px;
        }
        .mast-tagline {
          font-family: Georgia, serif; font-size: 16px; color: rgba(255,255,255,0.92);
          font-style: italic; line-height: 1.7; max-width: 580px; margin: 0 auto 28px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .live-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25); padding: 10px 28px; border-radius: 100px;
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
          animation: pulse 2s infinite;
        }
        .live-text { font-family: system-ui, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: white; }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        /* ─── CATEGORY TABS ─── */
        .cat-tabs {
          display: flex; overflow-x: auto; border-bottom: 1px solid var(--rule);
          scrollbar-width: none; background: white; padding: 0 24px;
        }
        .cat-tabs::-webkit-scrollbar { display: none; }
        .cat-tab {
          flex-shrink: 0; padding: 14px 20px; font-family: system-ui, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: #999; text-decoration: none; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap;
        }
        .cat-tab:hover { color: var(--ink); }
        .cat-tab.on { color: var(--accent); border-bottom-color: var(--accent); }

        /* ─── TOOLBAR ─── */
        .toolbar {
          position: sticky; top: 0; z-index: 20;
          background: rgba(253,250,245,0.97); backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--rule);
        }
        .toolbar-inner { max-width: 1300px; margin: 0 auto; padding: 0 24px; }

        /* Search row */
        .t-search-row {
          display: flex; align-items: center; height: 52px; background: white;
          border-radius: 12px; margin: 14px 0 10px; border: 1px solid var(--rule2);
        }
        .t-icon { padding: 0 14px; color: #CCC; font-size: 15px; flex-shrink: 0; }
        .t-inp { flex: 1; border: none; background: transparent; font-size: 14px; font-style: italic; color: var(--ink); outline: none; padding: 0; min-width: 0; }
        .t-inp::placeholder { color: #CCC; font-size: 13px; }
        .t-btn { height: 40px; padding: 0 24px; background: var(--ink); color: #fff; border: none; font-size: 9px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; flex-shrink: 0; border-radius: 10px; margin-right: 8px; transition: background 0.2s; }
        .t-btn:hover { background: var(--accent); }

        /* ─── FILTER TOGGLE BUTTON ─── */
        .filter-toggle-row {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
        }
        .filter-toggle-btn {
          display: inline-flex; align-items: center; gap: 8px;
          height: 36px; padding: 0 16px;
          background: white; border: 1px solid var(--rule2);
          border-radius: 10px; cursor: pointer;
          font-family: system-ui, sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
          transition: all 0.2s; flex-shrink: 0;
        }
        .filter-toggle-btn:hover { border-color: var(--accent); color: var(--accent); }
        .filter-toggle-btn.active { border-color: var(--accent); color: var(--accent); background: #FFFBF0; }
        .filter-toggle-chevron {
          width: 14px; height: 14px; flex-shrink: 0;
          transition: transform 0.25s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .filter-toggle-btn.active .filter-toggle-chevron { transform: rotate(180deg); }
        .filter-count-badge {
          background: var(--accent); color: white; border-radius: 100px;
          font-size: 9px; font-weight: 800; padding: 1px 7px; letter-spacing: 0; min-width: 18px; text-align: center;
        }

        /* Sort quick links (always visible) */
        .sort-quick {
          display: flex; align-items: center; gap: 6px; margin-left: auto;
        }
        .t-sort { padding: 0 10px; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #BBB; text-decoration: none; flex-shrink: 0; white-space: nowrap; }
        .t-sort.on { color: var(--accent); font-weight: 800; }
        .t-div { width: 1px; height: 20px; background: var(--rule2); flex-shrink: 0; }

        /* ─── COLLAPSIBLE FILTER PANEL ─── */
        .filter-panel-wrap {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, opacity 0.25s ease, margin-bottom 0.25s ease;
          opacity: 0;
          margin-bottom: 0;
        }
        .filter-panel-wrap.open {
          max-height: 160px;
          opacity: 1;
          margin-bottom: 12px;
        }
        .filter-panel {
          background: white; border: 1px solid var(--rule2); border-radius: 12px;
          padding: 16px 18px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
        }
        .fp-group { display: flex; flex-direction: column; gap: 4px; }
        .fp-label { font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #BBB; font-family: system-ui, sans-serif; }
        .fp-sel {
          height: 34px; border: 1px solid var(--rule2); border-radius: 8px;
          background: white; font-size: 11px; color: var(--muted);
          padding: 0 10px; cursor: pointer; min-width: 140px;
          font-family: system-ui, sans-serif; transition: border-color 0.2s;
        }
        .fp-sel:focus { outline: none; border-color: var(--accent); }
        .fp-sel.active { border-color: var(--accent); color: var(--accent); background: #FFFBF0; }
        .fp-divider { width: 1px; height: 40px; background: var(--rule2); flex-shrink: 0; align-self: center; }
        .t-clear {
          font-size: 9px; font-weight: 700; color: #DC2626; text-decoration: none; flex-shrink: 0;
          padding: 6px 12px; border: 1px solid rgba(220,38,38,0.25); border-radius: 8px;
          transition: all 0.2s; background: rgba(220,38,38,0.04); font-family: system-ui, sans-serif;
        }
        .t-clear:hover { background: rgba(220,38,38,0.1); }

        /* ─── RESULTS BAR ─── */
        .results-bar { max-width: 1300px; margin: 0 auto; padding: 16px 24px; display: flex; align-items: center; gap: 14px; border-bottom: 1px solid var(--rule2); }
        .results-q { font-size: 14px; font-weight: 700; color: var(--ink); font-style: italic; }
        .results-n { font-size: 12px; color: var(--muted); }
        .results-rule { flex: 1; height: 1px; background: var(--rule2); }
        .results-pg { font-size: 11px; color: #AAA; font-family: system-ui, sans-serif; }

        /* ─── MAIN LAYOUT ─── */
        .main-wrap { max-width: 1300px; margin: 0 auto; padding: 32px 24px 56px; }
        .main-grid { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
        @media (max-width: 1000px) { .main-grid { grid-template-columns: 1fr; } .rg-aside { display: none; } }

        .sh { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .sh-l { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: #BBB; font-family: system-ui, sans-serif; white-space: nowrap; }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        /* ─── FEATURED CARDS ─── */
        .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 44px; }
        @media (max-width: 800px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .feat-grid { grid-template-columns: 1fr; } }
        .feat-card { background: white; border-radius: 16px; text-decoration: none; transition: all 0.25s; overflow: hidden; border: 1px solid var(--rule2); }
        .feat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -8px rgba(0,0,0,0.12); border-color: var(--accent); }
        .feat-img-wrap { width: 100%; aspect-ratio: 16/9; position: relative; background: var(--parch-dark); overflow: hidden; }
        .feat-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .feat-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%); }
        .feat-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 18px; }
        .feat-sector { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.65); margin-bottom: 4px; }
        .feat-company { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #fff; line-height: 1.2; }
        .feat-body { padding: 16px 18px; }
        .feat-desc { font-size: 12px; color: #5A4A30; font-style: italic; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 12px; }
        .feat-foot { display: flex; align-items: center; justify-content: space-between; }
        .feat-chips { font-size: 11px; color: #AAA; display: flex; gap: 10px; }

        /* ─── STARTUP LIST CARDS ─── */
        .startup-list { display: flex; flex-direction: column; }
        .s-row {
          display: flex; background: white; text-decoration: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid var(--rule2); border-top: none; overflow: hidden; position: relative;
        }
        .s-row:first-child { border-top: 1px solid var(--rule2); border-radius: 16px 16px 0 0; }
        .s-row:last-child  { border-radius: 0 0 16px 16px; }
        .s-row:only-child  { border-radius: 16px; border-top: 1px solid var(--rule2); }
        .s-row:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(217,119,6,0.1); z-index: 1; }
        .s-row:hover + .s-row { border-top: 1px solid var(--rule2); }

        .s-accent-strip { width: 3px; flex-shrink: 0; background: var(--rule2); transition: background 0.2s; }
        .s-row:hover .s-accent-strip { background: var(--accent); }
        .s-accent-strip.top3 { background: var(--accent); }

        .s-body { flex: 1; padding: 20px 22px; display: flex; align-items: flex-start; gap: 18px; min-width: 0; }
        .s-logo-wrap { width: 52px; height: 52px; flex-shrink: 0; border-radius: 12px; border: 1px solid var(--rule2); background: var(--parch-dark); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .s-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .s-logo-initial { font-size: 20px; font-weight: 700; color: #CCC; font-family: 'Playfair Display', serif; }
        .s-content { flex: 1; min-width: 0; }

        .s-top-line { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 6px; }
        .s-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); line-height: 1.25; }
        .s-row:hover .s-name { color: #92400E; }
        .s-badges { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .s-badge-cat { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); background: var(--parch-dark); padding: 2px 8px; border-radius: 4px; font-family: system-ui, sans-serif; white-space: nowrap; }
        .s-badge-verified { display: inline-flex; align-items: center; gap: 3px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--green); font-family: system-ui, sans-serif; }

        .s-desc { font-size: 13px; color: #6B5C40; font-style: italic; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 10px; }
        .s-meta-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
        .s-meta-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); font-family: system-ui, sans-serif; }
        .s-meta-item svg { opacity: 0.6; }
        .s-ufrn { font-family: monospace; font-size: 9px; font-weight: 700; color: var(--accent); letter-spacing: 0.05em; background: #FEF3C7; border: 1px solid #FDE68A; padding: 2px 8px; border-radius: 4px; }

        .s-right-col { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; padding: 20px 20px 20px 0; gap: 12px; flex-shrink: 0; }
        .s-rank-num { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: var(--rule); line-height: 1; transition: color 0.2s; }
        .s-row:hover .s-rank-num { color: var(--accent); }
        .s-rank-num.top3 { color: var(--accent); }
        .s-arrow { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: var(--parch-dark); transition: all 0.2s; }
        .s-row:hover .s-arrow { background: var(--accent); }
        .s-row:hover .s-arrow svg { color: white !important; }

        @media (max-width: 600px) {
          .s-right-col { padding: 14px 14px 14px 0; }
          .s-rank-num { font-size: 18px; }
          .s-body { padding: 14px 0 14px 14px; gap: 12px; }
          .s-name { font-size: 15px; }
          .s-desc { font-size: 12px; }
          .s-logo-wrap { width: 44px; height: 44px; }
        }

        .empty-state { text-align: center; padding: 80px 32px; border: 1px solid var(--rule2); background: white; border-radius: 16px; }

        /* ─── PAGINATION ─── */
        .pag { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 44px; padding-top: 28px; border-top: 1px solid var(--rule2); }
        .pag-btn { padding: 9px 20px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--rule); background: white; color: var(--muted); text-decoration: none; border-radius: 10px; }
        .pag-btn:hover { border-color: var(--accent); color: var(--accent); }
        .pag-btn.dis { opacity: 0.35; pointer-events: none; }
        .pag-num { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; border: 1px solid var(--rule); text-decoration: none; color: var(--muted); border-radius: 10px; }
        .pag-num:hover { border-color: var(--accent); color: var(--accent); }
        .pag-num.on { background: var(--accent); color: white; border-color: var(--accent); }

        /* ─── SIDEBAR ─── */
        .rg-aside { display: flex; flex-direction: column; gap: 20px; }
        .aside-box { border-radius: 16px; border: 1px solid var(--rule2); background: white; padding: 22px; }
        .aside-box.dk { background: linear-gradient(135deg, var(--ink) 0%, #2A2012 100%); border-color: transparent; }
        .aside-ey { font-size: 8.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.28em; color: #AAA; margin-bottom: 12px; font-family: system-ui, sans-serif; }
        .aside-box.dk .aside-ey { color: rgba(249,202,95,0.7); }
        .aside-h { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .aside-box.dk .aside-h { color: white; }
        .aside-p { font-size: 12.5px; color: #5A4A30; font-style: italic; line-height: 1.6; margin-bottom: 16px; }
        .aside-btn { display: block; text-align: center; font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.14em; background: var(--accent); color: white; padding: 13px; text-decoration: none; border-radius: 10px; }
        .aside-btn:hover { background: var(--accent-light); }
        .aside-list { list-style: none; padding: 0; margin: 0; }
        .aside-list li { border-bottom: 1px solid var(--rule2); }
        .aside-list li:last-child { border-bottom: none; }
        .aside-list a { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; font-size: 12.5px; color: #5A4A30; text-decoration: none; font-style: italic; }
        .aside-list a:hover { color: var(--accent); }

        /* ─── CTA ─── */
        .cta-block { background: linear-gradient(135deg, var(--ink) 0%, #2A2012 100%); border-radius: 20px; padding: 36px 44px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; margin-top: 48px; }
        .cta-ey { font-size: 8.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(232,197,71,0.7); margin-bottom: 8px; font-family: system-ui, sans-serif; }
        .cta-h { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: white; margin-bottom: 6px; }
        .cta-p { font-size: 12px; color: rgba(255,255,255,0.45); font-style: italic; }
        .cta-btn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px; background: var(--accent); color: white; padding: 13px 28px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; border-radius: 40px; transition: all 0.2s; }
        .cta-btn:hover { background: var(--accent-light); transform: translateY(-2px); }

        .links-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 36px; padding-top: 36px; border-top: 1px solid var(--rule2); }
        @media (max-width: 700px) { .links-grid { grid-template-columns: repeat(2, 1fr); } }
        .link-card { padding: 12px 14px; border-radius: 12px; border: 1px solid var(--rule2); background: white; text-decoration: none; transition: all 0.2s; }
        .link-card:hover { border-color: var(--accent); transform: translateY(-1px); }
        .link-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); display: flex; align-items: center; gap: 5px; margin-bottom: 4px; font-family: system-ui, sans-serif; }
        .link-desc { font-size: 10px; color: #AAA; font-family: system-ui, sans-serif; }

        @media (max-width: 768px) {
          .mast-content { padding: 120px 20px 70px !important; }
          .mast-tagline br { display: none; }
          .toolbar-inner { padding: 0 16px; }
          .results-bar { padding: 14px 16px; }
          .main-wrap { padding: 24px 16px 40px; }
          .cta-block { padding: 24px 20px; }
          .filter-panel { gap: 10px; }
          .fp-sel { min-width: 120px; }
        }
        @media (max-width: 480px) {
          .mast-content { padding: 100px 16px 60px !important; }
          .mast-h1 { font-size: 36px; }
          .sort-quick { display: none; }
        }
      `}</style>

      <div className="page-root">
        <Navbar />

        <div className="page-content">

          {/* ── Hero ── */}
          <div className="hero-section">
            <div className="hero-bg" />
            <div className="mast">
              <div className="mast-content ri-0">
                <h1 className="mast-h1">Indian Registry</h1>
                <span className="mast-rule" />
                <p className="mast-tagline">
                  India's independent registry of verified builders —<br />free, structured, permanent.
                </p>
                <div className="live-badge">
                  <span className="live-dot" />
                  <span className="live-text">Live · {total.toLocaleString()} Profiles · All Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Category Tabs ── */}
          <nav className="cat-tabs" aria-label="Browse by sector">
            <span style={{ fontSize: 9, color: "#CCC", textTransform: "uppercase", letterSpacing: ".2em", padding: "14px 8px 14px 0", flexShrink: 0, fontFamily: "system-ui, sans-serif" }}>
              Browse:
            </span>
            <Link href="/startup" className={`cat-tab${!cat && !q ? " on" : ""}`}>All</Link>
            {cats.slice(0, 12).map(c => (
              <Link
                key={c}
                href={`/startup?category=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={`cat-tab${cat === c ? " on" : ""}`}
              >
                {c}
              </Link>
            ))}
            {cats.length > 12 && <Link href="/startup" className="cat-tab">More →</Link>}
          </nav>

          {/* ── Toolbar ── */}
          <div className="toolbar" id="rg-toolbar">
            <div className="toolbar-inner">

              {/* Search row */}
              <form action="/startup" method="GET" className="t-search-row" id="search-form">
                {year && <input type="hidden" name="year"     value={year} />}
                {cat  && <input type="hidden" name="category" value={cat} />}
                {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
                <span className="t-icon" aria-hidden="true">🔍</span>
                <input
                  type="search" name="q" defaultValue={q} className="t-inp"
                  placeholder="Search startups, founders, sectors, cities…"
                  aria-label="Search startup registry" autoComplete="off"
                />
                <button type="submit" className="t-btn">Search</button>
              </form>

              {/* Filter toggle row */}
              <div className="filter-toggle-row">
                <button
                  type="button"
                  className={`filter-toggle-btn${activeFilterCount > 0 ? " active" : ""}`}
                  id="filter-toggle-btn"
                  aria-expanded="false"
                  aria-controls="filter-panel"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="2" y1="4" x2="14" y2="4"/><line x1="4" y1="8" x2="12" y2="8"/><line x1="6" y1="12" x2="10" y2="12"/>
                  </svg>
                  Filters
                  {activeFilterCount > 0 && <span className="filter-count-badge">{activeFilterCount}</span>}
                  <span className="filter-toggle-chevron">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2,3 5,7 8,3"/>
                    </svg>
                  </span>
                </button>

                {/* Sort — always visible */}
                <div className="sort-quick">
                  <span className="t-div" />
                  <Link href={qs({ sort: "name",   page: undefined })} className={`t-sort${sort === "name"   ? " on" : ""}`}>A–Z</Link>
                  <Link href={qs({ sort: "newest", page: undefined })} className={`t-sort${sort === "newest" ? " on" : ""}`}>Newest</Link>
                  <Link href={qs({ sort: "year",   page: undefined })} className={`t-sort${sort === "year"   ? " on" : ""}`}>Founded</Link>
                  {isFiltered && <Link href="/startup" className="t-clear">✕ Clear</Link>}
                </div>
              </div>

              {/* Collapsible filter panel */}
              <div className="filter-panel-wrap" id="filter-panel" role="region" aria-label="Filters">
                <div className="filter-panel">

                  <div className="fp-group">
                    <label className="fp-label" htmlFor="rg-year-sel">Year</label>
                    <select className={`fp-sel${year ? " active" : ""}`} id="rg-year-sel" aria-label="Filter by founded year">
                      <option value="">Any Year</option>
                      {years.map(yr => (
                        <option key={yr} value={String(yr)} selected={year === String(yr)}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div className="fp-group">
                    <label className="fp-label" htmlFor="rg-cat-sel">Sector</label>
                    <select className={`fp-sel${cat ? " active" : ""}`} id="rg-cat-sel" aria-label="Filter by sector">
                      <option value="">All Sectors</option>
                      {cats.map(c => (
                        <option key={c} value={c} selected={cat === c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {isFiltered && (
                    <>
                      <div className="fp-divider" />
                      <Link href="/startup" className="t-clear">✕ Clear all</Link>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ── Results bar ── */}
          <div className="results-bar">
            <span className="results-q">
              {q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Indian Startups"}
            </span>
            <span className="results-n">{total.toLocaleString()} profiles</span>
            <span className="results-rule" />
            <span className="results-pg">Page {page} of {totalPages || 1}</span>
          </div>

          <div className="main-wrap">
            <div className="main-grid">
              <div>

                {/* Featured */}
                {featured.length > 0 && (
                  <section>
                    <div className="sh">
                      <span style={{ color: "var(--accent)", fontSize: 12 }}>✦</span>
                      <span className="sh-l">Featured Startups</span>
                      <div className="sh-r" />
                    </div>
                    <div className="feat-grid">
                      {featured.map((s, fi) => (
                        <Link key={s.id} href={`/startup/${s.slug}`} className="feat-card">
                          <div className="feat-img-wrap">
                            {s.logo_url
                              ? <img src={s.logo_url} alt={s.name} loading={fi === 0 ? "eager" : "lazy"} />
                              : (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "var(--parch-dark)" }}>
                                  <span style={{ fontSize: 32, fontWeight: 700, color: "#CCC", fontFamily: "'Playfair Display', serif" }}>{s.name.charAt(0)}</span>
                                </div>
                              )
                            }
                            <div className="feat-overlay" />
                            <div className="feat-caption">
                              <div className="feat-sector">{s.category ?? "Startup"}</div>
                              <div className="feat-company">{s.name}</div>
                            </div>
                          </div>
                          <div className="feat-body">
                            <p className="feat-desc">{s.description?.slice(0, 100) ?? "Building for India's next decade."}</p>
                            <div className="feat-foot">
                              <div className="feat-chips">
                                {s.founded_year && <span>📅 {s.founded_year}</span>}
                                {s.city && <span>📍 {s.city}</span>}
                              </div>
                              <ArrowUpRight size={13} style={{ color: "var(--rule)" }} />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Grid list */}
                {grid.length > 0 ? (
                  <section>
                    {featured.length > 0 && (
                      <div className="sh">
                        <span className="sh-l">All Startups</span>
                        <div className="sh-r" />
                      </div>
                    )}
                    <div className="startup-list">
                      {grid.map((s, idx) => {
                        const rank  = baseNum + idx + 1
                        const isTop3 = rank <= 3
                        return (
                          <Link key={s.id} href={`/startup/${s.slug}`} className="s-row">
                            <div className={`s-accent-strip${isTop3 ? " top3" : ""}`} />
                            <div className="s-body">
                              <div className="s-logo-wrap">
                                {s.logo_url
                                  ? <img src={s.logo_url} alt={s.name} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                  : <span className="s-logo-initial">{s.name.charAt(0)}</span>
                                }
                              </div>
                              <div className="s-content">
                                <div className="s-top-line">
                                  <span className="s-name">{s.name}</span>
                                  <div className="s-badges">
                                    {s.category && <span className="s-badge-cat">{s.category}</span>}
                                    <span className="s-badge-verified">
                                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 6L5 9L10 3" />
                                      </svg>
                                      Verified
                                    </span>
                                  </div>
                                </div>
                                {s.description && <p className="s-desc">{s.description.slice(0, 130)}</p>}
                                <div className="s-meta-row">
                                  {formatFounders(s.founders) && (
                                    <div className="s-meta-item"><Users size={11} /><span>{formatFounders(s.founders)}</span></div>
                                  )}
                                  {s.founded_year && (
                                    <div className="s-meta-item"><Calendar size={11} /><span>{s.founded_year}</span></div>
                                  )}
                                  {s.city && (
                                    <div className="s-meta-item"><MapPin size={11} /><span>{s.city}</span></div>
                                  )}
                                  {s.ufrn && <span className="s-ufrn">{s.ufrn}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="s-right-col">
                              <span className={`s-rank-num${isTop3 ? " top3" : ""}`}>
                                {rank < 10 ? `0${rank}` : rank}
                              </span>
                              <div className="s-arrow">
                                <ArrowUpRight size={13} style={{ color: "#CCC" }} />
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </section>
                ) : (
                  <div className="empty-state">
                    <span style={{ fontSize: 48, color: "var(--rule)", display: "block", marginBottom: 16 }}>🔍</span>
                    <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>No startups found</p>
                    <p style={{ fontSize: 13, color: "#5A4A30", fontStyle: "italic" }}>
                      {q ? `Nothing matched "${q}".` : "Try adjusting your filters."}
                    </p>
                    <Link href="/startup" style={{ display: "inline-block", background: "var(--accent)", color: "white", padding: "11px 24px", borderRadius: "40px", fontSize: 11, marginTop: 20, textDecoration: "none", fontFamily: "system-ui, sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Clear filters
                    </Link>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="pag">
                    <Link href={pgHref(page - 1)} className={`pag-btn${page === 1 ? " dis" : ""}`}>← Prev</Link>
                    {pgNums.map(p => (
                      <Link key={p} href={pgHref(p)} className={`pag-num${p === page ? " on" : ""}`}>{p}</Link>
                    ))}
                    <Link href={pgHref(page + 1)} className={`pag-btn${page === totalPages ? " dis" : ""}`}>Next →</Link>
                  </nav>
                )}
              </div>

              {/* ── Sidebar ── */}
              <aside className="rg-aside" style={{ position: "sticky", top: 80 }}>
                <div className="aside-box dk">
                  <p className="aside-ey">✨ List Free</p>
                  <p className="aside-h">Got a startup to list?</p>
                  <p className="aside-p">Get verified. Free forever. Trusted by investors.</p>
                  <Link href="/submit" className="aside-btn">Submit Your Startup →</Link>
                </div>
                {cats.length > 0 && (
                  <div className="aside-box">
                    <p className="aside-ey">📂 Browse by Sector</p>
                    <ul className="aside-list">
                      {cats.slice(0, 8).map(c => (
                        <li key={c}>
                          <Link href={`/startup?category=${encodeURIComponent(c)}`}>
                            <span>{c}</span><span style={{ color: "#CCC" }}>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>

            {/* CTA */}
            <div className="cta-block">
              <div>
                <p className="cta-ey">🚀 UpForge</p>
                <p className="cta-h">Your founder story starts here.</p>
                <p className="cta-p">Free verified profile. Trusted by investors across India.</p>
              </div>
              <Link href="/submit" className="cta-btn">
                List Free <ArrowRight size={13} />
              </Link>
            </div>

            {/* Footer links */}
            <div className="links-grid">
              <Link href="/startup" className="link-card"><span className="link-title">Startup Registry →</span><span className="link-desc">Verified Indian startups</span></Link>
              <Link href="/submit" className="link-card"><span className="link-title">Submit Your Startup →</span><span className="link-desc">Get listed free</span></Link>
              <Link href="/blog" className="link-card"><span className="link-title">The Forge Blog →</span><span className="link-desc">Startup intelligence</span></Link>
              <Link href="/about" className="link-card"><span className="link-title">About UpForge →</span><span className="link-desc">Our mission</span></Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Client-side JS ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function () {

          // ── Filter panel toggle ──────────────────────────────────────
          var btn   = document.getElementById('filter-toggle-btn');
          var panel = document.getElementById('filter-panel');
          if (btn && panel) {
            var hasActive = ${activeFilterCount > 0 ? "true" : "false"};
            if (hasActive) {
              panel.classList.add('open');
              btn.classList.add('active');
              btn.setAttribute('aria-expanded', 'true');
            }
            btn.addEventListener('click', function () {
              var isOpen = panel.classList.toggle('open');
              btn.classList.toggle('active', isOpen);
              btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
          }

          // ── URL builder ─────────────────────────────────────────────
          function buildUrl(params) {
            var p = new URLSearchParams();
            if (params.q)        p.set('q',        params.q);
            if (params.year)     p.set('year',     params.year);
            if (params.category) p.set('category', params.category);
            if (params.sort && params.sort !== 'name') p.set('sort', params.sort);
            var s = p.toString();
            return '/startup' + (s ? '?' + s : '');
          }

          function getCurrentParams() {
            var u = new URLSearchParams(window.location.search);
            return {
              q:        u.get('q')        || '',
              year:     u.get('year')     || '',
              category: u.get('category') || '',
              sort:     u.get('sort')     || 'name',
            };
          }

          // ── Select change handlers ───────────────────────────────────
          var yearSel = document.getElementById('rg-year-sel');
          var catSel  = document.getElementById('rg-cat-sel');

          if (yearSel) yearSel.addEventListener('change', function () {
            var c = getCurrentParams(); c.year = this.value;
            window.location.href = buildUrl(c);
          });
          if (catSel) catSel.addEventListener('change', function () {
            var c = getCurrentParams(); c.category = this.value;
            window.location.href = buildUrl(c);
          });

          // ── Search form ──────────────────────────────────────────────
          var searchForm = document.getElementById('search-form');
          if (searchForm) searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var c = getCurrentParams();
            c.q = this.querySelector('input[name="q"]').value;
            window.location.href = buildUrl(c);
          });

        })();
      `}} />
    </>
  )
}
