import { NextResponse, type NextRequest } from "next/server"

const BLOCKED_SCRAPER_KEYWORDS = [
  "ahrefsbot",
  "semrushbot",
  "dotbot",
  "rogerbot",
  "mj12bot",
  "megaindex",
  "criteobot",
  "petalbot",
  "spyfu",
  "serpstat",
  "cognitiveseo",
  "linkdex",
  "seokicks",
  "searchmetrics",
  "sitecheck",
  "screaming frog",
  "ccbot",
  "bytespider",
  "diffbot",
  "facebookbot",
  "google-extended",
  "cohere-ai",
  "anthropic-ai",
  "blexbot",
  "barkrowler",
  "zoominfobot",
  "exabot",
  "nmap",
]

interface RateLimitBucket {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitBucket>()
const API_WINDOW_MS = 10_000
const API_LIMIT = 90
const API_MAX_KEYS = 5000

function getClientIp(request: NextRequest) {
  const cfIp = request.headers.get("cf-connecting-ip")
  if (cfIp) return cfIp.slice(0, 80)

  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 80)

  return request.headers.get("x-real-ip")?.slice(0, 80) || "unknown-ip"
}

function cleanupRateLimitMap(now: number) {
  if (rateLimitMap.size < API_MAX_KEYS) return

  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime <= now) rateLimitMap.delete(key)
  }

  while (rateLimitMap.size >= API_MAX_KEYS) {
    const first = rateLimitMap.keys().next().value
    if (!first) break
    rateLimitMap.delete(first)
  }
}

function isApiRateLimited(ip: string) {
  const now = Date.now()
  cleanupRateLimitMap(now)

  const current = rateLimitMap.get(ip)
  if (!current || current.resetTime <= now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + API_WINDOW_MS })
    return false
  }

  if (current.count >= API_LIMIT) return true

  current.count += 1
  rateLimitMap.set(ip, current)
  return false
}

function blockedScraper(userAgent: string) {
  const ua = userAgent.toLowerCase()
  return BLOCKED_SCRAPER_KEYWORDS.some((keyword) => ua.includes(keyword))
}

function deny(status: 403 | 429, message: string, retryAfter?: number) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  })
  if (retryAfter) headers.set("Retry-After", String(retryAfter))

  return new NextResponse(JSON.stringify({ error: message }), { status, headers })
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Static assets never need bot/rate-limit work in the Next.js middleware.
  if (
    pathname.startsWith("/_next") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|css|js|ico|woff2?|xml|txt)$/)
  ) {
    return NextResponse.next()
  }

  // Canonical host redirect.
  const host = request.headers.get("host") || ""
  if (host.startsWith("www.") || host.includes("upforge.in")) {
    const url = request.nextUrl.clone()
    url.host = "upforge.org"
    url.protocol = "https:"
    url.port = ""
    return NextResponse.redirect(url, { status: 301 })
  }

  const userAgent = request.headers.get("user-agent") || ""
  const isApi = pathname.startsWith("/api/")

  /*
   * Bot policy:
   * - Public HTML remains crawlable for Google, Bing and approved AI/search
   *   agents such as OAI-SearchBot, ChatGPT-User, PerplexityBot and ClaudeBot.
   * - We only block a small, explicit list of known unwanted scraper agents.
   * - We do NOT use generic "bot/crawler/spider" matching, so legitimate
   *   search and AI crawlers are not accidentally blocked.
   * - API endpoints are rate-limited because API traffic can create origin
   *   CPU work without providing indexable traffic value.
   */
  if (blockedScraper(userAgent)) {
    return deny(403, "Automated scraping is not permitted.")
  }

  if (isApi) {
    if (!userAgent.trim()) {
      return deny(403, "A browser-like user agent is required.")
    }

    if (isApiRateLimited(getClientIp(request))) {
      return deny(429, "Too many requests. Please retry shortly.", 10)
    }

    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-upforge-domain", "org")
  requestHeaders.set("x-upforge-pathname", pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.*\\.xml|ads.txt|llms.txt|llms-full.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff2?|json)).*)",
  ],
}
