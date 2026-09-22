// components/LoadingSkeletons.tsx
// UpForge Design System — Forbes-grade editorial loading skeletons
// GPU-cheap shimmer (transform/opacity only), brand-aware borders, zero layout shift

import React from "react"
import { cn } from "@/lib/utils"

// ─── Core Shimmer Primitive ───────────────────────────────────────────────────
// Single source of truth for the transform-based GPU shimmer animation.
export function Shimmer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm bg-muted/70 dark:bg-muted/40",
        "after:absolute after:inset-0",
        "after:bg-gradient-to-r after:from-transparent after:via-white/20 after:dark:via-white/10 after:to-transparent",
        "after:translate-x-[-100%] after:animate-shimmer",
        "motion-reduce:after:hidden motion-reduce:animate-none",
        className
      )}
      style={style}
    />
  )
}

// ─── Form Skeleton ────────────────────────────────────────────────────────────
export function FormSkeleton() {
  return (
    <div className="space-y-7" aria-busy="true" aria-label="Loading form…">
      {/* Field Label + Input */}
      {[20, 28, 16].map((labelW, i) => (
        <div key={i} className="space-y-2.5">
          <Shimmer className={`h-3 w-${labelW}`} />
          <Shimmer className="h-11 w-full rounded-xl border border-border/70" />
        </div>
      ))}

      {/* Two-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[16, 14].map((w, i) => (
          <div key={i} className="space-y-2.5">
            <Shimmer className={`h-3 w-${w}`} />
            <Shimmer className="h-11 w-full rounded-xl border border-border/70" />
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div className="space-y-2.5">
        <Shimmer className="h-3 w-32" />
        <Shimmer className="h-32 w-full rounded-xl border border-border/70" />
      </div>

      {/* Helper text row */}
      <div className="flex items-center gap-3">
        <Shimmer className="h-3 w-3 rounded-full shrink-0" />
        <Shimmer className="h-3 w-48" />
      </div>

      {/* CTA Button */}
      <Shimmer className="h-12 w-full rounded-xl" />
    </div>
  )
}

// ─── Card Skeleton ────────────────────────────────────────────────────────────
export function CardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={cn(
        "group relative border-2 border-border/70 bg-card/60 rounded-2xl p-5 shadow-sm transition-colors",
        featured && "border-amber-500/40 bg-amber-500/5"
      )}
      aria-hidden="true"
    >
      {/* Top badge row */}
      <div className="flex items-center gap-2 mb-4">
        <Shimmer className="h-5 w-16 rounded-full" />
        {featured && <Shimmer className="h-5 w-20 rounded-full" />}
      </div>

      {/* Title — two lines, second shorter */}
      <div className="space-y-2 mb-3">
        <Shimmer className="h-5 w-[82%]" />
        <Shimmer className="h-5 w-[55%]" />
      </div>

      {/* Description */}
      <div className="space-y-1.5 mb-5">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-[90%]" />
        <Shimmer className="h-3 w-[73%]" />
      </div>

      {/* Divider + meta */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <Shimmer className="h-6 w-6 rounded-full shrink-0" />
          <Shimmer className="h-3 w-20" />
        </div>
        <Shimmer className="h-3 w-14" />
      </div>
    </div>
  )
}

// ─── Registry Grid Skeleton ───────────────────────────────────────────────────
export function RegistryGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-busy="true"
      aria-label="Loading registry index…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 35}ms` }}>
          <CardSkeleton featured={i === 0} />
        </div>
      ))}
    </div>
  )
}

// ─── Blog Card Skeleton ───────────────────────────────────────────────────────
export function BlogCardSkeleton() {
  return (
    <div className="border-2 border-border/70 bg-card/60 rounded-2xl p-6 shadow-sm" aria-hidden="true">
      {/* Category chip + date */}
      <div className="flex items-center gap-3 mb-4">
        <Shimmer className="h-5 w-20 rounded-full" />
        <Shimmer className="h-3 w-24" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-3">
        <Shimmer className="h-6 w-full" />
        <Shimmer className="h-6 w-[68%]" />
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5 mb-5">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-[88%]" />
        <Shimmer className="h-3 w-[62%]" />
      </div>

      {/* Author + read time */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <Shimmer className="h-7 w-7 rounded-full shrink-0" />
        <Shimmer className="h-3 w-28" />
        <div className="ml-auto">
          <Shimmer className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

// ─── Blog Grid Skeleton ───────────────────────────────────────────────────────
export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-busy="true"
      aria-label="Loading editorial articles…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 45}ms` }}>
          <BlogCardSkeleton />
        </div>
      ))}
    </div>
  )
}

// ─── Featured Hero Blog Skeleton ──────────────────────────────────────────────
export function BlogHeroSkeleton() {
  return (
    <div
      className="border-2 border-border/70 bg-card/60 rounded-3xl p-6 md:p-8 md:grid md:grid-cols-5 md:gap-8 shadow-sm"
      aria-hidden="true"
    >
      {/* Text column */}
      <div className="md:col-span-3 flex flex-col justify-between space-y-5">
        <div className="flex items-center gap-3">
          <Shimmer className="h-5 w-20 rounded-full" />
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-3 w-16" />
        </div>
        <div className="space-y-3">
          <Shimmer className="h-9 w-full" />
          <Shimmer className="h-9 w-[85%]" />
          <Shimmer className="h-9 w-[60%]" />
        </div>
        <div className="space-y-2">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-[90%]" />
          <Shimmer className="h-4 w-[75%]" />
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <Shimmer className="h-8 w-8 rounded-full shrink-0" />
          <Shimmer className="h-3 w-32" />
          <div className="ml-auto">
            <Shimmer className="h-3 w-20" />
          </div>
        </div>
      </div>
      {/* Hero Image placeholder column */}
      <div className="hidden md:block md:col-span-2 mt-4 md:mt-0">
        <Shimmer className="h-full min-h-[240px] w-full rounded-2xl" />
      </div>
    </div>
  )
}

// ─── Blog Post Skeleton ──────────────────────────────────────────────────────
export function BlogPostSkeleton() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-12"
      aria-busy="true"
      aria-label="Loading article…"
    >
      <Shimmer className="h-5 w-24 rounded-full mb-5" />
      <div className="space-y-3 mb-6">
        <Shimmer className="h-10 w-full" />
        <Shimmer className="h-10 w-[88%]" />
        <Shimmer className="h-10 w-[62%]" />
      </div>
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/60">
        <Shimmer className="h-9 w-9 rounded-full shrink-0" />
        <div className="space-y-1.5">
          <Shimmer className="h-3.5 w-32" />
          <Shimmer className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {[100, 100, 92, 100, 78, 100, 85, 68].map((w, i) => (
          <Shimmer key={i} className={`h-4 w-[${w}%]`} />
        ))}
      </div>
    </div>
  )
}

// ─── Startup Profile Skeleton ─────────────────────────────────────────────────
export function StartupProfileSkeleton() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12 space-y-10"
      aria-busy="true"
      aria-label="Loading startup profile…"
    >
      {/* Hero header */}
      <div className="flex items-start gap-6 border-2 border-border/70 bg-card/60 p-6 rounded-3xl">
        <Shimmer className="w-20 h-20 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-3">
          <Shimmer className="h-8 w-[70%]" />
          <Shimmer className="h-4 w-[50%]" />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Shimmer className="h-6 w-24 rounded-full" />
            <Shimmer className="h-6 w-20 rounded-full" />
            <Shimmer className="h-6 w-28 rounded-full" />
          </div>
        </div>
        <Shimmer className="hidden sm:block h-10 w-32 rounded-xl shrink-0" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border/60">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 text-center">
            <Shimmer className="h-7 w-20 mx-auto" />
            <Shimmer className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>

      {/* About section */}
      <div className="space-y-3 border-2 border-border/70 bg-card/60 p-6 rounded-2xl">
        <Shimmer className="h-6 w-36" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-[95%]" />
        <Shimmer className="h-4 w-[88%]" />
        <Shimmer className="h-4 w-[72%]" />
      </div>

      {/* Provenance Record List */}
      <div className="space-y-4">
        <Shimmer className="h-6 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border/60 p-4 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <Shimmer className="h-4 w-32" />
                <Shimmer className="h-3 w-48" />
              </div>
              <Shimmer className="h-6 w-20 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Comparison Matrix Skeleton (NEW) ──────────────────────────────────────────
export function ComparisonSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8" aria-busy="true" aria-label="Loading comparison matrix…">
      {/* Title & subtitle */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Shimmer className="h-4 w-28 mx-auto rounded-full" />
        <Shimmer className="h-9 w-full mx-auto" />
        <Shimmer className="h-4 w-[80%] mx-auto" />
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((col) => (
          <div key={col} className="border-2 border-border/70 bg-card/60 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Shimmer className="w-14 h-14 rounded-2xl shrink-0" />
              <div className="space-y-2 flex-1">
                <Shimmer className="h-6 w-40" />
                <Shimmer className="h-3 w-28" />
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-border/50">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/40">
                  <Shimmer className="h-3.5 w-32" />
                  <Shimmer className="h-4 w-20 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Founder Story Profile Skeleton (NEW) ──────────────────────────────────────
export function FounderProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10" aria-busy="true" aria-label="Loading founder chronicle profile…">
      <div className="grid lg:grid-cols-12 gap-8 items-start border-2 border-border/70 bg-card/60 rounded-3xl p-6 sm:p-8">
        {/* Left: Aspect 4/5 portrait */}
        <div className="lg:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border border-border/60">
          <Shimmer className="w-full h-full" />
        </div>
        {/* Right: Editorial Pull Quote & Bio */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <Shimmer className="h-5 w-28 rounded-full" />
            <Shimmer className="h-3 w-32" />
          </div>
          <Shimmer className="h-10 w-[85%]" />
          <Shimmer className="h-6 w-[60%]" />
          <div className="border-l-4 border-amber-500/40 p-4 space-y-2">
            <Shimmer className="h-5 w-full" />
            <Shimmer className="h-5 w-[90%]" />
          </div>
          <div className="space-y-3 pt-4">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-[95%]" />
            <Shimmer className="h-4 w-[80%]" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── UFRN Certificate Credential Skeleton (NEW) ───────────────────────────────
export function CertificateSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12" aria-busy="true" aria-label="Loading UFRN credential certificate…">
      <div className="border-2 border-border/80 bg-card/80 rounded-3xl p-8 space-y-8 shadow-md">
        <div className="flex items-center justify-between border-b border-border/60 pb-6">
          <div className="space-y-2">
            <Shimmer className="h-4 w-28 rounded-full" />
            <Shimmer className="h-7 w-48" />
          </div>
          <Shimmer className="w-16 h-16 rounded-full shrink-0" />
        </div>
        <div className="space-y-4">
          <Shimmer className="h-8 w-[75%] mx-auto" />
          <Shimmer className="h-4 w-[60%] mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/60">
          <div className="space-y-2 text-center">
            <Shimmer className="h-3 w-20 mx-auto" />
            <Shimmer className="h-5 w-32 mx-auto" />
          </div>
          <div className="space-y-2 text-center">
            <Shimmer className="h-3 w-20 mx-auto" />
            <Shimmer className="h-5 w-32 mx-auto" />
          </div>
        </div>
        <Shimmer className="h-10 w-44 mx-auto rounded-xl" />
      </div>
    </div>
  )
}

// ─── Creator Directory Grid Skeleton (NEW) ─────────────────────────────────────
export function CreatorGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading creator partner directory…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-2 border-border/70 bg-card/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-4">
            <Shimmer className="w-12 h-12 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Shimmer className="h-4 w-32" />
              <Shimmer className="h-3 w-20" />
            </div>
            <Shimmer className="h-5 w-16 rounded-full shrink-0" />
          </div>
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-[85%]" />
          <div className="flex justify-between pt-3 border-t border-border/50">
            <Shimmer className="h-3 w-24" />
            <Shimmer className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Research & Insights Skeleton (NEW) ───────────────────────────────────────
export function ResearchInsightsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8" aria-busy="true" aria-label="Loading research intelligence…">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <Shimmer className="h-4 w-32 mx-auto rounded-full" />
        <Shimmer className="h-9 w-full" />
        <Shimmer className="h-4 w-[75%] mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-2 border-border/70 bg-card/60 rounded-2xl p-6 space-y-4">
            <Shimmer className="h-5 w-24 rounded-full" />
            <Shimmer className="h-6 w-full" />
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-[80%]" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FAQ Accordion Skeleton (NEW) ─────────────────────────────────────────────
export function AccordionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="max-w-3xl mx-auto space-y-4" aria-busy="true" aria-label="Loading FAQ questions…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-2 border-border/70 bg-card/60 rounded-xl p-4 flex items-center justify-between">
          <Shimmer className="h-4 w-[75%]" />
          <Shimmer className="h-5 w-5 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  )
}

// ─── Docs Reader Skeleton (NEW) ───────────────────────────────────────────────
export function DocsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8" aria-busy="true" aria-label="Loading documentation…">
      <div className="hidden md:block space-y-3 border-r border-border/60 pr-6">
        <Shimmer className="h-4 w-28 mb-4" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Shimmer key={i} className="h-3.5 w-full rounded-md" />
        ))}
      </div>
      <div className="md:col-span-3 space-y-6">
        <Shimmer className="h-8 w-[60%]" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-[90%]" />
        <div className="border-2 border-border/70 bg-muted/40 p-6 rounded-2xl space-y-3">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-[85%]" />
        </div>
      </div>
    </div>
  )
}

// ─── Table Row & Table Skeleton ──────────────────────────────────────────────
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  const colWidths = ["w-8", "flex-1", "w-28", "w-20", "w-16"]
  return (
    <div className="flex items-center gap-5 py-4 border-b border-border/50" aria-hidden="true">
      {Array.from({ length: cols }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn(
            "h-4 shrink-0",
            i === 1 ? "flex-1" : colWidths[i] ?? "w-20"
          )}
        />
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 8, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="border-2 border-border/70 bg-card/60 rounded-2xl p-5" aria-busy="true" aria-label="Loading data table…">
      {/* Header */}
      <div className="flex items-center gap-5 py-3 mb-1 border-b-2 border-foreground/80">
        {Array.from({ length: cols }).map((_, i) => (
          <Shimmer
            key={i}
            className={cn("h-3 shrink-0", i === 1 ? "flex-1" : "w-20")}
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ opacity: 1 - i * (0.4 / rows) }}>
          <TableRowSkeleton cols={cols} />
        </div>
      ))}
    </div>
  )
}

// ─── Dashboard Skeleton ──────────────────────────────────────────────────────
export function DashboardSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading dashboard…">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-2 border-border/70 bg-card/60 rounded-2xl p-5 space-y-3">
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-8 w-28" />
            <Shimmer className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="border-2 border-border/70 bg-card/60 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Shimmer className="h-5 w-32" />
          <div className="flex gap-2">
            {[10, 12, 10].map((w, i) => (
              <Shimmer key={i} className={`h-7 w-${w} rounded-md`} />
            ))}
          </div>
        </div>
        {/* Fake bar chart */}
        <div className="flex items-end gap-2 h-40 pt-4">
          {[60, 80, 45, 95, 70, 55, 85, 40, 75, 90, 65, 50].map((h, i) => (
            <Shimmer
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Activity Feed & Search Results Skeletons ─────────────────────────────────
export function ActivityFeedSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading activity feed…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-4 border border-border/60 bg-card/60 rounded-xl">
          <Shimmer className="h-9 w-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3.5 w-28" />
            <Shimmer className="h-3 w-[88%]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SearchResultsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading search results…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="py-4 border-b border-border/60 space-y-2">
          <Shimmer className="h-3 w-36" />
          <Shimmer className="h-5 w-[75%]" />
          <Shimmer className="h-3.5 w-full" />
        </div>
      ))}
    </div>
  )
}

// ─── Sidebar & Page Header Skeletons ─────────────────────────────────────────
export function SidebarSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="border-2 border-border/70 bg-card/60 rounded-2xl p-5 space-y-4">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-[80%]" />
        <Shimmer className="h-9 w-full rounded-xl mt-1" />
      </div>
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="text-center py-12 space-y-4" aria-hidden="true">
      <Shimmer className="h-4 w-24 rounded-full mx-auto" />
      <div className="space-y-3">
        <Shimmer className="h-10 w-[72%] mx-auto" />
        <Shimmer className="h-10 w-[52%] mx-auto" />
      </div>
      <div className="space-y-2 pt-1">
        <Shimmer className="h-4 w-[55%] mx-auto" />
        <Shimmer className="h-4 w-[40%] mx-auto" />
      </div>
    </div>
  )
}

export function FullPageSkeleton({ variant = "registry" }: { variant?: "registry" | "blog" }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <PageHeaderSkeleton />
      {variant === "blog" ? (
        <div className="space-y-8">
          <BlogHeroSkeleton />
          <BlogGridSkeleton count={6} />
        </div>
      ) : (
        <RegistryGridSkeleton count={12} />
      )}
    </div>
  )
}
