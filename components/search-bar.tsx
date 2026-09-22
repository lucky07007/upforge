"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2, TrendingUp, ArrowRight } from "lucide-react"

interface SearchBarProps {
  query: string
  setQuery: (value: string) => void
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
  onSelect?: () => void // Callback when a suggestion is selected
}

type Suggestion = {
  title: string
  type: string
  href: string
  subtitle?: string
}

export function SearchBar({ 
  query, 
  setQuery, 
  onSearch, 
  placeholder = "Search startups...",
  className = "",
  onSelect
}: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(query)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  useEffect(() => {
    let abortController: AbortController | null = null

    const fetchSuggestions = async () => {
      if (localQuery.length < 2) {
        setSuggestions([])
        setIsOpen(false)
        return
      }

      if (abortController) abortController.abort()
      abortController = new AbortController()
      setIsLoading(true)
      setIsOpen(true)

      try {
        const timeoutId = setTimeout(() => {
          if (abortController) abortController.abort()
        }, 5000)

        const res = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(localQuery)}`,
          { signal: abortController.signal }
        )

        clearTimeout(timeoutId)

        if (!res.ok) throw new Error("Search failed")

        const data = await res.json()
        const results = Array.isArray(data) ? data.slice(0, 8) : []
        setSuggestions(results)
        if (results.length === 0) setIsOpen(true)
      } catch (err: any) {
        if (err.name === "AbortError") return
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => {
      clearTimeout(timer)
      if (abortController) abortController.abort()
    }
  }, [localQuery])

  // FIXED: Click outside only closes dropdown, not parent menu
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1)
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        e.preventDefault()
        handleSelect(suggestions[selectedIndex])
      } else {
        handleSubmit()
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const handleChange = (value: string) => {
    setLocalQuery(value)
    setQuery(value)
    setSelectedIndex(-1)
  }

  const handleSubmit = () => {
    if (!localQuery.trim()) return
    if (onSearch) {
      onSearch(localQuery.trim())
    } else {
      router.push(`/registry?q=${encodeURIComponent(localQuery.trim())}`)
    }
    setIsOpen(false)
    inputRef.current?.blur()
  }

  // FIXED: Navigate first, then close
  const handleSelect = (item: Suggestion) => {
    router.push(item.href)
    setIsOpen(false)
    setLocalQuery("")
    setQuery("")
    if (onSelect) onSelect()
  }

  const handleClear = () => {
    setLocalQuery("")
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const getTypeBadge = (type: string) => {
    if (type.includes("VERIFIED")) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    if (type.includes("STARTUP")) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    return "bg-muted text-muted-foreground"
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      
      <div className={`relative flex items-center transition-all duration-200 ${
        isFocused 
          ? "ring-2 ring-foreground/10 border-foreground/30" 
          : "border-zinc-300 dark:border-zinc-700"
      } border rounded-xl bg-background`}>
        
        <Search className={`absolute left-4 w-4 h-4 transition-colors duration-200 ${
          isFocused ? "text-foreground" : "text-muted-foreground"
        }`} />

        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true)
            if (localQuery.length >= 2) setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none rounded-xl"
          autoComplete="off"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {isLoading && (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          )}
          
          {localQuery && !isLoading && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="p-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/80 transition-all"
            aria-label="Search"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* FIXED: Independent dropdown that doesn't affect parent */}
      {isOpen && (
        <div 
          className="absolute top-full mt-2 left-0 right-0 bg-background border border-border/50 rounded-xl shadow-2xl shadow-black/5 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          
          {isLoading && (
            <div className="animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-4 py-3 border-b border-border/20 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-muted rounded shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                    <div className="w-16 h-5 bg-muted rounded shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <>
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors border-b border-border/20 last:border-0 ${
                    selectedIndex === idx 
                      ? "bg-muted/50" 
                      : "hover:bg-muted/30"
                  }`}
                >
                  <Search size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground font-medium truncate">
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-muted-foreground truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getTypeBadge(item.type)}`}>
                    {item.type}
                  </span>
                </button>
              ))}

              <div className="px-4 py-2.5 bg-muted/20 border-t border-border/30 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] border border-border font-mono">↑↓</kbd>
                  Navigate
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] border border-border font-mono ml-1">↵</kbd>
                  Select
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {suggestions.length} results
                </span>
              </div>
            </>
          )}

          {!isLoading && suggestions.length === 0 && localQuery.length >= 2 && (
            <div className="px-4 py-6 text-center">
              <Search size={24} className="text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                No results for &ldquo;<span className="text-foreground font-medium">{localQuery}</span>&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Try a different search term
              </p>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 text-[13px] text-foreground hover:underline font-medium"
              >
                <Search size={12} />
                Search all startups for &ldquo;{localQuery}&rdquo;
              </button>
            </div>
          )}

          {!isLoading && localQuery.length < 2 && (
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Trending Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["AI Startup", "Fintech", "SaaS", "Unicorn", "Zerodha"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      handleChange(term)
                      setTimeout(() => handleSubmit(), 100)
                    }}
                    className="px-3 py-1.5 text-xs bg-muted/50 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
