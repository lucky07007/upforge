# UpForge Startup Authority Architecture

## Goal

Make every approved startup profile function as a durable public entity record for common discovery questions:

- What is [Company]?
- Who founded [Company]?
- Where is [Company] based?
- When was [Company] founded?
- What does [Company] do?
- What is [Company]'s valuation?
- Is [Company] a startup?
- What industry is [Company] in?

## Canonical-page strategy

UpForge intentionally keeps one canonical `/startup/[slug]` URL per startup instead of generating eight near-identical query URLs. The canonical page now contains explicit question headings, concise answers, provenance, UFRN identity, official-site links, and machine-readable Organization/ProfilePage/WebPage data.

This avoids creating large sets of thin or duplicate pages whose only purpose is to target slightly different search queries. The same page can satisfy multiple natural-language intents while retaining a single authoritative URL.

## Data authority

The Google Sheet remains the registry source of truth. The ETL and runtime mapper preserve optional fields when the sheet contains them:

- legal name
- business model
- funding stage
- total funding
- valuation
- valuation date
- data-as-of / update date
- founders
- founded year
- location
- sector
- official website and social profiles

Missing fields are rendered as undisclosed rather than estimated.

## Structured data

Each startup page emits an Organization entity with:

- stable `@id`
- official website URL when available
- founder Person entities
- founding date
- address/location
- sameAs links
- UFRN PropertyValue identifier
- optional funding/valuation PropertyValue entries
- ProfilePage and WebPage relationships
- BreadcrumbList

Structured data is used to help machines understand the page; it is not presented as a guarantee of a Google rich result.

## Trust presentation

The page separates:

1. Registry facts
2. Registry provenance
3. Verification classification
4. Official external links
5. Missing/undisclosed data

The site does not invent a valuation, founder, founding year, location, or business model when the source record does not contain one.

## Submission quality

The startup submission form now requires a company-domain email and rejects common consumer-mail domains. This improves intake quality but is explicitly not presented as proof of employment, ownership, or legal incorporation.

EmailJS configuration is environment-driven and the repository no longer contains the previous hardcoded EmailJS identifiers.

## Security

Firebase Admin credentials are environment-driven. The source tree no longer contains a Firebase service-account private key. Any previously exposed key must be revoked and replaced before deployment.
