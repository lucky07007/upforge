// components/home-client.tsx
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { 
  Search, 
  Shield, 
  Globe, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Lock,
  Eye,
  Star,
  Menu,
  X,
  ChevronRight
} from "lucide-react"
import type { Founder } from "@/data/founders"

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface Props {
  founders: Founder[]
  isOrg: boolean
  startupCount: number
  verifiedCount: number
}

// ---------------------------------------------------------------------------
// STAT CARD COMPONENT
// ---------------------------------------------------------------------------
function StatCard({ icon: Icon, label, value, suffix = "" }: any) {
  return (
    <div className="group p-6 border border-border bg-card hover:bg-accent/5 transition-all duration-300">
      <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors mb-4" />
      <div className="text-3xl font-bold text-foreground mb-1 tracking-tight">
        {value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
        {label}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// TRUST BANNER
// ---------------------------------------------------------------------------
function TrustBanner({ verifiedCount, startupCount }: { verifiedCount: number; startupCount: number }) {
  return (
    <div className="bg-foreground text-background py-2 px-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-8 text-xs font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3" />
          <span>{verifiedCount.toLocaleString()} Verified Startups</span>
        </div>
        <div className="w-px h-3 bg-background/30" />
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3" />
          <span>Real-time Validation</span>
        </div>
        <div className="w-px h-3 bg-background/30" />
        <div className="flex items-center gap-2">
          <Globe className="w-3 h-3" />
          <span>{startupCount.toLocaleString()}+ Global Registry</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
function HeroSection({ isOrg, startupCount }: { isOrg: boolean; startupCount: number }) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/registry?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full mb-6">
            <Award className="w-3 h-3 text-foreground" />
            <span className="text-xs font-medium tracking-wide">
              Trusted by 5,000+ Global Startups
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            {isOrg ? (
              <>Global Startup<br />Registry</>
            ) : (
              <>India's Most Trusted<br />Startup Directory</>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {isOrg 
              ? "The world's only independent startup verification system. Every company gets a unique UFRN — permanent, verifiable, trusted."
              : "Discover verified Indian startups, track unicorn journeys, and validate company credentials with India's most comprehensive registry."}
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name, founder, or UFRN..."
                className="w-full pl-12 pr-32 py-4 bg-card border border-border rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Blockchain-secured
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Public ledger
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              GDPR compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// STATS GRID
// ---------------------------------------------------------------------------
function StatsGrid({ startupCount, verifiedCount }: { startupCount: number; verifiedCount: number }) {
  return (
    <section className="border-y border-border py-12 bg-card/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
          <StatCard icon={Globe} label="Registered Startups" value={startupCount.toLocaleString()} />
          <StatCard icon={Shield} label="Verified Companies" value={verifiedCount.toLocaleString()} />
          <StatCard icon={Users} label="Active Founders" value="12,847" />
          <StatCard icon={TrendingUp} label="Countries" value="89" />
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FEATURED FOUNDERS
// ---------------------------------------------------------------------------
function FeaturedFounders({ founders }: { founders: Founder[] }) {
  const featured = founders.slice(0, 6)

  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
              Featured Founders
            </h2>
            <p className="text-muted-foreground text-lg">
              Visionaries building the future of India
            </p>
          </div>
          <Link 
            href="/founder-stories" 
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:gap-3 transition-all"
          >
            View all founders
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((founder, idx) => (
            <Link
              key={idx}
              href={`/startup/${founder.slug}`}
              className="group block border border-border bg-card hover:border-foreground transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-block px-2 py-0.5 bg-foreground/90 text-background text-xs font-medium">
                    {founder.category}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:underline">
                  {founder.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {founder.role} · {founder.company}
                </p>
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {founder.deck}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {founder.stats[0]?.v}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {founder.stats[1]?.v || "Private"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// WHY TRUST US SECTION
// ---------------------------------------------------------------------------
function WhyTrustUs() {
  const features = [
    {
      icon: Shield,
      title: "Manual Verification",
      description: "Every startup undergoes a 6-point verification process before receiving a UFRN."
    },
    {
      icon: Lock,
      title: "Blockchain Backup",
      description: "All registry entries are timestamped on the blockchain for immutability."
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Compliant with international data protection and business registry standards."
    },
    {
      icon: Eye,
      title: "Public Audit Trail",
      description: "Complete transparency with publicly accessible verification history."
    }
  ]

  return (
    <section className="bg-accent/30 py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Why Trust UpForge?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built on principles of transparency, verification, and global accessibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 border border-border bg-card">
              <feature.icon className="w-10 h-10 text-foreground mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CTA SECTION
// ---------------------------------------------------------------------------
function CTASection({ isOrg }: { isOrg: boolean }) {
  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="border border-foreground bg-card p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            {isOrg ? "Register Your Startup" : "Claim Your Registry Entry"}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {isOrg 
              ? "Join 5,000+ verified startups. Get your unique UFRN and establish global credibility."
              : "Verify your Indian startup and join an independent business registry in the country."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/submit"
              className="px-8 py-3 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              Get Started → 
            </Link>
            <Link
              href="/verify"
              className="px-8 py-3 border border-foreground text-foreground font-medium hover:bg-accent transition-colors"
            >
              Verify a Company
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
function Footer({ isOrg }: { isOrg: boolean }) {
  const footerLinks = {
    registry: [
      { name: "Browse Registry", href: "/registry" },
      { name: "Verify UFRN", href: "/verify" },
      { name: "Submit Startup", href: "/submit" },
      { name: "Verification Process", href: "/verify/how-it-works" },
    ],
    resources: [
      { name: "Founder Stories", href: "/founders" },
      { name: "Blog", href: "/blog" },
      { name: "API Access", href: "/api" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Trust Center", href: "/trust" },
      { name: "Contact", href: "/contact" },
      { name: "Press", href: "/press" },
    ],
    legal: [
      { name: "Terms", href: "/legal/terms" },
      { name: "Privacy", href: "/legal/privacy" },
      { name: "GDPR", href: "/legal/gdpr" },
      { name: "Security", href: "/legal/security" },
    ],
  }

  return (
    <footer className="border-t border-border bg-card pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Registry</h3>
            <ul className="space-y-2">
              {footerLinks.registry.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 UpForge. All rights reserved. UFRN™ is a registered trademark.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            An independent startup registry built for structured discovery
          </p>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// MAIN CLIENT COMPONENT
// ---------------------------------------------------------------------------
export function HomeClient({ founders, isOrg, startupCount, verifiedCount }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-[600px] bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TrustBanner verifiedCount={verifiedCount} startupCount={startupCount} />
      <HeroSection isOrg={isOrg} startupCount={startupCount} />
      <StatsGrid startupCount={startupCount} verifiedCount={verifiedCount} />
      <FeaturedFounders founders={founders} />
      <WhyTrustUs />
      <CTASection isOrg={isOrg} />
      <Footer isOrg={isOrg} />
    </div>
  )
}
