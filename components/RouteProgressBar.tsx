// components/RouteProgressBar.tsx
"use client"

import React, { useEffect, useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

function RouteProgressBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Reset progress state when route finishes changing
  useEffect(() => {
    setProgress(1)
    const timer = setTimeout(() => {
      setIsNavigating(false)
      setProgress(0)
    }, 200)
    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  // Listen for internal navigation click events to trigger top bar immediately
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      const targetAttr = target.getAttribute("target")

      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        targetAttr !== "_blank" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const currentUrl = window.location.pathname + window.location.search
        if (href !== currentUrl) {
          setIsNavigating(true)
          setProgress(0.3)
          const timer = setTimeout(() => {
            setProgress(0.7)
          }, 150)
          return () => clearTimeout(timer)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  if (!isNavigating && progress === 0) return null

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px]">
        <motion.div
          className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] origin-left"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: progress, opacity: progress === 1 ? 0 : 1 }}
          transition={{ duration: progress === 1 ? 0.2 : 0.4, ease: "easeOut" }}
          style={{ width: "100%" }}
        />
      </div>
    </AnimatePresence>
  )
}

export function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <RouteProgressBarContent />
    </Suspense>
  )
}
