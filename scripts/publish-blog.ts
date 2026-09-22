import fs from "fs"
import path from "path"
import { execSync } from "child_process"

// Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const FORCED_TOPIC = process.env.FORCED_TOPIC

// RSS Feed URLs
const RSS_FEEDS = [
  "https://trends.google.com/trending/rss?geo=IN",
  "https://yourstory.com/feed",
  "https://inc42.com/feed/",
]

// Fallback topics if RSS feeds fail or return no relevant topics
const FALLBACK_TOPICS = [
  "How Tier 2 & Tier 3 City Founders in India Are Building Profitable SaaS Companies in 2026",
  "AI Workflow Automation: How Early-Stage Indian Startups Cut Overhead by 40%",
  "The Indian Job Market Shift: High-Growth Startup Roles vs Legacy Corporate Careers",
  "Navigating ESOPs, Offer Letters, and Equity Grants for Indian Tech Talent in 2026",
  "Bootstrap vs VC Funding in India: What Every First-Time Founder Must Know",
  "The Rise of Deep Tech & Climate Tech Capital in Bengaluru, Hyderabad, and Pune",
]

interface GeneratedBlogPayload {
  title: string
  metaDescription: string
  keywords: string[]
  excerpt: string
  contentMarkdown: string
}

interface HeadingItem {
  id: string
  text: string
  level: number
}

// Helper: Send Telegram notification
async function sendTelegramMessage(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("⚠️ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not provided. Skipping Telegram notification.")
    return
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      console.error(`Telegram API error (${res.status}): ${errText}`)
    }
  } catch (err: any) {
    console.error(`Failed to send Telegram message: ${err.message}`)
  }
}

// Helper: Fetch RSS Feed titles
async function fetchHeadlinesFromRSS(feedUrl: string): Promise<string[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) UpForgeBot/1.0",
      },
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      console.warn(`RSS feed ${feedUrl} returned status ${res.status}`)
      return []
    }

    const xml = await res.text()
    const matches = xml.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/gi) || []
    const titles: string[] = []

    for (const match of matches) {
      const clean = match
        .replace(/<\/?title>/gi, "")
        .replace(/<!\[CDATA\[/gi, "")
        .replace(/\]\]>/gi, "")
        .trim()

      if (clean && !clean.toLowerCase().includes("rss") && !clean.toLowerCase().includes("yourstory") && !clean.toLowerCase().includes("inc42")) {
        titles.push(clean)
      }
    }

    return titles
  } catch (err: any) {
    console.warn(`Skipping feed ${feedUrl}: ${err.message}`)
    return []
  }
}

// Select a trending topic
async function selectTopic(): Promise<string> {
  if (FORCED_TOPIC && FORCED_TOPIC.trim().length > 0) {
    console.log(`📌 Using FORCED_TOPIC: "${FORCED_TOPIC}"`)
    return FORCED_TOPIC.trim()
  }

  console.log("🔍 Harvesting trending headlines from RSS feeds...")
  const headlines: string[] = []

  for (const feed of RSS_FEEDS) {
    const items = await fetchHeadlinesFromRSS(feed)
    console.log(`  Fetched ${items.length} titles from ${feed}`)
    headlines.push(...items)
  }

  if (headlines.length > 0) {
    // Prefer multi-word headlines for richer LLM context
    const multiWord = headlines.filter((h) => h.split(/\s+/).length >= 2)
    const pool = multiWord.length > 0 ? multiWord : headlines
    const randomIndex = Math.floor(Math.random() * pool.length)
    let rawHeadline = pool[randomIndex]

    if (rawHeadline.split(/\s+/).length === 1) {
      rawHeadline = `${rawHeadline} Tech & Business Impact for Indian Founders and Job-Seekers`
    }

    console.log(`🎯 Selected RSS headline: "${rawHeadline}"`)
    return rawHeadline
  }

  // Fallback if no feeds succeeded
  const fallback = FALLBACK_TOPICS[Math.floor(Math.random() * FALLBACK_TOPICS.length)]
  console.log(`ℹ️ No RSS headlines retrieved. Using curated fallback topic: "${fallback}"`)
  return fallback
}

// Call Groq API with LLM prompt
async function callGroqAPI(topic: string): Promise<GeneratedBlogPayload> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY environment variable is not defined.")
  }

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentDateLabel = now.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })

  const systemPrompt = `You are a world-class Indian tech journal editor and senior analyst writing for UpForge (upforge.org).
Your goal is to write a deeply engaging, 900-1200 word, SEO-optimized, highly actionable blog post tailored for Indian founders, startup teams, students, and job-seekers.

TODAY'S ACTUAL DATE IS: ${currentDateLabel} (year ${currentYear}). This is critical:
- Never reference an old year like "2024" or "2025" as if it were current. All forward-looking claims, trend labels, and "as of" statements must use ${currentYear} (or later, if discussing the future).
- If the title or headings reference a year, it must be ${currentYear} — do not default to an older year from memory.

CRITICAL WRITING REQUIREMENTS:
1. FIRST 2 LINES: Must hook the reader with raw emotion, intense curiosity, or a bold surprising claim. NEVER start with generic openers like "In today's fast-paced world" or "In recent years".
2. STORYTELLING & REALISM: Start with a relatable founder, student, or job-seeker scenario (e.g. late night coding in Koramangala, pitching in Gurgaon, salary negotiation in Pune) before diving into data and analysis.
3. CONTEXT & TONE: Conversational, confident, authoritative, culturally resonant in India (mention specific cities like Bengaluru, Mumbai, Delhi-NCR, Hyderabad; rupee figures in Lakhs/Crores; real companies/case studies where relevant). Never robotic or preachy.
4. STRUCTURE: Use clear H2 and H3 subheadings, short punchy paragraphs (2-4 sentences max), bullet points, bold key terms, and blockquotes for key takeaways.
   - When comparing multiple items (e.g. pitfalls vs fixes, options vs pros/cons), use a proper Markdown pipe table with a header row and a separator row, e.g.:
     | Column A | Column B |
     |---|---|
     | Row text | Row text |
     Keep table cells short (under ~12 words) since they render in a narrow column on mobile.
   - Do not nest more than one level of bullet points, and avoid more than 5-6 bullets in a row — break long lists into shorter grouped sections with their own mini-heading instead.
5. SEO OPTIMIZATION:
   - Include the primary target keyword in the title, first 100 words, and 3-4 times naturally throughout the body.
   - Write a compelling Meta Description between 150 and 160 characters.
   - End with a dedicated "## Frequently Asked Questions (FAQ)" section (H2) containing exactly 3 high-intent questions and clear answers. Each question MUST be its own "### " (H3, exactly three hashes) heading — never use "####" or any other heading level for FAQ questions — followed by a plain paragraph answer, for Google Discover & featured snippets.
6. CALL TO ACTION: End with a genuine, inspiring final takeaway and a soft, non-salesy mention of UpForge (e.g. checking verified startup listings or registering on the UpForge Global Registry).

STRICT OUTPUT FORMAT:
You MUST output strictly valid JSON matching this exact structure with no extra text or markdown formatting outside the JSON object:
{
  "title": "Catchy, High-CTR Headline with Primary Keyword",
  "metaDescription": "150-160 character meta description containing primary keyword.",
  "keywords": ["Primary Keyword", "Secondary Keyword 1", "Secondary Keyword 2", "Indian Startups", "Founder Playbook"],
  "excerpt": "A concise 2-sentence summary/dek for the article hero section.",
  "contentMarkdown": "# Markdown content starting with body paragraphs, H2/H3 subheadings, bullet points, blockquotes, FAQ section, and UpForge conclusion."
}`

  const userPrompt = `Write an in-depth 900-1200 word blog post on this topic/headline: "${topic}". Make it relevant for Indian founders, tech workers, and job-seekers.`

  const requestPayload = {
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  }

  const endpoint = "https://api.groq.com/openai/v1/chat/completions"

  const executeRequest = async (): Promise<GeneratedBlogPayload> => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    })

    if (!response.ok) {
      const errBody = await response.text()
      throw new Error(`Groq API returned HTTP ${response.status}: ${errBody}`)
    }

    const data = await response.json()
    const rawContent = data.choices?.[0]?.message?.content
    if (!rawContent) {
      throw new Error("Groq API returned an empty choices content response.")
    }

    const parsed: GeneratedBlogPayload = JSON.parse(rawContent)
    return parsed
  }

  // Validate payload
  const isValid = (payload: any): payload is GeneratedBlogPayload => {
    return (
      typeof payload?.title === "string" && payload.title.length > 5 &&
      typeof payload?.metaDescription === "string" && payload.metaDescription.length > 20 &&
      Array.isArray(payload?.keywords) && payload.keywords.length > 0 &&
      typeof payload?.excerpt === "string" && payload.excerpt.length > 10 &&
      typeof payload?.contentMarkdown === "string" && payload.contentMarkdown.length > 300
    )
  }

  try {
    console.log("⚡ Calling Groq API (openai/gpt-oss-120b)...")
    const result = await executeRequest()
    if (isValid(result)) return result
    console.warn("⚠️ Initial Groq response failed validation. Retrying once...")
  } catch (err: any) {
    console.warn(`⚠️ Groq API first attempt failed (${err.message}). Retrying once...`)
  }

  // Single Retry
  console.log("⚡ Retrying Groq API call...")
  const retryResult = await executeRequest()
  if (!isValid(retryResult)) {
    throw new Error("Groq API response failed validation on retry.")
  }
  return retryResult
}

// ---------------------------------------------------------------------------
// EDITORIAL INTERNAL-LINK GLOSSARY
// A curated (not auto-guessed) list of {phrase -> existing UpForge article}.
// This is how professional publications do internal linking: a maintained
// dictionary, not fuzzy keyword matching — so links always feel natural and
// never spammy. Add a line here whenever you publish a new evergreen post
// you'd like future articles to be able to link to.
// ---------------------------------------------------------------------------
const INTERNAL_LINK_GLOSSARY: { phrase: string; slug: string }[] = [
  { phrase: "UFRN credential", slug: "startup-verification-ufrn-credentials-guide" },
  { phrase: "startup verification", slug: "startup-verification-ufrn-credentials-guide" },
  { phrase: "seed funding", slug: "how-to-get-startup-funding-india-2026" },
  { phrase: "startup funding", slug: "how-to-get-startup-funding-india-2026" },
  { phrase: "venture capital firms", slug: "best-vc-firms-india-2026" },
  { phrase: "VC firms", slug: "best-vc-firms-india-2026" },
  { phrase: "pitch deck", slug: "startup-pitch-deck-template-india-2026" },
  { phrase: "ESOP", slug: "esop-guide-for-startups-india-2026" },
  { phrase: "GST compliance", slug: "gst-compliance-guide-startups-india-2026" },
  { phrase: "startup valuation", slug: "startup-valuation-india-2026" },
  { phrase: "hiring your first employees", slug: "startup-hiring-guide-india-2026" },
  { phrase: "AI startups", slug: "top-ai-startups-india-2026" },
  { phrase: "SaaS startups", slug: "top-20-saas-startups-india-2026" },
  { phrase: "fintech startups", slug: "fintech-startups-india-2026" },
  { phrase: "healthtech startups", slug: "healthtech-startups-india-2026" },
  { phrase: "climate tech", slug: "climate-tech-startups-india-2026" },
  { phrase: "D2C brands", slug: "d2c-startups-india-2026" },
  { phrase: "no-code platforms", slug: "ai-powered-no-code-platforms-the-2026-playbook-for-indian-founders-tech-jobseekers" },
  { phrase: "AI agents", slug: "ai-agents-for-startups-india-2026" },
  { phrase: "startup incubators", slug: "top-startup-incubators-india-2026" },
  { phrase: "bootstrapped startups", slug: "bootstrapped-startups-india-success-stories" },
  { phrase: "Indian unicorns", slug: "top-indian-unicorns-2026" },
  { phrase: "why startups fail", slug: "startup-failure-reasons-india" },
  { phrase: "legal guide for startups", slug: "startup-legal-guide-india-2026" },
  { phrase: "women founders", slug: "women-founders-india-2026" },
]

// Wikipedia-style internal linking: scans the markdown body for the FIRST
// natural occurrence of each glossary phrase and turns it into a markdown
// link to that article. Capped at maxLinks so it stays tasteful, not spammy.
function injectInternalLinks(markdown: string, currentSlug: string, maxLinks = 4): string {
  const lines = markdown.split("\n")
  const usedPhrases = new Set<string>()
  let linksAdded = 0

  const candidates = INTERNAL_LINK_GLOSSARY.filter((g) => g.slug !== currentSlug)

  for (let i = 0; i < lines.length && linksAdded < maxLinks; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip headings, blockquotes, table rows, and empty lines — only link
    // inside normal flowing prose (paragraphs / list items).
    if (!trimmed || /^#{1,6}\s/.test(trimmed) || trimmed.startsWith(">") || trimmed.startsWith("|")) {
      continue
    }

    for (const { phrase, slug } of candidates) {
      if (usedPhrases.has(phrase)) continue
      if (linksAdded >= maxLinks) break

      // Already a markdown link somewhere on this line? Don't double-wrap.
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const pattern = new RegExp(`\\b(${escaped})\\b(?!\\]\\()`, "i")
      const match = line.match(pattern)

      if (match && match.index !== undefined) {
        const matchedText = match[0]
        // Make sure we're not already inside an existing [..](..) link
        const before = line.slice(0, match.index)
        const openBrackets = (before.match(/\[/g) || []).length
        const closeBrackets = (before.match(/\]/g) || []).length
        if (openBrackets > closeBrackets) continue // inside an existing link's text

        lines[i] =
          line.slice(0, match.index) +
          `[${matchedText}](/blog/${slug})` +
          line.slice(match.index + matchedText.length)

        usedPhrases.add(phrase)
        linksAdded++
        break // only one new link per line, keeps prose clean
      }
    }
  }

  return lines.join("\n")
}

// Convert title to deterministic kebab-case slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// Helper: Slugify heading text for ID
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// Convert Markdown to HTML & Extract Headings
function processMarkdown(markdown: string): { bodyHtml: string; headings: HeadingItem[] } {
  const lines = markdown.split("\n")
  const headings: HeadingItem[] = []
  let htmlResult = ""

  let inList = false
  let listType: "ul" | "ol" | null = null
  let inBlockquote = false
  let inFaqSection = false
  let faqItemOpen = false

  // Detects a markdown pipe-table row like "| Cell A | Cell B |"
  const isTableRow = (l: string) => /^\|.*\|$/.test(l.trim())
  // Detects the separator row like "|---|---|" or "| :--- | ---: |"
  const isTableSeparator = (l: string) =>
    /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(l.trim())
  const splitTableRow = (l: string): string[] =>
    l
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim())

  const closeList = () => {
    if (inList) {
      htmlResult += listType === "ul" ? "</ul>\n" : "</ol>\n"
      inList = false
      listType = null
    }
  }

  const closeBlockquote = () => {
    if (inBlockquote) {
      htmlResult += "</blockquote>\n"
      inBlockquote = false
    }
  }

  const closeFaqItem = () => {
    if (faqItemOpen) {
      htmlResult += "</div></details>\n"
      faqItemOpen = false
    }
  }

  const processInline = (text: string): string => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      // Italics
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    if (!line) {
      closeList()
      closeBlockquote()
      continue
    }

    // Skip top level # H1 title if generated inside markdown
    if (line.startsWith("# ")) {
      continue
    }

    // Markdown table: a "| ... |" row immediately followed by a "|---|---|" separator row
    if (isTableRow(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      closeList()
      closeBlockquote()

      const headerCells = splitTableRow(line)
      htmlResult += `<table>\n  <thead>\n    <tr>\n`
      headerCells.forEach((cell) => {
        htmlResult += `      <th>${processInline(cell)}</th>\n`
      })
      htmlResult += `    </tr>\n  </thead>\n  <tbody>\n`

      let j = i + 2 // skip header + separator
      while (j < lines.length && isTableRow(lines[j].trim())) {
        const rowCells = splitTableRow(lines[j].trim())
        htmlResult += `    <tr>\n`
        rowCells.forEach((cell) => {
          htmlResult += `      <td>${processInline(cell)}</td>\n`
        })
        htmlResult += `    </tr>\n`
        j++
      }

      htmlResult += `  </tbody>\n</table>\n`
      i = j - 1 // advance the outer loop past the table
      continue
    }

    // H2 Headings
    if (line.startsWith("## ")) {
      closeList()
      closeBlockquote()
      closeFaqItem()
      const headingText = line.replace(/^##\s+/, "").replace(/\*\*/g, "").trim()
      const id = slugifyHeading(headingText)
      headings.push({ id, text: headingText, level: 2 })
      htmlResult += `<h2 id="${id}">${processInline(headingText)}</h2>\n`
      // Detect the FAQ section by heading text — everything under it renders
      // as a native <details> accordion instead of plain h3/p pairs.
      inFaqSection = /frequently asked questions|\bfaq\b/i.test(headingText)
      continue
    }

    // H3 Headings
    if (line.startsWith("### ")) {
      closeList()
      closeBlockquote()
      const headingText = line.replace(/^###\s+/, "").replace(/\*\*/g, "").trim()

      if (inFaqSection) {
        // FAQ question: open a native, JS-free collapsible accordion item.
        closeFaqItem()
        htmlResult += `<details class="faq-item"><summary>${processInline(headingText)}</summary><div class="faq-answer">`
        faqItemOpen = true
        continue
      }

      closeFaqItem()
      const id = slugifyHeading(headingText)
      headings.push({ id, text: headingText, level: 3 })
      htmlResult += `<h3 id="${id}">${processInline(headingText)}</h3>\n`
      continue
    }

    // H4 Headings (AI sometimes emits #### for FAQ questions instead of ###)
    if (line.startsWith("#### ")) {
      closeList()
      closeBlockquote()
      const headingText = line.replace(/^####\s+/, "").replace(/\*\*/g, "").trim()

      if (inFaqSection) {
        // Treat exactly like an H3 FAQ question so it becomes a collapsible item.
        closeFaqItem()
        htmlResult += `<details class="faq-item"><summary>${processInline(headingText)}</summary><div class="faq-answer">`
        faqItemOpen = true
        continue
      }

      closeFaqItem()
      const id = slugifyHeading(headingText)
      headings.push({ id, text: headingText, level: 4 })
      htmlResult += `<h4 id="${id}">${processInline(headingText)}</h4>\n`
      continue
    }

    // Blockquote
    if (line.startsWith("> ")) {
      closeList()
      const quoteText = line.replace(/^>\s+/, "").trim()
      if (!inBlockquote) {
        htmlResult += `<blockquote>&ldquo;${processInline(quoteText)}&rdquo;</blockquote>\n`
      } else {
        htmlResult += `<p>${processInline(quoteText)}</p>\n`
      }
      inBlockquote = true
      continue
    }

    // Unordered list (* or -)
    if (line.startsWith("* ") || line.startsWith("- ")) {
      closeBlockquote()
      const itemText = line.replace(/^[\*\-]\s+/, "").trim()
      if (!inList || listType !== "ul") {
        closeList()
        htmlResult += "<ul>\n"
        inList = true
        listType = "ul"
      }
      htmlResult += `  <li>${processInline(itemText)}</li>\n`
      continue
    }

    // Ordered list (1. 2. etc)
    if (/^\d+\.\s+/.test(line)) {
      closeBlockquote()
      const itemText = line.replace(/^\d+\.\s+/, "").trim()
      if (!inList || listType !== "ol") {
        closeList()
        htmlResult += "<ol>\n"
        inList = true
        listType = "ol"
      }
      htmlResult += `  <li>${processInline(itemText)}</li>\n`
      continue
    }

    // Standard paragraph
    closeList()
    closeBlockquote()
    htmlResult += `<p>${processInline(line)}</p>\n`
  }

  closeList()
  closeBlockquote()
  closeFaqItem()

  return { bodyHtml: htmlResult.trim(), headings }
}

// Append new post to data/blog-posts.ts
function saveBlogPostToDataFile(blogPost: any): void {
  const filePath = path.join(process.cwd(), "data", "blog-posts.ts")
  if (!fs.existsSync(filePath)) {
    throw new Error(`Target file ${filePath} does not exist.`)
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const exportArrayMarker = "export const BLOG_POSTS: BlogPost[] = ["

  const markerIndex = fileContent.indexOf(exportArrayMarker)
  if (markerIndex === -1) {
    throw new Error("Could not find export const BLOG_POSTS marker in data/blog-posts.ts")
  }

  const insertPosition = markerIndex + exportArrayMarker.length

  const formattedPostString = `\n  ${JSON.stringify(blogPost, null, 4).replace(/"([^"]+)":/g, "$1:")},`

  const updatedContent =
    fileContent.slice(0, insertPosition) +
    formattedPostString +
    fileContent.slice(insertPosition)

  fs.writeFileSync(filePath, updatedContent, "utf-8")
  console.log(`✅ Successfully saved post "${blogPost.title}" to data/blog-posts.ts`)
}

// Git commit & push
function commitAndPush(slug: string): void {
  try {
    console.log("⚙️ Configuring git user & committing changes...")
    execSync('git config user.name "UpForge Auto Publisher"')
    execSync('git config user.email "bot@upforge.org"')
    execSync("git add data/blog-posts.ts")
    execSync(`git commit -m "feat(blog): publish automated post - ${slug}"`)
    console.log("🚀 Pushing commit to main branch...")
    execSync("git push origin main")
    console.log("✅ Successfully pushed to main!")
  } catch (err: any) {
    console.error(`⚠️ Git commit/push step failed: ${err.message}`)
  }
}

// Main execution function
async function main(): Promise<void> {
  console.log("🚀 Starting Automated Blog Publisher...")

  try {
    // Step 1: Select Topic
    const topic = await selectTopic()

    // Step 2: Call Groq API
    const payload = await callGroqAPI(topic)

    // Step 3: Slug & Cover Image URL
    let slug = generateSlug(payload.title)
    if (!slug) {
      slug = `post-${Date.now()}`
    }

    const coverImageUrl = `https://images.upforge.org/blog/${slug}.webp`

    // Step 3.5: Add tasteful, Wikipedia-style internal links to other UpForge articles
    payload.contentMarkdown = injectInternalLinks(payload.contentMarkdown, slug)

    // Step 4: Process Markdown for bodyHtml & headings
    const { bodyHtml, headings } = processMarkdown(payload.contentMarkdown)

    // Calculate Read Time
    const wordCount = payload.contentMarkdown.split(/\s+/).length
    const readTimeMinutes = Math.max(4, Math.ceil(wordCount / 200))
    const readTimeStr = `${readTimeMinutes} min`

    // Current Date
    const now = new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dateStr = `${monthNames[now.getMonth()]} ${now.getFullYear()}`
    const publishedAtStr = now.toISOString().split("T")[0]

    // Construct BlogPost object
    const newPost = {
      title: payload.title,
      slug: slug,
      category: "FOUNDER PLAYBOOK",
      categorySlug: "playbook",
      excerpt: payload.excerpt,
      date: dateStr,
      readTime: readTimeStr,
      featured: false,
      image: coverImageUrl,
      coverImageUrl: coverImageUrl,
      coverImageAlt: `${payload.title} Cover`,
      authorName: "Lucky Tiwari",
      authorImageUrl: "/lucky-tiwari.png",
      authorTitle: "Founder & Editor-in-Chief",
      publishedAt: publishedAtStr,
      metaDescription: payload.metaDescription,
      tags: payload.keywords || ["Startup Insights", "Founder Playbook", "India Tech"],
      headings: headings,
      bodyHtml: bodyHtml,
    }

    // Step 5: Save to data/blog-posts.ts
    saveBlogPostToDataFile(newPost)

    // Step 6: Git commit & push
    commitAndPush(slug)

    // Step 7: Telegram Success Notification
    const liveUrl = `https://upforge.org/blog/${slug}`
    const successMessage = `Boss, blog likh diya ✅\n\n<b>Title:</b> ${payload.title}\n<b>Cover Image:</b> ${coverImageUrl}\n<b>Live URL:</b> ${liveUrl}`
    await sendTelegramMessage(successMessage)

    console.log("🎉 Automated blog publishing completed successfully!")
  } catch (error: any) {
    const errorMsg = error?.message || String(error)
    console.error(`❌ Blog Publisher Error: ${errorMsg}`)

    // Telegram Failure Notification
    const failureMessage = `❌ <b>Blog Auto-Publisher Failed</b>\n\n<b>Error:</b> ${errorMsg}`
    await sendTelegramMessage(failureMessage)

    process.exit(1)
  }
}

main()
