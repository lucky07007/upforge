import React from "react";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { StartupCompareMatrix } from "@/components/startup-compare-matrix";
import type { Startup } from "@/types/startup";
import { WebSiteJsonLd } from "@/components/json-ld";
import { fetchAllStartups } from "@/lib/google-sheets";

const BASE_URL = "https://upforge.org";

interface PageProps {
  searchParams: Promise<{
    slugs?: string;
  }>;
}

function loadStaticStartups(): Startup[] {
  try {
    const jsonPath = path.join(process.cwd(), "public", "data", "startups.json");
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    }
  } catch (err) {
    console.error("Error reading startups.json for comparison:", err);
  }
  return [];
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const slugs = sp?.slugs ? sp.slugs.split(",").filter(Boolean) : [];

  const title = slugs.length > 0
    ? `Startup Comparison Matrix (${slugs.join(" vs ")}) | UpForge`
    : `Startup Comparison Engine — Side-by-Side Verification Matrix | UpForge`;

  return {
    title,
    description: `Compare verified global startups side-by-side. Analyze UFRN credentials, trust scores, sector taxonomy, location, and provenance records on UpForge.`,
    alternates: {
      canonical: `${BASE_URL}/compare`,
    },
    openGraph: {
      title,
      description: `Compare verified global startups side-by-side. Analyze UFRN credentials, trust scores, and provenance records.`,
      url: `${BASE_URL}/compare`,
      siteName: "UpForge",
    },
  };
}

export default async function ComparePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const initialSlugs = sp?.slugs ? sp.slugs.split(",").map(s => s.trim()).filter(Boolean) : [];
  let allStartups = loadStaticStartups();
  if (allStartups.length === 0) {
    allStartups = await fetchAllStartups();
  }

  return (
    <>
      <Navbar />
      <WebSiteJsonLd />

      {/* MASTHEAD */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-6 text-center flex flex-col items-center">
        <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
              INDEPENDENT COMPARISON MATRIX
            </span>
          </div>

          <h1
            className="text-3xl md:text-[46px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Startup <span className="text-amber-500">Comparison</span> Engine
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-serif italic leading-relaxed">
            Side-by-side analysis of verified entity profiles, UFRN credentials, trust scores, and audit provenance records.
          </p>
        </div>
      </section>

      {/* MATRIX */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <StartupCompareMatrix
          initialSlugs={initialSlugs}
          allStartups={allStartups}
        />
      </div>
    </>
  );
}
