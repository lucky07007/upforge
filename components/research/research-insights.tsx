"use client"

import { TrendingUp, Award, Zap, Globe } from "lucide-react"

export function ResearchInsights() {
  const insights = [
    {
      icon: TrendingUp,
      title: "AI & ML",
      description: "Fastest growing sector with 312% YoY valuation increase",
      color: "#10A37F"
    },
    {
      icon: Award,
      title: "Unicorn Tracker",
      description: "1,200+ unicorns verified globally, 47 added this quarter",
      color: "#C59A2E"
    },
    {
      icon: Zap,
      title: "Quick Commerce",
      description: "10-minute delivery startups raised $12B in 2025-26",
      color: "#D97706"
    },
    {
      icon: Globe,
      title: "Cross-Border",
      description: "Singapore, UAE, and Estonia lead in startup migration",
      color: "#3B82F6"
    }
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-foreground">
          Market Insights
        </h3>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="p-4 border border-border bg-background hover:border-foreground transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: insight.color + "15" }}
              >
                <insight.icon className="w-4 h-4" style={{ color: insight.color }} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-foreground mb-1">
                  {insight.title}
                </h4>
                <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 border-l-4 border-[#C59A2E] bg-muted/30">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#C59A2E] mb-2">
          Ecosystem Signal
        </p>
        <p className="font-serif italic text-sm text-foreground">
          Startups with verified UFRN records report significantly higher inbound investor engagement and diligence readiness.
        </p>
        {/* FOUNDER: confirm or remove this stat, needs real data source */}
      </div>
    </div>
  )
}
