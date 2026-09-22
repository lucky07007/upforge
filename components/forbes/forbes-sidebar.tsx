// components/forbes/forbes-sidebar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import type { Startup } from "@/types/startup"

export function ForbesSidebar({ startups }: { startups: Startup[] }) {
  if (!startups || startups.length === 0) return null

  return (
    <div className="w-full flex flex-col pt-2 md:pt-0 pb-4 border-b md:border-b-0 border-border md:pl-6 lg:pl-8 border-l-0 md:border-l h-full">
      
      <div className="flex items-center justify-between mb-6 pb-2 border-b-[1.5px] border-foreground">
        <h3 className="font-sans font-black text-[11px] uppercase tracking-widest text-[#C59A2E]">
          Editor's Picks
        </h3>
        <span className="font-sans font-bold text-[9px] text-muted-foreground uppercase">
          Live Index
        </span>
      </div>

      <div className="flex flex-col gap-5 lg:gap-6">
        {startups.map((startup, i) => (
          <Link 
            key={startup.slug} 
            href={`/startup/${startup.slug}`}
            className="group flex flex-row items-start justify-between gap-4 border-b border-border pb-5 last:border-0"
          >
            <div className="flex flex-col flex-1 pr-2">
              <div className="flex items-start gap-4 mb-2">
                <span className="font-sans font-bold text-[9px] text-foreground bg-muted px-1.5 py-0.5 uppercase tracking-widest">
                  {startup.category || "Startup"}
                </span>
                <div className="flex-1" />
                <span className="font-sans font-bold text-[8px] text-[#C59A2E] uppercase tracking-widest">
                  ✓ Verified
                </span>
                <span className="font-serif italic text-muted-foreground/60 text-xs">
                  No. {i + 2}
                </span>
              </div>
              
              <h4 className="font-serif font-bold text-xl md:text-lg lg:text-2xl leading-snug text-foreground mb-2 group-hover:text-[#C59A2E] transition-colors">
                {startup.name}
              </h4>
              
              <p className="font-serif text-foreground/80 leading-snug text-sm lg:text-[15px] line-clamp-2">
                {startup.description ? startup.description : `An exclusive breakdown of internal metrics and sector dominance.`}
              </p>
            </div>

            {startup.logo_url && (
              <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-muted border border-border mt-1 overflow-hidden relative">
                <Image
                  src={startup.logo_url}
                  alt={startup.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover transition-transform group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
            )}
          </Link>
        ))}
      </div>

    </div>
  )
}
