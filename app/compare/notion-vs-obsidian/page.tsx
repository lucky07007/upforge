// app/compare/notion-vs-obsidian/page.tsx
// SERVER COMPONENT - Notion vs Obsidian Comparison (Clean version)

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
    ? "https://upforge.org/compare/notion-vs-obsidian" 
    : "https://www.upforge.in/compare/notion-vs-obsidian"

  return {
    title: "Notion vs Obsidian — Which Knowledge Management Tool Wins in 2026? | UpForge",
    description: "Complete comparison of Notion vs Obsidian. Compare features, note-taking approaches, graph views, plugins, privacy, and pricing. Find which PKM tool fits your workflow.",
    keywords: [
      "Notion vs Obsidian", "best note taking app 2026", "Notion alternative",
      "Obsidian vs Notion", "personal knowledge management comparison", "second brain tools",
      "Notion vs Obsidian pricing", "which is better Notion or Obsidian"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Notion vs Obsidian — Complete Knowledge Tool Comparison 2026",
      description: "Side-by-side comparison: note-taking, graph views, plugins, privacy, pricing, and verdict.",
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
    description: "Notion is the all-in-one workspace that combines notes, databases, wikis, and project management. With 100M+ users, it's the most popular flexible workspace for teams and individuals who want everything in one place.",
    founded: "2013",
    headquarters: "San Francisco, USA",
    valuation: "$10B",
    users: "100M+ users",
    pricing: "Free · Plus $10/mo · Business $15/mo · Enterprise",
    strengths: [
      "Extremely flexible databases and views",
      "All-in-one: notes, projects, wikis, docs",
      "Massive template community",
      "Excellent real-time collaboration",
      "Strong mobile and desktop apps"
    ],
    weaknesses: [
      "No offline-first support for teams",
      "Slower with large workspaces (10,000+ pages)",
      "Proprietary format (vendor lock-in)",
      "Limited graph/visualization features"
    ],
    bestFor: [
      "Teams and collaborative workspaces",
      "Project management with databases",
      "Documentation and wikis",
      "Users wanting all-in-one solution"
    ],
    score: 94
  },
  item2: {
    name: "Obsidian",
    company: "Obsidian (Dynalist Inc.)",
    logo: "https://miro.medium.com/1*O5FF-Sh58QeunIdMLAs-YA.jpeg",
    logoColor: "#7C3AED",
    description: "Obsidian is the powerful, privacy-first note-taking app built on local Markdown files. With 1M+ users, it's beloved by researchers, developers, and knowledge workers who value data ownership and the unique graph visualization.",
    founded: "2020",
    headquarters: "Remote (Global Team)",
    valuation: "Private (Profitable, Bootstrapped)",
    users: "1M+ active users",
    pricing: "Free · Catalyst $25 (one-time) · Commercial $50/year · Sync $10/mo",
    strengths: [
      "Local-first, plain Markdown files",
      "Powerful backlinking and graph view",
      "Massive community plugin ecosystem (2,000+)",
      "Complete data ownership and privacy",
      "Lightning fast performance"
    ],
    weaknesses: [
      "Limited real-time collaboration",
      "Steeper learning curve for non-technical users",
      "No built-in database features",
      "Sync requires paid plan or third-party tools"
    ],
    bestFor: [
      "Personal knowledge management (PKM)",
      "Researchers and academics",
      "Developers and technical writers",
      "Privacy-conscious users"
    ],
    score: 92
  },
  features: [
    { name: "File Format", notion: "Proprietary (cloud)", obsidian: "Plain Markdown (local)", winner: "obsidian" },
    { name: "Graph View", notion: "None", obsidian: "Excellent", winner: "obsidian" },
    { name: "Databases", notion: "Advanced (relational)", obsidian: "Via plugins (Dataview)", winner: "notion" },
    { name: "Offline Access", notion: "Limited", obsidian: "Full (local-first)", winner: "obsidian" },
    { name: "Real-time Collaboration", notion: "Excellent", obsidian: "Limited (via Obsidian Publish)", winner: "notion" },
    { name: "Plugins/Community", notion: "Templates & integrations", obsidian: "2,000+ community plugins", winner: "obsidian" },
    { name: "Data Privacy", notion: "Cloud-hosted", obsidian: "Local (zero telemetry)", winner: "obsidian" },
    { name: "Mobile Experience", notion: "Excellent", obsidian: "Good (improving)", winner: "notion" },
    { name: "AI Features", notion: "Built-in AI", obsidian: "Via plugins", winner: "notion" },
    { name: "Backlinking", notion: "Basic", obsidian: "Advanced (core feature)", winner: "obsidian" }
  ],
  verdict: {
    winner: "Notion for teams, Obsidian for personal knowledge",
    summary: "Notion is the superior choice for teams needing collaboration, databases, and all-in-one workspace functionality. Obsidian is the champion for personal knowledge management, offering unmatched data ownership, graph visualization, and a thriving plugin ecosystem. Choose Notion if you collaborate with teams and need flexible databases. Choose Obsidian if you prioritize data privacy, local storage, and building a personal 'second brain' with interconnected notes.",
    recommendation: "Many power users combine both: Notion for team projects and shared documentation, Obsidian for personal research, deep thinking, and long-form writing. They serve complementary purposes in a modern knowledge workflow."
  }
}

export default async function NotionVsObsidianPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Notion vs Obsidian — Complete Comparison 2026",
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
                Knowledge Management · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Notion vs Obsidian
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The all-in-one workspace vs the privacy-first knowledge garden — which is your perfect thinking tool?
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

              {/* Obsidian Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#7C3AED] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Obsidian Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Obsidian</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Obsidian</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Obsidian</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'notion' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.notion === 'boolean' ? (
                      feature.notion ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.notion}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'obsidian' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.obsidian === 'boolean' ? (
                      feature.obsidian ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.obsidian}</span>}
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

          {/* PHILOSOPHY COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Core Philosophy</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] dark:text-white mb-3 font-mono">Notion Philosophy</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                  "One tool for everything." Notion believes your notes, projects, wikis, and databases should live in one connected, collaborative workspace accessible from anywhere.
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">Data ownership:</span> Cloud-hosted on Notion servers</p>
                  <p><span className="font-bold">Portability:</span> Export to PDF, HTML, CSV (not plain Markdown)</p>
                  <p><span className="font-bold">Customization:</span> Templates, integrations, limited theming</p>
                </div>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#7C3AED] mb-3 font-mono">Obsidian Philosophy</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
                  "Your knowledge, your files, forever." Obsidian believes your thinking should be stored in open, local files that you own and control, with tools to connect ideas.
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">Data ownership:</span> 100% local, plain Markdown on your device</p>
                  <p><span className="font-bold">Portability:</span> Open with any text editor, no lock-in</p>
                  <p><span className="font-bold">Customization:</span> 2,000+ plugins, CSS themes, community vaults</p>
                </div>
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Notion vs Coda", slug: "/compare/notion-vs-coda" },
                { name: "Canva vs CapCut", slug: "/compare/canva-vs-capcut" },
                { name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch" }
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
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, knowledge management tips, and productivity strategies.</p>
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
