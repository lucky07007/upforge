// components/home/intelligence.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export function IntelligenceBriefing() {
  const reports = [
    {
      title: "The State of Early-Stage Valuations 2026",
      category: "Market Data",
      date: "April 2026",
      desc: "An analysis of capitalization trends across 5,000 verified seed-stage entities.",
      link: "/research",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "SaaS Multiples & Revenue Resiliency",
      category: "Sector Focus",
      date: "March 2026",
      desc: "Benchmarking the B2B software sector against historical publicly-traded yields.",
      link: "/research",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
    }
  ]

  return (
    <section className="py-24 bg-muted/10 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-muted-foreground font-sans block mb-4">
              Research & Analysis
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
              Intelligence Briefings
            </h2>
          </div>
          <Link
            href="/research"
            className="text-[11px] font-sans tracking-widest uppercase font-bold text-foreground border border-border px-5 py-2.5 hover:bg-muted transition-colors whitespace-nowrap"
          >
            Access Research Library →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reports.map((report, i) => (
            <Link 
              key={i}
              href={report.link}
              className="group block"
            >
              <div className="w-full aspect-video overflow-hidden border border-border mb-6 relative">
                <Image 
                  src={report.img} 
                  alt={report.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover grayscale opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.15em] uppercase font-bold font-sans text-background bg-foreground px-2 py-1">
                  {report.category}
                </span>
                <span className="text-[11px] tracking-widest uppercase font-bold font-sans text-muted-foreground">
                  {report.date}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3 flex items-start justify-between gap-4 group-hover:underline decoration-1 underline-offset-4" style={{ fontFamily: "'Georgia', serif" }}>
                {report.title}
                <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>

              <p className="font-serif italic text-muted-foreground leading-relaxed text-lg">
                {report.desc}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
