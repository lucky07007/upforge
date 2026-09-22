// lib/founders/types.ts

export interface FounderStats {
  label: string
  value: string
}

export interface FounderColumn {
  heading: string
  body: string
}

export interface Founder {
  id: string
  slug: string
  edition: number
  featured: boolean
  name: string
  nameShort: string
  initials: string
  company: string
  role: string
  city: string
  country: string
  countryCode: string
  context: string
  valuation: string
  funding: string
  founded: string
  imageUrl: string
  accent: string
  accentBg: string
  accentBorder: string
  headline: string
  deck: string
  columns: FounderColumn[]
  pullQuote: string
  pullQuoteBy: string
  lesson: string
  stats: FounderStats[]
  category?: string
  oneLiner?: string
  cardImage?: string
  newsImage?: string
  verified?: boolean
  ufrnCode?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
