"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search, X, BadgeCheck, FileText, Calculator, Globe, Sparkles, Building2 } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: string;
  questions: FAQItem[];
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, BadgeCheck, FileText, Calculator, Globe, Sparkles,
};

// ─── Single Accordion Item ────────────────────────────────────────────────────

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  highlight,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  highlight?: string;
}) {
  // Highlight matching text
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-[#E8C547]/40 text-[#1C1C1C] rounded-none px-0.5">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={`border-b border-[#E8E4DC] last:border-0 ${isOpen ? "bg-white" : "hover:bg-white/60"} transition-colors`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 px-3 -mx-3 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span
            className="text-[10px] text-[#CCC] w-5 flex-shrink-0 mt-0.5 num-font font-bold"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className={`text-sm font-semibold leading-snug transition-colors ${isOpen ? "text-[#1C1C1C]" : "text-[#333] group-hover:text-[#1C1C1C]"}`}
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {highlight ? highlightText(item.q, highlight) : item.q}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#1C1C1C]" : "text-[#CCC] group-hover:text-[#888]"}`}
        />
      </button>

      {/* Answer — CSS height transition */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.22s ease",
        }}
      >
        <div className="overflow-hidden">
          <div className="pl-8 pr-3 pb-5">
            <p
              className="text-[12.5px] text-[#555] leading-relaxed"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {highlight ? highlightText(item.a, highlight) : item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

export function FAQClient({ categories }: { categories: FAQCategory[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItems((p) => ({ ...p, [key]: !p[key] }));
  };

  // Filter logic
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return categories
      .filter((cat) => !activeCategory || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        questions: q
          ? cat.questions.filter(
              (item) =>
                item.q.toLowerCase().includes(q) ||
                item.a.toLowerCase().includes(q)
            )
          : cat.questions,
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [categories, searchQuery, activeCategory]);

  const totalFiltered = filteredCategories.reduce((a, c) => a + c.questions.length, 0);

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    filteredCategories.forEach((cat) => {
      cat.questions.forEach((_, i) => {
        all[`${cat.id}-${i}`] = true;
      });
    });
    setOpenItems(all);
  };

  const collapseAll = () => setOpenItems({});

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ── Search ── */}
      <div className="mb-6 border-b border-[#D5D0C8] pb-6">
        <div className="flex gap-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BBB]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all questions…"
              className="w-full border border-[#D5D0C8] border-r-0 bg-white pl-9 pr-4 py-2.5 text-sm text-[#1C1C1C] placeholder-[#BBB] focus:outline-none focus:border-[#1C1C1C] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BBB] hover:text-[#555]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 border border-[#D5D0C8] bg-[#F7F5F0] px-4 py-2.5 text-[10px] text-[#888] font-semibold uppercase tracking-wider whitespace-nowrap">
            {totalFiltered} result{totalFiltered !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 border transition-colors ${
              !activeCategory
                ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                : "border-[#D5D0C8] bg-white text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 border transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                    : "border-[#D5D0C8] bg-white text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Expand/Collapse */}
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={expandAll}
            className="text-[10px] text-[#AAA] hover:text-[#1C1C1C] transition-colors underline underline-offset-2"
          >
            Expand all
          </button>
          <span className="text-[#DDD]">·</span>
          <button
            onClick={collapseAll}
            className="text-[10px] text-[#AAA] hover:text-[#1C1C1C] transition-colors underline underline-offset-2"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* ── No results ── */}
      {filteredCategories.length === 0 && (
        <div className="py-16 text-center border border-[#D5D0C8] bg-white">
          <Search className="w-6 h-6 text-[#CCC] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#555]" style={{ fontFamily: "'Georgia', serif" }}>
            No questions match "{searchQuery}"
          </p>
          <p className="text-[11px] text-[#AAA] mt-1">
            Try a different term or{" "}
            <button onClick={() => setSearchQuery("")} className="underline hover:text-[#555]">
              clear the search
            </button>
          </p>
        </div>
      )}

      {/* ── FAQ Sections ── */}
      <div className="space-y-10">
        {filteredCategories.map((cat) => {
          const Icon = ICON_MAP[cat.icon];
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              {/* Section header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#1C1C1C]">
                {Icon && <Icon className="w-4 h-4 text-[#888]" />}
                <h2
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {cat.label}
                </h2>
                <span className="text-[9px] text-[#BBB] ml-auto">{cat.questions.length} questions</span>
              </div>

              {/* Questions */}
              <div>
                {cat.questions.map((item, i) => (
                  <AccordionItem
                    key={`${cat.id}-${i}`}
                    item={item}
                    index={i}
                    isOpen={!!openItems[`${cat.id}-${i}`]}
                    onToggle={() => toggle(`${cat.id}-${i}`)}
                    highlight={searchQuery}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Footer trust strip ── */}
      <div className="mt-12 pt-6 border-t border-[#D5D0C8] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {[
          "100% Free · No hidden fees",
          "Independent · No paid rankings",
          "Manual verification on every profile",
          "Permanently indexed by Google",
        ].map((text, i) => (
          <span key={i} className="text-[10px] text-[#AAA] flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#CCC]" />
            {text}
          </span>
        ))}
      </div>

    </div>
  );
}
