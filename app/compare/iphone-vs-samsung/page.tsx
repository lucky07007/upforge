// app/compare/iphone-vs-samsung/page.tsx
// SERVER COMPONENT - iPhone vs Samsung Comparison

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
    ? "https://upforge.org/compare/iphone-vs-samsung" 
    : "https://www.upforge.in/compare/iphone-vs-samsung"

  return {
    title: "iPhone vs Samsung — Which Smartphone Wins in 2026? | UpForge",
    description: "Complete comparison of iPhone 17 Pro Max vs Samsung Galaxy S25 Ultra. Compare cameras, performance, battery, AI features, ecosystem, and pricing. Find which flagship phone fits your needs.",
    keywords: [
      "iPhone vs Samsung", "best smartphone 2026", "iPhone 17 vs Galaxy S25",
      "Apple vs Samsung", "flagship phone comparison", "which phone is better",
      "iPhone vs Samsung camera", "iPhone vs Samsung battery life"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "iPhone vs Samsung — Complete Smartphone Comparison 2026",
      description: "Side-by-side comparison: cameras, performance, battery, AI, ecosystem, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "iPhone 17 Pro Max",
    company: "Apple",
    logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/apple-logo.png",
    logoColor: "#000000",
    description: "The iPhone 17 Pro Max is Apple's 2026 flagship, powered by the A19 Pro chip. Known for its seamless ecosystem, industry-leading video capabilities, and the most secure mobile operating system. It's the choice for users invested in the Apple ecosystem.",
    founded: "1976 (iPhone: 2007)",
    headquarters: "Cupertino, USA",
    valuation: "$3.5T (Apple Inc.)",
    users: "1.5B+ active iPhones worldwide",
    pricing: "From $1,199 (Pro Max 256GB) · Up to $1,699 (1TB)",
    strengths: [
      "Best-in-class video recording (8K ProRes)",
      "Most secure OS with 7+ years of updates",
      "Seamless Apple ecosystem integration",
      "A19 Pro chip leads single-core performance",
      "Superior app optimization and App Store quality"
    ],
    weaknesses: [
      "Higher starting price",
      "Less customization (no sideloading easily)",
      "Slower charging speeds (35W max)",
      "No expandable storage"
    ],
    bestFor: [
      "Apple ecosystem users",
      "Content creators (video focus)",
      "Privacy-conscious users",
      "Long-term software support seekers"
    ],
    score: 96
  },
  item2: {
    name: "Galaxy S25 Ultra",
    company: "Samsung",
    logo: "https://static.vecteezy.com/system/resources/previews/020/336/290/non_2x/samsung-logo-samsung-icon-free-free-vector.jpg",
    logoColor: "#1428A0",
    description: "The Galaxy S25 Ultra is Samsung's 2026 flagship, powered by the Snapdragon 8 Gen 5. Known for its versatile camera system with 200MP sensor, S Pen productivity, and Samsung DeX desktop mode. It's the ultimate Android powerhouse.",
    founded: "1938 (Galaxy S: 2010)",
    headquarters: "Suwon, South Korea",
    valuation: "$350B (Samsung Electronics)",
    users: "1B+ active Galaxy devices",
    pricing: "From $1,199 (256GB) · Up to $1,599 (1TB)",
    strengths: [
      "Superior 200MP camera with 100x Space Zoom",
      "Faster 65W charging (0-70% in 30 min)",
      "S Pen for productivity and creativity",
      "Samsung DeX turns phone into desktop PC",
      "More customization and sideloading freedom"
    ],
    weaknesses: [
      "Software updates limited to 5 years",
      "Less optimized third-party apps vs iOS",
      "Resale value drops faster than iPhone",
      "Bloatware and duplicate Samsung apps"
    ],
    bestFor: [
      "Power users wanting maximum features",
      "Android enthusiasts and customizers",
      "S Pen stylus users",
      "Photography versatility seekers"
    ],
    score: 95
  },
  features: [
    { name: "Operating System", iphone: "iOS 20", samsung: "Android 16 (One UI 8)", winner: "tie" },
    { name: "Processor", iphone: "A19 Pro (3nm+)", samsung: "Snapdragon 8 Gen 5 (3nm)", winner: "iphone" },
    { name: "Main Camera", iphone: "48MP (Fusion)", samsung: "200MP (ISOCELL)", winner: "samsung" },
    { name: "Zoom Capability", iphone: "10x optical", samsung: "10x optical + 100x digital", winner: "samsung" },
    { name: "Video Recording", iphone: "8K 60fps ProRes", samsung: "8K 30fps", winner: "iphone" },
    { name: "Charging Speed", iphone: "35W wired", samsung: "65W wired", winner: "samsung" },
    { name: "Software Updates", iphone: "7+ years guaranteed", samsung: "5 years guaranteed", winner: "iphone" },
    { name: "Stylus Support", iphone: "No", samsung: "S Pen (built-in)", winner: "samsung" },
    { name: "Desktop Mode", iphone: "No", samsung: "DeX (full desktop)", winner: "samsung" },
    { name: "Resale Value", iphone: "65% after 2 years", samsung: "45% after 2 years", winner: "iphone" }
  ],
  verdict: {
    winner: "iPhone for ecosystem and longevity, Samsung for features and freedom",
    summary: "The iPhone 17 Pro Max wins on video quality, long-term software support, resale value, and ecosystem integration. The Galaxy S25 Ultra dominates in camera versatility (200MP, 100x zoom), charging speed, S Pen productivity, and customization freedom. Choose iPhone if you value seamless ecosystem, video creation, and long-term investment. Choose Samsung if you want maximum features, fast charging, stylus support, and Android customization.",
    recommendation: "iPhone is the safer, longer-lasting investment with superior app ecosystem. Samsung is the better choice for power users who want cutting-edge hardware features and creative flexibility. Both are exceptional flagships in 2026."
  }
}

export default async function iPhoneVsSamsungPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "iPhone vs Samsung — Complete Comparison 2026",
    "description": comparisonData.verdict.summary,
    "datePublished": "2026-04-01",
    "dateModified": "2026-04-25",
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
                Smartphones · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              iPhone vs Samsung
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              iPhone 17 Pro Max vs Galaxy S25 Ultra — Which flagship phone is right for you?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* iPhone Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#000000] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Apple Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">iPhone</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Apple</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Company Value</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Active Users</span>
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

              {/* Samsung Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#1428A0] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Samsung Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Galaxy</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Samsung</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Active Users</span>
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
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Spec Comparison</h3>
            <div className="border border-border">
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border p-4">
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Feature</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">iPhone</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Galaxy</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'iphone' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.iphone === 'boolean' ? (
                      feature.iphone ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.iphone}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'samsung' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.samsung === 'boolean' ? (
                      feature.samsung ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.samsung}</span>}
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

          {/* ECOSYSTEM COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Ecosystem Lock-in Factor</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] dark:text-white mb-3 font-mono">Apple Ecosystem Benefits</p>
                <ul className="space-y-2">
                  {[
                    "iMessage & FaceTime (blue bubble lock-in)",
                    "AirDrop for seamless file sharing",
                    "Apple Watch integration (market leader)",
                    "AirPods automatic device switching",
                    "iCloud sync across Mac, iPad, iPhone",
                    "Universal Control & Sidecar with Mac",
                    "Apple Card & Apple Cash integration",
                    "HomeKit smart home ecosystem"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#000000] dark:text-white shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#1428A0] mb-3 font-mono">Samsung Ecosystem Benefits</p>
                <ul className="space-y-2">
                  {[
                    "Samsung DeX (phone as desktop computer)",
                    "Galaxy Watch + Galaxy Buds integration",
                    "SmartThings home automation (widest compatibility)",
                    "Link to Windows (seamless PC integration)",
                    "Galaxy Tab multi-device clipboard & calls",
                    "Knox security platform (defense-grade)",
                    "Expandable storage on select models",
                    "Reverse wireless charging for accessories"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#1428A0] shrink-0 mt-0.5" />
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
                { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" },
                { name: "Slack vs Teams", slug: "/compare/slack-vs-teams" },
                { name: "Zoom vs Google Meet", slug: "/compare/zoom-vs-google-meet" }
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Tech Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">In-depth comparisons, gadget reviews, and tech industry analysis.</p>
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
