"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Founder } from "@/lib/founders/types"
import { FounderCard } from "./founder-card"
import { Loader2 } from "lucide-react"

interface FounderGridProps {
  initialFounders: Founder[]
  totalFounders: number
}

export function FounderGrid({ initialFounders, totalFounders }: FounderGridProps) {
  const [founders, setFounders] = useState<Founder[]>(initialFounders)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialFounders.length < totalFounders)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const isFetchingRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return
    
    isFetchingRef.current = true
    setLoading(true)
    setError(null)
    
    try {
      const nextPage = page + 1
      const res = await fetch(`/api/founder-stories/load-more?page=${nextPage}&limit=9`)
      
      if (!res.ok) throw new Error('Failed to load more stories')
      
      const data = await res.json()
      
      // Slight delay for smooth visual transition
      await new Promise(resolve => setTimeout(resolve, 250))
      
      if (Array.isArray(data.founders) && data.founders.length > 0) {
        setFounders(prev => {
          // Filter out duplicate IDs if any
          const existingIds = new Set(prev.map(f => f.id))
          const newUniqueFounders = data.founders.filter((f: Founder) => !existingIds.has(f.id))
          return [...prev, ...newUniqueFounders]
        })
        setPage(nextPage)
        setHasMore(data.hasMore ?? false)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      setError('Could not load additional profiles. Retrying automatically on scroll.')
      console.error("Infinite scroll fetch error:", err)
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [page, hasMore])

  // Intersection Observer for continuous auto infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (!hasMore) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !isFetchingRef.current && hasMore) {
          loadMore()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "300px" // Pre-fetch 300px before reaching trigger for lag-free scroll
      }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loadMore])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {founders.map((founder, index) => (
          <div 
            key={founder.id} 
            className="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
            style={{ animationDelay: `${(index % 9) * 40}ms` }}
          >
            <FounderCard founder={founder} />
          </div>
        ))}

        {/* Skeleton cards while fetching new items */}
        {loading && (
          [...Array(3)].map((_, i) => (
            <div 
              key={`skeleton-${i}`} 
              className="bg-card border border-border p-5 flex flex-col justify-between h-96 animate-pulse"
            >
              <div className="w-full h-48 bg-muted mb-4 rounded-xs" />
              <div className="space-y-2">
                <div className="h-3 w-1/4 bg-muted rounded-xs" />
                <div className="h-5 w-3/4 bg-muted rounded-xs" />
                <div className="h-3 w-full bg-muted rounded-xs" />
                <div className="h-3 w-2/3 bg-muted rounded-xs" />
              </div>
              <div className="pt-4 border-t border-border flex justify-between">
                <div className="h-3 w-1/3 bg-muted rounded-xs" />
                <div className="h-4 w-4 bg-muted rounded-xs" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Auto Load Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-10 my-4">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-muted/50 border border-border/80 backdrop-blur-sm">
            <Loader2 className="w-4 h-4 animate-spin text-[#C59A2E]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">
              Loading more founder stories...
            </span>
          </div>
        </div>
      )}

      {/* End of Stories Indicator */}
      {!hasMore && founders.length > 0 && (
        <div className="text-center py-14 border-t border-border/60 mt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C59A2E] font-mono font-bold">
            ✦ All {founders.length} Founder Stories Loaded ✦
          </span>
          <p className="font-serif italic text-muted-foreground text-sm mt-2">
            Stay tuned for upcoming editorial profiles.
          </p>
        </div>
      )}

      {/* Empty State */}
      {founders.length === 0 && !loading && (
        <div className="text-center py-16 border border-dashed border-border">
          <p className="font-serif text-xl text-muted-foreground">No founder stories found.</p>
        </div>
      )}
    </>
  )
}
