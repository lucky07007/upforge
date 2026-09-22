// app/creators/apply-button.tsx
"use client"

import { ExternalLink } from "lucide-react"

interface ApplyButtonProps {
  formUrl: string
  variant?: "default" | "large"
}

export function ApplyButton({ formUrl, variant = "default" }: ApplyButtonProps) {
  const handleApply = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer')
  }

  if (variant === "large") {
    return (
      <button
        onClick={handleApply}
        className="group relative font-sans font-black text-[11px] text-background bg-foreground hover:bg-[#C59A2E] px-10 py-4 uppercase tracking-[0.2em] transition-all duration-300 shrink-0 whitespace-nowrap overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          Apply for UF-ID
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-[#C59A2E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    )
  }

  return (
    <button
      onClick={handleApply}
      className="group relative inline-flex items-center gap-2 font-sans font-black text-[10px] text-background bg-[#C59A2E] px-6 py-3 uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-300 shadow-sm"
    >
      Apply for Verification
      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  )
}
