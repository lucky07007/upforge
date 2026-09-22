// app/blog/layout.tsx
// Server layout to export metadata for /blog since the page will be a "use client" component

import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Startup Intelligence Journal — In-Depth Reports & Founder Insights | UpForge",
  description:
    "Data-driven articles on Global startup trends, VC funding guides, unicorn profiles, founder strategies, fintech rankings, and legal guides for Indian founders.",
  keywords: [
    "Indian startup blog",
    "startup funding India 2026",
    "Indian unicorns list",
    "startup founder stories",
    "AI startups India",
    "fintech startups India",
    "VC firms India",
    "startup legal guide India",
    "bootstrapped startups India",
    "women founders India",
  ],
  alternates: { canonical: "https://upforge.org/blog" },
  openGraph: {
    title: "Startup Intelligence Journal | UpForge",
    description:
      "Global startup analysis, funding guides, VC rankings, and founder insights — updated regularly.",
    url: "https://upforge.org/blog",
    siteName: "UpForge",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
