// app/api/research/suggest/route.ts

import { fetchAllStartups } from "@/lib/google-sheets"
import { formatFounders } from "@/types/startup"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  
  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    const startups = await fetchAllStartups()
    const approved = startups.filter((s) => s.status === "approved")

    const suggestions = new Set<string>()
    const lowerQuery = query.toLowerCase()

    approved.forEach(item => {
      if (item.name?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.name)
      }
      if (item.category?.toLowerCase().includes(lowerQuery)) {
        suggestions.add(item.category)
      }
      const f = formatFounders(item.founders)
      if (f.toLowerCase().includes(lowerQuery)) {
        suggestions.add(f)
      }
    })

    return NextResponse.json({ 
      suggestions: Array.from(suggestions).slice(0, 8) 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch {
    return NextResponse.json({ suggestions: [] })
  }
}
