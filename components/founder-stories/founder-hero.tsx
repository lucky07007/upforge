"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Founder } from "@/lib/founders/types"

interface FounderHeroProps {
  featuredFounders: Founder[]
}

export function FounderHero({ featuredFounders }: FounderHeroProps) {
  const mainFounder = featuredFounders[0]
  const secondaryFounders = featuredFounders.slice(1, 3)

  if (!mainFounder) return null

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Main Featured Story */}
      <Link href={`/founder-stories/${mainFounder.slug}`} className="group block">
        <div className="relative overflow-hidden border border-border hover:border-foreground transition-all duration-300">
          <div className="relative w-full aspect-[16/10] bg-muted">
            <Image
              src={mainFounder.imageUrl}
              alt={mainFounder.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute top-4 left-4 z-20">
              <span 
                className="px-3 py-1.5 text-white text-[10px] font-black uppercase tracking-wider shadow-xs"
                style={{ background: mainFounder.accent }}
              >
                Cover Story
              </span>
            </div>
          </div>
          
          <div className="p-6 bg-background">
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="text-[10px] font-black uppercase tracking-[0.15em]"
                style={{ color: mainFounder.accent }}
              >
                {mainFounder.category || mainFounder.company}
              </span>
              <span className="text-border">·</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">
                {mainFounder.country} · Est. {mainFounder.founded}
              </span>
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold leading-[1.1] text-foreground mb-3 group-hover:text-[#C59A2E] transition-colors">
              {mainFounder.headline}
            </h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-serif italic">
              {mainFounder.deck}
            </p>
            
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#C59A2E] font-bold">
              Read Full Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>

      {/* Secondary Stories */}
      <div className="flex flex-col gap-4">
        {secondaryFounders.map((founder) => (
          <Link key={founder.id} href={`/founder-stories/${founder.slug}`} className="group">
            <div className="flex gap-4 p-4 border border-border hover:border-foreground transition-all duration-300 bg-background">
              <div className="relative w-24 h-24 shrink-0 overflow-hidden border border-border bg-muted">
                <Image
                  src={founder.imageUrl}
                  alt={founder.nameShort}
                  fill
                  className="object-cover transition-all group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <span 
                  className="text-[8px] font-black uppercase tracking-wider"
                  style={{ color: founder.accent }}
                >
                  {founder.category || founder.company}
                </span>
                <h4 className="font-serif font-bold text-lg text-foreground group-hover:text-[#C59A2E] transition-colors mt-1">
                  {founder.nameShort}
                </h4>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                  {founder.company}
                </p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 font-serif italic">
                  {founder.deck}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
