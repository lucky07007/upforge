// app/api/geo-content/route.ts
// API endpoint to get geo-localized content

import { getGeoLocation, getLocalizedContent } from '@/lib/geo'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const geo = getGeoLocation(request)
  const content = getLocalizedContent(geo.countryCode)

  return NextResponse.json({
    ...geo,
    ...content,
  })
}

export const runtime = 'edge'
