import Link from "next/link"
import { ArrowRight, Database, ShieldCheck, Sparkles } from "lucide-react"

export interface IntentHubItem {
  title: string
  description: string
  href: string
  meta?: string
}

export interface IntentHubSection {
  title: string
  text: string
  items?: IntentHubItem[]
}

export interface IntentHubProps {
  eyebrow: string
  title: string
  description: string
  canonical: string
  stats: { label: string; value: string }[]
  sections: IntentHubSection[]
  items?: IntentHubItem[]
  primaryHref: string
  primaryLabel: string
}

export function IntentHub({
  eyebrow,
  title,
  description,
  canonical,
  stats,
  sections,
  items = [],
  primaryHref,
  primaryLabel,
}: IntentHubProps) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonical,
    "isPartOf": { "@type": "WebSite", "name": "UpForge", "url": "https://upforge.org" },
    "inLanguage": "en-US",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.org" },
      { "@type": "ListItem", position: 2, name: title, item: canonical },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 text-xs font-mono text-muted-foreground">
            <Link href="/" className="hover:text-foreground">UpForge</Link>
            <span className="mx-2">/</span>
            <span>{eyebrow}</span>
          </div>
        </div>

        <section className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3 w-3" /> {eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base md:text-xl leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={primaryHref} className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background hover:opacity-90">
                  {primaryLabel} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/methodology" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider hover:border-amber-500/50">
                  Methodology
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-2xl md:text-3xl font-black font-mono">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {sections.map((section) => (
            <section key={section.title} className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">{section.title}</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{section.text}</p>
              {section.items && section.items.length > 0 && (
                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item) => (
                    <Link key={item.href + item.title} href={item.href} className="group rounded-2xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400">{item.title}</h3>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      {item.meta && <p className="mt-4 text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{item.meta}</p>}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}

          {items.length > 0 && (
            <section className="mb-14">
              <div className="flex items-center gap-2 mb-5">
                <Database className="h-4 w-4 text-amber-500" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold">Explore UpForge</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Link key={item.href + item.title} href={item.href} className="group rounded-2xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400">{item.title}</h3>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    {item.meta && <p className="mt-4 text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{item.meta}</p>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-amber-500 mt-1" />
              <div>
                <h2 className="font-serif text-2xl font-bold">Built for discovery, backed by a clear registry standard</h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                  UpForge treats the vetted Google Sheet registry as its source of truth for listed startups. A listing marked verified reflects UpForge's registry classification; it is not a claim that every field has been independently corroborated outside the registry source.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-mono font-bold uppercase tracking-wider">
                  <Link href="/methodology" className="hover:text-amber-500">Read methodology →</Link>
                  <Link href="/editorial-standards" className="hover:text-amber-500">Editorial standards →</Link>
                  <Link href="/registry" className="hover:text-amber-500">Browse registry →</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
