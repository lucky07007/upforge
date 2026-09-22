// components/home/hero.tsx
"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function EliteHero({ startupCount }: { startupCount: number }) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.floor(num / 1000)}k+`
    return num.toString()
  }

  return (
    <section className="bg-background pt-24 pb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="border border-border p-2">
          <div className="border border-border py-24 px-8 md:px-20 text-center flex flex-col items-center bg-white" style={{ background: "var(--background)" }}>
            
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="w-4 h-4 text-foreground" />
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-muted-foreground font-sans">
                Global Startup Registry
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-[76px] leading-[1.05] font-bold text-foreground max-w-4xl tracking-tight mb-8"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Global Startup Registry & Intelligence
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed mb-12">
              A structured registry of {formatNumber(startupCount)} ventures, connected to founder stories, sector research, and startup intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
              <Link 
                href="/submit"
                className="w-full sm:w-auto px-10 py-4 bg-foreground text-background font-sans text-[11px] uppercase tracking-widest font-bold transition-all hover:bg-foreground/90 flex items-center justify-center gap-2"
              >
                Request Registration <ArrowRight className="w-3 h-3" />
              </Link>
              
              <Link 
                href="/verify"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border border-border text-foreground font-sans text-[11px] uppercase tracking-widest font-bold transition-all hover:bg-muted focus:ring-0 flex items-center justify-center gap-2"
              >
                Verify Credentials
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
