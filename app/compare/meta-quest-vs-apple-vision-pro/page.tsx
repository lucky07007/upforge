// app/compare/meta-quest-vs-apple-vision-pro/page.tsx
// SERVER COMPONENT - Meta Quest vs Apple Vision Pro Comparison

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
    ? "https://upforge.org/compare/meta-quest-vs-apple-vision-pro" 
    : "https://www.upforge.in/compare/meta-quest-vs-apple-vision-pro"

  return {
    title: "Meta Quest vs Apple Vision Pro — Which VR/AR Headset Wins in 2026? | UpForge",
    description: "Complete comparison of Meta Quest 3 vs Apple Vision Pro. Compare display quality, processing power, app ecosystem, gaming, productivity, comfort, and pricing. Find which spatial computing device fits your needs.",
    keywords: [
      "Meta Quest vs Apple Vision Pro", "best VR headset 2026", "Apple Vision Pro alternative",
      "Meta Quest 3 vs Vision Pro", "VR headset comparison", "spatial computing comparison",
      "Meta Quest vs Apple Vision Pro pricing", "which is better Quest or Vision Pro"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Meta Quest vs Apple Vision Pro — Complete VR/AR Headset Comparison 2026",
      description: "Side-by-side comparison: display, performance, apps, gaming, comfort, price, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Meta Quest 3",
    company: "Meta Platforms Inc.",
    logo: "https://cdn.worldvectorlogo.com/logos/meta-3.svg",
    logoColor: "#0668E1",
    description: "Meta Quest 3 is the world's most popular standalone VR headset, blending virtual and mixed reality at an accessible price point. With ringless Touch Plus controllers, full-color passthrough, and the Snapdragon XR2 Gen 2 chip, it delivers console-quality VR gaming and productivity in a wireless package.",
    founded: "2023 (Quest 3 launch)",
    headquarters: "Menlo Park, California, USA",
    valuation: "Meta: $1.2T+ market cap",
    users: "20M+ Quest units sold, 6M+ monthly active VR users",
    pricing: "128GB $499 · 512GB $649",
    strengths: [
      "Best price-to-performance ratio in VR",
      "Massive 500+ game/app library with exclusives",
      "Truly wireless standalone freedom",
      "Full-color mixed reality passthrough",
      "Comfortable for extended gaming sessions"
    ],
    weaknesses: [
      "LCD displays, not OLED — less contrast",
      "Battery life limited to 2-3 hours",
      "Less precise hand tracking vs Vision Pro",
      "Lower resolution than premium headsets",
      "Limited productivity/enterprise apps"
    ],
    bestFor: [
      "VR gaming enthusiasts",
      "Fitness and workout apps",
      "Social VR experiences",
      "Budget-conscious XR users"
    ],
    score: 88
  },
  item2: {
    name: "Apple Vision Pro",
    company: "Apple Inc.",
    logo: "https://cdn.worldvectorlogo.com/logos/apple-vision-pro-icon.svg",
    logoColor: "#000000",
    description: "Apple Vision Pro is a revolutionary spatial computer that blends digital content with the physical world. With dual 4K micro-OLED displays, the M2 + R1 chip combo, and visionOS, it redefines productivity, entertainment, and spatial computing — at a premium price that signals Apple's ambition to own the high-end XR market.",
    founded: "2024 (Vision Pro launch)",
    headquarters: "Cupertino, California, USA",
    valuation: "Apple: $3.5T+ market cap",
    users: "500K+ units sold (estimated), growing ecosystem",
    pricing: "256GB $3,499 · 512GB $3,699 · 1TB $3,899",
    strengths: [
      "Industry-best dual 4K micro-OLED displays",
      "Revolutionary eye + hand tracking interface",
      "Seamless Apple ecosystem integration",
      "Powerful M2 + R1 dual-chip architecture",
      "Spatial photos/videos with depth mapping"
    ],
    weaknesses: [
      "Prohibitively expensive for most consumers",
      "Heavy front-weighted design (600-650g)",
      "Limited native app library at launch",
      "External battery pack required (tethered)",
      "No VR gaming controller support"
    ],
    bestFor: [
      "Creative professionals and designers",
      "Productivity and multitasking power users",
      "Apple ecosystem enthusiasts",
      "Enterprise and medical applications"
    ],
    score: 91
  },
  features: [
    { name: "Display Quality", metaquest: "2064×2208 per eye LCD", apple: "3660×3200 per eye micro-OLED", winner: "apple" },
    { name: "Processing Power", metaquest: "Snapdragon XR2 Gen 2", apple: "M2 + R1 co-processor", winner: "apple" },
    { name: "Field of View", metaquest: "110° horizontal", apple: "100-110° horizontal", winner: "metaquest" },
    { name: "Wireless Freedom", metaquest: "Fully wireless", apple: "Tethered battery pack", winner: "metaquest" },
    { name: "Controller Support", metaquest: "Touch Plus controllers", apple: "None (hand/eye only)", winner: "metaquest" },
    { name: "App Ecosystem", metaquest: "500+ VR apps/games", apple: "1,000+ native apps (growing)", winner: "tie" },
    { name: "Mixed Reality Quality", metaquest: "Good full-color passthrough", apple: "Industry-leading spatial mapping", winner: "apple" },
    { name: "Gaming Library", metaquest: "Extensive VR exclusives", apple: "Limited (no controllers)", winner: "metaquest" },
    { name: "Comfort (Weight)", metaquest: "515g well-balanced", apple: "600-650g front-heavy", winner: "metaquest" },
    { name: "Value for Money", metaquest: "Excellent ($499)", apple: "Prohibitively expensive ($3,499+)", winner: "metaquest" }
  ],
  verdict: {
    winner: "Meta Quest 3 for most users, Vision Pro for premium professionals",
    summary: "Meta Quest 3 is the undisputed value king — delivering 85% of the XR experience at 15% of Vision Pro's price. It dominates gaming, fitness, and social VR with a mature ecosystem. Apple Vision Pro is a technological marvel with unmatched display quality, eye-tracking precision, and productivity potential, but its $3,499 price tag and limited gaming capabilities make it a niche professional device. For 95% of consumers, Quest 3 is the smarter buy. For creative pros and Apple devotees seeking the ultimate spatial computer, Vision Pro is unmatched.",
    recommendation: "Buy Meta Quest 3 if you want the best all-around VR/MR experience for gaming, fitness, and socializing — it's the clear value winner. Invest in Apple Vision Pro only if you need a productivity-focused spatial computer, work in creative fields, or are deeply embedded in the Apple ecosystem and budget isn't a concern."
  }
}

export default async function MetaQuestVsAppleVisionProPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Meta Quest vs Apple Vision Pro — Complete Comparison 2026",
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
                VR/AR Hardware · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Meta Quest vs Apple Vision Pro
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The accessible VR powerhouse vs the premium spatial computer — which headset is right for you?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Meta Quest Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Meta Quest Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Meta Quest 3</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Meta Platforms Inc.</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Launched</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.founded}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Company Value</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">User Base</span>
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

              {/* Apple Vision Pro Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Apple Vision Pro Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Apple Vision Pro</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Apple Inc.</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Launched</span>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Meta Quest 3</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Vision Pro</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'metaquest' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                    {typeof feature.metaquest === 'boolean' ? (
                      feature.metaquest ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.metaquest}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'apple' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.apple === 'boolean' ? (
                      feature.apple ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.apple}</span>}
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
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0668E1] mb-3 font-mono">Choose Meta Quest 3 When</p>
                <ul className="space-y-2">
                  {[
                    "Playing VR games (Beat Saber, Resident Evil, Asgard's Wrath)",
                    "Working out with fitness apps (Supernatural, FitXR)",
                    "Exploring social VR worlds (VRChat, Horizon Worlds)",
                    "Budget is under $1,000 for a VR headset",
                    "You want untethered, wireless VR freedom",
                    "Need controller-based precision gaming input"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#0668E1] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] mb-3 font-mono">Choose Apple Vision Pro When</p>
                <ul className="space-y-2">
                  {[
                    "Spatial computing for productivity and multitasking",
                    "Creative work: 3D design, medical imaging, architecture",
                    "You're deep in the Apple ecosystem (Mac, iPhone, iPad)",
                    "Watching immersive movies and spatial video content",
                    "Budget is not a constraint ($3,500+ investment)",
                    "Precision eye/hand tracking without controllers matters"
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
                { name: "Canva vs CapCut", slug: "/compare/canva-vs-capcut" },
                { name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch" },
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
