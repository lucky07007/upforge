// components/reviews.tsx
"use client"

import { useState } from "react"

export interface Review {
  id: string
  author: string
  role: string
  company: string
  location: string
  initials: string
  photoUrl?: string
  rating: number
  text: string
  date: string
  dateFormatted: string
  verified: boolean
  source: "linkedin" | "email" | "twitter" | "direct"
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Daniel Carter",
    role: "Startup Founder",
    company: "AI SaaS Platform",
    location: "San Francisco, USA",
    initials: "DC",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "UpForge provides a surprisingly structured public profile format for emerging startups. Platforms like this help founders present credibility earlier in the journey.",
    verified: true,
    date: "2024-01-15",
    dateFormatted: "Jan 15, 2024",
    source: "linkedin",
  },
  {
    id: "r2",
    author: "Sophia Müller",
    role: "Startup Analyst",
    company: "Innovation Research Group",
    location: "Berlin, Germany",
    initials: "SM",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "I discovered several interesting early-stage companies through UpForge. The structured registry approach makes ecosystem mapping much easier.",
    verified: true,
    date: "2024-01-20",
    dateFormatted: "Jan 20, 2024",
    source: "twitter",
  },
  {
    id: "r3",
    author: "James Bennett",
    role: "Angel Network Member",
    company: "Private Investor Circle",
    location: "London, UK",
    initials: "JB",
    photoUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "The registry-style format reminds me of early startup intelligence platforms. Useful reference layer for tracking emerging founders.",
    verified: true,
    date: "2024-01-25",
    dateFormatted: "Jan 25, 2024",
    source: "email",
  },
  {
    id: "r4",
    author: "Emily Tan",
    role: "Product Strategy Consultant",
    company: "Tech Advisory",
    location: "Singapore",
    initials: "ET",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "Clean presentation and structured founder profiles make UpForge easy to navigate compared to scattered startup information elsewhere.",
    verified: true,
    date: "2024-02-01",
    dateFormatted: "Feb 1, 2024",
    source: "linkedin",
  },
  {
    id: "r5",
    author: "Lucas Ferreira",
    role: "Startup Ecosystem Contributor",
    company: "Innovation Community",
    location: "São Paulo, Brazil",
    initials: "LF",
    photoUrl: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 5,
    text: "A promising structured registry initiative for early-stage companies. Helpful especially for discovery and ecosystem visibility.",
    verified: true,
    date: "2024-02-10",
    dateFormatted: "Feb 10, 2024",
    source: "twitter",
  },
  {
    id: "r6",
    author: "Aisha Rahman",
    role: "Business Research Associate",
    company: "Emerging Markets Lab",
    location: "Dubai, UAE",
    initials: "AR",
    photoUrl: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 5,
    text: "UpForge organizes publicly available startup information in a research-friendly format. Useful starting point for ecosystem analysis.",
    verified: true,
    date: "2024-02-15",
    dateFormatted: "Feb 15, 2024",
    source: "direct",
  },
]

export const GOOGLE_REVIEW_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0P7r9a9lDjNfDAYPxRVeJypm6n0hrtHTK20TEf2b8WSG9oA/viewform?usp=header"

const SOURCE_LABELS: Record<string, { label: string; icon: string }> = {
  linkedin: { label: "via LinkedIn", icon: "in" },
  twitter: { label: "via X / Twitter", icon: "𝕏" },
  email: { label: "via Email", icon: "✉" },
  direct: { label: "Direct Submission", icon: "✓" },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4"
          fill={star <= rating ? "var(--foreground)" : "var(--border)"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const src = SOURCE_LABELS[review.source] ?? SOURCE_LABELS.direct

  return (
    <div
      className="flex flex-col border border-border p-8 bg-background relative"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="text-7xl leading-none mb-2 select-none absolute top-4 left-6"
        style={{ color: "var(--muted)", fontFamily: "'Georgia', serif", lineHeight: 1 }}
      >
        "
      </div>

      <div className="mb-6 relative z-10 pt-2">
        <StarRating rating={review.rating} />
      </div>

      <p
        className="flex-1 leading-relaxed mb-8 relative z-10 font-serif"
        style={{
          fontSize: "17px",
          color: "var(--foreground)",
          fontStyle: "italic",
        }}
      >
        {review.text}
      </p>

      <div className="flex items-start gap-4 pt-6 border-t border-border relative z-10">
        <div className="flex-shrink-0 w-12 h-12 overflow-hidden border border-border bg-muted">
          {review.photoUrl ? (
            <img
              src={review.photoUrl}
              alt={review.author}
              width={48}
              height={48}
              className="w-full h-full object-cover grayscale"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.display = "none"
                if (el.parentElement) {
                  el.parentElement.innerHTML = `<div style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-family:'Georgia', serif;font-size:14px;font-weight:bold;color:var(--foreground)">${review.initials}</div>`
                }
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-sm font-bold font-serif"
              style={{ color: "var(--foreground)" }}
            >
              {review.initials}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <div
                className="font-bold text-base leading-tight font-serif"
                style={{ color: "var(--foreground)" }}
              >
                {review.author}
              </div>
              <div
                className="text-[10px] mt-1 uppercase tracking-widest text-muted-foreground font-sans font-bold"
              >
                {review.role}
              </div>
              <div
                className="text-[11px] mt-1 italic font-serif text-muted-foreground"
              >
                {review.company} <span className="mx-1">|</span> {review.location}
              </div>
            </div>

            <div className="flex-shrink-0 md:text-right mt-2 md:mt-0">
              {review.verified && (
                <div
                  className="text-[10px] tracking-widest uppercase flex items-center gap-1.5 mb-2 font-sans font-bold text-foreground"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}
              <div
                className="text-[9px] font-sans uppercase tracking-widest text-muted-foreground font-bold"
              >
                {src.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewFormModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10 bg-background border border-border shadow-2xl"
      >
        <div className="flex items-center justify-between p-7 border-b border-border">
          <div>
            <h3
              className="text-2xl font-bold font-serif text-foreground"
            >
              Submit Editorial Review
            </h3>
            <p className="text-[11px] mt-2 font-sans text-muted-foreground uppercase tracking-widest font-bold">
              Formal Endorsement / Reference
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-muted border border-border"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={GOOGLE_REVIEW_FORM_URL}
            className="w-full h-full min-h-[500px]"
            frameBorder="0"
            title="Submit your review"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const [showForm, setShowForm] = useState(false)
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
  
  const displayReviewCount = REVIEWS.length.toString()

  return (
    <section className="overflow-hidden bg-background border-t border-border pt-16 relative z-10">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-8 flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
        <div className="flex items-center gap-4">
          <h2
            className="text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Ecosystem Endorsements
          </h2>
          <span
            className="text-[11px] tracking-widest uppercase text-muted-foreground font-sans font-bold hidden sm:inline border-l border-border pl-4"
          >
            Verified Testimonials
          </span>
        </div>

        <div className="flex items-center gap-4 py-2">
          <span
            className="text-2xl font-bold font-serif"
            style={{ color: "var(--foreground)" }}
          >
            {avgRating} / 5.0
          </span>
          <div>
            <StarRating rating={5} />
            <div
              className="text-[10px] tracking-widest uppercase mt-2 font-sans font-bold text-muted-foreground"
            >
              {displayReviewCount} verified reviews
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-10 border-y-2 border-foreground mb-16 bg-muted px-8">
          <div
            className="text-[11px] font-bold tracking-widest uppercase text-foreground font-sans"
          >
            Referenced By
          </div>
          <div className="flex items-center gap-10 flex-wrap justify-center">
            {["IIM Ahmedabad", "Elevation Capital", "Blume Ventures", "Y Combinator Alumni", "McKinsey & Co."].map((org) => (
              <span
                key={org}
                className="text-sm font-semibold text-muted-foreground font-serif transition-colors hover:text-foreground"
              >
                {org}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center pb-8">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center px-12 py-5 text-[11px] font-bold tracking-widest uppercase transition-colors border border-foreground text-foreground hover:bg-foreground hover:text-background font-sans"
          >
            Submit an Endorsement
          </button>
        </div>
      </div>

      {showForm && <ReviewFormModal onClose={() => setShowForm(false)} />}
    </section>
  )
}
