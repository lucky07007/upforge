import { SITE_STATS } from "@/lib/site-stats"

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-muted/20">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-center md:justify-between gap-4 text-center md:text-left">
        
        <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
          <span>{SITE_STATS.countriesText} Countries</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>{SITE_STATS.verifiedStartupsCount.toLocaleString()}+ Verified Startups</span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="text-foreground font-medium">100% Free Listing</span>
        </div>

        <p className="hidden md:block text-[11px] text-muted-foreground/70">
          Boost your startup visibility worldwide — no charges, no catches
        </p>

      </div>
    </div>
  )
}
