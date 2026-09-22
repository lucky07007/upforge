// components/forbes/forbes-index.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import type { Startup } from "@/types/startup"

export function ForbesIndex({ startups }: { startups: Startup[] }) {
  if (!startups || startups.length === 0) return null

  return (
    <div className="pt-6 mt-2 border-t-[1.5px] border-border">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "'Georgia', serif" }}>
            The Global Index
          </h2>
          <p className="font-serif italic text-muted-foreground/80 text-base">
            Recently verified entries into the UpForge universal registry.
          </p>
        </div>
        <Link 
          href="/registry"
          className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#C59A2E] border border-[#C59A2E] px-5 py-2.5 hover:bg-[#C59A2E] hover:text-white transition-colors"
        >
          View Full Database
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {startups.map((startup) => {
          const verifiedDate = startup.created_at 
            ? new Date(startup.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()
            : "EST. 2026"

          return (
            <Link 
              key={startup.slug} 
              href={`/startup/${startup.slug}`}
              className="group flex flex-col border-t-2 border-foreground pt-3"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-sans font-black text-[9px] text-[#C59A2E] uppercase tracking-[0.15em]">
                  {startup.category}
                </span>
                <span className="font-sans font-semibold text-[8px] text-[#C59A2E] uppercase tracking-widest bg-[#C59A2E]/10 border border-[#C59A2E]/30 px-1.5 py-0.5">
                  ✓ UFRN Verified
                </span>
              </div>
              
              <h3 className="font-serif font-bold text-xl text-foreground mb-2 group-hover:underline underline-offset-4 decoration-[1.5px]">
                {startup.name}
              </h3>
              
              <p className="font-serif text-[14px] text-foreground/80 leading-relaxed line-clamp-3 mb-3">
                {startup.description}
              </p>

              <div className="mt-auto flex items-center gap-2.5 pt-3 border-t border-border/50">
                {startup.logo_url ? (
                  <div className="w-8 h-8 rounded-full border border-border overflow-hidden transition-transform group-hover:scale-105 relative">
                    <Image
                      src={startup.logo_url}
                      alt={startup.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border border-border bg-foreground flex items-center justify-center font-serif text-[10px] text-white">
                    {startup.name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-[8px] text-foreground uppercase tracking-widest">
                    HQ: {startup.city || startup.country_name || "Global"}
                  </span>
                  <span className="font-sans text-[8px] text-[#C59A2E] uppercase tracking-widest">
                    {startup.ufrn || "VERIFIED"}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
