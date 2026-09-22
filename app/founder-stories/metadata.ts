// app/founder-stories/metadata.ts
// Central metadata configuration — Super-grade SEO for Global & Indian Discover Traffic 2026

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Founder Chronicle — Global & Indian Startup Builder Stories 2026 | UpForge",
  description:
    "Deep-dive editorial profiles of the world's most consequential tech and AI founders — OpenAI, Anthropic, Perplexity, Surge AI, Mistral, Anduril, Stripe, Canva, and top Indian unicorn pioneers. Real stories, verified numbers, newspaper-grade journalism.",
  keywords: [
    "founder stories",
    "startup founder profiles 2026",
    "AI founders",
    "tech billionaires stories",
    "Sam Altman OpenAI",
    "Aravind Srinivas Perplexity",
    "Dario Amodei Anthropic",
    "Arthur Mensch Mistral AI",
    "Palmer Luckey Anduril",
    "Ilya Sutskever SSI",
    "Mira Murati Thinking Machines",
    "Edwin Chen Surge AI",
    "Ritesh Agarwal OYO",
    "Indian startup founders",
    "global unicorn builders",
    "UpForge founder chronicle"
  ],
  alternates: {
    canonical: "https://upforge.org/founder-stories",
    languages: {
      'en-US': "https://upforge.org/founder-stories",
      'en-IN': "https://www.upforge.in/founder-stories",
      'x-default': "https://upforge.org/founder-stories"
    }
  },
  openGraph: {
    title: "The Founder Chronicle — Global & Indian Startup Builder Stories 2026 | UpForge",
    description:
      "Editorial deep-dives into the founders building tomorrow's global economy. From AI pioneers to unicorn innovators.",
    url: "https://upforge.org/founder-stories",
    siteName: "UpForge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://upforge.org/og/founder-chronicle.png",
        width: 1200,
        height: 630,
        alt: "The Founder Chronicle by UpForge — Global Founder Stories 2026"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@UpForgeHQ",
    creator: "@UpForgeHQ",
    title: "The Founder Chronicle — Global Edition 2026 | UpForge",
    description: "Deep-dive founder profiles. Verified data, real quotes, newspaper editorial format.",
    images: ["https://upforge.org/og/founder-chronicle.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  }
}
