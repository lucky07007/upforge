//components/navbar.tsx

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Search,
  Sparkles,
  Sun,
  Moon,
  Loader2,
  Trophy,
} from "lucide-react";

import { useTheme } from "next-themes";
type NavLink = {
  name: string;
  href: string;
};

type Suggestion = {
  title: string;
  type: string;
  href: string;
  subtitle?: string;
};

const MORE_LINKS = {
  explore: [
    { name: "Global Startup Registry", href: "/global-startup-registry", desc: "Browse the global startup database" },
    { name: "Startup Intelligence", href: "/startup-intelligence", desc: "Research, reports and market analysis" },
    { name: "Compare Startups", href: "/compare", desc: "Side-by-side startup comparisons" },
    { name: "News Gallery", href: "/news-gallery", desc: "Press coverage & media moments" },
    { name: "About", href: "/about", desc: "About UpForge" },
  ],
  resources: [    
    { name: "Submit Startup", href: "/submit", desc: "Get your UFRN credential. Free." },
    { name: "Newsletter", href: "/newsletter", desc: "Weekly startup intelligence digest" },
    { name: "contact", href: "/contact", desc: "Contact the Registry" },
    { name: "faq", href: "/faq", desc: "Frequently Asked Questions" },
  ],
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Global leaderboard #1 is fetched from the real server-verified leaderboard.
  // A small local cache keeps the header populated instantly while the fresh
  // value refreshes silently in the background.
  const [leaderboardTop, setLeaderboardTop] = useState<{
    userName: string;
    percentage: number;
    quizTitle?: string;
  } | null>(null);
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const suggestionClickedRef = useRef(false);
  const navigationInProgressRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const cacheKey = "upforge:header:leaderboard-top";

    // Paint the last verified #1 immediately if this browser has seen it before.
    try {
      const raw = window.localStorage.getItem(cacheKey);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached?.userName) {
          setLeaderboardTop({
            userName: String(cached.userName).slice(0, 80),
            percentage: Number(cached.percentage) || 0,
            quizTitle: cached.quizTitle ? String(cached.quizTitle).slice(0, 120) : undefined,
          });
        }
      }
    } catch {}

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2500);

    const loadTop = async () => {
      try {
        const response = await fetch(
          "/api/quiz/leaderboard?scope=global&period=all-time&topOnly=1",
          {
            cache: "force-cache",
            signal: controller.signal,
            credentials: "same-origin",
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        const top = data?.top;

        if (!top?.userName) return;

        const next = {
          userName: String(top.userName).slice(0, 80),
          percentage: Number(top.percentage) || 0,
          quizTitle: top.quizTitle ? String(top.quizTitle).slice(0, 120) : undefined,
        };

        setLeaderboardTop(next);

        try {
          window.localStorage.setItem(
            cacheKey,
            JSON.stringify({ ...next, savedAt: Date.now() }),
          );
        } catch {}
      } catch {
        // Never block or surface a leaderboard network error in the global header.
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void loadTop();

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
    setSearchQuery("");
    setIsSearchFocused(false);
    setSelectedIndex(-1);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        setIsSearchFocused(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
        mobileSearchInputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // FIXED: Outside click - ONLY closes mobile menu, NOT suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;

      // NEVER close suggestion dropdown from outside clicks
      // It only closes when: X clicked, text cleared, or suggestion selected

      // Check if click is inside mobile dropdown (search suggestions)
      if (mobileDropdownRef.current?.contains(target)) {
        return; // Inside dropdown - do nothing
      }

      // Check if click is inside desktop dropdown
      if (dropdownRef.current?.contains(target)) {
        return; // Inside dropdown - do nothing
      }

      // Desktop search - close only if clicking completely outside
      if (dropdownRef.current && !dropdownRef.current.contains(target) && !navRef.current?.contains(target)) {
        setShowDropdown(false);
        setIsSearchFocused(false);
        setSelectedIndex(-1);
      }

      // Close mobile menu only if clicking outside both nav and mobile menu
      if (isOpen) {
        const clickedInsideNav = navRef.current?.contains(target);
        const clickedInsideMobileMenu = mobileMenuRef.current?.contains(target);
        
        // Mobile dropdown stays open even when mobile menu closes
        // Only close mobile menu, NOT dropdown
        if (!clickedInsideNav && !clickedInsideMobileMenu) {
          setIsOpen(false);
          // Do NOT close showDropdown here - it stays open
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, { passive: false, capture: true });
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [isOpen]);

  useEffect(() => {
    let abortController: AbortController | null = null;

    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        // FIXED: Don't auto-close dropdown when text is cleared
        // Only close if it was showing results
        if (suggestions.length > 0) {
          setShowDropdown(false);
        }
        setSelectedIndex(-1);
        return;
      }

      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();
      setIsLoading(true);
      setShowDropdown(true);

      try {
        const timeoutId = setTimeout(() => {
          if (abortController) abortController.abort();
        }, 5000);

        const res = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`,
          { signal: abortController.signal }
        );

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`Search API error: ${res.status}`);

        const data = await res.json();
        const results = Array.isArray(data) ? data.slice(0, 8) : [];
        setSuggestions(results);
        setShowDropdown(true);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(timer);
      if (abortController) abortController.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = useCallback(() => {
    setIsOpen(false);
    setShowDropdown(false);
    setIsSearchFocused(false);
    setSelectedIndex(-1);
    searchInputRef.current?.blur();
    mobileSearchInputRef.current?.blur();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/registry?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    closeAll();
  };

  // FIXED: Clear search - close dropdown
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
    // Focus the input after clearing
    setTimeout(() => {
      if (window.innerWidth < 768) {
        mobileSearchInputRef.current?.focus();
      } else {
        searchInputRef.current?.focus();
      }
    }, 50);
  }, []);

  // FIXED: Suggestion click handler
  const handleSuggestionClick = useCallback((href: string, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if ('nativeEvent' in e) {
        e.nativeEvent.stopImmediatePropagation();
        e.nativeEvent.preventDefault();
      }
    }

    suggestionClickedRef.current = true;
    navigationInProgressRef.current = true;
    
    // Clear everything and close
    setSearchQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
    setIsOpen(false);
    
    router.push(href);
    
    setTimeout(() => {
      navigationInProgressRef.current = false;
    }, 150);
  }, [router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === "Enter") {
        handleSearch(e);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex].href);
      } else {
        handleSearch(e);
      }
    }
  };

  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Registry", href: "/registry" },
    { name: "Stories", href: "/founder-stories" },
    { name: "Assessment", href: "/quiz" },
    { name: "Journal", href: "/blog" },

  ];

  // Close More dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const desktopClass = (href: string) =>
    `relative px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-md ${
      isActive(href)
        ? "text-foreground bg-accent/10 font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  const getTypeBadgeClass = (type: string) => {
    if (type.includes("VERIFIED")) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
    if (type.includes("STARTUP")) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
    if (type.includes("TOOL") || type.includes("ACTION")) return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
    if (type.includes("PAGE")) return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
  };

  const SearchSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="px-4 py-3 border-b border-border/20 last:border-0">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 bg-muted rounded shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
            <div className="w-14 h-5 bg-muted rounded shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* HEADER */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50"
            : "bg-background border-b border-border/30"
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* BRAND + IG PLAYER COVER STORY PILL */}
          <div className="flex items-center gap-3.5 shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group touch-manipulation" 
              onClick={closeAll}
            >
              <div className="relative w-8 h-8 overflow-hidden rounded-lg shadow-sm ring-1 ring-border/50 group-hover:ring-foreground/20 transition-all duration-300 bg-amber-500/10">
                <Image
                  src="/logo.jpg"
                  alt="UpForge Logo"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg tracking-tight text-foreground font-bold leading-none"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  UpForge
                </span>
                <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                  EDITORIAL
                </span>
              </div>
            </Link>

            {/* LIVE GLOBAL LEADERBOARD #1 — compact social proof */}
            <Link
              href="/quiz/leaderboard"
              className="hidden lg:flex items-center gap-2 pl-3 border-l border-border/50 group/rank min-w-0"
              title={
                leaderboardTop
                  ? `${leaderboardTop.userName} is #1 on the global leaderboard`
                  : "View the global leaderboard"
              }
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold ring-1 ring-accent-gold/20">
                <Trophy className="h-3.5 w-3.5" />
              </span>
              <span className="flex min-w-0 flex-col leading-none">
                <span className="text-[8px] font-black uppercase tracking-[0.16em] text-accent-gold">
                  #1 LEADERBOARD
                </span>
                <span className="mt-1 max-w-[112px] truncate text-[10px] font-bold text-muted-foreground transition-colors group-hover/rank:text-foreground">
                  {leaderboardTop?.userName || "Top performer"}
                </span>
              </span>
            </Link>
          </div>


          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="relative w-full">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'ring-2 ring-foreground/10 rounded-xl' : ''
              }`}>
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                  isSearchFocused ? "text-foreground" : "text-muted-foreground"
                }`} />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery.length >= 2 && suggestions.length > 0) setShowDropdown(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search startups, tools, blogs..."
                  className="w-full pl-11 pr-12 py-2.5 text-sm bg-muted/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 focus:bg-background transition-all duration-300"
                  aria-label="Search"
                  autoComplete="off"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {isLoading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
                  {searchQuery && !isLoading && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="p-1 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Desktop Dropdown */}
            {showDropdown && (
              <div 
                className="absolute top-full mt-2 left-0 right-0 bg-background border border-border/50 rounded-xl shadow-2xl z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {isLoading && <SearchSkeleton />}

                {!isLoading && suggestions.length > 0 && (
                  <>
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSuggestionClick(item.href, e);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors border-b border-border/20 last:border-0 cursor-pointer ${
                          selectedIndex === idx ? "bg-muted/50" : "hover:bg-muted/30"
                        }`}
                      >
                        <Search size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground font-medium truncate">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-xs text-muted-foreground truncate mt-0.5">{item.subtitle}</div>
                          )}
                        </div>
                        <span className={`shrink-0 text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getTypeBadgeClass(item.type)}`}>
                          {item.type}
                        </span>
                      </button>
                    ))}
                    <div className="px-4 py-2.5 bg-muted/20 border-t border-border/30 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] border border-border font-mono">↑↓</kbd>
                        Navigate
                        <kbd className="px-1.5 py-0.5 bg-muted rounded text-[9px] border border-border font-mono ml-1">↵</kbd>
                        Select
                      </span>
                      <span className="text-[10px] text-muted-foreground">{suggestions.length} results</span>
                    </div>
                  </>
                )}

                {!isLoading && suggestions.length === 0 && searchQuery.length >= 2 && (
                  <div className="px-4 py-6 text-center">
                    <Search size={24} className="text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">
                      No results for &ldquo;<span className="text-foreground font-medium">{searchQuery}</span>&rdquo;
                    </p>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/registry?q=${encodeURIComponent(searchQuery)}`);
                        setSearchQuery("");
                        closeAll();
                      }}
                      className="text-[13px] text-foreground hover:underline font-medium cursor-pointer"
                    >
                      Search all startups instead →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={desktopClass(link.href)}
                onClick={closeAll}
              >
                {link.name}
              </Link>
            ))}

            {/* MORE DROPDOWN */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreOpen(prev => !prev)}
                className={`relative flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-md ${
                  isMoreOpen
                    ? "text-foreground bg-accent/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl shadow-black/20 p-4 z-50">
                  {/* EXPLORE group */}
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">Explore</p>
                  <div className="space-y-0.5 mb-4">
                    {MORE_LINKS.explore.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { closeAll(); setIsMoreOpen(false); }}
                        className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-[13px] font-medium text-foreground group-hover:text-accent-primary transition-colors">{item.name}</span>
                        <span className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                  {/* RESOURCES group */}
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1 pt-2 border-t border-border/30">Resources</p>
                  <div className="space-y-0.5">
                    {MORE_LINKS.resources.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { closeAll(); setIsMoreOpen(false); }}
                        className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-[13px] font-medium text-foreground group-hover:text-accent-primary transition-colors">{item.name}</span>
                        <span className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border/50 text-[11px] font-semibold uppercase rounded-lg hover:bg-muted/50 hover:border-border transition-all duration-200"
              onClick={closeAll}
            >
              <ShieldCheck className="w-3 h-3" />
              Verify UFRN
            </Link>

            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-foreground text-background text-[11px] font-bold uppercase rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm"
              onClick={closeAll}
            >
              <Sparkles className="w-3 h-3" />
              Submit Startup
              <ChevronRight className="w-3 h-3" />
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-10 h-5 rounded-full bg-muted border border-border/50 transition-colors duration-300 ease-in-out hover:bg-muted/80"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background border border-border shadow-sm transition-all duration-300 ease-in-out flex items-center justify-center ${
                    theme === "dark" ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {theme === "dark" ? (
                    <Moon size={10} className="text-foreground" />
                  ) : (
                    <Sun size={10} className="text-foreground" />
                  )}
                </div>
              </button>
            )}
          </div>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-2 relative z-[110] pointer-events-auto">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-9 h-9 rounded-full bg-muted/80 border border-border/60 transition-transform active:scale-95 flex items-center justify-center touch-manipulation"
                aria-label="Switch theme"
              >
                {theme === "dark" ? (
                  <Moon size={15} className="text-amber-400" />
                ) : (
                  <Sun size={15} className="text-amber-600" />
                )}
              </button>
            )}
            
            <button
              type="button"
              className="relative w-10 h-10 rounded-xl bg-muted/80 border border-border/60 flex items-center justify-center text-foreground hover:bg-muted transition-all active:scale-95 touch-manipulation z-[110]"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen((prev) => !prev)
              }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                <span 
                  className={`block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out ${
                    isOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-1.5"
                  }`} 
                />
                <span 
                  className={`block w-5 h-0.5 bg-foreground rounded-full transition-all duration-200 ease-out ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`} 
                />
                <span 
                  className={`block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out ${
                    isOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-1.5"
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULL SCREEN MOBILE MENU OVERLAY TAKEOVER */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[200] md:hidden bg-background text-foreground flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        {/* Mobile Full Screen Header Bar */}
        <div className="h-16 px-5 border-b border-border flex items-center justify-between shrink-0 bg-background/95 backdrop-blur-md">
          <Link 
            href="/" 
            className="flex items-center gap-2" 
            onClick={closeAll}
          >
            <div className="relative w-7 h-7 overflow-hidden rounded-lg bg-amber-500/10">
              <Image
                src="/logo.jpg"
                alt="UpForge Logo"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base leading-none text-foreground">UpForge</span>
              <span className="text-[8px] font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-widest leading-none mt-0.5">MAGAZINE</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-muted border border-border text-foreground transition-transform active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-amber-600" />}
              </button>
            )}

            <button
              onClick={closeAll}
              className="p-2 rounded-full bg-muted border border-border text-foreground hover:bg-accent transition-all active:scale-95"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Full Screen Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          
          {/* Live leaderboard #1 — same real server value as the desktop header */}
          <Link
            href="/quiz/leaderboard"
            onClick={closeAll}
            className="group flex items-center justify-between rounded-2xl border border-accent-gold/20 bg-accent-gold/[0.06] p-3.5 shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold ring-1 ring-accent-gold/20">
                <Trophy className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-accent-gold">
                  #1 LEADERBOARD
                </span>
                <p className="truncate text-xs font-bold text-foreground transition-colors group-hover:text-accent-gold">
                  {leaderboardTop?.userName || "Top performer"}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Search Input */}
          <div className="relative">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!searchQuery.trim()) return;
              router.push(`/registry?q=${encodeURIComponent(searchQuery.trim())}`);
              setSearchQuery("");
              closeAll();
            }} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={mobileSearchInputRef}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search founders, startups, intelligence..."
                className="w-full pl-11 pr-10 py-3.5 text-sm bg-muted/60 border border-border rounded-xl focus:outline-none focus:border-amber-500/50"
                aria-label="Search"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Suggestions dropdown */}
            {showDropdown && (
              <div className="mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                {isLoading && <SearchSkeleton />}
                {!isLoading && suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleSuggestionClick(item.href, e)}
                    className="w-full text-left px-4 py-3 border-b border-border/30 hover:bg-muted text-xs flex items-center justify-between"
                  >
                    <span className="font-semibold text-foreground truncate">{item.title}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2">Main Navigation</p>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeAll}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-serif text-lg font-bold transition-all ${
                  isActive(link.href)
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>

          {/* Quick Categories */}
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">Founder Categories</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/founder-stories/category/ai-technology"
                onClick={closeAll}
                className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition-colors"
              >
                AI & Technology
              </Link>
              <Link
                href="/founder-stories/category/open-source-ai"
                onClick={closeAll}
                className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition-colors"
              >
                Open Source AI
              </Link>
              <Link
                href="/founder-stories/category/developer-tools"
                onClick={closeAll}
                className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition-colors"
              >
                Developer Tools
              </Link>
              <Link
                href="/founder-stories/category/enterprise-foundation-models"
                onClick={closeAll}
                className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono font-semibold hover:bg-amber-500/20 hover:text-amber-600 transition-colors"
              >
                Enterprise AI
              </Link>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-border space-y-3">
            <Link
              href="/verify"
              className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted transition-colors"
              onClick={closeAll}
            >
              <ShieldCheck size={15} />
              Verify UFRN Credential
            </Link>
            <Link
              href="/submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-foreground text-background rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
              onClick={closeAll}
            >
              <Sparkles size={15} />
              Submit Startup
            </Link>
          </div>

        </div>

        {/* Full Screen Footer */}
        <div className="p-4 border-t border-border bg-muted/20 text-center shrink-0">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            UpForge Global Startup Registry & Intelligence • 2026
          </p>
        </div>
      </div>

    </>
  );
}
