# UpForge production protection — September 2026

## Goals

- Keep normal visitors fast and unrestricted.
- Keep Google/Bing crawling available.
- Keep useful AI/search agents available: OAI-SearchBot, ChatGPT-User,
  PerplexityBot, ClaudeBot, Applebot and other documented search agents.
- Block a short list of known unwanted SEO/scraping agents.
- Do not block generic "bot", "crawler" or "spider" user-agent strings because
  that can accidentally block legitimate discovery systems.
- Rate-limit API traffic at the application edge so repeated API fetching does
  not consume the same Worker CPU as normal page traffic.
- Leave public HTML cacheable at Cloudflare.

## Code-level protection

`middleware.ts` now:

1. Skips static assets immediately.
2. Canonicalizes `www.upforge.org` to `upforge.org`.
3. Blocks only explicit unwanted scraper user agents.
4. Does not block good AI/search crawlers.
5. Applies a 90-request / 10-second per-IP guard only to `/api/*`.
6. Does not rate-limit normal HTML pages.

The quiz completion route already has an additional, tighter application-level
limit. The Google Sheets writer now retries only once after a short delay.

## Cloudflare Pro settings

Use Cloudflare as the first protection layer, because a request stopped at
Cloudflare does not reach the Next.js Worker.

Recommended:

- Super Bot Fight Mode: ON
  - Definitely automated: Block
  - Likely automated: Managed Challenge
  - Verified bots: Allow
  - Static resource protection: ON
  - JavaScript detections: ON
- Security Level: Medium
- DDoS Protection: ON/default
- Under Attack Mode: OFF unless there is an actual attack
- Managed WAF rules: ON
- OWASP Core Ruleset: start OFF if it creates false positives; enable after
  reviewing real traffic.
- Bot Fight Mode should not be configured to block verified search/AI bots.
- Do not enable a blanket "Block all bots" rule.

## Cache / CPU protection

Keep public pages cacheable:

- `/`
- `/startup/*`
- `/startups/*`
- `/blog/*`
- `/registry`
- `/quiz/*`

Never blanket-cache `/api/*`.

The quiz leaderboard GET endpoint is already short-cacheable and has a 60-second
server memory cache. This keeps repeated leaderboard views from repeatedly
reading the Google Sheet.

## Quiz leaderboard deployment requirement

The leaderboard write requires the Cloudflare Worker secret:

`UPFORGE_QUIZ_SHEET_SECRET`

It must exactly match the `SECRET` value configured in the deployed Google Apps
Script. The secret value must not be committed to GitHub or placed in a
`vars` section.

The Apps Script web app must be deployed so that the Worker can call it
without a Google login.

## Important

This protection is intentionally conservative. It reduces unwanted scraper/API
load without sacrificing normal users, search indexing, or useful AI discovery.
