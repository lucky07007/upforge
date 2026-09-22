import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { 
  getAllCategories, 
  getFoundersByCategory
} from "@/lib/founders/data"
import { JsonLd } from "@/components/seo/json-ld"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(cat => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const categories = getAllCategories()
  const matchedCat = categories.find(c => c.slug === categorySlug)
  
  if (!matchedCat) {
    return {
      title: "Founder Stories Category | UpForge",
      description: "Explore verified founder stories and intelligence across global startup categories."
    }
  }

  const baseUrl = "https://upforge.org"
  const url = `${baseUrl}/founder-stories/category/${categorySlug}`
  const title = `${matchedCat.name} Founder Stories & Intelligence | UpForge`
  const description = `Explore ${matchedCat.count} verified founder profiles, leadership analysis, and startup data in ${matchedCat.name} on UpForge.`

  return {
    title,
    description,
    keywords: [
      `${matchedCat.name} founders`,
      `${matchedCat.name} startups 2026`,
      `${matchedCat.name} CEOs`,
      `verified ${matchedCat.name} profiles`,
      `UpForge ${matchedCat.name}`
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpForge",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const categories = getAllCategories()
  const currentCat = categories.find(c => c.slug === categorySlug)
  
  if (!currentCat) notFound()

  const founders = getFoundersByCategory(categorySlug)
  const baseUrl = "https://upforge.org"
  const pageUrl = `${baseUrl}/founder-stories/category/${categorySlug}`

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${currentCat.name} Founder Stories`,
    "description": `Verified founder profiles and editorial analysis for ${currentCat.name}.`,
    "url": pageUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": founders.length,
      "itemListElement": founders.map((f, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${baseUrl}/founder-stories/${f.slug}`,
        "name": `${f.name} — ${f.role} of ${f.company}`
      }))
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Founder Stories",
        "item": `${baseUrl}/founder-stories`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentCat.name,
        "item": pageUrl
      }
    ]
  }

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <div className="bg-background text-foreground min-h-screen selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-200">
        
        {/* Sub-Header / Breadcrumb - Hidden on mobile view */}
        <div className="hidden md:block border-b border-border bg-background/95 backdrop-blur-md sticky top-14 z-30">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between font-mono text-xs text-muted-foreground">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-xs">
              <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/founder-stories" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Founder Stories</Link>
              <span>/</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">{currentCat.name}</span>
            </nav>

            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:inline">
              CATEGORY HUB • {founders.length} PROFILES
            </span>
          </div>
        </div>

        <main className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 sm:py-10">
          {/* Header Banner */}
          <div className="mb-10 border-b border-border pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                CATEGORY HUB
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {founders.length} Verified Profile{founders.length === 1 ? '' : 's'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-3">
              {currentCat.name} Founder Stories
            </h1>

            <p className="font-serif text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Verified founder intelligence, executive leadership profiles, and operational breakdowns of top entrepreneurs in {currentCat.name}.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {founders.map((f) => (
              <Link
                key={f.id}
                href={`/founder-stories/${f.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <Image
                    src={f.cardImage || f.imageUrl}
                    alt={`${f.name}, ${f.role} of ${f.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/80 text-amber-300 border border-zinc-700">
                      {f.category || "FOUNDER"}
                    </span>
                    {f.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-black/80 px-2.5 py-1 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-serif font-black text-xl sm:text-2xl group-hover:text-amber-300 transition-colors">
                      {f.name}
                    </p>
                    <p className="font-mono text-xs text-amber-300 font-semibold mt-1">
                      {f.role} • {f.company}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="font-serif text-xs sm:text-sm text-foreground/90 leading-relaxed italic line-clamp-3">
                    "{f.oneLiner || f.deck}"
                  </p>

                  <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-xs text-muted-foreground">
                    <span>{f.city || "San Francisco"}</span>
                    <span className="text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      Read Story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Explore Other Categories Horizontal Pill Slider */}
          <section className="pt-8 border-t border-border">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-4">
              Explore All Categories
            </h2>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/founder-stories/category/${cat.slug}`}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all snap-start ${
                    cat.slug === categorySlug
                      ? "bg-amber-500 text-black font-bold shadow-sm"
                      : "bg-card border border-border text-foreground hover:border-amber-500/50 hover:text-amber-600"
                  }`}
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          </section>
        </main>

        <FounderNewsletter />
      </div>
    </>
  )
}
