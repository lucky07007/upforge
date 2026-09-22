"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Founder } from "@/lib/founders/types"
import { useState } from "react"

interface FounderProfileProps {
  founder: Founder
  relatedFounders: Founder[]
  prevFounder: Founder | null
  nextFounder: Founder | null
}

export function FounderProfile({ 
  founder, 
  relatedFounders, 
  prevFounder, 
  nextFounder 
}: FounderProfileProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }}>
      
      <style>{`
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        
        @media (min-width: 640px) {
          .newspaper-cols {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0;
          }
          .newspaper-cols > div {
            padding: 0 1.4rem;
            border-right: 1px solid #C8C2B4;
          }
          .newspaper-cols > div:first-child { padding-left: 0; }
          .newspaper-cols > div:last-child { border-right: none; padding-right: 0; }
        }
        
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3.9em;
          font-weight: 900;
          line-height: 0.82;
          float: left;
          margin-right: 0.07em;
          margin-top: 0.05em;
          color: #1A1208;
        }
      `}</style>

      {/* Header */}
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="flex items-center justify-between px-4 sm:px-8 py-1.5 border-b border-[#C8C2B4] font-mono">
          <Link href="/" className="text-[9px] text-[#888] uppercase tracking-widest hover:text-[#1A1208]">
            upforge.org
          </Link>
          <span className="text-[9px] text-[#AAA] uppercase tracking-widest">
            Founder Chronicle · UpForge Editorial
          </span>
        </div>
        
        <div className="text-center px-4 py-6 sm:py-9 border-b border-[#C8C2B4]">
          <h1 className="pf font-black text-4xl sm:text-5xl text-[#1A1208]">The Founder Chronicle</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        <div className="grid lg:grid-cols-[1fr_360px] border-b-2 border-[#1A1208]">
          
          {/* Left Column - Story */}
          <div className="py-8 lg:pr-8 border-r border-[#C8C2B4]">
            
            {/* Category Badge without ranking numbers */}
            <div className="flex items-center gap-3 mb-6 font-mono">
              <span className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white"
                    style={{ background: founder.accent }}>
                {founder.category || founder.company}
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">
                {founder.country} · Est. {founder.founded}
              </span>
            </div>

            {/* Headline */}
            <h2 className="pf font-black text-3xl md:text-4xl leading-[1.06] text-[#1A1208] mb-5">
              {founder.headline}
            </h2>

            {/* Deck */}
            <p className="italic text-base md:text-lg text-[#5A4A30] leading-relaxed mb-6 pb-6 border-b border-[#C8C2B4]">
              {founder.deck}
            </p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8 font-mono">
              {["By UpForge Editorial", founder.city, `Est. ${founder.founded}`, founder.context].map((item, i, arr) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{item}</span>
                  {i < arr.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* Mobile Image */}
            <div className="lg:hidden mb-8">
              <div className="relative w-full h-64 bg-[#E8E2D5]">
                {!imageFailed ? (
                  <Image src={founder.imageUrl} alt={founder.name} fill className="object-cover" onError={() => setImageFailed(true)} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white"
                       style={{ background: founder.accent }}>
                    {founder.initials}
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-[#1A1208]">
                <p className="pf text-white font-bold">{founder.name}</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wide">{founder.role} · {founder.company}</p>
              </div>
            </div>

            {/* Newspaper Columns */}
            <div className="newspaper-cols">
              {founder.columns.map((col, ci) => (
                <div key={ci} className="mb-6 sm:mb-0">
                  <h3 className="font-black uppercase tracking-[0.13em] text-[11px] text-[#1A1208] mb-3 pb-1.5 border-b-2 font-mono"
                      style={{ borderColor: founder.accent }}>
                    {col.heading}
                  </h3>
                  {col.body.split("\n\n").map((para, pi) => (
                    <p key={pi} 
                       className={`leading-[1.9] mb-3 text-[#2C2010] text-[13px] ${ci === 0 && pi === 0 ? "dropcap" : ""}`}>
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull Quote */}
            <div className="mt-10 pt-6 pb-6 text-center border-t-2 border-b border-[#C8C2B4]"
                 style={{ borderTopColor: founder.accent }}>
              <span className="block text-[#C8C2B4] text-base mb-2.5">❧</span>
              <blockquote className="pf italic text-[#1A1208] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto px-4">
                "{founder.pullQuote}"
              </blockquote>
              <span className="block text-[#C8C2B4] text-base my-2.5">❧</span>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] font-mono">
                — {founder.pullQuoteBy}, {founder.company}
              </p>
            </div>
          </div>

          {/* Right Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-0 pl-8 pt-8 pb-8 flex flex-col gap-5 max-h-screen overflow-y-auto">
              
              {/* Founder Image */}
              <div className="relative w-full h-96">
                {!imageFailed ? (
                  <Image src={founder.imageUrl} alt={founder.name} fill className="object-cover" onError={() => setImageFailed(true)} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white"
                       style={{ background: founder.accent }}>
                    {founder.initials}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3.5 bg-gradient-to-t from-black/95 to-transparent">
                  <p className="pf text-white font-bold">{founder.name}</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wide">{founder.role}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="border-2 border-[#1A1208]">
                <div className="px-4 py-2.5 bg-[#1A1208]">
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white font-mono">By the Numbers</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-[#D8D2C4]">
                  {founder.stats.map((stat, i) => (
                    <div key={i} className="px-4 py-3.5">
                      <p className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1 font-mono">{stat.label}</p>
                      <p className="pf font-black text-[#1A1208] text-xl">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lesson */}
              <div className="px-4 py-4 border" style={{ background: founder.accentBg, borderColor: founder.accentBorder }}>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2 font-mono" style={{ color: founder.accent }}>
                  The Lesson
                </p>
                <p className="italic text-[#1A1208] text-sm leading-relaxed">{founder.lesson}</p>
              </div>

              {/* Related Founders */}
              {relatedFounders.length > 0 && (
                <div className="border-t border-[#C8C2B4] pt-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#AAA] mb-4 font-mono">More Stories</p>
                  {relatedFounders.map((rf) => (
                    <Link key={rf.id} href={`/founder-stories/${rf.slug}`} 
                          className="flex items-center gap-3 py-3 border-b border-[#E8E2D5] last:border-0 group">
                      <div className="w-10 h-10 relative overflow-hidden border border-[#D8D2C4] shrink-0">
                        <Image src={rf.imageUrl} alt={rf.nameShort} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[#1A1208] group-hover:text-[#C59A2E] transition-colors truncate">
                          {rf.nameShort}
                        </p>
                        <p className="text-[9px] uppercase tracking-wider text-[#AAA]">{rf.company}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between py-5 border-b border-[#C8C2B4]">
          {prevFounder ? (
            <Link href={`/founder-stories/${prevFounder.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border border-[#1A1208] text-[#1A1208] hover:bg-[#1A1208] hover:text-white transition-colors font-mono">
              <ChevronLeft className="w-3.5 h-3.5" />
              {prevFounder.nameShort}
            </Link>
          ) : <div />}
          
          <Link href="/founder-stories" className="text-[9px] uppercase tracking-[0.2em] text-[#AAA] hover:text-[#1A1208] font-mono">
            All Stories
          </Link>
          
          {nextFounder ? (
            <Link href={`/founder-stories/${nextFounder.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border border-[#1A1208] text-[#1A1208] hover:bg-[#1A1208] hover:text-white transition-colors font-mono">
              {nextFounder.nameShort}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  )
}
