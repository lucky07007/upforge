// app/compare/github-copilot-vs-cursor-ai/page.tsx
// SERVER COMPONENT - GitHub Copilot vs Cursor AI Comparison

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
    ? "https://upforge.org/compare/github-copilot-vs-cursor-ai" 
    : "https://www.upforge.in/compare/github-copilot-vs-cursor-ai"

  return {
    title: "GitHub Copilot vs Cursor AI — Which AI Code Editor Wins in 2026? | UpForge",
    description: "Complete comparison of GitHub Copilot vs Cursor AI. Compare AI code completion, context understanding, IDE integration, pricing, and developer experience. Find which AI coding tool fits your workflow.",
    keywords: [
      "GitHub Copilot vs Cursor", "best AI code editor 2026", "Cursor AI vs Copilot",
      "AI coding assistant comparison", "Copilot vs Cursor", "which AI coding tool is better",
      "Copilot vs Cursor pricing", "best AI pair programmer"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "GitHub Copilot vs Cursor AI — Complete AI Coding Tool Comparison 2026",
      description: "Side-by-side comparison: AI features, IDE experience, context understanding, pricing, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "GitHub Copilot",
    company: "GitHub (Microsoft)",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgshrM4NhZ9aD08cs80EzjsFU-AlN1TCvIgg&s",
    logoColor: "#000000",
    description: "GitHub Copilot is the world's most widely adopted AI coding assistant, integrated into VS Code, JetBrains, and Neovim. With 1.8M+ paying users, it offers code completion, chat, and agent mode across multiple IDEs. It's the industry standard for AI pair programming.",
    founded: "2021",
    headquarters: "San Francisco, USA (GitHub/Microsoft)",
    valuation: "Part of Microsoft ($3T+)",
    users: "1.8M+ paying subscribers, 50K+ enterprise customers",
    pricing: "Free · Pro $10/mo · Business $19/mo · Enterprise $39/mo",
    strengths: [
      "Works across VS Code, JetBrains, Neovim, and more",
      "Massive ecosystem and enterprise adoption",
      "Copilot Chat with agent mode for complex tasks",
      "Deep GitHub integration (PRs, Issues, Actions)",
      "Strong code safety and IP indemnification"
    ],
    weaknesses: [
      "Less context-aware than dedicated AI-native editors",
      "Not a full IDE — requires separate editor",
      "Limited multi-file refactoring capabilities",
      "Slower to adopt cutting-edge AI features"
    ],
    bestFor: [
      "Developers using multiple IDEs",
      "Enterprise teams needing compliance and IP protection",
      "GitHub-ecosystem heavy workflows",
      "General-purpose coding across languages"
    ],
    score: 95
  },
  item2: {
    name: "Cursor AI",
    company: "Anysphere Inc.",
    logo: "https://custom.typingmind.com/assets/models/cursor.png", 
    logoColor: "#000000", // Cursor brand color is black/white
    description: "Cursor AI is the AI-native code editor built on VS Code, purpose-built for AI-assisted development. With features like full codebase context, multi-file editing, and an AI agent that understands your entire project, it's redefining how developers write software. It's the fastest-growing AI coding tool among professional developers.",
    founded: "2022",
    headquarters: "San Francisco, USA",
    valuation: "$400M+ (Series B, 2025)",
    users: "500K+ developers (fastest growing in 2025-26)",
    pricing: "Free (Hobby) · Pro $20/mo · Business $40/mo",
    strengths: [
      "Full codebase context (not just open files)",
      "Multi-file editing and refactoring",
      "AI agent can run terminal commands and debug",
      "Smart apply (previews changes before applying)",
      "Tab completion is faster and more contextual"
    ],
    weaknesses: [
      "Only one editor (VS Code fork, limited IDE options)",
      "Smaller ecosystem and fewer extensions",
      "Newer company with less enterprise track record",
      "IP indemnification policies still maturing"
    ],
    bestFor: [
      "Developers wanting maximum AI integration",
      "Complex multi-file refactoring tasks",
      "Startups and fast-moving teams",
      "Developers comfortable with VS Code"
    ],
    score: 93
  },
  features: [
    { name: "AI Code Completion", copilot: "Excellent (Ghost Text)", cursor: "Excellent (Tab)", winner: "tie" },
    { name: "Full Codebase Context", copilot: "Limited", cursor: "Excellent (Indexes entire project)", winner: "cursor" },
    { name: "AI Chat", copilot: "Copilot Chat", cursor: "AI Chat (Tab to apply)", winner: "cursor" },
    { name: "Multi-file Editing", copilot: "Agent mode (limited)", cursor: "Composer (excellent)", winner: "cursor" },
    { name: "IDE Support", copilot: "VS Code, JetBrains, Neovim, etc.", cursor: "Cursor IDE only (VS Code fork)", winner: "copilot" },
    { name: "GitHub Integration", copilot: "Native (PRs, Issues, Actions)", cursor: "Basic (Git support)", winner: "copilot" },
    { name: "Agent/Terminal Control", copilot: "Agent mode (emerging)", cursor: "Full terminal command execution", winner: "cursor" },
    { name: "Enterprise Compliance", copilot: "Strong (IP indemnity, SSO)", cursor: "Growing (SAML SSO)", winner: "copilot" },
    { name: "Extensions Ecosystem", copilot: "Full VS Code/JetBrains ecosystem", cursor: "Most VS Code extensions work", winner: "copilot" },
    { name: "Pricing (Free Tier)", copilot: "Free (2,000 completions/mo)", cursor: "Free (2,000 completions/mo)", winner: "tie" }
  ],
  verdict: {
    winner: "Copilot for enterprise and flexibility, Cursor for deep AI integration",
    summary: "GitHub Copilot is the safe, enterprise-ready choice with broad IDE support, GitHub ecosystem integration, and strong IP protection. Cursor AI is the cutting-edge option for developers who want the most powerful AI integration, with full codebase context and multi-file editing that feels like magic. Choose Copilot if you need IDE flexibility, enterprise compliance, and GitHub integration. Choose Cursor if you want the best AI-native coding experience and are comfortable working in a single, optimized editor.",
    recommendation: "Many developers use both: Copilot for broad IDE support across projects, Cursor for deep, focused work sessions requiring heavy AI assistance. Cursor is also the better choice for small teams and startups, while Copilot shines in enterprise environments."
  }
}

export default async function GitHubCopilotVsCursorAIPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "GitHub Copilot vs Cursor AI — Complete Comparison 2026",
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
                AI Coding Tools · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              GitHub Copilot vs Cursor AI
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The AI coding assistant giant vs the AI-native editor — which tool will transform your development workflow?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Copilot Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#000000] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="GitHub Copilot Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Copilot</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by GitHub (Microsoft)</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Company</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.valuation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Paying Users</span>
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

              {/* Cursor Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#000000] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Cursor AI Logo" 
                        width={56} 
                        height={56}
                        className="object-contain invert dark:invert-0"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Cursor AI</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Anysphere</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Developers</span>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Copilot</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Cursor</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'copilot' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.copilot === 'boolean' ? (
                      feature.copilot ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.copilot}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'cursor' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.cursor === 'boolean' ? (
                      feature.cursor ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.cursor}</span>}
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

          {/* WORKFLOW COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">When to Use Which</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] dark:text-white mb-3 font-mono">Choose Copilot When</p>
                <ul className="space-y-2">
                  {[
                    "You work across multiple IDEs (VS Code, JetBrains, Neovim)",
                    "Your team needs enterprise compliance and IP indemnification",
                    "You want deep GitHub integration (PRs, Issues, Actions)",
                    "You need a mature, battle-tested AI coding tool",
                    "Your organization already pays for GitHub Enterprise",
                    "You want the widest language and framework support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#000000] dark:text-white shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] dark:text-white mb-3 font-mono">Choose Cursor When</p>
                <ul className="space-y-2">
                  {[
                    "You want the most powerful AI-native coding experience",
                    "Multi-file refactoring is a regular part of your workflow",
                    "You work on complex projects needing full codebase context",
                    "You're comfortable with a single optimized editor (VS Code fork)",
                    "You want AI to understand your entire project, not just open files",
                    "Speed and developer experience matter more than broad IDE support"
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

          {/* DEVELOPER SENTIMENT */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Developer Sentiment (2026)</h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] dark:text-white mb-3 font-mono">Copilot</p>
                <p className="text-4xl font-black text-[#C59A2E] mb-2">4.6/5</p>
                <p className="text-sm text-muted-foreground">Average rating across 10,000+ reviews</p>
                <p className="text-xs text-muted-foreground mt-2 font-serif italic">"Reliable, works everywhere, great for enterprise"</p>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#000000] dark:text-white mb-3 font-mono">Cursor</p>
                <p className="text-4xl font-black text-[#C59A2E] mb-2">4.8/5</p>
                <p className="text-sm text-muted-foreground">Average rating across 5,000+ reviews</p>
                <p className="text-xs text-muted-foreground mt-2 font-serif italic">"Mind-blowing AI, feels like magic, best for power users"</p>
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" },
                { name: "Notion vs Obsidian", slug: "/compare/notion-vs-obsidian" },
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Developer Tool Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">AI coding tool comparisons, developer productivity tips, and tech trends.</p>
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
