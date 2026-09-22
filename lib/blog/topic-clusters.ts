export interface TopicCluster {
  id: string            
  name: string
  slug: string
  description: string
  pillarPostSlug: string
  postSlugs: string[]
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: "startup-funding",
    name: "Startup Funding & Capital",
    slug: "funding-capital",
    description: "Pitch decks, valuation benchmarks, VC firm listings, and investor negotiation playbooks for founders.",
    pillarPostSlug: "how-to-get-startup-funding-india-2026",
    postSlugs: [
      "how-to-get-startup-funding-india-2026",
      "best-vc-firms-india-2026",
      "startup-valuation-india-2026",
      "ai-startup-funding-exit-route-india-2026",
      "investors-rejecting-generic-ai-pitches-2026",
      "top-startup-incubators-india-2026",
      "startup-pitch-deck-template-india-2026",
      "bootstrapped-startups-india-success-stories",
    ],
  },
  {
    id: "ecosystem-unicorns",
    name: "Ecosystem & Unicorns",
    slug: "ecosystem-unicorns",
    description: "Macro analyses of the Indian startup ecosystem, unicorn statistics, and global market comparisons.",
    pillarPostSlug: "india-startup-ecosystem-2026",
    postSlugs: [
      "india-startup-ecosystem-2026",
      "top-indian-unicorns-2026",
      "india-vs-silicon-valley-startups",
      "startup-failure-reasons-india",
      "best-indian-startup-founders-to-follow-2026",
      "women-founders-india-2026",
    ],
  },
  {
    id: "ai-tech-frontier",
    name: "AI & Tech Frontier",
    slug: "ai-tech-frontier",
    description: "Cutting-edge AI agents, defense tech, and emerging software technology playbooks.",
    pillarPostSlug: "top-ai-startups-india-2026",
    postSlugs: [
      "top-ai-startups-india-2026",
      "ai-agents-for-startups-india-2026",
      "ai-startup-funding-exit-route-india-2026",
      "investors-rejecting-generic-ai-pitches-2026",
      "defense-tech-startups-india-2026",
    ],
  },
  {
    id: "legal-compliance",
    name: "Startup Legal & Operations",
    slug: "legal-operations",
    description: "GST compliance, ESOP structuring, incorporation guides, and UFRN verification standards.",
    pillarPostSlug: "startup-legal-guide-india-2026",
    postSlugs: [
      "startup-legal-guide-india-2026",
      "gst-compliance-guide-startups-india-2026",
      "esop-guide-for-startups-india-2026",
      "startup-verification-ufrn-credentials-guide",
      "startup-hiring-guide-india-2026",
      "how-to-start-startup-india-2026",
    ],
  },
  {
    id: "sector-deep-dives",
    name: "Sector Deep Dives",
    slug: "sector-deep-dives",
    description: "Detailed industry sector rankings and market dynamics across FinTech, SaaS, HealthTech, D2C, and Climate Tech.",
    pillarPostSlug: "top-20-saas-startups-india-2026",
    postSlugs: [
      "top-20-saas-startups-india-2026",
      "fintech-startups-india-2026",
      "healthtech-startups-india-2026",
      "d2c-startups-india-2026",
      "climate-tech-startups-india-2026",
    ],
  },
]

export function getClusterForPost(postSlug: string): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find(
    (cluster) => cluster.pillarPostSlug === postSlug || cluster.postSlugs.includes(postSlug)
  )
}
