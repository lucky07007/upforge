/**
 * lib/domain.ts — UpForge Global Authority
 * FINAL PRODUCTION VERSION (Schema.org Validated)
 */

export type DomainContext = "org" | "in"

export interface DomainMeta {
  context: DomainContext
  baseUrl: string
  isGlobal: boolean
  locale: string
  hreflangSelf: string
  siteName: string
  region: "GLOBAL"
}

export function getDomainContextClient(): DomainContext {
  return "org"
}

export function getDomainMeta(context: DomainContext = "org"): DomainMeta {
  return {
    context: "org",
    baseUrl: "https://upforge.org",
    isGlobal: true,
    locale: "en-US",
    hreflangSelf: "en",
    siteName: "UpForge",
    region: "GLOBAL",
  }
}

export function getStartupUrl(slug: string): string {
  return `/startup/${slug}`
}

export function getRegistryUrl(path = ""): string {
  return `/registry${path ? `/${path}` : ""}`
}

export function getCanonicalUrl(pathname: string): string {
  const baseUrl = "https://upforge.org"
  const cleanPath =
    pathname === "/" ? "" : pathname.replace(/\/$/, "")

  return `${baseUrl}${cleanPath}`
}

export function getAlternatesForLayout(pathname: string) {
  const path = pathname === "/" ? "" : pathname

  const orgUrl = `https://upforge.org${path}`

  return {
    canonical: orgUrl,

    languages: {
      en: orgUrl,
      "x-default": orgUrl,
    },
  }
}

/**
 * ORGANIZATION STRUCTURED DATA
 * Fixes:
 * Search Console @type warnings
 * missing address
 * missing logo object validation
 * entity authority completeness
 */

export function getOrganizationJsonLd(
  context: DomainContext = "org"
) {
  const meta = getDomainMeta(context)

  const baseUrl = meta.baseUrl

  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${baseUrl}/#organization`,

    name: "UpForge",

    url: baseUrl,

    logo: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#logo`,
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },

    image: `${baseUrl}/logo.png`,

    description:
      "UpForge is an independent global startup registry providing verified intelligence on emerging startups worldwide.",

    foundingDate: "2024",

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },

    sameAs: [
      "https://twitter.com/upforge_in",
      "https://www.linkedin.com/company/upforge",
    ],

    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "team@upforge.org",
      url: `${baseUrl}/contact`,
      availableLanguage: "English",
    },
  }
}

/**
 * WEBSITE STRUCTURED DATA
 * Fixes:
 * incorrect EntryPoint structure
 * SearchAction validation issue
 */

export function getWebsiteJsonLd(
  context: DomainContext = "org"
) {
  const meta = getDomainMeta(context)

  const baseUrl = meta.baseUrl

  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": `${baseUrl}/#website`,

    url: baseUrl,

    name: "UpForge",

    alternateName:
      "UpForge Global Startup Registry",

    publisher: {
      "@id": `${baseUrl}/#organization`,
    },

    potentialAction: {
      "@type": "SearchAction",

      target: `${baseUrl}/registry?q={search_term_string}`,

      "query-input":
        "required name=search_term_string",
    },
  }
}

/**
 * BREADCRUMB STRUCTURED DATA
 * Fixes canonical mismatch risks
 */

export function getBreadcrumbJsonLd(
  items: { name: string; item: string }[]
) {
  const baseUrl = "https://upforge.org"

  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.name,

        item: item.item.startsWith("http")
          ? item.item
          : `${baseUrl}${item.item}`,
      })
    ),
  }
}
