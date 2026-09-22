// lib/seo-keywords.ts

/**
 * Supercharges Next.js metadata by generating deep, long-tail
 * high-intent SEO keywords dynamically based on structured database inputs.
 */

export function generateStartupKeywords(params: {
  name: string
  category?: string | null
  city?: string | null
  country?: string | null
  founders?: string | null
  year?: number | null
}): string[] {
  const { name, category, city, country, founders, year } = params
  
  const keywords = new Set<string>([
    name,
    `${name} startup`,
    `${name} company`,
    `${name} official profile`,
    `${name} registry`,
    `${name} verified`,
  ])

  // Sector-based keywords
  if (category) {
    keywords.add(`${category} startups`)
    keywords.add(`top ${category} companies`)
    keywords.add(`best ${category} startups`)
    keywords.add(`${name} ${category}`)
    keywords.add(`${category} innovators`)
  }

  // Location-based keywords
  if (city) {
    keywords.add(`startups in ${city}`)
    keywords.add(`${city} tech companies`)
    keywords.add(`${name} ${city}`)
    if (category) {
      keywords.add(`${category} startups in ${city}`)
    }
  }

  if (country) {
    keywords.add(`startups in ${country}`)
    keywords.add(`${country} tech ecosystem`)
    if (category) {
      keywords.add(`${category} companies in ${country}`)
    }
  }

  // Founders
  if (founders) {
    const founderArray = founders.split(/[,;&]/).map(f => f.trim()).filter(Boolean)
    founderArray.forEach(f => {
      keywords.add(f)
      keywords.add(`${f} founder`)
      keywords.add(`${f} ${name}`)
      keywords.add(`${f} net worth`)
      keywords.add(`${f} startup`)
    })
  }

  // Year
  if (year) {
    keywords.add(`startups founded in ${year}`)
    keywords.add(`${name} founded ${year}`)
  }

  // High-intent investor/authority variants
  keywords.add(`${name} funding`)
  keywords.add(`${name} valuation`)
  keywords.add(`${name} investors`)
  keywords.add(`${name} CEO`)
  keywords.add(`${name} revenue`)
  keywords.add(`${name} alternative`)
  keywords.add(`${name} competitors`)

  return Array.from(keywords)
}

export function generateCategoryKeywords(category: string, count: number): string[] {
  const keywords = new Set<string>([
    `${category} startups`,
    `${category} companies`,
    `top ${category} startups`,
    `best ${category} companies`,
    `invest in ${category} startups`,
    `${category} startup list`,
    `${category} industry overview`,
    `funded ${category} startups`,
    `fastest growing ${category} companies`,
    `${category} unicorns`,
    `${category} startups to watch ${new Date().getFullYear()}`,
    `${category} startup directory`,
    `global ${category} registry`,
  ])

  if (count > 0) {
    keywords.add(`${count} ${category} startups`)
  }

  return Array.from(keywords)
}
