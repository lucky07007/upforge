// app/compare/claude-vs-openai/page.tsx
// SERVER COMPONENT - Claude vs OpenAI Comparison (Clean version with real logos)

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Check, X, Award, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"

async function getDomain(): Promise<"org" | "in"> {
  return "org"
}


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://upforge.org/compare/claude-vs-openai"

  return {
    title: "Claude vs OpenAI (ChatGPT) — Which AI is Better in 2026? | UpForge",
    description: "Detailed comparison of Claude (Anthropic) vs OpenAI (ChatGPT). Compare features, pricing, context window, safety, and enterprise capabilities.",
    keywords: ["Claude vs ChatGPT", "Claude vs OpenAI", "best AI assistant 2026", "AI model comparison"],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Claude vs OpenAI — Which AI Wins in 2026?",
      description: "Side-by-side comparison: features, pricing, context window, safety, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Claude",
    company: "Anthropic",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQFko-zWIZk_pw/company-logo_200_200/B4EZhiRWKvHgAI-/0/1753995371543/claude_logo?e=2147483647&v=beta&t=CVNmFKyWig0Uo78oAr3II6KVLu_o0aXPtnt4S6XgOr8",
    logoColor: "#141414",
    description: "Claude is Anthropic's Constitutional AI assistant, designed with safety and alignment as core principles. Known for nuanced reasoning and industry-leading 1M token context window.",
    founded: "2021",
    headquarters: "San Francisco, USA",
    valuation: "$2.7T (Corporate)",
    users: "50M+ MAU (Enterprise)",
    pricing: "Free · Pro $20/mo · Enterprise",
    strengths: [
      "1M token context window (best in class)",
      "Constitutional AI for superior safety",
      "Nuanced reasoning and analysis",
      "Deep AWS integration",
      "Strong enterprise compliance"
    ],
    weaknesses: [
      "Smaller consumer mindshare",
      "No native internet browsing",
      "Limited multimodal features"
    ],
    bestFor: [
      "Enterprise & compliance",
      "Long document analysis",
      "Legal & financial sectors",
      "AWS ecosystem users"
    ],
    score: 94
  },
  item2: {
    name: "ChatGPT",
    company: "OpenAI",
    logo: "https://lh4.googleusercontent.com/proxy/giEDaX3GfzFq-HAvCa_92K-8lRvuedIQiGrBvxVAqXdRmXoNj-CTe0nJNJVM5P5DYZV7m3imSRVlx7YAPVu4gurNo4jSVXJ8d220_ZWhCyqz08KE53GqC54ayElFbrNb92iOdZMfYXz6",
    logoColor: "#10A37F",
    description: "OpenAI's GPT series powers ChatGPT, the world's most popular AI assistant. Known for broad capabilities, multimodal features, and massive consumer adoption with 800M+ users.",
    founded: "2015",
    headquarters: "San Francisco, USA",
    valuation: "$5.9T (Corporate)",
    users: "800M+ MAU",
    pricing: "Free · Plus $20/mo · Pro $200/mo",
    strengths: [
      "Massive 800M+ user base",
      "Full multimodal (vision, voice)",
      "Internet browsing capability",
      "Extensive plugin ecosystem",
      "Fast feature iteration"
    ],
    weaknesses: [
      "Hallucination concerns",
      "Higher operational costs",
      "Data privacy questions"
    ],
    bestFor: [
      "General-purpose tasks",
      "Creative writing",
      "Multimodal applications",
      "Consumer use cases"
    ],
    score: 94
  },
  features: [
    { name: "Context Window", claude: "1M tokens", openai: "128K tokens", winner: "claude" },
    { name: "Multimodal (Vision)", claude: true, openai: true, winner: "tie" },
    { name: "Voice Mode", claude: false, openai: true, winner: "openai" },
    { name: "Internet Access", claude: false, openai: true, winner: "openai" },
    { name: "Code Interpreter", claude: true, openai: true, winner: "tie" },
    { name: "Enterprise SSO", claude: true, openai: true, winner: "tie" },
    { name: "API Availability", claude: true, openai: true, winner: "tie" },
    { name: "Constitutional AI", claude: true, openai: false, winner: "claude" }
  ],
  verdict: {
    winner: "It Depends on Your Needs",
    summary: "OpenAI dominates consumer applications with multimodal capabilities and massive reach. Claude leads in enterprise trust, safety compliance, and long-context analysis. Choose Claude for compliance-heavy work and deep document analysis. Choose ChatGPT for creative tasks, multimodal needs, and general-purpose assistance.",
    recommendation: "Many enterprises use both: Claude for sensitive/internal work, ChatGPT for broad consumer-facing applications."
  }
}

export default async function ClaudeVsOpenAIPage() {
  const baseUrl = "https://upforge.org"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Claude vs OpenAI (ChatGPT) — Complete Comparison 2026",
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
          
          <section className="border-b-2 border-foreground pb-4 pt-6 flex flex-col items-center text-center w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C59A2E] font-mono">
                AI Models · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Claude vs OpenAI (ChatGPT)
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              Anthropic's Constitutional AI vs OpenAI's GPT — Which AI assistant is right for you?
            </p>
          </section>

          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Claude Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#141414] flex items-center justify-center">
                      <Image src={comparisonData.item1.logo} alt="Claude Logo" width={56} height={56} className="object-contain" unoptimized />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Claude</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Anthropic</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item1.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">{comparisonData.item1.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Founded</span><p className="font-medium text-foreground">{comparisonData.item1.founded}</p></div>
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span><p className="font-medium text-foreground">{comparisonData.item1.valuation}</p></div>
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Users</span><p className="font-medium text-foreground">{comparisonData.item1.users}</p></div>
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span><p className="font-medium text-foreground">{comparisonData.item1.pricing}</p></div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item1.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span className="text-muted-foreground">{s}</span></li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item1.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span className="text-muted-foreground">{w}</span></li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {comparisonData.item1.bestFor.map((b, i) => (<span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>))}
                    </div>
                  </div>
                </div>
              </div>

              {/* OpenAI Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#10A37F] flex items-center justify-center">
                      <Image src={comparisonData.item2.logo} alt="OpenAI Logo" width={56} height={56} className="object-contain" unoptimized />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">ChatGPT</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by OpenAI</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item2.score}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">{comparisonData.item2.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Founded</span><p className="font-medium text-foreground">{comparisonData.item2.founded}</p></div>
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span><p className="font-medium text-foreground">{comparisonData.item2.valuation}</p></div>
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Users</span><p className="font-medium text-foreground">{comparisonData.item2.users}</p></div>
                    <div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span><p className="font-medium text-foreground">{comparisonData.item2.pricing}</p></div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item2.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span className="text-muted-foreground">{s}</span></li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p>
                    <ul className="space-y-1.5">
                      {comparisonData.item2.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span className="text-muted-foreground">{w}</span></li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p>
                    <div className="flex flex-wrap gap-2">
                      {comparisonData.item2.bestFor.map((b, i) => (<span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Feature Comparison</h3>
            <div className="border border-border">
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border p-4">
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Feature</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Claude</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">ChatGPT</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'claude' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.claude === 'boolean' ? (feature.claude ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />) : <span className="font-medium">{feature.claude}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'openai' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.openai === 'boolean' ? (feature.openai ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />) : <span className="font-medium">{feature.openai}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

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

          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{ name: "Notion vs Coda", slug: "/compare/notion-vs-coda" },{ name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch" },{ name: "ChatGPT vs Gemini", slug: "/compare/chatgpt-vs-gemini" }].map((link, i) => (
                <Link key={i} href={link.slug} className="p-4 border border-border hover:border-foreground transition-all group"><span className="font-serif group-hover:text-[#C59A2E] transition-colors">{link.name}</span><ArrowRight className="w-4 h-4 text-border group-hover:text-[#C59A2E] mt-2 transition-colors" /></Link>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-muted/30 border-t-2 border-foreground py-12 mt-8">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly AI Intelligence</h2>
            <p className="font-serif italic text-muted-foreground mb-6">In-depth comparisons, market analysis, and startup insights.</p>
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
