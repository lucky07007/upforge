// app/compare/figma-vs-sketch/page.tsx
// SERVER COMPONENT - Figma vs Sketch Comparison (Clean version)

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
    ? "https://upforge.org/compare/figma-vs-sketch" 
    : "https://www.upforge.in/compare/figma-vs-sketch"

  return {
    title: "Figma vs Sketch — Which Design Tool Wins in 2026? | UpForge",
    description: "Complete comparison of Figma vs Sketch. Compare features, pricing, collaboration, prototyping, and platform support. Find which UI/UX design tool is best for your team.",
    keywords: [
      "Figma vs Sketch", "best design tool 2026", "UI design software comparison",
      "Figma vs Sketch 2026", "Sketch vs Figma", "design tool for teams"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Figma vs Sketch — Complete Design Tool Comparison 2026",
      description: "Side-by-side comparison: features, pricing, collaboration, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Figma",
    company: "Figma (Adobe)",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKgl7wpiJVouzQ_6Jgf4zGvIN4uiRsOYOcbQ&s",
    logoColor: "#A259FF",
    description: "Figma is the browser-first collaborative design tool that revolutionized how teams build products. With real-time multiplayer, powerful prototyping, and a massive community, it's the industry standard for product design.",
    founded: "2012",
    headquarters: "San Francisco, USA",
    valuation: "$20B (Acquired by Adobe)",
    users: "4M+ designers",
    pricing: "Free · Professional $12/mo · Organization $45/mo",
    strengths: [
      "Browser-based, works anywhere",
      "Real-time multiplayer collaboration",
      "Massive community and plugins",
      "Excellent prototyping tools",
      "Cross-platform (Win/Mac/Linux)"
    ],
    weaknesses: [
      "Requires internet connection",
      "Performance with huge files",
      "Adobe acquisition concerns",
      "Limited offline capabilities"
    ],
    bestFor: [
      "Distributed design teams",
      "Cross-platform workflows",
      "Collaborative prototyping",
      "Startups and enterprises"
    ],
    score: 95
  },
  item2: {
    name: "Sketch",
    company: "Sketch B.V.",
    logo: "https://logovectorseek.com/wp-content/uploads/2020/12/sketch-b-v-logo-vector.png",
    logoColor: "#F7B500",
    description: "Sketch is the native macOS design tool that defined modern UI design. Known for its speed, precision, and robust vector editing, it remains a favorite among Mac-only design teams and solo designers.",
    founded: "2010",
    headquarters: "The Hague, Netherlands",
    valuation: "Private (~$500M+)",
    users: "1M+ designers",
    pricing: "Standard $10/mo · Business $20/mo (Mac only)",
    strengths: [
      "Blazing fast native performance",
      "Superior vector editing precision",
      "Better offline workflow",
      "Mature plugin ecosystem",
      "One-time purchase option"
    ],
    weaknesses: [
      "Mac-only (no Windows/Linux)",
      "Limited real-time collaboration",
      "Smaller community than Figma",
      "No web version"
    ],
    bestFor: [
      "Mac-only design teams",
      "Solo designers",
      "Performance-intensive work",
      "Offline-first workflows"
    ],
    score: 88
  },
  features: [
    { name: "Real-time Collaboration", figma: true, sketch: "Limited", winner: "figma" },
    { name: "Browser-based", figma: true, sketch: false, winner: "figma" },
    { name: "Native Performance", figma: "Good", sketch: "Excellent", winner: "sketch" },
    { name: "Offline Mode", figma: "Limited", sketch: true, winner: "sketch" },
    { name: "Prototyping", figma: "Advanced", sketch: "Basic", winner: "figma" },
    { name: "Plugins", figma: "Extensive", sketch: "Mature", winner: "tie" },
    { name: "Developer Handoff", figma: "Built-in", sketch: "Via plugins", winner: "figma" },
    { name: "Cross-platform", figma: true, sketch: false, winner: "figma" }
  ],
  verdict: {
    winner: "Figma for teams, Sketch for Mac solo designers",
    summary: "Figma dominates team collaboration, cross-platform workflows, and prototyping. Sketch remains excellent for Mac-only designers who prioritize raw performance and offline work. For most teams in 2026, Figma is the clear winner due to its collaboration features and platform flexibility.",
    recommendation: "Design teams should standardize on Figma. Solo Mac designers who prefer native apps and offline work can still thrive with Sketch."
  }
}

export default async function FigmaVsSketchPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Figma vs Sketch — Complete Comparison 2026",
    "description": comparisonData.verdict.summary,
    "datePublished": "2026-04-01",
    "dateModified": "2026-04-23",
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
                Design Tools · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Figma vs Sketch
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              Which UI/UX design tool is right for your team in 2026?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Figma Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#A259FF] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Figma Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Figma</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Figma (Adobe)</p>
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

              {/* Sketch Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F7B500] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Sketch Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Sketch</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Sketch B.V.</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Users</span>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Figma</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Sketch</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'figma' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.figma === 'boolean' ? (
                      feature.figma ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.figma}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'sketch' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.sketch === 'boolean' ? (
                      feature.sketch ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.sketch}</span>}
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

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Notion vs Coda", slug: "/compare/notion-vs-coda" },
                { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" },
                { name: "Slack vs Teams", slug: "/compare/slack-vs-teams" }
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Design Tool Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, UI/UX trends, and design team strategies.</p>
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
