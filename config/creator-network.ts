// config/creator-network.ts
/**
 * SINGLE SOURCE OF TRUTH for UpForge Creator Network & Startup Distribution.
 * All payout rates, campaign terms, and network parameters MUST reference this file.
 */

export const CREATOR_NETWORK_CONFIG = {
  // Payout rate & brand campaign pricing estimation strategy
  payoutRatePerViewINR: 0.004,
  payoutRateText: "Contact for Pricing",
  payoutRatePerThousandText: "~₹3K–₹5K / 1M Reach",
  payoutRateDescription: "Custom Brand Pricing (~₹3K–₹5K per 1 Million Views • Contact Desk for Quote)",
  payoutCadence: "Weekly",
  payoutMinimumThresholdINR: 500,

  // Dedicated Official Brand Emails (placed strategically across sections)
  emails: {
    team: "team@upforge.org",       // For Creator Network & Campaign Briefs
    founder: "founder@upforge.org", // For Executive Founder Desk & Strategy
    support: "support@upforge.org", // For Registry Verification & Platform Support
  },

  // Campaign parameters for Startup Founders / Brands
  distribution: {
    minimumCampaignViews: 10000,
    supportedCampaignTypes: [
      {
        id: "launch",
        title: "Product Launch",
        description: "Promote new product launches, app debuts, or major version updates through tech and startup creators.",
        recommendedCreators: "3–10 Creators",
      },
      {
        id: "hiring",
        title: "Hiring & Talent Push",
        description: "Amplify engineering, product, or executive openings to targeted tech and professional audiences.",
        recommendedCreators: "2–5 Creators",
      },
      {
        id: "founder",
        title: "Founder Narrative",
        description: "Share founder vision, origin stories, or building-in-public milestones through authentic video breakdown.",
        recommendedCreators: "1–3 Creators",
      },
      {
        id: "growth",
        title: "Growth & User Acquisition",
        description: "Drive user signups and feature adoption for B2B SaaS, developer tools, or consumer platforms.",
        recommendedCreators: "5–15 Creators",
      },
    ],
    contactWhatsApp: "https://wa.link/gmntyi",
    contactEmail: "team@upforge.org",
  },

  // Trust signals & anchors
  trust: {
    trustpilotUrl: "https://www.trustpilot.com/review/upforge.org",
    trustpilotRating: "4.8 / 5",
    googleSiteVerification: "Verified Google Site & Entity",
    upforgeRegistryUrl: "https://upforge.org/registry",
    upforgeStoriesUrl: "https://upforge.org/founder-stories",
  },

  // Creator application URL
  creatorApplicationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfkkbdjrw11tStpTFpEaDKodYQmxUJZbpVlu8iaQJg-1HNaoQ/viewform?embedded=true",

  // Dynamic helper for total network follower reach
  calculateTotalReach(creators: { followerCount: number }[]): number {
    return creators.reduce((acc, c) => acc + (c.followerCount || 0), 0)
  },

  // Helper for honest creator count presentation
  formatLiveCreatorCount(count: number): string {
    if (count <= 0) return "Growing Network"
    return `${count} Active Verified Creators`
  },
} as const
