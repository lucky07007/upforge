import type { Metadata } from "next"
import { PartnerProgramClient } from "./partner-program-client"

export const metadata: Metadata = {
  title: "UpForge Partner Program | Creator & Ecosystem Network",
  description: "Join the official UpForge Partner Program. Earn ₹0.01 per verified organic view. Clear book cover rules, Amazon Kindle link, and direct WhatsApp verification.",
  alternates: { canonical: "https://upforge.org/partner-program" },
  openGraph: {
    title: "UpForge Partner Program | Creator & Ecosystem Network",
    description: "Earn ₹0.01 per verified organic view with UpForge. Transparent guidelines for creators, ecosystem partners, and analysts.",
    url: "https://upforge.org/partner-program",
    siteName: "UpForge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.upforge.org/the%20unfinished%20millionaire.jpg",
        width: 1200,
        height: 630,
        alt: "The Unfinished Millionaire UpForge Partner Program",
      },
    ],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://upforge.org/partner-program#webpage",
      "url": "https://upforge.org/partner-program",
      "name": "UpForge Partner Program",
      "description": "Official overview, book cover rules, Amazon Kindle link, and WhatsApp verification terms for the UpForge Partner Program.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.org" },
          { "@type": "ListItem", "position": 2, "name": "Partner Program", "item": "https://upforge.org/partner-program" }
        ]
      }
    },
    {
      "@type": "VideoObject",
      "name": "UpForge Partner Program Overview & Walkthrough",
      "description": "Official overview video explaining how partner verification, Amazon Order ID submission, and view-based payouts work.",
      "thumbnailUrl": [
        "https://img.youtube.com/vi/OfGIVOpGd4g/maxresdefault.jpg"
      ],
      "uploadDate": "2026-08-01T00:00:00Z",
      "embedUrl": "https://www.youtube-nocookie.com/embed/OfGIVOpGd4g"
    }
  ]
}

export default function PartnerProgramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PartnerProgramClient />
    </>
  )
}
