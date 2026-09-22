import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { INTELLIGENCE_REPORTS } from "@/lib/intelligenceData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Build-Time Static Generation (0ms Serverless CPU Load)
export async function generateStaticParams() {
  return Object.keys(INTELLIGENCE_REPORTS).map((slug) => ({
    slug: slug
  }));
}

// 2. Comprehensive Dynamic Metadata for Google SEO & AEO (Perplexity/ChatGPT)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = INTELLIGENCE_REPORTS[slug];

  if (!report) {
    return {
      title: "Report Not Found | UpForge Intelligence",
      description: "The requested intelligence briefing is not available."
    };
  }

  const pageUrl = `https://upforge.org/intelligence/${report.slug}`;
  const publishedDate = new Date(report.date);
  const publishedIso = Number.isNaN(publishedDate.getTime()) ? undefined : publishedDate.toISOString();

  return {
    title: `${report.title} | UpForge Intelligence`,
    description: report.subtitle,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: report.title,
      description: report.subtitle,
      url: pageUrl,
      siteName: "UpForge Intelligence",
      type: "article",
      publishedTime: publishedIso,
      authors: [report.author.name],
      images: [
        {
          url: "https://images.upforge.org/logo.jpg",
          width: 800,
          height: 800,
          alt: report.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: report.title,
      description: report.subtitle,
      images: ["https://images.upforge.org/logo.jpg"]
    }
  };
}

export default async function IntelligenceReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = INTELLIGENCE_REPORTS[slug];

  if (!report) {
    notFound();
  }

  // Structured JSON-LD Data for Search Engines and LLM Answer Engines (AEO)
  const publishedDate = new Date(report.date);
  const publishedIso = Number.isNaN(publishedDate.getTime()) ? undefined : publishedDate.toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": report.title,
    "description": report.subtitle,
    "datePublished": publishedIso,
    "dateModified": publishedIso,
    "author": {
      "@type": "Organization",
      "name": report.author.name,
      "url": "https://upforge.org"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UpForge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.upforge.org/logo.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://upforge.org/intelligence/${report.slug}`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.org" },
        { "@type": "ListItem", "position": 2, "name": "Startup Intelligence", "item": "https://upforge.org/startup-intelligence" },
        { "@type": "ListItem", "position": 3, "name": report.title, "item": `https://upforge.org/intelligence/${report.slug}` }
      ]
    }
  };

  return (
    <article className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0D14] text-slate-900 dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-200">
      {/* Search Engine Structured Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Header Breadcrumbs */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#111622]/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              UpForge
            </Link>
            <span>/</span>
            <span className="text-slate-400">Intelligence</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
              {report.tag}
            </span>
          </div>
          <Link
            href="/quiz"
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm"
          >
            Take Startup IQ Quiz →
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category & Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            {report.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {report.date} • {report.readTime}
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
          {report.title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {report.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <img
              src={report.author.avatar}
              alt={report.author.name}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
              loading="lazy"
            />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {report.author.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {report.author.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Verified Briefing</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* Executive Summary Callout Box (AEO & AI Search Snippet Target) */}
        <section aria-label="Executive Summary" className="bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-5 sm:p-6 rounded-r-2xl mb-10">
          <h2 className="text-xs font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1.5">
            Executive Summary
          </h2>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {report.summary}
          </p>
        </section>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {report.keyStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                {stat.label}
              </span>
              <p className="text-2xl font-black text-slate-950 dark:text-white">
                {stat.value}
              </p>
              {stat.change && (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">
                  {stat.change}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Quick Table of Contents Navigation */}
        <nav aria-label="Table of Contents" className="bg-slate-100/70 dark:bg-[#161D2E] p-5 rounded-xl border border-slate-200 dark:border-slate-800 mb-12">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Contents in this Briefing
          </h2>
          <ul className="space-y-1.5 text-xs">
            {report.toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Deep Dive Content Blocks */}
        <div className="space-y-12 leading-relaxed text-slate-700 dark:text-slate-300 text-base">
          {report.content.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-4">
                {section.heading}
              </h2>

              <div className="space-y-4">
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Callout Quote */}
              {section.highlight && (
                <blockquote className="my-6 pl-4 border-l-2 border-amber-500 italic text-slate-800 dark:text-slate-200 font-serif text-lg">
                  "{section.highlight}"
                </blockquote>
              )}

              {/* Comparative Data Table */}
              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold uppercase text-[11px] tracking-wider">
                      <tr>
                        {section.table.headers.map((h, hi) => (
                          <th key={hi} className="py-3 px-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#111622]">
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          {row.map((cell, ci) => (
                            <td key={ci} className={`py-3 px-4 ${ci === 0 ? "font-bold text-slate-900 dark:text-white" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* UpForge Bottom Assessment CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-tr from-amber-500/10 via-slate-100 to-white dark:from-amber-950/20 dark:via-[#111622] dark:to-[#161D2E] border border-amber-500/30 text-center">
          <span className="text-xs uppercase font-extrabold text-amber-600 dark:text-amber-400 tracking-wider mb-2 block">
            Measure Your Readiness
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-2">
            Are You Ready for the 2026 Funding Climate?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
            Take the UpForge Startup IQ Challenge to test your intuition on CAC, runway calculations, and unit metrics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quiz"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.98]"
            >
              Start Free Startup IQ Assessment →
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs"
            >
              Explore UpForge Directory
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
