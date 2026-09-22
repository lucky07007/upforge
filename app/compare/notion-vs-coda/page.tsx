// app/compare/notion-vs-coda/page.tsx
// SERVER COMPONENT - Notion vs Coda Comparison (Clean version)

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
    ? "https://upforge.org/compare/notion-vs-coda" 
    : "https://www.upforge.in/compare/notion-vs-coda"

  return {
    title: "Notion vs Coda — Which All-in-One Workspace Wins in 2026? | UpForge",
    description: "Complete comparison of Notion vs Coda. Compare features, pricing, databases, AI capabilities, and team collaboration. Find which productivity tool fits your workflow.",
    keywords: [
      "Notion vs Coda", "best productivity tool 2026", "Notion alternative",
      "Coda vs Notion", "all-in-one workspace comparison", "team collaboration tools"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Notion vs Coda — Complete Comparison 2026",
      description: "Side-by-side comparison: features, pricing, databases, AI, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Notion",
    company: "Notion Labs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    logoColor: "#000000",
    description: "Notion is the all-in-one workspace that combines notes, docs, project management, and wikis. Known for its flexibility and beautiful interface, it's used by millions of individuals and teams worldwide.",
    founded: "2013",
    headquarters: "San Francisco, USA",
    valuation: "$10B",
    users: "100M+ users",
    pricing: "Free · Plus $10/mo · Business $15/mo",
    strengths: [
      "Beautiful, intuitive interface",
      "Extremely flexible page structure",
      "Massive template community",
      "Strong personal use adoption",
      "Excellent mobile apps"
    ],
    weaknesses: [
      "Limited database power-user features",
      "No offline mode for teams",
      "Slower with large databases",
      "Limited automations"
    ],
    bestFor: [
      "Personal knowledge management",
      "Small-to-medium teams",
      "Documentation & wikis",
      "Content creators"
    ],
    score: 92
  },
  item2: {
    name: "Coda",
    company: "Coda",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg7DOcqPQByO8Dgg4x9l5-u1uHzpzR3SPjiA&s",
    logoColor: "#F06A6A",
    description: "Coda is a doc that brings words, data, and teams together. It combines documents with powerful databases and automations, making it ideal for building custom team applications and workflows.",
    founded: "2014",
    headquarters: "San Francisco, USA",
    valuation: "$1.4B",
    users: "40M+ users",
    pricing: "Free · Pro $12/mo · Team $36/mo",
    strengths: [
      "Powerful database and formula engine",
      "Advanced automations (Packs)",
      "Better for large datasets",
      "Strong team collaboration features",
      "Excellent for building custom tools"
    ],
    weaknesses: [
      "Steeper learning curve",
      "Less polished mobile experience",
      "Smaller template ecosystem",
      "Pricing scales with makers"
    ],
    bestFor: [
      "Power users and builders",
      "Large teams with complex workflows",
      "Custom internal tools",
      "Data-heavy operations"
    ],
    score: 91
  },
  features: [
    { name: "Databases", notion: "Good", coda: "Excellent", winner: "coda" },
    { name: "Formulas", notion: "Basic", coda: "Advanced", winner: "coda" },
    { name: "Automations", notion: "Limited", coda: "Extensive (Packs)", winner: "coda" },
    { name: "Ease of Use", notion: "Excellent", coda: "Good", winner: "notion" },
    { name: "Templates", notion: "50,000+", coda: "10,000+", winner: "notion" },
    { name: "AI Assistant", notion: true, coda: true, winner: "tie" },
    { name: "Offline Mode", notion: true, coda: true, winner: "tie" },
    { name: "API Access", notion: true, coda: true, winner: "tie" }
  ],
  verdict: {
    winner: "Notion for individuals, Coda for power teams",
    summary: "Notion wins on ease of use, design, and personal knowledge management. Coda dominates for teams building complex workflows and custom tools. Choose Notion if you want a beautiful, flexible workspace that's easy to adopt. Choose Coda if you need powerful databases, automations, and the ability to build custom apps without code.",
    recommendation: "Many teams use Notion for documentation and wikis, while running operations in Coda. They can integrate via API."
  }
}

export default async function NotionVsCodaPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Notion vs Coda — Complete Comparison 2026",
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
                Productivity Tools · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Notion vs Coda
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              Which all-in-one workspace is right for you and your team?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Notion Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#000000] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Notion Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Notion</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Notion Labs</p>
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

              {/* Coda Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F06A6A] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Coda Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Coda</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Coda</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Notion</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Coda</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'notion' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.notion === 'boolean' ? (
                      feature.notion ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.notion}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'coda' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.coda === 'boolean' ? (
                      feature.coda ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.coda}</span>}
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
                { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" },
                { name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch" },
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Productivity Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, workflow tips, and team collaboration strategies.</p>
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
