// app/compare/compare-client.tsx
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Search, X, ShieldCheck, Filter, Flame } from "lucide-react"

interface Comparison {
  name: string
  slug: string
  category: string
  description: string
  item1: string
  item2: string
  image: string
  color: string
  readTime: string
  verdict: string
  featured?: boolean
  trending?: boolean
}

interface CompareClientProps {
  comparisons: Comparison[]
  categories: string[]
}

const ITEMS_PER_PAGE = 12

// Image component with fallback
function CardImage({ src, alt, color, item1, item2 }: { src: string; alt: string; color: string; item1: string; item2: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center p-2 relative overflow-hidden"
        style={{ backgroundColor: color + "12" }}
      >
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-sm"
          style={{ backgroundColor: color + "25", color: color }}
        >
          VS
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}

export function CompareClient({ comparisons, categories }: CompareClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("trending")
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  const filteredComparisons = useMemo(() => {
    let results = comparisons

    if (selectedCategory !== "All") {
      results = results.filter(comp => comp.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      results = results.filter(
        comp =>
          comp.name.toLowerCase().includes(query) ||
          comp.item1.toLowerCase().includes(query) ||
          comp.item2.toLowerCase().includes(query) ||
          comp.category.toLowerCase().includes(query) ||
          comp.description.toLowerCase().includes(query) ||
          comp.verdict.toLowerCase().includes(query)
      )
    }

    if (sortBy === "trending") {
      results = [...results].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
    } else if (sortBy === "name") {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "readTime") {
      results = [...results].sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime))
    }

    return results
  }, [comparisons, selectedCategory, searchQuery, sortBy])

  const totalPages = Math.ceil(filteredComparisons.length / ITEMS_PER_PAGE)
  const paginatedComparisons = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredComparisons.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredComparisons, currentPage])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const resetAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("trending")
    setCurrentPage(1)
  }

  const activeFilterCount = (selectedCategory !== "All" ? 1 : 0) + (searchQuery ? 1 : 0) + (sortBy !== "trending" ? 1 : 0)
  const allCategories = ["All", ...categories]

  return (
    <>
      <Navbar />
      
      {/* ── Header Hero Section ── */}
      <div className="relative border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-2xl py-12 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-primary px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20">
                Independent Tool Intelligence
              </span>
            </div>
            <h1 className="mast-h1 text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
              Tool & Framework Comparisons
            </h1>
            <p className="mast-tagline text-base md:text-lg text-muted-foreground max-w-2xl font-light">
              Side-by-side analysis of developer tools, AI models, cloud platforms, and SaaS products benchmarked for performance and cost.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-[var(--glass-border)] flex flex-col gap-2 min-w-[220px]">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Comparisons</span>
            <span className="text-4xl font-mono font-bold text-accent-gold text-glow">{comparisons.length.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ── Search Toolbar & Sticky Filter Bar ── */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          
          <div className="relative" id="search-wrapper">
            <form onSubmit={(e) => e.preventDefault()} className="relative group" id="search-form">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent-primary transition-colors pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                id="search-input"
                className="w-full bg-muted/40 border border-[var(--glass-border)] rounded-full pl-12 pr-36 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all font-light"
                placeholder={`Search ${comparisons.length} records by tool, category, or verdict...`}
                aria-label="Search tool comparisons"
                autoComplete="off"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-accent-primary hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-6 rounded-full transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                >
                  Search
                </button>
              )}
            </form>
          </div>

          {/* Filter toggle & Sort Toolbar */}
          <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
            <button
              type="button"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              aria-expanded={showFilterPanel}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilterCount > 0
                  ? "border-accent-gold text-accent-gold bg-accent-gold/10"
                  : "border-[var(--glass-border)] text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent-gold text-black rounded-full px-2 py-0.5 text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort options */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
              <span className="text-xs text-muted-foreground font-medium mr-1 hidden sm:inline">Sort:</span>
              {[
                { label: "Trending", val: "trending" },
                { label: "A–Z",      val: "name"     },
                { label: "Quick Read", val: "readTime" },
              ].map(s => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => { setSortBy(s.val); setCurrentPage(1) }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    sortBy === s.val
                      ? "bg-accent-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-accent-gold hover:bg-accent-gold/10 transition-colors flex items-center gap-1 ml-2 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Slide-down Filter Panel */}
          {showFilterPanel && (
            <div className="bg-card border border-[var(--glass-border)] rounded-2xl p-5 mt-4 shadow-lg flex flex-wrap gap-4 items-end animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                >
                  {allCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort Order</label>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
                  className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                >
                  <option value="trending">Trending First</option>
                  <option value="name">Alphabetical (A–Z)</option>
                  <option value="readTime">Shortest Read Time</option>
                </select>
              </div>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="h-10 bg-accent-gold hover:bg-amber-600 text-black font-bold uppercase tracking-wider text-xs px-5 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* Results Stream */}
        <div className="lg:col-span-8">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--glass-border)]">
            <h2 className="results-q text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory !== "All"
                ? `${selectedCategory} Directory`
                : "Verified Directory"}
            </h2>
            <span className="text-xs text-muted-foreground">
              Showing {paginatedComparisons.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredComparisons.length)} of {filteredComparisons.length.toLocaleString()}
            </span>
          </div>

          {/* Directory Cards Stream (Separated Horizontal Floating Cards) */}
          {paginatedComparisons.length > 0 ? (
            <div className="space-y-4">
              {paginatedComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={comp.slug}
                  className="glass-card group flex flex-col sm:flex-row items-start sm:items-center p-5 gap-6 rounded-2xl border border-[var(--glass-border)] bg-card shadow-sm hover:shadow-md transition-all hover:border-accent-primary/50"
                >
                  <div className="w-16 h-16 rounded-xl bg-muted/40 border border-[var(--glass-border)] flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-accent-primary/50 transition-colors">
                    <CardImage 
                      src={comp.image} 
                      alt={`${comp.item1} vs ${comp.item2}`} 
                      color={comp.color}
                      item1={comp.item1}
                      item2={comp.item2}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent-primary transition-colors truncate">
                        {comp.item1} vs {comp.item2}
                      </h3>
                      {comp.category && (
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent-primary border border-accent-primary/20 px-2.5 py-0.5 rounded-full bg-accent-primary/10">
                          {comp.category}
                        </span>
                      )}
                      {comp.trending && (
                        <span className="text-[10px] uppercase tracking-widest font-bold text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded-full bg-red-500/10 flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-red-500" /> Trending
                        </span>
                      )}
                      {comp.verdict && (
                        <span className="text-[10px] font-mono font-bold text-accent-gold border border-accent-gold/20 px-2 py-0.5 rounded-full bg-accent-gold/10">
                          {comp.verdict}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {comp.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-1 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" /> Verified Benchmark
                      </span>
                      <span>{comp.readTime} read</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full border border-[var(--glass-border)] items-center justify-center group-hover:bg-accent-primary group-hover:text-white text-muted-foreground transition-all">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-[var(--glass-border)]">
              <span className="text-4xl text-muted-foreground mb-4 block">∅</span>
              <h3 className="text-xl font-bold text-foreground mb-2">No comparisons found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or clear the filters to see all comparison benchmarks.</p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-block bg-accent-primary text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[var(--glass-border)]">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--glass-border)] transition-colors ${
                  currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/40 hover:text-foreground'
                } text-muted-foreground cursor-pointer`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-full transition-all cursor-pointer ${
                    p === currentPage
                      ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'border border-[var(--glass-border)] text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[var(--glass-border)] transition-colors ${
                  currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/40 hover:text-foreground'
                } text-muted-foreground cursor-pointer`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card 1: Benchmark Request */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden text-center bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-2xl pointer-events-none" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent-gold mb-2 relative z-10">Benchmark Request</h3>
            <h4 className="text-xl font-bold text-foreground mb-3 relative z-10">Request a tool comparison</h4>
            <p className="text-xs text-muted-foreground mb-5 relative z-10">Need an in-depth side-by-side evaluation of two tech stack options? Submit your request.</p>
            <Link
              href="/submit"
              className="inline-block bg-foreground text-background font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-accent-gold hover:text-white transition-colors relative z-10 shadow-sm"
            >
              Submit Request →
            </Link>
          </div>

          {/* Card 2: Compare Intelligence */}
          <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Compare Intelligence</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-foreground">Verified Benchmarks</span>
                <span className="text-sm font-bold text-accent-primary">100%</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-foreground">Access Pricing</span>
                <span className="text-sm font-bold text-accent-primary">Free forever</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-foreground">Authority Trust</span>
                <span className="text-sm font-bold text-accent-gold">UpForge Certified</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Explore Categories */}
          {categories.length > 0 && (
            <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Explore Categories</h3>
              <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto pr-1">
                {categories.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCategoryChange(c)}
                    className="text-sm text-foreground hover:text-accent-primary py-2 border-b border-border/50 last:border-0 flex items-center justify-between group transition-colors text-left w-full cursor-pointer"
                  >
                    <span>{c}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card 4: Trending Comparisons */}
          {comparisons.filter(c => c.trending).length > 0 && (
            <div className="border border-[var(--glass-border)] p-6 rounded-3xl bg-muted/40 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-accent-gold mb-4">Trending Comparisons</h3>
              <div className="flex flex-col gap-1 max-h-[280px] overflow-y-auto pr-1">
                {comparisons.filter(c => c.trending).slice(0, 6).map(comp => (
                  <Link
                    key={comp.slug}
                    href={comp.slug}
                    className="text-sm text-foreground hover:text-accent-primary py-2 border-b border-border/50 last:border-0 flex items-center justify-between group transition-colors"
                  >
                    <span className="truncate">{comp.item1} vs {comp.item2}</span>
                    <span className="font-mono text-xs font-bold text-accent-gold shrink-0 ml-2">{comp.verdict}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
