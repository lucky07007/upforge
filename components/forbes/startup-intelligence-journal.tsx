// Replace the old ForbesBlogs with startup-focused content
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const startupArticles = [
  {
    title: "Q1 2026 Global Startup Funding Trends: AI & Climate Tech Lead",
    excerpt: "Analysis of $89B in venture funding across 3,200 deals. Sector breakdown and regional hotspots.",
    category: "Market Intelligence",
    date: "Apr 28, 2026",
    slug: "q1-2026-funding-trends"
  },
  {
    title: "How UFRN Verification Accelerated 120 Series A Rounds",
    excerpt: "Data shows verified startups close rounds 40% faster. Case studies from 12 countries.",
    category: "Verification Impact",
    date: "Apr 26, 2026",
    slug: "ufrn-impact-series-a"
  },
  {
    title: "Emerging Startup Hubs: Beyond Silicon Valley in 2026",
    excerpt: "Bengaluru, Lagos, São Paulo emerge as top ecosystems. What founders need to know.",
    category: "Ecosystem Analysis",
    date: "Apr 24, 2026",
    slug: "emerging-hubs-2026"
  }
]

export function StartupIntelligenceJournal() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-foreground">
        <h2 className="font-sans font-black text-[13px] uppercase tracking-widest text-foreground">
          Startup Intelligence Journal
        </h2>
        <Link
          href="/intelligence"
          className="font-sans font-bold text-[9px] uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
        >
          All Reports <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {startupArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/intelligence/${article.slug}`}
            className="group border border-border p-6 hover:border-[#C59A2E] transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C59A2E]">
                {article.category}
              </span>
              <span className="text-[10px] text-muted-foreground">{article.date}</span>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-[#C59A2E] transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
