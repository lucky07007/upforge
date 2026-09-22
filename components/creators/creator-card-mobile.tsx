// components/creators/creator-card-mobile.tsx
"use client"

import { SheetCreator, formatFollowerCount } from "@/lib/sheets"
import { Users, ShieldCheck } from "lucide-react"

interface CreatorCardMobileProps {
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

export function CreatorCardMobile({
  creator,
  isPromoted = false,
  onViewProfile,
}: CreatorCardMobileProps) {
  const gradient = getGradient(creator.instagramHandle)
  const isPartner = creator.isPartner

  const ringClass = isPartner
    ? "ring-2 ring-[#C59A2E]"
    : isPromoted
    ? "ring-2 ring-amber-400"
    : "ring-2 ring-slate-200 dark:ring-slate-700"

  return (
    <div
      onClick={() => onViewProfile(creator)}
      className="group relative bg-card/90 dark:bg-card/70 border border-border/80 hover:border-amber-500/60 rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-md select-none"
    >
      <style jsx>{`
        @keyframes partnerRingGlowM {
          0%, 100% {
            box-shadow: 0 0 5px 1px rgba(197, 154, 46, 0.55), 0 0 10px 2px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 9px 2px rgba(197, 154, 46, 0.9), 0 0 16px 4px rgba(34, 197, 94, 0.55);
          }
        }
        @keyframes vBadgePulseM {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .partner-glow-m {
          animation: partnerRingGlowM 2s ease-in-out infinite;
        }
        .v-badge-m {
          animation: vBadgePulseM 1.6s ease-in-out infinite;
        }
      `}</style>


      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-2 flex justify-center">
          <div
            className={`w-14 h-14 rounded-full overflow-hidden ${ringClass} ${
              isPartner ? "partner-glow-m" : ""
            } ring-offset-2 ring-offset-background`}
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
                    parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-sm font-bold">${getInitials(
                      creator.fullName
                    )}</div>`
                  }
                }}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-sm font-bold`}
              >
                {getInitials(creator.fullName)}
              </div>
            )}
          </div>

          <div className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5 shadow-sm">
            <svg className="w-4 h-4 text-[#0095F6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-serif font-black text-xs text-slate-800 dark:text-white leading-tight truncate px-1 w-full">
          {creator.fullName}
        </h3>
        <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 truncate px-1 mt-0.5 w-full">
          @{creator.instagramHandle}
        </p>

        {isPartner ? (
          <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#C59A2E]/15 to-emerald-500/15 border border-[#C59A2E]/30 text-[7px] font-black text-[#A8821E] dark:text-[#C59A2E] uppercase tracking-widest">
            Official Partner
          </span>
        ) : (
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {creator.niche}
          </span>
        )}

        {creator.followerCount > 0 && (
          <div className="flex items-center gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 mt-1.5">
            <Users className="w-3 h-3 text-slate-400" />
            <span>{formatFollowerCount(creator.followerCount)}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onViewProfile(creator)
          }}
          className="w-full py-2 rounded-lg text-[9.5px] font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1 active:scale-95 touch-manipulation cursor-pointer"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          View Profile
        </button>
      </div>
    </div>
  )
}
