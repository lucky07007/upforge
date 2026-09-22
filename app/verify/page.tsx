// app/verify/page.tsx — UpForge UFRN Verification v3
// Full SEO: "what is UFRN", "UFRN lookup", "verify startup India"
// Theme-aware: bg-background / text-foreground (dark + light)
// Share URL is slug-based via verify-client v5

import type { Metadata } from "next"
import { VerifyClient } from "@/components/verify-client"
import { fetchAllStartups } from "@/lib/google-sheets"
import { Navbar } from "@/components/navbar"

/* ── Domain detection (Next.js async headers) ── */
async function getDomain(): Promise<"org" | "in"> {
  return "org"
}


/* ── Registry stats ── */
async function getVerifyStats() {
  try {
    const startups = await fetchAllStartups()
    return { total: startups.length }
  } catch {
    return { total: 43 }
  }
}

/* ── SEO Metadata ── */
export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const canonical = "https://upforge.org/verify"
  const ogImage   = "https://www.upforge.in/og/ufrn-verify.png"

  return {
    title: "What is UFRN? Verify Startup UFRN Free — UpForge Registry Number Lookup",
    description:
      "UFRN (UpForge Registry Number) is a unique verified identifier for startups. Format: UF-2026-IND-00013. Instantly look up any startup's UFRN to verify founders, funding, and official status. Free, instant, no login.",
    keywords: [
      "what is UFRN", "UFRN meaning", "UFRN full form", "UpForge Registry Number",
      "UFRN startup India", "UFRN format", "UF-2026-IND",
      "UFRN lookup", "verify UFRN free", "check UFRN", "UFRN search",
      "verify startup UFRN", "startup UFRN checker", "UFRN verification tool",
      "verify startup India", "startup verification India free",
      "startup registry number India", "Indian startup verification 2026",
      "startup due diligence India", "is this startup verified India",
      "startup identity verification", "startup proof of existence",
      "upforge verify", "upforge UFRN", "upforge startup registry",
    ],
    alternates: {
      canonical,
      languages: {
        "en":        "https://upforge.org/verify",
        "en-IN":     "https://www.upforge.in/verify",
        "x-default": "https://upforge.org/verify",
      },
    },
    openGraph: {
      title: "What is UFRN? Free Startup Verification — UpForge Registry",
      description:
        "UFRN = UpForge Registry Number. Enter any UFRN to instantly verify a startup's founders, funding, and official status.",
      url: canonical,
      siteName: "UpForge Global Registry",
      locale: domain === "org" ? "en" : "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge UFRN Verification — Free Startup Registry Lookup" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@upforge_in",
      title: "What is UFRN? Verify Any Startup Free — UpForge Official Registry",
      description:
        "UFRN is a verified startup identifier (UF-YEAR-CC-XXXXX). Instant lookup, no login, global coverage.",
      images: [ogImage],
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
}

/* ── Structured data ── */
const makeSchemas = (total: number) => [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://upforge.org/verify#webpage",
    url: "https://upforge.org/verify",
    name: "What is UFRN? Startup UFRN Verification — UpForge Registry Number Lookup",
    description: `UFRN (UpForge Registry Number) is a unique startup identifier. Verify any UFRN in our ${total.toLocaleString()}+ entry global registry.`,
    inLanguage: "en",
    datePublished: "2026-03-01",
    dateModified: new Date().toISOString().split("T")[0],
    publisher: { "@id": "https://upforge.org/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://upforge.org/verify#app",
    name: "UpForge UFRN Verification Tool",
    description:
      "Free startup UFRN lookup tool. Enter a UFRN (UpForge Registry Number) to instantly verify any startup's registration, founders, and funding. No account needed.",
    url: "https://upforge.org/verify",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "UpForge", url: "https://upforge.org" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is UFRN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UFRN stands for UpForge Registry Number — a unique, permanent identifier assigned to verified startups in the UpForge Global Index. Format: UF-YEAR-COUNTRYCODE-SEQNUM. Example: UF-2026-IND-00013.",
        },
      },
      {
        "@type": "Question",
        name: "What does UFRN full form mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UFRN full form is UpForge Registry Number. Assigned after editorial verification of founders, operational status, and business details.",
        },
      },
      {
        "@type": "Question",
        name: "What is the UFRN format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The UFRN format is UF-YEAR-COUNTRYCODE-SEQUENCENUMBER. For example, UF-2026-IND-00013. Country codes follow ISO 3166-1 alpha-3 (IND, AUS, USA, etc.).",
        },
      },
      {
        "@type": "Question",
        name: "Is UFRN verification free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. UFRN verification on UpForge is completely free, requires no account or login, and provides instant results with no usage limits.",
        },
      },
      {
        "@type": "Question",
        name: "How do I verify a startup using its UFRN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter the startup's UFRN (e.g. UF-2026-IND-00013 or just the number 13) in the search box at upforge.org/verify. You'll instantly see the startup's verified name, founders, category, funding stage, and official registry status.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get a UFRN for my startup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submit your startup for free at upforge.in/submit. The UpForge editorial board reviews your submission and assigns a permanent UFRN upon approval.",
        },
      },
      {
        "@type": "Question",
        name: "What is UpForge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UpForge is an independent global startup registry that assigns verified UFRN identifiers to startups worldwide. Every listing undergoes manual editorial review before a UFRN is issued.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UpForge",          item: "https://upforge.org" },
      { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://upforge.org/startup" },
      { "@type": "ListItem", position: 3, name: "Verify UFRN",      item: "https://upforge.org/verify" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://upforge.org/#organization",
    name: "UpForge",
    url: "https://upforge.org",
    logo: "https://upforge.org/logo.png",
    sameAs: ["https://www.upforge.in", "https://twitter.com/upforge_in"],
    description:
      "UpForge is the global startup registry issuing UFRN (UpForge Registry Numbers) — unique verified identifiers for startups worldwide.",
  },
]

/* ── Page ── */
export default async function VerifyPage(props: {
  params: Promise<Record<string, unknown>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [domain, { total }] = await Promise.all([getDomain(), getVerifyStats()])
  const isOrg = domain === "org"

  return (
    <>
      {/* Structured data — all schemas */}
      {makeSchemas(total).map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/*
        SEO: crawlable FAQ summary for Google "People also ask".
        Visually hidden (height:0, overflow:hidden) — text is in the DOM
        but does not affect layout. Placed before the widget so it scores
        early in page position.
      */}
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />

        {/*
          SEO: visually-hidden FAQ for Google "People also ask".
          Uses the SR-only pattern (position:absolute, clip) — zero layout impact,
          no space above or below. Placed inside the wrapper so it's after Navbar in DOM.
        */}
        <section
          aria-label="Frequently asked questions about UFRN"
          style={{
            position:"absolute", width:1, height:1,
            padding:0, margin:-1, overflow:"hidden",
            clip:"rect(0,0,0,0)", whiteSpace:"nowrap", border:0
          }}
        >
          <h2>What is UFRN?</h2>
          <p>UFRN stands for UpForge Registry Number — a unique verified startup identifier. Format: UF-2026-IND-00013.</p>
          <h2>UFRN full form</h2>
          <p>UFRN full form is UpForge Registry Number. Assigned after editorial verification of founders and operational status.</p>
          <h2>How to verify a startup UFRN?</h2>
          <p>Enter the UFRN in the search box above. Instant, free, no login required.</p>
        </section>

        <main className="flex-grow">
          <VerifyClient totalCount={total} isOrg={isOrg} />
        </main>

        {/* ⚠️ DO NOT ADD <Footer /> — layout.tsx wraps every page with it. */}
      </div>
    </>
  )
}
