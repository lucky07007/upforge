import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ReadingProgressBar } from "./ReadingProgressBar"
import { SocialShareRow } from "./SocialShareRow"
import { TableOfContents, HeadingItem } from "./TableOfContents"
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts"
import { Clock, Calendar, ChevronRight, Sparkles, ShieldCheck, ArrowRight, Mail } from "lucide-react"
import { FeaturedHeroImage } from "./featured-hero-image"

export interface AuthorInfo {
  name: string
  role: string
  avatarUrl: string
  bio: string
  profileUrl: string
}

export interface ArticleLayoutProps {
  post: {
    title: string
    slug: string
    category: string
    categorySlug: string
    excerpt: string
    date: string
    updated?: string
    readTime: string
    featured?: boolean
    keywords?: string
  }
  author?: AuthorInfo
  heroImage?: {
    src: string
    alt: string
  }
  headings?: HeadingItem[]
  topics?: string[]
  relatedSlugs?: string[]
  children: React.ReactNode
}

const DEFAULT_AUTHOR: AuthorInfo = {
  name: "Lucky Tiwari",
  role: "Founder & Editor-in-Chief",
  avatarUrl: "/lucky-tiwari.png",
  bio: "Lucky founded UpForge to build India's independent, data-driven startup registry. He tracks 650,000+ startups across 30+ sectors.",
  profileUrl: "/about",
}

export function ArticleLayout({
  post,
  author = DEFAULT_AUTHOR,
  heroImage,
  headings = [],
  topics = [],
  relatedSlugs = [],
  children,
}: ArticleLayoutProps) {

  // Lookup registered post in master data for single-source synchronization
  const registeredPost = BLOG_POSTS.find((p) => p.slug === post.slug)

  const resolvedAuthor: AuthorInfo = {
    name: author?.name && author.name !== DEFAULT_AUTHOR.name ? author.name : (registeredPost?.authorName || author?.name || DEFAULT_AUTHOR.name),
    role: author?.role && author.role !== DEFAULT_AUTHOR.role ? author.role : (registeredPost?.authorTitle || author?.role || DEFAULT_AUTHOR.role),
    avatarUrl: author?.avatarUrl && author.avatarUrl !== DEFAULT_AUTHOR.avatarUrl ? author.avatarUrl : (registeredPost?.authorImageUrl || author?.avatarUrl || DEFAULT_AUTHOR.avatarUrl),
    bio: author?.bio || DEFAULT_AUTHOR.bio,
    profileUrl: author?.profileUrl || DEFAULT_AUTHOR.profileUrl,
  }

  // Resolve related articles
  let relatedPosts: BlogPost[] = []
  if (relatedSlugs.length > 0) {
    relatedPosts = BLOG_POSTS.filter(p => relatedSlugs.includes(p.slug))
  }
  if (relatedPosts.length < 3) {
    const fallback = BLOG_POSTS.filter(p => p.slug !== post.slug && p.categorySlug === post.categorySlug && !relatedPosts.some(r => r.slug === p.slug))
    relatedPosts = [...relatedPosts, ...fallback].slice(0, 3)
  }
  if (relatedPosts.length < 3) {
    const defaultFallback = BLOG_POSTS.filter(p => p.slug !== post.slug && !relatedPosts.some(r => r.slug === p.slug))
    relatedPosts = [...relatedPosts, ...defaultFallback].slice(0, 3)
  }

  // Generate fallback hero image path if not provided
  const bannerImageSrc = heroImage?.src || registeredPost?.coverImageUrl || registeredPost?.image || `/${post.slug}.jpg`
  const bannerImageAlt = heroImage?.alt || registeredPost?.coverImageAlt || post.title

  // JSON-LD Structured Data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: resolvedAuthor.name,
      url: `https://upforge.org${resolvedAuthor.profileUrl}`,
    },
    publisher: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://upforge.org",
      logo: {
        "@type": "ImageObject",
        url: "https://upforge.org/logo.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://upforge.org/blog/${post.slug}`,
    },
    articleSection: post.category,
    inLanguage: "en-US",
    keywords: post.keywords || `${post.category}, UpForge Journal, Startup Intelligence`,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://upforge.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: "https://upforge.org/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `https://upforge.org/blog?category=${post.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://upforge.org/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <ReadingProgressBar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20">
        
        {/* ARTICLE HEADER & HERO */}
        <header className="border-b border-border/60 bg-muted/20 pt-8 pb-12">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            
            {/* BREADCRUMBS */}
            <nav className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-6 flex-wrap">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-border" />
              <Link href="/blog" className="hover:text-foreground transition-colors">Journal</Link>
              <ChevronRight className="w-3 h-3 text-border" />
              <span className="text-amber-600 dark:text-amber-400 font-bold">{post.category}</span>
            </nav>

            {/* CATEGORY TAG */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                {post.category}
              </span>
            </div>

            {/* H1 TITLE */}
            <h1
              className="text-3xl md:text-5xl lg:text-[52px] font-bold leading-[1.08] mb-6 text-foreground tracking-tight max-w-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {post.title}
            </h1>

            {/* DEK / SUBTITLE */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-serif italic max-w-3xl mb-8">
              {post.excerpt}
            </p>

            {/* BYLINE / META ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/40 shrink-0 relative bg-muted">
                  <Image
                    src={resolvedAuthor.avatarUrl}
                    alt={resolvedAuthor.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{resolvedAuthor.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                      {resolvedAuthor.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      {post.updated ? `Updated ${post.updated}` : post.date}
                    </span>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {post.readTime} read
                    </span>
                  </div>
                </div>
              </div>

              {/* SOCIAL SHARE ROW */}
              <SocialShareRow title={post.title} slug={post.slug} />
            </div>

            {/* HERO FEATURED BANNER IMAGE */}
            <FeaturedHeroImage
              src={bannerImageSrc}
              alt={bannerImageAlt}
              priority={true}
              className="mt-8"
            />

          </div>
        </header>

        {/* MAIN BODY & SIDEBAR CONTAINER */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            
            {/* ARTICLE CONTENT COLUMN (~680-720px) */}
            <main className="w-full lg:max-w-[740px] shrink-0">
              
              {/* TABLE OF CONTENTS FOR MOBILE */}
              {headings.length > 0 && <TableOfContents headings={headings} variant="mobile" />}

              {/* ARTICLE BODY PROSE */}
              <article className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground prose-headings:scroll-mt-24
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border/60
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground/90 prose-p:text-base md:prose-p:text-lg
                prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:my-6 prose-li:my-2 prose-li:text-foreground/90
                prose-ol:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-500/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:shadow-xs"
              >
                {children}
              </article>

              {/* MID-ARTICLE NEWSLETTER CTA DISPATCH */}
              <div className="my-12 p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card shadow-md relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 block mb-2">
                      Weekly Executive Briefing
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                      Get raw startup data delivered every Sunday
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                      Join 2,200+ founders and VCs receiving verified funding rounds, unicorn valuation multiples, and tactical playbooks.
                    </p>
                  </div>
                  <Link
                    href="/newsletter"
                    className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 text-background hover:text-black px-6 py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                  >
                    Subscribe Free <Mail className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* TOPICS COVERED TAG CHIPS */}
              {topics.length > 0 && (
                <div className="my-10 pt-8 border-t border-border/60">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Topics & Sector Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?search=${encodeURIComponent(tag)}`}
                        className="px-3.5 py-1.5 rounded-xl bg-card border border-border/70 hover:border-amber-500/50 text-xs font-mono text-muted-foreground hover:text-amber-500 transition-all shadow-xs"
                      >
                        # {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* AUTHOR BIO CARD */}
              <div className="my-12 p-6 md:p-8 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/40 shrink-0 bg-muted relative">
                  <Image
                    src={resolvedAuthor.avatarUrl}
                    alt={resolvedAuthor.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground text-base md:text-lg">{resolvedAuthor.name}</h4>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Author
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{resolvedAuthor.role}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-serif italic">
                    {resolvedAuthor.bio}
                  </p>
                  <Link
                    href={resolvedAuthor.profileUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline mt-4 uppercase tracking-wider"
                  >
                    View Editorial Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </main>

            {/* DESKTOP STICKY TABLE OF CONTENTS SIDEBAR */}
            {headings.length > 0 && <TableOfContents headings={headings} variant="desktop" />}

          </div>

          {/* RELATED ARTICLES SECTION */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border/80">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-foreground">
                  Related Intelligence Reports
                </h2>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col justify-between p-6 rounded-2xl border border-border/70 hover:border-amber-500/60 bg-card/80 hover:bg-card shadow-sm hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {rel.category}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground uppercase">
                          {rel.readTime}
                        </span>
                      </div>

                      <h3
                        className="font-bold text-lg leading-snug mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {rel.title}
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 text-[10px] font-mono text-muted-foreground">
                      <span>{rel.updated ? `Updated ${rel.updated}` : rel.date}</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* GET VERIFIED CTA FOOTER BANNER */}
          <div className="mt-16 border border-border/80 rounded-3xl p-8 md:p-10 text-center bg-card/60 shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                UFRN Credential System
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3 text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Get your startup listed in the UpForge registry
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              Join 2,200+ verified startups. Receive your official UFRN credential and permanent public registry record.
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
