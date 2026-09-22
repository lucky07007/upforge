import statsData from "../public/data/stats.json"

/**
 * Single source of truth for platform-wide statistics.
 * Any numeric claim regarding startup counts, verified profile counts,
 * country reach, sectors, and verified creators MUST reference this file.
 * Automatically hydrated from build-time generated /public/data/stats.json
 */

export const SITE_STATS = {
  verifiedStartupsCount: statsData.verifiedStartupsCount || 1050,
  trackedStartupsCount: statsData.trackedStartupsCount || 1050,
  sectorCount: statsData.sectorCount || 17,
  countryCount: statsData.countryCount || 70,
  verifiedCreatorsCount: statsData.verifiedCreatorsCount || 100,
  
  // Formatted string helpers
  get verifiedStartupsText() {
    return `${this.verifiedStartupsCount}`
  },
  get trackedStartupsText() {
    return `${this.trackedStartupsCount.toLocaleString()}+`
  },
  get sectorsText() {
    return `${this.sectorCount}+`
  },
  get countriesText() {
    return `${this.countryCount}+`
  },
  get creatorsText() {
    return `${this.verifiedCreatorsCount}`
  }
} as const

