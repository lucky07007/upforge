// app/archive/layout.tsx
// Server component — exports metadata for /archive since page.tsx is "use client"
import type { Metadata } from "next"
import type { ReactNode } from "react"

const BASE_URL = "https://upforge.org"

export const metadata: Metadata = {
  title: "The Founder Chronicle — Indian Startup Origin Stories | UpForge",
  description:
    "The UpForge Founder Chronicle — deeply reported origin stories of India's most consequential startup founders. Each edition profiles one builder: their founding moment, the bet they made, and the lesson it left behind.",
  keywords: [
    "Indian startup founder stories",
    "startup origin stories India",
    "founder chronicle India",
    "India unicorn founders",
    "startup founder profiles 2026",
    "UpForge founder archive",
    "Indian entrepreneur stories",
  ],
  alternates: { canonical: `${BASE_URL}/archive` },
  openGraph: {
    title: "The Founder Chronicle — Indian Startup Origin Stories | UpForge",
    description:
      "Deeply reported origin stories of India's most consequential startup founders — from Zepto to Zerodha, one edition at a time.",
    url: `${BASE_URL}/archive`,
    siteName: "UpForge",
    images: [
      { url: `${BASE_URL}/og/registry.png`, width: 1200, height: 630 },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Founder Chronicle | UpForge",
    description:
      "Origin stories of India's most consequential startup founders — deeply reported, one edition per month.",
    images: [`${BASE_URL}/og/registry.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
}

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
