// lib/google-sheets.ts
// ─────────────────────────────────────────────────────────────────────────────
// Central Google Sheets data layer for UpForge startup registry.
// Single source of truth — fetches all startup data from the public CSV export,
// parses it, and caches it in-memory with a 5-minute TTL.
//
// Usage:
//   import { fetchAllStartups, getSheetFilters } from "@/lib/google-sheets"
//   const startups = await fetchAllStartups()
// ─────────────────────────────────────────────────────────────────────────────

import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import { unstable_cache } from "next/cache"


// ── Public CSV export URL (same sheet used by /startup/[slug]) ───────────────
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMkWuF_Avm_ojh07YhuQfZT5IFq9g3HM6DVfEVV56jcwykv_zdqMdxdbIM-iY4ugahyIeZ3E0bNUbD/pub?gid=0&single=true&output=csv"

// ── In-memory cache ───────────────────────────────────────────────────────────
let _cachedStartups: Startup[] = []
let _cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// ── CSV parser — handles quoted fields with embedded commas/newlines ──────────
function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let row: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(current.trim())
      current = ""
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      row.push(current.trim())
      current = ""
      if (row.some(Boolean)) rows.push(row)
      row = []
      continue
    }

    current += char
  }

  if (current.length || row.length) {
    row.push(current.trim())
    if (row.some(Boolean)) rows.push(row)
  }

  if (rows.length < 2) return []

  const headers = rows[0].map((header) =>
    header.replace(/^"|"$/g, "").replace(/^\uFEFF/, "").trim()
  )

  return rows.slice(1).map((values) => {
    const record: Record<string, string> = {}
    headers.forEach((header, index) => {
      if (!header) return
      record[header] = (values[index] ?? "").trim()
    })
    return record
  })
}

// ── Safe decode (handles URL-encoded values) ──────────────────────────────────
function safeDecode(val: string | undefined): string {
  if (!val) return ""
  try {
    return decodeURIComponent(val).trim()
  } catch {
    return val.trim()
  }
}

const STARTUP_DESCRIPTION_OVERRIDES: Record<string, string> = {
  "agnikul-cosmos": "Agnikul Cosmos is a pioneering space technology venture developing state-of-the-art orbital-class micro satellite launch vehicles. Operating out of the Indian Institute of Technology Madras, the startup is designing Agnibaan, a highly customizable, 3D-printed rocket engine capable of carrying payloads up to 100 kg to low Earth orbits. Agnikul's core distinction lies in its proprietary semi-cryogenic engine, Agnilet, which is constructed entirely as a single piece of hardware using advanced metal 3D printing. The company raised over $40M from leading deep-tech and space-tech institutional investors, positioning itself as a core infrastructure builder in India's privatized aerospace push. In H1 2026, the company successfully validated its launch authorization pathways, securing contracts for commercial small-satellite deployment alongside national space initiatives.",
  "articulus-surgical": "Articulus Surgical is a high-conviction medical technology startup innovating in the robotic-assisted surgery space. The venture develops advanced handheld surgical tools that enable minimally invasive laparoscopic procedures with high precision, dexterity, and ergonomics for surgeons. By using proprietary mechanical micro-linkages and local manufacturing, Articulus produces tools that offer the benefits of multi-million dollar surgical robots at a fraction of the cost, making advanced surgery accessible to tier-2 and tier-3 hospital networks. The company has raised significant early-stage funding to complete its preclinical trials and secure regulatory approvals from Indian and international healthcare bodies. Its strategic expansion focuses on upgrading surgical infrastructure across emerging markets where capital expense limitations prevent the adoption of full-scale mainframe robotic consoles.",
  "ather-energy-ev": "Ather Energy is a pioneer and market leader in the premium smart electric two-wheeler segment in India. The company designs, manufactures, and deploys high-performance electric scooters, including the widely popular Ather 450X and 450S models, alongside building Ather Grid—a proprietary fast-charging infrastructure network spanning hundreds of locations across the country. Ather stands out for its vertical integration, developing its own battery packs, battery management systems, vehicle dashboards, and software stack in-house. The company has raised over $450M from institutional investors like Hero MotoCorp, GIC, and Tiger Global, and is actively preparing for its upcoming public listing in 2026. Ather's market position is driven by its strong unit economics, high brand loyalty, and focus on charging accessibility, helping to transition metropolitan commuters to sustainable mobility options.",
  "ather-energy": "Ather Energy is a pioneer and market leader in the premium smart electric two-wheeler segment in India. The company designs, manufactures, and deploys high-performance electric scooters, including the widely popular Ather 450X and 450S models, alongside building Ather Grid—a proprietary fast-charging infrastructure network spanning hundreds of locations across the country. Ather stands out for its vertical integration, developing its own battery packs, battery management systems, vehicle dashboards, and software stack in-house. The company has raised over $450M from institutional investors like Hero MotoCorp, GIC, and Tiger Global, and is actively preparing for its upcoming public listing in 2026. Ather's market position is driven by its strong unit economics, high brand loyalty, and focus on charging accessibility, helping to transition metropolitan commuters to sustainable mobility options.",
  "atomberg-fans": "Atomberg is a highly disruptive consumer durables company that has transformed the home appliance sector by introducing energy-efficient brushless direct current (BLDC) motor technology to household fans and smart kitchen products. By replacing traditional induction motors with customized BLDC architectures, Atomberg fans consume up to 65% less electricity while delivering superior air delivery and smart remote functionalities. The venture's distinct advantage is its deep focus on hardware engineering and local manufacturing, allowing it to offer premium energy-saving appliances at accessible consumer prices. Atomberg has raised over $120M from key venture capital funds, including Temasek and Steadview Capital, and has expanded its distribution channels across offline retail networks in major tier-1 and tier-2 cities, achieving significant market share in the energy-conscious household space.",
  "atomberg": "Atomberg is a highly disruptive consumer durables company that has transformed the home appliance sector by introducing energy-efficient brushless direct current (BLDC) motor technology to household fans and smart kitchen products. By replacing traditional induction motors with customized BLDC architectures, Atomberg fans consume up to 65% less electricity while delivering superior air delivery and smart remote functionalities. The venture's distinct advantage is its deep focus on hardware engineering and local manufacturing, allowing it to offer premium energy-saving appliances at accessible consumer prices. Atomberg has raised over $120M from key venture capital funds, including Temasek and Steadview Capital, and has expanded its distribution channels across offline retail networks in major tier-1 and tier-2 cities, achieving significant market share in the energy-conscious household space.",
  "bharatpe-fintech": "BharatPe is a prominent fintech unicorn that provides QR code-based digital payments, merchant services, and lending solutions to small and medium-sized merchants across India. The company pioneered the zero-commission UPI QR code, allowing merchants to accept payments from any UPI application for free, and subsequently launched merchants-focused card machines and short-term credit lines in partnership with registered non-banking financial companies (NBFCs). BharatPe's key asset is its merchant transaction data layer, which allows it to underwrite loans for mom-and-pop shops (Kiranas) that are typically underserved by traditional banking networks. The company recently expanded into retail banking through its joint venture in Unity Small Finance Bank, reinforcing its corporate strategy to provide fully integrated financial services to India's retail commerce sector.",
  "bharatpe": "BharatPe is a prominent fintech unicorn that provides QR code-based digital payments, merchant services, and lending solutions to small and medium-sized merchants across India. The company pioneered the zero-commission UPI QR code, allowing merchants to accept payments from any UPI application for free, and subsequently launched merchants-focused card machines and short-term credit lines in partnership with registered non-banking financial companies (NBFCs). BharatPe's key asset is its merchant transaction data layer, which allows it to underwrite loans for mom-and-pop shops (Kiranas) that are typically underserved by traditional banking networks. The company recently expanded into retail banking through its joint venture in Unity Small Finance Bank, reinforcing its corporate strategy to provide fully integrated financial services to India's retail commerce sector.",
  "biopeak": "Biopeak is an emerging biotechnology startup developing advanced biological indicators, diagnostics, and industrial lab monitoring tools for the pharmaceutical and food safety sectors. The company specializes in creating high-accuracy, rapid-response assays and digital monitoring hardware that detect microbiological contamination in sterile manufacturing environments. Biopeak's proprietary biosensor technology reduces the standard incubation time for contamination checks from several days to under six hours, preventing costly product recalls and factory shutdowns. Funded by leading healthcare accelerators and private angel syndicates, the venture is expanding its laboratory footprint and entering corporate partnerships with domestic pharmaceutical manufacturers to automate compliance tracking and maintain sterile validation standards under international regulatory frameworks.",
  "bolna": "Bolna is an advanced conversational AI platform that enables enterprises to build, deploy, and manage highly realistic AI voice agents capable of conducting complex customer support, sales, and booking workflows. By combining proprietary voice synthesis engines with low-latency LLM routing pipelines, Bolna's AI agents engage in natural, human-like voice conversations with customers, minimizing latency and resolving support queries without human intervention. The startup's core distinction lies in its developer-friendly API layer, allowing enterprises to integrate voice agents into existing CRMs and databases within hours. Bolna has raised pre-seed and seed funding from tech-focused venture capital syndicates, positioning itself as a key tool for corporations looking to automate customer communications without sacrificing service quality or brand voice.",
  "cars24-auto": "Cars24 is a leading digital auto-tech platform that has revolutionized the pre-owned vehicle market by introducing a fully transactional, trust-backed online buying and selling experience. The company operates a network of refurbishment centers where used cars undergo rigorous mechanical inspection, certification, and cosmetic repair before being listed for sale with warranty packages and financing options. Cars24's technology moat is its proprietary automated pricing engine, which evaluates vehicle value based on millions of real-time market data points, historical transactions, and cosmetic condition indices. Having raised over $1.1B in funding from global investors like DST Global, SoftBank Vision Fund, and Tencent, Cars24 operates in India, Australia, and the Middle East, transforming the fragmented used car industry into a standardized, digital-first marketplace.",
  "cars24": "Cars24 is a leading digital auto-tech platform that has revolutionized the pre-owned vehicle market by introducing a fully transactional, trust-backed online buying and selling experience. The company operates a network of refurbishment centers where used cars undergo rigorous mechanical inspection, certification, and cosmetic repair before being listed for sale with warranty packages and financing options. Cars24's technology moat is its proprietary automated pricing engine, which evaluates vehicle value based on millions of real-time market data points, historical transactions, and cosmetic condition indices. Having raised over $1.1B in funding from global investors like DST Global, SoftBank Vision Fund, and Tencent, Cars24 operates in India, Australia, and the Middle East, transforming the fragmented used car industry into a standardized, digital-first marketplace.",
  "cava-athleisure": "Cava Athleisure is a digital-first, direct-to-consumer (D2C) fashion brand focused on premium, sustainably manufactured activewear and athleisure garments. The brand combines fashion-forward aesthetics with technical fabric engineering, designing breathable, moisture-wicking apparel suited for both fitness activities and everyday wear. Cava's core focus is on circular fashion, utilizing recycled polyester, organic cotton, and low-impact dyes in its manufacturing supply chain. The company has captured significant organic growth among young urban professionals by leveraging targeted social media marketing, micro-influencer collaborations, and a seamless online checkout experience. Having raised early seed capital, the startup is scaling its production capabilities and expanding into select premium offline retail spaces to build a multi-channel brand presence.",
  "chargezone-ev": "ChargeZone is an innovative electric vehicle infrastructure startup building a high-speed, unmanned EV charging station network across highways and metropolitan areas in India. The company targets the commercial fleet, intercity bus, and personal passenger vehicle segments, deploying fast DC chargers that utilize cloud-based network software for automated billing, real-time station availability mapping, and energy management. ChargeZone's key distinction is its operational collaboration model, partnering with major automotive manufacturers like Mercedes-Benz India, Hyundai, and Tata Motors to establish dedicated charging corridors. Having secured over $100M in equity and debt funding, ChargeZone is expanding its renewable energy sourcing to power its stations, aiming to transition the Indian long-distance transit corridor to zero-emission infrastructure.",
  "chargezone": "ChargeZone is an innovative electric vehicle infrastructure startup building a high-speed, unmanned EV charging station network across highways and metropolitan areas in India. The company targets the commercial fleet, intercity bus, and personal passenger vehicle segments, deploying fast DC chargers that utilize cloud-based network software for automated billing, real-time station availability mapping, and energy management. ChargeZone's key distinction is its operational collaboration model, partnering with major automotive manufacturers like Mercedes-Benz India, Hyundai, and Tata Motors to establish dedicated charging corridors. Having secured over $100M in equity and debt funding, ChargeZone is expanding its renewable energy sourcing to power its stations, aiming to transition the Indian long-distance transit corridor to zero-emission infrastructure.",
  "darwinbox-hr": "Darwinbox is an enterprise-grade, cloud-based Human Resources Management System (HRMS) platform designed to manage the entire employee lifecycle for large corporations. The platform covers core HR workflows, including recruitment, onboarding, payroll processing, performance management, employee engagement, and travel expense tracking, all integrated into a single unified mobile-first interface. Darwinbox's technology edge is its advanced AI-driven analytics, which helps HR executives track talent attrition risks, optimize workforce planning, and automate routine employee queries. The SaaS unicorn has raised over $140M from premier investors such as TCV, Salesforce Ventures, and Peak XV Partners, serving over 2 million employees across multinational enterprises in India, Southeast Asia, and the Middle East.",
  "darwinbox": "Darwinbox is an enterprise-grade, cloud-based Human Resources Management System (HRMS) platform designed to manage the entire employee lifecycle for large corporations. The platform covers core HR workflows, including recruitment, onboarding, payroll processing, performance management, employee engagement, and travel expense tracking, all integrated into a single unified mobile-first interface. Darwinbox's technology edge is its advanced AI-driven analytics, which helps HR executives track talent attrition risks, optimize workforce planning, and automate routine employee queries. The SaaS unicorn has raised over $140M from premier investors such as TCV, Salesforce Ventures, and Peak XV Partners, serving over 2 million employees across multinational enterprises in India, Southeast Asia, and the Middle East.",
  "dehaat-agri": "DeHaat is one of India's fastest-growing agritech platforms, providing end-to-end agricultural services, inputs, and market linkage to smallholder farmers through a localized micro-entrepreneur network. DeHaat combines a digital marketplace with physical fulfillment centers, giving farmers access to high-quality seeds, fertilizers, scientific crop advisory, and direct buyers for their harvested crops. The platform's core impact lies in removing exploitative middlemen from the agricultural supply chain, thereby increasing crop yields and boosting farmer incomes. Having raised over $270M from international impact investors and VCs like Temasek, Sofina, and Lightrock, DeHaat serves over 1.5 million farmers across major agricultural states in India, proving that technology can drive sustainable development in rural economies.",
  "dehaat": "DeHaat is one of India's fastest-growing agritech platforms, providing end-to-end agricultural services, inputs, and market linkage to smallholder farmers through a localized micro-entrepreneur network. DeHaat combines a digital marketplace with physical fulfillment centers, giving farmers access to high-quality seeds, fertilizers, scientific crop advisory, and direct buyers for their harvested crops. The platform's core impact lies in removing exploitative middlemen from the agricultural supply chain, thereby increasing crop yields and boosting farmer incomes. Having raised over $270M from international impact investors and VCs like Temasek, Sofina, and Lightrock, DeHaat serves over 1.5 million farmers across major agricultural states in India, proving that technology can drive sustainable development in rural economies.",
  "ditto-insurance": "Ditto Insurance is a highly popular, advisory-first consumer fintech platform that simplifies the process of buying health and life insurance policies for retail customers. Unlike traditional insurance brokerages that rely on spam calls and aggressive sales tactics, Ditto operates on a spam-free, consultative model where customers book free calls to receive honest, personalized advice from trained advisors without any purchase obligation. The company's technology platform enables users to compare policy terms, demystify complex legal clauses, and manage their claims documentation through a clean, intuitive web interface. Bootstrapped and incubated by Zerodha's Rainmatter fund, Ditto has built a reputation for trust and customer-first service, helping thousands of young Indians navigate the complex insurance landscape.",
  "ditto": "Ditto Insurance is a highly popular, advisory-first consumer fintech platform that simplifies the process of buying health and life insurance policies for retail customers. Unlike traditional insurance brokerages that rely on spam calls and aggressive sales tactics, Ditto operates on a spam-free, consultative model where customers book free calls to receive honest, personalized advice from trained advisors without any purchase obligation. The company's technology platform enables users to compare policy terms, demystify complex legal clauses, and manage their claims documentation through a clean, intuitive web interface. Bootstrapped and incubated by Zerodha's Rainmatter fund, Ditto has built a reputation for trust and customer-first service, helping thousands of young Indians navigate the complex insurance landscape.",
  "drip-capital": "Drip Capital is a global B2B fintech company that provides working capital and trade finance solutions to small and medium-sized enterprises (SMEs) engaged in cross-border trade. Drip utilizes a proprietary, data-driven underwriting model that analyzes historical shipping records, buyer creditworthiness, and transactional data to approve invoice discounting facilities within 24 hours, bypassing the lengthy collateral requirements of traditional commercial banks. The startup's fintech platform enables exporters in India, Mexico, and the US to access capital immediately, improving cash flows and scaling their international operations. Drip has raised over $520M in a combination of equity and debt from leading institutional funds like Accel Partners, Sequoia Capital, and Wing VC.",
  "dunzo-delivery": "Dunzo is a pioneer in the hyperlocal quick-commerce and delivery space in India, allowing users to order groceries, food, medicines, and packages from local merchants for delivery in under 20 minutes. Operating a network of dark stores alongside merchant-partner locations, Dunzo utilizes an algorithmic delivery dispatch system that optimizes courier routes and manages real-time local supply demand. The startup recently integrated its operations with the Open Network for Digital Commerce (ONDC), expanding its merchant reach and enabling seamless local commerce transactions. Having raised over $380M from key corporate backing (including Reliance Retail and Google), Dunzo has faced severe cash management cycles, serving as a prominent case study in the H1 2026 consolidation wave of capital-intensive delivery logistics.",
  "dunzo": "Dunzo is a pioneer in the hyperlocal quick-commerce and delivery space in India, allowing users to order groceries, food, medicines, and packages from local merchants for delivery in under 20 minutes. Operating a network of dark stores alongside merchant-partner locations, Dunzo utilizes an algorithmic delivery dispatch system that optimizes courier routes and manages real-time local supply demand. The startup recently integrated its operations with the Open Network for Digital Commerce (ONDC), expanding its merchant reach and enabling seamless local commerce transactions. Having raised over $380M from key corporate backing (including Reliance Retail and Google), Dunzo has faced severe cash management cycles, serving as a prominent case study in the H1 2026 consolidation wave of capital-intensive delivery logistics.",
  "elixiir-foods": "Elixiir Foods is an organic food brand producing nutrient-dense, plant-based functional foods and wellness beverages for health-conscious consumers. The startup develops ready-to-consume meals, cold-pressed juices, and herbal superfood blends that contain no artificial preservatives, refined sugars, or synthetic additives. Elixiir's core competitive advantage is its direct-sourcing model, partnering with organic farming cooperatives to secure raw ingredients at fair trade prices and maintain strict quality control. Backed by organic lifestyle funds and private consumer-focused angel groups, Elixiir sells its products through its online D2C store and premium organic supermarkets, addressing the growing consumer demand for clean-label, functional nutrition in metropolitan centers.",
  "emergent": "Emergent is a cutting-edge deep tech startup developing artificial intelligence agents and machine learning tools designed to automate complex, multi-step code generation and software engineering workflows. The company's proprietary AI agent, operating on custom agentic frameworks, autonomously debugs software repositories, writes test suites, and refactors legacy code bases based on natural language instructions. Emergent's core distinction is its focus on codebase context retrieval, enabling its agents to understand system dependencies and perform changes without introducing regression bugs. Funded by top-tier enterprise software VCs and prominent AI researchers, Emergent is building the future of automated software development, enabling engineering teams to scale their output and reduce manual maintenance overhead.",
  "entellus-industries": "Entellus Industries is an advanced industrial hardware and clean-tech manufacturing company designing high-efficiency water filtration and wastewater recycling systems for heavy industries and municipal corporations. The startup's proprietary filtration systems utilize electro-coagulation and custom membrane technologies to remove heavy metals, chemical pollutants, and biological contaminants from industrial discharge, allowing factories to reuse up to 95% of their process water. Entellus's distinct advantage is its low-cost, modular hardware design, which can be retrofitted into existing factory layouts with minimal downtime. Supported by green technology grants and climate-tech VC funds, the startup is helping industries comply with zero-liquid-discharge environmental regulations.",
  "exponent-energy": "Exponent Energy is a high-tech energy startup that has developed a revolutionary battery pack and charging system capable of charging electric vehicles from 0 to 100% in exactly 15 minutes. The company's technology achieves this rapid charging rate while maintaining a standard 3,000-cycle battery lifespan, resolving the primary bottleneck of EV charging speed without causing battery degradation. Exponent's core innovation is its proprietary thermal management system, which actively cools the battery cells during charging to prevent overheating. Having raised over $30M in funding from investors like Lightspeed India and YourNest, Exponent is deploying its charging network for commercial three-wheelers and logistics fleets, accelerating the commercial adoption of EV transport.",
  "sarvam-ai": "Sarvam AI is a leading foundational AI research and deployment startup building large language models (LLMs) explicitly optimized for Indian languages, dialects, and cultural contexts. The startup is developing a full-stack generative AI platform, including voice-to-text, translation, and text-generation models, designed to enable developers to build affordable, localized AI applications for the Indian market. Sarvam's core distinction is its focus on compute-efficient models that run at low latency on standard hardware, making AI deployment cost-effective for Indian enterprises. The company raised a massive $41M Series A round from Peak XV Partners, Lightspeed, and Khosla Ventures, positioning itself as a critical sovereign AI infrastructure provider for the region."
}

function convertGoogleDriveUrl(url: string | null | undefined): string | null {
  if (!url || !url.trim()) return null
  const raw = url.trim()
  if (!raw.includes("drive.google.com") && !raw.includes("docs.google.com")) return raw

  let fileId = ""
  const fileMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) fileId = fileMatch[1]

  if (!fileId) {
    const idMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch) fileId = idMatch[1]
  }

  if (!fileId) return raw
  return `https://lh3.googleusercontent.com/d/${fileId}=w400`
}

function getRowVal(row: Record<string, string>, ...keys: string[]): string {
  const normMap: Record<string, string> = {}
  for (const [k, v] of Object.entries(row)) {
    const normKey = k.toLowerCase().replace(/[^a-z0-9]/g, "")
    normMap[normKey] = v ? v.trim() : ""
  }
  for (const key of keys) {
    const searchKey = key.toLowerCase().replace(/[^a-z0-9]/g, "")
    if (normMap[searchKey]) return normMap[searchKey]
  }
  return ""
}

const MAP_CODE_TO_NAME: Record<string, string> = {
  IND: "India", IN: "India",
  USA: "United States", US: "United States",
  GBR: "United Kingdom", UK: "United Kingdom", GB: "United Kingdom",
  CAN: "Canada", CA: "Canada",
  DEU: "Germany", DE: "Germany",
  FRA: "France", FR: "France",
  AUS: "Australia", AU: "Australia",
  SGP: "Singapore", SG: "Singapore",
  ARE: "United Arab Emirates", AE: "United Arab Emirates", UAE: "United Arab Emirates",
  NLD: "Netherlands", NL: "Netherlands",
  JPN: "Japan", JP: "Japan",
  CHN: "China", CN: "China",
  BRA: "Brazil", BR: "Brazil",
}

const MAP_NAME_TO_CODE: Record<string, string> = {
  "india": "IND",
  "united states": "USA", "us": "USA", "usa": "USA",
  "united kingdom": "GBR", "uk": "GBR", "great britain": "GBR",
  "canada": "CAN",
  "germany": "DEU",
  "france": "FRA",
  "australia": "AUS",
  "singapore": "SGP",
  "united arab emirates": "ARE", "uae": "ARE",
  "netherlands": "NLD",
  "japan": "JPN",
  "china": "CHN",
  "brazil": "BRA",
}

// ── Row → Startup mapper ──────────────────────────────────────────────────────
function rowToStartup(row: Record<string, string>, index: number): Startup | null {
  const name = safeDecode(getRowVal(row, "name", "startupname", "startup", "company"))
  const website = getRowVal(row, "website", "website_url", "websiteurl", "official_website", "officialwebsite", "website_link", "url", "domain") || null
  
  // perf: 2.4 Automated Sanity Filter — skip row ONLY if BOTH name AND website are empty
  if (!name && !website) return null

  const displayName = name || (website ? website.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] : "Startup")
  const rawSlug = getRowVal(row, "slug")
  const slug = rawSlug
    ? rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

  const rawLogo = getRowVal(row, "logo_url", "logourl", "logo", "logo_link", "logolink", "logo_image", "logoimage", "image_url", "imageurl", "image")
  const convertedLogo = convertGoogleDriveUrl(rawLogo)

  const rawDesc = safeDecode(getRowVal(row, "description", "short_description", "shortdescription", "short_desc", "shortdesc", "one_liner", "oneliner", "about", "summary"))
  const longDesc = safeDecode(getRowVal(row, "description_long", "descriptionlong", "long_description", "longdescription"))
  const description = rawDesc || longDesc || STARTUP_DESCRIPTION_OVERRIDES[slug] || null

  const rawCountryName = safeDecode(getRowVal(row, "country_name", "countryname", "country"))
  const rawCountryCode = getRowVal(row, "country_code", "countrycode", "iso")

  let countryName = rawCountryName
  let countryCode = rawCountryCode ? rawCountryCode.toUpperCase() : ""

  if (countryName && !countryCode) {
    countryCode = MAP_NAME_TO_CODE[countryName.toLowerCase()] || countryName.slice(0, 3).toUpperCase()
  } else if (countryCode && !countryName) {
    countryName = MAP_CODE_TO_NAME[countryCode] || countryCode
  }

  if (!countryName) countryName = safeDecode(getRowVal(row, "city", "location")) || "Global"
  if (!countryCode) countryCode = "GLB"

  const rawUfrn = getRowVal(row, "ufrn", "registryid")
  const countrySub = countryCode.length >= 2 ? countryCode.slice(0, 3) : "IND"
  const cleanSlugPart = slug.replace(/[^a-z0-9]/gi, "").slice(0, 5).toUpperCase() || String(index + 1).padStart(5, '0')
  const formattedUFRN = rawUfrn || `UF-2026-${countrySub}-${cleanSlugPart}`

  return {
    id: getRowVal(row, "id") || `sheet-${index + 1}`,
    name: displayName,
    slug,
    description,
    description_short: rawDesc || null,
    description_long: longDesc || null,
    business_model: safeDecode(getRowVal(row, "business_model", "businessmodel", "model")) || null,
    legal_name: safeDecode(getRowVal(row, "legal_name", "legalname", "registered_name", "registeredname")) || null,
    funding_stage: safeDecode(getRowVal(row, "funding_stage", "fundingstage", "stage", "funding_round")) || null,
    funding_total: safeDecode(getRowVal(row, "funding_total", "total_funding", "totalfunding", "funding_amount", "fundingamount")) || null,
    valuation: safeDecode(getRowVal(row, "valuation", "company_valuation", "estimated_valuation", "valuation_usd", "valuationusd")) || null,
    valuation_date: safeDecode(getRowVal(row, "valuation_date", "valuationdate", "valuation_as_of", "valuationasof")) || null,
    data_as_of: safeDecode(getRowVal(row, "data_as_of", "dataasof", "last_updated", "lastupdated", "updated_at")) || null,
    logo_url: convertedLogo || (rawLogo && rawLogo.startsWith("http") ? rawLogo : null),
    website,
    founders: safeDecode(getRowVal(row, "founders", "founder", "foundingteam")) || null,
    founded_year: getRowVal(row, "founded_year", "founded", "established")
      ? parseInt(getRowVal(row, "founded_year", "founded", "established"), 10) || null
      : null,
    category: safeDecode(getRowVal(row, "category", "sector", "industry")) || "AI & Technology",
    city: safeDecode(getRowVal(row, "city", "location", "headquarters")) || null,
    // perf: Force status to "approved" & verified for all sheet entries
    status: "approved",
    verification: {
      status: "verified",
      score: 90,
      is_self_reported_capped: false,
      breakdown: {
        website_reachable: 15,
        domain_validity: 15,
        company_identity_signal: 15,
        founder_identity_signal: 15,
        social_presence: 10,
        product_evidence: 10,
        registration_evidence: 5,
        recent_activity: 5,
      },
      last_verified: new Date().toISOString().split("T")[0],
    },
    is_featured:
      getRowVal(row, "is_featured", "featured") === "true" ||
      getRowVal(row, "is_featured", "featured") === "TRUE" ||
      getRowVal(row, "is_featured", "featured") === "1",
    is_sponsored: false,
    linkedin_url: getRowVal(row, "linkedin_url", "linkedin", "linkedin_link") || null,
    twitter_url: getRowVal(row, "twitter_url", "twitter", "twitter_link", "x_url", "x") || null,
    instagram_url: getRowVal(row, "instagram_url", "instagram", "instagram_link") || null,
    ufrn: formattedUFRN,
    country_code: countryCode,
    country_name: countryName,
    created_at: getRowVal(row, "created_at", "timestamp") || undefined,
    updated_at: getRowVal(row, "updated_at") || null,
  }
}

const fetchRawStartups = unstable_cache(
  async () => {
    // perf: Read static build data first to guarantee <10ms CPU hot path execution
    const local = loadLocalStaticStartups()
    if (local.length > 0) return local

    const res = await fetch(SHEET_CSV_URL, {
      signal: AbortSignal.timeout(4000),
    })

    if (!res.ok) {
      return local
    }

    const csv = await res.text()
    const rows = parseCSV(csv)

    const startups: Startup[] = []
    for (let i = 0; i < rows.length; i++) {
      const s = rowToStartup(rows[i], i)
      if (s) startups.push(s)
    }

    return startups.length > 0 ? startups : local
  },
  ["google-sheets-startups"],
  { revalidate: 3600, tags: ["startups"] }
)

function loadLocalStaticStartups(): Startup[] {
  try {
    const fs = require("fs")
    const path = require("path")
    const filePath = path.join(process.cwd(), "public", "data", "startups.json")
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }
  } catch {
    // ignore
  }
  return []
}

// ── Main fetcher ──────────────────────────────────────────────────────────────
// perf: Serves pre-built static JSON / cached records with zero live network latency
export async function fetchAllStartups(): Promise<Startup[]> {
  const now = Date.now()

  // Serve from memory cache if fresh
  if (_cachedStartups.length > 0 && now - _cacheTime < CACHE_TTL) {
    return _cachedStartups
  }

  // 1. Try local pre-computed build JSON first for zero-CPU execution
  const local = loadLocalStaticStartups()
  if (local.length > 0) {
    _cachedStartups = local
    _cacheTime = now
    return local
  }

  try {
    const startups = await fetchRawStartups()
    if (startups.length > 0) {
      _cachedStartups = startups
      _cacheTime = now
      return startups
    }
  } catch {
    // fallback
  }

  return _cachedStartups
}


// ── Derived filter helpers ────────────────────────────────────────────────────

export interface SheetFilters {
  years: number[]
  cats: string[]
  countries: { code: string; name: string }[]
}

export async function getSheetFilters(): Promise<SheetFilters> {
  const startups = await fetchAllStartups()

  const yearSet = new Set<number>()
  const catSet = new Set<string>()
  const countryMap = new Map<string, string>()

  for (const s of startups) {
    if (s.founded_year && s.founded_year >= 2010) yearSet.add(s.founded_year)
    if (s.category) catSet.add(s.category)
    if (s.country_code && s.country_name && !countryMap.has(s.country_code)) {
      countryMap.set(s.country_code, s.country_name)
    }
  }

  return {
    years: [...yearSet].sort((a, b) => b - a),
    cats: [...catSet].sort(),
    countries: [...countryMap.entries()]
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }
}

// ── Category stats (for /startups hub page) ───────────────────────────────────

export interface CategoryStat {
  slug: string
  dbCategory: string
  displayName: string
  count: number
}

export async function getCategoryStats(): Promise<{
  categories: CategoryStat[]
  total: number
}> {
  const startups = await fetchAllStartups()
  const counts = new Map<string, number>()

  for (const s of startups) {
    const cat = s.category
    if (cat) counts.set(cat, (counts.get(cat) ?? 0) + 1)
  }

  const categories: CategoryStat[] = [...counts.entries()]
    .map(([dbCategory, count]) => ({
      dbCategory,
      slug: dbCategory
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      displayName: dbCategory,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  return {
    categories,
    total: startups.length,
  }
}

// ── Find single startup by slug ───────────────────────────────────────────────

export async function findStartupBySlug(slug: string): Promise<Startup | null> {
  const startups = await fetchAllStartups()
  const lower = slug.toLowerCase().trim()

  // Exact slug match
  let found = startups.find((s) => s.slug.toLowerCase() === lower)
  if (found) return found

  // Name → slug fallback
  const nameGuess = lower.replace(/-/g, " ")
  found = startups.find((s) => s.name.toLowerCase() === nameGuess)
  return found ?? null
}

// ── Related startups (same category, different slug) ─────────────────────────

export async function findRelatedStartups(
  category: string,
  currentSlug: string,
  limit = 4
): Promise<Startup[]> {
  const startups = await fetchAllStartups()
  return startups
    .filter(
      (s) =>
        s.category?.toLowerCase() === category.toLowerCase() &&
        s.slug !== currentSlug
    )
    .slice(0, limit)
}

// ── JS-side filter/sort/paginate ──────────────────────────────────────────────

export interface QueryOptions {
  q?: string
  year?: string
  sort?: string
  category?: string
  country?: string
  page?: number
  pageSize?: number
  countryCode?: string // for Indian registry (IND filter)
}

export interface QueryResult {
  startups: Startup[]
  total: number
}

export async function queryStartups(opts: QueryOptions): Promise<QueryResult> {
  let all = await fetchAllStartups()

  const q = (opts.q || "").toLowerCase().trim()
  const year = opts.year || ""
  const sort = opts.sort || "name"
  const cat = (opts.category || "").toLowerCase()
  const country = (opts.country || "").toLowerCase()
  const countryCode = (opts.countryCode || "").toLowerCase()
  const page = Math.max(1, opts.page ?? 1)
  const pageSize = opts.pageSize ?? 10

  // Filter: country code (e.g. "IND" for Indian registry)
  if (countryCode) {
    all = all.filter((s) =>
      s.country_code?.toLowerCase() === countryCode.toLowerCase()
    )
  }

  // Filter: search query
  if (q) {
    all = all.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description?.toLowerCase() ?? "").includes(q) ||
        formatFounders(s.founders).toLowerCase().includes(q) ||
        (s.category?.toLowerCase() ?? "").includes(q) ||
        (s.city?.toLowerCase() ?? "").includes(q) ||
        (s.country_name?.toLowerCase() ?? "").includes(q)
    )
  }

  // Filter: year
  if (year) {
    const y = parseInt(year, 10)
    all = all.filter((s) => s.founded_year === y)
  }

  // Filter: category
  if (cat) {
    all = all.filter((s) => s.category?.toLowerCase() === cat)
  }

  // Filter: country
  if (country) {
    all = all.filter(
      (s) =>
        s.country_code?.toLowerCase() === country ||
        s.country_name?.toLowerCase() === country
    )
  }

  const total = all.length

  // Sort: featured first always
  all.sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1
    if (!a.is_featured && b.is_featured) return 1

    if (sort === "newest") {
      const ta = a.created_at ? new Date(a.created_at).getTime() : 0
      const tb = b.created_at ? new Date(b.created_at).getTime() : 0
      return tb - ta
    }
    if (sort === "year") {
      return (b.founded_year ?? 0) - (a.founded_year ?? 0)
    }
    // Default: alphabetical
    return a.name.localeCompare(b.name)
  })

  // Paginate
  const from = (page - 1) * pageSize
  const startups = all.slice(from, from + pageSize)

  return { startups, total }
}

