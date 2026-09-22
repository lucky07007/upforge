# UpForge production upgrade — September 2026

This package is based on the supplied UpForge ZIP and keeps the existing Next.js + OpenNext/Cloudflare architecture.

## What was upgraded

- Google Sheet remains the vetted registry source of truth.
- Startup profile pages no longer perform a second verification pass.
- Startup profiles no longer fabricate fallback records when a slug is missing.
- Website, logo, short description, long description, founder and social column aliases are normalized from the Sheet.
- Google Sheet CSV parsing now supports quoted commas, escaped quotes and embedded newlines.
- Build-time ETL refuses to silently publish the stale fallback dataset when the Google Sheet cannot be fetched.
- All Sheet-listed startup records are emitted as `approved` + `verified` registry records using the existing 90/100 verified tier.
- `/registry/:slug` permanently redirects to the canonical `/startup/:slug` profile URL.
- Startup profile metadata uses a stable canonical URL and real description.
- Sitemap generation now uses actual registry categories and startup rows instead of guessed city/founder URLs.
- UFRN duplicate pages remain excluded from the main sitemap because their existing page is intentionally noindex.
- Stale/guessed sitemap entries that could create 404s were removed.
- `www.upforge.org` canonical references were normalized to `upforge.org`.
- Valid OG images were added under `public/og/` so metadata does not point at missing image files.
- `next/image` optimization is enabled again; the previous `unoptimized: true` setting disabled the optimizer.
- Startup logos use `next/image` where the source is a normal remote URL and keep tiny generated data-URI avatars on a normal `<img>` path.
- Public HTML cache headers were added for homepage, startup profiles and sector pages so Cloudflare can cache them safely.
- `X-Powered-By` was disabled.
- News sitemap now emits only posts published inside the current 48-hour news window.
- Robots policy allows normal search/answer-engine crawlers while blocking known training/scraping bots and private/API paths.
- Startup JSON-LD now includes founding year and UFRN identifier data when available.

## Important deployment behavior

The build still runs the existing ETL first:

`Google Sheet CSV -> scripts/etl-build.js -> public/data/startups.json -> Next.js build`

A failed Google Sheet fetch now fails the build instead of silently publishing a small stale fallback registry. This prevents an accidental production deployment with incorrect startup data.

## Cloudflare dashboard recommendations

The code already sends cache-friendly response headers. On Cloudflare Pro, add Cache Rules only after the first deployment is healthy:

1. Cache public startup HTML under `/startup/*`.
2. Cache public sector HTML under `/startups/*`.
3. Cache `/blog/*`, `/founder-stories/*`, `/registry` and `/` according to their response `s-maxage` headers.
4. Never cache `/api/*`, authenticated/private responses, or responses that set user-specific cookies.
5. Keep image/static asset caching enabled.

Cloudflare Cache Rules are available on Pro and can control cache eligibility and edge TTL. Do not create a blanket "cache everything" rule across the entire site because API/private routes must remain dynamic.

## GSC expectations

The deployment will not instantly erase historical Search Console exclusions. Google needs to recrawl the affected URLs. The important technical changes are:

- one canonical startup URL;
- no duplicate `/registry/:slug` profile URL;
- no guessed city sitemap URLs;
- no guessed founder `/startup/*` URLs;
- only actual startup records in the startup sitemap;
- no accidental `noindex` on startup profile pages;
- valid robots and sitemap endpoints.

Historical 404/noindex/duplicate counts can remain visible in GSC until Google recrawls them.

## 2026-09-13 Brand / SEO Authority Expansion

This upgrade adds a focused search-intent layer without generating thin, keyword-only pages:

- `/global-startup-registry` — global registry discovery hub
- `/verified-startup-database` — UFRN + registry-standard explainer and Dataset schema
- `/ai-startup-founders` — AI founder discovery hub built from existing Founder Chronicle data
- `/startup-intelligence` — canonical index for intelligence reports + journal coverage
- `/startup-funding-trends` — canonical funding / venture-intelligence hub using existing published research
- `/startups/country/[country]` — country hubs only when the registry has enough records
- `/startups/city/[city]` — city hubs only when the registry has enough records
- `/press` — official press/media resource page for brand consistency and journalists

Technical / trust improvements:

- Removed non-existent sitemap URLs (`/ufrn`, `/founders`, `/blog/category/*`).
- Registry query/filter/pagination variants are no longer index targets; clean landing pages carry the SEO value.
- UFRN structured-data links now point back to the canonical startup profile instead of the noindex UFRN utility route.
- Added stronger internal links between registry, founder, intelligence, funding and geography hubs.
- Updated the methodology page to match the actual Google Sheet source-of-truth workflow and removed unsupported claims about external verification, on-chain records, or cryptographic proof.
- Reframed the Trust Score UI as an UpForge Registry Standard so the 90/100 score is not presented as evidence of checks the production pipeline does not perform.
- Removed unsupported brand superlatives such as "most trusted" and "independently verified" from core SEO copy where they were not backed by the current workflow.
- Added WebPage / CollectionPage / Dataset / ItemList / Breadcrumb structured data to the new canonical hubs.
- Added a stable `WebSite` alternate name and corrected the homepage SearchAction target to `/registry`.

Strategic principle: build UpForge into a durable reference brand by making the registry, founder intelligence, research, and funding coverage reinforce one another. Do not create pages solely to target keyword variants; every indexable hub should provide a real navigation or research function.
