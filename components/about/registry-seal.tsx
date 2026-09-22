"use client"

import { ShieldCheck } from "lucide-react"

interface RegistrySealProps {
  size?: number
}

export function RegistrySeal({ size = 148 }: RegistrySealProps) {
  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer Rotating Text Ring */}
      <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-foreground/80">
          <path
            id="sealTextPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="text-[7.5px] font-mono font-bold uppercase tracking-[0.25em] fill-current">
            <textPath href="#sealTextPath" startOffset="0%">
              ✦ OFFICIAL GLOBAL REGISTRY ✦ VERIFIED INDEPENDENT STANDARD ✦
            </textPath>
          </text>
        </svg>
      </div>

      {/* Inner Decorative Circle */}
      <div 
        className="rounded-full border-[1.5px] border-foreground/30 flex items-center justify-center bg-background shadow-xs"
        style={{ width: size * 0.72, height: size * 0.72 }}
      >
        <div 
          className="rounded-full border border-[#C59A2E]/50 flex items-center justify-center bg-[#C59A2E]/5"
          style={{ width: size * 0.58, height: size * 0.58 }}
        >
          <ShieldCheck className="w-8 h-8 text-[#C59A2E]" />
        </div>
      </div>

      {/* Gold Dot Accent */}
      <div className="absolute -top-1 w-2 h-2 rounded-full bg-[#C59A2E] animate-ping" />
    </div>
  )
}
