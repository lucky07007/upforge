// lib/categories.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fully dynamic category system — v2 (Global Reach Edition)
//
// WHAT CHANGED FROM v1:
//   • Added generateCategoryTitle() — keyword-rich <title> per category page
//   • Added CATEGORY_SEO_MAP — hand-tuned meta for the 10 highest-traffic
//     new global categories (AI, FinTech, EdTech etc.)
//   • generateCategoryDescription() now has global vs India variants
//   • Added getCategoryKeywords() — returns 5–7 keywords per category for
//     the <meta name="keywords"> and JSON-LD keywords fields
//   • categoryToSlug() unchanged — existing slugs stay stable
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise a raw DB category string → URL-safe slug.
 * "AI/ML"        → "ai-ml"
 * "FinTech"      → "fintech"
 * "Climate Tech" → "climate-tech"
 * "E-Commerce"   → "e-commerce"
 */
export function categoryToSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Given a raw DB category string, produce a display name.
 * Preserves the original DB string — that's the ground truth.
 */
export function getDisplayName(dbCategory: string): string {
  return dbCategory
}

/**
 * Given a URL slug, find the matching raw DB category string
 * from an array of known DB values.
 */
export function slugToDbCategory(
  slug: string,
  dbCategories: string[]
): string | null {
  const exact = dbCategories.find((c) => categoryToSlug(c) === slug)
  if (exact) return exact
  const stripped = slug.replace(/-/g, "").toLowerCase()
  const loose = dbCategories.find(
    (c) => c.replace(/[^a-z0-9]/gi, "").toLowerCase() === stripped
  )
  return loose ?? null
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY SEO MAP
// Hand-tuned for the 10 new global high-traffic categories + existing Indian
// categories. Keys are the DB category strings (exact match).
//
// For any category NOT in this map, the auto-generation functions below
// produce a reasonable fallback — so this is purely additive.
// ─────────────────────────────────────────────────────────────────────────────
interface CategorySEO {
  title: string            // <title> tag — include primary keyword
  description: string      // <meta description> — 150–160 chars
  keywords: string[]       // 5–8 keywords for meta + JSON-LD
  h1: string               // Hero heading on the category page
  subheading: string       // Supporting sentence below H1
}

export const CATEGORY_SEO_MAP: Record<string, CategorySEO> = {

  // ── NEW GLOBAL CATEGORIES ─────────────────────────────────────────────────

  "ARTIFICIAL INTELLIGENCE": {
    title: "Top AI Startups 2026 — Artificial Intelligence Companies | UpForge",
    description: "Discover the top AI startups of 2026 — OpenAI, Anthropic, Perplexity, Character.AI and more. Verified profiles, founder stories, funding data, and company analysis.",
    keywords: ["top AI startups 2026", "artificial intelligence companies", "best AI startups", "OpenAI Anthropic startup", "AI company profiles 2026"],
    h1: "Top AI Startups of 2026",
    subheading: "From OpenAI and Anthropic to Perplexity and Character.AI — the companies defining the artificial intelligence era.",
  },

  "AI-POWERED SEARCH": {
    title: "AI Search Engine Startups 2026 — Perplexity vs Google | UpForge",
    description: "The startups replacing Google with AI-powered search. Perplexity AI, You.com, and the next generation of real-time answer engines — profiles and founder stories.",
    keywords: ["AI search engine 2026", "Perplexity AI startup", "AI research assistant", "Perplexity vs Google", "AI answer engine startup"],
    h1: "AI-Powered Search Startups",
    subheading: "The companies building AI search engines that answer questions directly — not with ten blue links.",
  },

  "GLOBAL FINTECH": {
    title: "Top Global FinTech Startups 2026 — Revolut, Ramp & More | UpForge",
    description: "The world's fastest-growing FinTech startups profiled — multi-currency cards, spend management, crypto trading, and international transfers. Updated for 2026.",
    keywords: ["global fintech startups 2026", "Revolut startup", "best travel card 2026", "multi-currency card startup", "fintech unicorns 2026"],
    h1: "Global FinTech Startups 2026",
    subheading: "From Revolut's multi-currency card to Ramp's spend intelligence — the FinTechs eliminating every bank fee.",
  },

  "AI DESIGN & CREATIVITY": {
    title: "AI Design Startups 2026 — Canva, Adobe Firefly & More | UpForge",
    description: "The best AI design and creativity platforms of 2026 — Canva's AI image generator, online logo maker, and tools that make design accessible to 200 million people.",
    keywords: ["AI design startups 2026", "Canva AI image generator", "AI graphic design tools", "online logo maker startup", "AI creativity platforms 2026"],
    h1: "AI Design & Creativity Startups",
    subheading: "The tools turning everyone into a designer — AI image generators, presentation makers, and brand kits for the world.",
  },

  "ENTERTAINMENT AI": {
    title: "Entertainment AI Startups 2026 — Character.AI, Roleplay AI | UpForge",
    description: "The fastest-growing entertainment AI platforms of 2026 — chat with AI characters, roleplay AI, custom AI personalities, and the companies building AI companionship.",
    keywords: ["entertainment AI startups 2026", "Character AI startup", "chat with AI characters", "roleplay AI app", "AI companionship platform"],
    h1: "Entertainment AI Startups",
    subheading: "The platforms where 20 million users spend more daily time than on YouTube — AI companionship at scale.",
  },

  "ENTERPRISE AI": {
    title: "Enterprise AI Startups 2026 — Claude, Anthropic, Safe AI | UpForge",
    description: "The top enterprise AI startups of 2026 — Anthropic's Claude, safe AI for coding and business, and the companies governments and Fortune 500s trust with their data.",
    keywords: ["enterprise AI startups 2026", "Anthropic Claude startup", "safe AI for business", "Claude 3 AI", "AI for coding startup"],
    h1: "Enterprise AI Startups 2026",
    subheading: "The AI platforms trusted by governments, legal firms, and the Fortune 500 — built for safety, scale, and accuracy.",
  },

  "FINANCIAL OPERATIONS": {
    title: "Financial Operations Startups 2026 — Ramp vs Brex | UpForge",
    description: "The startups automating corporate finance in 2026 — Ramp, Brex, and the spend management tools replacing Expensify, Concur, and traditional corporate cards.",
    keywords: ["financial operations startups 2026", "Ramp startup profile", "Ramp vs Brex comparison", "spend management software startup", "corporate card startup 2026"],
    h1: "Financial Operations Startups",
    subheading: "The companies automating business expenses, eliminating corporate card waste, and replacing legacy finance stacks.",
  },

  "SINGLE-PURPOSE AI UTILITY": {
    title: "Single-Purpose AI Utility Startups 2026 — Remove.bg & More | UpForge",
    description: "The highest-traffic AI utility startups of 2026 — remove background from image, AI photo cutout, transparent background maker, and tools doing one job perfectly.",
    keywords: ["AI utility startups 2026", "remove background from image", "AI photo cutout startup", "Remove.bg company", "single purpose AI tools 2026"],
    h1: "Single-Purpose AI Utility Startups",
    subheading: "The startups that do exactly one thing with AI — and get 150 million visits a month doing it.",
  },

  "PRODUCTIVITY TOOLS": {
    title: "Productivity Tool Startups 2026 — Smallpdf, PDF Tools | UpForge",
    description: "The best productivity and document tool startups of 2026 — compress PDF, convert PDF to Word, merge PDF free, and the bootstrapped businesses dominating utility search.",
    keywords: ["productivity tool startups 2026", "Smallpdf startup", "compress PDF startup", "PDF tool company", "document productivity startup 2026"],
    h1: "Productivity Tool Startups",
    subheading: "The bootstrapped utility businesses that millions use daily — solving the document tasks everyone needs done.",
  },

  "EDTECH & LANGUAGE LEARNING": {
    title: "EdTech & Language Learning Startups 2026 — Preply, Duolingo | UpForge",
    description: "The best EdTech and language learning startups of 2026 — Preply native speaking tutors, Duolingo, and the platforms dominating 'learn English online' and 'Spanish tutor near me'.",
    keywords: ["EdTech startups 2026", "language learning startups", "Preply startup profile", "learn English online platform", "best language learning apps 2026"],
    h1: "EdTech & Language Learning Startups",
    subheading: "From Preply's 40,000 native tutors to AI language learning apps — the platforms teaching the world in 2026.",
  },

  // ── EXISTING INDIAN CATEGORIES (kept for .in domain) ─────────────────────

  "QUICK COMMERCE": {
    title: "Quick Commerce Startups India 2026 — Zepto, Blinkit | UpForge",
    description: "India's leading quick commerce startups — Zepto, Blinkit, Swiggy Instamart. 10-minute delivery, dark store models, and the companies winning India's grocery wars.",
    keywords: ["quick commerce startups India 2026", "Zepto startup", "10 minute delivery India", "dark store startup India", "grocery delivery startup India"],
    h1: "Quick Commerce Startups India",
    subheading: "The companies delivering groceries in under 10 minutes — and rewriting the rules of Indian retail.",
  },

  "FINTECH": {
    title: "Top FinTech Startups India 2026 — CRED, Groww, Zerodha | UpForge",
    description: "India's top FinTech startups in 2026 — CRED, Groww, Zerodha, Razorpay, PhonePe. Profiles, founder stories, funding data, and the innovations reshaping Indian finance.",
    keywords: ["fintech startups India 2026", "CRED startup", "Groww investment app startup", "Indian fintech unicorns 2026", "top fintech companies India"],
    h1: "FinTech Startups India 2026",
    subheading: "The companies reinventing credit, investing, payments, and wealth for India's 500 million internet users.",
  },

  "EDTECH": {
    title: "EdTech Startups India 2026 — PhysicsWallah, BYJU'S | UpForge",
    description: "India's best EdTech startups in 2026 — PhysicsWallah, Unacademy, Vedantu. JEE prep, NEET coaching, school learning, and affordable education at scale.",
    keywords: ["edtech startups India 2026", "PhysicsWallah startup", "Indian online education startup", "JEE NEET coaching app", "affordable edtech India"],
    h1: "EdTech Startups India 2026",
    subheading: "From PhysicsWallah's ₹4,000 JEE prep to the startups making world-class education affordable across Bharat.",
  },

  "SOCIAL COMMERCE": {
    title: "Social Commerce Startups India 2026 — Meesho & More | UpForge",
    description: "India's top social commerce startups — Meesho, GlowRoad, DealShare. Reseller platforms, WhatsApp commerce, and e-commerce built for India's next 300 million users.",
    keywords: ["social commerce startups India 2026", "Meesho startup", "WhatsApp commerce India", "reseller platform India", "Bharat e-commerce startup"],
    h1: "Social Commerce Startups India",
    subheading: "The platforms turning India's homemakers and small shopkeepers into digital entrepreneurs.",
  },

  "MOBILITY": {
    title: "Mobility Startups India 2026 — Rapido, Ola, Uber India | UpForge",
    description: "India's top mobility startups in 2026 — Rapido bike taxis, Ola, BluSmart. The companies solving urban transportation for India's 600 million city dwellers.",
    keywords: ["mobility startups India 2026", "Rapido startup", "bike taxi startup India", "ride hailing startup India", "urban transport startup India"],
    h1: "Mobility Startups India 2026",
    subheading: "From Rapido's bike taxis to EV fleets — the companies moving India's cities forward.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATION FUNCTIONS
// Used when a category is not in CATEGORY_SEO_MAP
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a keyword-rich <title> for any category.
 */
export function generateCategoryTitle(dbCategory: string, count: number): string {
  const mapped = CATEGORY_SEO_MAP[dbCategory]
  if (mapped) return mapped.title

  const n = count > 0 ? `${count.toLocaleString()} ` : ""
  return `${n}${dbCategory} Startups 2026 — Verified Profiles | UpForge`
}

/**
 * Generate a <meta description> for any category.
 */
export function generateCategoryDescription(
  dbCategory: string,
  count: number
): string {
  const mapped = CATEGORY_SEO_MAP[dbCategory]
  if (mapped) return mapped.description

  const n = count > 0 ? count.toLocaleString() : "verified"
  return `Discover ${n} ${dbCategory} startups — verified profiles including founders, funding data, and company details. India's independent startup registry.`
}

/**
 * Generate a hero heading for the category page.
 */
export function generateCategoryH1(dbCategory: string): string {
  const mapped = CATEGORY_SEO_MAP[dbCategory]
  return mapped?.h1 ?? `${dbCategory} Startups`
}

/**
 * Generate a supporting subheading for the category page hero.
 */
export function generateCategorySubheading(dbCategory: string, count: number): string {
  const mapped = CATEGORY_SEO_MAP[dbCategory]
  if (mapped) return mapped.subheading

  const n = count > 0 ? count.toLocaleString() : "verified"
  return `${n} registry-verified ${dbCategory} startups. Free for founders, designed for investors, researchers, and press.`
}

/**
 * Return keyword array for a category (meta keywords + JSON-LD).
 */
export function getCategoryKeywords(dbCategory: string): string[] {
  const mapped = CATEGORY_SEO_MAP[dbCategory]
  if (mapped) return mapped.keywords

  // Generic fallback
  const slug = categoryToSlug(dbCategory)
  return [
    `${dbCategory.toLowerCase()} startups 2026`,
    `top ${dbCategory.toLowerCase()} companies`,
    `${slug} startup profiles`,
    `${dbCategory.toLowerCase()} unicorns India`,
    `best ${dbCategory.toLowerCase()} startups`,
  ]
}

/**
 * Generate a longer body-copy description for the category page hero.
 * (kept for backward compatibility)
 */
export function generateCategoryLongDescription(
  dbCategory: string,
  count: number
): string {
  const mapped = CATEGORY_SEO_MAP[dbCategory]
  if (mapped) return mapped.description

  const n = count > 0 ? count.toLocaleString() : "verified"
  return `India's ${dbCategory} ecosystem is home to ${n} verified startups building at the frontier of their sector. UpForge maintains structured registry profiles for listed companies — free for founders, designed for investors, researchers, and press.`
}
