// app/news-gallery/page.tsx
// UpForge News Gallery — press coverage, media appearances, notable moments
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { getSortedNewsItems } from "@/data/news-gallery"
import { ArrowUpRight, Newspaper } from "lucide-react"

const BASE_URL = "https://upforge.org"

export const metadata: Metadata = {
  title: "News Gallery — UpForge in the Press & Media | UpForge",
  description:
    "UpForge news gallery — press coverage, media appearances, and notable moments from India's independent startup registry. Verified startup data trusted by founders and investors.",
  keywords: [
    "UpForge press coverage",
    "UpForge news",
    "startup registry media",
    "UpForge in media",
    "Indian startup news 2026",
  ],
  alternates: { canonical: `${BASE_URL}/news-gallery` },
  openGraph: {
    title: "News Gallery — UpForge in the Press & Media",
    description:
      "Press coverage, media appearances, and notable moments from UpForge — India's independent verified startup registry.",
    url: `${BASE_URL}/news-gallery`,
    siteName: "UpForge",
    images: [{ url: `${BASE_URL}/og/registry.png`, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Gallery — UpForge in the Press & Media",
    description:
      "Press coverage and media moments from UpForge — India's independent startup registry.",
    images: [`${BASE_URL}/og/registry.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
}

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "UpForge News Gallery",
  description:
    "Press coverage and notable media appearances by UpForge, India's independent verified startup registry.",
  url: `${BASE_URL}/news-gallery`,
  inLanguage: "en-US",
}

export default function NewsGalleryPage() {
  const items = getSortedNewsItems()
  const marqueeItems = items.slice(0, 8) // first 8 for marquee strip

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />

      <Navbar />

      {/* ── HERO HEADER ── */}
      <div className="relative border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-2xl py-14 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-primary px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              Media &amp; Press
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            News Gallery
          </h1>
          <p className="text-base md:text-lg text-foreground max-w-2xl font-light leading-relaxed">
            Press coverage, media appearances, and notable moments from UpForge — India&apos;s
            independent verified startup registry. We track the ecosystem, and occasionally the
            ecosystem tracks us back. Below is a curated visual record of coverage, partnerships,
            and milestones as they happen.
          </p>
        </div>
      </div>

      {/* ── AUTO-SCROLL MARQUEE STRIP ── */}
      {marqueeItems.length > 0 && (
        <div className="border-b border-[var(--glass-border)] bg-[var(--glass-bg)] overflow-hidden py-6">
          <div
            className="flex gap-4"
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee-scroll 28s linear infinite",
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="relative flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden border border-[var(--glass-border)] group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx < 2}
                  sizes="256px"
                />
                {/* Dark gradient overlay so text stays readable regardless of theme —
                    this sits ON TOP of the image, not the page background, so
                    text-white here is intentional and safe. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent-primary mb-1">
                    {item.source}
                  </p>
                  <p className="text-xs font-semibold text-white line-clamp-2 leading-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .flex:hover { animation-play-state: paused; }
          `}</style>
        </div>
      )}

      {/* ── MAIN GRID ── */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[var(--glass-border)]">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-accent-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              All Coverage — {items.length} Items
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">Sorted newest first</span>
        </div>

        {items.length === 0 ? (
          <div className="glass-panel rounded-3xl p-16 text-center border-dashed border-[var(--glass-border)]">
            <span className="text-4xl text-muted-foreground mb-4 block">📰</span>
            <h3 className="text-xl font-bold text-foreground mb-2">Gallery coming soon</h3>
            <p className="text-muted-foreground">Press coverage and media moments will appear here.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay sits on the image itself, not page bg — safe to keep black/60 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-primary px-2 py-1 rounded-full bg-black/60 border border-accent-primary/30 backdrop-blur-sm">
                      {item.source}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <time
                    dateTime={item.dateAdded}
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2"
                  >
                    {new Date(item.dateAdded).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-accent-primary transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {item.description}
                  </p>

                  {item.link && (
                    <Link
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-primary hover:text-white transition-colors"
                    >
                      Read More <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-16 glass-panel rounded-3xl p-10 text-center border border-[var(--glass-border)]">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Covering UpForge or India&apos;s startup ecosystem?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            We welcome press inquiries, editorial collaborations, and data requests. Reach out
            to the editorial team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent-primary hover:bg-blue-600 text-white px-8 py-3 font-bold text-sm uppercase tracking-wider rounded-full transition-colors shadow-[0_4px_12px_rgba(51,_102,_255,_0.4)]"
          >
            Contact Editorial →
          </Link>
        </div>
      </main>
    </>
  )
}
