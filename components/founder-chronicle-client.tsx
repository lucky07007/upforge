// components/founder-chronicle-client.tsx
"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react"
import type { Founder } from "@/data/founders"

// ---------------------------------------------------------------------------
// YOUTUBE FACADE
// ---------------------------------------------------------------------------
function YouTubeFacade({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  if (playing) {
    return (
      <div className="relative w-full border border-border" style={{ paddingBottom: "56.25%", background: "var(--background)" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </div>
    )
  }

  return (
    <button
      className="relative w-full group cursor-pointer block border border-border"
      style={{ paddingBottom: "56.25%", background: "var(--muted)" }}
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
    >
      <img
        src={thumb}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 bg-background/90 text-foreground rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-lg border border-border"
        >
          <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid var(--foreground)", marginLeft: 4 }} />
        </div>
      </div>
    </button>
  )
}

// ---------------------------------------------------------------------------
// FOUNDER PHOTO
// ---------------------------------------------------------------------------
function FounderPhoto({
  src, alt, initials, className = "", style = {}
}: {
  src: string; alt: string; initials: string;
  className?: string; style?: React.CSSProperties
}) {
  const [failed, setFailed] = useState(false)
  const show = src && !src.includes("www.sample.com") && !failed

  return (
    <div className={`relative overflow-hidden bg-muted border border-border ${className}`} style={style}>
      {show ? (
        <img
          src={src} alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%]"
          loading="lazy" width={400} height={500}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-background border border-border text-foreground font-serif"
            style={{ fontSize: "clamp(1.4rem,4vw,2rem)" }}
            aria-hidden="true"
          >{initials}</div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// PROPS
// ---------------------------------------------------------------------------
interface Props {
  founders: Founder[]
  internalLinks: { l: string; h: string; desc: string }[]
  footerLinks: { l: string; h: string }[]
}

// ---------------------------------------------------------------------------
// MAIN CLIENT COMPONENT
// ---------------------------------------------------------------------------
export function FounderChronicleClient({ founders, internalLinks, footerLinks }: Props) {
  const [idx, setIdx] = useState(0)
  const f = founders[idx]
  const isFirst = idx === 0
  const isLast  = idx === founders.length - 1

  const goTo = useCallback((i: number) => {
    setIdx(i)
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="bg-background text-foreground selection:bg-foreground selection:text-background pb-12">
      <style>{`
        .editorial-text { font-family: 'Times New Roman', Times, serif; }
        .editorial-heading { font-family: 'Georgia', serif; }
        .editorial-sans { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: 0.05em; }

        @keyframes fadeInDrop {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .story-in { animation: fadeInDrop .5s ease-out both; }

        @media (min-width: 640px) {
          .ncols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .ncols > div { padding: 0; border-right: 1px solid var(--border); padding-right: 2.5rem; }
          .ncols > div:last-child  { border-right: none; padding-right: 0; }
        }

        .dropcap::first-letter {
          font-family: 'Georgia', serif;
          font-size: 4em; font-weight: 700;
          line-height: 0.8; float: left;
          margin-right: 0.15em; margin-top: 0.05em;
          color: var(--foreground);
        }

        .nbtn:not([disabled]):hover { background: var(--muted) !important; }

        @media (min-width: 1024px) {
          .sticky-col { position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow-y: auto; }
        }

        .tabs-strip { scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .tabs-strip::-webkit-scrollbar { display: none; }
      `}</style>

      {/* MASTHEAD */}
      <header className="border-b-4 border-foreground relative pb-0 px-4 md:px-8 mt-12 mb-8 max-w-[1400px] mx-auto">
        <div className="text-center pt-8 pb-10 border-b border-border">
          <p className="text-[11px] editorial-sans uppercase mb-4 text-muted-foreground font-semibold">
            Independent Editorial · Verified Profiles
          </p>
          <h1 className="editorial-heading font-black leading-tight tracking-tight text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            The Founder Chronicle
          </h1>
          <p className="editorial-text italic mt-3 text-muted-foreground"
            style={{ fontSize: "clamp(16px, 1.8vw, 20px)" }}>
            Documenting the visionaries defining the global digital economy — March 2026
          </p>
        </div>

        <nav
          aria-label="Edition Selection"
          className="tabs-strip flex items-center overflow-x-auto"
        >
          <span className="hidden md:inline text-[11px] font-bold editorial-sans uppercase px-6 py-4 flex-shrink-0 border-r border-border text-foreground">
            Current Edition
          </span>
          <ul className="flex flex-nowrap m-0 p-0 list-none">
            {founders.map((s, i) => (
              <li key={i} className="flex-shrink-0">
                <button
                  onClick={() => goTo(i)}
                  aria-label={`Read profile of ${s.name} at ${s.company}`}
                  aria-current={i === idx ? "page" : undefined}
                  className={`px-6 py-4 text-[11px] font-bold editorial-sans uppercase transition-colors relative border-r border-border whitespace-nowrap ${i === idx ? 'text-foreground bg-muted/50' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
                >
                  {s.company}
                  {i === idx && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* STORY */}
      <main
        className="story-in max-w-[1400px] mx-auto px-4 sm:px-8 pb-16"
        id="main-content"
        key={idx}
      >
        <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_420px] gap-12 lg:gap-16">
          
          {/* LEFT: Article */}
          <article className="pt-2">
            
            <div className="flex items-center gap-3 mb-6 editorial-sans">
              <span className="text-[10px] font-bold uppercase px-3 py-1 bg-foreground text-background">
                {f.category}
              </span>
              <span className="text-[11px] font-medium uppercase text-muted-foreground">
                By UpForge Editorial · {f.city}
              </span>
            </div>

            <h2 className="editorial-heading font-bold leading-tight text-foreground mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
              {f.headline}
            </h2>
            
            <div className="w-16 h-[3px] bg-foreground mb-6" />

            <p className="editorial-text leading-[1.7] mb-10 text-muted-foreground text-xl sm:text-2xl">
              {f.deck}
            </p>

            <div className="lg:hidden mb-10">
              <FounderPhoto
                src={f.imgSrc}
                alt={`${f.name}, ${f.role} at ${f.company}`}
                initials={f.initials}
                className="w-full"
                style={{ height: "min(300px, 60vw)" }}
              />
              <div className="pt-3 pb-4 border-b border-border">
                <p className="editorial-heading text-foreground font-bold text-lg">{f.name}</p>
                <p className="text-muted-foreground text-[11px] editorial-sans uppercase mt-1">{f.role} · {f.company}</p>
              </div>
            </div>

            <div className="ncols mt-4">
              {f.cols.map((col, ci) => (
                <div key={ci} className="mb-10 sm:mb-0">
                  <h3
                    className="font-bold uppercase mb-4 pb-2 text-foreground editorial-sans text-xs border-b border-border"
                  >{col.h}</h3>
                  {col.b.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className={`editorial-text leading-[1.8] mb-5 text-foreground/90 ${ci === 0 && pi === 0 ? "dropcap" : ""}`}
                      style={{ fontSize: "17px" }}
                    >{para}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-14 pt-10 pb-8 text-center border-y border-border">
              <blockquote
                className="editorial-heading italic text-foreground leading-[1.6] max-w-2xl mx-auto px-4 text-2xl sm:text-3xl"
              >
                 "{f.pull}"
              </blockquote>
              <p className="text-[12px] uppercase mt-6 tracking-widest text-muted-foreground editorial-sans font-bold">
                — {f.pullBy}, {f.company}
              </p>
            </div>
          </article>

          {/* RIGHT: Sidebar */}
          <aside className="hidden lg:block relative border-l border-border pl-8 xl:pl-12">
            <div className="sticky-col flex flex-col gap-8 pb-10">
              
              {/* Photo Card */}
              <div className="w-full mb-2">
                <FounderPhoto
                  src={f.imgSrc}
                  alt={`${f.name}, ${f.role} at ${f.company} — UpForge`}
                  initials={f.initials}
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="pt-4 pb-2 border-b-2 border-foreground">
                  <p className="editorial-heading text-foreground font-bold text-2xl mb-1">{f.name}</p>
                  <p className="text-muted-foreground text-[11px] editorial-sans uppercase font-bold tracking-wider">{f.role}</p>
                  <p className="text-muted-foreground text-[11px] editorial-sans uppercase mt-1">Est. {f.founded} · {f.city}</p>
                </div>
              </div>

              {/* Metrics Box */}
              <div className="bg-muted p-6 border border-border">
                <div className="mb-4">
                  <p className="text-[11px] font-bold editorial-sans uppercase tracking-widest text-foreground">Key Metrics</p>
                </div>
                <dl className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {f.stats.map((s, si) => (
                    <div key={si} className="flex flex-col">
                      <dt className="text-[10px] uppercase font-bold tracking-wider mb-1 text-muted-foreground editorial-sans">{s.l}</dt>
                      <dd className="editorial-heading font-bold text-foreground text-2xl">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Lesson Box */}
              <div className="p-6 border border-border bg-background">
                <p className="text-[11px] font-bold editorial-sans uppercase tracking-widest mb-3 text-foreground">Editorial Insight</p>
                <p className="editorial-text italic text-foreground leading-[1.7] text-[16px]">
                  {f.lesson}
                </p>
              </div>

              {/* Action Links */}
              <div className="flex flex-col gap-0 border-y border-border divide-y divide-border mt-4">
                <Link
                  href={`/startup/${f.slug}`}
                  className="group flex items-center justify-between py-4 text-foreground hover:bg-muted transition-colors px-2"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest editorial-sans">
                    Read Full Profile
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/submit"
                  className="group flex items-center justify-between py-4 text-foreground hover:bg-muted transition-colors px-2"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest editorial-sans">
                    Request Registration
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

            </div>
          </aside>
        </div>

        {/* PAGINATION */}
        <nav
          className="flex items-center justify-between py-8 mt-12 border-t-2 border-foreground max-w-3xl mx-auto"
          aria-label="Story pagination"
        >
          <button
            onClick={() => !isFirst && goTo(idx - 1)}
            disabled={isFirst}
            className="nbtn flex items-center gap-2 px-4 py-3 font-bold uppercase tracking-widest transition-colors border border-border"
            style={{
              color: isFirst ? "var(--muted-foreground)" : "var(--foreground)",
              opacity: isFirst ? 0.3 : 1,
              cursor: isFirst ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="editorial-sans text-[11px] hidden sm:inline">{isFirst ? "First" : founders[idx - 1].company}</span>
            <span className="editorial-sans text-[11px] sm:hidden">Prev</span>
          </button>

          <div className="flex items-center gap-1.5" role="tablist">
            {founders.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-2 transition-all rounded-none"
                style={{
                  width: i === idx ? 24 : 8,
                  background: i === idx ? "var(--foreground)" : "var(--border)"
                }}
                aria-label={`Go to ${s.company}`}
              />
            ))}
          </div>

          <button
            onClick={() => !isLast && goTo(idx + 1)}
            disabled={isLast}
            className="nbtn flex items-center gap-2 px-4 py-3 font-bold uppercase tracking-widest transition-colors border border-border"
            style={{
              color: isLast ? "var(--muted-foreground)" : "var(--foreground)",
              opacity: isLast ? 0.3 : 1,
              cursor: isLast ? "not-allowed" : "pointer",
            }}
          >
            <span className="editorial-sans text-[11px] hidden sm:inline">{isLast ? "Last" : founders[idx + 1].company}</span>
            <span className="editorial-sans text-[11px] sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </main>

      {/* SEO CONTENT LAYER */}
      <div className="sr-only" aria-label="SEO content">
        <nav aria-label="Founder profiles">
          <ul>
            {founders.map((fo) => (
              <li key={fo.slug}>
                <Link href={`/startup/${fo.slug}`}>
                  {fo.name} — {fo.role} at {fo.company}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
