// components/home/roster.tsx
"use client"

import Link from "next/link"
import type { Founder } from "@/data/founders"

export function ValidatedRoster({ founders }: { founders: Founder[] }) {
  // Display only top 6 to keep it extremely clean.
  const displayFounders = founders.slice(0, 6)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-muted-foreground font-sans block mb-4">
              The Registry
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
              Verified Inductees
            </h2>
          </div>
          <Link
            href="/registry"
            className="text-[11px] font-sans tracking-widest uppercase font-bold text-foreground border border-border px-5 py-2.5 hover:bg-muted transition-colors whitespace-nowrap"
          >
            Explore the Full Index →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayFounders.map((founder, i) => (
            <Link 
              key={founder.slug} 
              href={`/startup/${founder.slug}`}
              className="group flex flex-col block"
            >
              {/* Photo Frame */}
              <div className="w-full aspect-[4/5] overflow-hidden border border-border mb-5 bg-muted">
                {founder.imgSrc ? (
                  <img
                    src={founder.imgSrc}
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-serif text-3xl text-muted-foreground">
                    {founder.initials}
                  </div>
                )}
              </div>

              {/* Data Block */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-bold text-xl text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
                    {founder.company}
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-muted-foreground border border-border px-2 py-0.5 whitespace-nowrap">
                    {founder.category}
                  </span>
                </div>
                
                <p className="text-[11px] font-sans tracking-wider uppercase text-muted-foreground font-semibold mb-4">
                  {founder.name} <span className="mx-1">·</span> {founder.city}
                </p>

                <p className="font-serif text-foreground/80 italic text-[15px] leading-relaxed line-clamp-2">
                  {founder.deck.split(".")[0]}.
                </p>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
