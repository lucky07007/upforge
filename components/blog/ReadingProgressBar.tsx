"use client" 

import { useEffect, useState } from "react"

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100)
      }
    }

    window.addEventListener("scroll", updateScrollCompletion, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollCompletion)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-border/20">
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(245,158,11,0.6)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  )
}
