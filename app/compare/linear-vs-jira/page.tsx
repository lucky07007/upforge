// app/compare/linear-vs-jira/page.tsx
// SERVER COMPONENT - Linear vs Jira Comparison

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
    ? "https://upforge.org/compare/linear-vs-jira" 
    : "https://www.upforge.in/compare/linear-vs-jira"

  return {
    title: "Linear vs Jira — Which Project Management Tool Wins in 2026? | UpForge",
    description: "Complete comparison of Linear vs Jira. Compare speed, UX, agile features, integrations, pricing, team collaboration, and developer experience. Find which project management tool fits your team.",
    keywords: [
      "Linear vs Jira", "best project management tool 2026", "Jira alternative",
      "Linear vs Jira comparison", "agile project management comparison",
      "Linear vs Jira for developers", "which is better Linear or Jira",
      "Jira alternative for startups", "project management tools 2026",
      "Linear vs Jira pricing", "developer project management"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Linear vs Jira — Complete Project Management Tool Comparison 2026",
      description: "Side-by-side comparison: speed, UX, agile features, integrations, pricing, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Linear",
    company: "Linear Orbit Inc.",
    logo: "https://www.svgrepo.com/show/333141/linear.svg",
    description: "Linear is the modern, speed-obsessed issue tracking and project management tool built specifically for software teams. Founded in 2019 by ex-Uber and Coinbase engineers, Linear reimagines project management with keyboard-first design, sub-50ms interactions, and an opinionated workflow that eliminates the bloat and complexity of traditional tools. It's become the darling of high-velocity engineering teams who value speed, clarity, and beautiful design.",
    founded: "2019",
    headquarters: "San Francisco, California, USA",
    valuation: "$1.4B (2024 Series C)",
    users: "Used by Vercel, Render, Railway, Clerk, and 50,000+ teams",
    pricing: "Free · Basic $8/user/mo · Business $14/user/mo · Enterprise",
    strengths: [
      "Blazing fast — keyboard-first, sub-50ms interactions",
      "Beautiful, minimalist UI — no clutter or cognitive overload",
      "Opinionated workflows eliminate decision fatigue",
      "Real-time sync across all views and team members",
      "Built-in roadmaps, cycles (sprints), and project planning"
    ],
    weaknesses: [
      "Limited customization vs enterprise-grade Jira setups",
      "Smaller integration ecosystem (200+ vs Jira's 5,000+)",
      "No built-in time tracking or resource management",
      "Less suitable for non-engineering teams (marketing, HR)",
      "Newer product — fewer enterprise compliance certifications"
    ],
    bestFor: [
      "High-velocity engineering and product teams",
      "Startups and scale-ups wanting speed over complexity",
      "Teams that value beautiful, intuitive UX",
      "Companies seeking a streamlined agile workflow"
    ],
    score: 90
  },
  item2: {
    name: "Jira",
    company: "Atlassian Corporation",
    logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    description: "Jira is the enterprise-standard project management and issue tracking platform, trusted by 300,000+ organizations worldwide. With 20+ years of development, Jira offers unmatched flexibility, customization, and integration depth — from Scrum and Kanban boards to advanced roadmaps, automation rules, and 5,000+ marketplace apps. While often criticized for complexity, Jira remains the default choice for large enterprises and regulated industries requiring granular control.",
    founded: "2002",
    headquarters: "Sydney, Australia (Global: San Francisco, Amsterdam)",
    valuation: "Atlassian: $65B+ market cap (NASDAQ: TEAM)",
    users: "300,000+ organizations, 20M+ monthly active users",
    pricing: "Free (up to 10 users) · Standard $8.15/user/mo · Premium $16/user/mo · Enterprise",
    strengths: [
      "Extreme customizability — workflows, fields, screens, permissions",
      "Massive marketplace: 5,000+ integrations and add-ons",
      "Enterprise-grade: SOC 2, GDPR, HIPAA, FedRAMP compliance",
      "Advanced roadmaps (Portfolio) for cross-team planning",
      "Powerful automation engine (Jira Automation, ex-Code Barrel)"
    ],
    weaknesses: [
      "Slow, bloated UI — cognitive overload from excessive options",
      "Steep learning curve — new users take weeks to become productive",
      "Complex administration requires dedicated Jira admins",
      "Slow performance with large instances and complex workflows",
      "Expensive at scale with add-on costs compounding"
    ],
    bestFor: [
      "Large enterprises with 500+ employees",
      "Organizations requiring complex, customizable workflows",
      "Teams needing deep compliance and audit trails",
      "Cross-functional coordination across 10+ teams"
    ],
    score: 86
  },
  features: [
    { name: "Speed & Performance", linear: "Instant — sub-50ms interactions", jira: "Often slow — 2-5s page loads common", winner: "linear" },
    { name: "User Interface & UX", linear: "Beautiful, minimalist, intuitive", jira: "Complex, cluttered, steep learning curve", winner: "linear" },
    { name: "Customization", linear: "Opinionated — limited but purposeful", jira: "Extreme — workflows, fields, screens, permissions", winner: "jira" },
    { name: "Agile Boards", linear: "Kanban, Cycles (Sprints), Roadmaps", jira: "Scrum, Kanban, Advanced Roadmaps, SAFe", winner: "jira" },
    { name: "Automation", linear: "Basic — SLAs, auto-assign, templates", jira: "Advanced — 100+ triggers, conditions, actions", winner: "jira" },
    { name: "Integrations", linear: "200+ (GitHub, Slack, Figma, Sentry, Discord)", jira: "5,000+ marketplace apps, deep ecosystem", winner: "jira" },
    { name: "Developer Experience", linear: "Keyboard-first, CLI, GitHub auto-sync", jira: "Feature-rich but mouse-heavy, web-focused", winner: "linear" },
    { name: "Reporting & Analytics", linear: "Cycle insights, velocity, burndown", jira: "50+ reports, dashboards, advanced analytics", winner: "jira" },
    { name: "Non-Engineering Use", linear: "Limited — designed for software teams", jira: "Jira Work Management for business teams", winner: "jira" },
    { name: "Setup & Onboarding", linear: "Minutes — intuitive, no training needed", jira: "Days/weeks — requires admin configuration", winner: "linear" },
    { name: "Enterprise Compliance", linear: "SOC 2, SSO, growing", jira: "SOC 2, GDPR, HIPAA, FedRAMP, ISO 27001", winner: "jira" },
    { name: "Pricing Value", linear: "Affordable — $8-14/user/mo, generous free", jira: "Can get expensive — add-ons compound costs", winner: "linear" }
  ],
  verdict: {
    winner: "Linear for speed & developer teams, Jira for enterprises & complexity",
    summary: "Linear has redefined project management for software teams with its breathtaking speed, beautiful design, and opinionated workflow that eliminates the noise of traditional tools. For engineering teams that value productivity and clarity, Linear is a revelation — it's why 50,000+ teams including Vercel, Render, and Railway have switched. Jira remains the enterprise powerhouse with unmatched customization, 5,000+ integrations, and compliance certifications that make it the only choice for Fortune 500 companies and regulated industries. In 2026, Linear is winning the hearts of developers and startups, while Jira maintains its grip on enterprise organizations. The best choice depends on your scale: Linear for velocity and joy, Jira for complexity and compliance.",
    recommendation: "Choose Linear if your team values speed, beautiful UX, and streamlined workflows — you'll be productive in minutes and your developers will thank you. It's perfect for startups, scale-ups, and engineering teams under 500 people. Choose Jira if you're a large enterprise needing extreme customization, complex cross-team workflows, regulatory compliance (HIPAA, FedRAMP), or have non-engineering teams that also need project management tools — Jira's flexibility is unmatched, even if it comes at the cost of speed and simplicity."
  }
}

export default async function LinearVsJiraPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Linear vs Jira — Complete Project Management Tool Comparison 2026",
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
                Project Management · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Linear vs Jira
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The speed-obsessed modern challenger vs the enterprise titan — which tool should track your team's work?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Linear Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Linear Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Linear</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Linear Orbit Inc.</p>
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

              {/* Jira Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Jira Logo" 
                        width={48} 
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Jira</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Atlassian Corporation</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Linear</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Jira</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'linear' ? 'bg-indigo-50 dark:bg-indigo-950/20' : ''}`}>
                    {typeof feature.linear === 'boolean' ? (
                      feature.linear ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.linear}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'jira' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                    {typeof feature.jira === 'boolean' ? (
                      feature.jira ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.jira}</span>}
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
                <p className="text-[10px] font-black uppercase tracking-wider text-[#5E6AD2] mb-3 font-mono">Choose Linear When</p>
                <ul className="space-y-2">
                  {[
                    "Your team is primarily software engineers and product designers",
                    "Speed and UX matter more than extreme customization",
                    "You want a tool that's enjoyable to use daily",
                    "Startup or scale-up with 5-500 employees",
                    "You value opinionated workflows over infinite configuration",
                    "Keyboard-first productivity and GitHub sync are priorities"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#5E6AD2] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0052CC] mb-3 font-mono">Choose Jira When</p>
                <ul className="space-y-2">
                  {[
                    "Enterprise organization with 500+ employees across multiple teams",
                    "You need extreme workflow customization and granular permissions",
                    "Regulatory compliance (HIPAA, FedRAMP, SOC 2) is mandatory",
                    "Cross-functional coordination with non-engineering departments",
                    "Advanced reporting and portfolio-level roadmaps are required",
                    "5,000+ integrations ecosystem is critical to your toolchain"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* MIGRATION CONSIDERATIONS */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Migrating from Jira to Linear?</h3>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="border border-border p-5 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-green-600 mb-3 font-mono">What Transfers Well</p>
                <ul className="space-y-2">
                  {[
                    "Issues, epics, and project hierarchies",
                    "Sprint/cycle cadence and velocity tracking",
                    "GitHub/GitLab branch and PR linking",
                    "Team assignments and workflow states",
                    "Labels, priorities, and due dates"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-5 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-red-500 mb-3 font-mono">What You'll Lose</p>
                <ul className="space-y-2">
                  {[
                    "Complex custom workflows and transitions",
                    "Advanced JQL queries and custom dashboards",
                    "Time tracking and resource management",
                    "Marketplace add-ons (Tempo, ScriptRunner, etc.)",
                    "Deep permissions and issue security schemes"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* DEVELOPER SENTIMENT */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Developer Sentiment (Stack Overflow 2025)</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Most Loved</p>
                <p className="text-3xl font-black text-[#5E6AD2] font-serif">Linear</p>
                <p className="text-xs text-muted-foreground mt-1">#1 in developer satisfaction surveys</p>
              </div>
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Most Used</p>
                <p className="text-3xl font-black text-[#0052CC] font-serif">Jira</p>
                <p className="text-xs text-muted-foreground mt-1">300,000+ organizations worldwide</p>
              </div>
              <div className="border border-border p-5 text-center bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2 font-mono">Fastest Growing</p>
                <p className="text-3xl font-black text-[#5E6AD2] font-serif">Linear</p>
                <p className="text-xs text-muted-foreground mt-1">250% team growth YoY in 2025</p>
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-8">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Vercel vs Netlify", slug: "/compare/vercel-vs-netlify" },
                { name: "Docker vs Podman", slug: "/compare/docker-vs-podman" },
                { name: "Supabase vs Firebase", slug: "/compare/supabase-vs-firebase" }
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
            <p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, team productivity strategies, and software development best practices.</p>
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
