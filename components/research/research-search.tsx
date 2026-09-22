// components/research/research-search.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, GitCompare, ArrowUpRight, TrendingUp } from "lucide-react"

// Comparison pages data
const comparisonPages = [
  { name: "Claude vs OpenAI", slug: "/compare/claude-vs-openai", category: "AI Models" },
  { name: "Notion vs Coda", slug: "/compare/notion-vs-coda", category: "Productivity" },
  { name: "Figma vs Sketch", slug: "/compare/figma-vs-sketch", category: "Design Tools" },
  { name: "ChatGPT vs Gemini", slug: "/compare/chatgpt-vs-gemini", category: "AI Models" },
  { name: "Slack vs Teams", slug: "/compare/slack-vs-teams", category: "Collaboration" },
  { name: "Zoom vs Google Meet", slug: "/compare/zoom-vs-google-meet", category: "Video Conferencing" },
  { name: "DeepSeek vs Qwen", slug: "/compare/deepseek-vs-qwen", category: "AI Models" },
  { name: "Linear vs Jira", slug: "/compare/linear-vs-jira", category: "Project Management" }
]

export function ResearchSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [startupSuggestions, setStartupSuggestions] = useState<string[]>([])
  const [comparisonSuggestions, setComparisonSuggestions] = useState<typeof comparisonPages>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (query.length < 2) {
      setStartupSuggestions([])
      setComparisonSuggestions([])
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      
      // Filter comparisons locally (instant)
      const matchedComparisons = comparisonPages.filter(comp =>
        comp.name.toLowerCase().includes(query.toLowerCase()) ||
        comp.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
      setComparisonSuggestions(matchedComparisons)
      
      // Fetch startups from API
      try {
        const res = await fetch(`/api/research/suggest?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setStartupSuggestions(data.suggestions || [])
      } catch {
        setStartupSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query
    if (q.trim()) {
      router.push(`/registry?q=${encodeURIComponent(q.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
    if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const hasSuggestions = startupSuggestions.length > 0 || comparisonSuggestions.length > 0
  const popularSearches = ["Claude vs OpenAI", "AI", "Fintech", "SaaS", "Notion vs Coda"]

  return (
    <div className="relative">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search startups or comparisons (e.g., 'Claude vs OpenAI')..."
            className="w-full h-14 pl-12 pr-24 bg-background border-2 border-foreground text-foreground placeholder:text-muted-foreground font-serif italic focus:outline-none focus:border-[#C59A2E] transition-colors text-base"
          />
          <button
            onClick={() => handleSearch()}
            disabled={!query.trim()}
            className="absolute right-2 h-10 px-5 bg-foreground hover:bg-[#C59A2E] text-background font-mono text-[10px] font-bold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (query.length >= 2 || hasSuggestions) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border shadow-xl z-50 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-[#C59A2E]" />
              </div>
            ) : (
              <>
                {/* Comparison Suggestions - Show FIRST */}
                {comparisonSuggestions.length > 0 && (
                  <div className="border-b border-border">
                    <div className="px-4 py-2 bg-muted/30 border-b border-border">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#C59A2E] font-mono flex items-center gap-1">
                        <GitCompare className="w-3 h-3" />
                        Comparisons
                      </span>
                    </div>
                    {comparisonSuggestions.map((comp, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          router.push(comp.slug)
                          setShowSuggestions(false)
                          setQuery("")
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 flex items-center justify-between group"
                      >
                        <div>
                          <span className="font-serif text-foreground group-hover:text-[#C59A2E] transition-colors">
                            {comp.name}
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-mono ml-2">
                            {comp.category}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-border opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Startup Suggestions */}
                {startupSuggestions.length > 0 && (
                  <div>
                    <div className="px-4 py-2 bg-muted/30 border-b border-border">
                      <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Startups
                      </span>
                    </div>
                    {startupSuggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(suggestion)
                          handleSearch(suggestion)
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 flex items-center justify-between group"
                      >
                        <span className="font-serif italic text-foreground group-hover:text-[#C59A2E] transition-colors">
                          {suggestion}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-border opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
                
                {!hasSuggestions && query.length >= 2 && (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">No results found</p>
                    <button
                      onClick={() => handleSearch()}
                      className="mt-2 text-xs text-[#C59A2E] uppercase tracking-wider font-mono hover:underline"
                    >
                      Search anyway
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Popular Searches */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">
          Popular:
        </span>
        {popularSearches.map((term) => (
          <button
            key={term}
            onClick={() => {
              if (term.includes(" vs ")) {
                const comp = comparisonPages.find(c => c.name === term)
                if (comp) router.push(comp.slug)
              } else {
                setQuery(term)
                handleSearch(term)
              }
            }}
            className="text-[11px] font-mono uppercase tracking-wider text-foreground hover:text-[#C59A2E] transition-colors"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Click outside handler */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}
