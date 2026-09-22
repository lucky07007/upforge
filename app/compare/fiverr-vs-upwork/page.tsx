// app/compare/fiverr-vs-upwork/page.tsx
// SERVER COMPONENT - Fiverr vs Upwork Comparison

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
    ? "https://upforge.org/compare/fiverr-vs-upwork" 
    : "https://www.upforge.in/compare/fiverr-vs-upwork"

  return {
    title: "Fiverr vs Upwork — Which Freelance Platform Wins in 2026? | UpForge",
    description: "Complete comparison of Fiverr vs Upwork. Compare fees, pricing models, types of work, client quality, and earning potential. Find which freelance marketplace fits your needs.",
    keywords: [
      "Fiverr vs Upwork", "best freelance platform 2026", "Fiverr alternative",
      "Upwork vs Fiverr", "freelance marketplace comparison", "where to find freelance work",
      "Fiverr vs Upwork fees", "which is better for freelancers"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Fiverr vs Upwork — Complete Freelance Platform Comparison 2026",
      description: "Side-by-side comparison: fees, pricing models, job types, client quality, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Fiverr",
    company: "Fiverr International Ltd.",
    logo: "https://static.vecteezy.com/system/resources/previews/025/732/716/non_2x/fiverr-logo-icon-online-platform-for-freelancers-free-vector.jpg",
    logoColor: "#1DBF73",
    description: "Fiverr is the world's largest marketplace for digital services, with 4M+ active sellers offering 'Gigs' starting at $5. Known for its productized service model, buyers browse fixed-price packages rather than posting jobs. Ideal for quick, defined tasks and creative services.",
    founded: "2010",
    headquarters: "Tel Aviv, Israel",
    valuation: "$1.2B (NYSE: FVRR)",
    users: "4M+ active freelancers, 50M+ total transactions",
    pricing: "Seller fee: 20% commission · Buyer fee: 5.5% service fee ($2 minimum)",
    strengths: [
      "Quick, fixed-price gigs (no negotiation needed)",
      "Productized service model saves time",
      "Strong for creative and digital services",
      "Buyers can purchase instantly without proposals",
      "Fiverr Pro for vetted premium freelancers"
    ],
    weaknesses: [
      "High 20% commission on seller earnings",
      "Less suited for complex, long-term projects",
      "Race-to-bottom pricing in saturated categories",
      "Limited client-freelancer relationship building"
    ],
    bestFor: [
      "Quick, defined tasks (logo design, voiceovers)",
      "Creative and digital marketing services",
      "New freelancers building portfolios",
      "Buyers wanting instant purchases"
    ],
    score: 88
  },
  item2: {
    name: "Upwork",
    company: "Upwork Inc.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8APT9zxMvgE_8-xTG4zsgPkX_O7q_-kgoTQ&s",
    logoColor: "#14A800",
    description: "Upwork is the largest freelance talent marketplace by revenue, connecting businesses with independent professionals for hourly or fixed-price projects. Known for its proposal-based system and diverse project types, it's the go-to platform for professional services and long-term engagements.",
    founded: "2015 (Elance-oDesk merger, roots from 1999)",
    headquarters: "San Francisco, USA",
    valuation: "$1.8B (NASDAQ: UPWK)",
    users: "18M+ registered freelancers, 5M+ registered clients",
    pricing: "Seller fee: 10% sliding scale · Buyer fee: 3% payment processing",
    strengths: [
      "Wide range of professional services (tech, legal, consulting)",
      "Hourly and fixed-price project flexibility",
      "Long-term client relationships possible",
      "Time tracker and escrow payment protection",
      "Lower fees for high-earning freelancers (5% after $10K)"
    ],
    weaknesses: [
      "Proposal bidding can be time-consuming",
      "Connects system limits free applications (connects cost money)",
      "High competition for entry-level jobs",
      "Complex fee structure for new users"
    ],
    bestFor: [
      "Complex, long-term professional projects",
      "Software development and technical work",
      "Business consulting and expert services",
      "Freelancers seeking stable, ongoing contracts"
    ],
    score: 91
  },
  features: [
    { name: "Fee Structure", fiverr: "20% flat on all earnings", upwork: "10% (sliding to 5%)", winner: "upwork" },
    { name: "Pricing Model", fiverr: "Fixed-price gigs (seller sets)", upwork: "Hourly & fixed-price", winner: "upwork" },
    { name: "Job Acquisition", fiverr: "Buyers find you (passive)", upwork: "Proposals & bids (active)", winner: "tie" },
    { name: "Payment Protection", fiverr: "Funds held in escrow", upwork: "Hourly protection + escrow", winner: "upwork" },
    { name: "Project Complexity", fiverr: "Simple to medium", upwork: "Simple to enterprise", winner: "upwork" },
    { name: "Client Quality", fiverr: "Mixed (Pro verified)", upwork: "Generally higher budgets", winner: "upwork" },
    { name: "Long-term Work", fiverr: "Limited", upwork: "Excellent", winner: "upwork" },
    { name: "Ease of Starting", fiverr: "Very easy (list a gig)", upwork: "Moderate (proposals)", winner: "fiverr" },
    { name: "Skill Categories", fiverr: "500+ categories", upwork: "90+ categories", winner: "fiverr" },
    { name: "Mobile Experience", fiverr: "Excellent", upwork: "Good", winner: "fiverr" }
  ],
  verdict: {
    winner: "Upwork for professionals, Fiverr for quick gigs",
    summary: "Upwork is the better platform for professional freelancers seeking long-term, high-value client relationships with lower fees on large earnings. Fiverr excels for quick, productized services where speed and simplicity matter most. Choose Upwork if you offer professional services (development, consulting, writing) and want to build ongoing client relationships. Choose Fiverr if you sell defined creative or digital services at fixed prices and want a passive income stream.",
    recommendation: "Serious freelance professionals should focus on Upwork for higher-quality clients and better long-term earning potential. Fiverr works best as a secondary platform for packaged services, or for freelancers in creative fields who want to sell quickly without writing proposals."
  }
}

export default async function FiverrVsUpworkPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Fiverr vs Upwork — Complete Comparison 2026",
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
                Freelance Platforms · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Fiverr vs Upwork
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              Which freelance marketplace should you use to find work or hire talent?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Fiverr Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#1DBF73] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Fiverr Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Fiverr</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Fiverr</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Freelancers</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.users}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Seller Fee</span>
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

              {/* Upwork Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#14A800] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Upwork Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Upwork</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Upwork</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Freelancers</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.users}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Seller Fee</span>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Fiverr</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Upwork</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'fiverr' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.fiverr === 'boolean' ? (
                      feature.fiverr ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.fiverr}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'upwork' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.upwork === 'boolean' ? (
                      feature.upwork ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.upwork}</span>}
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

          {/* EARNING COMPARISON */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Earning Potential: Real Numbers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#1DBF73] mb-3 font-mono">Fiverr Earnings Breakdown</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$100 gig sale</span>
                    <span className="font-bold text-foreground">$80 to you (20% fee)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$500 gig sale</span>
                    <span className="font-bold text-foreground">$400 to you</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$1,000 gig sale</span>
                    <span className="font-bold text-foreground">$800 to you</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">$10,000 total earnings</span>
                    <span className="font-bold text-red-500">-$2,000 in fees</span>
                  </div>
                </div>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#14A800] mb-3 font-mono">Upwork Earnings Breakdown</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">First $500 with a client</span>
                    <span className="font-bold text-foreground">20% fee</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$500.01–$10,000</span>
                    <span className="font-bold text-foreground">10% fee</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Over $10,000</span>
                    <span className="font-bold text-[#14A800]">5% fee only</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">$10,000 with one client</span>
                    <span className="font-bold text-green-600">Only $500–$1,000 in fees</span>
                  </div>
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
                { name: "Slack vs Teams", slug: "/compare/slack-vs-teams" }
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Freelance Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Platform comparisons, earning tips, and freelance economy trends.</p>
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
