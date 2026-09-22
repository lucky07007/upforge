// app/archive/page.tsx
// THE FOUNDER CHRONICLE — Archive (upforge.in)
// Archive page with month-wise filtering, search, and auto-update capabilities
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, Search, X, Calendar, Filter, Clock } from "lucide-react"

// ─── ARCHIVE DATA STRUCTURE ───────────────────────────────────────────────────
// This structure allows for easy addition of new founders/editions
// Each edition represents a monthly release

interface ArchiveFounder {
  no: string;
  edition: string; // Format: "No. XX" (e.g., "No. 01")
  editionDate: string; // Format: "MMMM YYYY" (e.g., "March 2026")
  category: string;
  name: string;
  nameShort: string;
  initials: string;
  company: string;
  slug: string;
  role: string;
  city: string;
  context: string;
  valuation: string;
  funding: string;
  founded: string;
  imgSrc: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  headline: string;
  deck: string;
  cols: Array<{ h: string; b: string }>;
  pull: string;
  pullBy: string;
  lesson: string;
  stats: Array<{ l: string; v: string }>;
  tags: string[]; // For better filtering
}

// ─── ARCHIVE DATA ─────────────────────────────────────────────────────────────
// Structured by edition (month/year) for easy filtering
const ARCHIVE_FOUNDERS: ArchiveFounder[] = [
  // March 2026 Edition (Current)

  {
  no: "11",
  edition: "No. 11",
  editionDate: "March 2026",
  category: "CONSUMER ELECTRONICS",
  name: "Aman Gupta",
  nameShort: "Aman Gupta",
  initials: "AG",
  company: "boAt",
  slug: "boat",
  role: "Co-Founder & CMO",
  city: "New Delhi, DL",
  context: "Building India's youth lifestyle audio brand",
  valuation: "$1.4B+",
  funding: "$170M+",
  founded: "2016",
  imgSrc: "https://www.cheggindia.com/wp-content/uploads/2023/06/eo-35893-founder-of-boat-v2-1024x683.png",
  accent: "#F97316",
  accentBg: "#FFF7ED",
  accentBorder: "#FED7AA",
  headline: "India didn't need another audio brand. It needed a youth lifestyle brand.",
  deck: "boAt became one of India's fastest-growing consumer electronics brands by combining stylish design, affordable pricing, and aggressive digital marketing.",
  cols: [
    {
      h: "The Lifestyle Brand Strategy",
      b: "When Aman Gupta co-founded boAt in 2016, the audio market in India was dominated by global giants like Sony, JBL, and Bose.\n\nInstead of competing purely on sound quality, boAt focused on creating a lifestyle brand for India's youth — colorful products, bold branding, and strong influencer marketing."
    },
    {
      h: "Winning the E-commerce Battlefield",
      b: "boAt aggressively leveraged e-commerce platforms like Amazon and Flipkart to scale distribution quickly.\n\nFlash sales, influencer campaigns, and sports partnerships helped the company dominate the online audio accessories market in India."
    },
    {
      h: "From Earphones to Ecosystem",
      b: "Over time, boAt expanded beyond earphones into smartwatches, speakers, gaming accessories, and personal audio devices.\n\nThe brand built a massive community of loyal customers, turning boAt into one of India's most recognizable D2C electronics brands."
    }
  ],
  pull: "India didn't need another audio brand. It needed a youth lifestyle brand.",
  pullBy: "Aman Gupta",
  lesson: "Branding and community can be as powerful as technology.",
  stats: [
    { l: "Valuation", v: "$1.4B+" },
    { l: "Funding", v: "$170M+" },
    { l: "Category", v: "Audio & Wearables" },
    { l: "Founded", v: "2016" }
  ],
  tags: ["D2C", "ConsumerTech", "Audio", "Delhi"]
},
  {
    no: "01", 
    edition: "No. 01",
    editionDate: "March 2026",
    category: "ARTIFICIAL INTELLIGENCE",
    name: "Vivek Raghavan",
    nameShort: "Vivek Raghavan",
    initials: "VR",
    company: "Sarvam AI", 
    slug: "sarvam-ai",
    role: "Co-Founder & CEO",
    city: "Bengaluru, KA", 
    context: "Building India's own AI models",
    valuation: "$1B+", 
    funding: "$70M+", 
    founded: "2023",
    imgSrc: "https://static.businessworld.in/sarvam_20250427233307_original_image_44.webp",
    accent: "#2563EB", 
    accentBg: "#EFF6FF", 
    accentBorder: "#BFDBFE",
    headline: "If India wants to lead the AI era, it cannot rely only on models built elsewhere.",
    deck: "Sarvam AI is building India's own large language models — designed for Indian languages, Indian scale, and Indian problems.",
    cols: [
      {
        h: "The India-First AI Vision",
        b: "In 2023, Vivek Raghavan and his co-founders launched Sarvam AI with a simple but ambitious goal: build AI infrastructure designed specifically for India.\n\nWhile global companies were building models optimized for English and Western datasets, Sarvam focused on the massive multilingual reality of India — where hundreds of millions of people interact in Hindi, Tamil, Telugu, Bengali, and dozens of other languages."
      },
      {
        h: "Building India's Own LLM",
        b: "Sarvam AI began developing large language models optimized for Indian use cases — government services, education platforms, enterprise tools, and regional communication.\n\nTheir models were designed not just to translate languages but to understand context across multiple Indian linguistic structures. This made Sarvam one of the most talked-about AI startups in the country."
      },
      {
        h: "The Sovereign AI Moment",
        b: "As the global AI race intensified, India began investing heavily in domestic AI infrastructure. Sarvam AI quickly emerged as a key player in this movement.\n\nThe company began collaborating with research institutions, enterprises, and policymakers to build scalable AI systems for India's digital future — positioning itself as one of the country's most important deep-tech startups."
      }
    ],
    pull: "If India wants to lead the AI era, it cannot rely only on models built elsewhere.",
    pullBy: "Vivek Raghavan",
    lesson: "In the AI era, infrastructure matters more than applications.",
    stats: [
      { l: "Valuation", v: "$1B+" },
      { l: "Funding", v: "$70M+" },
      { l: "Models", v: "Indian LLMs" },
      { l: "Founded", v: "2023" },
    ],
    tags: ["AI", "LLM", "DeepTech", "Bengaluru"]
  },
  {
    no: "02", 
    edition: "No. 02",
    editionDate: "March 2026",
    category: "QUICK COMMERCE",
    name: "Aadit Palicha & Kaivalya Vohra",
    nameShort: "Palicha & Vohra",
    initials: "Z",
    company: "Zepto", 
    slug: "zepto",
    role: "Co-Founders — CEO & CTO",
    city: "Bengaluru", 
    context: "Dropped out of Stanford at 19",
    valuation: "$5.9B", 
    funding: "$2.5B+", 
    founded: "2021",
    imgSrc: "https://i.ytimg.com/vi/HBSOii00H68/maxresdefault.jpg",
    accent: "#D97706", 
    accentBg: "#FFFBEB", 
    accentBorder: "#FDE68A",
    headline: "Two Stanford dropouts. One failed startup. Then a $5.9 billion answer to India's grocery problem.",
    deck: "Aadit Palicha and Kaivalya Vohra built India's fastest unicorn by failing first, then solving the logistics math nobody else wanted to.",
    cols: [
      {
        h: "The Failed First Act",
        b: "In 2020, Palicha and Vohra were Stanford freshmen who flew back to India to build KiranaKart — a 45-minute grocery app. It failed in months. Most founders would have returned to California. These two stayed in Bengaluru, rented a room, and dissected every mistake with unusual discipline.\n\nThe pivot they arrived at was specific: dark stores placed within 1.5km of dense demand made 10-minute delivery a pure logistics equation, not a gimmick. Every competitor called it insane. The founders called it math."
      },
      {
        h: "The $5.9B Math Problem",
        b: "Zepto launched in 2021. By August 2023, India had its first unicorn of the year — at $1.4B. The $350M Series H in 2025 brought the valuation to $5.9B, making them the youngest founders in India to build a business at that scale.\n\nKaivalya Vohra, at 22, became India's youngest billionaire. Zepto now operates 350+ dark stores across 10 cities, fulfilling orders in under 10 minutes — a logistics equation, solved."
      },
      {
        h: "What the Story Really Is",
        b: "The Zepto story isn't about being young or lucky. It is about the discipline to treat failure as data. KiranaKart showed them what didn't work. Zepto was the answer once they knew the right question.\n\nIndia's quick commerce market crossed $3.3B in 2025. Zepto commands its second-largest share — earned not by being first, but by being most precise about what '10 minutes' actually requires behind the scenes."
      }
    ],
    pull: "We failed with KiranaKart in months. Most people would have gone back to Stanford. We stayed in Bengaluru and figured out what we got wrong.",
    pullBy: "Aadit Palicha",
    lesson: "The first startup teaches you the question. The second one lets you answer it.",
    stats: [
      { l: "Valuation", v: "$5.9B" },
      { l: "Founded", v: "2021" },
      { l: "Dark Stores", v: "350+" },
      { l: "Total Raised", v: "$2.5B+" },
    ],
    tags: ["QuickCommerce", "GenZ", "Bengaluru", "Unicorn"]
  },
  {
    no: "03", 
    edition: "No. 03",
    editionDate: "March 2026",
    category: "AEROSPACE",
    name: "Deepinder Goyal",
    nameShort: "Deepinder Goyal",
    initials: "DG",
    company: "LAT Aerospace", 
    slug: "lat-aerospace",
    role: "Founder",
    city: "Gurugram, HR", 
    context: "Reimagining regional aviation",
    valuation: "Stealth", 
    funding: "Undisclosed", 
    founded: "2024",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1FTtR9px3fbhDE8ihpSI_tPLHNaBXBeE9Cw&s",
    accent: "#EA580C", 
    accentBg: "#FFF7ED", 
    accentBorder: "#FED7AA",
    headline: "India doesn't just need more airports. It needs a new way to fly.",
    deck: "LAT Aerospace is exploring electric aircraft designed to connect smaller Indian cities with faster, cheaper regional flights.",
    cols: [
      {
        h: "Beyond Food Delivery",
        b: "After building Zomato into one of India's most recognized technology companies, Deepinder Goyal turned his attention to a very different challenge — regional aviation.\n\nMillions of Indians live in cities without efficient air connectivity. LAT Aerospace aims to rethink how short-distance flights can work."
      },
      {
        h: "Electric Regional Aircraft",
        b: "The startup is focused on developing short take-off electric aircraft that can operate from smaller runways and regional airstrips.\n\nThis could drastically reduce travel time between Tier-2 and Tier-3 cities, creating an entirely new aviation network across India."
      },
      {
        h: "The Next Mobility Frontier",
        b: "Regional aviation has long been one of India's most underdeveloped transport sectors. If electric aircraft technology matures, startups like LAT Aerospace could unlock a new era of affordable short-distance air travel.\n\nThe project reflects a growing trend: tech founders moving into deep-tech industries that reshape physical infrastructure."
      }
    ],
    pull: "India doesn't just need more airports. It needs a new way to fly.",
    pullBy: "Deepinder Goyal",
    lesson: "The biggest opportunities often lie in industries that haven't changed for decades.",
    stats: [
      { l: "Industry", v: "Aerospace" },
      { l: "Aircraft", v: "Electric" },
      { l: "Focus", v: "Regional Aviation" },
      { l: "Founded", v: "2024" },
    ],
    tags: ["Aerospace", "EV", "Zomato", "Gurugram"]
  },

  // February 2026 Edition


  {
  no: "12",
  edition: "No. 12",
  editionDate: "March 2026",
  category: "AUTOMOTIVE MARKETPLACE",
  name: "Niraj Singh",
  nameShort: "Niraj Singh",
  initials: "NS",
  company: "spinny-cars",
  slug: "spinny-cars",
  role: "Founder & CEO",
  city: "Gurugram, HR",
  context: "Building trust in India's used car market",
  valuation: "$1.8B+",
  funding: "$500M+",
  founded: "2015",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhEGcchrkMFMKY10CKmOUHWAIo3T06-9dPA&s",
  accent: "#2563EB",
  accentBg: "#EFF6FF",
  accentBorder: "#BFDBFE",
  headline: "Buying a used car in India shouldn't feel like a gamble.",
  deck: "Spinny built a full-stack digital platform that makes buying and selling used cars transparent, standardized, and trustworthy.",
  cols: [
    {
      h: "Fixing the Trust Problem",
      b: "India's used car market has historically been fragmented and unorganized, filled with brokers and inconsistent quality.\n\nNiraj Singh launched Spinny to bring structure and transparency to the process."
    },
    {
      h: "Full-Stack Car Marketplace",
      b: "Spinny controls the entire transaction journey — from inspection and refurbishment to pricing, logistics, and delivery.\n\nThis model allowed the company to maintain quality standards and build customer trust."
    },
    {
      h: "Technology Meets Automotive",
      b: "Spinny uses pricing algorithms, inspection technology, and digital documentation to streamline car transactions.\n\nThe company has rapidly expanded across India's largest cities and continues scaling its logistics and inventory network."
    }
  ],
  pull: "Buying a used car in India shouldn't feel like a gamble.",
  pullBy: "Niraj Singh",
  lesson: "In broken markets, trust can become the biggest product.",
  stats: [
    { l: "Valuation", v: "$1.8B+" },
    { l: "Funding", v: "$500M+" },
    { l: "Industry", v: "Used Cars" },
    { l: "Founded", v: "2015" }
  ],
  tags: ["Marketplace", "Automotive", "Startup", "Gurugram"]
},



  {
  no: "13",
  edition: "No. 13",
  editionDate: "March 2026",
  category: "CLEAN ENERGY",
  name: "Anirudh Bhuwalka",
  nameShort: "Anirudh Bhuwalka",
  initials: "AB",
  company: "Blue Energy Motors",
  slug: "blue-energy-motors",
  role: "Founder & CEO",
  city: "Mumbai, MH",
  context: "Decarbonizing heavy trucking with clean fuels",
  valuation: "$500M+",
  funding: "$150M+",
  founded: "2019",
  imgSrc: "https://i.ytimg.com/vi/bHMYuTFe0LE/maxresdefault.jpg",
  accent: "#0EA5E9",
  accentBg: "#F0F9FF",
  accentBorder: "#BAE6FD",
  headline: "Heavy trucks are one of the biggest carbon emitters. That has to change.",
  deck: "Blue Energy Motors is building zero-emission heavy-duty trucks powered by LNG and hydrogen technologies for India's logistics sector.",
  cols: [
    {
      h: "The Trucking Emissions Problem",
      b: "Heavy commercial vehicles contribute significantly to global carbon emissions.\n\nAnirudh Bhuwalka founded Blue Energy Motors to build sustainable alternatives for long-haul trucking."
    },
    {
      h: "Alternative Fuel Innovation",
      b: "The company initially focused on LNG-powered trucks, which significantly reduce emissions compared to diesel.\n\nIt is also developing hydrogen-powered trucks for the next generation of clean logistics."
    },
    {
      h: "Building India's Clean Logistics Future",
      b: "Blue Energy Motors is working with major logistics companies to deploy clean trucks across freight networks.\n\nThe startup represents a new wave of deep-tech manufacturing companies emerging from India."
    }
  ],
  pull: "Heavy trucks are one of the biggest carbon emitters. That has to change.",
  pullBy: "Anirudh Bhuwalka",
  lesson: "Climate innovation will reshape entire industries.",
  stats: [
    { l: "Valuation", v: "$500M+" },
    { l: "Funding", v: "$150M+" },
    { l: "Sector", v: "Clean Trucking" },
    { l: "Founded", v: "2019" }
  ],
  tags: ["ClimateTech", "EV", "Logistics", "Mumbai"]
},

  
  {
    no: "04", 
    edition: "No. 04",
    editionDate: "February 2026",
    category: "FINTECH",
    name: "Nithin Kamath",
    nameShort: "Nithin Kamath",
    initials: "NK",
    company: "Zerodha", 
    slug: "zerodha",
    role: "Founder & CEO",
    city: "Bengaluru", 
    context: "Dropped out at 17 to trade. Never took VC.",
    valuation: "$8.2B", 
    funding: "Fully bootstrapped", 
    founded: "2010",
    imgSrc: "https://www.businessoutreach.in/wp-content/uploads/2023/08/Nithin-Kamath-1.jpg",
    accent: "#2563EB", 
    accentBg: "#EFF6FF", 
    accentBorder: "#BFDBFE",
    headline: "He dropped out at 17 to trade stocks. Never took a rupee of VC. Zerodha is India's largest stockbroker — worth $8.2 billion.",
    deck: "Nithin Kamath built India's largest brokerage without a single outside investor, a celebrity ad, or a paid acquisition. Just a better product and fifteen years of compounding trust.",
    cols: [
      {
        h: "The Self-Taught Trader",
        b: "Nithin Kamath dropped out of college at 17 to learn stock markets by doing: putting real money in and watching what happened. He spent a decade becoming exceptionally good at trading — while working as a sub-broker and call centre employee to fund his positions.\n\nBy 2010, he had identified the structural problem in Indian broking: fees were opaque, interfaces were broken, and the entire system was designed to benefit brokers, not investors. He founded Zerodha with his brother Nikhil to fix exactly that."
      },
      {
        h: "₹20 Flat. Zero VC.",
        b: "Zerodha introduced flat-fee brokerage to India: ₹20 per trade regardless of order size, at a time when brokers charged a percentage of trade value. This single pricing decision democratised investing for millions priced out by the old model.\n\nCritically, Zerodha never raised outside capital. No Series A, no Tiger Global, no SoftBank. Nithin reinvested every profit. Kite — their trading platform — became the benchmark every Indian fintech is measured against."
      },
      {
        h: "The Bootstrapped Billionaire",
        b: "Today, Zerodha has 1.5 crore active customers and an $8.2B valuation. Nithin also built Varsity (free financial education, 10M+ users), Rainmatter (a fintech incubator backing 40+ startups), and has become India's most respected voice on sustainable investing.\n\nThe Zerodha story is the definitive antidote to the idea that fundraising equals success. Fifteen years of being genuinely, unfashionably useful."
      }
    ],
    pull: "We never raised money because we didn't need to. Build something people actually want, charge them fairly — that's the whole playbook.",
    pullBy: "Nithin Kamath",
    lesson: "Bootstrapping is not a funding strategy. It's a philosophy about who you're accountable to.",
    stats: [
      { l: "Valuation", v: "$8.2B" },
      { l: "Customers", v: "1.5 Cr+" },
      { l: "VC Raised", v: "₹0" },
      { l: "Founded", v: "2010" },
    ],
    tags: ["Fintech", "Bootstrapped", "Trading", "Bengaluru"]
  },
  {
    no: "05", 
    edition: "No. 05",
    editionDate: "February 2026",
    category: "D2C / BEAUTY",
    name: "Falguni Nayar",
    nameShort: "Falguni Nayar",
    initials: "FN",
    company: "Nykaa", 
    slug: "nykaa",
    role: "Founder & CEO",
    city: "Mumbai", 
    context: "Left investment banking at 50",
    valuation: "$2.5B", 
    funding: "Bootstrapped to IPO", 
    founded: "2012",
    imgSrc: "https://i.cdn.newsbytesapp.com/images/l12420211110152610.jpeg",
    accent: "#C026D3", 
    accentBg: "#FDF4FF", 
    accentBorder: "#E879F9",
    headline: "She left a 20-year banking career at 50 to build India's first profitable unicorn. Everyone told her she was too old.",
    deck: "Falguni Nayar built India's first woman-founded company to IPO — and proved the best founders sometimes take the longest to begin.",
    cols: [
      {
        h: "Twenty Years at Kotak",
        b: "Falguni Nayar spent two decades at Kotak Mahindra Bank, rising to Managing Director of Investment Banking. In 2012, at 50, she quit. Her network was uniformly sceptical: global beauty brands wouldn't trust an Indian startup, the market was fragmented, physical retail was dominant.\n\nShe flew personally to brand offices in France, Italy, and the United States to guarantee authenticity and explain the Indian consumer. She earned the trust one brand at a time."
      },
      {
        h: "Curation Over Discounting",
        b: "While every other platform competed on price, Falguni competed on trust. Nykaa launched with editorial curation, authentic products, and an experience that felt like a premium store. Customers returned because they trusted what they were buying.\n\nBy 2020, Nykaa crossed 2 million orders per month. No splashy VC backing, no celebrity campaigns in the early years. Just a product built around the conviction that Indian women deserved a trustworthy beauty destination."
      },
      {
        h: "India's First Woman-Led IPO",
        b: "In November 2021, Nykaa listed on the BSE — the first woman-founded Indian company to IPO, and the first profitable Indian unicorn to go public. Falguni's net worth crossed $7B at listing, making her India's wealthiest self-made woman.\n\nShe has since expanded into fashion, wellness, and men's grooming. Nykaa remains a masterclass in patience, domain expertise, and the radical idea that serving your customer well — not raising money — is the primary job of a founder."
      }
    ],
    pull: "Everyone told me I was too old to start and the market was too fragmented. That was the business case — not a reason to stop.",
    pullBy: "Falguni Nayar",
    lesson: "There is no age requirement for building something consequential.",
    stats: [
      { l: "Valuation", v: "$2.5B" },
      { l: "IPO Year", v: "2021" },
      { l: "Age at Start", v: "50" },
      { l: "Founded", v: "2012" },
    ],
    tags: ["D2C", "Beauty", "IPO", "Mumbai", "WomenFounder"]
  },

  // January 2026 Edition

  {
  no: "14",
  edition: "No. 14",
  editionDate: "March 2026",
  category: "ELECTRIC VEHICLES",
  name: "Tarun Mehta",
  nameShort: "Tarun Mehta",
  initials: "TM",
  company: "Ather Energy",
  slug: "ather-energy-ev",
  role: "Co-Founder & CEO",
  city: "Bengaluru, KA",
  context: "Building India's premium electric scooter ecosystem",
  valuation: "$2B+",
  funding: "$450M+",
  founded: "2013",
  imgSrc: "https://media.fortuneindia.com/fortune-india/import/2025-03-29/hgwivhxj/tarun-mehta.jpg?rect=0,0,10100,5303&w=1200&ar=40:21&auto=format,compress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100",
  accent: "#10B981",
  accentBg: "#ECFDF5",
  accentBorder: "#A7F3D0",
  headline: "Electric vehicles aren't just about batteries — they are about the entire ecosystem.",
  deck: "Ather Energy built one of India's most advanced electric scooter platforms along with a nationwide fast-charging infrastructure.",
  cols: [
    {
      h: "Engineering-First Approach",
      b: "Tarun Mehta and Swapnil Jain started Ather Energy in 2013 with a focus on deep engineering.\n\nInstead of importing components, the company built its own battery systems, software stack, and vehicle architecture."
    },
    {
      h: "Smart Electric Scooters",
      b: "Ather scooters introduced features like touchscreen dashboards, OTA updates, navigation, and performance analytics.\n\nThis positioned the brand as a premium EV alternative in India."
    },
    {
      h: "Charging Infrastructure",
      b: "Ather didn't just build scooters — it built charging infrastructure.\n\nThe Ather Grid network of fast chargers across cities helped solve one of the biggest barriers to EV adoption."
    }
  ],
  pull: "Electric vehicles aren't just about batteries — they are about the entire ecosystem.",
  pullBy: "Tarun Mehta",
  lesson: "Hardware companies win by controlling the full ecosystem.",
  stats: [
    { l: "Valuation", v: "$2B+" },
    { l: "Funding", v: "$450M+" },
    { l: "Sector", v: "Electric Vehicles" },
    { l: "Founded", v: "2013" }
  ],
  tags: ["EV", "Mobility", "CleanTech", "Bengaluru"]
},
  {
    no: "06", 
    edition: "No. 06",
    editionDate: "January 2026",
    category: "TRAVEL / HOSPITALITY",
    name: "Ritesh Agarwal",
    nameShort: "Ritesh Agarwal",
    initials: "RA",
    company: "OYO", 
    slug: "oyo",
    role: "Founder & CEO",
    city: "Gurgaon", 
    context: "Youngest billionaire founder",
    valuation: "$10B+", 
    funding: "$3B+", 
    founded: "2013",
    imgSrc: "data:image/jpeg;base64,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",
    accent: "#DC2626",
    accentBg: "#FEF2F2",
    accentBorder: "#FCA5A5",
    headline: "At 19, he started fixing India's budget hotel problem — and built one of the world's largest hotel chains.",
    deck: "Ritesh Agarwal built OYO after travelling across India and seeing the chaos in budget hotels. His solution standardized small hotels using technology and branding.",
    cols: [
      {
        h: "Teenage Entrepreneur",
        b: "Ritesh Agarwal left college early to build a startup. His first idea was Oravel Stays, a platform for budget accommodations.\n\nAfter traveling across India, he realized the massive problem in budget hospitality: inconsistent quality, opaque pricing, and no trust."
      },
      {
        h: "Birth of OYO",
        b: "The idea evolved into OYO Rooms, which standardized hotel rooms with reliable pricing, cleanliness, and booking systems.\n\nOYO grew rapidly by partnering with small hotel owners and bringing them into a branded network with technology-enabled operations."
      },
      {
        h: "Global Expansion",
        b: "OYO expanded to dozens of countries and thousands of hotels, becoming one of the fastest-growing hospitality brands in the world.\n\nDespite challenges, OYO remains one of India's most ambitious global expansions by a young founder."
      }
    ],
    pull: "Opportunities often hide inside everyday problems.",
    pullBy: "Ritesh Agarwal",
    lesson: "Start young. Learn fast. Scale relentlessly.",
    stats: [
      { l: "Valuation", v: "$10B+" },
      { l: "Countries", v: "80+" },
      { l: "Founded", v: "2013" },
      { l: "Age at Start", v: "19" }
    ],
    tags: ["Travel", "Hospitality", "Global", "Gurgaon"]
  },
  {
    no: "07", 
    edition: "No. 07",
    editionDate: "January 2026",
    category: "MOBILITY / TRANSPORT",
    name: "Bhavish Aggarwal",
    nameShort: "Bhavish Aggarwal",
    initials: "BA",
    company: "Ola", 
    slug: "ola",
    role: "Co-Founder & CEO",
    city: "Bangalore", 
    context: "Built India's largest ride-hailing platform",
    valuation: "$7B+", 
    funding: "$4B+", 
    founded: "2010",
    imgSrc: "data:image/jpeg;base64,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",
    accent: "#EA580C", 
    accentBg: "#FFF7ED", 
    accentBorder: "#FDBA74",
    headline: "A single bad taxi ride inspired him to build one of India's largest mobility platforms.",
    deck: "Bhavish Aggarwal founded Ola after a frustrating cab experience — and went on to build a transportation network serving hundreds of cities across India.",
    cols: [
      {
        h: "The Problem That Sparked Ola",
        b: "In 2010, Bhavish Aggarwal was traveling from Bangalore to Bandipur when his taxi driver abruptly stopped midway and demanded extra money.\n\nThe experience revealed a huge gap in India's transportation infrastructure. Bhavish realized millions of commuters faced the same problem daily."
      },
      {
        h: "Building India's Ride-Hailing Giant",
        b: "Bhavish partnered with Ankit Bhati to launch Ola — a platform connecting passengers with reliable drivers through mobile technology.\n\nThe startup expanded rapidly across Indian cities and soon became a dominant player in ride-hailing, competing with Uber in one of the world's toughest markets."
      },
      {
        h: "Beyond Ride-Hailing",
        b: "Ola eventually expanded into electric mobility through Ola Electric, building scooters, EV platforms, and gigafactories.\n\nBhavish's ambition has always been larger than taxis — he wants to redefine transportation for an electric future."
      }
    ],
    pull: "Every frustrating experience is an opportunity to build something better.",
    pullBy: "Bhavish Aggarwal",
    lesson: "Some of the biggest companies start with solving a personal problem.",
    stats: [
      { l: "Valuation", v: "$7B+" },
      { l: "Cities", v: "250+" },
      { l: "Founded", v: "2010" },
      { l: "Funding", v: "$4B+" },
    ],
    tags: ["Mobility", "EV", "RideHailing", "Bangalore"]
  },
  {
    no: "08",
    edition: "No. 08",
    editionDate: "January 2026",
    category: "STARTUP REGISTRY / DATA INTELLIGENCE",
    name: "UpForge Editorial",
    nameShort: "UpForge",
    initials: "UF",
    company: "UpForge",
    slug: "upforge",
    role: "Editorial Team",
    city: "India",
    context: "Building India's first independent, verified startup registry",
    valuation: "Private",
    funding: "Bootstrapped",
    founded: "2024",
    imgSrc: "https://upforge.org/logo.jpg",
    accent: "#C59A2E",
    accentBg: "#FFFDF0",
    accentBorder: "#F5E6A8",
    headline: "India had fragmented startup information across many sources. UpForge was built to make startup discovery more structured and accessible.",
    deck: "UpForge is an independent startup registry and intelligence platform — a structured public record connecting startup profiles, UFRN identifiers, founder stories, and market research.",
    cols: [
      {
        h: "The Problem Worth Solving",
        b: "India's startup data was fragmented across 200+ sources — DPIIT, Crunchbase, AngelList, LinkedIn, media databases — none of them authoritative, structured, or freely accessible.\n\nInvestors spent days on basic due diligence. Founders lacked a neutral, third-party record of their existence. The ecosystem needed a Wikipedia-grade registry it didn't have."
      },
      {
        h: "Building the UpForge Registry",
        b: "UpForge was built with one mission: create a free, neutral, startup registry for India — and eventually the world.\n\nRegistry-listed profiles come from the vetted source dataset. No paid rankings, no sponsored placements. The UFRN (UpForge Registry Number) gives each startup a unique, Google-indexed identifier — their stable public identifier within the UpForge registry."
      },
      {
        h: "The Registry That Indexes",
        b: "UpForge's UFRN system creates a proprietary SEO moat: when anyone searches a startup's UFRN code, they land on UpForge.\n\nThe platform now tracks thousands of verified startups across 30+ sectors in India, with global expansion underway. Free for founders. Trusted by investors and press. Built to last decades."
      }
    ],
    pull: "Every serious startup deserves a structured public record. UpForge exists to make that discovery layer easier to use.",
    pullBy: "UpForge Editorial Team",
    lesson: "The most important infrastructures are often the ones nobody thought to build.",
    stats: [
      { l: "Platform", v: "UpForge" },
      { l: "Founded", v: "2024" },
      { l: "Funding", v: "Bootstrapped" },
      { l: "Focus", v: "Startup Registry" }
    ],
    tags: ["Registry", "Data", "Founders", "India"]
  },
  {
    no: "09", 
    edition: "No. 09",
    editionDate: "January 2026",
    category: "FINTECH",
    name: "Kunal Shah",
    nameShort: "Kunal Shah",
    initials: "KS",
    company: "CRED",
    slug: "cred",
    role: "Founder & CEO",
    city: "Bangalore",
    context: "Built two unicorn fintech startups",
    valuation: "$6B+",
    funding: "$800M+",
    founded: "2018",
    imgSrc: "data:image/jpeg;base64,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",
    accent: "#111827",
    accentBg: "#F3F4F6",
    accentBorder: "#9CA3AF",
    headline: "He built CRED by rewarding people for paying their credit card bills on time.",
    deck: "Kunal Shah is known for his deep thinking on consumer behaviour and fintech. After selling FreeCharge, he launched CRED to reward financial discipline.",
    cols: [
      {
        h: "The FreeCharge Exit",
        b: "Kunal Shah first built FreeCharge, a digital payments company that was later acquired by Snapdeal for $400M.\n\nThis exit gave him the capital and credibility to build something bigger."
      },
      {
        h: "Birth of CRED",
        b: "He launched CRED in 2018 to reward creditworthy users who paid their bills on time.\n\nThe exclusivity created demand — people wanted access to the platform because it signalled financial responsibility."
      },
      {
        h: "Premium Community",
        b: "CRED built an exclusive ecosystem for financially responsible users, expanding into payments, lending, and lifestyle products.\n\nKunal's understanding of behavioural economics made CRED one of India's most talked-about fintech experiments."
      }
    ],
    pull: "Trust is the most powerful currency in fintech.",
    pullBy: "Kunal Shah",
    lesson: "Understand human behaviour better than technology.",
    stats: [
      { l: "Valuation", v: "$6B+" },
      { l: "Users", v: "12M+" },
      { l: "Founded", v: "2018" },
      { l: "Previous Exit", v: "FreeCharge $400M" }
    ],
    tags: ["Fintech", "Consumer", "Bangalore", "Payments"]
  },
  {
    no: "10", 
    edition: "No. 10",
    editionDate: "January 2026",
    category: "FINTECH / PAYMENTS",
    name: "Vijay Shekhar Sharma",
    nameShort: "Vijay Sharma",
    initials: "VS",
    company: "Paytm",
    slug: "paytm",
    role: "Founder & CEO",
    city: "Noida",
    context: "Built India's biggest digital wallet",
    valuation: "$16B+",
    funding: "$3B+",
    founded: "2010",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1fDX9NPnpOxew45ikgwwdyfE1sR-kTBZgg&s",
    accent: "#0284C7",
    accentBg: "#EFF6FF",
    accentBorder: "#7DD3FC",
    headline: "From a small recharge website to India's largest digital payments ecosystem.",
    deck: "Vijay Shekhar Sharma built Paytm to simplify mobile payments in India, later becoming one of the biggest fintech platforms in the country.",
    cols: [
      {
        h: "Early Struggles",
        b: "Vijay grew up in a small town and struggled with English during college.\n\nDespite the challenges, he had an early fascination with technology and entrepreneurship."
      },
      {
        h: "Birth of Paytm",
        b: "He launched Paytm initially as a mobile recharge platform, then pivoted into payments when he saw the potential for digital wallets.\n\nPaytm's big break came during India's 2016 demonetization, when millions of Indians turned to digital payments overnight."
      },
      {
        h: "IPO and Beyond",
        b: "Paytm went public in 2021 in one of India's largest IPOs.\n\nDespite post-IPO challenges, Vijay continues to build Paytm into a comprehensive financial services platform."
      }
    ],
    pull: "Technology should make life simpler for millions.",
    pullBy: "Vijay Shekhar Sharma",
    lesson: "Persistence beats privilege.",
    stats: [
      { l: "Valuation", v: "$16B+" },
      { l: "Users", v: "300M+" },
      { l: "Founded", v: "2010" },
      { l: "IPO", v: "2021" }
    ],
    tags: ["Fintech", "Payments", "IPO", "Noida"]
  },
]

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────
// Get unique months for filter
const getUniqueMonths = () => {
  const months = [...new Set(ARCHIVE_FOUNDERS.map(f => f.editionDate))]
  return months.sort((a, b) => {
    // Sort by date descending (latest first)
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateB.getTime() - dateA.getTime()
  })
}

// ─── FOUNDER PHOTO COMPONENT ──────────────────────────────────────────────────
function FounderPhoto({
  src, alt, initials, accent, accentBg,
  className = "", style = {}
}: {
  src: string; alt: string; initials: string
  accent: string; accentBg: string
  className?: string; style?: React.CSSProperties
}) {
  const isPlaceholder = src.includes("test.jpg")
  const [failed, setFailed] = useState(false)
  const show = !isPlaceholder && !failed

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: accentBg, ...style }}
    >
      {show && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
          width={400}
          height={500}
        />
      )}
      {!show && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-black"
            style={{ background: accent, fontSize: "1.8rem", fontFamily: "Georgia,serif" }}
          >
            {initials}
          </div>
          <p
            className="text-[8px] uppercase tracking-[0.2em] text-center px-4 leading-relaxed"
            style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
          >
            {alt.split(' ').slice(0, 2).join(' ')}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export function ArchiveClientPage() {
  const archiveJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://upforge.org/archive#cp",
    name: "The Founder Chronicle — Indian Startup Origin Stories",
    description:
      "Deeply reported origin stories of India's most consequential startup founders. Each edition profiles one builder: their founding moment, the bet they made, and the lesson it left behind.",
    url: "https://upforge.org/archive",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://upforge.org",
      logo: { "@type": "ImageObject", url: "https://upforge.org/logo.jpg" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "UpForge", item: "https://upforge.org" },
        { "@type": "ListItem", position: 2, name: "Founder Chronicle", item: "https://upforge.org/archive" },
      ],
    },
  }

  // Filter state - ONLY MONTH FILTER NOW
  const [selectedMonth, setSelectedMonth] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  
  // UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  
  // Get unique filter options - ONLY MONTHS
  const months = getUniqueMonths()

  // Debounce search to avoid too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Auto-update simulation: Check for new data every 30 seconds
  // In production, this would be replaced with actual data fetching
  useEffect(() => {
    const checkForUpdates = () => {
      console.log("Checking for new archive entries...")
      // In real implementation, you'd fetch from API here
      // For demo, we'll just log
    }
    
    const interval = setInterval(checkForUpdates, 30000)
    return () => clearInterval(interval)
  }, [])

  // Filter founders based on selected filters - ONLY MONTH NOW
  const filteredFounders = useMemo(() => {
    return ARCHIVE_FOUNDERS.filter(founder => {
      // Month filter
      if (selectedMonth !== "All" && founder.editionDate !== selectedMonth) {
        return false
      }
      
      // Search filter (case-insensitive search in name, company, category, tags)
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase()
        return (
          founder.name.toLowerCase().includes(searchLower) ||
          founder.company.toLowerCase().includes(searchLower) ||
          founder.category.toLowerCase().includes(searchLower) ||
          founder.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          founder.headline.toLowerCase().includes(searchLower)
        )
      }
      
      return true
    })
  }, [selectedMonth, debouncedSearch])

  // Group filtered founders by month for better organization
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: ArchiveFounder[] } = {}
    
    filteredFounders.forEach(founder => {
      if (!groups[founder.editionDate]) {
        groups[founder.editionDate] = []
      }
      groups[founder.editionDate].push(founder)
    })
    
    // Sort months descending
    return Object.keys(groups)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map(month => ({
        month,
        founders: groups[month]
      }))
  }, [filteredFounders])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveJsonLd) }}
      />
      <div
        style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }}
        role="main"
        aria-label="The Founder Chronicle Archive — Past editions and founder stories"
      >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .pf { font-family: 'Playfair Display', Georgia, serif !important; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn .3s ease both; }

        @media (min-width: 640px) {
          .archive-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .archive-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-family: 'Georgia', serif;
          font-size: 14px;
        }
        .search-input::placeholder {
          color: #C8C2B4;
          font-style: italic;
        }

        .filter-chip {
          transition: all 0.2s ease;
          cursor: pointer;
          border: 1px solid #D8D2C4;
          background: white;
          font-size: 10px;
          padding: 6px 12px;
          border-radius: 20px;
          font-family: system-ui, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .filter-chip:hover {
          border-color: #1A1208;
        }
        .filter-chip.active {
          background: #1A1208;
          color: white;
          border-color: #1A1208;
        }

        .view-toggle {
          border: 1px solid #D8D2C4;
          display: inline-flex;
          padding: 2px;
        }
        .view-toggle button {
          padding: 4px 8px;
          font-size: 10px;
          font-family: system-ui, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }
        .view-toggle button.active {
          background: #1A1208;
          color: white;
        }

        .list-view-item img {
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }
        .list-view-item:hover img {
          filter: grayscale(0%);
        }

        .archive-card {
          border: 1px solid #D8D2C4;
          background: white;
          transition: all 0.2s ease;
        }
        .archive-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border-color: #1A1208;
        }

        .list-view-item {
          border-bottom: 1px solid #D8D2C4;
          padding: 1rem 0;
          transition: background 0.2s ease;
        }
        .list-view-item:hover {
          background: rgba(255,255,255,0.5);
        }

        .month-divider {
          position: relative;
          text-align: center;
          margin: 2rem 0 1.5rem;
        }
        .month-divider span {
          background: #F3EFE5;
          padding: 0 1rem;
          color: #1A1208;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }
        .month-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #D8D2C4;
          z-index: 0;
        }

        .stat-badge {
          background: #F3EFE5;
          padding: 2px 8px;
          font-size: 9px;
          font-family: system-ui, sans-serif;
          color: #666;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .clear-search {
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .clear-search:hover {
          opacity: 0.7;
        }
      `}</style>

      {/* H1 for SEO */}
      <h1 className="sr-only">
        The Founder Chronicle Archive — Complete collection of Indian startup founder stories by edition and month
      </h1>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 sm:px-8 py-2"
        style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui,sans-serif" }}
      >
        <ol className="flex items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          <li>
            <Link href="/" className="hover:text-[#1A1208] transition-colors">
              UpForge
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#C8C2B4]">/</li>
          <li>
            <span className="text-[#1A1208] font-semibold">The Founder Chronicle Archive</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header
        style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}
        role="banner"
      >
        <div className="text-center px-4 pt-[2px] pb-6 sm:pb-9" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[8px] tracking-[0.42em] text-[#AAA] uppercase mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>
            UpForge · Independent Startup Registry · Archive
          </p>
          <p
            className="pf font-black leading-none tracking-tight text-[#1A1208]"
            aria-hidden="true"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
          >
            The Archive
          </p>
          <p className="italic mt-2.5 text-[#6B5C40]" style={{ fontSize: "clamp(13px, 2vw, 16px)" }}>
            Every founder story we've ever published — searchable, filterable, forever free
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-24 sm:w-40" style={{ background: "#C8C2B4" }} />
            <span style={{ color: "#C8C2B4", fontSize: 13 }} aria-hidden="true">✦</span>
            <div className="h-px w-24 sm:w-40" style={{ background: "#C8C2B4" }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filter Bar */}
        <div className="mb-8" style={{ borderBottom: "1px solid #D8C2B4", paddingBottom: "1.5rem" }}>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            
            {/* Search */}
            <div className="w-full sm:w-96" style={{ border: "1px solid #D8D2C4", background: "white" }}>
              <div className="flex items-center px-3 py-2.5">
                <Search className="w-4 h-4 text-[#C8C2B4]" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search founders, companies, categories..."
                  className="search-input ml-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search archive"
                />
                {searchQuery && (
                  <X
                    className="w-4 h-4 text-[#C8C2B4] clear-search"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  />
                )}
              </div>
            </div>

            {/* View Toggle & Filter Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* View Toggle */}
              <div className="view-toggle" role="tablist" aria-label="View mode">
                <button
                  role="tab"
                  aria-selected={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "active" : ""}
                >
                  Grid
                </button>
                <button
                  role="tab"
                  aria-selected={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "active" : ""}
                >
                  List
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="sm:hidden flex items-center gap-2 px-3 py-2"
                style={{ border: "1px solid #D8D2C4", background: "white" }}
                aria-expanded={isFilterOpen}
                aria-label="Toggle filters"
              >
                <Filter className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider">Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Chips - Desktop - ONLY MONTH FILTERS */}
          <div className="hidden sm:block mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider mr-2">Month:</span>
              <button
                className={`filter-chip ${selectedMonth === "All" ? "active" : ""}`}
                onClick={() => setSelectedMonth("All")}
              >
                All
              </button>
              {months.map(month => (
                <button
                  key={month}
                  className={`filter-chip ${selectedMonth === month ? "active" : ""}`}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Chips - Mobile (conditionally shown) - ONLY MONTH FILTERS */}
          {isFilterOpen && (
            <div className="sm:hidden mt-4 space-y-3 fade-in">
              <div>
                <p className="text-[9px] text-[#AAA] uppercase tracking-wider mb-2">Month</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`filter-chip ${selectedMonth === "All" ? "active" : ""}`}
                    onClick={() => setSelectedMonth("All")}
                  >
                    All
                  </button>
                  {months.map(month => (
                    <button
                      key={month}
                      className={`filter-chip ${selectedMonth === month ? "active" : ""}`}
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[10px] text-[#AAA]" style={{ fontFamily: "system-ui,sans-serif" }}>
              {filteredFounders.length} {filteredFounders.length === 1 ? 'story' : 'stories'} found
              {(selectedMonth !== "All" || searchQuery) && (
                <span>
                  {" "}
                  <button
                    onClick={() => {
                      setSelectedMonth("All")
                      setSearchQuery("")
                    }}
                    className="underline ml-2 hover:text-[#1A1208]"
                  >
                    Clear all filters
                  </button>
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-[#C8C2B4]" />
              <span className="text-[9px] text-[#AAA]">Auto-updates every 30s</span>
            </div>
          </div>
        </div>

        {/* Archive Content */}
        {groupedByMonth.length === 0 ? (
          <div className="text-center py-16" style={{ border: "1px solid #D8D2C4", background: "white" }}>
            <p className="pf text-[#1A1208] text-xl mb-2">No stories found</p>
            <p className="text-[#AAA] text-sm">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSelectedMonth("All")
                setSearchQuery("")
              }}
              className="mt-4 px-4 py-2 text-[10px] uppercase tracking-wider"
              style={{ border: "1px solid #1A1208" }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {groupedByMonth.map((group, groupIndex) => (
              <div key={group.month} className="mb-10">
                {/* Month Divider */}
                <div className="month-divider">
                  <span>{group.month}</span>
                </div>

                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className="archive-grid">
                    {group.founders.map((founder, idx) => (
                      <Link
                        key={`${founder.slug}-${idx}`}
                        href={`/startup/${founder.slug}`}
                        className="archive-card block fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {/* Card Image */}
                        <div className="relative w-full" style={{ height: 200 }}>
                          <FounderPhoto
                            src={founder.imgSrc}
                            alt={founder.name}
                            initials={founder.initials}
                            accent={founder.accent}
                            accentBg={founder.accentBg}
                            className="w-full h-full"
                          />
                          <div
                            className="absolute top-2 left-2 px-2 py-1"
                            style={{ background: founder.accent }}
                          >
                            <span className="text-white text-[8px] font-black uppercase tracking-wider">
                              {founder.edition}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="text-[8px] font-black uppercase px-2 py-1"
                              style={{ background: founder.accentBg, color: founder.accent }}
                            >
                              {founder.category}
                            </span>
                          </div>
                          
                          <p className="pf font-bold text-[#1A1208] mb-1" style={{ fontSize: 16 }}>
                            {founder.nameShort}
                          </p>
                          <p className="text-[#666] text-[11px] mb-2" style={{ fontFamily: "system-ui,sans-serif" }}>
                            {founder.company} · {founder.role}
                          </p>
                          
                          <p className="text-[#1A1208] text-[12px] leading-relaxed line-clamp-2 mb-3">
                            {founder.headline}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {founder.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="stat-badge">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #F0EAE0" }}>
                            <span
                              className="text-[9px] flex items-center gap-1"
                              style={{ color: founder.accent, fontFamily: "system-ui,sans-serif" }}
                            >
                              Read full story <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === "list" && (
                  <div className="space-y-0" style={{ borderTop: "1px solid #D8D2C4" }}>
                    {group.founders.map((founder, idx) => (
                      <Link
                        key={`${founder.slug}-${idx}`}
                        href={`/startup/${founder.slug}`}
                        className="list-view-item block fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Thumbnail */}
                          <div
                            className="flex-shrink-0 w-16 h-16 overflow-hidden"
                            style={{ background: founder.accentBg }}
                          >
                            <FounderPhoto
                              src={founder.imgSrc}
                              alt={founder.name}
                              initials={founder.initials}
                              accent={founder.accent}
                              accentBg={founder.accentBg}
                              className="w-full h-full"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-1">
                              <span
                                className="text-[8px] font-black uppercase px-2 py-0.5"
                                style={{ background: founder.accentBg, color: founder.accent }}
                              >
                                {founder.category}
                              </span>
                              <span className="text-[8px] text-[#AAA] uppercase tracking-wider">
                                {founder.edition}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-baseline gap-2">
                              <p className="pf font-bold text-[#1A1208]" style={{ fontSize: 16 }}>
                                {founder.name}
                              </p>
                              <p className="text-[#666] text-[11px]">
                                {founder.company} · {founder.role}
                              </p>
                            </div>

                            <p className="text-[#1A1208] text-[12px] mt-1 line-clamp-1">
                              {founder.headline}
                            </p>

                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex gap-1">
                                {founder.stats.slice(0, 2).map(stat => (
                                  <span key={stat.l} className="stat-badge">
                                    {stat.l}: {stat.v}
                                  </span>
                                ))}
                              </div>
                              <span
                                className="text-[9px] flex items-center gap-1"
                                style={{ color: founder.accent }}
                              >
                                Read <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Archive Stats */}
        <section
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid #D8D2C4" }}
          aria-label="Archive statistics"
        >
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="pf font-black text-[#1A1208] text-3xl">{ARCHIVE_FOUNDERS.length}</p>
              <p className="text-[9px] text-[#AAA] uppercase tracking-wider">Total Stories</p>
            </div>
            <div className="text-center">
              <p className="pf font-black text-[#1A1208] text-3xl">{months.length}</p>
              <p className="text-[9px] text-[#AAA] uppercase tracking-wider">Editions</p>
            </div>
            <div className="text-center">
              <p className="pf font-black text-[#1A1208] text-3xl">
                {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[9px] text-[#AAA] uppercase tracking-wider">Latest Edition</p>
            </div>
          </div>
        </section>

        {/* New Edition Alert Simulation */}
        <div
          className="mt-8 p-4 text-center"
          style={{ background: "#1A1208", color: "white" }}
        >
          <p className="text-[10px] uppercase tracking-wider mb-1">📰 New editions added automatically</p>
          <p className="text-[12px] opacity-80">
            This archive updates in real-time. When new founder stories are published, they appear here instantly.
          </p>
        </div>

        {/* Footer Links */}
        <footer className="mt-8 pb-2">
          <p
            className="text-[9px] leading-relaxed"
            style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif", borderTop: "1px solid #D8D2C4", paddingTop: "1rem" }}
          >
            * Archive contains all founder stories published by UpForge. Data verified as of March 2026.
            New editions are added automatically upon publication.
          </p>
          
          <nav aria-label="Archive navigation" className="mt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              <li><Link href="/" className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase">Home</Link></li>
              <li><Link href="/archive" className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase">Archive</Link></li>
              <li><Link href="/startup" className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase">Registry</Link></li>
              <li><Link href="/submit" className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase">Submit</Link></li>
            </ul>
          </nav>
        </footer>
      </main>
    </div>
    </>
  )
}

export default ArchiveClientPage
