// app/about/page.tsx — UpForge About & Verification Methodology
import { fetchAllStartups } from "@/lib/google-sheets"
import { SITE_STATS } from "@/lib/site-stats"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"
import {
  ShieldCheck, Award, FileText, CheckCircle2, Globe, ArrowRight,
  Sparkles, Building2, Users, AlertCircle, HelpCircle, Mail, MapPin, Scale, XCircle
} from "lucide-react"

import { Reveal } from "@/components/about/reveal"
import { CountUpStat } from "@/components/about/count-up-stat"

export const revalidate = 600

export const metadata: Metadata = {
  title: "About UpForge — Global Startup Registry & Verification Standard",
  description: "UpForge is the independent global startup registry. Standardized company records, UFRN verification credentials, and ecosystem intelligence.",
  alternates: { canonical: "https://upforge.org/about" },
  openGraph: {
    title: "About UpForge — Global Startup Registry & Verification Standard",
    description: "The trust index for verified startups and founders worldwide. Independent, standardized, permanent.",
    url: "https://upforge.org/about",
    siteName: "UpForge",
    images: [{ url: "https://upforge.org/og/registry.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const FAQ_ITEMS = [
  { q: "What is UpForge?", a: "UpForge is an independent global startup registry that provides structured, permanent public records for verified companies and founders." },
  { q: "What is a UFRN?", a: "A UFRN (UpForge Registry Number) is a unique digital credential issued to verified entities to confirm their record in our independent index." },
  { q: "Does UFRN replace legal incorporation?", a: "No. UFRN is an independent registry credential issued by UpForge for digital identity and registry verification. It is not a legal business incorporation certificate or government tax registration." },
  { q: "How does UpForge verify entities?", a: "Through entity registration checks against national/state databases, domain and SSL validation, founder identity verification via professional records, and public digital footprint review." },
  { q: "Are rankings or verification statuses for sale?", a: "No. UpForge operates with strict editorial independence: no paid rankings, no pay-to-play profile positions, and no sponsored placements." }
]

export default async function AboutPage() {
  let totalStartups = 0
  let totalCountries = 0
  let totalSectors = 0

  try {
    const startups = await fetchAllStartups()
    const approved = startups.filter(s => s.status === "approved")
    totalStartups = approved.length || 0

    const countries = new Set(approved.map(s => s.country_code).filter(Boolean))
    totalCountries = countries.size || 30

    const sectors = new Set(approved.map(s => s.category).filter(Boolean))
    totalSectors = sectors.size || 25
  } catch (err) {
    console.error("[About Page] Error fetching live metrics:", err)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://upforge.org/#organization",
        name: "UpForge",
        url: "https://upforge.org",
        logo: "https://upforge.org/logo.png",
        description: "Independent global startup registry and verified founder database.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@upforge.org",
          contactType: "customer service"
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.org" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://upforge.org/about" }
        ]
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Navbar />

      <div className="bg-background text-foreground min-h-screen font-serif overflow-x-hidden selection:bg-[#C59A2E]/20">
        
        {/* 1. HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10 pb-10 text-center flex flex-col items-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                INSTITUTIONAL STARTUP REGISTRY
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-[56px] font-bold leading-[1.06] mb-4 max-w-4xl mx-auto tracking-tight text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Independent Global Registry for Verified Startups
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-serif italic mb-8">
              UpForge provides standardized, permanent public records for emerging ventures worldwide — establishing trust, legibility, and identity without sponsored bias or algorithmic distortion.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 text-background hover:text-black py-3.5 px-8 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs font-mono transition-all shadow-sm"
              >
                Get Listed Free <ArrowRight size={14} />
              </Link>
              <Link
                href="/partner-program"
                className="inline-flex items-center gap-2 border border-border/80 hover:border-amber-500/60 bg-card hover:bg-muted py-3.5 px-8 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs font-mono transition-all shadow-xs"
              >
                Partner Program
              </Link>
            </div>
          </div>
        </section>

        <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 space-y-14">

          {/* 2. WHAT UPFORGE IS / IS NOT */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">01 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Positioning & Definition</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 border border-border/80 rounded-3xl p-6 md:p-8 bg-card/90 dark:bg-card/70 backdrop-blur-xl shadow-md">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-foreground">What UpForge Is</h3>
                <ul className="space-y-3 font-serif text-sm text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <span><strong>An Independent Registry:</strong> A standardized repository of corporate identity, founding timeline, and verified sector taxonomy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <span><strong>A Digital Credential Issuer:</strong> Issuing audit-ready UpForge Registry Numbers (UFRN) to qualified startup entities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <span><strong>An Ecosystem Intelligence Layer:</strong> Providing transparent data for analysts, venture capital researchers, and partners.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-border/60 pt-6 md:pt-0 md:pl-8 space-y-4">
                <h3 className="font-serif text-2xl font-bold text-foreground">What UpForge Is Not</h3>
                <ul className="space-y-3 font-serif text-sm text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span><strong>Not a Pay-to-Rank Directory:</strong> We do not sell featured placement, search rank boosts, or arbitrary leaderboard scores.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span><strong>Not a Government Authority:</strong> UFRN is a registry credential, not an official government incorporation or tax registration.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span><strong>Not an Investment Brokerage:</strong> We do not broker securities, promise funding rounds, or execute financial transactions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* 3. HOW WE VERIFY & LEGAL DISCLAIMER */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">02 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Verification Methodology</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { num: "01", title: "Registration Cross-Check", desc: "Verifying MCA / state incorporation filings and business registration records." },
                  { num: "02", title: "Domain & Web Security", desc: "Validating SSL certificates, operational domain ownership, and active web footprint." },
                  { num: "03", title: "Founder Professional Records", desc: "Cross-referencing founder profiles on LinkedIn and public professional repositories." },
                  { num: "04", title: "Funding & Public Signals", desc: "Verifying press coverage, institutional disclosures, and verified customer signals." }
                ].map((m, i) => (
                  <div key={i} className="p-6 border border-border/80 rounded-2xl bg-card/90 dark:bg-card/70 hover:border-amber-500/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <span className="font-mono text-xs text-amber-500 font-bold block mb-2">{m.num}</span>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-2 text-foreground">{m.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-serif">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Legal Disclaimer Box */}
              <div className="p-6 border-l-4 border-amber-500 bg-amber-500/5 border-t border-r border-b border-border/70 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-4 h-4 text-amber-500" />
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-foreground">Official Regulatory & Legal Disclaimer</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-serif">
                  UFRN is an independent registry credential issued by UpForge.org for digital identity and registry verification. It is not a legal business incorporation certificate, government tax identifier, or official regulatory registration, and does not replace statutory business incorporation documents.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 4. BY THE NUMBERS (DYNAMIC DUAL-SOURCE STATS) */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">03 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Registry Scale & Metrics</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-border/80 rounded-3xl p-8 bg-card/90 shadow-md text-center">
              <div>
                <span className="font-mono text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                  {totalStartups > 0 ? totalStartups.toLocaleString() : "1,200+"}
                </span>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mt-2">Verified Companies</p>
              </div>
              <div>
                <span className="font-mono text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                  {totalCountries > 0 ? totalCountries : "35"}
                </span>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mt-2">Global Markets</p>
              </div>
              <div>
                <span className="font-mono text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                  {totalSectors > 0 ? totalSectors : "28"}
                </span>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mt-2">Industry Sectors</p>
              </div>
              <div>
                <span className="font-mono text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">100%</span>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mt-2">Independent Index</p>
              </div>
            </div>
          </Reveal>

          {/* 5. EDITORIAL & REVIEW STANDARDS */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">04 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Editorial Governance</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="p-8 border border-border/80 rounded-3xl bg-card/90 space-y-4 shadow-md">
              <h3 className="text-xl font-bold font-serif text-foreground">Independence & Non-Interference Policy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-serif">
                UpForge maintains a strict wall between data verification and commercial partnerships. We never accept financial compensation to alter a company's verification record, boost search visibility, or modify registry criteria.
              </p>
              <div className="pt-2">
                <Link href="/editorial-standards" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:underline">
                  Read Complete Editorial & Corrections Policy <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* 6. TEAM & WHO IS BEHIND UPFORGE */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">05 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Leadership & Vetting Team</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border/80 rounded-2xl bg-card/90 shadow-sm">
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-foreground mb-2">Founding Board & Editorial Lead</h4>
                <p className="text-xs text-muted-foreground font-serif leading-relaxed mb-4">
                  Led by experienced startup researchers and product engineers committed to institutional data integrity across global ecosystems.
                </p>
                <div className="text-[11px] font-mono text-muted-foreground">
                  Contact: <a href="mailto:contact@upforge.org" className="text-amber-600 dark:text-amber-400 hover:underline">contact@upforge.org</a>
                </div>
              </div>

              <div className="p-6 border border-border/80 rounded-2xl bg-card/90 shadow-sm">
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-foreground mb-2">Research & Review Panel</h4>
                <p className="text-xs text-muted-foreground font-serif leading-relaxed mb-4">
                  Our analyst team evaluates incoming submissions against official MCA, corporate registry, and public dataset sources within 3-5 business days.
                </p>
                <div className="text-[11px] font-mono text-muted-foreground">
                  Verification desk: <span className="text-foreground font-semibold">desk@upforge.org</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 7. CONTACT & LEGAL TRANSPARENCY */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">06 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Legal & Operational Transparency</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="grid sm:grid-cols-3 gap-6 p-8 border border-border/80 rounded-3xl bg-muted/40 shadow-sm">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block mb-1">Operating Entity</span>
                <p className="text-sm font-bold font-serif text-foreground">UpForge Global Registry</p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block mb-1">Jurisdiction</span>
                <p className="text-sm font-bold font-serif text-foreground">India & International Operations</p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block mb-1">Primary Inquiry Email</span>
                <a href="mailto:contact@upforge.org" className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400 hover:underline">
                  contact@upforge.org
                </a>
              </div>
            </div>
          </Reveal>

          {/* 8. FAQ ACCORDION */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 font-mono text-xs font-bold">07 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Frequently Asked Questions</h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="group border border-border/80 rounded-2xl p-5 bg-card cursor-pointer shadow-xs hover:border-amber-500/50 transition-colors">
                  <summary className="font-mono font-bold text-xs uppercase tracking-wider flex justify-between items-center text-foreground">
                    <span>{item.q}</span>
                    <span className="text-amber-500 group-open:rotate-180 transition-transform font-mono text-sm">↓</span>
                  </summary>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed font-serif pt-2 border-t border-border/40">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>

          {/* 9. CLOSING CTA */}
          <section className="text-center p-8 md:p-12 border border-border/80 rounded-3xl bg-gradient-to-r from-amber-500/10 via-card to-card shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3 text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
              Build Your Verified Public Record Today
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto mb-6 font-serif">
              Join thousands of founders and companies establishing standardized digital credibility on UpForge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/submit"
                className="px-8 py-3.5 bg-foreground hover:bg-amber-500 text-background hover:text-black rounded-2xl font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-sm"
              >
                Submit Your Startup Free
              </Link>
              <Link
                href="/partner-program"
                className="px-8 py-3.5 border border-border/80 hover:border-amber-500/60 bg-card rounded-2xl font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xs"
              >
                Apply for Partner Program
              </Link>
            </div>
          </section>

        </main>
      </div>
    </>
  )
}

