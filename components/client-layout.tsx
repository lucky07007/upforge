// components/client-layout.tsx
"use client"

import { usePathname } from "next/navigation"
import { createContext, useContext, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { RouteProgressBar } from "@/components/RouteProgressBar"
import type { DomainContext } from "@/lib/domain"

// ─── Domain Context ───────────────────────────────────────────────────────────
// Provides the domain context ('in' | 'org') to ALL client components in the tree.
// This avoids every client component having to call getDomainContextClient()
// independently (which re-reads window.location each time).
//
// Usage in any client component:
//   import { useDomain } from "@/components/client-layout"
//   const { domainContext, isIndia, isGlobal } = useDomain()

interface DomainContextValue {
  domainContext: DomainContext
  isIndia: boolean
  isGlobal: boolean
  baseUrl: string
  alternateUrl: string
}

const DomainCtx = createContext<DomainContextValue>({
  domainContext: 'in',
  isIndia: true,
  isGlobal: false,
  baseUrl: 'https://www.upforge.in',
  alternateUrl: 'https://upforge.org',
})

/**
 * useDomain()
 *
 * React hook — returns the current domain context for client components.
 *
 * @example
 * const { domainContext, isIndia } = useDomain()
 * const registryUrl = isIndia
 *   ? "https://upforge.org/registry"
 *   : "/registry"
 */
export function useDomain(): DomainContextValue {
  return useContext(DomainCtx)
}

// ─── ClientLayout ─────────────────────────────────────────────────────────────

interface ClientLayoutProps {
  children: React.ReactNode
  /**
   * Passed from RootLayout (a Server Component) via getDomainContext().
   * This is the authoritative domain value for the request — no client-side
   * hostname parsing needed.
   */
  domainContext: DomainContext
}

export function ClientLayout({ children, domainContext }: ClientLayoutProps) {
  const domainValue = useMemo<DomainContextValue>(() => ({
    domainContext: 'org',
    isIndia:      false,
    isGlobal:     true,
    baseUrl:      'https://upforge.org',
    alternateUrl: 'https://upforge.org',
  }), [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <DomainCtx.Provider value={domainValue}>
        <RouteProgressBar />
        <Navbar />
        <main className="flex-grow w-full pt-14">{children}</main>
        <Footer />
      </DomainCtx.Provider>
    </ThemeProvider>
  )
}
