// components/ufrn-detail.tsx
// ─────────────────────────────────────────────────────────────────────────────
// UFRNDetailView — the dedicated "Digital Proof of Existence" page view.
// Displayed at /ufrn/[UFRN-ID]. Feels like an official government certificate
// crossed with a Bloomberg terminal entry.
//
// Key sections:
//   1. UFRN Hero — the ID itself, large, authoritative
//   2. Verification Certificate block — seal, timestamp, registry authority
//   3. Company Data — mirrors startup-detail but UFRN is the hero, not the logo
//   4. Embed Code — the "Verified by UpForge" badge for startup websites
//   5. Backlink anchor — exact alt-text for the trust badge SEO loop
// ─────────────────────────────────────────────────────────────────────────────

"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import {
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Globe,
  MapPin,
  Calendar,
  Tag,
  Building2,
  ArrowUpRight,
} from "lucide-react"

interface Props {
  startup: Startup
  canonicalUrl: string
}

// ── COPY BUTTON ──────────────────────────────────────────────────────────────
function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-all"
      title="Copy to clipboard"
    >
      {copied ? (
        <><Check className="h-3 w-3 text-green-600" /><span className="text-green-600">Copied!</span></>
      ) : (
        <><Copy className="h-3 w-3" /><span>{label ?? "Copy"}</span></>
      )}
    </button>
  )
}

// ── UFRN CERTIFICATE SEAL ─────────────────────────────────────────────────────
function CertificateSeal({ ufrn }: { ufrn: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer ring */}
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 128 128" className="absolute inset-0 w-full h-full">
          <circle cx="64" cy="64" r="60" fill="none" stroke="#A89060" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="64" cy="64" r="52" fill="none" stroke="#A89060" strokeWidth="0.5" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <ShieldCheck className="h-6 w-6 text-[#A89060]" />
          <span
            className="text-[7px] uppercase tracking-[0.18em] text-[#888] font-bold"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            UpForge
          </span>
          <span
            className="text-[6px] uppercase tracking-[0.1em] text-[#aaa]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Global Registry
          </span>
          <span
            className="text-[8px] font-bold text-[#A89060] font-mono mt-0.5 text-center px-2 leading-tight break-all"
          >
            {ufrn}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── EMBED CODE GENERATOR ──────────────────────────────────────────────────────
// The exact badge HTML that creates the SEO backlink loop described in the
// Gemini blueprint. Alt text format is strict: "UFRN: [ID] - Verified Startup Profile."
function getEmbedCode(startup: Startup, canonicalUrl: string): string {
  return `<!-- UpForge Verified Badge — Do not modify alt text (SEO anchor) -->
<a href="${canonicalUrl}" 
   target="_blank" 
   rel="noopener noreferrer"
   title="${startup.ufrn} — Verified on UpForge Global Registry">
  <img 
    src="https://upforge.org/badges/verified.png" 
    alt="UFRN: ${startup.ufrn} - Verified Startup Profile"
    width="160" 
    height="40"
    loading="lazy"
  />
</a>`
}

// ── DATA ROW ─────────────────────────────────────────────────────────────────
function DataRow({ icon: Icon, label, value, href }: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-2 w-32 flex-shrink-0">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400"
          style={{ fontFamily: "system-ui, sans-serif" }}>
          {label}
        </span>
      </div>
      {href ? (
        <Link href={href} className="text-sm text-slate-700 hover:text-slate-900 hover:underline transition-colors flex-1">
          {value}
        </Link>
      ) : (
        <span className="text-sm text-slate-700 flex-1">{value}</span>
      )}
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function UFRNDetailView({ startup, canonicalUrl }: Props) {
  const ufrn = startup.ufrn!
  const embedCode = getEmbedCode(startup, canonicalUrl)
  const profileUrl = `https://upforge.org/startup/${startup.slug}`

  const categorySlug = startup.category
    ? startup.category
        .toLowerCase()
        .replace(/[/\\]/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    : null

  return (
    <div className="min-h-screen bg-[#FAFAF9]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── BACK NAV ── */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/startup"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Startup Registry</span>
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A89060] font-bold"
            style={{ fontFamily: "system-ui, sans-serif" }}>
            UFRN Lookup
          </span>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="border-b bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 h-10 flex items-center">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-slate-500" style={{ fontFamily: "system-ui, sans-serif" }}>
              <li><Link href="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
              <li className="text-slate-300">/</li>
              <li><Link href="/startup" className="hover:text-slate-900 transition-colors">Registry</Link></li>
              <li className="text-slate-300">/</li>
              <li><span className="text-slate-400">UFRN</span></li>
              <li className="text-slate-300">/</li>
              <li className="text-slate-900 font-mono font-medium">{ufrn}</li>
            </ol>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* ── UFRN HERO BLOCK ── */}
        <div className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden">
          {/* Gold header bar */}
          <div className="h-1 bg-gradient-to-r from-[#A89060] via-[#E8C547] to-[#A89060]" />

          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">

              {/* Certificate seal */}
              <CertificateSeal ufrn={ufrn} />

              {/* UFRN text block */}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#A89060] font-bold mb-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}>
                    UpForge Registry Number · Digital Proof of Existence
                  </p>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1C1C] font-mono">
                    {ufrn}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider"
                      style={{ fontFamily: "system-ui, sans-serif" }}>
                      Verified · Active
                    </span>
                  </div>
                  <span className="text-xs text-slate-400" style={{ fontFamily: "system-ui, sans-serif" }}>
                    UpForge Global Registry
                  </span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed max-w-lg"
                  style={{ fontFamily: "system-ui, sans-serif" }}>
                  This number is the permanent, globally unique identifier for{" "}
                  <strong className="text-slate-900">{startup.name}</strong> in the
                  UpForge Registry. It functions as a Digital Proof of Existence — analogous
                  to an ISBN for books or an ISSN for publications.
                </p>

                <div className="flex flex-wrap items-center gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                  <CopyButton text={ufrn} label="Copy UFRN" />
                  <Link
                    href={profileUrl}
                    className="inline-flex items-center gap-1.5 text-xs text-[#A89060] hover:underline transition-colors"
                  >
                    View full profile
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Startup logo */}
              <div className="h-20 w-20 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                {startup.logo_url ? (
                  <Image
                    src={startup.logo_url}
                    alt={startup.name + " logo"}
                    width={80}
                    height={80}
                    className="object-contain p-3"
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-400">
                    {startup.name.charAt(0)}
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT — Company data */}
          <div className="lg:col-span-2 space-y-6">

            {/* Company Overview */}
            <div className="bg-white border border-slate-100 rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                Registry Record
              </h2>

              <div className="flex items-start gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-1">{startup.name}</h3>
                  {startup.description && (
                    <p className="text-sm text-slate-500 leading-relaxed"
                      style={{ fontFamily: "system-ui, sans-serif" }}>
                      {startup.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-0">
                {startup.category && (
                  <DataRow
                    icon={Tag}
                    label="Sector"
                    value={startup.category}
                    href={categorySlug ? `/startups/${categorySlug}` : undefined}
                  />
                )}
                {startup.city && (
                  <DataRow
                    icon={MapPin}
                    label="Location"
                    value={`${startup.city}, ${startup.country_name ?? "India"}`}
                  />
                )}
                {startup.founded_year && (
                  <DataRow
                    icon={Calendar}
                    label="Founded"
                    value={`${startup.founded_year}`}
                  />
                )}
                {formatFounders(startup.founders) && (
                  <DataRow
                    icon={Building2}
                    label="Founders"
                    value={formatFounders(startup.founders)}
                  />
                )}
                {startup.website && (
                  <div className="flex items-start gap-4 py-3">
                    <div className="flex items-center gap-2 w-32 flex-shrink-0">
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                        style={{ fontFamily: "system-ui, sans-serif" }}>
                        Website
                      </span>
                    </div>
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-sm text-[#A89060] hover:underline inline-flex items-center gap-1"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {startup.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* UFRN Structure Explainer */}
            <div className="bg-white border border-slate-100 rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                How to Read This UFRN
              </h2>
              <UFRNBreakdown ufrn={ufrn} />
            </div>

            {/* Embed Code */}
            <div className="bg-white border border-slate-100 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                    style={{ fontFamily: "system-ui, sans-serif" }}>
                    Verified by UpForge · Badge Embed
                  </h2>
                  <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Add this to your website footer to display your UFRN verification badge.
                  </p>
                </div>
                <CopyButton text={embedCode} label="Copy Code" />
              </div>

              {/* Badge preview */}
              <div className="mb-4 p-4 bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white border border-[#A89060]/30 rounded px-4 py-2">
                  <ShieldCheck className="h-4 w-4 text-[#A89060]" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#888]"
                      style={{ fontFamily: "system-ui, sans-serif" }}>
                      Verified by UpForge
                    </p>
                    <p className="text-[8px] font-mono text-[#A89060]">{ufrn}</p>
                  </div>
                </div>
              </div>

              {/* Code block */}
              <pre className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-[10px] font-mono text-slate-600 overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
                {embedCode}
              </pre>

              <p className="text-[10px] text-slate-400 mt-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                The <code className="font-mono text-[#A89060]">alt</code> attribute is
                intentional and must not be changed — it carries the exact anchor text
                used by UpForge's global indexing system.
              </p>
            </div>

          </div>

          {/* RIGHT — Verification sidebar */}
          <div className="space-y-4">

            {/* Quick lookup */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                Registry Links
              </p>

              <Link
                href={profileUrl}
                className="flex items-center justify-between group py-2 border-b border-slate-50"
              >
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}>
                  Full Startup Profile
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </Link>

              {categorySlug && startup.category && (
                <Link
                  href={`/startups/${categorySlug}`}
                  className="flex items-center justify-between group py-2 border-b border-slate-50"
                >
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors"
                    style={{ fontFamily: "system-ui, sans-serif" }}>
                    {startup.category} Startups
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                </Link>
              )}

              <Link
                href="/startup"
                className="flex items-center justify-between group py-2"
              >
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}>
                  Browse All Startups
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </Link>
            </div>

            {/* UFRN system info */}
            <div className="bg-[#FAFAF7] border border-[#E8E4DC] rounded-xl p-5 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A89060]"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                About UFRN
              </p>
              <p className="text-xs text-slate-500 leading-relaxed"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                The UpForge Registry Number is a permanent, globally unique identifier
                assigned on approval. It cannot be transferred or reassigned.
              </p>
              <div className="space-y-1.5 text-[11px] text-slate-400"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                <p>Format: <span className="font-mono text-[#A89060]">UFRN-YYYY-CC-NNNNN</span></p>
                <p>YYYY = Registration year</p>
                <p>CC = Country code (ISO 3166-1)</p>
                <p>NNNNN = Sequential registry number</p>
              </div>
            </div>

            {/* Data license */}
            <div className="border border-slate-100 rounded-xl p-5 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                Data License
              </p>
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A89060] hover:underline"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                CC BY 4.0 — Creative Commons Attribution
              </a>
              <p className="text-[10px] text-slate-400 leading-relaxed"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                This registry record may be cited, reproduced, or incorporated into
                research with attribution to UpForge.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

// ── UFRN BREAKDOWN ────────────────────────────────────────────────────────────
function UFRNBreakdown({ ufrn }: { ufrn: string }) {
  // Parse: UFRN-2026-IND-00001
  const parts = ufrn.split("-")
  const segments = [
    { value: parts[0] ?? "UFRN", label: "Registry Prefix", description: "UpForge Registry Number" },
    { value: parts[1] ?? "—",   label: "Year",            description: "Year of registration" },
    { value: parts[2] ?? "—",   label: "Country Code",    description: "ISO 3166-1 country code" },
    { value: parts[3] ?? "—",   label: "Serial Number",   description: "Unique sequential ID" },
  ]

  return (
    <div className="space-y-3" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Visual breakdown */}
      <div className="flex items-center gap-0 font-mono text-lg font-bold overflow-x-auto pb-1">
        {segments.map((seg, i) => (
          <React.Fragment key={i}>
            <span className={`px-2 py-1 rounded text-sm ${
              i === 0 ? "bg-[#1C1C1C] text-white" :
              i === 1 ? "bg-[#A89060]/10 text-[#A89060]" :
              i === 2 ? "bg-slate-100 text-slate-600" :
              "bg-[#E8C547]/10 text-[#A89060]"
            }`}>
              {seg.value}
            </span>
            {i < segments.length - 1 && (
              <span className="text-slate-300 px-0.5">-</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Segment explanations */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {segments.map((seg, i) => (
          <div key={i} className="p-2.5 bg-slate-50 rounded-lg">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">{seg.label}</p>
            <p className="text-xs font-mono font-bold text-slate-700">{seg.value}</p>
            <p className="text-[9px] text-slate-400 mt-0.5">{seg.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

