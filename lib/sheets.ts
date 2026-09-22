// lib/sheets.ts
// Fetches and parses live data from Google Sheets public CSV export
import { unstable_cache } from "next/cache"


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

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmF9hQQC6sUOvzsYEelSYlvTgSWwGAQI_AiHKrqj3YissSynM_i_T8sVMkwUMAvvB38aqTNxvFxcsN/pub?output=csv"

// Convert Google Drive sharing URL to direct viewable image URL
function convertGoogleDriveUrl(url: string): string {
  if (!url || url.trim() === "") return ""
  const raw = url.trim()

  if (!raw.includes("drive.google.com")) return raw

  let fileId = ""

  const fileMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) fileId = fileMatch[1]

  if (!fileId) {
    const idMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch) fileId = idMatch[1]
  }

  if (!fileId) return raw

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
}

function parseFollowerCount(raw: string): number {
  if (!raw) return 0
  const cleaned = raw.replace(/[,\s]/g, "").toLowerCase()
  const num = parseInt(cleaned, 10)
  if (!isNaN(num)) return num

  const rangeMatch = cleaned.match(/(\d+)[-–](\d+)/)
  if (rangeMatch) {
    return Math.floor((parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2)
  }

  if (cleaned.includes("1k") || cleaned.includes("1,000")) return 1000
  if (cleaned.includes("5k")) return 5000
  if (cleaned.includes("10k")) return 10000
  if (cleaned.includes("50k")) return 50000
  if (cleaned.includes("100k")) return 100000
  if (cleaned.includes("500k")) return 500000
  if (cleaned.includes("1m")) return 1000000

  return 0
}

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

// Parses "Yes" / "No" (case-insensitive, any whitespace) from the sheet.
// Defaults to false (not a partner) for anything else, including empty cells.
function parseIsPartner(raw: string): boolean {
  if (!raw) return false
  return raw.trim().toLowerCase() === "yes"
}

const fetchRawCreators = unstable_cache(
  async (): Promise<SheetCreator[]> => {
    const response = await fetch(SHEET_CSV_URL, {
      headers: {
        Accept: "text/csv,text/plain,*/*",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split("\n").filter((l) => l.trim())

    if (lines.length < 2) return []

    const creators: SheetCreator[] = []

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i])

      // Column mapping based on form:
      // 0: Timestamp
      // 1: Full Name
      // 2: Instagram Handle
      // 3: Primary Content Niche/Category
      // 4: Current Instagram Follower Count (approximate)
      // 5: Motivation Score (1-10)
      // 6: How did you hear about us
      // 7: Additional comments
      // 8: Profile Picture (URL)
      // 9: Email
      // 10: City
      // 11: is_partner ("Yes" / "No") — NEW

      if (cols.length < 2 || !cols[1]?.trim()) continue

      const timestamp = cols[0]?.trim() || ""
      const fullName = cols[1]?.trim() || "Anonymous"
      const rawHandle = cols[2]?.trim() || ""
      const instagramHandle = rawHandle.startsWith("@")
        ? rawHandle.slice(1)
        : rawHandle
      const niche = cols[3]?.trim() || "Creator"
      const followerCountRaw = cols[4]?.trim() || "0"
      const followerCount = parseFollowerCount(followerCountRaw)
      const motivationScore = parseInt(cols[5]?.trim() || "0", 10) || 0
      const howHeard = cols[6]?.trim() || ""
      const comments = cols[7]?.trim() || ""
      const profilePicture = convertGoogleDriveUrl(cols[8]?.trim() || "")

      let joinedAt: Date
      try {
        joinedAt = timestamp ? new Date(timestamp) : new Date()
        if (isNaN(joinedAt.getTime())) joinedAt = new Date()
      } catch {
        joinedAt = new Date()
      }

      const email = cols[9]?.trim() || ""
      const city = cols[10]?.trim() || ""
      const isPartner = parseIsPartner(cols[11]?.trim() || "")

      creators.push({
        id: `sheet-${i}`,
        timestamp,
        fullName,
        instagramHandle,
        niche,
        followerCount,
        followerCountRaw,
        motivationScore,
        howHeard,
        comments,
        profilePicture,
        joinedAt,
        email,
        city,
        isPartner,
      })
    }

    return creators
  },
  ["google-sheets-creators"],
  { revalidate: 300, tags: ["creators"] }
)

// perf: Serves creator community data from cache / static fallback to maintain <10ms CPU limit
export async function fetchCreatorsFromSheet(): Promise<SheetCreator[]> {
  if (typeof window === "undefined") {
    try {
      const nodeFs = eval("require")("fs")
      const nodePath = eval("require")("path")
      const filePath = nodePath.join(process.cwd(), "public", "data", "creators.json")
      if (nodeFs.existsSync(filePath)) {
        return JSON.parse(nodeFs.readFileSync(filePath, "utf-8"))
      }
    } catch {
      // fallback to sheets cache
    }
  }

  try {
    return await fetchRawCreators()
  } catch (error) {
    console.error("Error fetching creators from sheet:", error)
    return []
  }
}


export function getFollowerBucket(count: number): string {
  if (count === 0) return "unknown"
  if (count < 1000) return "under1k"
  if (count < 10000) return "1k-10k"
  if (count < 100000) return "10k-100k"
  return "100k+"
}

export function formatFollowerCount(count: number): string {
  if (count === 0) return "N/A"
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
