import { NextResponse, type NextRequest } from "next/server"

// APPROVED BOTS (Allowed to crawl/fetch, subject to rate limiting)
const ALLOWED_BOTS = [
  "googlebot", "googlebot-image", "googlebot-video", "googlebot-news", "adsbot-google",
  "bingbot", "msnbot", "duckduckbot", "gptbot", "oai-searchbot", "chatgpt-user",
  "perplexitybot", "claudebot", "claude-web", "applebot", "applebot-extended",
  "facebookexternalhit", "meta-externalagent", "twitterbot", "linkedinbot",
  "slackbot", "slack-imgproxy", "discordbot", "whatsapp", "telegrambot", "pinterest",
  "vercel", "lighthouse"
]

// BLOCKED BOT KEYWORDS (Blocked immediately)
const BLOCKED_KEYWORDS = [
  "ahrefsbot", "semrushbot", "dotbot", "rogerbot", "mj12bot", "megaindex", "criteobot",
  "petalbot", "spyfu", "serpstat", "cognitiveseo", "linkdex", "seokicks", "grapeshot",
  "coccoc", "mail.ru_bot", "screaming frog", "searchmetrics", "sitecheck", "backlink",
  "keycss", "ccbot", "bytespider", "amazonbot", "diffbot", "cohere-ai", "anthropic-ai",
  "google-extended", "facebookbot", "baiduspider", "yandexbot", "yandexmobilebot",
  "sogou", "yahoo", "yeti", "curl", "wget", "urllib", "node-fetch", "axios", "scrapy",
  "headlesschrome", "selenium", "puppeteer", "playwright", "postman", "go-http-client",
  "java", "perl", "blexbot", "barkrowler", "zoominfobot", "exabot", "python",
  "libwww-perl", "lwp-trivial", "mechanize", "nmap", "httpclient", "http-client"
]

const GENERIC_CRAWLER_KEYWORDS = ["bot", "spider", "crawler", "crawling", "scraper", "scraping"]

interface RateLimitBucket {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateLimitBucket>()

function cleanupRateLimitMap() {
  if (rateLimitMap.size > 10000) {
    const now = Date.now()
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key)
    }
  }
}

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  cleanupRateLimitMap()
  const now = Date.now()
  const bucket = rateLimitMap.get(ip)
  if (!bucket || now > bucket.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }
  if (bucket.count >= limit) return true
  bucket.count++
  return false
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // perf: Fast-path return for API and static assets to minimize edge CPU execution time (<10ms target)
  if (pathname.startsWith('/_next') || pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|css|js|ico|woff2?|xml|txt)$/)) {
    return NextResponse.next()
  }

  const host = request.headers.get("host") || ""
  if (host.startsWith("www.") || host.includes("upforge.in")) {
    const url = request.nextUrl.clone()
    url.host = "upforge.org"
    url.protocol = "https:"
    url.port = ""
    return NextResponse.redirect(url, { status: 301 })
  }

  const userAgent = request.headers.get("user-agent") || ""
  const uaLower = userAgent.toLowerCase().trim()
  
  // Dynamic TypeScript Property 'ip' bypass
  const ip = (request as any).ip || request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown-ip"

  // BOT DETECTION
  if (!uaLower || uaLower.length < 12) {
    return new NextResponse(JSON.stringify({ error: "Access denied." }), { status: 403, headers: { "Content-Type": "application/json" } })
  }

  const isApproved = ALLOWED_BOTS.some((bot) => uaLower.includes(bot))
  if (!isApproved) {
    if (BLOCKED_KEYWORDS.some((kw) => uaLower.includes(kw)) || GENERIC_CRAWLER_KEYWORDS.some((kw) => uaLower.includes(kw))) {
      return new NextResponse(JSON.stringify({ error: "Access denied." }), { status: 403, headers: { "Content-Type": "application/json" } })
    }
  }

  // RATE LIMITING
  // Bypass rate-limiting for Next.js React Server Component (RSC) prefetch requests (?_rsc=...)
  const isRscPrefetch = request.nextUrl.searchParams.has("_rsc") || 
                        request.headers.get("next-router-prefetch") === "1" ||
                        request.headers.get("purpose") === "prefetch" ||
                        request.headers.get("rsc") === "1"

  if (!isRscPrefetch) {
    if (isApproved) {
      if (isRateLimited(ip, 100, 10000)) {
        return new NextResponse(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { "Content-Type": "application/json" } })
      }
    } else {
      if (isRateLimited(ip, 300, 10000)) {
        return new NextResponse(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { "Content-Type": "application/json" } })
      }
    }
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-upforge-domain', 'org')
  requestHeaders.set('x-upforge-pathname', pathname)

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
