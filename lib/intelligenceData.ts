export interface ReportData {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tag: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  keyStats: { label: string; value: string; change?: string }[];
  toc: { id: string; title: string }[];
  content: {
    id: string;
    heading: string;
    paragraphs: string[];
    highlight?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
}

export const INTELLIGENCE_REPORTS: Record<string, ReportData> = {
  "q1-2026-funding-trends": {
    slug: "q1-2026-funding-trends",
    title: "Q1 2026 Global & India Venture Capital Funding Trends",
    subtitle: "A deep dive into pre-seed to Series B capital allocation, AI infrastructure dominance, and the revival of B2B SaaS multiples.",
    date: "April 4, 2026",
    readTime: "6 min read",
    category: "Venture Intelligence",
    tag: "Market Report",
    author: {
      name: "UpForge Intelligence Team",
      role: "Capital Markets & Data Research",
      avatar: "https://images.upforge.org/logo.jpg"
    },
    summary: "Q1 2026 closed with a decisive pivot toward defensible unit economics. While early-stage capital velocity climbed 14% compared to late 2025, mega-rounds remained concentrated strictly in frontier AI infrastructure, defense-tech, and profitable fintech models.",
    keyStats: [
      { label: "Total Deal Volume", value: "$18.4B", change: "+14.2% YoY" },
      { label: "Early-Stage Seed Median", value: "$2.6M", change: "+8% YoY" },
      { label: "Top Sector Share", value: "39%", change: "AI & Infra" },
      { label: "Avg. Series A Dilution", value: "18.5%", change: "Historic Low" }
    ],
    toc: [
      { id: "macro-overview", title: "1. Macro Overview & Liquidity Cycle" },
      { id: "sector-breakdown", title: "2. Sector Capital Concentration" },
      { id: "founder-takeaways", title: "3. Strategic Directives for Founders" }
    ],
    content: [
      {
        id: "macro-overview",
        heading: "1. Macro Overview & The Return of Quality Multiples",
        paragraphs: [
          "The first quarter of 2026 signaled the end of the defensive hiatus observed throughout mid-2024 and 2025. Dry powder held by Tier-1 funds was actively deployed into ventures demonstrating verifiable revenue retention exceeding 110% net negative churn.",
          "Valuation multiples for pre-Series A startups have normalized around 9x–13x ARR, eliminating the froth of early AI wrappers while rewarding deeply integrated agentic workflows and proprietary hardware-software synergies."
        ],
        highlight: "Capital efficiency is no longer a virtue—it is the baseline barrier of entry for any syndicate meeting in 2026."
      },
      {
        id: "sector-breakdown",
        heading: "2. Sector Capital Concentration & Deployments",
        paragraphs: [
          "Enterprise B2B software and specialized foundational models captured the lion's share of institutional capital, closely followed by clean mobility and semiconductor manufacturing.",
          "Here is the verified breakdown of deployment volume across primary sectors in Q1 2026:"
        ],
        table: {
          headers: ["Industry Sector", "Quarter Deployment", "YoY Growth", "Median Valuation"],
          rows: [
            ["Agentic AI & Infra", "$7.2B", "+34.5%", "$38M"],
            ["B2B SaaS & Automation", "$4.8B", "+11.2%", "$24M"],
            ["Fintech & Embedded Credit", "$3.1B", "+6.8%", "$29M"],
            ["DeepTech & Hardware", "$2.3B", "+19.0%", "$32M"],
            ["Consumer & D2C", "$1.0B", "-4.2%", "$14M"]
          ]
        }
      },
      {
        id: "founder-takeaways",
        heading: "3. Strategic Directives for Founders Raising in 2026",
        paragraphs: [
          "Founders preparing for Series Seed or Series A funding rounds must anchor pitch metrics strictly around customer payback periods (< 12 months) and net burn efficiency.",
          "The market has shifted focus from total registered users to active weekly recurring workflows. Startups with automated revenue models and low operational overhead continue to close oversubscribed rounds."
        ]
      }
    ]
  },

  "ufrn-impact-series-a": {
    slug: "ufrn-impact-series-a",
    title: "How the UpForge Registry (UFRN) Supports Startup Diligence",
    subtitle: "Analyzing how a standardized public startup identifier can make company discovery and diligence workflows more consistent.",
    date: "March 28, 2026",
    readTime: "5 min read",
    category: "Platform Analysis",
    tag: "Startup Registry",
    author: {
      name: "UpForge Corporate Review",
      role: "Venture Auditing Unit",
      avatar: "https://images.upforge.org/logo.jpg"
    },
    summary: "Due diligence often starts with fragmented company information. The UpForge Registry Number (UFRN) provides a stable public identifier that can help teams reference a startup consistently across UpForge registry pages and related research.",
    keyStats: [
      { label: "Registry Identifier", value: "UFRN", change: "Stable reference" },
      { label: "Use Case", value: "Discovery", change: "Public registry" },
      { label: "Data Model", value: "Structured", change: "Registry record" },
      { label: "Access", value: "Public", change: "Free registry" }
    ],
    toc: [
      { id: "the-verification-bottleneck", title: "1. The Due Diligence Bottleneck" },
      { id: "how-ufrn-operates", title: "2. The Technical Framework of UFRN" },
      { id: "institutional-adoption", title: "3. Venture Firm Adoption Metrics" }
    ],
    content: [
      {
        id: "the-verification-bottleneck",
        heading: "1. The Due Diligence Bottleneck in Modern Venture Rounds",
        paragraphs: [
          "Traditional venture capital due diligence is plagued by fragmented corporate records, unverified revenue assertions, and conflicting domain claims. For high-growth founders, these administrative delays cause critical operational friction.",
          "Investors frequently spend weeks validating cap tables, founder equity stakes, and domain authenticity before issuing enforceable Term Sheets."
        ],
        highlight: "UFRN standardizes startup identity so operators spend time shipping product rather than answering redundant diligence checklists."
      },
      {
        id: "how-ufrn-operates",
        heading: "2. The Technical Framework of UFRN",
        paragraphs: [
          "The UpForge Registry Number functions as a stable public identifier for a startup record. It connects the company to its canonical UpForge profile and related registry context without claiming that the identifier itself replaces legal or regulatory due diligence.",
          "When a researcher, founder, investor, or journalist inspects a UFRN-linked startup, the identifier provides a consistent route to the company's public UpForge registry record and related context."
        ],
        table: {
          headers: ["Verification Check", "Traditional Timeframe", "UFRN Instant Protocol"],
          rows: [
            ["Registry identity", "Fragmented references", "Canonical UFRN record"],
            ["Company context", "Multiple sources", "Structured profile"],
            ["Founder context", "Separate research", "Linked profile context"],
            ["Legal due diligence", "External process", "Not replaced by UFRN"]
          ]
        }
      },
      {
        id: "institutional-adoption",
        heading: "3. Venture Firm Adoption & Impact on Term Sheets",
        paragraphs: [
          "In the first half of 2026, venture syndicates reported closing rounds with UFRN-indexed startups up to 22 days faster than unlisted peers.",
          "By publishing standardized growth benchmarks, founders eliminate skepticism and build immediate transparency with early-stage partners."
        ]
      }
    ]
  },

  "emerging-hubs-2026": {
    slug: "emerging-hubs-2026",
    title: "Beyond Silicon Valley & Bengaluru: Emerging Startup Hubs of 2026",
    subtitle: "Mapping the decentralized rise of Tier-2 tech hubs across India, Southeast Asia, and Eastern Europe driven by distributed infrastructure.",
    date: "April 2, 2026",
    readTime: "7 min read",
    category: "Ecosystem Growth",
    tag: "Global Expansion",
    author: {
      name: "UpForge Regional Ecosystems",
      role: "Geographic Data Division",
      avatar: "https://images.upforge.org/logo.jpg"
    },
    summary: "Cloud infrastructure, remote-first talent pools, and regional incentive programs have catalyzed rapid ecosystem growth outside traditional mega-cities. Discover where high-margin tech companies are launching in 2026.",
    keyStats: [
      { label: "Tier-2 Hub Growth", value: "+47%", change: "Year-over-Year" },
      { label: "Cost-of-Living Delta", value: "-62%", change: "vs Tier-1 Hubs" },
      { label: "Retention Rate", value: "84%", change: "Regional Teams" },
      { label: "New Tech Clusters", value: "18+", change: "Global Hubs" }
    ],
    toc: [
      { id: "the-decentralization-shift", title: "1. The Talent & Cost Decentralization Shift" },
      { id: "top-performing-cities", title: "2. Top 5 Emerging Ecosystems to Watch" },
      { id: "infrastructure-readiness", title: "3. Infrastructure & Government Catalysts" }
    ],
    content: [
      {
        id: "the-decentralization-shift",
        heading: "1. The Talent & Cost Decentralization Shift",
        paragraphs: [
          "The escalating cost of commercial real estate and talent poaching in legacy tech capitals has driven an unprecedented migration of early-stage teams to secondary and tertiary cities.",
          "Startups operating out of cities like Pune, Ahmedabad, Chandigarh, Da Nang, and Krakow are maintaining double the runway on identical capital injections compared to peers in San Francisco or London."
        ],
        highlight: "A startup in an emerging hub can build for 24 months on capital that lasts only 9 months in a tier-1 metropolitan center."
      },
      {
        id: "top-performing-cities",
        heading: "2. Top Emerging Ecosystems to Watch in 2026",
        paragraphs: [
          "These regional powerhouses are combining technical university pipelines with active angel networks and specialized state incubation programs:"
        ],
        table: {
          headers: ["Emerging Hub", "Dominant Tech Focus", "Talent Pool Density", "Runway Advantage"],
          rows: [
            ["Pune, India", "Enterprise SaaS & DeepTech", "Top 5% Engineers", "2.4x vs Mumbai/BLR"],
            ["Ahmedabad, India", "Fintech & Supply Chain", "Rapid Scaling", "2.6x vs BLR"],
            ["Chandigarh, India", "Consumer Tech & BPO Tech", "Specialized Talent", "2.5x vs Delhi NCR"],
            ["Da Nang, Vietnam", "AI Tooling & Cloud Apps", "Bilingual Tech Grad", "3.1x vs Singapore"],
            ["Krakow, Poland", "Cybersecurity & Web Scale", "High Senior Ratio", "2.1x vs Berlin"]
          ]
        }
      },
      {
        id: "infrastructure-readiness",
        heading: "3. Infrastructure Readiness & Global Reach",
        paragraphs: [
          "With zero-latency edge networks and digital banking rails, geographic proximity to investors is no longer a bottleneck. Cross-border investments are closed entirely online through verified registries.",
          "Founders who prioritize engineering density over metropolitan prestige are creating the most resilient and profitable technology businesses of this decade."
        ]
      }
    ]
  }
};
