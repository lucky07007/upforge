// components/creators/search-bar.tsx

"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface Creator {
  id: string
  name: string
  instagram_handle: string
  profile_image: string
  category?: string
  verified: boolean
}

interface SearchBarProps {
  creators: Creator[]
  onSearch: (query: string) => void
  value: string
  onChange: (value: string) => void
  totalCount: number
}

export function SearchBar({ creators, onSearch, value, onChange, totalCount }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<Creator[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchValue: string) => {
    onChange(searchValue)
    
    if (searchValue.trim() === "") {
      setSuggestions([])
      onSearch("")
      setShowSuggestions(false)
      return
    }

    const query = searchValue.toLowerCase()
    const filtered = creators.filter(creator => 
      creator.name.toLowerCase().includes(query) ||
      creator.instagram_handle.toLowerCase().includes(query) ||
      creator.category?.toLowerCase().includes(query)
    )
    
    setSuggestions(filtered.slice(0, 5))
    onSearch(searchValue)
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }

  const handleSelectCreator = (creator: Creator) => {
    onChange(creator.name)
    onSearch(creator.name)
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleClear = () => {
    onChange("")
    onSearch("")
    setSuggestions([])
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      handleSelectCreator(suggestions[selectedIndex])
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-[#C59A2E]/20 text-foreground font-medium">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div ref={searchRef} className="py-4">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => value && suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${totalCount}+ creators...`}
          className="w-full pl-10 pr-10 py-2.5 bg-background border-2 border-border rounded-full text-sm focus:border-[#C59A2E] outline-none transition-colors"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
            {suggestions.map((creator, index) => (
              <button
                key={creator.id}
                onClick={() => handleSelectCreator(creator)}
                className={`w-full flex items-center gap-3 p-3 transition-colors border-b border-border last:border-0 text-left ${
                  index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
              >
                <Image
                  src={creator.profile_image}
                  alt={creator.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm truncate">
                      {highlightMatch(creator.name, value)}
                    </span>
                    {creator.verified && (
                      <svg className="w-3.5 h-3.5 text-[#0095F6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    @{highlightMatch(creator.instagram_handle, value)}
                  </p>
                </div>
                {creator.category && (
                  <span className="text-[9px] font-medium uppercase text-[#C59A2E] shrink-0">
                    {creator.category}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
