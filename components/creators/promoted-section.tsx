// components/creators/promoted-section.tsx
"use client"

import { SheetCreator, formatFollowerCount } from "@/lib/sheets"
import { Star, Users, TrendingUp, ShieldCheck } from "lucide-react"

interface PromotedSectionProps {
  creators: SheetCreator[]
  onViewProfile: (creator: SheetCreator) => void
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getGradient(handle: string): string {
  const colors = [
    "from-slate-100 to-slate-200",
    "from-slate-200 to-slate-300",
    "from-slate-300 to-slate-200",
  ]
  let hash = 0
  for (let i = 0; i < handle.length; i++) hash += handle.charCodeAt(i)
  return colors[hash % colors.length]
}

export function PromotedSection({ creators, onViewProfile }: PromotedSectionProps) {
  if (!creators || creators.length === 0) return null

  return (
    <div className="max-w-[1300px] mx-auto px-4 md:px-8">
      {/* Section label */}
      <div className="flex items-center gap-2 py-3 border-b border-border">
        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Today's Spotlight — 5 Verified Promoted Daily
        </span>
      </div>

      {/* MOBILE: Spotlight list */}
      <div className="md:hidden divide-y divide-border">
        {creators.map((creator) => {
          const gradient = getGradient(creator.instagramHandle)
          const registryNum = creator.id.replace("sheet-", "").padStart(5, "0")
          const registryId = `UPF-CR-2026-${registryNum}`
          
          return (
            <div
              key={creator.id}
              onClick={() => onViewProfile(creator)}
              className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl my-2 cursor-pointer hover:shadow-md transition-all duration-300 select-none"
            >
              {/* Profile Image */}
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-2 ring-offset-background">
                  {creator.profilePicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={creator.profilePicture}
                      alt={creator.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement
                        t.style.display = "none"
                        if (t.parentElement)
                          t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-lg font-bold">${getInitials(creator.fullName)}</div>`
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-lg font-bold`}>
                      {getInitials(creator.fullName)}
                    </div>
                  )}
                </div>
                {/* Star badge */}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center shadow">
                  <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <h3 className="font-serif font-black text-sm text-slate-800 dark:text-white truncate">{creator.fullName}</h3>
                  <svg className="w-3.5 h-3.5 text-[#0095F6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1 truncate">@{creator.instagramHandle} • {registryId}</p>
                <span className="inline-block px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 text-[8px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  {creator.niche}
                </span>
              </div>

              {/* Verify Badge */}
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-inherit" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* DESKTOP: Premium spotlight container with clean white cards inside */}
      <div className="hidden md:block relative overflow-hidden rounded-2xl my-6">
        <div className="absolute inset-0 bg-slate-950/5 dark:bg-slate-950/25 border border-slate-200 dark:border-slate-800 pointer-events-none rounded-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none" />

        <div className="relative px-8 py-8">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest font-semibold">
            Featured Registry Spotlight • Refreshed Daily
          </p>

          <div className="grid grid-cols-5 gap-4">
            {creators.map((creator) => {
              const gradient = getGradient(creator.instagramHandle)
              const registryNum = creator.id.replace("sheet-", "").padStart(5, "0")
              const registryId = `UPF-CR-2026-${registryNum}`

              return (
                <div
                  key={creator.id}
                  onClick={() => onViewProfile(creator)}
                  className="group relative bg-white dark:bg-slate-900 border border-amber-300/80 dark:border-amber-800/60 shadow-[0_0_12px_rgba(245,158,11,0.06)] dark:shadow-[0_0_12px_rgba(245,158,11,0.03)] rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-full select-none"
                >
                  {/* Registry ID Header Tag */}
                  <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 dark:text-slate-500 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/60">
                    <span>{registryId}</span>
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                  </div>

                  {/* Profile Image with Verified double rings */}
                  <div className="relative mb-3 flex justify-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto ring-2 ring-amber-400 ring-offset-2 ring-offset-background transition-all duration-300 group-hover:scale-105">
                      {creator.profilePicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={creator.profilePicture}
                          alt={creator.fullName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement
                            t.style.display = "none"
                            if (t.parentElement)
                              t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-lg font-bold">${getInitials(creator.fullName)}</div>`
                          }}
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-lg font-bold`}>
                          {getInitials(creator.fullName)}
                        </div>
                      )}
                    </div>
                    {/* Verification check Badge */}
                    <div className="absolute -bottom-0.5 right-[calc(50%-26px)] bg-background rounded-full p-0.5 shadow-sm">
                      <svg className="w-4 h-4 text-[#0095F6] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="mb-2">
                    <h3 className="font-serif font-black text-xs text-slate-800 dark:text-white leading-snug truncate max-w-[130px] mx-auto group-hover:text-[#e6683c] transition-colors">
                      {creator.fullName}
                    </h3>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-[130px] mx-auto">
                      @{creator.instagramHandle}
                    </p>
                  </div>

                  {/* Niche Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 text-[8px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                      {creator.niche}
                    </span>
                  </div>

                  {/* Metrics Row */}
                  <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2 flex items-center justify-around gap-1 mb-2">
                    {creator.followerCount > 0 && (
                      <div className="flex items-center gap-0.5">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">{formatFollowerCount(creator.followerCount)}</span>
                      </div>
                    )}
                    {creator.motivationScore > 0 && (
                      <div className="flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">{creator.motivationScore}/10</span>
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="w-full mt-auto py-1.5 rounded-lg text-[9px] font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 flex items-center justify-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    Verify Card
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
