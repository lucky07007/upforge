"use client"

import { useState } from "react"  
import Link from "next/link"
import { Globe } from "lucide-react"
import { Founder } from "@/lib/founders/types"
import { FounderCard } from "./founder-card"

interface CountryItem {
  name: string
  slug: string
  code: string
  count: number
  flag: string
}

interface CountryFilterSectionProps {
  countries: CountryItem[]
  founders: Founder[]
}

export function CountryFilterSection({ countries, founders }: CountryFilterSectionProps) {
  const [selectedCountrySlug, setSelectedCountrySlug] = useState<string>("all")

  // Filter founders based on selected country
  const filteredFounders = selectedCountrySlug === "all"
    ? founders
    : founders.filter(f => {
        const cSlug = f.country
          ?.toLowerCase()
          .replace(/&/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        return cSlug === selectedCountrySlug || f.countryCode?.toLowerCase() === selectedCountrySlug
      })

  const totalProfiles = founders.length
  const selectedCountryObj = countries.find(c => c.slug === selectedCountrySlug)

  return (
    <div className="space-y-8">
      {/* Sleek Professional Country Filter Bar */}
      <section className="p-4 sm:p-5 rounded-2xl bg-card/70 border border-border/80 shadow-xs backdrop-blur-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 px-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Globe className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                Filter By Country
              </h2>
              <p className="text-[11px] font-mono text-muted-foreground">
                Verified Global Leaders Across {countries.length} Key Hubs
              </p>
            </div>
          </div>

          <span className="font-mono text-xs text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border">
            {filteredFounders.length} {filteredFounders.length === 1 ? 'Profile' : 'Profiles'} {selectedCountrySlug !== 'all' && `in ${selectedCountryObj?.name}`}
          </span>
        </div>

        {/* Executive Country Pills */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            <button
              onClick={() => setSelectedCountrySlug("all")}
              className={`shrink-0 px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 snap-start flex items-center gap-2 cursor-pointer ${
                selectedCountrySlug === "all"
                  ? "bg-amber-500 text-black font-bold border border-amber-500 shadow-sm"
                  : "bg-background border border-border text-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 font-medium"
              }`}
            >
              <span>🌐</span>
              <span>All Countries</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCountrySlug === "all" ? 'bg-black/20 text-black font-bold' : 'bg-muted text-muted-foreground'}`}>
                {totalProfiles}
              </span>
            </button>

            {countries.map((c) => {
              const isSelected = selectedCountrySlug === c.slug
              return (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCountrySlug(c.slug)}
                  className={`shrink-0 px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 snap-start flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-black font-bold border border-amber-500 shadow-sm"
                      : "bg-background border border-border text-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 font-medium"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-black/20 text-black font-bold' : 'bg-muted text-muted-foreground'}`}>
                    {c.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founders Grid Index */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            {selectedCountrySlug !== "all" && <span>{selectedCountryObj?.flag}</span>}
            <span>{selectedCountrySlug === "all" ? "All Verified Founders" : `${selectedCountryObj?.name} Founders`}</span>
          </h2>
          <div className="flex-1" />
          <span className="font-mono text-xs text-muted-foreground">
            {filteredFounders.length} Profile{filteredFounders.length === 1 ? '' : 's'}
          </span>
        </div>

        {filteredFounders.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFounders.map((f) => (
              <FounderCard key={f.id} founder={f} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <p className="font-serif text-lg text-muted-foreground">No founder stories found for this country.</p>
            <button 
              onClick={() => setSelectedCountrySlug("all")}
              className="mt-4 px-4 py-2 bg-amber-500 text-black font-mono text-xs font-bold rounded-full hover:bg-amber-400 transition-colors cursor-pointer"
            >
              View All Founder Profiles
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
