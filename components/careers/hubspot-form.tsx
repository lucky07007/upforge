"use client"

import { useEffect, useState } from "react"
import { Loader2, ShieldCheck } from "lucide-react"

export function HubSpotCareersForm({ selectedRole }: { selectedRole?: string }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const scriptId = "hubspot-careers-form-script"
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement("script")
      script.id = scriptId
      script.src = "https://js-na2.hsforms.net/forms/embed/247087124.js"
      script.defer = true
      script.async = true
      script.onload = () => {
        setIsLoaded(true)
      }
      document.head.appendChild(script)
    } else {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="relative w-full rounded-3xl border border-border/80 bg-card p-6 md:p-10 shadow-lg transition-all duration-300">
      {/* Header bar inside form card */}
      <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider">
            Official Application Portal
          </span>
        </div>
        {selectedRole && (
          <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Selected: {selectedRole}
          </span>
        )}
      </div>

      {!isLoaded && (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Initializing Encrypted HubSpot Form...
          </p>
        </div>
      )}

      {/* HubSpot Official Embed Container */}
      <div
        className="hs-form-frame w-full min-h-[380px]"
        data-region="na2"
        data-form-id="60df60f0-0e69-4a09-a854-b167021d1fbf"
        data-portal-id="247087124"
      />

      <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          SSL 256-Bit Encrypted Submission
        </span>
        <span>UpForge Recruitment Portal v2.4</span>
      </div>
    </div>
  )
}
