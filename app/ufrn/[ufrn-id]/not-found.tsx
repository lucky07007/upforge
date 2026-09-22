// app/ufrn/[ufrn-id]/not-found.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Custom 404 for invalid UFRN lookups.
// Shows a search box so users can try a corrected ID.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShieldX, Search, ArrowLeft } from "lucide-react"

export default function UFRNNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center space-y-8">

          {/* Icon */}
          <div className="flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border-2 border-[#E8C547]/30 bg-[#FFF9E6] flex items-center justify-center">
              <ShieldX className="h-9 w-9 text-[#A89060]" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-[#A89060] font-bold"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              UpForge Registry · Error 404
            </p>
            <h1
              className="text-3xl font-bold tracking-tight text-[#1C1C1C]"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              UFRN Not Found
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
              This registry number doesn't match any verified startup in our database.
              Check the format: <span className="font-mono text-[#A89060]">UFRN-YYYY-IND-NNNNN</span>
            </p>
          </div>

          {/* Search fallback */}
          <div
            className="border border-slate-200 rounded-xl p-5 bg-white text-left space-y-3"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Try searching instead
            </p>
            <Link
              href="/startup"
              className="flex items-center gap-3 px-4 py-3 bg-[#1C1C1C] text-white rounded-lg text-sm font-medium hover:bg-[#333] transition-colors"
            >
              <Search className="h-4 w-4 flex-shrink-0" />
              <span>Search the Startup Registry</span>
            </Link>
          </div>

          {/* Common format examples */}
          <div
            className="text-left border border-slate-100 rounded-xl p-5 bg-white space-y-3"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Valid UFRN formats
            </p>
            {[
              { fmt: "UFRN-2026-IND-00001", label: "Standard" },
              { fmt: "UFRN-2025-IND-00142", label: "Example" },
              { fmt: "UFRN-2024-IND-00999", label: "Example" },
            ].map(({ fmt, label }) => (
              <div key={fmt} className="flex items-center justify-between">
                <code className="text-sm font-mono text-[#A89060]">{fmt}</code>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to UpForge
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
