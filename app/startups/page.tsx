// app/startups/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// /startups — Category Hub  (Google Sheets powered — no Supabase)
// ─────────────────────────────────────────────────────────────────────────────
import { getCategoryStats as getSheetCategoryStats } from "@/lib/google-sheets"
import { getDisplayName, generateCategoryDescription } from "@/lib/categories"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const revalidate = 300 // 5 minutes

interface CategoryStat {
  dbCategory: string; slug: string; displayName: string
  description: string; count: number
}

async function getCategoryStats(): Promise<{ categories: CategoryStat[]; total: number }> {
  try {
    const { categories: raw, total } = await getSheetCategoryStats()
    const stats: CategoryStat[] = raw.map((c) => ({
      dbCategory: c.dbCategory,
      slug: c.slug,
      displayName: getDisplayName(c.dbCategory),
      description: generateCategoryDescription(c.dbCategory, c.count),
      count: c.count,
    }))
    return { categories: stats, total }
  } catch (e) {
    console.error("[startups hub]", e)
    return { categories: [], total: 0 }
  }
}

export async function generateMetadata({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string }> }): Promise<Metadata> {
  const { total, categories } = await getCategoryStats()
  const n = total > 0 ? total.toLocaleString() : "1,000+"
  const sp = await searchParams
  const q = sp?.q || ''
  const category = sp?.category || ''
  
  let title = `Global Startup Registry by Category 2026 — ${n}+ Verified | UpForge`
  let description = `Discover ${n}+ verified startups across ${categories.length || "30"}+ sectors — AI, FinTech, SaaS, EdTech, HealthTech and more. A structured independent startup registry.`
  const keywords = [
    "startup registry",
    "verified startups",
    "startup directory",
    "global startup sectors",
    "founder database",
    "UFRN verified",
  ]

  if (q) {
    title = `Search: "${q}" — ${n}+ Verified Startups | UpForge Registry`
    description = `Search results for "${q}" across ${n}+ verified startups. Find founders, funding data, and startup profiles.`
    keywords.push(`${q} startups`)
  }

  if (category) {
    title = `${category} Startups 2026 | UpForge Registry`
    description = `Browse verified ${category} startups. Founder profiles, funding details, and UFRN credentials.`
    keywords.push(`${category} startups`)
  }

  const hasQueryVariant = Boolean(q || category)

  return {
    title,
    description,
    keywords: keywords.filter(Boolean),
    alternates: { canonical: "https://upforge.org/startups" },
    openGraph: {
      title: `Global Startups by Category 2026 | UpForge`,
      description: `Browse ${n}+ verified startups by sector. The world's most comprehensive startup registry.`,
      url: "https://upforge.org/startups",
      siteName: "UpForge",
      images: [{ url: "https://upforge.org/og/registry.png", width: 1200, height: 630 }],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Global Startups by Category 2026 | UpForge`,
      description: `Browse ${n}+ verified startups by sector.`,
      images: ["https://upforge.org/og/registry.png"],
    },
    robots: hasQueryVariant ? { index: false, follow: true } : { index: true, follow: true },
  }
}

// SECTOR ICON MAP — emoji fallback for visual richness
const SECTOR_ICONS: Record<string, string> = {
  "ai": "◈", "ai/ml": "◈", "fintech": "◎", "edtech": "◉", "healthtech": "✦",
  "saas": "⬡", "ecommerce": "◆", "e-commerce": "◆", "agritech": "◈",
  "climate-tech": "◍", "logistics": "◫", "biotech": "◉", "devtools": "⬡",
  "web3": "◎", "robotics": "◉", "gaming": "◆", "creator-economy": "✦",
  "d2c": "◆", "deeptech": "◈", "spacetech": "✦", "mobility": "◫",
}
function getSectorIcon(slug: string): string {
  return SECTOR_ICONS[slug.toLowerCase()] ?? "◈"
}

// SECTOR ACCENT COLORS — tasteful, not garish
const SECTOR_COLORS: Record<string, string> = {
  "ai": "#2563EB", "ai/ml": "#2563EB", "fintech": "#059669", "edtech": "#D97706",
  "healthtech": "#DC2626", "saas": "#7C3AED", "ecommerce": "#EA580C",
  "e-commerce": "#EA580C", "agritech": "#16A34A", "climate-tech": "#0D9488",
  "logistics": "#92400E", "biotech": "#BE185D", "devtools": "#4F46E5",
  "web3": "#6D28D9", "robotics": "#1D4ED8", "gaming": "#B45309",
  "creator-economy": "#C026D3",
}
function getSectorColor(slug: string): string {
  return SECTOR_COLORS[slug.toLowerCase()] ?? "#1A1208"
}

export default async function StartupsHubPage() {
  const { categories, total } = await getCategoryStats()

  const schemas = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.org" },
        { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://upforge.org/registry" },
        { "@type": "ListItem", position: 3, name: "Browse by Sector", item: "https://upforge.org/startups" },
      ]},
    { "@context": "https://schema.org", "@type": "CollectionPage",
      name: "Global Startups by Category 2026 — UpForge",
      description: `${total.toLocaleString()}+ verified startups across ${categories.length} sectors.`,
      url: "https://upforge.org/startups", numberOfItems: total },
    { "@context": "https://schema.org", "@type": "ItemList",
      name: "Startup Sectors",
      itemListElement: categories.map((c, i) => ({
        "@type": "ListItem", position: i + 1,
        name: `${c.displayName} Startups`,
        url: `https://upforge.org/startups/${c.slug}`,
      }))},
  ]

  const topFive  = categories.slice(0, 5)
  const restCats = categories.slice(5)

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        :root {
          --cream:   #F2EFE6;
          --cream2:  #EDE9DC;
          --cream3:  #FAF8F3;
          --ink:     #1A1208;
          --ink2:    #3D2E18;
          --ink3:    #6B5C40;
          --ink4:    #9C8B72;
          --rule:    #D5CEBC;
          --rule2:   #EAE4D4;
          --saffron: #E8933A;
          --gold:    #C9A84C;
          --white:   #FDFCF8;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: var(--cream); }

        .hub-wrap { min-height: 100vh; background: var(--cream); font-family: 'EB Garamond', Georgia, serif; color: var(--ink); }

        /* ── BREADCRUMB ── */
        .hub-bc { border-bottom: 1px solid var(--rule); background: var(--white); }
        .hub-bc-inner { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px,4vw,48px); display: flex; align-items: center; gap: 6px; height: 34px; font-family: system-ui,sans-serif; font-size: 10px; letter-spacing: .04em; color: var(--ink4); list-style: none; }
        .hub-bc-inner a { color: var(--ink4); text-decoration: none; transition: color .15s; }
        .hub-bc-inner a:hover { color: var(--ink); }
        .hub-bc-sep { color: var(--rule); }

        /* ── MASTHEAD ── */
        .hub-mast { border-bottom: 3px solid var(--ink); background: var(--cream); }
        .hub-mast-inner { max-width: 1280px; margin: 0 auto; padding: clamp(36px,6vw,72px) clamp(16px,4vw,48px) clamp(28px,5vw,56px); text-align: center; }
        .hub-edition { font-family: system-ui,sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .42em; text-transform: uppercase; color: var(--ink4); margin-bottom: 18px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .hub-edition-line { height: 1px; width: 60px; background: var(--rule); }
        .hub-h1 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2.4rem,6vw,5.2rem); font-weight: 900; letter-spacing: -.025em; color: var(--ink); line-height: 1.05; margin-bottom: 14px; }
        .hub-h1 em { font-style: italic; color: var(--ink2); }
        .hub-sub { font-size: clamp(13px,1.6vw,15px); color: var(--ink3); font-style: italic; line-height: 1.7; max-width: 580px; margin: 0 auto 28px; }
        .hub-divider { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 32px; }
        .hub-div-line { height: 1px; width: 80px; background: var(--rule); }
        .hub-div-dot { color: var(--rule); font-size: 12px; }

        /* ── STATS ROW ── */
        .hub-stats { display: flex; align-items: center; justify-content: center; gap: 0; border: 1px solid var(--rule); background: var(--ink); max-width: 640px; margin: 0 auto; }
        .hub-stat { flex: 1; padding: 14px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,.08); }
        .hub-stat:last-child { border-right: none; }
        .hub-stat-v { font-family: 'Playfair Display', serif; font-size: clamp(1.3rem,2.5vw,1.8rem); font-weight: 900; color: #fff; line-height: 1; margin-bottom: 3px; }
        .hub-stat-l { font-family: system-ui,sans-serif; font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .2em; color: rgba(255,255,255,.38); }
        @media(max-width:480px) {
          .hub-stats { flex-direction: column; }
          .hub-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,.08); }
          .hub-stat:last-child { border-bottom: none; }
        }

        /* ── SEARCH BAR ── */
        .hub-search-wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px,4vw,48px); }
        .hub-search-box { display: flex; align-items: center; border: 2px solid var(--ink); background: var(--white); margin: 28px 0 0; }
        .hub-search-label { font-family: system-ui,sans-serif; font-size: 9px; font-weight: 900; letter-spacing: .3em; text-transform: uppercase; color: var(--ink4); padding: 0 16px; border-right: 1px solid var(--rule); white-space: nowrap; height: 46px; display: flex; align-items: center; }
        .hub-search-input { flex: 1; height: 46px; border: none; background: transparent; padding: 0 16px; font-family: 'EB Garamond', serif; font-size: 15px; color: var(--ink); outline: none; font-style: italic; }
        .hub-search-input::placeholder { color: var(--ink4); }
        .hub-search-btn { height: 46px; padding: 0 24px; background: var(--ink); color: #fff; border: none; font-family: system-ui,sans-serif; font-size: 9px; font-weight: 900; letter-spacing: .22em; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 6px; text-decoration: none; transition: background .15s; white-space: nowrap; }
        .hub-search-btn:hover { background: var(--saffron); }

        /* ── SECTION HEADER ── */
        .sec-hd { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .sec-hd-label { font-family: system-ui,sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .32em; color: var(--ink4); white-space: nowrap; }
        .sec-hd-rule { flex: 1; height: 1px; background: var(--rule); }
        .sec-hd-count { font-family: system-ui,sans-serif; font-size: 8.5px; font-weight: 700; letter-spacing: .1em; color: var(--ink4); white-space: nowrap; }

        /* ── MAIN LAYOUT ── */
        .hub-main { max-width: 1280px; margin: 0 auto; padding: clamp(28px,5vw,52px) clamp(16px,4vw,48px) 72px; }

        /* ── TOP 5 FEATURED STRIP ── */
        .top-strip { background: var(--ink); border: 1px solid var(--ink); display: grid; grid-template-columns: repeat(5,1fr); gap: 0; margin-bottom: 48px; }
        @media(max-width:900px) { .top-strip { grid-template-columns: repeat(3,1fr); } }
        @media(max-width:540px) { .top-strip { grid-template-columns: repeat(2,1fr); } }
        .top-cell { padding: 24px 20px; border-right: 1px solid rgba(255,255,255,.07); text-decoration: none; display: flex; flex-direction: column; gap: 10px; transition: background .15s; position: relative; overflow: hidden; }
        .top-cell:last-child { border-right: none; }
        .top-cell:hover { background: #2a1f0e; }
        .top-cell-rank { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 900; line-height: 1; color: rgba(255,255,255,.08); letter-spacing: -.04em; }
        .top-cell-color { width: 28px; height: 3px; margin-bottom: 2px; }
        .top-cell-name { font-family: 'Playfair Display', serif; font-size: clamp(.85rem,1.2vw,1rem); font-weight: 700; color: #fff; line-height: 1.25; }
        .top-cell-count { font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .18em; color: rgba(255,255,255,.4); }
        .top-cell-arrow { position: absolute; top: 16px; right: 16px; font-size: 14px; color: rgba(255,255,255,.2); transition: color .15s, transform .15s; }
        .top-cell:hover .top-cell-arrow { color: rgba(255,255,255,.7); transform: translate(2px,-2px); }

        /* ── TAG STRIP ── */
        .tag-strip { display: flex; flex-wrap: wrap; gap: 6px; padding: 16px 0 24px; border-bottom: 1px solid var(--rule); margin-bottom: 36px; }
        .tag-pill { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border: 1px solid var(--rule); background: var(--white); font-family: system-ui,sans-serif; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--ink3); text-decoration: none; transition: all .15s; }
        .tag-pill:hover { border-color: var(--ink); color: var(--ink); background: var(--cream2); }
        .tag-pill-n { color: var(--rule); font-size: 8.5px; }

        /* ── CATEGORY GRID ── */
        .cat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; background: var(--rule2); border: 1px solid var(--rule); }
        @media(max-width:1024px) { .cat-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media(max-width:680px)  { .cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:400px)  { .cat-grid { grid-template-columns: 1fr !important; } }

        .cat-cell { background: var(--white); padding: 22px 20px; display: flex; flex-direction: column; gap: 10px; text-decoration: none; border-right: 1px solid var(--rule2); border-bottom: 1px solid var(--rule2); transition: background .15s, box-shadow .15s, transform .15s; position: relative; }
        .cat-cell:hover { background: var(--cream); transform: translate(-2px,-2px); box-shadow: 3px 3px 0 var(--ink); z-index: 1; border-color: var(--ink) !important; }
        .cat-cell-head { display: flex; align-items: flex-start; justify-content: space-between; }
        .cat-cell-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px; border-radius: 2px; flex-shrink: 0; }
        .cat-cell-rank { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 900; color: var(--rule2); line-height: 1; }
        .cat-cell-arrow { font-size: 14px; color: var(--rule); transition: color .15s, transform .15s; }
        .cat-cell:hover .cat-cell-arrow { color: var(--ink); transform: translate(2px,-2px); }
        .cat-cell-name { font-family: 'Playfair Display', serif; font-size: clamp(.88rem,1.1vw,1rem); font-weight: 700; color: var(--ink); line-height: 1.25; }
        .cat-cell-desc { font-size: clamp(11px,1vw,12px); color: var(--ink3); line-height: 1.65; font-style: italic; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; flex: 1; }
        .cat-cell-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--rule2); margin-top: auto; }
        .cat-cell-verified { display: flex; align-items: center; gap: 5px; font-family: system-ui,sans-serif; font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; color: #15803D; }
        .cat-cell-explore { font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--ink4); }
        .cat-cell:hover .cat-cell-explore { color: var(--ink); }

        /* ── CTA BLOCK ── */
        .hub-cta { background: var(--ink); padding: clamp(28px,4vw,48px) clamp(20px,4vw,48px); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; margin-top: 48px; }
        .hub-cta-eyebrow { font-family: system-ui,sans-serif; font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: .3em; color: var(--saffron); margin-bottom: 8px; }
        .hub-cta-h { font-family: 'Playfair Display', serif; font-size: clamp(1.1rem,2.2vw,1.55rem); font-weight: 700; color: #fff; line-height: 1.25; margin-bottom: 8px; }
        .hub-cta-p { font-size: 12.5px; color: rgba(255,255,255,.45); font-style: italic; line-height: 1.7; }
        .hub-cta-btn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px; background: #fff; color: var(--ink); padding: 12px 28px; font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: .2em; font-family: system-ui,sans-serif; text-decoration: none; transition: background .15s; }
        .hub-cta-btn:hover { background: var(--saffron); }

        /* ── FOOTER NAV ── */
        .hub-foot-nav { margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--rule); }
        .hub-foot-label { font-family: system-ui,sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .32em; color: var(--ink4); margin-bottom: 14px; }
        .hub-foot-links { display: flex; flex-wrap: wrap; gap: 6px 24px; list-style: none; }
        .hub-foot-links a { font-size: 13px; color: var(--ink3); text-decoration: none; font-style: italic; transition: color .15s; }
        .hub-foot-links a:hover { color: var(--ink); text-decoration: underline; }

        /* ── PROMISE BAR ── */
        .promise-bar { display: flex; flex-wrap: wrap; background: var(--white); border: 1px solid var(--rule); border-top: none; margin-bottom: 48px; }
        .promise-item { flex: 1; min-width: 180px; padding: 16px 20px; border-right: 1px solid var(--rule); display: flex; align-items: flex-start; gap: 10px; }
        .promise-item:last-child { border-right: none; }
        .promise-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .promise-label { font-family: system-ui,sans-serif; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .16em; color: var(--ink); margin-bottom: 2px; }
        .promise-desc { font-size: 11.5px; color: var(--ink3); font-style: italic; line-height: 1.5; }
        @media(max-width:640px) {
          .promise-item { border-right: none !important; border-bottom: 1px solid var(--rule); flex: 0 0 100%; }
          .promise-item:last-child { border-bottom: none; }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--rule); }
      `}</style>

      <div className="hub-wrap">
        <Navbar />

        {/* BREADCRUMB */}
        <div className="hub-bc">
          <ol className="hub-bc-inner">
            <li><a href="/">Home</a></li>
            <li className="hub-bc-sep">/</li>
            <li><a href="/registry">Startup Registry</a></li>
            <li className="hub-bc-sep">/</li>
            <li style={{ color: "var(--ink)", fontWeight: 600 }}>Browse by Sector</li>
          </ol>
        </div>

        {/* MASTHEAD */}
        <header className="hub-mast">
          <div className="hub-mast-inner">
            <div className="hub-edition">
              <span className="hub-edition-line" />
              UpForge Registry · Global Edition 2026
              <span className="hub-edition-line" />
            </div>
            <h1 className="hub-h1">
              Browse Global Startups<br />
              <em>by Sector</em>
            </h1>
            <p className="hub-sub">
              The world's independent registry of <strong style={{ fontStyle: "normal", color: "var(--ink)" }}>{total > 0 ? `${total.toLocaleString()}+` : "1,000+"} verified startups</strong> across{" "}
              <strong style={{ fontStyle: "normal", color: "var(--ink)" }}>{categories.length || "30"}+ sectors</strong>.
              Every profile is sourced from the vetted UpForge registry dataset — free for founders and designed for research, discovery, and press.
            </p>
            <div className="hub-divider">
              <span className="hub-div-line" />
              <span className="hub-div-dot">✦</span>
              <span className="hub-div-line" />
            </div>
            {/* STATS */}
            <div className="hub-stats">
              {[
                { v: total > 0 ? `${total.toLocaleString()}+` : "1,000+", l: "Verified Startups" },
                { v: categories.length > 0 ? String(categories.length) : "30+", l: "Sectors" },
                { v: "Daily", l: "Updated" },
                { v: "Free", l: "Forever" },
              ].map((s, i) => (
                <div key={i} className="hub-stat">
                  <div className="hub-stat-v">{s.v}</div>
                  <div className="hub-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="hub-search-wrap">
          <div className="hub-search-box">
            <span className="hub-search-label">Search Sector</span>
            <input
              type="search"
              className="hub-search-input"
              placeholder="e.g. Artificial Intelligence, FinTech, SaaS…"
              aria-label="Search startup sectors"
              id="sector-search"
            />
            <a href="/registry" className="hub-search-btn">
              Browse All →
            </a>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="hub-main">

          {/* TOP 5 FEATURED STRIP */}
          {topFive.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <div className="sec-hd">
                <span className="sec-hd-label">Most Active Sectors</span>
                <span className="sec-hd-rule" />
                <span className="sec-hd-count">{topFive.length} featured</span>
              </div>
              <div className="top-strip">
                {topFive.map((cat, i) => (
                  <a key={cat.slug} href={`/startups/${cat.slug}`} className="top-cell">
                    <span className="top-cell-rank">{String(i + 1).padStart(2, "0")}</span>
                    <div className="top-cell-color" style={{ background: getSectorColor(cat.slug) }} />
                    <span className="top-cell-name">{cat.displayName}</span>
                    <span className="top-cell-count">{cat.count.toLocaleString()} verified startups</span>
                    <span className="top-cell-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* PROMISE BAR */}
          <div className="promise-bar">
            {[
              { label: "Manually Verified", desc: "Every profile reviewed before listing", color: "#15803D" },
              { label: "No Paid Rankings",  desc: "Zero sponsored placements, ever",        color: "#2563EB" },
              { label: "Permanently Indexed", desc: "Public, structured, always accessible", color: "#7C3AED" },
              { label: "Free for Founders", desc: "Listing and tools — always free",        color: "#DC2626" },
            ].map((item, i) => (
              <div key={i} className="promise-item">
                <div className="promise-dot" style={{ background: item.color }} />
                <div>
                  <div className="promise-label">{item.label}</div>
                  <div className="promise-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* TAG STRIP — quick jump */}
          {categories.length > 0 && (
            <nav aria-label="Jump to sector" className="tag-strip">
              {categories.map(cat => (
                <a key={cat.slug} href={`/startups/${cat.slug}`} className="tag-pill">
                  {cat.displayName}
                  <span className="tag-pill-n">{cat.count}</span>
                </a>
              ))}
            </nav>
          )}

          {/* ALL SECTORS GRID */}
          {categories.length > 0 ? (
            <section id="all-sectors">
              <div className="sec-hd">
                <span className="sec-hd-label">All Sectors</span>
                <span className="sec-hd-rule" />
                <span className="sec-hd-count">{categories.length} categories · {total.toLocaleString()} startups</span>
              </div>
              <div className="cat-grid" id="sector-grid">
                {categories.map((cat, i) => (
                  <a
                    key={cat.slug}
                    href={`/startups/${cat.slug}`}
                    className="cat-cell"
                    data-sector={cat.displayName.toLowerCase()}
                  >
                    <div className="cat-cell-head">
                      <div className="cat-cell-icon" style={{ background: `${getSectorColor(cat.slug)}18` }}>
                        <span style={{ color: getSectorColor(cat.slug), fontSize: 16 }}>{getSectorIcon(cat.slug)}</span>
                      </div>
                      <span className="cat-cell-rank">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="cat-cell-name">{cat.displayName}</div>
                    <div className="cat-cell-desc">{cat.description}</div>
                    <div className="cat-cell-foot">
                      <span className="cat-cell-verified">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                        {cat.count.toLocaleString()} verified
                      </span>
                      <span className="cat-cell-explore">Explore →</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", border: "1px dashed var(--rule)", background: "var(--white)" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: 8 }}>No sectors yet</p>
              <p style={{ fontSize: 13, color: "var(--ink3)", fontStyle: "italic", marginBottom: 20 }}>Categories appear automatically once startups are approved.</p>
              <a href="/submit" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ink)", color: "#fff", padding: "10px 24px", fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".18em", fontFamily: "system-ui,sans-serif", textDecoration: "none" }}>
                Submit Your Startup →
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="hub-cta">
            <div>
              <div className="hub-cta-eyebrow">UpForge Registry</div>
              <div className="hub-cta-h">Your founder story starts with a verified profile.</div>
              <div className="hub-cta-p">Registry-verified and publicly indexed through UpForge. Free for founders.</div>
            </div>
            <a href="/submit" className="hub-cta-btn">List Free →</a>
          </div>

          {/* FOOTER NAV */}
          <nav className="hub-foot-nav" aria-label="Explore UpForge">
            <div className="hub-foot-label">Explore UpForge</div>
            <ul className="hub-foot-links">
              {[
                { l: "All Global Startups", h: "/registry" },
                { l: "Submit Your Startup", h: "/submit" },
                { l: "Startup Journal",     h: "/blog" },
                { l: "About UpForge",       h: "/about" },
                ...categories.slice(0, 6).map(c => ({ l: `${c.displayName} Startups`, h: `/startups/${c.slug}` })),
              ].map(lnk => (
                <li key={lnk.h + lnk.l}><a href={lnk.h}>{lnk.l}</a></li>
              ))}
            </ul>
          </nav>
        </main>

        <Footer />
      </div>

      {/* CLIENT SEARCH — pure JS, no React, no router */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          var inp = document.getElementById('sector-search');
          var grid = document.getElementById('sector-grid');
          if(!inp||!grid) return;
          inp.addEventListener('input', function(){
            var q = this.value.toLowerCase().trim();
            var cells = grid.querySelectorAll('a[data-sector]');
            cells.forEach(function(el){
              el.style.display = (!q || el.getAttribute('data-sector').includes(q)) ? '' : 'none';
            });
          });
        })();
      `}} />
    </>
  )
}
