// app/compare/vercel-vs-netlify/page.tsx
// SERVER COMPONENT - Vercel vs Netlify Comparison

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
    ? "https://upforge.org/compare/vercel-vs-netlify" 
    : "https://www.upforge.in/compare/vercel-vs-netlify"

  return {
    title: "Vercel vs Netlify — Which Frontend Deployment Platform Wins in 2026? | UpForge",
    description: "Complete comparison of Vercel vs Netlify. Compare edge functions, build performance, serverless, Next.js support, analytics, pricing, and developer experience. Find which Jamstack platform fits your project.",
    keywords: [
      "Vercel vs Netlify", "best frontend deployment 2026", "Jamstack hosting comparison",
      "Vercel vs Netlify comparison", "edge functions comparison", "Next.js hosting",
      "which is better Vercel or Netlify", "frontend deployment platforms 2026",
      "Vercel vs Netlify pricing", "serverless deployment comparison"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Vercel vs Netlify — Complete Frontend Deployment Platform Comparison 2026",
      description: "Side-by-side comparison: edge functions, build speed, serverless, analytics, pricing, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Vercel",
    company: "Vercel Inc.",
    logo: "https://www.svgrepo.com/show/354513/vercel-icon.svg",
    description: "Vercel is the creator and primary maintainer of Next.js, making it the premier deployment platform for React and Next.js applications. Founded by Guillermo Rauch, Vercel pioneered serverless edge computing with Edge Functions, automatic Git-based deployments, and image optimization at the edge. With $450M+ in funding, it's the go-to choice for frontend teams shipping modern web applications with instant preview deployments.",
    founded: "2015 (as ZEIT, rebranded to Vercel 2020)",
    headquarters: "San Francisco, California, USA",
    valuation: "$3.25B (2024 Series E)",
    users: "2M+ developers, powers 35M+ projects",
    pricing: "Hobby Free · Pro $20/mo · Team $50/user/mo · Enterprise",
    strengths: [
      "Unmatched Next.js support — created and maintained by Vercel",
      "Edge Functions: ultra-low latency with global execution",
      "Automatic Git integration with instant preview deployments",
      "Built-in image optimization and ISR (Incremental Static Regeneration)",
      "Analytics: Real-time Web Vitals and audience insights"
    ],
    weaknesses: [
      "Heavy bias toward Next.js — less optimal for other frameworks",
      "Edge Functions have runtime limitations (file size, duration)",
      "Can become expensive at scale with high traffic volumes",
      "Vendor lock-in risk with Vercel-specific features (ISR, Edge)",
      "Limited backend capabilities vs full-stack alternatives"
    ],
    bestFor: [
      "Next.js and React applications",
      "Teams wanting instant preview deployments",
      "Edge-rendered content and personalization",
      "Frontend teams shipping Jamstack and SSG sites"
    ],
    score: 94
  },
  item2: {
    name: "Netlify",
    company: "Netlify Inc.",
    logo: "https://cdn.worldvectorlogo.com/logos/netlify.svg",
    description: "Netlify pioneered the Jamstack architecture and revolutionized static site deployment with Git-based workflows, atomic deploys, and serverless functions. With a framework-agnostic approach, Netlify supports 40+ frameworks equally well, from Gatsby to Astro to Remix. Its edge network spans 30+ global locations, and features like Netlify Dev, Forms, Identity, and Split Testing make it a complete platform for modern web projects.",
    founded: "2014",
    headquarters: "San Francisco, California, USA",
    valuation: "$2.5B (2021 Series D)",
    users: "4M+ developers, powers 50M+ sites",
    pricing: "Starter Free · Pro $19/mo · Business $99/mo · Enterprise",
    strengths: [
      "Framework-agnostic — excellent support for 40+ frameworks",
      "Netlify Dev: local development server that mirrors production",
      "Built-in Forms, Identity, and Split Testing features",
      "Atomic deploys — instant rollbacks with zero downtime",
      "Generous free tier (100GB bandwidth, 300 build minutes)"
    ],
    weaknesses: [
      "Edge Functions less mature vs Vercel's Edge runtime",
      "No first-party framework — relies on community integrations",
      "Build times can vary during peak traffic periods",
      "Less native Next.js optimization (no first-party ISR)",
      "Analytics less comprehensive than Vercel's Web Vitals"
    ],
    bestFor: [
      "Multi-framework teams and framework-agnostic projects",
      "Content-heavy sites using headless CMS + SSG",
      "Teams wanting built-in Forms and Identity",
      "Developers seeking the most generous free tier"
    ],
    score: 92
  },
  features: [
    { name: "Next.js Support", vercel: "First-class, created Next.js", netlify: "Excellent via plugin, no native ISR", winner: "vercel" },
    { name: "Edge Functions", vercel: "Global, fast, Web API compatible", netlify: "Deno-based, growing, fewer regions", winner: "vercel" },
    { name: "Framework Agnosticism", vercel: "Best with Next.js, solid with others", netlify: "Excellent with 40+ frameworks", winner: "netlify" },
    { name: "Build Performance", vercel: "Fast with caching, parallel builds", netlify: "Solid, can slow during peak times", winner: "vercel" },
    { name: "Preview Deployments", vercel: "Instant per-branch preview URLs", netlify: "Deploy Previews — excellent workflow", winner: "tie" },
    { name: "Image Optimization", vercel: "Built-in next/image, edge caching", netlify: "Netlify Image CDN (beta), good", winner: "vercel" },
    { name: "Serverless Functions", vercel: "Edge + Serverless, tight Next.js", netlify: "AWS Lambda-based, broader runtime", winner: "tie" },
    { name: "Analytics & Monitoring", vercel: "Web Vitals, Analytics, Speed Insights", netlify: "Netlify Analytics (limited), add-ons", winner: "vercel" },
    { name: "Free Tier Generosity", vercel: "Good — 100GB bandwidth, 6k build mins", netlify: "Excellent — 100GB, 300 build mins, Forms", winner: "netlify" },
    { name: "Local Development", vercel: "vercel dev (Next.js optimized)", netlify: "Netlify Dev — mirrors production locally", winner: "netlify" },
    { name: "Built-in Features", vercel: "Analytics, ISR, Image Optimization", netlify: "Forms, Identity, Split Testing, Large Media", winner: "netlify" },
    { name: "Enterprise Readiness", vercel: "SOC 2, SSO, audit logs, dedicated support", netlify: "SOC 2, SSO, RBAC, SLA — mature", winner: "tie" }
  ],
  verdict: {
    winner: "Vercel for Next.js & edge performance, Netlify for framework flexibility",
    summary: "Vercel is the clear winner if you're building with Next.js — it's created and optimized by the same team, offering unmatched edge performance, ISR, and analytics. For Next.js projects, no platform comes close. Netlify shines as the framework-agnostic champion, offering equally excellent support for 40+ frameworks, built-in Forms and Identity, and a more generous free tier. Its local development experience with Netlify Dev is best-in-class. In 2026, both platforms are excellent — Vercel leads on Next.js and edge performance, while Netlify wins on framework flexibility, built-in features, and developer experience for non-Next.js projects.",
    recommendation: "Choose Vercel if you're building with Next.js or want the best edge performance and analytics — the tight integration and Vercel-specific optimizations are game-changing for React teams. Choose Netlify if you want framework flexibility, need built-in Forms and Identity, value a generous free tier, or are building with Astro, Remix, Gatsby, or any non-Next.js framework — its framework-agnostic philosophy gives you freedom to switch tools."
  }
}

export default async function VercelVsNetlifyPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Vercel vs Netlify — Complete Frontend Deployment Platform Comparison 2026",
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
                Jamstack & Frontend · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Vercel vs Netlify
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The Next.js powerhouse vs the Jamstack pioneer — which platform should deploy your frontend?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Vercel Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-black flex items-center justify-center p-2">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Vercel Logo" 
                        width={44} 
                        height={44}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Vercel</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Vercel Inc.</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">User Base</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.users}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item1.pricing}</p>
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

              {/* Netlify Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Netlify Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Netlify</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Netlify Inc.</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">User Base</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.users}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span>
                      <p className="font-medium text-foreground text-xs">{comparisonData.item2.pricing}</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Vercel</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Netlify</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'vercel' ? 'bg-gray-50 dark:bg-gray-950/20' : ''}`}>
                    {typeof feature.vercel === 'boolean' ? (
                      feature.vercel ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.vercel}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'netlify' ? 'bg-teal-50 dark:bg-teal-950/20' : ''}`}>
                    {typeof feature.netlify === 'boolean' ? (
                      feature.netlify ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.netlify}</span>}
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
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] mb-3 font-mono">Choose Vercel When</p>
                <ul className="space-y-2">
                  {[
                    "Building with Next.js — Vercel creates and optimizes Next.js",
                    "Edge performance is critical (global edge functions)",
                    "You need Incremental Static Regeneration (ISR)",
                    "Real-time Web Vitals and Core Web Vitals analytics matter",
                    "Instant preview deployments for every Git branch",
                    "Server-side rendering and dynamic edge-rendered content"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#000000] dark:text-white shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#00AD9F] mb-3 font-mono">Choose Netlify When</p>
                <ul className="space-y-2">
                  {[
                    "You need built-in Forms and Identity (no third-party services)",
                    "Framework flexibility matters — using Astro, Gatsby, Remix, etc.",
                    "A generous free tier is important (100GB + 300 build mins)",
                    "Local development that mirrors production (Netlify Dev)",
                    "Split testing and gradual rollouts are core requirements",
                    "Content-heavy Jamstack sites with headless CMS integration"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#00AD9F] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SUPPORTED FRAMEWORKS */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Framework Support Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="border border-border p-5 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] mb-4 font-mono text-center">Vercel Best For</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Next.js ★★★★★", "SvelteKit ★★★★", "Nuxt ★★★★", "Gatsby ★★★★", "Remix ★★★★", "Astro ★★★★", "SolidStart ★★★★", "Vue ★★★★"].map((fw, i) => (
                    <span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{fw}</span>
                  ))}
                </div>
              </div>
              <div className="border border-border p-5 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#00AD9F] mb-4 font-mono text-center">Netlify Best For</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Next.js ★★★★", "Gatsby ★★★★★", "Astro ★★★★★", "Remix ★★★★★", "SvelteKit ★★★★★", "Nuxt ★★★★★", "Eleventy ★★★★★", "Hugo ★★★★★"].map((fw, i) => (
                    <span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{fw}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FREE TIER COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Free Tier Face-Off</h3>
            <div className="max-w-2xl mx-auto border border-border">
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border p-4">
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Resource</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Vercel</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Netlify</div>
              </div>
              {[
                { name: "Bandwidth", vercel: "100 GB/month", netlify: "100 GB/month" },
                { name: "Build Minutes", vercel: "6,000 min/month", netlify: "300 min/month" },
                { name: "Serverless Functions", vercel: "100 GB-hours", netlify: "125K requests/month" },
                { name: "Concurrent Builds", vercel: "1", netlify: "1" },
                { name: "Team Members", vercel: "Unlimited", netlify: "Unlimited" },
                { name: "Forms", vercel: "Not included", netlify: "100 submissions/month" },
                { name: "Identity", vercel: "Not included", netlify: "1,000 active users" }
              ].map((tier, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-3 font-serif text-sm">{tier.name}</div>
                  <div className={`p-3 text-center text-sm ${tier.vercel > tier.netlify ? 'bg-gray-50 dark:bg-gray-950/20' : ''}`}>
                    <span className="font-medium text-xs">{tier.vercel}</span>
                  </div>
                  <div className={`p-3 text-center text-sm ${tier.netlify > tier.vercel ? 'bg-teal-50 dark:bg-teal-950/20' : ''}`}>
                    <span className="font-medium text-xs">{tier.netlify}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Supabase vs Firebase", slug: "/compare/supabase-vs-firebase" },
                { name: "Docker vs Podman", slug: "/compare/docker-vs-podman" },
                { name: "Rust vs Go", slug: "/compare/rust-vs-go" }
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Frontend & Jamstack Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Platform comparisons, deployment strategies, and frontend development best practices.</p>
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
