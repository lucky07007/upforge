// components/creators/creator-card-desktop.tsx
"use client"

import { SheetCreator, formatFollowerCount } from "@/lib/sheets"
import { Users, ShieldCheck, ArrowUpRight } from "lucide-react"

interface CreatorCardDesktopProps {
  creator: SheetCreator
  isPromoted?: boolean
  onViewProfile: (creator: SheetCreator) => void
}

const PARTNER_APPLY_LINK = "/partner-program"

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

export function CreatorCardDesktop({
  creator,
  isPromoted = false,
  onViewProfile,
}: CreatorCardDesktopProps) {
  const gradient = getGradient(creator.instagramHandle)
  const isPartner = creator.isPartner

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(PARTNER_APPLY_LINK, "_blank", "noopener,noreferrer")
  }

  const ringClass = isPartner
    ? "ring-2 ring-[#C59A2E]"
    : isPromoted
    ? "ring-2 ring-amber-400"
    : "ring-2 ring-slate-200 dark:ring-slate-700"

  return (
    <div
      onClick={() => onViewProfile(creator)}
      className="group relative bg-card/90 dark:bg-card/70 border border-border/80 hover:border-amber-500/60 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between h-full select-none"
    >
      <style jsx>{`
        @keyframes partnerRingGlow {
          0%, 100% {
            box-shadow: 0 0 6px 1px rgba(197, 154, 46, 0.55), 0 0 14px 3px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 12px 3px rgba(197, 154, 46, 0.9), 0 0 22px 6px rgba(34, 197, 94, 0.55);
          }
        }
        @keyframes vBadgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .partner-glow {
          animation: partnerRingGlow 2s ease-in-out infinite;
        }
        .v-badge {
          animation: vBadgePulse 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Verified strip */}
      <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/60">
        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
        Verified Creator
      </div>

      {/* Profile Image */}
      <div className="relative mb-3 flex justify-center">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden mx-auto ${ringClass} ${
            isPartner ? "partner-glow" : ""
          } ring-offset-2 ring-offset-background transition-all duration-300 group-hover:scale-105`}
        >
          {creator.profilePicture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={creator.profilePicture}
              alt={creator.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-xl font-bold">${getInitials(
                    creator.fullName
                  )}</div>`
                }
              }}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-xl font-bold`}
            >
              {getInitials(creator.fullName)}
            </div>
          )}
        </div>

        {/* Instagram-style blue verification tick */}
        <div className="absolute -bottom-0.5 right-[calc(50%-44px)] bg-background rounded-full p-0.5 shadow-sm">
          <svg className="w-5 h-5 text-[#0095F6] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      {/* Name and Handle */}
      <div className="mb-2">
        <h3 className="font-serif font-black text-base text-slate-800 dark:text-white leading-snug truncate max-w-[170px] mx-auto group-hover:text-[#e6683c] transition-colors">
          {creator.fullName}
        </h3>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-[170px] mx-auto">
          @{creator.instagramHandle}
        </p>
        {isPartner ? (
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C59A2E]/15 to-emerald-500/15 border border-[#C59A2E]/30 text-[8px] font-black text-[#A8821E] dark:text-[#C59A2E] uppercase tracking-widest">
            Official Partner
          </span>
        ) : (
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Verified Member
          </span>
        )}
      </div>

      {/* Compact info row */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 text-[9px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
          {creator.niche}
        </span>
        {creator.followerCount > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
            <Users className="w-3 h-3 text-slate-400" />
            {formatFollowerCount(creator.followerCount)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto pt-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onViewProfile(creator)
          }}
          className="w-full py-2.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          View Profile
        </button>
      </div>
    </div>
  )
}
