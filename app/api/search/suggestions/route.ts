// app/api/search/suggestions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchAllStartups } from '@/lib/google-sheets';
import { formatFounders } from '@/types/startup';


const ALL_BLOG_POSTS = [
  { title: "India Startup Ecosystem 2026: State of the Nation", slug: "/blog/india-startup-ecosystem-2026", category: "Annual Report" },
  { title: "How to Get Startup Funding in India 2026", slug: "/blog/how-to-get-startup-funding-india-2026", category: "Funding Guide" },
  { title: "Top Indian Unicorns 2026: Ranked & Profiled", slug: "/blog/top-indian-unicorns-2026", category: "Unicorn Report" },
  { title: "25 Best Indian Startup Founders to Follow 2026", slug: "/blog/best-indian-startup-founders-to-follow-2026", category: "Founder Profiles" },
  { title: "IND vs NZ Final 2026: 7 Leadership Lessons", slug: "/blog/leadership-lessons-ind-vs-nz-final-2026", category: "Leadership" },
  { title: "5 Startup Ideas Inspired by IND vs NZ Final 2026", slug: "/blog/startup-ideas-inspired-by-ind-vs-nz-final-2026", category: "Startup Ideas" },
  { title: "Top AI Startups in India (2026 Updated List)", slug: "/blog/top-ai-startups-india-2026", category: "AI & Deep Tech" },
  { title: "How to Start a Startup in India (Step-by-Step 2026)", slug: "/blog/how-to-start-startup-india-2026", category: "Founder Playbook" },
  { title: "Top 10 Trending Global Startups 2026", slug: "/blog/top-trending-global-startups-2026", category: "Global Edition" },
  { title: "ChatGPT Plus vs Perplexity AI 2026", slug: "/blog/chatgpt-plus-vs-perplexity-ai-2026", category: "AI Comparison" },
  { title: "Best AI Tools for Business 2026", slug: "/blog/best-ai-tools-for-business-2026", category: "AI Guide" },
  { title: "Best Travel Card 2026: Revolut vs Wise vs Monzo", slug: "/blog/best-travel-card-2026-revolut-wise-compared", category: "FinTech Guide" },
  { title: "Best Language Learning Apps 2026", slug: "/blog/best-language-learning-apps-2026", category: "EdTech Guide" },
  { title: "Ramp vs Brex 2026: Which Corporate Card Wins?", slug: "/blog/ramp-vs-brex-corporate-card-comparison-2026", category: "FinTech Guide" },
  { title: "OpenAI vs Anthropic Claude Comparison 2026", slug: "/blog/openai-vs-anthropic-claude-comparison-2026", category: "AI Comparison" },
  { title: "Remove Background from Image Free — Best AI Tools 2026", slug: "/blog/remove-background-from-image-free-tools-2026", category: "AI Tools" },
  { title: "Compress PDF Free 2026: Smallpdf vs iLovePDF", slug: "/blog/compress-pdf-free-smallpdf-ilovepdf-compared", category: "Productivity" },
  { title: "Character.AI vs ChatGPT — Which Is Better in 2026?", slug: "/blog/character-ai-vs-chatgpt-which-is-better-2026", category: "AI Comparison" },
];

// Additional blog posts from the HERO/SECONDARY sections
const FEATURED_BLOG_POSTS = [
  { title: "India Startup Ecosystem 2026: The Complete State of the Nation Report", slug: "/blog/india-startup-ecosystem-2026", category: "Annual Report" },
  { title: "Top 10 Trending Global Startups of 2026", slug: "/blog/top-trending-global-startups-2026", category: "Global Edition" },
];

// Combine all blog posts for search
const ALL_COMBINED_BLOG_POSTS = [
  ...FEATURED_BLOG_POSTS,
  ...ALL_BLOG_POSTS.filter(
    (post, index, self) => self.findIndex(p => p.slug === post.slug) === index
  )
];


// ─────────────────────────────────────────────────────────────────────────────
// MAIN API ROUTE HANDLER
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  // Return empty array for queries under 2 characters
  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const searchTerm = query.toLowerCase().trim();

  try {
    // Fetch startup data from shared Google Sheets lib (cached)
    const startupData = await fetchAllStartups();
    
    // Build startup suggestions
    const startupSuggestions = startupData
      .filter(s => {
        const name = (s.name || '').toLowerCase();
        const category = (s.category || '').toLowerCase();
        const city = (s.city || '').toLowerCase();
        const country = (s.country_name || '').toLowerCase();
        const ufrn = (s.ufrn || '').toLowerCase();
        const founders = formatFounders(s.founders).toLowerCase();
        return (
          name.includes(searchTerm) ||
          category.includes(searchTerm) ||
          city.includes(searchTerm) ||
          country.includes(searchTerm) ||
          ufrn.includes(searchTerm) ||
          founders.includes(searchTerm)
        );
      })
      .slice(0, 6)
      .map(s => {
        const locationParts = [s.city, s.country_name].filter(Boolean).join(", ");
        const subtitle = locationParts
          ? `${s.category} · ${locationParts}`
          : s.category || "Startup";
        return {
          title: s.name,
          type: s.ufrn && s.ufrn !== "PENDING-VERIFICATION" ? "VERIFIED STARTUP" : "STARTUP",
          href: `/startup/${s.slug}`,
          subtitle,
        };
      });

    // Build blog suggestions
    const blogSuggestions = ALL_COMBINED_BLOG_POSTS
      .filter(post => {
        const title = post.title.toLowerCase();
        const category = post.category.toLowerCase();
        return title.includes(searchTerm) || category.includes(searchTerm);
      })
      .slice(0, 4) // Limit to 4 blog results
      .map(post => ({
        title: post.title,
        type: post.category.toUpperCase(),
        href: post.slug,
        subtitle: `The Forge · ${post.category}`,
      }));

    // Add quick links for common search terms
    const quickLinks: { title: string; type: string; href: string; subtitle: string }[] = [];
    
    const quickLinkMap: Record<string, { title: string; href: string; type: string }> = {
      'verify': { title: 'Verify UFRN', href: '/verify', type: 'TOOL' },
      'ufrn': { title: 'Verify UFRN', href: '/verify', type: 'TOOL' },
      'submit': { title: 'Submit Startup', href: '/submit', type: 'ACTION' },
      'registry': { title: 'Global Startup Registry', href: '/registry', type: 'PAGE' },
      'report': { title: 'Market Intelligence & Research', href: '/research', type: 'PAGE' },
      'valuation': { title: 'Market Intelligence & Research', href: '/research', type: 'PAGE' },
      'about': { title: 'About UpForge', href: '/about', type: 'PAGE' },
    };

    Object.entries(quickLinkMap).forEach(([term, link]) => {
      if (searchTerm.includes(term) && !quickLinks.some(q => q.href === link.href)) {
        quickLinks.push({
          title: link.title,
          type: link.type,
          href: link.href,
          subtitle: `UpForge ${link.type.toLowerCase()}`,
        });
      }
    });

    // Combine all suggestions
    const allSuggestions = [
      ...quickLinks.slice(0, 2),  // Quick links first (max 2)
      ...startupSuggestions,
      ...blogSuggestions,
    ].slice(0, 10); // Total max 10 suggestions

    // Return suggestions
    return NextResponse.json(allSuggestions);

  } catch (error) {
    console.error('Search suggestions error:', error);
    
    // Fallback: return blog suggestions only if Google Sheets fails
    try {
      const fallbackBlogSuggestions = ALL_COMBINED_BLOG_POSTS
        .filter(post => 
          post.title.toLowerCase().includes(searchTerm) || 
          post.category.toLowerCase().includes(searchTerm)
        )
        .slice(0, 6)
        .map(post => ({
          title: post.title,
          type: post.category.toUpperCase(),
          href: post.slug,
          subtitle: `The Forge · ${post.category}`,
        }));

      return NextResponse.json(fallbackBlogSuggestions);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch suggestions' },
        { status: 500 }
      );
    }
  }
}

// Optional: Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
