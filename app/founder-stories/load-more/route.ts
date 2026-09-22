// app/api/founder-stories/load-more/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getAllFounders } from "@/lib/founders/data"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  
  const { founders, total } = getAllFounders(page, limit)
  const hasMore = page * limit < total
  
  return NextResponse.json({
    founders,
    hasMore,
    nextPage: hasMore ? page + 1 : null,
    total
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
