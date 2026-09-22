import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { fetchAllStartups } from "@/lib/google-sheets"
import { Search, ArrowRight, Home, Globe, Building2, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "404 — Page Not Found | UpForge",
  description: "The page you requested could not be located. Explore verified startup profiles on the UpForge Global Registry.",
  robots: { index: false, follow: true },
}

export default async function NotFound() {
  let recommendedStartups: any[] = []
  
  try {
    const all = await fetchAllStartups()
    const approved = all.filter((s) => s.status === "approved")
    // Pick 4 featured or recent startups
    recommendedStartups = approved.slice(0, 4)
  } catch (err) {
    console.error("[404 Page] Error fetching recommendations:", err)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-serif pt-16">
        <main className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-16 w-full flex-1 flex flex-col justify-center">
          
          {/* TOP 404 BADGE WITH SUBTLE ANIMATION */}
          <div className="text-center mb-10">
            <div className="inline-block relative mb-4">
              <span className="font-mono text-6xl sm:text-7xl font-black tracking-widest text-[#C59A2E]/20 animate-pulse">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans font-bold text-xs uppercase tracking-[0.3em] px-3 py-1 bg-background border border-[#C59A2E] text-[#C59A2E]">
                  Record Not Found
                </span>
              </div>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              We can't find this page.
            </h1>
            
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed font-serif italic">
              The page or registry entry you requested could not be located. It may have been moved, renamed, or is currently undergoing editorial review.
            </p>
          </div>

          {/* SEARCH BOX FOR INSTANT REGISTRY SEARCH */}
          <div className="max-w-xl mx-auto w-full mb-12">
            <form action="/registry" method="GET" className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search the global startup registry..."
                  className="w-full pl-10 pr-4 py-3 bg-muted/40 border border-border text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-foreground hover:bg-[#C59A2E] text-background font-mono text-xs uppercase tracking-widest font-bold transition-colors whitespace-nowrap"
              >
                Search Index
              </button>
            </form>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground hover:bg-[#C59A2E] text-background font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Back to Homepage
            </Link>
            <Link
              href="/registry"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground hover:border-[#C59A2E] hover:text-[#C59A2E] font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Browse Startup Index
            </Link>
          </div>

          {/* DYNAMIC REGISTRY RECOMMENDATIONS */}
          {recommendedStartups.length > 0 && (
            <div className="border-t border-border pt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-muted-foreground">
                  You Might Be Interested In
                </h3>
                <Link href="/registry" className="font-mono text-[10px] uppercase tracking-wider text-[#C59A2E] hover:underline flex items-center gap-1">
                  View All Listings <ArrowRight size={10} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedStartups.map((startup, i) => (
                  <Link
                    key={i}
                    href={`/startup/${startup.slug}`}
                    className="group border border-border p-4 bg-card hover:border-foreground transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase text-[#C59A2E] mb-2">
                        <Tag className="w-3 h-3" />
                        <span>{startup.category || "Technology"}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-foreground group-hover:text-[#C59A2E] transition-colors truncate">
                        {startup.name}
                      </h4>
                      <p className="font-serif text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {startup.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>{startup.city || "Global"}</span>
                      <span className="group-hover:text-foreground">View Profile →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  )
}
