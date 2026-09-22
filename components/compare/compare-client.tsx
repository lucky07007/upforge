"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal, X, ArrowRight, ArrowUpDown, TrendingUp, Clock, GitCompare, Layers, Check } from "lucide-react"

interface Comparison {
  name: string; slug: string; category: string; description: string
  item1: string; item2: string; image: string; color: string
}

type SortOption = "default" | "name" | "category"

export function CompareClient({ comparisons, categories }: { comparisons: Comparison[]; categories: string[] }) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [filterOpen, setFilterOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  // Filter + Sort
  const filtered = comparisons
    .filter(comp => {
      const q = query.toLowerCase().trim()
      const matchesQuery = q.length < 2 || 
        comp.name.toLowerCase().includes(q) ||
        comp.item1.toLowerCase().includes(q) ||
        comp.item2.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q)
      const matchesCategory = activeCategory === "All" || comp.category === activeCategory
      return matchesQuery && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "category") return a.category.localeCompare(b.category)
      return 0
    })

  const activeFilterCount = (activeCategory !== "All" ? 1 : 0) + (sortBy !== "default" ? 1 : 0)

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* MASTHEAD */}
        <section className="border-b-2 border-foreground pb-4 pt-6 flex flex-col items-center text-center w-full">
          <div className="flex items-center gap-2 mb-3">
            <GitCompare className="w-4 h-4 text-[#C59A2E]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C59A2E] font-mono">
              {comparisons.length} In-Depth Analyses
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.08] text-foreground mb-3 max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
            Tool & Startup Comparisons
          </h1>
          <p className="font-serif italic text-base md:text-lg text-muted-foreground max-w-2xl">
            Data-driven side-by-side comparisons to help you choose the right tools.
          </p>
        </section>

        {/* TOOLBAR - Clean & Minimal */}
        <section className="sticky top-0 z-30 bg-background py-4 border-b border-border">
          <div className="flex items-center gap-3">
            
            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search comparisons..."
                className="w-full h-9 pl-10 pr-8 bg-background border border-border text-foreground placeholder:text-muted-foreground font-serif italic text-sm focus:outline-none focus:border-[#C59A2E] transition-colors"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter button */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 h-9 px-4 border font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeFilterCount > 0
                  ? "border-[#C59A2E] bg-[#C59A2E]/5 text-[#C59A2E]"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#C59A2E] text-white w-4 h-4 rounded-full text-[8px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Results count */}
            <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider hidden sm:block ml-auto">
              {filtered.length} of {comparisons.length}
            </span>
          </div>

          {/* Filter Panel - Clean Dropdown */}
          {filterOpen && (
            <div className="mt-3 p-4 border border-border bg-background animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-wrap items-center gap-6">
                
                {/* Categories */}
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground font-mono mb-2 block">
                    Category
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => setActiveCategory("All")}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 border transition-all ${
                        activeCategory === "All"
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 border transition-all ${
                          activeCategory === cat
                            ? "border-[#C59A2E] bg-[#C59A2E]/5 text-[#C59A2E]"
                            : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground font-mono mb-2 block">
                    Sort By
                  </span>
                  <div className="flex items-center gap-1.5">
                    {([
                      { label: "Default", value: "default" as SortOption, icon: Clock },
                      { label: "A-Z", value: "name" as SortOption, icon: ArrowUpDown },
                      { label: "Category", value: "category" as SortOption, icon: Layers }
                    ]).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 border transition-all ${
                          sortBy === opt.value
                            ? "border-[#C59A2E] bg-[#C59A2E]/5 text-[#C59A2E]"
                            : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        <opt.icon className="w-3 h-3" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => { setActiveCategory("All"); setSortBy("default") }}
                    className="text-[9px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600 font-mono"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* RESULTS */}
        <section className="py-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-serif text-lg text-muted-foreground">No comparisons found</p>
              <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="text-xs text-[#C59A2E] uppercase tracking-wider font-mono mt-2 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 md:gap-6">
              {filtered.map((comp) => (
                <Link
                  key={comp.slug}
                  href={comp.slug}
                  className="group flex flex-col sm:flex-row items-start gap-5 sm:gap-6 pb-5 md:pb-6 border-b border-border/60 last:border-0 transition-all duration-300 hover:translate-x-[2px]"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 bg-muted overflow-hidden border border-border relative">
                    <Image
                      src={comp.image}
                      alt={comp.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="text-[7px] font-black uppercase tracking-wider bg-background/90 backdrop-blur-sm px-1.5 py-0.5 border border-border">
                        {comp.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center flex-1 py-0.5 min-w-0">
                    <span className="font-sans font-black text-[9px] uppercase tracking-[0.15em] text-[#C59A2E] mb-1.5">
                      {comp.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[1.5rem] leading-snug text-foreground mb-2 group-hover:text-[#C59A2E] transition-colors">
                      {comp.name}
                    </h3>
                    <p className="font-serif text-[13px] sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                      {comp.description}
                    </p>
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-sans font-bold text-[10px] sm:text-[11px] text-foreground">
                        {comp.item1} <span className="mx-1.5 text-muted-foreground">vs</span> {comp.item2}
                      </span>
                      <span className="font-sans text-[10px] text-[#C59A2E] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        · Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* BOTTOM */}
        <section className="py-8 text-center border-t border-border">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 font-sans font-bold text-[11px] uppercase tracking-widest text-foreground border-2 border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            Explore Research <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </div>
  )
}
