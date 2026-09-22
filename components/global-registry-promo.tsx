// components/global-registry-promo.tsx
"use client"

import Link from "next/link"
import { Globe } from "lucide-react"

interface GlobalRegistryPromoProps {
  startupCount: number
  isOrg: boolean
}

export function GlobalRegistryPromo({
  startupCount,
}: GlobalRegistryPromoProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.floor(num / 1000)}k+`
    return num.toString()
  }

  return (
    <section className="relative border-y-4 border-foreground bg-muted overflow-hidden">
      {/* Content - classic banner feel */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left text - premium typography */}
        <div className="flex flex-col leading-tight max-w-2xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
             <Globe className="w-5 h-5 text-foreground" />
            <span className="text-[11px] tracking-widest uppercase font-bold font-sans text-muted-foreground border-l border-border pl-4">
              Live Global Registry
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
            {formatNumber(startupCount)} Verified Registry Listings.
          </h2>
          <p className="text-foreground/80 mt-6 text-xl leading-relaxed font-serif">
            Access the UpForge startup dataset and explore company records, sectors, founders, and geography through a structured public registry.
          </p>
        </div>

        {/* Right actions - standard solid buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <Link
            href="/registry"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-bold tracking-widest text-[11px] uppercase font-sans text-center transition-colors hover:bg-foreground/90 border border-foreground"
          >
            Access Directory
          </Link>

          <Link
            href="/verify"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-foreground font-bold tracking-widest text-[11px] uppercase font-sans text-center border border-foreground hover:bg-muted/50 transition-colors"
          >
            Verify UFRN
          </Link>
        </div>
      </div>
    </section>
  )
}
