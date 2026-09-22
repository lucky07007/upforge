import { fetchAllStartups } from "@/lib/google-sheets"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ufrn = searchParams.get("ufrn")
  const digits = searchParams.get("digits")

  try {
    const startups = await fetchAllStartups()
    const approved = startups.filter((s) => s.status === "approved")

    let found = null
    if (ufrn) {
      const target = ufrn.trim().toUpperCase()
      found = approved.find((s) => s.ufrn && s.ufrn.toUpperCase() === target)
    } else if (digits) {
      const suffix = digits.trim()
      found = approved.find((s) => s.ufrn && s.ufrn.endsWith(`-${suffix}`))
    }

    return NextResponse.json({ data: found || null })
  } catch (error) {
    console.error("Verify API error:", error)
    return NextResponse.json({ data: null, error: "Internal Server Error" }, { status: 500 })
  }
}
