import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Newsreader } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "../components/client-layout"
import { CookieBanner } from "../components/cookie-banner"
import Script from "next/script"
import { getDomainContext } from "@/lib/domain.server"
import { AdScriptLoader } from "@/components/AdScriptLoader"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
})

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://upforge.org"
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default:
        "UpForge — Global Startup Registry & Emerging Market Intelligence 2026",
      template: "%s | UpForge",
    },
    description:
      "UpForge is an independent global startup registry and intelligence platform. Discover startup profiles, founder stories, funding research, and emerging-market insights.",
    applicationName: "UpForge",
    keywords: [
      "global startup registry",
      "startup database worldwide",
      "verified startups directory",
      "Indian startup registry",
      "AI startups database",
      "fintech startups global",
      "emerging market startups",
      "UFRN lookup",
    ],
    authors: [
      {
        name: "UpForge Editorial",
        url: `${baseUrl}/about`,
      },
    ],
    creator: "UpForge",
    publisher: "UpForge",
    alternates: {
      canonical: baseUrl,
      types: {
        "application/rss+xml": [
          {
            url: `${baseUrl}/founder-stories/feed.xml`,
            title: "UpForge Founder Stories RSS Feed",
          },
        ],
      },
    },
    verification: {
      // Add your actual Google Search Console verification token here
      google: "google4fca56100e982c53",
      other: {
        monetag: "11a060c13bb08c2111f804101cc133b9",
        // Trustpilot Verification Added Here:
        "trustpilot-one-time-domain-verification-id":
          "47d37b53-b662-45e7-bc73-2e163c7c4b0e",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    referrer: "origin-when-cross-origin",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: "UpForge",
      title:
        "UpForge — Global Startup Registry & Emerging Market Intelligence 2026",
      description:
        "Discover verified startups globally. Founder profiles, funding intelligence, and sector analysis.",
      images: [
        {
          url: `${baseUrl}/og/global-registry.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@upforge_in",
      creator: "@upforge_in",
      title: "UpForge — Global Startup Registry",
      images: [`${baseUrl}/og/global-registry.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      // Add your Bing verification token here when ready
      // "msvalidate.01": "YOUR_BING_TOKEN",
      // This links your AdSense publisher account to this site for pre-approval
      "google-adsense-account": "ca-pub-5377045438787332",
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ctx = await getDomainContext()
  // Organization schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://upforge.org/#organization",
    name: "UpForge",
    alternateName: "UpForge Global Startup Registry",
    url: "https://upforge.org",
    logo: "https://upforge.org/logo.jpg",
    description:
      "Global startup registry and founder intelligence platform with UFRN credentials",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/company/upforge-india",
      "https://twitter.com/upforge_in",
    ],
  }

  // Website schema
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://upforge.org/#website",
    name: "UpForge",
    url: "https://upforge.org",
    description: "Global startup registry and founder intelligence platform",
    publisher: { "@id": "https://upforge.org/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://upforge.org/registry?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://upforge.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Registry",
        item: "https://upforge.org/registry",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Submit Startup",
        item: "https://upforge.org/submit",
      },
    ],
  }

  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${playfair.variable} ${newsreader.variable}`}
      data-domain={ctx}
    >
      <head>
        {/* Performance: Preconnect to critical origins (max 4 origins) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      </head>

      <body className="bg-background text-foreground flex flex-col min-h-screen antialiased font-sans">
        {/* Conditional Ad & Monetization Scripts (Skips non-monetized utility routes) */}
        <AdScriptLoader />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3J7Y3695TK"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3J7Y3695TK');
          `}
        </Script>

        <ClientLayout domainContext={ctx}>{children}</ClientLayout>

        <CookieBanner />
      </body>
    </html>
  )
}
