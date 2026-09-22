// app/compare/stripe-vs-razorpay/page.tsx
// SERVER COMPONENT - Stripe vs Razorpay Comparison

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
    ? "https://upforge.org/compare/stripe-vs-razorpay" 
    : "https://www.upforge.in/compare/stripe-vs-razorpay"

  return {
    title: "Stripe vs Razorpay — Which Payment Gateway Wins in 2026? | UpForge",
    description: "Complete comparison of Stripe vs Razorpay. Compare fees, features, integration ease, supported countries, API quality, and enterprise capabilities. Find which payment platform fits your business.",
    keywords: [
      "Stripe vs Razorpay", "best payment gateway 2026", "Stripe alternative",
      "Razorpay vs Stripe", "payment processing comparison", "online payment platform",
      "Stripe vs Razorpay India", "which payment gateway is better"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Stripe vs Razorpay — Complete Payment Gateway Comparison 2026",
      description: "Side-by-side comparison: fees, features, API quality, global reach, and verdict.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "article"
    },
    robots: { index: true, follow: true }
  }
}

const comparisonData = {
  item1: {
    name: "Stripe",
    company: "Stripe Inc.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmaS9m5yXpqdIrMY5hp83r79TLVM15qGLKyw&s",
    logoColor: "#635BFF",
    description: "Stripe is the global leader in online payment processing, powering millions of businesses across 50+ countries. Known for its developer-first approach, pristine API documentation, and massive ecosystem of integrations. It processes over $1.9 trillion annually and is the default choice for tech-forward companies worldwide.",
    founded: "2010",
    headquarters: "San Francisco, USA & Dublin, Ireland",
    valuation: "$159B",
    users: "5M+ businesses globally",
    pricing: "2.9% + $0.30 per transaction (standard) · Custom enterprise pricing · No setup fees",
    strengths: [
      "Best-in-class developer API and documentation",
      "Available in 50+ countries with 135+ currencies",
      "Massive integration ecosystem (500+ platforms)",
      "Advanced fraud prevention (Stripe Radar)",
      "Revenue optimization tools (Stripe Billing, Tax)"
    ],
    weaknesses: [
      "Limited local payment methods in India (no UPI natively)",
      "Higher effective cost for micro-transactions",
      "Payout time can be slower in new markets (7+ days)",
      "Complex tax compliance for non-US merchants"
    ],
    bestFor: [
      "Global SaaS and subscription businesses",
      "Tech-savvy development teams",
      "Cross-border e-commerce",
      "Enterprise-scale payment operations"
    ],
    score: 96
  },
  item2: {
    name: "Razorpay",
    company: "Razorpay Software Pvt Ltd",
    logo: "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F11690%2F56b0267c-3b72-4e4e-bf6f-cce60348a644.png",
    logoColor: "#02042B",
    description: "Razorpay is India's leading full-stack payment gateway, processing $150B+ annually for 10M+ businesses. Known for deep India-specific features like UPI, Rupay cards, and local payment methods. It's the undisputed champion for businesses targeting the Indian market with comprehensive payment solutions.",
    founded: "2014",
    headquarters: "Bengaluru, India",
    valuation: "$7.5B",
    users: "10M+ businesses in India",
    pricing: "2% per transaction (domestic) · 3% international cards · No setup fees for standard plan",
    strengths: [
      "Best UPI and local payment method support in India",
      "Instant settlements (within minutes to bank accounts)",
      "All-in-one: payments, payroll, banking, lending",
      "Dedicated India-specific compliance and tax tools",
      "Razorpay POS for offline payments"
    ],
    weaknesses: [
      "Primarily India-focused (limited global reach)",
      "API documentation less mature than Stripe",
      "Fewer third-party integrations globally",
      "Some features locked behind higher plans"
    ],
    bestFor: [
      "India-first businesses and startups",
      "UPI-heavy payment flows",
      "Businesses needing instant settlements",
      "Companies wanting all-in-one financial stack"
    ],
    score: 92
  },
  features: [
    { name: "Global Availability", stripe: "50+ countries", razorpay: "India (expanding to SE Asia)", winner: "stripe" },
    { name: "Currencies Supported", stripe: "135+", razorpay: "100+ (primarily INR)", winner: "stripe" },
    { name: "UPI Support", stripe: "Limited", razorpay: "Best-in-class", winner: "razorpay" },
    { name: "API Quality", stripe: "Industry gold standard", razorpay: "Good (improving rapidly)", winner: "stripe" },
    { name: "Settlement Speed", stripe: "2-7 business days", razorpay: "Instant (within minutes)", winner: "razorpay" },
    { name: "Transaction Fees (Domestic)", stripe: "2.9% + $0.30", razorpay: "2% flat", winner: "razorpay" },
    { name: "Developer Experience", stripe: "Excellent", razorpay: "Very good", winner: "stripe" },
    { name: "Fraud Prevention", stripe: "Stripe Radar (AI-powered)", razorpay: "Razorpay Shield", winner: "stripe" },
    { name: "Subscriptions/Recurring", stripe: "Stripe Billing (advanced)", razorpay: "Subscriptions (good)", winner: "stripe" },
    { name: "No-Code Integration", stripe: "Payment Links, Stripe Checkout", razorpay: "Payment Pages, Payment Links", winner: "tie" }
  ],
  verdict: {
    winner: "Stripe for global, Razorpay for India — many businesses use both",
    summary: "Stripe is the undisputed global champion for developer experience, international payments, and enterprise-grade reliability. Razorpay is the clear winner for India-focused businesses, offering unmatched UPI support, instant settlements, and a comprehensive local financial stack. Choose Stripe if you serve international customers and need a developer-friendly global API. Choose Razorpay if your business primarily operates in India and you need deep local payment method support.",
    recommendation: "For businesses serving both India and global markets, the winning strategy is using both: Razorpay for Indian customers (UPI, instant settlements), Stripe for international customers (credit cards, global currencies). They complement each other perfectly in a modern payment stack."
  }
}

export default async function StripeVsRazorpayPage() {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const baseUrl = isOrg ? "https://upforge.org" : "https://www.upforge.in"

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Stripe vs Razorpay — Complete Payment Gateway Comparison 2026",
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
                Payment Gateways · 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Stripe vs Razorpay
            </h1>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
              The global payments giant vs India's fintech champion — which payment gateway fits your business?
            </p>
          </section>

          {/* COMPARISON CARDS */}
          <section className="py-8 border-b border-border">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Stripe Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#635BFF] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item1.logo} 
                        alt="Stripe Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Stripe</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Stripe Inc.</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Businesses</span>
                      <p className="font-medium text-foreground">{comparisonData.item1.users}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Transaction Fee</span>
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

              {/* Razorpay Card */}
              <div className="border-2 border-foreground bg-background">
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#02042B] flex items-center justify-center">
                      <Image 
                        src={comparisonData.item2.logo} 
                        alt="Razorpay Logo" 
                        width={56} 
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Razorpay</h2>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">by Razorpay</p>
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
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Businesses</span>
                      <p className="font-medium text-foreground">{comparisonData.item2.users}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Transaction Fee</span>
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
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Stripe</div>
                <div className="font-mono text-[10px] font-black uppercase tracking-wider text-center">Razorpay</div>
              </div>
              {comparisonData.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className="p-4 font-serif text-sm">{feature.name}</div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'stripe' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.stripe === 'boolean' ? (
                      feature.stripe ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.stripe}</span>}
                  </div>
                  <div className={`p-4 text-center text-sm ${feature.winner === 'razorpay' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    {typeof feature.razorpay === 'boolean' ? (
                      feature.razorpay ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : <span className="font-medium">{feature.razorpay}</span>}
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

          {/* PRICING BREAKDOWN */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">Cost Comparison: Real Numbers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#635BFF] mb-3 font-mono">Stripe Fees (International)</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$10 transaction</span>
                    <span className="font-bold text-foreground">$0.59 fee (2.9% + $0.30)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$100 transaction</span>
                    <span className="font-bold text-foreground">$3.20 fee</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">$1,000 transaction</span>
                    <span className="font-bold text-foreground">$29.30 fee</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">$10,000 monthly (100 x $100)</span>
                    <span className="font-bold text-red-500">$320 total fees</span>
                  </div>
                </div>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#02042B] mb-3 font-mono">Razorpay Fees (India)</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">₹500 UPI transaction</span>
                    <span className="font-bold text-[#14A800]">₹0 fee (UPI free)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">₹5,000 card transaction</span>
                    <span className="font-bold text-foreground">₹100 fee (2%)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">₹50,000 transaction</span>
                    <span className="font-bold text-foreground">₹1,000 fee</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">₹10,00,000 monthly (mostly UPI)</span>
                    <span className="font-bold text-green-600">Significantly lower fees</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* USE CASE MATRIX */}
          <section className="py-8 border-b border-border">
            <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-center mb-6">When to Use Which</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#635BFF] mb-3 font-mono">Choose Stripe When</p>
                <ul className="space-y-2">
                  {[
                    "Selling to international customers in 50+ countries",
                    "Building a SaaS product with complex subscription billing",
                    "Need the best-in-class developer API and documentation",
                    "Processing 135+ currencies with local payment methods",
                    "Requiring advanced fraud protection (Stripe Radar)",
                    "Integrating with global platforms (Shopify, WooCommerce, Salesforce)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#635BFF] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6 bg-background">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#02042B] mb-3 font-mono">Choose Razorpay When</p>
                <ul className="space-y-2">
                  {[
                    "Your primary market is India with UPI-heavy payments",
                    "Want instant settlements in INR (within minutes)",
                    "Need deep local payment methods (UPI, Rupay, Netbanking)",
                    "Looking for all-in-one: payments + payroll + banking",
                    "Want India-specific compliance and GST tools built-in",
                    "Building for Indian consumers and SMBs"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#02042B] shrink-0 mt-0.5" />
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
                { name: "Fiverr vs Upwork", slug: "/compare/fiverr-vs-upwork" },
                { name: "Notion vs Coda", slug: "/compare/notion-vs-coda" },
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
            <h2 className="font-serif text-2xl font-bold mb-3">Get Weekly Fintech Insights</h2>
            <p className="font-serif italic text-muted-foreground mb-6">Payment gateway comparisons, fintech trends, and business finance strategies.</p>
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
