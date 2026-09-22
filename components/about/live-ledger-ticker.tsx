"use client"

import { ShieldCheck, CheckCircle2 } from "lucide-react"

const LEDGER_ENTRIES = [
  { ufrn: "UFRN-2026-8819", name: "Zepto", sector: "Quick Commerce", status: "VERIFIED" },
  { ufrn: "UFRN-2026-9102", name: "Perplexity AI", sector: "AI & Search", status: "VERIFIED" },
  { ufrn: "UFRN-2026-7431", name: "PhysicsWallah", sector: "EdTech", status: "VERIFIED" },
  { ufrn: "UFRN-2026-8492", name: "Mistral AI", sector: "Open Source AI", status: "VERIFIED" },
  { ufrn: "UFRN-2026-6210", name: "Zerodha", sector: "Fintech", status: "VERIFIED" },
  { ufrn: "UFRN-2026-9504", name: "Anduril Industries", sector: "Defense Tech", status: "VERIFIED" },
  { ufrn: "UFRN-2026-4419", name: "Zomato", sector: "Food Delivery", status: "VERIFIED" },
  { ufrn: "UFRN-2026-8921", name: "Surge AI", sector: "Data Infrastructure", status: "VERIFIED" },
]

export function LiveLedgerTicker() {
  return (
    <div className="w-full bg-foreground text-background border-y border-foreground py-2.5 overflow-hidden select-none font-mono">
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {[...LEDGER_ENTRIES, ...LEDGER_ENTRIES].map((item, index) => (
          <div 
            key={index}
            className="inline-flex items-center gap-2.5 mx-6 text-[10px] uppercase tracking-widest"
          >
            <span className="text-[#C59A2E] font-bold">{item.ufrn}</span>
            <span className="text-background/40">·</span>
            <span className="font-bold text-background">{item.name}</span>
            <span className="text-background/50">({item.sector})</span>
            <span className="inline-flex items-center gap-1 text-[#C59A2E] font-bold text-[9px] bg-[#C59A2E]/10 px-1.5 py-0.5 rounded-xs border border-[#C59A2E]/30">
              <CheckCircle2 className="w-2.5 h-2.5" />
              {item.status}
            </span>
            <span className="text-background/20 ml-4">✦</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
