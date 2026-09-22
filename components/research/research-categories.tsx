"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Category {
  name: string
  count: number
}

export function ResearchCategories({ categories }: { categories: Category[] }) {
  const maxCount = Math.max(...categories.map(c => c.count))

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h3 className="font-sans font-black text-[13px] uppercase tracking-widest text-foreground">
          Browse by Sector
        </h3>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => {
          const percentage = (cat.count / maxCount) * 100
          
          return (
            <Link
              key={cat.name}
              href={`/registry?sector=${encodeURIComponent(cat.name)}`}
              className="group flex items-center justify-between p-3 border border-border hover:border-foreground transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm font-bold text-foreground group-hover:text-[#C59A2E] transition-colors truncate">
                  {cat.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-0.5 bg-muted">
                    <div 
                      className="h-full bg-[#C59A2E] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-mono">
                    {cat.count}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-border opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-3" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
