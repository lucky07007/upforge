"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface TrendingStartup {
  id: string
  name: string
  slug: string
  logo_url: string | null
  category: string | null
  valuation: string | null
  founded_year: number | null
  country_code: string | null
  ufrn: string | null
}

export function ResearchTrending({ startups }: { startups: TrendingStartup[] }) {
  if (!startups || startups.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="font-serif italic text-sm">Loading trending startups...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {startups.map((startup, index) => (
        <Link
          key={startup.id}
          href={`/startup/${startup.slug}`}
          className="group block p-3 border border-border hover:border-[#C59A2E] transition-all duration-300 bg-background"
        >
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 shrink-0 bg-muted border border-border overflow-hidden flex items-center justify-center">
              {startup.logo_url ? (
                <Image
                  src={startup.logo_url}
                  alt={startup.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <span className="font-serif text-lg font-bold text-muted-foreground">
                  {startup.name.charAt(0)}
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[8px] font-black uppercase tracking-wider text-[#C59A2E] font-mono">
                  #{index + 1}
                </span>
                {startup.ufrn && (
                  <span className="text-[7px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-1 py-0.5">
                    UFRN
                  </span>
                )}
              </div>
              <h4 className="font-serif font-bold text-sm text-foreground group-hover:text-[#C59A2E] transition-colors truncate">
                {startup.name}
              </h4>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono truncate">
                {startup.category || "Startup"}
              </p>
            </div>
          </div>
          
          {/* Meta row */}
          <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {startup.valuation && (
                <span className="text-[10px] font-bold text-foreground">{startup.valuation}</span>
              )}
              {startup.country_code && (
                <span className="text-[8px] text-muted-foreground uppercase tracking-wider font-mono">
                  {startup.country_code}
                </span>
              )}
            </div>
            <ArrowUpRight className="w-3 h-3 text-border group-hover:text-[#C59A2E] transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  )
}
