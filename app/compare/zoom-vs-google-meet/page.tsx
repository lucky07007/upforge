// app/compare/zoom-vs-google-meet/page.tsx
// SERVER COMPONENT - Zoom vs Google Meet Comparison

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
    ? "https://upforge.org/compare/zoom-vs-google-meet" 
    : "https://www.upforge.in/compare/zoom-vs-google-meet"

  return {
    title: "Zoom vs Google Meet — Which Video Conferencing Tool Wins in 2026? | UpForge",
    description: "Complete comparison of Zoom vs Google Meet. Compare features, pricing, video quality, participant limits, and enterprise capabilities.",
    keywords: ["Zoom vs Google Meet", "best video conferencing 2026", "Zoom vs Meet", "video meeting tools comparison"],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Zoom vs Google Meet — Complete Comparison 2026",
      description: "Side-by-side comparison: features, pricing, video quality, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Zoom",
    company: "Zoom Video Communications",
    logo: "https://www.hatchwise.com/wp-content/uploads/2021/12/Screen-Shot-2021-12-03-at-8.16.08-AM-1024x654.png",
    logoColor: "#0B5CFF",
    description: "Zoom is the world's most popular video conferencing platform, known for its reliability, ease of use, and feature-rich meetings. It's the go-to choice for webinars, large events, and cross-platform collaboration.",
    founded: "2011",
    headquarters: "San Jose, USA",
    valuation: "$20B+",
    users: "300M+ daily meeting participants",
    pricing: "Free (40-min limit) · Pro $14.99/mo · Business $19.99/mo",
    strengths: [
      "Best-in-class video/audio quality",
      "Superior webinar and large event features",
      "Extensive third-party integrations",
      "Breakout rooms and whiteboarding",
      "AI Companion for summaries"
    ],
    weaknesses: [
      "40-minute limit on free plan",
      "Separate app installation required",
      "Higher cost for enterprise features",
      "Past security concerns (now resolved)"
    ],
    bestFor: [
      "Large webinars and virtual events",
      "External client meetings",
      "Training and education sessions",
      "Cross-platform teams"
    ],
    score: 95
  },
  item2: {
    name: "Google Meet",
    company: "Google",
    logo: "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2021/06/How-to-raise-hand-in-Google-meet-lede.png",
    logoColor: "#00AC47",
    description: "Google Meet is Google's enterprise-grade video conferencing solution, deeply integrated with Google Workspace. It offers seamless browser-based meetings with no downloads required.",
    founded: "2017",
    headquarters: "Mountain View, USA",
    valuation: "Part of Alphabet ($2T+)",
    users: "300M+ daily active users",
    pricing: "Free (60-min limit) · Workspace plans from $6/mo",
    strengths: [
      "No download required (browser-based)",
      "Deep Google Workspace integration",
      "Longer free meeting limit (60 mins)",
      "Real-time captions and translations",
      "Strong security and compliance"
    ],
    weaknesses: [
      "Limited webinar features",
      "Fewer third-party integrations",
      "Less customizable interface",
      "Smaller participant gallery view"
    ],
    bestFor: [
      "Google Workspace users",
      "Internal team meetings",
      "Quick ad-hoc calls",
      "Organizations prioritizing security"
    ],
    score: 92
  },
  features: [
    { name: "Free Meeting Duration", zoom: "40 minutes", meet: "60 minutes", winner: "meet" },
    { name: "Max Participants (Free)", zoom: "100", meet: "100", winner: "tie" },
    { name: "Max Participants (Paid)", zoom: "1,000+", meet: "500", winner: "zoom" },
    { name: "Webinar Mode", zoom: "Advanced", meet: "Limited", winner: "zoom" },
    { name: "Breakout Rooms", zoom: true, meet: true, winner: "tie" },
    { name: "AI Meeting Summary", zoom: "AI Companion", meet: "Gemini", winner: "tie" },
    { name: "Whiteboarding", zoom: true, meet: "Via Jamboard", winner: "zoom" },
    { name: "Browser-based (No Download)", zoom: false, meet: true, winner: "meet" },
    { name: "Background Blur/Replace", zoom: true, meet: true, winner: "tie" },
    { name: "Live Captions", zoom: true, meet: "Excellent", winner: "meet" }
  ],
  verdict: {
    winner: "Zoom for events, Meet for Google users",
    summary: "Zoom dominates for webinars, large events, and external meetings with its superior feature set and reliability. Google Meet excels for internal team collaboration, especially within Google Workspace, and offers better value for organizations already paying for Google services. Choose Zoom if you host frequent webinars or need advanced meeting features. Choose Meet if you're deep in Google Workspace and want seamless, browser-based meetings.",
    recommendation: "Many organizations use Zoom for external/client meetings and webinars, while relying on Meet for quick internal team syncs."
  }
}

export default async function ZoomVsGoogleMeetPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Zoom vs Google Meet — Complete Comparison 2026",
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
                Video Conferencing · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Zoom vs Google Meet
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              Which video conferencing platform is right for your team?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Zoom Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#0B5CFF] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Zoom Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Zoom</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Zoom</p>
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

              {/* Google Meet Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#00AC47] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Google Meet Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Google Meet</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Google</p>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Zoom</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Google Meet</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'zoom' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.zoom === 'boolean' ? (
                      feature.zoom ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.zoom}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'meet' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.meet === 'boolean' ? (
                      feature.meet ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.meet}</span>}
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
                { name: "Slack vs Teams", slug: "/compare/slack-vs-teams" },
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
