"use client"

import React, { useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import type { DomainContext } from "@/lib/domain"
import { getStartupUrl } from "@/lib/domain"
import { TrustScoreBadge } from "@/components/trust-score-badge"
import { ProvenanceList } from "@/components/provenance-list"
import { HistoryTimeline } from "@/components/history-timeline"
import { GooglePreferredSourceBadge } from "@/components/seo/google-preferred-source"
import { StartupKnowledgePanel } from "@/components/startup-knowledge-panel"
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Globe,
  MapPin,
  Calendar,
  Building2,
  Tag,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from "lucide-react"

type RelatedStartup = Pick<
  Startup,
  "name" | "slug" | "description" | "logo_url" | "category" | "website"
>

interface StartupDetailProps {
  startup: Startup
  relatedStartups: RelatedStartup[]
  profileUrl: string
  domain?: DomainContext
}

function getCleanUrl(url?: string | null): string | null {
  if (!url) return null
  const formatted = /^https?:\/\//i.test(url.trim()) ? url.trim() : "https://" + url.trim()
  try {
    new URL(formatted)
    return formatted
  } catch {
    return null
  }
}

function getCategorySlug(category?: string | null): string | null {
  if (!category) return null
  return category
    .toLowerCase()
    .replace(/[/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function getCitySlug(city?: string | null): string | null {
  if (!city) return null
  return city.toLowerCase().replace(/\s+/g, "-")
}

function getVerificationCode(name: string, id: string): string {
  const prefix = name.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase()
  const suffix = id.replace(/-/g, "").slice(-5).toUpperCase()
  return "UPF-" + prefix + "-" + suffix
}

function convertGoogleDriveUrl(url: string | null | undefined): string | null {
  if (!url || !url.trim()) return null
  const raw = url.trim()
  if (!raw.includes("drive.google.com") && !raw.includes("docs.google.com")) return raw

  let fileId = ""
  const fileMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) fileId = fileMatch[1]

  if (!fileId) {
    const idMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch) fileId = idMatch[1]
  }

  if (!fileId) return raw
  return `https://lh3.googleusercontent.com/d/${fileId}=w400`
}

function getFaviconFallback(website?: string | null, stage = 0): string | null {
  if (!website) return null
  try {
    const hostname = new URL(website.startsWith("http") ? website : `https://${website}`).hostname
    if (stage === 0) return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`
    if (stage === 1) return `https://icons.duckduckgo.com/ip3/${hostname}.ico`
    return null
  } catch {
    return null
  }
}

export function StartupLogo({ name, logo_url, website, size, className = "" }: { name: string; logo_url?: string | null; website?: string | null; size?: number; className?: string }) {
  const [stage, setStage] = useState(0)
  
  const convertedLogo = convertGoogleDriveUrl(logo_url)
  const sources = [
    convertedLogo,
    getFaviconFallback(website, 0),
    getFaviconFallback(website, 1),
  ].filter(Boolean) as string[]

  const currentSrc = sources[stage]

  if (currentSrc) {
    const handleError = () => {
      if (stage < sources.length - 1) {
        setStage(stage + 1)
      } else {
        setStage(99)
      }
    }

    // Tiny generated initials avatars do not need an image optimizer.
    if (currentSrc.startsWith("data:")) {
      return (
        <img
          src={currentSrc}
          alt={`${name} logo`}
          className={`h-full w-full object-contain ${className}`}
          loading="lazy"
          onError={handleError}
        />
      )
    }

    return (
      <div className="relative h-full w-full">
        <Image
          src={currentSrc}
          alt={`${name} logo`}
          fill
          sizes={`${size ?? 112}px`}
          className={`object-contain ${className}`}
          loading="lazy"
          onError={handleError}
        />
      </div>
    )
  }

  const initials = (name || "UF")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/20 via-background to-amber-500/10 border border-amber-500/30 rounded-xl shadow-inner">
      <span className="text-xl font-mono font-black tracking-wider text-amber-600 dark:text-amber-400">
        {initials}
      </span>
    </div>
  )
}

function RelatedStartupCard({ startup }: { startup: RelatedStartup }) {
  const href = getStartupUrl(startup.slug || "")
  return (
    <Link href={href} className="group flex items-start gap-4 p-4 border border-border hover:bg-muted/30 transition-colors">
      <div className="h-14 w-14 flex items-center justify-center flex-shrink-0 bg-muted border border-border">
        <StartupLogo name={startup.name} logo_url={startup.logo_url} website={startup.website} size={56} className="p-0.5" />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h4 className="font-serif font-bold text-foreground text-sm group-hover:text-amber-500 transition-colors truncate">{startup.name}</h4>
        {startup.category && <p className="font-sans font-bold text-[9px] uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-1">{startup.category}</p>}
        {startup.description && <p className="font-serif text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{startup.description}</p>}
      </div>
    </Link>
  )
}

interface BlogLink {
  title: string
  slug: string
  description: string
}

function getRelatedBlogs(category?: string | null): BlogLink[] {
  const normalized = (category || "").toLowerCase()
  
  const allBlogs: Record<string, BlogLink[]> = {
    ai: [
      {
        title: "Proprietary Data Moats: Why VCs Reject Wrapper AI Startups",
        slug: "investors-rejecting-generic-ai-pitches-2026",
        description: "An in-depth analysis of why VCs are rejecting generic AI wrapper pitches and demanding proprietary data architectures."
      },
      {
        title: "From Seed to Acquisition: AI Exit Routes in India's 2026 Ecosystem",
        slug: "ai-startup-funding-exit-route-india-2026",
        description: "Exploring M&A and secondary exit routes for Indian artificial intelligence startups raising early-stage capital."
      },
      {
        title: "Top AI Startups in India Leading the Machine Learning Wave",
        slug: "top-ai-startups-india-2026",
        description: "Profiles of the most promising artificial intelligence and machine learning teams building in India."
      }
    ],
    fintech: [
      {
        title: "Fintech Innovation in India: Key Trends & Rising Challengers",
        slug: "fintech-startups-india-2026",
        description: "Analyzing the regulatory changes, credit expansion, and rising merchant-focused fintech platforms in 2026."
      },
      {
        title: "Startup Valuation Benchmarks: How Valuations are Calculated",
        slug: "startup-valuation-india-2026",
        description: "Understanding DCF and market multiple valuation frameworks used by top-tier Indian angel networks."
      }
    ],
    saas: [
      {
        title: "Proprietary Data Moats: Why VCs Reject Wrapper AI Startups",
        slug: "investors-rejecting-generic-ai-pitches-2026",
        description: "An in-depth analysis of why VCs are rejecting generic AI wrapper pitches and demanding proprietary data architectures."
      },
      {
        title: "Bootstrapped to Success: Inspiring Indian Bootstrapped Startups",
        slug: "bootstrapped-startups-india-success-stories",
        description: "How Indian SaaS and D2C startups reached profitability without raising external institutional funding."
      }
    ],
    deeptech: [
      {
        title: "Government Contracts and Privatization: Space & Defence Tech in H1 2026",
        slug: "defense-tech-startups-india-2026",
        description: "How defense-tech and space-tech startups are securing non-dilutive government contracts and capital."
      },
      {
        title: "From Seed to Acquisition: AI Exit Routes in India's 2026 Ecosystem",
        slug: "ai-startup-funding-exit-route-india-2026",
        description: "Exploring M&A and secondary exit routes for Indian artificial intelligence startups raising early-stage capital."
      }
    ],
    compliance: [
      {
        title: "The Founder's Guide to UFRN Credentials and Startup Vetting",
        slug: "startup-verification-ufrn-credentials-guide",
        description: "Learn how the UpForge Registry Number system works, how to get verified, and how it accelerates investor relations."
      },
      {
        title: "Startup Legal & Compliance Guide: Essential Filings for Indian Founders",
        slug: "startup-legal-guide-india-2026",
        description: "A comprehensive guide on ROC, MCA, and DPIIT compliance filings required for operating startups in India."
      }
    ]
  }

  const defaultBlogs: BlogLink[] = [
    {
      title: "The Founder's Guide to UFRN Credentials and Startup Vetting",
      slug: "startup-verification-ufrn-credentials-guide",
      description: "Learn how the UpForge Registry Number system works, how to get verified, and how it accelerates investor relations."
    },
    {
      title: "Decentralized Growth: How Tier-2 & Tier-3 Cities are Powering Startups",
      slug: "tier-2-tier-3-indian-cities-producing-startups-2026",
      description: "A deep dive into why non-metropolitan hubs are generating over half of all new startup registrations in India."
    },
    {
      title: "Navigating the VC Winter: How to Secure Startup Funding in 2026",
      slug: "how-to-get-startup-funding-india-2026",
      description: "Strategies for founders pitching Seed and Series A rounds in an era of intensive due diligence."
    }
  ]

  if (normalized.includes("artificial") || normalized.includes("ai") || normalized.includes("machine")) {
    return allBlogs.ai
  }
  if (normalized.includes("fintech") || normalized.includes("finance") || normalized.includes("insurance") || normalized.includes("payment")) {
    return allBlogs.fintech
  }
  if (normalized.includes("saas") || normalized.includes("software") || normalized.includes("enterprise")) {
    return allBlogs.saas
  }
  if (normalized.includes("deep") || normalized.includes("space") || normalized.includes("defense") || normalized.includes("hardware") || normalized.includes("tech")) {
    return allBlogs.deeptech
  }
  if (normalized.includes("legal") || normalized.includes("regulatory") || normalized.includes("compliance") || normalized.includes("verification")) {
    return allBlogs.compliance
  }
  return defaultBlogs
}

export function StartupDetail({ startup, relatedStartups }: StartupDetailProps) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const websiteUrl = getCleanUrl(startup.website)
  const categorySlug = getCategorySlug(startup.category)
  const citySlug = getCitySlug(startup.city)
  const verificationCode = startup.ufrn ?? getVerificationCode(startup.name, startup.id)
  const isPending = false

  const handleDownload = useCallback(async function () {
    if (!posterRef.current || isGenerating) return
    setIsGenerating(true)
    try {
      const [{ toBlob }, { saveAs }] = await Promise.all([import("html-to-image"), import("file-saver")])
      const blob = await toBlob(posterRef.current, { cacheBust: true, backgroundColor: "#ffffff", pixelRatio: 3 })
      if (!blob) throw new Error("toBlob returned null")
      saveAs(blob, startup.name + "-UpForge-Record.png")
    } catch (err) {
      console.error("[StartupDetail] Poster generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }, [isGenerating, startup.name])

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hidden Poster element for downloads */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, pointerEvents: "none" }}>
        <div ref={posterRef} style={{ width: 1080, height: 1350, backgroundColor: "#ffffff", padding: 80, display: "flex", flexDirection: "column", color: "#000000", fontFamily: "'Georgia', serif", position: 'relative', border: '20px solid #f8f8f8' }}>
          <div style={{ borderBottom: "3px solid #000000", paddingBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "sans-serif" }}>
            <span style={{ fontSize: 28, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>UPFORGE <span style={{ color: "#ca8a04" }}>REGISTRY</span></span>
            <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", display: 'block' }}>UpForge Registry Record</span>
                <span style={{ fontSize: 10, fontWeight: 500, color: "#999" }}>Ref: {verificationCode}</span>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "60px 0 40px" }}>
            <p style={{ fontSize: 14, fontFamily: "sans-serif", color: "#ca8a04", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20, fontWeight: 800 }}>Verified Registry Listing</p>
            <h1 style={{ fontSize: 72, fontWeight: 800, marginBottom: 15, lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>{startup.name}</h1>
            <div style={{ width: 60, height: 4, backgroundColor: '#000', margin: '20px auto 40px' }}></div>
            
            {startup.description && (
                <p style={{ fontSize: 18, lineHeight: 1.6, color: '#333', marginBottom: 40, padding: '0 40px', fontStyle: 'italic' }}>
                    "{startup.description.length > 280 ? startup.description.substring(0, 280) + '...' : startup.description}"
                </p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', background: '#fcfcfc', padding: '30px', border: '1px solid #eee' }}>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#ca8a04', marginBottom: 5, fontFamily: 'sans-serif' }}>Founders</p>
                    <p style={{ fontSize: 18, fontWeight: 700 }}>{formatFounders(startup.founders) || "Not Disclosed"}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#ca8a04', marginBottom: 5, fontFamily: 'sans-serif' }}>Incorporation Year</p>
                    <p style={{ fontSize: 18, fontWeight: 700 }}>{startup.founded_year || "N/A"}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#ca8a04', marginBottom: 5, fontFamily: 'sans-serif' }}>Primary Sector</p>
                    <p style={{ fontSize: 18, fontWeight: 700 }}>{startup.category || "General Technology"}</p>
                </div>
                <div>
                    <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#ca8a04', marginBottom: 5, fontFamily: 'sans-serif' }}>Verification ID</p>
                    <p style={{ fontSize: 18, fontWeight: 700, fontFamily: 'monospace' }}>{startup.ufrn || "PENDING"}</p>
                </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: "2px solid #000000", paddingTop: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "sans-serif", textTransform: "uppercase", lineHeight: 1.8 }}>
              <span style={{ color: "#ca8a04", display: 'block' }}>UpForge Registry Record</span>
              <span style={{ color: '#000' }}>upforge.org/startup/{startup.slug}</span>
            </div>
            
            <div style={{ position: 'relative' }}>
                <img 
                    src="/seal.jpg" 
                    alt="Official Seal" 
                    style={{ width: 140, height: 140, objectFit: 'contain', opacity: 0.9 }} 
                />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-6">
        <main className="py-4 md:py-8">
          {/* Header Hero Block */}
          <div className="relative glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-2xl shadow-xl overflow-hidden mb-10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-primary/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-card/90 border border-accent-gold/30 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden shadow-lg p-2 group">
                  <StartupLogo name={startup.name} logo_url={startup.logo_url} website={startup.website} size={112} className="rounded-xl object-contain" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <TrustScoreBadge verification={startup.verification} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold">
                      {isPending ? "Review Pending" : "Verified Registry Ledger"}
                    </span>
                    {startup.ufrn && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted border border-border text-foreground">
                        {startup.ufrn}
                      </span>
                    )}
                    <GooglePreferredSourceBadge
                      variant="pill"
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted border border-border text-foreground hover:border-blue-400/50 hover:text-blue-500 transition-colors"
                    />
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]" style={{ fontFamily: "'Georgia', serif" }}>
                    {startup.name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs font-medium text-muted-foreground">
                    {startup.category && (
                      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-accent-gold">
                        <Tag className="h-3.5 w-3.5" />
                        {categorySlug ? (
                          <Link href={"/registry?sector=" + encodeURIComponent(startup.category)} className="hover:underline">
                            {startup.category}
                          </Link>
                        ) : (
                          <span>{startup.category}</span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-accent-secondary" />
                      {startup.city ? (
                        <Link href={"/registry?country=" + encodeURIComponent(startup.country_code || "")} className="hover:underline">
                          {startup.city + ", " + (startup.country_name ?? "Global")}
                        </Link>
                      ) : (
                        <span>{startup.country_name ?? "Global"}</span>
                      )}
                    </div>
                    {startup.founded_year && (
                      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Est. {startup.founded_year}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent-gold text-black hover:bg-amber-400 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 cursor-pointer flex-shrink-0"
                >
                  Visit Official Site <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-5 border-b border-border pb-2">
                  <h2 className="font-sans font-black text-[11px] uppercase tracking-widest text-foreground">
                    Executive Summary
                  </h2>
                </div>
                <p className="text-lg md:text-xl font-serif text-foreground/90 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:font-serif first-letter:text-foreground first-letter:mr-2 first-letter:float-left">
                  {startup.name} is listed in the UpForge Global Startup Registry
                  {startup.category ? ` under ${startup.category}` : ""}.
                  {startup.founded_year ? ` Founded in ${startup.founded_year}.` : ""}
                  {(startup.city || startup.country_name) ? ` Based in ${[startup.city, startup.country_name].filter(Boolean).join(", ")}.` : ""}
                  {formatFounders(startup.founders) ? ` Founders: ${formatFounders(startup.founders)}.` : ""}
                </p>
              </section>

              {/* Registry CTA */}
              <div className="w-full border-l-4 border-amber-500 bg-muted/20 my-8 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-r-3xl">
                <div className="flex-1">
                  <p className="font-sans font-black text-[9px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-1">Global Registry</p>
                  <p className="font-serif font-bold text-[15px] sm:text-[17px] text-foreground leading-snug">
                    Is your startup listed in the global registry?
                  </p>
                  <p className="font-serif text-sm text-muted-foreground mt-1">
                    Get your UFRN credential and trust score audit. 100% Free basic listing.
                  </p>
                </div>
                <Link
                  href="/submit"
                  className="shrink-0 font-sans font-black text-[9px] uppercase tracking-[0.15em] bg-amber-500 text-black px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors whitespace-nowrap"
                >
                  List Your Startup →
                </Link>
              </div>

              <StartupKnowledgePanel startup={startup} />

              {startup.description && (
                <section>
                  <div className="flex items-center gap-3 mb-5 border-b border-border pb-2">
                    <h2 className="font-sans font-black text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400">
                      Corporate Overview
                    </h2>
                  </div>
                  <p className="text-base md:text-[17px] font-serif text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {startup.description}
                  </p>
                </section>
              )}

              {/* Provenance Audit Records */}
              <ProvenanceList provenance={startup.provenance} />

              {/* Lifecycle History */}
              <HistoryTimeline history={startup.history} />

              <section className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-border">
                <div>
                  <h3 className="font-sans font-black text-[9px] uppercase tracking-widest text-muted-foreground mb-4">Market Data</h3>
                  <ul className="space-y-3 font-serif text-[15px] text-foreground/90">
                    <li className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Sector</span>
                      <span className="font-bold">{startup.category || "Unlisted"}</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Base</span>
                      <span className="font-bold text-right">{[startup.city, startup.country_name].filter(Boolean).join(", ") || "Global"}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-sans font-black text-[9px] uppercase tracking-widest text-muted-foreground mb-4">Corporate Struct</h3>
                  <ul className="space-y-3 font-serif text-[15px] text-foreground/90">
                    <li className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Established</span>
                      <span className="font-bold">{startup.founded_year || "Unknown"}</span>
                    </li>
                    {formatFounders(startup.founders) && (
                      <li className="flex items-center justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground flex items-center gap-2"><Building2 className="w-3.5 h-3.5" /> Executive(s)</span>
                        <span className="font-bold text-right line-clamp-1 truncate ml-2 max-w-[150px]">{formatFounders(startup.founders)}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </section>

              {relatedStartups && relatedStartups.length > 0 && (
                <section className="pt-8 border-t border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-amber-500 text-[8px]">✦</span>
                    <h2 className="font-sans font-black text-[11px] uppercase tracking-widest text-foreground">
                      Related Registry Listings
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedStartups.map((s, i) => (
                      <RelatedStartupCard key={i} startup={s} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="lg:col-span-4">
              <aside className="sticky top-32 space-y-6">
                <div className="border border-border/80 bg-card rounded-3xl p-6 flex flex-col items-center shadow-sm">
                  <div className="text-center w-full mb-6 pb-6 border-b border-border/80">
                    <h3 className="font-sans font-bold text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Registry Record</h3>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <TrustScoreBadge verification={startup.verification} />
                    </div>
                  </div>

                  <div className="w-full mb-6 border-b border-border/80 pb-6">
                    <p className="font-sans font-bold text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-3 text-center">Global Registry Number</p>
                    <div id="ufrn" className="bg-muted/40 border border-border/80 rounded-2xl p-4 text-center">
                      <p className="font-mono font-bold text-lg text-amber-600 dark:text-amber-400 break-all">
                        {startup.ufrn || verificationCode}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mb-6 border-b border-border/80 pb-6 text-center">
                    <p className="font-sans font-bold text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Registry Source</p>
                    <p className="text-xs font-serif text-foreground/80">UpForge Global Database</p>
                    {startup.verification?.last_verified && (
                      <p className="mt-1 text-[10px] font-mono text-muted-foreground">Registry date: {startup.verification.last_verified}</p>
                    )}
                  </div>

                  {websiteUrl && (
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-amber-500 text-black hover:bg-amber-400 font-sans font-black text-[10px] uppercase tracking-[0.15em] text-center rounded-2xl transition-colors">
                      Visit Official Site
                    </a>
                  )}
                </div>

                <Link
                  href={`/compare?slugs=${startup.slug}`}
                  className="block w-full text-center py-3 border border-border hover:border-amber-500 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  + Compare {startup.name}
                </Link>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
