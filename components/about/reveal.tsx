"use client"

import React from "react"

interface RevealProps {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}

export function Reveal({ children, as: Component = "div", className = "" }: RevealProps) {
  return (
    <Component className={`animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both ${className}`}>
      {children}
    </Component>
  )
}
