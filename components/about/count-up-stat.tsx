"use client"

import { useEffect, useState, useRef } from "react"

interface CountUpStatProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUpStat({ 
  target, 
  suffix = "", 
  duration = 2000, 
  className = "" 
}: CountUpStatProps) {
  const [count, setCount] = useState(0)
  const isAnimated = useRef(false)

  useEffect(() => {
    if (isAnimated.current) return
    isAnimated.current = true

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeProgress * target))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    window.requestAnimationFrame(step)
  }, [target, duration])

  return (
    <span className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}
