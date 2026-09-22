// data/news-gallery.ts
// ─────────────────────────────────────────────────────────────────────────────
// UpForge News Gallery — curates press coverage and media appearances.
// To add a new entry: just add an object to NEWS_ITEMS at the top of the list.
// Rest of the fields (id, source, description, dateAdded) are generated automatically.
// ─────────────────────────────────────────────────────────────────────────────

export interface RawNewsItem {
  image: string
  title: string
  link: string
}

// ─────────────────────────────────────────────────────────────────────────────
// DAILY UPDATE LIST
// Simply paste the image URL, headline, and link here. Newest goes at the top.
// ─────────────────────────────────────────────────────────────────────────────
export const NEWS_ITEMS: RawNewsItem[] = [
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQEwkJcZfnbxxA/feedshare-shrink_800/B56Z97Vvt1G0Ac-/0/1784480726105?e=1785974400&v=beta&t=A8pai1IUrVIPrX062e61TLaZPnwRiPEgVlhURz75csI",
    title: "https://media.licdn.com/dms/image/v2/D5622AQEwkJcZfnbxxA/feedshare-shrink_800/B56Z97Vvt1G0Ac-/0/1784480726105?e=1785974400&v=beta&t=A8pai1IUrVIPrX062e61TLaZPnwRiPEgVlhURz75csI",
    link: "https://www.linkedin.com/posts/upforge-india_upforge-vorflux-rippling-activity-7484654654832726016-YZnB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-mH6gBQ_9gtMF5dq1uoRS-amoy9RUPz20",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQGHEMqOsEI4ZQ/feedshare-shrink_800/B56Z96ez6XGgAc-/0/1784466325375?e=1785974400&v=beta&t=5n5S8eMsr3Vc1TYNAz8_q_lycy2-vngM9uPSraolxXA",
    title: "Marc Lore doesn't build small. 🍽️",
    link: "https://www.linkedin.com/posts/upforge-india_upforge-wonder-marclore-activity-7484594252505710592-Gduy?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-mH6gBQ_9gtMF5dq1uoRS-amoy9RUPz20",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQERFhu6bUzS0Q/feedshare-shrink_800/B56Z92cSZLJoAc-/0/1784398554961?e=1785974400&v=beta&t=oiX7XSiHrIhunS1VKxFh4XDch0hhllBLRqvTEjN40V8",
    title: "Microagi - Ex-F1 Engineer's Al Startup Teaching Factory Robots New Skills, 2026",
    link: "https://www.linkedin.com/posts/upforge-india_upforge-aistartups-fireworks-activity-7484310002258632704-JTGQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-mH6gBQ_9gtMF5dq1uoRS-amoy9RUPz20",
  },

    {
    image: "https://i.pinimg.com/736x/94/dd/eb/94ddeb894228e2ed7468eb7a4ebbe71f.jpg",
    title: "L'Oréal Acquires Majority Stake in Indian D2C Beauty Startup Innovist - 2026",
    link: "https://www.linkedin.com/posts/upforge-india_upforge-loreal-innovist-activity-7484937191685541888-v3at?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-mH6gBQ_9gtMF5dq1uoRS-amoy9RUPz20",
  },

    {
    image: "https://i.pinimg.com/736x/4c/dd/62/4cdd625a81ac1fb8e182fbed3875b664.jpg",
    title: "Odyssey Raises $310M Series B for World-Models Al - $1.45B Valuation 2026",
    link: "https://www.linkedin.com/posts/upforge-india_upforge-odyssey-aistartups-activity-7484837677213696000-3tQb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-mH6gBQ_9gtMF5dq1uoRS-amoy9RUPz20",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATIC GENERATION & NORMALIZATION
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string
  image: string
  title: string
  source: string
  description: string
  dateAdded: string
  link: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function extractSource(link: string): string {
  try {
    const url = new URL(link)
    const host = url.hostname.replace("www.", "").toLowerCase()
    const mapping: Record<string, string> = {
      "economictimes.indiatimes.com": "The Economic Times",
      "moneycontrol.com": "Moneycontrol",
      "yourstory.com": "YourStory",
      "inc42.com": "Inc42",
      "techcrunch.com": "TechCrunch",
      "vccircle.com": "VCCircle",
      "livemint.com": "Livemint",
      "business-standard.com": "Business Standard",
      "forbesindia.com": "Forbes India",
      "forbes.com": "Forbes",
      "upforge.org": "UpForge Journal",
      "upforge.in": "UpForge Journal",
      "news.google.com": "Google News",
      "timesofindia.indiatimes.com": "Times of India",
      "thehindu.com": "The Hindu",
      "businessworld.in": "Businessworld",
    }
    return mapping[host] || host
  } catch {
    return "Press Coverage"
  }
}

export const getSortedNewsItems = (): NewsItem[] => {
  const baseDate = new Date()

  return NEWS_ITEMS.map((item, i) => {
    // Subtract i days for each item down the list to simulate daily posts
    const dateObj = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000)
    const dateAdded = dateObj.toISOString().split("T")[0]
    const source = extractSource(item.link)
    const id = `${slugify(item.title)}-${i}`

    return {
      id,
      image: item.image,
      title: item.title,
      source,
      description: `Read the latest press coverage and ecosystem updates from ${source}: "${item.title}". Click through to view the full report.`,
      dateAdded,
      link: item.link,
    }
  })
}
