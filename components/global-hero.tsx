"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function GlobalHero() {
  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3">

        <div className="flex justify-center">
          <Link
            href="/startup-intelligence"
            className="group flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 transition-all px-4 py-2 rounded-full border border-neutral-200"
          >
            <span className="h-2 w-2 bg-[#c6a43f] rounded-full animate-pulse" />

            <span className="text-[11px] sm:text-sm font-medium text-neutral-800">
              Startup Intelligence Reports are Live
            </span>

            <ArrowRight className="h-3 w-3 text-neutral-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}
