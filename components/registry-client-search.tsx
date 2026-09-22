"use client"; 

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, ShieldCheck, Filter, X, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Startup } from "@/types/startup";
import { searchEngine, SearchFilters } from "@/lib/search-client";

interface RegistryClientSearchProps {
  initialStartups: Startup[];
  sectors: string[];
  countries: { code: string; name: string }[];
  years: number[];
  initialQuery?: string;
  initialSector?: string;
  initialCountry?: string;
  initialYear?: string;
}

export function RegistryClientSearch({
  initialStartups,
  sectors,
  countries,
  years,
  initialQuery = "",
  initialSector = "",
  initialCountry = "",
  initialYear = "",
}: RegistryClientSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [sector, setSector] = useState(initialSector);
  const [country, setCountry] = useState(initialCountry);
  const [year, setYear] = useState(initialYear);
  const [sort, setSort] = useState<"name" | "newest" | "year">("name");
  const [isFilterOpen, setIsFilterOpen] = useState(
    Boolean(initialSector || initialCountry || initialYear)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState<Startup[]>(initialStartups);

  // Load MiniSearch index client-side after first mount
  useEffect(() => {
    searchEngine.loadDataset().then(() => {
      setIsLoaded(true);
    });
  }, []);

  // Filter & Search computation
  useEffect(() => {
    if (!isLoaded) {
      // Basic client filtering on initialStartups if search engine is still loading
      let filtered = [...initialStartups];
      if (sector) filtered = filtered.filter(s => s.category === sector || s.sector_id === sector);
      if (country) filtered = filtered.filter(s => s.country_code === country || s.country_name === country);
      if (year) filtered = filtered.filter(s => String(s.founded_year || s.founded) === year);
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(s =>
          s.name.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q)) ||
          (s.ufrn && s.ufrn.toLowerCase().includes(q))
        );
      }
      setResults(filtered);
      return;
    }

    const filters: SearchFilters = {
      query: query || undefined,
      category: sector || undefined,
      country: country || undefined,
      founded_year: year || undefined,
    };

    let res = searchEngine.query(filters);

    // Apply sorting
    if (sort === "name") {
      res = [...res].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "newest") {
      res = [...res].sort((a, b) => (b.founded_year || b.founded || 0) - (a.founded_year || a.founded || 0));
    } else if (sort === "year") {
      res = [...res].sort((a, b) => (a.founded_year || a.founded || 0) - (b.founded_year || b.founded || 0));
    }

    setResults(res);
  }, [query, sector, country, year, sort, isLoaded, initialStartups]);

  const activeFilterCount = [sector, country, year].filter(Boolean).length;

  const clearAll = () => {
    setQuery("");
    setSector("");
    setCountry("");
    setYear("");
    setSort("name");
  };

  return (
    <div>
      {/* ── Search Toolbar ── */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent-primary transition-colors pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-muted/40 border border-[var(--glass-border)] rounded-full pl-12 pr-28 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all font-light"
                placeholder="Search records instantly by name, sector, city, or UFRN..."
                aria-label="Search global registry"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter toggle & Sort Toolbar */}
          <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilterCount > 0
                  ? "border-accent-gold text-accent-gold bg-accent-gold/10"
                  : "border-[var(--glass-border)] text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent-gold text-black rounded-full px-2 py-0.5 text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort options */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs text-muted-foreground font-medium mr-1 hidden sm:inline">Sort:</span>
              {[
                { label: "A–Z", val: "name" },
                { label: "Newest", val: "newest" },
                { label: "Founded", val: "year" },
              ].map((s) => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => setSort(s.val as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    sort === s.val
                      ? "bg-accent-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}

              {(activeFilterCount > 0 || query) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-accent-gold hover:bg-accent-gold/10 transition-colors flex items-center gap-1 ml-2 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Slide-down Filter Panel */}
          {isFilterOpen && (
            <div className="bg-card border border-[var(--glass-border)] rounded-2xl p-5 mt-4 shadow-lg flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Founded Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                >
                  <option value="">Any Year</option>
                  {years.map((yr) => (
                    <option key={yr} value={String(yr)}>{yr}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                >
                  <option value="">All Sectors</option>
                  {sectors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-10 bg-background border border-[var(--glass-border)] rounded-xl text-xs text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                >
                  <option value="">All Countries</option>
                  {countries.map((ct) => (
                    <option key={ct.code} value={ct.code}>{ct.name} ({ct.code})</option>
                  ))}
                </select>
              </div>

              {(activeFilterCount > 0 || query) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-10 bg-accent-gold hover:bg-amber-600 text-black font-bold uppercase tracking-wider text-xs px-5 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Results Stream ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--glass-border)]">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            {query ? `Search Results for "${query}"` : sector ? `${sector} Directory` : country ? `${country} Startups` : "Verified Directory"}
          </h2>
          <span className="text-xs text-muted-foreground">
            Showing {results.length} verified records
          </span>
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((s) => (
              <Link
                key={s.id}
                href={`/startup/${s.slug}`}
                className="glass-card group flex flex-col sm:flex-row items-start sm:items-center p-5 gap-6 rounded-3xl border border-border/80 bg-card/90 shadow-sm hover:shadow-md transition-all hover:border-amber-500/50"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border/80 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-amber-500/50 transition-colors">
                  {s.logo_url ? (
                    <img
                      src={s.logo_url}
                      alt={s.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="font-bold text-xl text-muted-foreground">{s.name.charAt(0)}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-amber-500 transition-colors truncate">{s.name}</h3>
                    {s.is_featured && (
                      <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded-full bg-amber-500/10">Featured</span>
                    )}
                    {s.category && (
                      <span className="text-[10px] uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                        {s.category}
                      </span>
                    )}
                    {s.ufrn && (
                      <span className="text-[10px] font-mono font-bold text-muted-foreground border border-border px-2 py-0.5 rounded-full bg-muted">
                        {s.ufrn}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{s.description || "Verified entity on the UpForge Global Startup Registry."}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-1 text-xs font-medium text-muted-foreground">
                    {(s.city || s.location?.city) && (
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> {s.city || s.location?.city}{s.country_code ? `, ${s.country_code}` : ''}
                      </span>
                    )}
                    {(s.founded_year || s.founded) && <span>Est. {s.founded_year || s.founded}</span>}
                    {s.verification && (
                      <span className="font-mono text-amber-500 font-bold">
                        Score: {s.verification.score}/100 ({s.verification.status})
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full border border-border/80 items-center justify-center group-hover:bg-amber-500 group-hover:text-black text-muted-foreground transition-all">
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-16 text-center border-dashed border-border/80">
            <span className="text-4xl text-muted-foreground mb-4 block">∅</span>
            <h3 className="text-xl font-bold text-foreground mb-2">No matching startups found</h3>
            <p className="text-muted-foreground mb-6">Try clearing your filters or refining your search term.</p>
            <button
              type="button"
              onClick={clearAll}
              className="inline-block bg-amber-500 text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
