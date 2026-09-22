import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAiFounders } from "@/lib/seo-hubs"

const BASE = "https://upforge.org"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const founders = await getAiFounders()
  return {
    title: "AI Startup Founders — AI Founder Profiles & Intelligence | UpForge",
    description: `Explore ${founders.length} AI-focused founder profiles on UpForge, with company context, founder stories, locations, and related startup intelligence.`,
    keywords: ["AI startup founders", "AI founders", "artificial intelligence startup founders", "AI entrepreneur profiles", "AI founder stories"],
    alternates: { canonical: `${BASE}/ai-startup-founders` },
    openGraph: {
      title: "AI Startup Founders — UpForge Founder Intelligence",
      description: "Founder profiles and editorial intelligence across the AI startup ecosystem.",
      url: `${BASE}/ai-startup-founders`,
      siteName: "UpForge",
      type: "website",
      images: [{ url: `${BASE}/og/founder-chronicle.png`, width: 1200, height: 630, alt: "UpForge AI Startup Founders" }],
    },
    robots: { index: true, follow: true },
  }
}

export default async function AIStartupFoundersPage() {
  const founders = await getAiFounders()
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Startup Founders — UpForge",
    "description": "AI-focused founder profiles and startup intelligence from UpForge.",
    "url": `${BASE}/ai-startup-founders`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": founders.length,
      "itemListElement": founders.map((founder, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": founder.name,
        "url": `${BASE}/founder-stories/${founder.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 text-xs font-mono text-muted-foreground">
            <Link href="/" className="hover:text-foreground">UpForge</Link><span className="mx-2">/</span>AI Startup Founders
          </div>
        </div>
        <section className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Founder Intelligence</span>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">AI Startup Founders</h1>
            <p className="mt-5 max-w-3xl text-base md:text-xl leading-relaxed text-muted-foreground">Explore founder profiles across artificial intelligence, machine learning, LLMs, AI infrastructure, and adjacent technology categories covered by the UpForge Founder Chronicle.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/founder-stories" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background">All Founder Stories <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/startups/ai-technology" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider">AI Startup Registry <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
              <div className="rounded-2xl border border-border p-5"><div className="text-3xl font-black font-mono">{founders.length}</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">AI founder profiles</div></div>
              <div className="rounded-2xl border border-border p-5"><div className="text-3xl font-black font-mono">Global</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Coverage</div></div>
              <div className="rounded-2xl border border-border p-5 col-span-2 md:col-span-1"><div className="text-3xl font-black font-mono">Editorial</div><div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Founder Chronicle</div></div>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {founders.map((founder) => (
              <Link key={founder.slug} href={`/founder-stories/${founder.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card hover:border-amber-500/50 transition-colors">
                <div className="relative aspect-[4/3] bg-muted">
                  <Image src={founder.cardImage || founder.imageUrl} alt={`${founder.name}, ${founder.role} of ${founder.company} — UpForge Founder Story`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{founder.category || "AI & Technology"}</p>
                  <h2 className="mt-2 font-serif text-xl font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{founder.name}</h2>
                  <p className="mt-1 text-xs font-mono text-muted-foreground">{founder.role} • {founder.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{founder.oneLiner || founder.deck}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider">Read profile <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
