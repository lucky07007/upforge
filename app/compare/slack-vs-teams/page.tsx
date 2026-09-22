// app/compare/slack-vs-teams/page.tsx
// SERVER COMPONENT - Slack vs Microsoft Teams Comparison

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
  const canonicalUrl = isOrg ? "https://upforge.org/compare/slack-vs-teams" : "https://www.upforge.in/compare/slack-vs-teams"

  return {
    title: "Slack vs Microsoft Teams — Which Team Chat Wins in 2026? | UpForge",
    description: "Complete comparison of Slack vs Microsoft Teams. Compare features, pricing, integrations, video calls, and enterprise capabilities.",
    keywords: ["Slack vs Teams", "best team chat 2026", "Slack vs Microsoft Teams", "team collaboration tools"],
    alternates: { canonical: canonicalUrl },
    openGraph: { title: "Slack vs Teams — Complete Comparison 2026", description: "Side-by-side comparison: features, pricing, integrations, and verdict.", url: canonicalUrl, siteName: "UpForge", type: "article" },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Slack",
    company: "Salesforce",
    logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    logoColor: "#4A154B",
    description: "Slack is the beloved team communication platform known for its intuitive interface, powerful integrations, and strong developer ecosystem. It's where work happens for millions of teams worldwide.",
    founded: "2013",
    headquarters: "San Francisco, USA",
    valuation: "$27.7B (Acquired by Salesforce)",
    users: "40M+ DAU",
    pricing: "Free · Pro $7.25/mo · Business+ $12.50/mo",
    strengths: [
      "Best-in-class user experience",
      "Massive app ecosystem (2,600+ integrations)",
      "Superior search and channel organization",
      "Strong developer community",
      "Excellent huddle and async video features"
    ],
    weaknesses: [
      "Higher cost per user",
      "Limited file storage on free plan",
      "Video calls capped at 50 participants",
      "No deep Office 365 integration"
    ],
    bestFor: ["Tech companies and startups", "Cross-functional teams", "Remote-first organizations", "Teams needing extensive integrations"],
    score: 94
  },
  item2: {
    name: "Microsoft Teams",
    company: "Microsoft",
    logo: "https://download.logo.wine/logo/Microsoft/Microsoft-Logo.wine.png",
    logoColor: "#464EB8",
    description: "Microsoft Teams is the collaboration hub integrated with Office 365, combining chat, video meetings, file storage, and app integration. It's the default choice for Microsoft-centric organizations.",
    founded: "2017",
    headquarters: "Redmond, USA",
    valuation: "Part of Microsoft ($3T+)",
    users: "320M+ MAU",
    pricing: "Free · Essentials $4/mo · Business Basic $6/mo · E3 included",
    strengths: [
      "Deep Office 365/SharePoint integration",
      "Larger video meeting capacity (1,000+ attendees)",
      "Better value for Microsoft enterprise customers",
      "Advanced telephony/PSTN features",
      "Strong compliance and data governance"
    ],
    weaknesses: [
      "Clunky interface and slower performance",
      "Limited third-party integrations",
      "Complex channel and team structure",
      "Notification fatigue"
    ],
    bestFor: ["Microsoft 365 enterprise users", "Large organizations with compliance needs", "Companies needing built-in telephony", "Government and education sectors"],
    score: 90
  },
  features: [
    { name: "Free Plan", slack: "90-day history", teams: "Unlimited chat", winner: "teams" },
    { name: "Video Call Limit", slack: "50 participants", teams: "1,000+ participants", winner: "teams" },
    { name: "Integrations", slack: "2,600+", teams: "700+", winner: "slack" },
    { name: "File Storage (Free)", slack: "5GB total", teams: "5GB/user", winner: "teams" },
    { name: "Search Experience", slack: "Excellent", teams: "Good", winner: "slack" },
    { name: "Office 365 Integration", slack: "Limited", teams: "Native", winner: "teams" },
    { name: "Custom Apps/Workflows", slack: "Excellent", teams: "Good", winner: "slack" },
    { name: "Message Threading", slack: "Excellent", teams: "Good", winner: "slack" }
  ],
  verdict: {
    winner: "Slack for experience, Teams for Microsoft shops",
    summary: "Slack wins on user experience, integrations, and developer ecosystem. Microsoft Teams dominates in enterprise Microsoft environments and large video meetings. Choose Slack if you want the best collaborative experience and rely on diverse third-party tools. Choose Teams if you're deep in the Microsoft ecosystem and need enterprise compliance features.",
    recommendation: "Many organizations use both: Teams for formal meetings and client calls, Slack for internal team collaboration."
  }
}

export default async function SlackVsTeamsPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Slack vs Microsoft Teams — Complete Comparison 2026", "description": comparisonData.verdict.summary, "datePublished": "2026-04-01", "dateModified": "2026-04-23", "author": { "@type": "Organization", "name": "UpForge Editorial", "url": baseUrl } }

  return (
    <>
      <JsonLd data={comparisonSchema} />
      <div className="bg-background min-h-screen text-foreground">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <section className="border-b-2 border-foreground pb-4 pt-6 flex flex-col items-center text-center w-full">
            <div className="flex items-center gap-2 mb-3"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C59A2E] font-mono">Team Collaboration · 2026</span></div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>Slack vs Microsoft Teams</h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">Which team communication platform is right for your organization?</p>
          </section>

          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-foreground bg-background"><div className="p-6 border-b border-border bg-muted/30"><div className="flex items-center gap-4"><div className="w-14 h-14 rounded-lg overflow-hidden bg-[#4A154B] flex items-center justify-center"><Image src={comparisonData.item1.logo} alt="Slack Logo" width={56} height={56} className="object-contain" unoptimized /></div><div><h2 className="font-serif text-2xl font-bold text-foreground">Slack</h2><p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Salesforce</p></div><div className="ml-auto"><span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item1.score}</span><span className="text-xs text-muted-foreground">/100</span></div></div></div><div className="p-6"><p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">{comparisonData.item1.description}</p><div className="grid grid-cols-2 gap-3 mb-6 text-sm"><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Founded</span><p className="font-medium text-foreground">{comparisonData.item1.founded}</p></div><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span><p className="font-medium text-foreground">{comparisonData.item1.valuation}</p></div><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Users</span><p className="font-medium text-foreground">{comparisonData.item1.users}</p></div><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span><p className="font-medium text-foreground">{comparisonData.item1.pricing}</p></div></div><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p><ul className="space-y-1.5">{comparisonData.item1.strengths.map((s, i) => (<li key={i} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span className="text-muted-foreground">{s}</span></li>))}</ul></div><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p><ul className="space-y-1.5">{comparisonData.item1.weaknesses.map((w, i) => (<li key={i} className="flex items-start gap-2 text-sm"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span className="text-muted-foreground">{w}</span></li>))}</ul></div><div><p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p><div className="flex flex-wrap gap-2">{comparisonData.item1.bestFor.map((b, i) => (<span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>))}</div></div></div></div>
              <div className="border-2 border-foreground bg-background"><div className="p-6 border-b border-border bg-muted/30"><div className="flex items-center gap-4"><div className="w-14 h-14 rounded-lg overflow-hidden bg-[#464EB8] flex items-center justify-center"><Image src={comparisonData.item2.logo} alt="Teams Logo" width={56} height={56} className="object-contain" unoptimized /></div><div><h2 className="font-serif text-2xl font-bold text-foreground">Teams</h2><p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Microsoft</p></div><div className="ml-auto"><span className="text-3xl font-black text-[#C59A2E]">{comparisonData.item2.score}</span><span className="text-xs text-muted-foreground">/100</span></div></div></div><div className="p-6"><p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">{comparisonData.item2.description}</p><div className="grid grid-cols-2 gap-3 mb-6 text-sm"><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Founded</span><p className="font-medium text-foreground">{comparisonData.item2.founded}</p></div><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Valuation</span><p className="font-medium text-foreground">{comparisonData.item2.valuation}</p></div><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Users</span><p className="font-medium text-foreground">{comparisonData.item2.users}</p></div><div><span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Pricing</span><p className="font-medium text-foreground">{comparisonData.item2.pricing}</p></div></div><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✓ Strengths</p><ul className="space-y-1.5">{comparisonData.item2.strengths.map((s, i) => (<li key={i} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span className="text-muted-foreground">{s}</span></li>))}</ul></div><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-wider text-foreground mb-2 font-mono">✗ Weaknesses</p><ul className="space-y-1.5">{comparisonData.item2.weaknesses.map((w, i) => (<li key={i} className="flex items-start gap-2 text-sm"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span className="text-muted-foreground">{w}</span></li>))}</ul></div><div><p className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E] mb-2 font-mono">Best For</p><div className="flex flex-wrap gap-2">{comparisonData.item2.bestFor.map((b, i) => (<span key={i} className="text-[10px] bg-muted px-2 py-1 border border-border font-mono">{b}</span>))}</div></div></div></div>
            </div>
          </section>

          <section className="py-8 border-b border-border"><h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Feature Comparison</h3><div className="border border-border"><div className="grid grid-cols-3 bg-muted/50 border-b border-border p-4"><div className="font-mono text-[10px] font-black uppercase tracking-wider text-muted-foreground">Feature</div><div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Slack</div><div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Teams</div></div>{comparisonData.features.map((feature, i) => (<div key={i} className="grid grid-cols-3 border-b border-border last:border-0"><div className="p-4 font-serif text-sm">{feature.name}</div><div className={`p-4 text-center text-sm ${feature.winner === 'slack' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>{typeof feature.slack === 'boolean' ? (feature.slack ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />) : <span className="font-medium">{feature.slack}</span>}</div><div className={`p-4 text-center text-sm ${feature.winner === 'teams' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>{typeof feature.teams === 'boolean' ? (feature.teams ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />) : <span className="font-medium">{feature.teams}</span>}</div></div>))}</div></section>

          <section className="py-8 border-b border-border"><div className="max-w-3xl mx-auto text-center"><Award className="w-10 h-10 text-[#C59A2E] mx-auto mb-4" /><h3 className="font-serif text-2xl font-bold mb-4">Verdict: {comparisonData.verdict.winner}</h3><p className="font-serif italic text-muted-foreground leading-relaxed mb-6">{comparisonData.verdict.summary}</p><div className="bg-muted/30 border border-border p-5 text-left"><p className="text-sm"><span className="font-bold">💡 Recommendation:</span> {comparisonData.verdict.recommendation}</p></div></div></section>

          <section className="py-8"><h3 className="font-sans font-black text-[13px] uppercase tracking-widest mb-6">More Comparisons</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[{ name: "Notion vs Coda", slug: "/compare/notion-vs-coda" },{ name: "Zoom vs Google Meet", slug: "/compare/zoom-vs-google-meet" },{ name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai" }].map((link, i) => (<Link key={i} href={link.slug} className="p-4 border border-border hover:border-foreground transition-all group"><span className="font-serif group-hover:text-[#C59A2E] transition-colors">{link.name}</span><ArrowRight className="w-4 h-4 text-border group-hover:text-[#C59A2E] mt-2 transition-colors" /></Link>))}</div></section>
        </div>
        <section className="bg-muted/30 border-t-2 border-foreground py-12 mt-8"><div className="max-w-[1300px] mx-auto px-4 md:px-8 text-center"><h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Collaboration Insights</h2><p className="font-serif italic text-muted-foreground mb-6">Tool comparisons, team productivity tips, and workplace strategies.</p><div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"><input type="email" placeholder="Your email" className="flex-1 px-4 py-3 bg-background border-2 border-foreground font-serif italic" /><button className="px-6 py-3 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#C59A2E] transition-colors">Subscribe</button></div></div></section>
      </div>
    </>
  )
}
