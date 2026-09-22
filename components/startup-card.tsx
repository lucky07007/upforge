"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react"
import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import { getStartupUrl } from "@/lib/domain"

import { StartupLogo } from "@/components/startup-detail"

interface StartupCardProps {
  startup: Startup
  featured?: boolean
}

export function StartupCard({ startup, featured = false }: StartupCardProps) {
  const getDisplayFounder = () => {
    const founderStr = formatFounders(startup.founders)
    if (!founderStr || founderStr.trim() === "") {
      return { name: "Institutional Lead", hasMore: false }
    }
    const parts = founderStr.split(",")
    return {
      name: parts[0].trim(),
      hasMore: parts.length > 1,
    }
  }

  const founderInfo = getDisplayFounder()
  const hasRealUFRN = !!startup.ufrn
  const ufrnDisplay = startup.ufrn ?? `UPF-${startup.slug?.substring(0, 6).toUpperCase()}`
  const ufrnShort = startup.ufrn
    ? startup.ufrn.split("-").slice(-2).join("-")
    : ufrnDisplay

  const startupHref = getStartupUrl(startup.slug || "")

  return (
    <Link href={startupHref} className="group block h-full">
      <article
        className={`relative flex h-full flex-col justify-between rounded-2xl border bg-card/90 dark:bg-card/70 backdrop-blur-xl p-6 transition-all duration-300 transform-gpu ${
          featured
            ? "border-amber-500/40 shadow-lg shadow-amber-500/5 hover:shadow-xl hover:border-amber-500 hover:-translate-y-1"
            : "border-border/80 dark:border-border/60 hover:border-amber-500/60 dark:hover:border-amber-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1"
        }`}
      >
        {featured && (
          <div className="absolute -top-3 left-6 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-black px-3.5 py-0.5 shadow-md font-bold uppercase tracking-widest text-[9px]">
              <Sparkles className="h-3 w-3 fill-black" />
              <span>Featured</span>
            </div>
          </div>
        )}

        <div>
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-muted/50 shadow-inner group-hover:border-amber-500/50 transition-colors p-1.5">
              <StartupLogo
                name={startup.name}
                logo_url={startup.logo_url}
                website={startup.website}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-muted/40 text-muted-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {startup.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              {startup.category && (
                <span className="inline-flex items-center rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 px-2.5 py-0.5 font-bold uppercase tracking-wider">
                  {startup.category}
                </span>
              )}
              {startup.city && (
                <span className="text-muted-foreground font-medium">• {startup.city}</span>
              )}
              {startup.founded_year && (
                <span className="text-muted-foreground/70 font-mono">• EST. {startup.founded_year}</span>
              )}
            </div>

            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground font-normal">
              {startup.description || "Verified entity on the UpForge Global Startup Registry."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-600 dark:text-amber-400">
              {founderInfo.name.charAt(0)}
            </div>
            <span className="font-medium text-foreground text-xs">
              {founderInfo.name}
              {founderInfo.hasMore && <span className="text-muted-foreground font-normal ml-1">+ team</span>}
            </span>
          </div>

          <div>
            {hasRealUFRN ? (
              <span 
                className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg"
                title={`Registry ID: ${startup.ufrn}`}
              >
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                {ufrnShort}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-muted-foreground/60">{ufrnDisplay}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
