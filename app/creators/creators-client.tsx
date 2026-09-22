// app/creators/creators-client.tsx
"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import {
  ChevronDown,
  X,
  Search,
  MessageCircle,
  Filter,
  Users,
  SortAsc,
  Loader2,
  RefreshCw,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Rocket,
  Building2,
  Sparkles,
  Mail,
  UserCheck,
  LifeBuoy,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { CreatorCardDesktop } from "@/components/creators/creator-card-desktop"
import { CreatorCardMobile } from "@/components/creators/creator-card-mobile"
import { ApplyModal } from "@/components/creators/apply-modal"
import { StartupCampaignModal } from "@/components/creators/startup-campaign-modal"
import { CreatorProfileModal } from "@/components/creators/creator-profile-modal"
import {
  fetchCreatorsFromSheet,
  SheetCreator,
  getFollowerBucket,
} from "@/lib/sheets"
import { CREATOR_NETWORK_CONFIG } from "@/config/creator-network"
import { SITE_STATS } from "@/lib/site-stats"

type SortKey = "recent" | "motivation" | "followers" | "alpha"
type FollowerFilter = "all" | "under1k" | "1k-10k" | "10k-100k" | "100k+"

interface CreatorsClientProps {
  initialCreators?: SheetCreator[]
}

const faqItems = [
  {
    q: "How does startup content distribution work on UpForge?",
    a: "Startups submit a campaign brief for product launches, hiring pushes, or feature announcements. UpForge matches the brief with verified creators who produce authentic video content. Pricing & payouts are custom per campaign tier."
  },
  {
    q: "How can creators apply to join the network?",
    a: "Creators click 'Apply as a Creator' and submit their Instagram handle and primary content niche. Our desk reviews handle authenticity within 24–48 hours."
  },
  {
    q: "Is there any listing fee for creators?",
    a: "No. Handle verification and listing in the UpForge Verified Creator Directory are 100% free."
  },
  {
    q: "What is the creator payout rate and campaign pricing model?",
    a: `Brand distribution averages ~₹3K–₹5K per 1 Million organic reach. Payouts are settled weekly upon reaching the minimum threshold of ₹${CREATOR_NETWORK_CONFIG.payoutMinimumThresholdINR}.`
  },
  {
    q: "Which official emails can we reach out to?",
    a: "For campaign briefs contact team@upforge.org, for founder executive desk contact founder@upforge.org, and for registry verification support contact support@upforge.org."
  }
]

export function CreatorsClient({ initialCreators = [] }: CreatorsClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)
  const [creators, setCreators] = useState<SheetCreator[]>(initialCreators)
  const [selectedCreator, setSelectedCreator] = useState<SheetCreator | null>(null)
  const [isLoading, setIsLoading] = useState(initialCreators.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(16)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const [suggestions, setSuggestions] = useState<SheetCreator[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [selectedNiche, setSelectedNiche] = useState("all")
  const [followerFilter, setFollowerFilter] = useState<FollowerFilter>("all")
  const [sortBy, setSortBy] = useState<SortKey>("recent")

  // Dynamic live count
  const liveCreatorCount = creators.length || initialCreators.length || SITE_STATS.verifiedCreatorsCount

  const loadCreators = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCreatorsFromSheet()
      setCreators(data)
    } catch {
      setError("Could not load creator index. Please refresh.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (creators.length === 0) {
      loadCreators()
    }
  }, [loadCreators, creators.length])

  const handleOpenProfile = useCallback((creator: SheetCreator) => {
    setSelectedCreator(creator)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("creator", creator.instagramHandle)
      window.history.replaceState(null, "", url.toString())
    }
  }, [])

  const handleCloseProfile = useCallback(() => {
    setSelectedCreator(null)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.delete("creator")
      window.history.replaceState(null, "", url.pathname)
    }
  }, [])

  useEffect(() => {
    if (creators.length > 0 && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const creatorHandle = params.get("creator")
      if (creatorHandle) {
        const found = creators.find(
          (c) => c.instagramHandle.toLowerCase() === creatorHandle.toLowerCase()
        )
        if (found) {
          setSelectedCreator(found)
        }
      }
    }
  }, [creators])

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setVisibleCount(mobile ? 10 : 16)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim().length < 1) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    const q = value.toLowerCase()
    const matched = creators
      .filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.instagramHandle.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q)
      )
      .slice(0, 5)
    setSuggestions(matched)
    setShowSuggestions(matched.length > 0)
  }

  const handleSelectSuggestion = (creator: SheetCreator) => {
    setSearchQuery(creator.fullName)
    setSuggestions([])
    setShowSuggestions(false)
    handleOpenProfile(creator)
  }

  const niches = useMemo(() => {
    const set = new Set(creators.map((c) => c.niche).filter(Boolean))
    return ["all", ...Array.from(set).sort()]
  }, [creators])

  const filteredCreators = useMemo(() => {
    let list = [...creators]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.instagramHandle.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q)
      )
    }

    if (selectedNiche !== "all") {
      list = list.filter((c) => c.niche === selectedNiche)
    }

    if (followerFilter !== "all") {
      list = list.filter((c) => getFollowerBucket(c.followerCount) === followerFilter)
    }

    switch (sortBy) {
      case "recent":
        list = [...list].sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
        break
      case "motivation":
        list = [...list].sort((a, b) => b.motivationScore - a.motivationScore)
        break
      case "followers":
        list = [...list].sort((a, b) => b.followerCount - a.followerCount)
        break
      case "alpha":
        list = [...list].sort((a, b) => a.fullName.localeCompare(b.fullName))
        break
    }

    return list
  }, [creators, searchQuery, selectedNiche, followerFilter, sortBy])

  const displayedCreators = filteredCreators.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCreators.length

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-12 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">

            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                INDEPENDENT STARTUP INTELLIGENCE
              </span>
            </div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight mb-4 max-w-4xl mx-auto leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              UpForge Creator Network
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 font-serif"
            >
              Distribution for startups, backed by India&apos;s startup registry. Promote product launches, hiring pushes, and feature updates through verified creators.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center justify-center gap-3 flex-wrap mb-10"
            >
              <button
                onClick={() => setIsCampaignModalOpen(true)}
                className="px-7 py-3 text-xs font-bold uppercase tracking-wider bg-foreground text-background hover:bg-amber-500 hover:text-black rounded-full transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <Rocket className="w-4 h-4 text-amber-500" />
                <span>Campaign Inquiry</span>
              </button>

              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-7 py-3 text-xs font-bold uppercase tracking-wider border border-border/80 bg-card hover:bg-accent text-foreground rounded-full transition-all shadow-sm active:scale-95 flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-emerald-500" />
                <span>Apply as a Creator</span>
              </button>

              <a
                href={CREATOR_NETWORK_CONFIG.distribution.contactWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full transition"
              >
                <MessageCircle className="w-4 h-4 inline mr-1.5" />
                WhatsApp Desk
              </a>
            </motion.div>

            {/* Clean Focused Stats Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left w-full">
              <div className="p-4 rounded-2xl border border-border/70 bg-card/80 shadow-xs">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">Active Creators</p>
                <p className="text-xl font-bold font-mono text-foreground">{liveCreatorCount}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Verified handles</p>
              </div>

              <div className="p-4 rounded-2xl border border-border/70 bg-card/80 shadow-xs">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">Registry Scale</p>
                <p className="text-xl font-bold font-mono text-foreground">{SITE_STATS.verifiedStartupsCount}+</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Listed startups</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DUAL OVERVIEW: STARTUPS & CREATORS */}
      <section className="py-12 border-y border-border/60 bg-muted/20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Startups Card */}
            <div className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card/90 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                  <Rocket className="w-3.5 h-3.5 text-amber-500" />
                  For Startups & Brands
                </div>
                
                <h2 className="text-2xl font-bold text-foreground font-serif">
                  Distribute Your Product Launches
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Amplify product debuts, engineering hiring pushes, or feature announcements across a network of <strong className="text-foreground">{liveCreatorCount} verified creators</strong>. Brand distribution pricing averages ~₹3K–₹5K per 1M organic reach.
                </p>

                {/* Strategic Brand Email 1: founder@upforge.org */}
                <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Executive Founder Desk:</span>
                  <a href="mailto:founder@upforge.org" className="font-mono font-bold text-foreground hover:underline">
                    founder@upforge.org
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border/60">
                <button
                  onClick={() => setIsCampaignModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-bold hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Submit Campaign Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-muted-foreground">Contact for Quote</span>
              </div>
            </div>

            {/* Creators Card */}
            <div className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card/90 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  For Content Creators
                </div>

                <h2 className="text-2xl font-bold text-foreground font-serif">
                  Earn View-Based Payouts
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Get listed in UpForge&apos;s verified creator directory for free. Receive campaign briefs for curated tech products and founder stories. Earn <strong className="text-emerald-600 dark:text-emerald-400">performance payouts (~₹3K–₹5K per 1M Reach)</strong> with weekly settlements.
                </p>

                {/* Strategic Brand Email 2: team@upforge.org */}
                <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Creator Briefs Desk:</span>
                  <a href="mailto:team@upforge.org" className="font-mono font-bold text-foreground hover:underline">
                    team@upforge.org
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border/60">
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-5 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Apply for Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-muted-foreground">100% Free Listing</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS (CLEAN 3-STEP PROCESS) */}
      <section className="py-14 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent-gold)] mb-2">
              Process
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
              <div className="w-8 h-8 rounded-full bg-foreground text-background font-bold text-xs flex items-center justify-center font-mono">
                1
              </div>
              <h3 className="text-base font-bold text-foreground pt-1">Submit Brief or Apply</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Founders submit product launch details; creators apply with their handle and content niche.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
              <div className="w-8 h-8 rounded-full bg-foreground text-background font-bold text-xs flex items-center justify-center font-mono">
                2
              </div>
              <h3 className="text-base font-bold text-foreground pt-1">Audit & Creator Match</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                UpForge desk verifies handle authenticity and matches campaigns with relevant creators.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
              <div className="w-8 h-8 rounded-full bg-foreground text-background font-bold text-xs flex items-center justify-center font-mono">
                3
              </div>
              <h3 className="text-base font-bold text-foreground pt-1">Distribution & Payouts</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Creators post organic video reels. Payouts (~₹3K–₹5K per 1M reach) are settled weekly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED CREATOR DIRECTORY GRID */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent border border-border text-foreground text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Live Directory
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Verified Creator Index
            </h2>
          </div>

          <button
            onClick={loadCreators}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-border rounded-full bg-card hover:bg-accent transition text-foreground w-fit shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-500" : ""}`} />
            <span>Refresh Index</span>
          </button>
        </div>

        {/* Toolbar & Search */}
        <div className="py-3 border-b border-border space-y-3 mb-6">
          <div ref={searchRef} className="relative max-w-xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by name, handle, or category..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-border rounded-full text-xs bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/50 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setSuggestions([]); setShowSuggestions(false); inputRef.current?.focus() }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-accent rounded-full transition"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                {suggestions.map((creator) => (
                  <button
                    key={creator.id}
                    onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(creator) }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent transition border-b border-border/50 last:border-0"
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-muted">
                      {creator.profilePicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={creator.profilePicture}
                          alt={creator.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground text-[9px] font-bold">
                          {creator.fullName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-foreground">{creator.fullName}</p>
                      <p className="text-[10px] text-muted-foreground truncate">@{creator.instagramHandle}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-between pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-border rounded-full bg-card hover:bg-accent transition text-foreground"
              >
                <Filter className="w-3 h-3" />
                Filter Niches
              </button>

              <div className="flex items-center gap-1 ml-1">
                <SortAsc className="w-3.5 h-3.5 text-muted-foreground" />
                {(["recent", "followers", "alpha"] as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full border transition ${
                      sortBy === key
                        ? "bg-foreground text-background border-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {key === "recent" ? "Recent" : key === "followers" ? "Followers" : "A–Z"}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-muted-foreground font-mono">
              {filteredCreators.length} Creators
            </span>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-accent/40 rounded-2xl space-y-3 border border-border mt-2">
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {niches.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => setSelectedNiche(niche)}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition ${
                            selectedNiche === niche
                              ? "bg-foreground text-background border-foreground font-bold"
                              : "border-border bg-card text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {niche === "all" ? "All Niches" : niche}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Loading creator index...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <p className="text-xs text-red-500">{error}</p>
            <button
              onClick={loadCreators}
              className="px-4 py-2 text-xs border border-border rounded-full hover:bg-accent font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Mobile Grid */}
        {!isLoading && !error && isMobile && (
          <div className="grid grid-cols-2 gap-3 py-2">
            {displayedCreators.map((creator) => (
              <CreatorCardMobile
                key={creator.id}
                creator={creator}
                onViewProfile={handleOpenProfile}
              />
            ))}
          </div>
        )}

        {/* Desktop Grid */}
        {!isLoading && !error && !isMobile && (
          <div className="grid grid-cols-4 gap-4 py-4">
            {displayedCreators.map((creator) => (
              <CreatorCardDesktop
                key={creator.id}
                creator={creator}
                onViewProfile={handleOpenProfile}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && hasMore && (
          <div className="text-center py-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-7 py-3 text-xs font-bold border border-border bg-card hover:bg-accent text-foreground rounded-full transition shadow-sm"
            >
              Load More Creators
            </button>
          </div>
        )}
      </section>

      {/* FAQ SECTION */}
      <section className="py-14 border-t border-border bg-card/30">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent border border-border text-foreground text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> FAQ
            </div>
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5 mb-8">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-foreground flex items-center justify-between gap-4 hover:bg-accent/50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-muted-foreground leading-relaxed border-t border-border bg-accent/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Strategic Brand Email 3: support@upforge.org in Trust Footer Box */}
          <div className="p-5 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
            <div className="flex items-center gap-3">
              <LifeBuoy className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-foreground">Registry Verification Support</p>
                <p className="text-[11px] text-muted-foreground">Profile updates & general assistance desk</p>
              </div>
            </div>
            <a
              href="mailto:support@upforge.org"
              className="px-4 py-2 rounded-full border border-border bg-accent hover:bg-border text-foreground font-mono text-xs font-bold transition"
            >
              support@upforge.org
            </a>
          </div>

        </div>
      </section>

      {/* MODALS */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        formUrl={CREATOR_NETWORK_CONFIG.creatorApplicationUrl}
      />

      <StartupCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />

      <CreatorProfileModal
        creator={selectedCreator}
        isOpen={selectedCreator !== null}
        onClose={handleCloseProfile}
      />
    </div>
  )
}
