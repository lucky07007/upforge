/**
 * Industry Registry Clusters
 * Defines specific tags for structured data expansion in the global registry.
 */
export type IndustryCluster = 'Fintech' | 'SaaS' | 'AI' | 'HealthTech' | 'E-commerce' | 'EdTech' | 'Other';

/**
 * UpForge Registry Number (UFRN)
 * Format: UF-YYYY-IND-XXXXX (e.g., UF-2026-IN-00001)
 * Used as the primary unique identifier across domains.
 */
export type UFRN = string;

export type VerificationTier = 'verified' | 'partially_verified' | 'self_reported' | 'unverified';

export interface VerificationBreakdown {
  website_reachable: number;
  domain_validity: number;
  company_identity_signal: number;
  founder_identity_signal: number;
  social_presence: number;
  product_evidence: number;
  registration_evidence: number;
  recent_activity: number;
}

export interface VerificationDetails {
  status: VerificationTier;
  score: number; // 0 - 100
  is_self_reported_capped?: boolean;
  breakdown: VerificationBreakdown;
  last_verified: string;
}

export interface ProvenanceRecord {
  field: string;
  value: string;
  source: string;
  verified_on: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface FounderRecord {
  name: string;
  role?: string;
  linkedin?: string;
  previously_at?: string[];
}

export interface LocationInfo {
  city?: string;
  state?: string;
  country?: string;
  country_code?: string;
}

export interface StartupHistory {
  founders?: Array<{ date: string; note: string }>;
  sector?: Array<{ date: string; note: string }>;
  status?: Array<{ date: string; note: string }>;
  re_verification?: Array<{ date: string; note: string }>;
}

export interface Startup {
  id: string;
  ufrn?: UFRN | null;
  name: string;
  slug: string;
  status?: "active" | "pending" | "approved" | "rejected" | VerificationTier | string | null;
  founded?: number | null;
  founded_year?: number | null;
  
  location?: LocationInfo;
  city?: string | null;
  state?: string | null;
  country_name?: string | null;
  country_code?: string | null;

  sector_id?: string | null;
  subsector_ids?: string[] | null;
  category?: string | null;
  industry_cluster?: IndustryCluster | null;
  tags?: string[] | null;

  founders?: string | FounderRecord[] | null;
  business_model?: string | null;
  legal_name?: string | null;
  funding_stage?: string | null;
  funding_total?: string | null;
  valuation?: string | null;
  valuation_date?: string | null;
  data_as_of?: string | null;
  
  description?: string | null;
  description_short?: string | null;
  description_long?: string | null;
  
  logo_url?: string | null;
  website?: string | null;
  
  social?: {
    linkedin?: string | null;
    twitter?: string | null;
    instagram?: string | null;
  };
  linkedin_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;

  verification?: VerificationDetails;
  provenance?: ProvenanceRecord[];
  history?: StartupHistory;
  sources?: string[];

  is_featured?: boolean;
  is_sponsored?: boolean;
  created_at?: string;
  updated_at?: string | null;
}

export interface StartupDirectoryItem {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  founded_year?: number | null;
  category?: string | null;
  ufrn?: UFRN | null;
  industry_cluster?: IndustryCluster | null;
  country_code?: string | null;
  country_name?: string | null;
  verification_tier?: VerificationTier;
  verification_score?: number;
}

export function formatFounders(founders?: string | FounderRecord[] | null): string {
  if (!founders) return "";
  if (typeof founders === "string") return founders;
  if (Array.isArray(founders)) {
    return founders
      .map((f) => (typeof f === "string" ? f : f.name))
      .filter(Boolean)
      .join(", ");
  }
  return "";
}

