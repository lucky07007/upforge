// components/trust-standards.tsx
"use client"

import { ShieldCheck, Database, Globe, FileCheck } from "lucide-react"

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Independent",
    desc: "UpForge accepts zero paid placements or sponsored rankings. Every startup is evaluated strictly on merit and verified public data points.",
  },
  {
    icon: Database,
    title: "Verified Open Data",
    desc: "Valuations, funding rounds, and team metrics are rigorously cross-referenced against public filings, official press releases, and structured financial APIs.",
  },
  {
    icon: FileCheck,
    title: "Editorial Standards",
    desc: "Every listed startup must pass an intensive editorial review before being inducted and assigned a permanent UpForge Registry Number (UFRN).",
  },
  {
    icon: Globe,
    title: "Global Neutrality",
    desc: "From Silicon Valley to Bangalore, our stringent guidelines enforce objective, geographic neutrality and absolute standardized reporting worldwide.",
  },
]

export function TrustStandardsSection() {
  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl border-l-[3px] border-accent-gold pl-8 mb-16">
          <p className="text-xs tracking-[0.2em] font-bold uppercase text-muted-foreground mb-4">
            Editorial Guidelines
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            The Global Standard for Startup Intelligence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            UpForge exists to be the ultimate, unbiased registry for the digital economy. No pay-to-play metrics. No opaque algorithms. Complete transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {TRUST_PILLARS.map((Pillar, i) => (
            <div key={i} className="flex flex-col border-t border-border pt-6">
              <Pillar.icon className="w-6 h-6 text-accent-primary mb-5" />
              <h3 className="text-base font-bold text-foreground mb-3 tracking-tight">
                {Pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-[1.7]">
                {Pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
            Our data infrastructure powers research teams, venture analysts, and global policymakers. We believe open intelligence accelerates global innovation.
          </p>
          <a
            href="/about"
            className="hidden sm:inline-flex items-center text-xs font-bold tracking-widest uppercase text-accent-primary hover:text-accent-primary/80 transition"
          >
            Read the Charter →
          </a>
        </div>
      </div>
    </section>
  )
}
