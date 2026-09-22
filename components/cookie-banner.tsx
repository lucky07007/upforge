"use client"

import { useState, useEffect } from "react"
import { Cookie, Settings2 } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem("upforge_cookie_consent")
    if (!hasConsented) setIsVisible(true)
  }, [])

  const handleDecision = (decision: "all" | "essential") => {
    localStorage.setItem("upforge_cookie_consent", decision)
    if (decision === "all") {
      window.dispatchEvent(new Event("upforge_analytics_consent_granted"))
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-background/95 px-4 py-4 shadow-[0_-18px_50px_rgba(0,0,0,0.12)] backdrop-blur-md animate-in slide-in-from-bottom duration-500">
      <div className="mx-auto flex max-w-[1300px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="hidden shrink-0 rounded-full border border-[#C59A2E]/30 bg-[#C59A2E]/10 p-2 sm:flex">
            <Cookie className="h-4 w-4 text-[#C59A2E]" />
          </div>
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="font-sans text-[11px] font-black uppercase tracking-[0.16em] text-foreground">Privacy & Cookies</h4>
              <span className="hidden h-1 w-1 rounded-full bg-[#C59A2E] sm:block" />
              <span className="hidden font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#B48A2B] sm:block">UpForge Standard</span>
            </div>
            <p className="max-w-3xl font-serif text-[12px] leading-5 text-muted-foreground">
              UpForge uses essential cookies to operate the registry and optional analytics to understand site performance. <a href="/legal/privacy" className="font-semibold text-[#B48A2B] underline decoration-[#C59A2E]/40 underline-offset-2 transition-colors hover:text-[#8F6B22]">Privacy policy</a>.
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <button onClick={() => handleDecision("essential")} className="flex w-full items-center justify-center gap-2 rounded-[2px] border border-border px-5 py-2.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-all hover:border-[#C59A2E]/40 hover:bg-[#C59A2E]/5 hover:text-[#B48A2B] sm:w-auto">
            <Settings2 className="h-3 w-3" /> Essential only
          </button>
          <button onClick={() => handleDecision("all")} className="w-full rounded-[2px] bg-[#C59A2E] px-6 py-2.5 font-sans text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-sm transition-all hover:bg-[#A97F25] sm:w-auto">Accept all</button>
        </div>
      </div>
    </div>
  )
}
