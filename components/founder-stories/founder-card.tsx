"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Founder } from "@/lib/founders/types"
import { getCountryFlag } from "@/lib/founders/data"
import { useState } from "react"

export function FounderCard({ founder }: { founder: Founder }) {
  const [imageFailed, setImageFailed] = useState(false)
  const cardImg = founder.cardImage || founder.imageUrl
  const flag = getCountryFlag(founder.country || founder.countryCode)

  return (
    <Link href={`/founder-stories/${founder.slug}`} className="group block h-full">
      <article className="flex flex-col h-full rounded-2xl bg-card border border-border hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
        <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden">
          {!imageFailed ? (
            <>
              <Image
                src={cardImg}
                alt={`${founder.name}, ${founder.role} of ${founder.company} — UpForge Verified Founder`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageFailed(true)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-black"
              style={{ background: founder.accent || "#DC2626" }}
            >
              {founder.initials}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 border border-zinc-700 rounded backdrop-blur-xs">
              {founder.category || founder.company}
            </span>
            {founder.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-black/80 px-2 py-1 rounded border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-serif text-xl sm:text-2xl font-black group-hover:text-amber-300 transition-colors leading-tight">
              {founder.name}
            </h3>
            <p className="font-mono text-xs uppercase tracking-wider text-amber-300 font-semibold mt-1">
              {founder.role} • {founder.company}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-serif italic line-clamp-3">
            "{founder.oneLiner || founder.deck || founder.headline}"
          </p>

          <div className="pt-3.5 border-t border-border flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <span>{flag}</span>
              <span>{founder.city || founder.country || "San Francisco"}</span>
            </span>
            <span className="text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
              Read Story <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

