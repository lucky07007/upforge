"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/data/blog-posts"
import { Search, Filter, ArrowRight, Clock, Sparkles, ShieldCheck, Mail, BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react"
import { SITE_STATS } from "@/lib/site-stats"

const ITEMS_PER_PAGE = 8

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.categorySlug === selectedCategory

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Featured post (first featured post or first item in filtered array)
  const featuredPost = useMemo(() => {
    if (selectedCategory === "all" && searchQuery === "") {
      return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0]
    }
    return null
  }, [selectedCategory, searchQuery])

  // Remaining posts for paginated grid
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    }
    return filteredPosts
  }, [filteredPosts, featuredPost])

  // Pagination calculation
  const totalPages = Math.ceil(gridPosts.length / ITEMS_PER_PAGE) || 1
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return gridPosts.slice(start, start + ITEMS_PER_PAGE)
  }, [gridPosts, currentPage])

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug)
    setCurrentPage(1)
  }

  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20">

        {/* HERO MASTHEAD BANNER */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 pt-8 pb-6">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                GLOBAL ECOSYSTEM RESEARCH
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4 text-foreground max-w-4xl tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Startup Intelligence Journal
            </h1>

            <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto mb-8 font-serif italic leading-relaxed">
              Data-driven analysis of global startup trends — venture capital movements, unicorn breakdowns, founder playbooks, and sector research.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground font-mono bg-muted/60 px-5 py-2.5 rounded-2xl border border-border/60 shadow-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400">{BLOG_POSTS.length} Intelligence Reports</span>
              <span className="text-border">|</span>
              <span>Updated Monthly</span>
              <span className="text-border">|</span>
              <span className="text-foreground font-semibold">100% Free Public Access</span>
            </div>
          </div>
        </section>

        {/* SEARCH & CATEGORY TOOLBAR */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-xs">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* CATEGORY FILTER PILLS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition-all rounded-xl border whitespace-nowrap cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-card text-muted-foreground border-border/70 hover:text-foreground hover:border-amber-500/50"
                }`}
              >
                All Reports ({BLOG_POSTS.length})
              </button>
              {BLOG_CATEGORIES.map((cat) => {
                const count = BLOG_POSTS.filter((p) => p.categorySlug === cat.slug).length
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition-all rounded-xl border whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.slug
                        ? "bg-foreground text-background border-foreground shadow-sm"
                        : "bg-card text-muted-foreground border-border/70 hover:text-foreground hover:border-amber-500/50"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                )
              })}
            </div>

            {/* LIVE SEARCH INPUT */}
            <div className="relative shrink-0 w-full md:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search journal..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-card border border-border/70 rounded-xl pl-10 pr-9 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* ACTIVE FILTER / SEARCH METADATA STRIP */}
          {(selectedCategory !== "all" || searchQuery !== "") && (
            <div className="bg-muted/40 border-t border-border/50 px-4 md:px-8 py-2">
              <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
                <span>
                  Showing {filteredPosts.length} results
                  {selectedCategory !== "all" && ` in "${BLOG_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}"`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 space-y-12">

          {/* FEATURED ARTICLE CARD (IF APPLICABLE) */}
          {featuredPost && (
            <section className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">
                  Featured Cover Story
                </span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group border border-border/80 hover:border-amber-500/60 bg-card/90 dark:bg-card/70 backdrop-blur-xl rounded-3xl transition-all duration-300 transform-gpu p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch justify-between relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-full" />

                <div className="flex-1 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                        {featuredPost.category}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> {featuredPost.readTime} read
                      </span>
                    </div>

                    <h2
                      className="text-2xl md:text-4xl font-bold leading-tight mb-4 text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {featuredPost.title}
                    </h2>

                    <p className="text-muted-foreground text-sm md:text-base mb-6 line-clamp-3 leading-relaxed font-serif italic">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border/50 text-xs text-muted-foreground font-mono">
                    <span>{featuredPost.updated ? `Updated ${featuredPost.updated}` : featuredPost.date}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Cover Story <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-[480px] aspect-[16/9] md:aspect-auto rounded-2xl overflow-hidden relative border border-border/60 bg-muted shrink-0">
                  <Image
                    src={featuredPost.coverImageUrl || featuredPost.image || `/${featuredPost.slug}.jpg`}
                    alt={featuredPost.coverImageAlt || featuredPost.title}
                    fill
                    priority={true}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </Link>
            </section>
          )}

          {/* MAGAZINE ARTICLES GRID */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">
                {selectedCategory === "all" ? "Latest Ecosystem Reports" : "Category Articles"}
              </span>
              <div className="flex-1 h-px bg-border/60" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase">
                Page {currentPage} of {totalPages} ({gridPosts.length} articles)
              </span>
            </div>

            {paginatedPosts.length === 0 ? (
              <div className="border border-dashed border-border/70 rounded-3xl p-16 text-center bg-muted/20">
                <p className="text-muted-foreground text-lg font-serif italic mb-3">No matching articles found.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider hover:underline"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group border border-border/80 hover:border-amber-500/60 bg-card/80 hover:bg-card backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          {post.category}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground uppercase flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500" /> {post.readTime}
                        </span>
                      </div>

                      <h2
                        className="text-xl font-bold leading-snug mb-3 text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {post.title}
                      </h2>

                      <p className="text-xs md:text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed font-serif">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                      <span>{post.updated ? `Updated ${post.updated}` : post.date}</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read Report <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-border/60 font-mono text-xs">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 text-foreground transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <span className="text-muted-foreground">
                  Page <strong className="text-foreground">{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 text-foreground transition-all cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>

          {/* WEEKLY DISPATCH NEWSLETTER */}
          <div className="border border-border/80 rounded-3xl bg-gradient-to-r from-amber-500/10 via-card to-card p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative z-10">
              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 block mb-2">
                  Weekly Dispatch
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground" style={{ fontFamily: "var(--font-serif)" }}>
                  Stay ahead of global startup moves
                </h2>
                <p className="text-muted-foreground text-sm max-w-lg leading-relaxed font-serif italic">
                  Join founders and VCs receiving verified funding rounds, unicorn breakdowns, and tactical playbooks every Sunday. Free forever.
                </p>
              </div>
              <Link
                href="/newsletter"
                className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 text-background hover:text-black px-7 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                Subscribe Free <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* GET VERIFIED CTA */}
          <div className="border border-border/70 rounded-3xl p-10 text-center bg-card/60 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                UFRN Credential System
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground" style={{ fontFamily: "var(--font-serif)" }}>
              Get your startup listed in the UpForge registry
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              Join {SITE_STATS.trackedStartupsText} verified startups. Receive your official UFRN credential and permanent public record.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 text-background hover:text-black px-8 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              List Your Startup Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
