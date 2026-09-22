import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")   
  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.statusText}`)
    }

    const arrayBuffer = await res.arrayBuffer()
    const contentType = res.headers.get("content-type") || "image/jpeg"
    const buffer = Buffer.from(arrayBuffer)

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Error proxying creator avatar:", error)
    return new NextResponse("Error fetching image", { status: 500 })
  }
}
