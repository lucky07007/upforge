"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"

interface Comparison {
  name: string
  slug: string
  category: string
  description: string
  item1: string
  item2: string
}

export function CompareSearch({ comparisons }: { comparisons: Comparison[] }) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const containerRef = useRef<HTMLDivElement>(null)

  const categories = ["All", ...new Set(comparisons.map(c => c.category))]
  
  const filtered = comparisons.filter(comp => {
    const matchesQuery = query.length < 2 || 
      comp.name.toLowerCase().includes(query.toLowerCase()) ||
      comp.item1.toLowerCase().includes(query.toLowerCase()) ||
      comp.item2.toLowerCase().includes(query.toLowerCase()) ||
      comp.category.toLowerCase().includes(query.toLowerCase())
    
    const matchesCategory = activeCategory === "All" || comp.category === activeCategory
    
    return matchesQuery && matchesCategory
  })

  const scrollToFiltered = () => {
    // Scroll to comparisons list if not visible
    const list = document.getElementById("comparisons-list")
    if (list) {
      list.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            scrollToFiltered()
          }}
          placeholder="Search comparisons (e.g., 'Claude', 'Notion', 'AI')..."
          className="w-full h-10 pl-10 pr-4 bg-background border border-border text-foreground placeholder:text-muted-foreground font-serif italic text-sm focus:outline-none focus:border-[#C59A2E] transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat)
              scrollToFiltered()
            }}
            className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border transition-all ${
              activeCategory === cat
                ? "border-[#C59A2E] bg-[#C59A2E]/10 text-[#C59A2E]"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">
        {filtered.length} of {comparisons.length} comparisons
        {(query || activeCategory !== "All") && " filtered"}
      </p>
    </div>
  )
}
