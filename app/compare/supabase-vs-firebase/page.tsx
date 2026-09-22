// app/compare/supabase-vs-firebase/page.tsx
// SERVER COMPONENT - Supabase vs Firebase Comparison

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Check, X, Award, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"

async function getDomain(): Promise<"org" | "in"> {
  return "org"
}


export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const canonicalUrl = isOrg 
    ? "https://upforge.org/compare/supabase-vs-firebase" 
    : "https://www.upforge.in/compare/supabase-vs-firebase"

  return {
    title: "Supabase vs Firebase — Which Backend Platform Wins in 2026? | UpForge",
    description: "Complete comparison of Supabase vs Firebase. Compare database, auth, real-time, pricing, hosting, edge functions, and vendor lock-in. Find which BaaS platform fits your next project.",
    keywords: [
      "Supabase vs Firebase", "best BaaS platform 2026", "Firebase alternative",
      "Supabase vs Firebase comparison", "backend as a service comparison",
      "PostgreSQL vs Firestore", "Supabase vs Firebase pricing",
      "which is better Supabase or Firebase", "open source BaaS"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Supabase vs Firebase — Complete BaaS Platform Comparison 2026",
      description: "Side-by-side comparison: database, auth, real-time, pricing, hosting, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Supabase",
    company: "Supabase Inc.",
    logo: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
    description: "Supabase is the open-source Firebase alternative built on PostgreSQL, offering developers a complete backend with database, authentication, storage, edge functions, and real-time subscriptions. Founded in 2020, it's rapidly becoming the go-to choice for developers who want SQL power, full data ownership, and no vendor lock-in.",
    founded: "2020",
    headquarters: "Singapore + Remote (Global Team)",
    valuation: "$2.2B (Series D, 2024)",
    users: "350,000+ databases created, 1M+ developers",
    pricing: "Free · Pro $25/mo · Team $599/mo · Enterprise",
    strengths: [
      "PostgreSQL — world's most trusted relational database",
      "Open-source with self-hosting option (no vendor lock-in)",
      "Real-time subscriptions via PostgreSQL replication",
      "Row Level Security for granular access control",
      "Instant REST APIs with auto-generated PostgREST endpoints"
    ],
    weaknesses: [
      "Smaller ecosystem — fewer third-party integrations",
      "Offline-first support requires custom implementation",
      "No native mobile SDKs (rely on community wrappers)",
      "Fewer built-in analytics and monitoring tools",
      "Smaller global edge network vs Google infrastructure"
    ],
    bestFor: [
      "SQL-savvy developers and PostgreSQL fans",
      "Projects requiring complex relational data",
      "Open-source advocates and self-hosters",
      "Startups wanting to avoid vendor lock-in"
    ],
    score: 91
  },
  item2: {
    name: "Firebase",
    company: "Google LLC",
    logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
    description: "Firebase is Google's mature Backend-as-a-Service platform, powering 3M+ apps with a NoSQL real-time database, authentication, cloud functions, and hosting. Acquired by Google in 2014, it's deeply integrated with Google Cloud, offering seamless mobile development with native iOS/Android SDKs and powerful offline capabilities.",
    founded: "2011 (Acquired by Google 2014)",
    headquarters: "Mountain View, California, USA",
    valuation: "Part of Google ($2.2T+ market cap)",
    users: "3M+ apps use Firebase, 2.5M+ monthly active projects",
    pricing: "Free · Blaze pay-as-you-go · Google Cloud billing",
    strengths: [
      "Best-in-class real-time NoSQL database (Firestore)",
      "Native SDKs for iOS, Android, Web, Flutter, Unity",
      "Seamless offline-first support and data sync",
      "Deep Google Cloud integration (BigQuery, ML Kit)",
      "Rich analytics: Crashlytics, Performance, A/B Testing"
    ],
    weaknesses: [
      "Vendor lock-in — proprietary NoSQL, no easy migration",
      "Querying limitations in Firestore (no joins, complex filters)",
      "Unpredictable costs at scale (reads/writes pricing)",
      "Closed source — cannot self-host or inspect code",
      "Cold starts on Cloud Functions v1"
    ],
    bestFor: [
      "Mobile-first and Flutter developers",
      "Rapid prototyping and MVPs",
      "Real-time collaboration apps",
      "Projects needing offline-first capabilities"
    ],
    score: 93
  },
  features: [
    { name: "Database Type", supabase: "PostgreSQL (Relational SQL)", firebase: "Firestore (NoSQL Document)", winner: "tie" },
    { name: "Open Source", supabase: "Fully open source (MIT license)", firebase: "Proprietary, closed source", winner: "supabase" },
    { name: "Self-Hosting", supabase: "Yes — full self-hosted option", firebase: "No — Google Cloud only", winner: "supabase" },
    { name: "Real-Time Sync", supabase: "Excellent (PG replication)", firebase: "Excellent (native WebSocket)", winner: "tie" },
    { name: "Authentication", supabase: "50+ providers, Row Level Security", firebase: "Google-grade auth, phone, anonymous", winner: "tie" },
    { name: "Offline Support", supabase: "Requires custom implementation", firebase: "Best-in-class, built-in", winner: "firebase" },
    { name: "Mobile SDKs", supabase: "Community wrappers (Flutter official)", firebase: "Native iOS/Android/Flutter/Unity", winner: "firebase" },
    { name: "Query Flexibility", supabase: "Full SQL, joins, complex filters", firebase: "Limited — no joins, basic queries", winner: "supabase" },
    { name: "Edge Functions", supabase: "Deno-based, globally deployed", firebase: "Cloud Functions v2 (Node.js/Python)", winner: "supabase" },
    { name: "Analytics Suite", supabase: "Basic monitoring & logging", firebase: "Crashlytics, Performance, A/B Testing", winner: "firebase" },
    { name: "Pricing Model", supabase: "Predictable (database + bandwidth)", firebase: "Unpredictable (reads/writes at scale)", winner: "supabase" },
    { name: "Vendor Lock-In Risk", supabase: "Low — standard PostgreSQL, portable", firebase: "High — proprietary NoSQL, hard to migrate", winner: "supabase" }
  ],
  verdict: {
    winner: "Firebase for mobile apps & MVPs, Supabase for SQL & open-source projects",
    summary: "Firebase remains the king of mobile development with unmatched native SDKs, offline-first capabilities, and Google's infrastructure — it's perfect for iOS/Android apps and rapid prototyping. Supabase has emerged as the powerful open-source challenger, winning developers who demand SQL flexibility, data ownership, and freedom from vendor lock-in. With PostgreSQL at its core, Supabase is the clear choice for complex data relationships and projects that may need to scale beyond the BaaS model. In 2026, Firebase wins on mobile maturity, while Supabase leads on database power and developer freedom.",
    recommendation: "Choose Firebase if you're building mobile apps (iOS/Android), need offline-first functionality out of the box, or want the richest analytics suite — Google's ecosystem is unmatched here. Choose Supabase if you prefer SQL (PostgreSQL), want open-source freedom, need complex queries with joins, or fear vendor lock-in — you can always self-host or migrate to any PostgreSQL provider."
  }
}

export default async function SupabaseVsFirebasePage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Supabase vs Firebase — Complete BaaS Comparison 2026",
    "description": comparisonData.verdict.summary,
    "datePublished": "2026-04-01",
    "dateModified": "2026-04-24",
    "author": { "@type": "Organization", "name": "UpForge Editorial", "url": baseUrl }
  }

  return (
    <>
      <JsonLd data={comparisonSchema} />
      
      <div className="bg-background min-h-screen text-foreground">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          
          {/* MASTHEAD */}
          <section className="border-b-2 border-foreground pb-4 pt-6 flex flex-col items-center text-center w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C59A2E] font-mono">
                Backend-as-a-Service · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Supabase vs Firebase
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The open-source PostgreSQL challenger vs Google's mobile powerhouse — which backend is right for your next project?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Supabase Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Supabase Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Supabase</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Supabase Inc.</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item1.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item1.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Founded</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Users</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.users}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.pricing}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item1.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item1.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {comparisonData.item1.bestFor.map((b, i) => (
                        <span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Firebase Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Firebase Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Firebase</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Google LLC</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item2.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                    {comparisonData.item2.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Founded</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Company Value</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">User Base</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.users}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.pricing}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item2.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item2.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {comparisonData.item2.bestFor.map((b, i) => (
                        <span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE TABLE */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Feature Comparison</h3>
            <div className="border border-border">
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border p-4">
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Feature</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Supabase</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Firebase</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'supabase' ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''}`}>
                    {typeof feature.supabase === 'boolean' ? (
                      feature.supabase ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.supabase}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'firebase' ? 'bg-amber-50 dark:bg-amber-950/20' : ''}`}>
                    {typeof feature.firebase === 'boolean' ? (
                      feature.firebase ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.firebase}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* VERDICT */}
          <section className="py-8 border-b border-border">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-10 h-10 text-[#C59A2E] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-4">Verdict: {comparisonData.verdict.winner}</h3>
              <p className="font-serif italic text-muted-foreground leading-relaxed mb-6">{comparisonData.verdict.summary}</p>
              <div className="bg-muted/30 border border-border p-5 text-left">
                <p className="text-sm"><span className="font-bold">💡 Recommendation:</span> {comparisonData.verdict.recommendation}</p>
              </div>
            </div>
          </section>

          {/* USE CASE COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">When to Use Which</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#3ECF8E] mb-3 font-mono">Choose Supabase When</p>
                <ul className="space-y-2">
                  {[
                    "You need SQL and complex relational queries (joins, CTEs)",
                    "Data ownership matters — deploy on your own infrastructure",
                    "Building data-intensive applications with PostgreSQL power",
                    "Vendor lock-in is unacceptable — stay portable and open-source",
                    "You want instant REST APIs auto-generated from your schema",
                    "Row-level security is critical for multi-tenant applications"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#3ECF8E] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FFCA28] mb-3 font-mono">Choose Firebase When</p>
                <ul className="space-y-2">
                  {[
                    "Building mobile apps with native iOS/Android/Flutter SDKs",
                    "Offline-first functionality is essential for your users",
                    "Rapidly prototyping MVPs and validating startup ideas",
                    "You need built-in analytics (Crashlytics, Performance Monitoring)",
                    "Real-time collaboration features are core to your product",
                    "Google ecosystem integration (BigQuery, ML Kit) is valuable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#FFCA28] dark:text-yellow-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "AWS vs Azure vs GCP", slug: "/compare/aws-vs-azure-vs-gcp" },
                { name: "Canva vs CapCut", slug: "/compare/canva-vs-capcut" },
                { name: "Meta Quest vs Apple Vision Pro", slug: "/compare/meta-quest-vs-apple-vision-pro" }
              ].map((link, i) => (
                <Link key={i} href={link.slug} className="p-4 border border-border hover:border-foreground transition-all group">
                  <span className="font-serif group-hover:text-[#C59A2E] transition-colors">{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-border group-hover:text-[#C59A2E] mt-2 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* NEWSLETTER */}
        <section className="bg-muted/30 border-t-2 border-foreground py-12 mt-8">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Creator Tool Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, content creation tips, and creative platform strategies.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 bg-background border-2 border-foreground font-serif italic" />
              <button className="px-6 py-3 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#C59A2E] transition-colors">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
