// app/compare/canva-vs-capcut/page.tsx
// SERVER COMPONENT - Canva vs CapCut Comparison

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
    ? "https://upforge.org/compare/canva-vs-capcut" 
    : "https://www.upforge.in/compare/canva-vs-capcut"

  return {
    title: "Canva vs CapCut — Which Creative Tool Wins in 2026? | UpForge",
    description: "Complete comparison of Canva vs CapCut. Compare design features, video editing, AI tools, pricing, templates, and team collaboration. Find which creative platform fits your needs.",
    keywords: [
      "Canva vs CapCut", "best design tool 2026", "Canva alternative",
      "CapCut vs Canva", "video editing comparison", "creative platform comparison",
      "Canva vs CapCut pricing", "which is better Canva or CapCut"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Canva vs CapCut — Complete Creative Tool Comparison 2026",
      description: "Side-by-side comparison: design features, video editing, AI tools, pricing, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Canva",
    company: "Canva Pty Ltd",
    logo: "https://public.canva.site/logo/video/880b4225ad0f37556240783328b91306.jpg",
    logoColor: "#7B2CBF",
    description: "Canva is the world's most popular visual communication platform, used by 240M+ monthly users. It democratizes design with drag-and-drop simplicity, AI-powered tools, and a massive template library for everything from social media posts to presentations.",
    founded: "2013",
    headquarters: "Sydney, Australia",
    valuation: "$42B",
    users: "240M+ MAU",
    pricing: "Free · Pro $13/mo · Teams $15/mo · Enterprise",
    strengths: [
      "Massive 600,000+ template library",
      "AI Magic Studio for design automation",
      "Brand Kit for team consistency",
      "Print and merchandise fulfillment",
      "All-in-one: design, docs, whiteboards, websites"
    ],
    weaknesses: [
      "Limited advanced video editing features",
      "Less precise control vs professional tools",
      "Some premium features locked behind paywall",
      "Video rendering quality not broadcast-grade"
    ],
    bestFor: [
      "Social media managers",
      "Small business owners",
      "Marketing teams",
      "Educators and students"
    ],
    score: 95
  },
  item2: {
    name: "CapCut",
    company: "ByteDance (TikTok)",
    logo: "https://static.vecteezy.com/system/resources/thumbnails/045/126/100/small/capcut-software-editor-icon-free-vector.jpg",
    logoColor: "#000000",
    description: "CapCut is ByteDance's free, all-in-one video editing platform that has exploded to 1B+ downloads. Known for powerful AI effects, auto-captions, and TikTok integration, it's the go-to tool for short-form video creators worldwide.",
    founded: "2019",
    headquarters: "Beijing, China / Singapore",
    valuation: "Part of ByteDance ($300B+)",
    users: "1B+ downloads, 200M+ MAU",
    pricing: "Free · Pro $11/mo · Team $20/mo",
    strengths: [
      "Best-in-class auto-captions and text-to-speech",
      "Viral-ready effects and transitions",
      "Deep TikTok integration",
      "Advanced keyframe animation",
      "Completely free core features"
    ],
    weaknesses: [
      "Limited graphic design features",
      "No presentation or document tools",
      "Smaller stock asset library",
      "Privacy concerns (ByteDance ownership)"
    ],
    bestFor: [
      "Content creators and influencers",
      "Short-form video editors",
      "TikTok and Reels specialists",
      "Social media video marketers"
    ],
    score: 93
  },
  features: [
    { name: "Graphic Design", canva: "Excellent", capcut: "Limited", winner: "canva" },
    { name: "Video Editing", canva: "Basic-Good", capcut: "Advanced", winner: "capcut" },
    { name: "AI Effects/Filters", canva: "Magic Studio", capcut: "Vast library", winner: "tie" },
    { name: "Auto-Captions", canva: "Good", capcut: "Best-in-class", winner: "capcut" },
    { name: "Templates", canva: "600,000+", capcut: "100,000+", winner: "canva" },
    { name: "Stock Assets", canva: "100M+ photos/videos", capcut: "Limited library", winner: "canva" },
    { name: "Team Collaboration", canva: "Advanced", capcut: "Basic", winner: "canva" },
    { name: "Presentations & Docs", canva: true, capcut: false, winner: "canva" },
    { name: "Keyframe Animation", canva: "Limited", capcut: "Excellent", winner: "capcut" },
    { name: "Free Tier Quality", canva: "Good", capcut: "Excellent", winner: "capcut" }
  ],
  verdict: {
    winner: "Canva for design, CapCut for video — they complement each other",
    summary: "Canva is the undisputed king of graphic design and visual communication, with unmatched templates, brand tools, and document creation. CapCut dominates short-form video editing with viral effects, auto-captions, and TikTok integration. Most creators actually use both: Canva for thumbnails and graphics, CapCut for editing videos. They're not direct competitors but complementary tools in a creator's stack.",
    recommendation: "Use Canva for all graphic design, presentations, and brand assets. Use CapCut for short-form video editing, especially if you post to TikTok or Reels. Together, they cover 95% of a content creator's needs."
  }
}

export default async function CanvaVsCapCutPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Canva vs CapCut — Complete Comparison 2026",
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
                Creative Tools · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Canva vs CapCut
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The design giant vs the video editing powerhouse — which creative tool is right for you?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Canva Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#7B2CBF] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Canva Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Canva</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Canva Pty Ltd</p>
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

              {/* CapCut Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#000000] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="CapCut Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">CapCut</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by ByteDance</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Canva</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">CapCut</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'canva' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.canva === 'boolean' ? (
                      feature.canva ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.canva}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'capcut' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.capcut === 'boolean' ? (
                      feature.capcut ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.capcut}</span>}
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
                <p className="text-[10px] font-black uppercase tracking-wider text-[#7B2CBF] mb-3 font-mono">Choose Canva When</p>
                <ul className="space-y-2">
                  {[
                    "Creating social media graphics and posts",
                    "Designing presentations and pitch decks",
                    "Building brand kits and marketing materials",
                    "Making documents, whiteboards, and websites",
                    "Need 600,000+ templates and 100M+ stock assets",
                    "Collaborating with a team on designs"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#7B2CBF] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] mb-3 font-mono">Choose CapCut When</p>
                <ul className="space-y-2">
                  {[
                    "Editing short-form videos (TikTok, Reels, Shorts)",
                    "Creating viral content with trending effects",
                    "Need best-in-class auto-captions",
                    "Advanced keyframe animations and transitions",
                    "Want completely free professional video editing",
                    "Creating content specifically for TikTok ecosystem"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#000000] dark:text-white shrink-0 mt-0.5" />
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
                { name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch" },
                { name: "Notion vs Coda", slug: "/compare/notion-vs-coda" },
                { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" }
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
