// lib/geo.ts
// Geolocation utility using Vercel headers

export interface GeoLocation {
  country: string
  countryCode: string
  region: string
  city: string
  isIndia: boolean
}

const countryNames: Record<string, string> = {
  'IN': 'India',
  'US': 'United States',
  'GB': 'United Kingdom',
  'SG': 'Singapore',
  'AE': 'United Arab Emirates',
  'CA': 'Canada',
  'AU': 'Australia',
  'DE': 'Germany',
  'FR': 'France',
  'JP': 'Japan',
  'KR': 'South Korea',
  'BR': 'Brazil',
  'ID': 'Indonesia',
  'NG': 'Nigeria',
  'KE': 'Kenya',
  'ZA': 'South Africa',
  'IL': 'Israel',
  'NL': 'Netherlands',
  'SE': 'Sweden',
  'DK': 'Denmark',
  'NO': 'Norway',
  'FI': 'Finland',
}

export function getGeoLocation(request: Request): GeoLocation {
  const countryCode = request.headers.get('x-vercel-ip-country') || 'US'
  const region = request.headers.get('x-vercel-ip-country-region') || ''
  const city = request.headers.get('x-vercel-ip-city') || ''

  return {
    country: countryNames[countryCode] || 'Global',
    countryCode: countryCode.toUpperCase(),
    region,
    city,
    isIndia: countryCode === 'IN',
  }
}

export function getCurrency(countryCode: string): string {
  const currencyMap: Record<string, string> = {
    'IN': 'INR',
    'US': 'USD',
    'GB': 'GBP',
    'SG': 'SGD',
    'AE': 'AED',
    'CA': 'CAD',
    'AU': 'AUD',
    'DE': 'EUR',
    'FR': 'EUR',
  }
  return currencyMap[countryCode] || 'USD'
}

export function getLocalizedContent(countryCode: string) {
  const isIndia = countryCode === 'IN'
  
  return {
    isIndia,
    country: countryNames[countryCode] || 'Global',
    showIndianContent: isIndia,
    currency: getCurrency(countryCode),
    registryLabel: isIndia ? 'Indian Startup Registry' : 'Global Startup Registry',
    trustMessage: isIndia 
      ? 'India\'s independent startup registry'
      : 'A global independent startup registry',
  }
}
