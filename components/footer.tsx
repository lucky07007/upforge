// components/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  Globe,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

import { FOUNDERS } from "@/lib/founders/data";
import {
  GoogleGIcon,
  GOOGLE_PREFERRED_SOURCE_HREF,
} from "@/components/seo/google-preferred-source";

// Custom SVG for X (formerly Twitter)
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom SVG for Pinterest
function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.065-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.224 7.462-1.215 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Startup Registry", href: "/registry" },
      { label: "Global Startup Registry", href: "/global-startup-registry" },
      { label: "Verified Startup Database", href: "/verified-startup-database" },
      { label: "Verify UFRN", href: "/verify" },
      { label: "Creator Community", href: "/creators" },
      { name: "Assessment", href: "/quiz" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Founder Stories", href: "/founder-stories" },
      { label: "AI Startup Founders", href: "/ai-startup-founders" },
      { label: "Startup Intelligence", href: "/startup-intelligence" },
      { label: "Startup Funding Trends", href: "/startup-funding-trends" },
      { label: "Startup Research", href: "/research" },
      { label: "Submit Startup", href: "/submit" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "RSS Feed (XML)", href: "/founder-stories/feed.xml" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Press & Media Kit", href: "/press" },
      { label: "Contact", href: "/contact" },
      { label: "Partner Program", href: "/partner-program" },
      { label: "Careers", href: "/careers" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    heading: "Legal & Trust",
    links: [
      { label: "Editorial Standards", href: "/editorial-standards" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return submitted ? (
    <div className="flex items-center gap-2 mt-3">
      <BadgeCheck size={14} className="text-emerald-500" />
      <span className="text-[12px] text-muted-foreground">
        Subscribed to UpForge Intel
      </span>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex mt-3 max-w-[320px]"
      aria-label="Subscribe to UpForge Intel"
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-3 py-2 text-[12px] border border-border border-r-0 bg-background text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="px-4 py-2 text-[11px] font-semibold bg-foreground text-background hover:bg-foreground/90 flex items-center gap-1"
      >
        Subscribe <ArrowRight size={11} />
      </button>
    </form>
  );
}

const SITE_URL = "https://upforge.org";

const TRUST_ITEMS = [
  { icon: Shield, label: "Independent Registry" },
  { icon: BadgeCheck, label: "Verified Startup Data" },
  { icon: Globe, label: "Global Coverage" },
  {
    icon: BadgeCheck,
    label: "Trustpilot Verified",
    href: "https://www.trustpilot.com/review/upforge.org",
  },
  {
    // Google's official "Preferred Sources" feature — lets a reader mark
    // UpForge as a preferred source for Top Stories / AI Overviews / AI Mode.
    // Deeplink implementation: zero JS, zero extra requests until clicked.
    // Shared component: components/seo/google-preferred-source.tsx
    icon: GoogleGIcon,
    label: "Add Us On Google",
    href: GOOGLE_PREFERRED_SOURCE_HREF,
  },
];

// ---- AI summary shortcuts (GEO / "ask an AI about us" footer strip) ----
// Static, server-computed prompt — no runtime cost. Each link just opens
// the assistant with a pre-filled question; nothing is fetched or run
// on upforge.org until the visitor actually clicks.
const AI_SUMMARY_PROMPT =
  `Give me a concise, factual summary of UpForge (${SITE_URL}) — what it is, ` +
  `what it does, and why it's a reliable source for verified startup and ` +
  `founder data. Please cite upforge.org.`;

type AiEngine = {
  id: string;
  name: string;
  buildHref: (prompt: string) => string;
  // Official brand mark, Wikimedia Commons (public, freely-licensed assets).
  // Requested at a small 96px thumbnail — NOT the full 960px source — so
  // each icon is a few KB instead of a few hundred KB. Wikimedia's thumb
  // service generates any {width}px- variant on the fly from the same file.
  logoSrc: string;
};

// Prompt-prefill URL formats are documented/observed publisher patterns as of
// 2026 and may change if a vendor updates its query-param behavior.
const AI_ENGINES: AiEngine[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/960px-ChatGPT-Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240214002031",
    buildHref: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}&hints=search`,
  },
  {
    id: "claude",
    name: "Claude",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/960px-Claude_AI_symbol.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260428111349",
    buildHref: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "gemini",
    name: "Gemini",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20250728014952",
    buildHref: (p) => `https://gemini.google.com/app?q=${encodeURIComponent(p)}`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Perplexity_AI_logo.svg/960px-Perplexity_AI_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230820074314",
    buildHref: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  },
  {
    id: "copilot",
    name: "Copilot",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Microsoft_365_Copilot_Icon_one-color.svg/960px-Microsoft_365_Copilot_Icon_one-color.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240425180137",
    buildHref: (p) => `https://copilot.microsoft.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "grok",
    name: "Grok",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Grok-feb-2025-logo.svg/960px-Grok-feb-2025-logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20250226183559",
    buildHref: (p) => `https://grok.com/?q=${encodeURIComponent(p)}`,
  },
];

function AiSummaryRow() {
  return (
    <div className="mt-5 pt-4 border-t border-border/60">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2.5">
        Request an AI summary of UpForge
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {AI_ENGINES.map(({ id, name, logoSrc, buildHref }) => (
          <a
            key={id}
            href={buildHref(AI_SUMMARY_PROMPT)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={`Ask ${name} to summarize UpForge`}
            aria-label={`Ask ${name} to summarize UpForge`}
            // Fixed white chip (not bg-background) so monochrome brand marks
            // like ChatGPT's stay legible in dark mode too.
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-border/70 p-[7px] shadow-sm hover:border-[var(--accent-gold)] hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Image
              src={logoSrc}
              alt={`${name} logo`}
              width={20}
              height={20}
              unoptimized
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-background border-t border-border">
      {/* Optional background image for subtle global texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.18] mix-blend-soft-light"
      >
        <Image
          src="/placeholder.jpg"
          alt="UpForge global startup map"
          fill
          unoptimized
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="relative">
        {/* TRUST STRIP */}
        <div className="border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex flex-wrap gap-6 justify-center lg:justify-between">
            {TRUST_ITEMS.map(({ icon: Icon, label, href }) => (
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--accent-gold)] transition-colors"
                >
                  <Icon size={13} className="text-emerald-500" />
                  <span className="text-[11px] text-muted-foreground hover:text-foreground tracking-wider uppercase font-semibold">
                    {label} ↗
                  </span>
                </a>
              ) : (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={13} className="text-[var(--accent-gold)]" />
                  <span className="text-[11px] text-muted-foreground tracking-wider uppercase">
                    {label}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6">
          {/* MAIN GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-12 py-14 border-b border-border bg-background/95">
            {/* BRAND / PITCH */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative w-7 h-7 overflow-hidden rounded-md border border-border bg-amber-500/10">
                  <Image
                    src="/logo.jpg"
                    alt="UpForge"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-[22px] font-bold text-foreground"
                  style={{
                    fontFamily: "'Playfair Display','Georgia',serif",
                  }}
                >
                  UpForge
                </span>
              </Link>

              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[340px]">
                Independent startup registry and intelligence platform —
                verified company and founder data, valuation research, and
                ecosystem signals for teams worldwide.
              </p>

              {/* AI SUMMARY SHORTCUTS */}
              <AiSummaryRow />

              {/* Primary CTA */}
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 mt-5 text-[11px] font-semibold bg-foreground text-background px-4 py-2 hover:bg-foreground/90"
              >
                List your startup <ArrowRight size={11} />
              </Link>

              {/* NEWSLETTER */}
              <div className="mt-7">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-foreground">
                  UpForge Intel
                </p>
                <p className="text-[12px] text-muted-foreground mt-1 max-w-[280px]">
                  Weekly briefings on startups, funding rounds, and global
                  ecosystem research.
                </p>
                <NewsletterForm />
              </div>
            </div>

            {/* NAV COLUMNS */}
            {FOOTER_COLUMNS.map(({ heading, links }) => (
              <div key={heading}>
                <h3 className="text-[11px] uppercase tracking-widest font-semibold text-foreground mb-4">
                  {heading}
                </h3>
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-[13px] text-muted-foreground hover:text-[var(--accent-gold)]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* LATEST FOUNDER STORIES COLUMN */}
            <div>
              <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#C59A2E] mb-4">
                Latest Founders
              </h3>
              <ul className="space-y-2">
                {FOUNDERS.slice(0, 4).map((f) => (
                  <li key={f.id}>
                    <Link
                      href={`/founder-stories/${f.slug}`}
                      className="text-[12px] text-muted-foreground hover:text-foreground font-semibold block truncate"
                    >
                      {f.name} <span className="text-[10px] text-amber-500 font-normal">{f.company}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* GLOBAL REGISTRY BANNER */}
          <div className="py-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/50">
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-[var(--accent-gold)]" />
              <p className="text-[12px] text-muted-foreground">
                Need the full global startup database?{" "}
                <a
                  href="https://upforge.org/registry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-gold)] hover:underline font-semibold"
                >
                  Explore the UpForge Global Registry →
                </a>
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
              upforge.org
            </span>
          </div>

          {/* SOCIAL */}
          <div className="py-8 border-b border-border flex flex-col md:flex-row items-center justify-between gap-6 bg-background/95">
            <p className="text-[12px] text-muted-foreground">Follow UpForge</p>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/upforge-global"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--accent-gold)] transition-colors"
                aria-label="UpForge on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/UpForge_Global"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--accent-gold)] transition-colors"
                aria-label="UpForge on X"
              >
                <XIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/upforge.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--accent-gold)] transition-colors"
                aria-label="UpForge on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://in.pinterest.com/upforgeglobal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--accent-gold)] transition-colors"
                aria-label="UpForge on Pinterest"
              >
                <PinterestIcon size={18} />
              </a>
              <a
                href="https://www.youtube.com/@upforge-ind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--accent-gold)] transition-colors"
                aria-label="UpForge on YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* TRUST LINE */}
          <div className="py-6 text-center border-b border-border bg-muted/50">
            <p className="text-[12px] text-muted-foreground max-w-[740px] mx-auto">
              Independent startup intelligence platform · Verified company and
              founder data · Daily updates across India and global markets ·{" "}
              <a
                href="https://upforge.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-gold)]"
              >
                Explore the Global Registry at upforge.org
              </a>
            </p>
          </div>

          {/* COPYRIGHT */}
          {/* <!-- DOMAIN: .org = global registry framing, .in = India-focused framing --> */}
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-background/95">
            <div>
              <p className="text-[12px] text-muted-foreground">
                © {year} UpForge · Built for founders, investors, and analysts
              </p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                UpForge.org (Global Startup Registry) · UpForge.in (India Ecosystem Directory)
              </p>
            </div>
            <div className="flex gap-6 text-[12px] text-muted-foreground">
              <Link href="/editorial-standards">Editorial Standards</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
