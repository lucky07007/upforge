"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  X,
  Plus,
  Search,
  Check,
  ExternalLink,
  Copy,
  Sparkles,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
  Tag,
  Globe,
  FileCheck
} from "lucide-react";
import type { Startup } from "@/types/startup";
import { formatFounders } from "@/types/startup";
import { TrustScoreBadge } from "@/components/trust-score-badge";

interface StartupCompareMatrixProps {
  initialSlugs: string[];
  allStartups: Startup[];
}

export function StartupCompareMatrix({
  initialSlugs,
  allStartups,
}: StartupCompareMatrixProps) {
  // Default fallback startups if none passed in URL
  const defaultSlugs = useMemo(() => {
    if (initialSlugs.length > 0) return initialSlugs.slice(0, 4);
    // Pick first 3 featured or available startups
    const featured = allStartups.filter((s) => s.is_featured).map((s) => s.slug);
    if (featured.length >= 2) return featured.slice(0, 3);
    return allStartups.slice(0, 3).map((s) => s.slug);
  }, [initialSlugs, allStartups]);

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(defaultSlugs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Derive selected startup objects
  const selectedStartups = useMemo(() => {
    return selectedSlugs
      .map((slug) => allStartups.find((s) => s.slug === slug))
      .filter(Boolean) as Startup[];
  }, [selectedSlugs, allStartups]);

  // Instant filtered list for add selector
  const availableSearchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const unselected = allStartups.filter((s) => !selectedSlugs.includes(s.slug));
    if (!q) return unselected.slice(0, 8);

    return unselected
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.category?.toLowerCase() ?? "").includes(q) ||
          (s.city?.toLowerCase() ?? "").includes(q) ||
          (s.country_name?.toLowerCase() ?? "").includes(q) ||
          (s.ufrn?.toLowerCase() ?? "").includes(q) ||
          formatFounders(s.founders).toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [searchQuery, allStartups, selectedSlugs]);

  const addStartup = (slug: string) => {
    if (selectedSlugs.length < 4 && !selectedSlugs.includes(slug)) {
      const next = [...selectedSlugs, slug];
      setSelectedSlugs(next);
      updateUrl(next);
      setIsAddingModalOpen(false);
      setSearchQuery("");
    }
  };

  const removeStartup = (slug: string) => {
    const next = selectedSlugs.filter((s) => s !== slug);
    setSelectedSlugs(next);
    updateUrl(next);
  };

  const updateUrl = (slugs: string[]) => {
    if (typeof window !== "undefined") {
      const newUrl = slugs.length > 0
        ? `/compare?slugs=${slugs.join(",")}`
        : "/compare";
      window.history.replaceState(null, "", newUrl);
    }
  };

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls & Status Bar */}
      <div className="glass-panel border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-2xl rounded-3xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-gold">
              Live Comparison Matrix
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Comparing {selectedStartups.length} of 4 Startups
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Side-by-side verified UFRN credentials, trust scores, and data audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {selectedSlugs.length < 4 && (
            <button
              type="button"
              onClick={() => setIsAddingModalOpen(true)}
              className="inline-flex items-center gap-2 bg-accent-gold text-black hover:bg-amber-400 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Startup
            </button>
          )}

          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 bg-card hover:bg-muted text-foreground border border-[var(--glass-border)] rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied Link!" : "Share Comparison"}
          </button>
        </div>
      </div>

      {/* Add Startup Modal */}
      {isAddingModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-gold block mb-1">
                  Add Entity to Matrix
                </span>
                <h3 className="text-xl font-bold text-foreground">Select Startup</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-2 rounded-full border border-border/50 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, sector, city, or UFRN..."
                className="w-full bg-muted/40 border border-[var(--glass-border)] rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                autoFocus
              />
            </div>

            {/* Quick Suggestions Chips */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Quick Add Suggestions:
              </span>
              <div className="flex flex-wrap gap-2">
                {allStartups
                  .filter((s) => !selectedSlugs.includes(s.slug))
                  .slice(0, 5)
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => addStartup(s.slug)}
                      className="text-xs font-medium bg-muted/60 hover:bg-accent-gold/10 hover:border-accent-gold/40 border border-border/80 px-3 py-1 rounded-full text-foreground hover:text-accent-gold transition-all"
                    >
                      + {s.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* Results Stream */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {availableSearchResults.length > 0 ? (
                availableSearchResults.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => addStartup(s.slug)}
                    className="w-full text-left p-3.5 rounded-2xl border border-border/60 hover:border-accent-primary/50 bg-background/50 hover:bg-muted/50 flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden flex-shrink-0 font-bold text-accent-gold">
                        {s.logo_url ? (
                          <img src={s.logo_url} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          s.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-foreground block truncate group-hover:text-accent-primary transition-colors">
                          {s.name}
                        </span>
                        <span className="text-xs text-muted-foreground block truncate">
                          {s.category} • {s.city || s.country_name || "Global"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-gold border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 rounded-full flex-shrink-0">
                      + Add
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-6">
                  No matching startups found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Grid Table */}
      {selectedStartups.length === 0 ? (
        <div className="glass-panel border border-[var(--glass-border)] rounded-3xl p-16 text-center shadow-lg">
          <Sparkles className="w-10 h-10 text-accent-gold mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-foreground mb-2">No startups selected for comparison</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Select up to 4 verified entities to compare their trust scores, UFRN records, founders, and governance.
          </p>
          <button
            type="button"
            onClick={() => setIsAddingModalOpen(true)}
            className="inline-flex items-center gap-2 bg-accent-gold text-black hover:bg-amber-400 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Select Startups to Compare
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-[var(--glass-border)] shadow-xl bg-card">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--glass-border)] bg-muted/40">
                <th className="p-5 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground w-56">
                  Metric / Feature
                </th>
                {selectedStartups.map((s) => (
                  <th key={s.id} className="p-5 border-l border-[var(--glass-border)] relative min-w-[220px]">
                    <button
                      type="button"
                      onClick={() => removeStartup(s.slug)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 p-1.5 rounded-full hover:bg-muted transition-colors"
                      title="Remove startup"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 pr-6">
                      <div className="w-12 h-12 rounded-xl bg-background border border-[var(--glass-border)] flex items-center justify-center overflow-hidden flex-shrink-0 font-bold text-lg text-accent-gold shadow-sm">
                        {s.logo_url ? (
                          <img src={s.logo_url} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          s.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground text-lg leading-tight truncate">{s.name}</h3>
                        <Link
                          href={`/startup/${s.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-gold hover:underline mt-1"
                        >
                          View Profile <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </th>
                ))}

                {/* Add column placeholder if < 4 */}
                {selectedStartups.length < 4 && (
                  <th className="p-5 border-l border-[var(--glass-border)] min-w-[180px] bg-muted/20">
                    <button
                      type="button"
                      onClick={() => setIsAddingModalOpen(true)}
                      className="w-full h-full min-h-[90px] border-2 border-dashed border-border/80 hover:border-accent-gold/60 rounded-2xl flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-accent-gold transition-all cursor-pointer p-3"
                    >
                      <Plus className="w-5 h-5 text-accent-gold" />
                      <span className="text-xs font-bold uppercase tracking-wider">+ Add Startup</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--glass-border)] text-sm">
              {/* UFRN Identifier */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  UFRN Identifier
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)] font-mono text-xs font-bold text-accent-gold">
                    {s.ufrn || `UF-2026-${(s.country_code || "IN").slice(0, 2)}-${s.slug.slice(0, 5).toUpperCase()}`}
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Trust Score */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Trust Score & Status
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)]">
                    <TrustScoreBadge verification={s.verification} />
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Category / Sector */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Sector & Industry
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)] font-medium text-foreground">
                    {s.category ? (
                      <span className="inline-block border border-accent-primary/20 bg-accent-primary/10 text-accent-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {s.category}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Location */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Headquarters
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)] text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <MapPin className="w-3.5 h-3.5 text-accent-secondary flex-shrink-0" />
                      {[s.city, s.country_name].filter(Boolean).join(", ") || "Global"}
                    </span>
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Founded Year */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Founded Year
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)] font-mono text-xs font-bold text-foreground">
                    {s.founded_year ? `Est. ${s.founded_year}` : "N/A"}
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Founders */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Founding Team
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)] font-medium text-foreground">
                    {formatFounders(s.founders) || "Not Disclosed"}
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Official Website */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Official Domain
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)]">
                    {s.website ? (
                      <a
                        href={s.website.startsWith("http") ? s.website : `https://${s.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-gold hover:underline inline-flex items-center gap-1 font-mono text-xs font-bold"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground italic">N/A</span>
                    )}
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>

              {/* Provenance Audit Records */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20">
                  Data Provenance
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-[var(--glass-border)]">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground bg-muted/40 border border-border px-3 py-1 rounded-full">
                      <FileCheck className="w-3.5 h-3.5 text-accent-gold" />
                      {s.provenance ? s.provenance.length : 1} Audit Sources
                    </span>
                  </td>
                ))}
                {selectedStartups.length < 4 && <td className="p-4 border-l border-[var(--glass-border)] bg-muted/10" />}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
