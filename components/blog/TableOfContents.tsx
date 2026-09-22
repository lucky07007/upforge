"use client"
import { useEffect, useState } from "react"
import { List, ChevronDown, ChevronUp } from "lucide-react"

export interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: HeadingItem[]
  // "mobile" renders only the collapsible drawer, "desktop" renders only the
  // sticky sidebar, "both" (default) renders both — kept for backwards
  // compatibility, but ArticleLayout should always pass an explicit variant
  // so the two placements never both render on the same breakpoint.
  variant?: "mobile" | "desktop" | "both"
}

export function TableOfContents({ headings, variant = "both" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings || headings.length === 0) return null

  return (
    <>
      {/* MOBILE COLLAPSIBLE DRAWER */}
      {(variant === "mobile" || variant === "both") && (
      <div className="lg:hidden my-6 border border-border/80 rounded-2xl bg-card/80 backdrop-blur-md overflow-hidden shadow-sm">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full px-5 py-3.5 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted/40 transition-colors"
        >
          <span className="flex items-center gap-2 text-amber-500">
            <List className="w-4 h-4" /> Table of Contents ({headings.length})
          </span>
          {isOpenMobile ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>

        {isOpenMobile && (
          <nav className="p-4 border-t border-border/60 space-y-2 bg-muted/20">
            {headings.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpenMobile(false)}
                className={`block text-xs leading-snug py-1 transition-colors ${
                  item.level === 3 ? "pl-4 text-muted-foreground" : "font-semibold text-foreground"
                } ${activeId === item.id ? "text-amber-500 font-bold" : "hover:text-amber-400"}`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        )}
      </div>
      )}

      {/* DESKTOP STICKY SIDEBAR */}
      {(variant === "desktop" || variant === "both") && (
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto p-5 rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-sm scrollbar-hide">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/60">
            <List className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
              Article Contents
            </span>
          </div>

          <nav className="space-y-2 text-xs">
            {headings.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group flex items-start gap-2 py-1.5 transition-all leading-snug ${
                    item.level === 3 ? "pl-3 text-[11px]" : "font-medium"
                  } ${
                    isActive
                      ? "text-amber-500 font-bold translate-x-1"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 transition-colors ${
                      isActive ? "bg-amber-500" : "bg-border group-hover:bg-muted-foreground"
                    }`}
                  />
                  <span className="line-clamp-2">{item.text}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </aside>
      )}
    </>
  )
}
