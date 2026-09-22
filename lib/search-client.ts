import MiniSearch from "minisearch";
import type { Startup } from "@/types/startup";

export interface SearchFilters {
  query?: string;
  category?: string;
  country?: string;
  city?: string;
  founded_year?: number | string;
  business_model?: string;
  verification_tier?: string;
}

class StartupSearchEngine {
  private miniSearch: MiniSearch<Startup> | null = null;
  private dataset: Startup[] = [];
  private isLoaded = false;
  private loadPromise: Promise<Startup[]> | null = null;

  async loadDataset(): Promise<Startup[]> {
    if (this.isLoaded) return this.dataset;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      try {
        const res = await fetch("/data/startups.json", {
          cache: "force-cache"
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Startup[] = await res.json();
        
        this.dataset = data;
        this.miniSearch = new MiniSearch<Startup>({
          fields: ["name", "slug", "description", "category", "city", "founders", "ufrn", "business_model"],
          storeFields: ["id", "slug", "name", "ufrn", "category", "city", "country_name", "founded_year", "verification", "description", "founders", "logo_url"],
          searchOptions: {
            boost: { name: 3, ufrn: 3, category: 2, founders: 1.5 },
            fuzzy: 0.2,
            prefix: true
          }
        });

        this.miniSearch.addAll(data);
        this.isLoaded = true;
        return data;
      } catch (err) {
        console.error("Failed to load startup search dataset:", err);
        return [];
      }
    })();

    return this.loadPromise;
  }

  query(filters: SearchFilters): Startup[] {
    if (!this.isLoaded || this.dataset.length === 0) return [];

    let filtered = [...this.dataset];

    // 1. Hard pre-filters (constraints first)
    if (filters.category && filters.category !== "all") {
      const catLower = filters.category.toLowerCase().trim();
      filtered = filtered.filter(
        (s) =>
          (s.category && s.category.toLowerCase().trim() === catLower) ||
          (s.sector_id && s.sector_id.toLowerCase().trim() === catLower)
      );
    }

    if (filters.country && filters.country !== "all") {
      const countryLower = filters.country.toLowerCase().trim();
      filtered = filtered.filter(
        (s) =>
          (s.country_name && s.country_name.toLowerCase().trim() === countryLower) ||
          (s.country_code && s.country_code.toLowerCase().trim() === countryLower) ||
          (s.location?.country && s.location.country.toLowerCase().trim() === countryLower)
      );
    }

    if (filters.city && filters.city !== "all") {
      const cityLower = filters.city.toLowerCase().trim();
      filtered = filtered.filter(
        (s) => s.city && s.city.toLowerCase().trim() === cityLower
      );
    }

    if (filters.founded_year && filters.founded_year !== "all") {
      const targetYear = Number(filters.founded_year);
      filtered = filtered.filter((s) => (s.founded_year || s.founded) === targetYear);
    }

    if (filters.business_model && filters.business_model !== "all") {
      const bmLower = filters.business_model.toLowerCase().trim();
      filtered = filtered.filter(
        (s) => s.business_model && s.business_model.toLowerCase().trim() === bmLower
      );
    }

    if (filters.verification_tier && filters.verification_tier !== "all") {
      const tierLower = filters.verification_tier.toLowerCase().trim();
      filtered = filtered.filter(
        (s) => s.verification && s.verification.status.toLowerCase().trim() === tierLower
      );
    }

    // 2. Text Search (MiniSearch ranking)
    const q = (filters.query || "").trim();
    if (!q || !this.miniSearch) {
      return filtered;
    }

    const searchResults = this.miniSearch.search(q);
    const searchIdSet = new Set(searchResults.map((r) => r.id));

    // Preserve MiniSearch relevance order while retaining hard filter constraints
    const rankedResults: Startup[] = [];
    for (const res of searchResults) {
      const match = filtered.find((item) => item.id === res.id);
      if (match) {
        rankedResults.push(match);
      }
    }

    return rankedResults;
  }
}

export const searchEngine = new StartupSearchEngine();
