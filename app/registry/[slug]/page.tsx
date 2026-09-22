// app/registry/[slug]/page.tsx
//
// THE GLOBAL REGISTRY PAGE — served on upforge.org
// ─────────────────────────────────────────────────
// Ultra-fast, data-only, Wikipedia-style profile.
// No animations, no marketing. Pure structured authority.
// Canonical for all startup profiles — Google's master record.
// ─────────────────────────────────────────────────

import { fetchAllStartups } from "@/lib/google-sheets"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import Link from "next/link"
import Image from "next/image"
import { GooglePreferredSourceBadge } from "@/components/seo/google-preferred-source"

interface PageProps {
  params: Promise<{ slug: string }>
}

// ---------------------------------------------------------------------------
// DATA FETCHER
// ---------------------------------------------------------------------------
async function getStartup(slug: string): Promise<Startup | null> {
  const startups = await fetchAllStartups()
  const found = startups.find((s) => s.slug === slug && s.status === "approved")
  return found ? (found as Startup) : null
}

export async function generateStaticParams() {
  const startups = await fetchAllStartups()
  return startups
    .filter((row) => row.status === "approved" && row.slug)
    .map((row) => ({ slug: row.slug }))
}

export const revalidate = 86400

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const startup = await getStartup(slug)
  if (!startup) {
    return {
      title: "Not Found | UpForge Registry",
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `https://upforge.org/startup/${slug}`
  const ufrnTag = startup.ufrn ? ` [${startup.ufrn}]` : ""
  const title = `${startup.name}${ufrnTag} — Global Startup Registry | UpForge`

  return {
    title,
    description:
      startup.description ??
      `Official registry entry for ${startup.name}. Verified and indexed by UpForge Global Startup Registry.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      url: canonicalUrl,
      images: [{ url: "https://upforge.org/og/startup-default.png", width: 1200, height: 630 }],
    },
  }
}

// ---------------------------------------------------------------------------
// PAGE — clean, data-dense, newspaper-formal
// ---------------------------------------------------------------------------
export default async function RegistryPage({ params }: PageProps) {
  const { slug } = await params
  const startup = await getStartup(slug)
  if (!startup) notFound()

  const registryDate = startup.created_at
    ? new Date(startup.created_at).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "—"

  const sameAs = [startup.linkedin_url, startup.twitter_url, startup.instagram_url, startup.website]
    .filter((u): u is string => !!u)

  return (
    <div className="min-h-screen bg-[#FAFAF8]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── REGISTRY HEADER ── */}
      <header className="border-b-2 border-[#1C1C1C] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="https://upforge.org/registry" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#1C1C1C]">
              UP<span className="text-[#A89060]">FORGE</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#888] hidden sm:block ml-1">
              Global Registry
            </span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-[#AAA]">
            upforge.org
          </span>
        </div>
      </header>

      {/* ── BREADCRUMB + MOBILE NAV (FIXED: mobile nav BELOW breadcrumb) ── */}
      <div className="border-b border-[#E0DDD6] bg-[#F7F5F0]">
        <div className="max-w-4xl mx-auto px-6 py-2">
          {/* Breadcrumb - always on top */}
          <nav className="text-[11px] text-[#888] flex gap-2">
            <Link href="https://upforge.org" className="hover:text-[#1C1C1C]">UpForge</Link>
            <span>/</span>
            <Link href="https://upforge.org/registry" className="hover:text-[#1C1C1C]">Registry</Link>
            <span>/</span>
            <span className="text-[#1C1C1C]">{startup.name}</span>
          </nav>
          
          {/* Mobile: Back to Index + Export BELOW breadcrumb */}
          <div className="flex gap-4 mt-2 sm:hidden text-[11px]">
            <Link href="https://upforge.org/registry" className="text-[#1C1C1C] hover:text-[#A89060]">
              ← Back to Global Index
            </Link>
            <span className="text-[#CCC]">|</span>
            <button className="text-[#1C1C1C] hover:text-[#A89060]">
              Export Official Record
            </button>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: Action bar ABOVE hamburger on desktop ── */}
      <div className="hidden sm:block border-b border-[#E0DDD6] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-2 flex justify-between items-center">
          <Link href="https://upforge.org/registry" className="text-[11px] text-[#1C1C1C] hover:text-[#A89060]">
            ← Back to Global Index
          </Link>
          <button className="text-[11px] text-[#1C1C1C] hover:text-[#A89060]">
            Export Official Record
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN — primary content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Name + logo */}
            <div className="flex items-start gap-5">
              {startup.logo_url && (
                <div className="w-16 h-16 border border-[#E0DDD6] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={startup.logo_url}
                    alt={startup.name + " logo"}
                    width={64}
                    height={64}
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-[#1C1C1C] leading-tight">
                  {startup.name}
                </h1>
                {startup.category && (
                  <p className="text-[13px] text-[#888] mt-1 uppercase tracking-widest">
                    {startup.category}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            {startup.description && (
              <p className="text-[15px] text-[#333] leading-relaxed border-l-2 border-[#A89060] pl-4">
                {startup.description}
              </p>
            )}

            {/* Founders */}
            {formatFounders(startup.founders) && (
              <section>
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#888] mb-2">Founders</h2>
                <p className="text-[14px] text-[#333]">{formatFounders(startup.founders)}</p>
              </section>
            )}

            {/* External Links */}
            {sameAs.length > 0 && (
              <section>
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#888] mb-3">External Links</h2>
                <ul className="space-y-1">
                  {sameAs.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-[13px] text-[#1C1C1C] underline hover:text-[#A89060] break-all"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Registry Note */}
            <div className="border border-[#E0DDD6] bg-[#F7F5F0] p-5 text-[12px] text-[#666] leading-relaxed">
              <strong className="text-[#1C1C1C]">About this record:</strong> This profile is part of the UpForge Global Startup Registry —
              an open, independent, verified database of startups from India and beyond.
              Data is contributed by founders and verified by the UpForge team.{" "}
              <a
                href={`https://www.upforge.in/startup/${startup.slug}`}
                className="underline hover:text-[#1C1C1C]"
              >
                View full profile on UpForge.in →
              </a>
            </div>

            {/* AdSense Ready Space - NO MANUAL SPONSORED CONTENT */}
            <div className="border border-dashed border-[#D5D0C8] bg-[#FAFAF8] p-4 text-center">
              <div className="text-[10px] uppercase tracking-widest text-[#CCC] mb-2">Advertisement</div>
              <div className="min-h-[90px] flex items-center justify-center">
                {/* Google AdSense code - replace with your actual AdSense code */}
                <ins className="adsbygoogle"
                     style={{ display: "block" }}
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="XXXXXXXXXX"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — data table (Wikipedia-style infobox) */}
          <div className="lg:col-span-1">
            <div className="border border-[#D5D0C8] bg-white">

              {/* Infobox header */}
              <div className="bg-[#1C1C1C] text-white px-4 py-2 text-[11px] uppercase tracking-widest text-center font-bold">
                Registry Record
              </div>

              <table className="w-full text-[12px]">
                <tbody className="divide-y divide-[#E8E4DC]">

                  {startup.ufrn && (
                    <tr>
                      <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider w-[40%]">UFRN</td>
                      <td className="px-4 py-3 text-[#1C1C1C] font-mono font-bold text-[#A89060]">{startup.ufrn}</td>
                    </tr>
                  )}

                  {startup.category && (
                    <tr>
                      <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Sector</td>
                      <td className="px-4 py-3 text-[#1C1C1C]">{startup.category}</td>
                    </tr>
                  )}

                  {startup.founded_year && (
                    <tr>
                      <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Founded</td>
                      <td className="px-4 py-3 text-[#1C1C1C]">{startup.founded_year}</td>
                    </tr>
                  )}

                  {startup.city && (
                    <tr>
                      <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">City</td>
                      <td className="px-4 py-3 text-[#1C1C1C]">{startup.city}</td>
                    </tr>
                  )}

                  <tr>
                    <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Country</td>
                    <td className="px-4 py-3 text-[#1C1C1C]">{startup.country_name ?? "India"}</td>
                  </tr>

                  {startup.website && (
                    <tr>
                      <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Website</td>
                      <td className="px-4 py-3">
                        <a
                          href={startup.website}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-[#1C1C1C] underline hover:text-[#A89060] break-all"
                        >
                          {startup.website.replace(/^https?:\/\//, "")}
                        </a>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Status</td>
                    <td className="px-4 py-3">
                      <span className="text-emerald-700 font-bold uppercase text-[10px] tracking-wider">
                        ✓ Verified
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Listed</td>
                    <td className="px-4 py-3 text-[#1C1C1C]">{registryDate}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 text-[#888] font-bold uppercase tracking-wider">Google Source</td>
                    <td className="px-4 py-3">
                      <GooglePreferredSourceBadge
                        variant="text-link"
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#1C1C1C] hover:text-[#A89060] transition-colors"
                      />
                    </td>
                  </tr>

                </tbody>
              </table>

              {/* UFRN embed snippet */}
              {startup.ufrn && (
                <div className="border-t border-[#E8E4DC] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#888] font-bold mb-2">
                    Verified Badge
                  </p>
                  <code className="text-[10px] text-[#555] break-all leading-relaxed block bg-[#F7F5F0] p-2">
                    {`Registered on UpForge · ${startup.ufrn}`}
                  </code>
                  <p className="text-[10px] text-[#AAA] mt-2">
                    Add this to your LinkedIn / About page.
                  </p>
                </div>
              )}

            </div>

            {/* Link back to .in marketing page */}
            <div className="mt-4 border border-[#E0DDD6] p-4 bg-white text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-2">Full Profile</p>
              <a
                href={`https://www.upforge.in/startup/${startup.slug}`}
                className="text-[12px] text-[#1C1C1C] underline hover:text-[#A89060]"
              >
                View on UpForge India →
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* ── REGISTRY FOOTER ── */}
      <footer className="border-t border-[#E0DDD6] bg-white mt-16 py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#AAA]">
          <span>© {new Date().getFullYear()} UpForge Global Registry · upforge.org</span>
          <div className="flex gap-6">
            <a href="https://www.upforge.in" className="hover:text-[#1C1C1C]">UpForge India</a>
            <a href="https://www.upforge.in/submit" className="hover:text-[#1C1C1C]">Submit Startup</a>
            <a href="https://www.upforge.in/privacy" className="hover:text-[#1C1C1C]">Privacy</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

