// lib/data-sync.ts
// perf: Sheets -> Cloudflare KV background sync pipeline with 0-CPU hot path execution
// Enforces "Always Approved & Verified" policy and automated sanity filtering

import type { Startup } from "@/types/startup"

export interface SheetCreator {
  id: string
  timestamp: string
  fullName: string
  instagramHandle: string
  niche: string
  followerCount: number
  followerCountRaw: string
  motivationScore: number
  howHeard: string
  comments: string
  profilePicture: string
  joinedAt: Date | string
  email?: string
  city?: string
  isPartner: boolean
}

const STARTUPS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMkWuF_Avm_ojh07YhuQfZT5IFq9g3HM6DVfEVV56jcwykv_zdqMdxdbIM-iY4ugahyIeZ3E0bNUbD/pub?gid=0&single=true&output=csv"

const CREATORS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmF9hQQC6sUOvzsYEelSYlvTgSWwGAQI_AiHKrqj3YissSynM_i_T8sVMkwUMAvvB38aqTNxvFxcsN/pub?output=csv"

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n")
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map((h) =>
    h.replace(/^"|"$/g, "").trim()
  )

  const rows: Record<string, string>[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const values = parseCSVLine(line)
    const row: Record<string, string> = {}
    headers.forEach((header, idx) => {
      row[header] = (values[idx] ?? "").replace(/^"|"$/g, "").trim()
    })
    rows.push(row)
  }
  return rows
}

function slugify(text: string): string {
  if (!text) return ""
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

function generateInitialsAvatar(name: string): string {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "UF"
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <rect width="128" height="128" rx="24" fill="#0f172a"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="48" font-weight="bold">${initials}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function parseFollowerCount(raw: string): number {
  if (!raw) return 0
  const cleaned = raw.replace(/[,\s]/g, "").toLowerCase()
  const num = parseInt(cleaned, 10)
  if (!isNaN(num)) return num

  if (cleaned.includes("1k") || cleaned.includes("1,000")) return 1000
  if (cleaned.includes("5k")) return 5000
  if (cleaned.includes("10k")) return 10000
  if (cleaned.includes("50k")) return 50000
  if (cleaned.includes("100k")) return 100000
  if (cleaned.includes("500k")) return 500000
  if (cleaned.includes("1m")) return 1000000

  return 0
}

/**
 * Transforms raw Sheets startup rows to approved & verified Startup objects.
 * // perf: Transforms happen during background sync/ETL so runtime CPU is ~0ms.
 */
export function transformStartupRows(rows: Record<string, string>[]): Startup[] {
  const startups: Startup[] = []

  rows.forEach((row, idx) => {
    const name = (row.name || row.Name || row.startup_name || "").trim()
    const website = (row.website || row.Website || "").trim()

    // 2.4 Automated Sanity Filter: Only skip a row if BOTH startup name AND website URL are empty
    if (!name && !website) {
      return
    }

    const displayName = name || (website ? website.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] : "Unnamed Startup")
    const slug = (row.slug || row.Slug || "").trim() || slugify(displayName)
    const rawLogo = (row.logo_url || row.logo || "").trim()
    const logo_url = rawLogo && rawLogo.startsWith("http") ? rawLogo : generateInitialsAvatar(displayName)

    const founded_year = parseInt(row.founded_year || row.founded || "2022", 10) || 2022
    const category = (row.category || row.Category || row.sector || "AI & Technology").trim()
    const city = (row.city || row.City || "Global").trim()
    const state = (row.state || row.State || "").trim()
    const country_name = (row.country_name || row.Country || "India").trim()
    const country_code = (row.country_code || row.country || "IND").trim()

    const ufrn = (row.ufrn || row.UFRN || `UF-2026-${country_code.slice(0, 2)}-${String(idx + 1).padStart(5, "0")}`).trim()

    const startup: Startup = {
      id: `uf-${slug}`,
      ufrn,
      name: displayName,
      slug,
      // Section 2: Force status to "approved" & verified by default
      status: "approved",
      founded: founded_year,
      founded_year,
      location: {
        city,
        state,
        country: country_name,
        country_code,
      },
      city,
      state,
      country_name,
      country_code,
      sector_id: slugify(category),
      subsector_ids: [slugify(category)],
      category,
      founders: (row.founders || row.Founders || "Founding Team").trim(),
      description: (row.description || row.Description || `${displayName} is a verified startup venture listed on the UpForge Global Registry.`).trim(),
      description_short: (row.description || row.Description || "").slice(0, 150),
      description_long: (row.description || row.Description || "").trim(),
      logo_url,
      website: website || null,
      linkedin_url: (row.linkedin_url || row.linkedin || "").trim() || null,
      twitter_url: (row.twitter_url || row.twitter || "").trim() || null,
      instagram_url: (row.instagram_url || row.instagram || "").trim() || null,
      verification: {
        status: "verified",
        score: 95,
        is_self_reported_capped: false,
        breakdown: {
          website_reachable: 15,
          domain_validity: 15,
          company_identity_signal: 15,
          founder_identity_signal: 15,
          social_presence: 10,
          product_evidence: 10,
          registration_evidence: 10,
          recent_activity: 10,
        },
        last_verified: new Date().toISOString().split("T")[0],
      },
      is_featured: row.is_featured === "true" || row.is_featured === "1",
      is_sponsored: false,
      created_at: new Date().toISOString(),
    }

    startups.push(startup)
  })

  return startups
}

export function transformCreatorRows(rows: Record<string, string>[]): SheetCreator[] {
  const creators: SheetCreator[] = []

  rows.forEach((row, idx) => {
    const fullName = (row.fullName || row.name || row["Full Name"] || "").trim()
    if (!fullName) return

    const isPartner = (row.is_partner || row.isPartner || "").trim().toLowerCase() === "yes" || row.is_partner === "true" || row.is_partner === "1"
    const rawFollowers = (row.followerCount || row["Follower Count"] || row.followers || "0").trim()

    creators.push({
      id: `sheet-creator-${idx + 1}`,
      timestamp: row.Timestamp || new Date().toISOString(),
      fullName,
      instagramHandle: (row.instagramHandle || row.handle || "").replace(/^@/, "").trim(),
      niche: row.niche || row.Niche || "Creator",
      followerCount: parseFollowerCount(rawFollowers),
      followerCountRaw: rawFollowers,
      motivationScore: parseInt(row.motivationScore || "10", 10) || 10,
      howHeard: row.howHeard || "",
      comments: row.comments || "",
      profilePicture: row.profilePicture || row.avatar || "",
      joinedAt: row.Timestamp || new Date().toISOString(),
      email: row.email || "",
      city: row.city || "",
      isPartner,
    })
  })

  return creators
}

/**
 * Background Sync Execution (Runs in Worker Cron Trigger or ETL pipeline)
 */
export async function syncSheetsToKV(envKV?: any): Promise<{ startupsCount: number; creatorsCount: number }> {
  let startups: Startup[] = []
  let creators: SheetCreator[] = []

  try {
    const startupRes = await fetch(STARTUPS_SHEET_URL, { signal: AbortSignal.timeout(8000) })
    if (startupRes.ok) {
      const csvText = await startupRes.text()
      const rows = parseCSV(csvText)
      startups = transformStartupRows(rows)
    }
  } catch (err) {
    console.warn("data-sync: Failed fetching startups sheet, using static fallback", err)
  }

  try {
    const creatorRes = await fetch(CREATORS_SHEET_URL, { signal: AbortSignal.timeout(8000) })
    if (creatorRes.ok) {
      const csvText = await creatorRes.text()
      const rows = parseCSV(csvText)
      creators = transformCreatorRows(rows)
    }
  } catch (err) {
    console.warn("data-sync: Failed fetching creators sheet, using static fallback", err)
  }

  if (envKV) {
    if (startups.length > 0) {
      await envKV.put("startups_data", JSON.stringify(startups))
    }
    if (creators.length > 0) {
      await envKV.put("creators_data", JSON.stringify(creators))
    }
  }

  return { startupsCount: startups.length, creatorsCount: creators.length }
}

/**
 * Cloudflare Worker Cron Trigger Handler
 */
export default {
  async scheduled(event: any, env: any, ctx: any) {
    ctx.waitUntil(syncSheetsToKV(env.UPFORGE_KV))
  },
}
