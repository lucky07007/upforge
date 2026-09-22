import { NextResponse } from "next/server"  
import { fetchAllStartups } from "@/lib/google-sheets"

export async function GET() {
  try {
    const startups = await fetchAllStartups()

    // Filter approved startups
    const approved = startups.filter(
      (s) => s.status === "approved" || !s.status
    )

    if (approved.length === 0) {
      return NextResponse.json({ startup: null })
    }

    // Sort by created_at descending if available, else keep default order (newest usually last or first)
    const sorted = [...approved].sort((a, b) => {
      if (a.created_at && b.created_at) {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      }
      return 0
    })

    const latest = sorted[0]

    const responsePayload = {
      startup: {
        id: latest.id,
        name: latest.name,
        slug: latest.slug,
        ufrn: latest.ufrn ?? null,
        category: latest.category ?? null,
        city: latest.city ?? null,
        country_name: latest.country_name ?? "India",
        created_at: latest.created_at ?? null,
        description: latest.description ?? null,
        logo_url: latest.logo_url ?? null,
      },
    }

    return NextResponse.json(responsePayload, {
      headers: {
        "Cache-Control":
          "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("Error fetching latest startup:", error)
    return NextResponse.json(
      { error: "Failed to fetch latest startup" },
      { status: 500 }
    )
  }
}
