// components/forbes/forbes-cover.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import type { Startup } from "@/types/startup"

export function ForbesCover({ startup }: { startup: Startup | null }) {
  if (!startup) return <div className="min-h-[400px] border border-border bg-muted/20" />

  const verifiedDate = startup.created_at 
    ? new Date(startup.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()
    : "EST. 2026"

  return (
    <div className="flex flex-col relative h-full mb-8 lg:mb-0 group cursor-pointer border-b md:border-b-0 border-border pb-6 md:pb-0">
      <Link href={`/startup/${startup.slug}`} className="block h-full">
        {/* Massive Cover Image */}
        <div className="w-full aspect-[16/10] bg-muted border border-border mb-4 overflow-hidden relative">
          {startup.logo_url ? (
             <Image 
               src={startup.logo_url} 
               alt={startup.name}
               fill
               sizes="(max-width: 768px) 100vw, 600px"
               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
               loading="lazy"
             />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-muted-foreground/30">
              {startup.name.charAt(0)}
            </div>
          )}
          {/* Forbes style category tag in corner */}
          <div className="absolute top-3 left-3 bg-red-700 px-3 py-1 font-sans font-black text-[9px] tracking-[0.2em] text-white uppercase shadow-sm">
            {startup.category || "Cover Story"}
          </div>
        </div>

        {/* Editorial Content */}
        <div className="pr-2 md:pr-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-sans font-black text-[10px] uppercase tracking-widest text-[#C59A2E]">
              UpForge Direct
            </span>
            <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-muted-foreground">
              Feature Profile
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.05] text-foreground mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            {startup.name}: An Inside Look At Their Trajectory.
          </h2>
          
          <p className="font-serif italic text-lg md:text-xl text-foreground/80 leading-relaxed mb-5">
            {startup.description ? startup.description.split('.')[0] + '.' : "A comprehensive analysis of verified market positioning and strategic execution."}
          </p>
          
          <div className="flex items-center gap-3 text-[9px] uppercase font-bold tracking-widest font-sans border-t-[1.5px] border-border pt-4">
            <span className="text-foreground">By Current Registry</span>
            <span className="w-px h-3 bg-border" />
            <span className="text-[#C59A2E]">✓ UFRN Verified</span>
            <span className="text-[#C59A2E] font-mono">{startup.ufrn || "VERIFIED"}</span>
            <span className="ml-auto text-muted-foreground">{verifiedDate}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
