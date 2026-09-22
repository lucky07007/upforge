// app/feedback/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import {
  Loader2, CheckCircle2, Star, ArrowRight,
  MessageSquare, Lightbulb, AlertCircle, Heart,
  Zap, ThumbsUp,
} from "lucide-react";

// ─── Same EmailJS config ───────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_FEEDBACK_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

// ─── Types ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "general",     label: "General",          icon: MessageSquare, desc: "Overall experience" },
  { id: "suggestion",  label: "Suggestion",        icon: Lightbulb,     desc: "Feature or improvement idea" },
  { id: "bug",         label: "Bug Report",        icon: AlertCircle,   desc: "Something broken" },
  { id: "listing",     label: "Listing Process",   icon: Zap,           desc: "Submit / verification flow" },
  { id: "love",        label: "Just Love",         icon: Heart,         desc: "Share what you like" },
];

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

const inputCls =
  "w-full border border-[#D5D0C8] bg-white px-4 py-3 text-[13px] text-[#1C1C1C] placeholder-[#BBB] focus:outline-none focus:border-[#1C1C1C] transition-all hover:border-[#BBB]";

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({
  value, onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                n <= active
                  ? "fill-[#E8C547] text-[#E8C547]"
                  : "fill-transparent text-[#D5D0C8]"
              }`}
            />
          </button>
        ))}
        {active > 0 && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#888] ml-1">
            {RATING_LABELS[active]}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "", email: "", category: "", message: "",
  });
  const [rating, setRating]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const update = (f: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [f]: e.target.value }));

  const isValid = form.name && form.email && form.message && form.category;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    form.name,
          title:   `Feedback — ${form.category} — ${rating > 0 ? `${rating}/5 stars` : "No rating"}`,
          email:   form.email,
          phone:   "N/A",
          message: `
UPFORGE FEEDBACK SUBMISSION
──────────────────────────
Category : ${form.category}
Rating   : ${rating > 0 ? `${rating}/5 — ${RATING_LABELS[rating]}` : "Not rated"}
From     : ${form.name} <${form.email}>

Message:
${form.message}
          `.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Email us at contact@upforge.in");
    } finally {
      setLoading(false);
    }
  };

  // ── Success ────────────────────────────────────────────────────────────────

  if (sent) {
    return (
      <div
        className="bg-[#F7F5F0] min-h-screen flex items-center justify-center px-4"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <div className="max-w-md w-full bg-[#1C1C1C] p-12 text-center relative overflow-hidden">
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 80px)",
            }}
          />
          <div className="relative">
            <div className="w-14 h-14 bg-[#E8C547]/10 border border-[#E8C547]/20 flex items-center justify-center mx-auto mb-6">
              <ThumbsUp className="w-7 h-7 text-[#E8C547]" />
            </div>
            <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-[0.3em] mb-3">
              Thank you
            </p>
            <h2
              className="text-2xl text-white mb-3 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Feedback received.
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mb-8">
              Every submission is read by our team.{" "}
              {form.email && (
                <>
                  We'll follow up at{" "}
                  <span className="text-white/60">{form.email}</span> if needed.
                </>
              )}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#E8C547] hover:text-white transition-colors"
            >
              Back to UpForge <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="bg-[#F7F5F0] min-h-screen"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .fu   { animation: fadeUp 0.45s 0.05s ease both; }
        .fu-2 { animation: fadeUp 0.45s 0.15s ease both; }
        .fu-3 { animation: fadeUp 0.45s 0.25s ease both; }
      `}</style>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">

        {/* ── MASTHEAD ── */}
        <div className="border-b-2 border-[#1C1C1C] pb-6 mb-0 fu">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[9px] tracking-[0.28em] text-[#AAA] uppercase mb-3">
                UpForge · Share Your Thoughts
              </p>
              <h1
                className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] tracking-tight leading-[1.0] text-[#1C1C1C]"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                We Read Every<br />
                <em className="text-[#A89060] not-italic">Piece of Feedback</em>
              </h1>
            </div>
            <div className="pb-1 lg:text-right">
              <p className="text-[11px] text-[#888]">
                Anonymous submissions welcome.<br />
                Bugs, ideas, praise — all of it.
              </p>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="grid lg:grid-cols-3 gap-0 fu-2">

          {/* ── FORM ── */}
          <div className="lg:col-span-2 py-10 pr-0 lg:pr-12 border-r border-[#D5D0C8]">
            <div className="space-y-8 max-w-xl">

              {/* Category picker */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#888] mb-3">
                  What's this about? <span className="text-red-400">*</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const active = form.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, category: cat.id }))}
                        className={`flex items-start gap-2.5 p-3.5 border text-left transition-all ${
                          active
                            ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                            : "bg-white border-[#D5D0C8] hover:border-[#1C1C1C] text-[#555]"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                            active ? "text-[#E8C547]" : "text-[#AAA]"
                          }`}
                        />
                        <div>
                          <p className={`text-[11px] font-bold leading-none mb-0.5 ${active ? "text-white" : "text-[#1C1C1C]"}`}>
                            {cat.label}
                          </p>
                          <p className={`text-[9px] leading-snug ${active ? "text-white/50" : "text-[#AAA]"}`}>
                            {cat.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Star rating */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#888] mb-3">
                  Rate your experience
                  <span className="text-[#BBB] font-normal normal-case tracking-normal ml-1">(optional)</span>
                </p>
                <StarRating value={rating} onChange={setRating} />
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#888] mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </p>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Rahul Sharma"
                    className={inputCls}
                  />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#888] mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </p>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@startup.in"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#888] mb-1.5">
                  Your Feedback <span className="text-red-400">*</span>
                </p>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us what's on your mind — the more specific, the better."
                  rows={6}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {error && (
                <p className="text-[11px] text-red-500">{error}</p>
              )}

              {/* Submit */}
              <div className="flex items-center justify-between pt-1">
                <p className="text-[10px] text-[#BBB]">
                  Or email:{" "}
                  <a
                    href="mailto:contact@upforge.in"
                    className="text-[#888] hover:text-[#1C1C1C] underline underline-offset-2 transition-colors"
                  >
                    contact@upforge.in
                  </a>
                </p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid || loading}
                  className={`flex items-center gap-2 px-7 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    isValid && !loading
                      ? "bg-[#1C1C1C] text-white hover:bg-[#333]"
                      : "bg-[#EEEAE3] text-[#BBB] cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…</>
                  ) : (
                    <><MessageSquare className="w-3.5 h-3.5" /> Send Feedback</>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="py-10 lg:pl-10 fu-3">
            <div className="space-y-7">

              {/* Why we ask */}
              <div className="border border-[#D5D0C8] bg-white p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA] mb-4">
                  Why feedback matters
                </p>
                <div className="space-y-3">
                  {[
                    "Every submission is personally read by the UpForge team — not filtered by AI.",
                    "Bug reports are triaged within 24 hours.",
                    "Feature suggestions go directly into our product roadmap review.",
                    "We reply to everyone who leaves an email — genuinely.",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#666] leading-snug">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark trust block */}
              <div className="bg-[#1C1C1C] p-6">
                <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-[0.2em] mb-3">
                  Built by founders, for founders
                </p>
                <p className="text-[12px] text-white/60 leading-relaxed mb-4"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  UpForge is independent. No VC pressure, no growth-at-all-costs mandate. Your feedback directly shapes what we build next.
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </div>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                    Actively maintained
                  </span>
                </div>
              </div>

              {/* Quick links */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA] mb-3">
                  Related
                </p>
                <div className="space-y-0 divide-y divide-[#EEEAE3]">
                  {[
                    { label: "Contact us",          href: "/contact" },
                    { label: "FAQ",                 href: "/faq" },
                    { label: "List your startup",   href: "/submit" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between py-2.5 group"
                    >
                      <span className="text-[12px] text-[#666] group-hover:text-[#1C1C1C] transition-colors">
                        {item.label}
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#CCC] group-hover:text-[#888] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
