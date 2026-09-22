import React from "react";
import type { Startup } from "@/types/startup";

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UpForge",
    "url": "https://upforge.org",
    "description": "Global Startup Registry & Trust Index",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://upforge.org/registry?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function DataCatalogJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "UpForge Global Startup Registry",
    "url": "https://upforge.org/registry",
    "description": "Public dataset of verified global startups, founders, sector taxonomy, and trust scores.",
    "dataset": [
      {
        "@type": "Dataset",
        "name": "UpForge Verified Startups",
        "description": "Machine-readable JSON dataset of active global startups.",
        "url": "https://upforge.org/data/startups.json",
        "fileFormat": "application/json",
        "license": "https://creativecommons.org/licenses/by/4.0/"
      },
      {
        "@type": "Dataset",
        "name": "UpForge Sector Taxonomy",
        "description": "Normalized industry sectors and technology clusters.",
        "url": "https://upforge.org/data/sectors.json",
        "fileFormat": "application/json"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function StartupProfileJsonLd({ startup }: { startup: Startup }) {
  const profileUrl = `https://upforge.org/startup/${startup.slug}`;
  const sameAs = [startup.website, startup.linkedin_url, startup.twitter_url, startup.instagram_url]
    .filter((value): value is string => Boolean(value && /^https?:\/\//i.test(value)));
  const founders = (typeof startup.founders === "string"
    ? startup.founders.split(/\s*(?:,|;|\band\b)\s*/i)
    : Array.isArray(startup.founders)
      ? startup.founders.map((founder) => typeof founder === "string" ? founder : founder.name)
      : []).filter(Boolean);
  const org: Record<string, unknown> = {
    "@type": "Organization", "@id": `${profileUrl}#organization`, name: startup.name,
    legalName: startup.legal_name || undefined, url: startup.website || profileUrl,
    logo: startup.logo_url || undefined, description: startup.description_long || startup.description || undefined,
    foundingDate: startup.founded_year ? String(startup.founded_year) : startup.founded ? String(startup.founded) : undefined,
    sameAs: sameAs.length ? sameAs : undefined, knowsAbout: [startup.category, startup.industry_cluster].filter(Boolean),
    address: (startup.city || startup.state || startup.country_name) ? { "@type": "PostalAddress", addressLocality: startup.city || undefined, addressRegion: startup.state || undefined, addressCountry: startup.country_name || startup.country_code || undefined } : undefined,
    identifier: startup.ufrn ? { "@type": "PropertyValue", propertyID: "UFRN", name: "UpForge Registry Number", value: startup.ufrn, url: `${profileUrl}#ufrn` } : undefined,
    founder: founders.map((name) => ({ "@type": "Person", name })), mainEntityOfPage: profileUrl,
  };
  const extra = [
    startup.funding_stage ? { "@type": "PropertyValue", propertyID: "fundingStage", name: "Funding stage", value: startup.funding_stage } : null,
    startup.funding_total ? { "@type": "PropertyValue", propertyID: "fundingTotal", name: "Total funding", value: startup.funding_total } : null,
    startup.valuation ? { "@type": "PropertyValue", propertyID: "valuation", name: "Reported valuation", value: startup.valuation, ...(startup.valuation_date ? { description: `Reported as of ${startup.valuation_date}` } : {}) } : null,
  ].filter(Boolean);
  if (extra.length) org.additionalProperty = extra;
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    org,
    { "@type": "ProfilePage", "@id": `${profileUrl}#profile`, url: profileUrl, name: `${startup.name} — Founders, Founded, Location, Industry & Valuation`, mainEntity: { "@id": `${profileUrl}#organization` } },
    { "@type": "WebPage", "@id": `${profileUrl}#webpage`, url: profileUrl, name: `${startup.name} | UpForge Startup Registry`, about: { "@id": `${profileUrl}#organization` }, mainEntity: { "@id": `${profileUrl}#organization` }, dateModified: startup.updated_at || startup.data_as_of || startup.verification?.last_verified || undefined },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.org" },
      { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://upforge.org/registry" },
      { "@type": "ListItem", position: 3, name: startup.name, item: profileUrl },
    ] },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
