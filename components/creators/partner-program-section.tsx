// components/creators/partner-program-section.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Download,
  AlertTriangle,
  MessageCircle,
  Clock,
  HelpCircle,
  ChevronDown,
  Info,
  X,
  BadgeCheck,
  ArrowRight,
} from "lucide-react"

const AMAZON_URL = "https://www.amazon.in/dppui/pay-select?ie=UTF8&ASIN.0=B0HCH7FT9G&isPaymentInstrumentSelected=0&isPreorder=0&message=Customer+needs+to+set+his+credit+card+details.+DOS+Error+Code+%3D+PAYMENT_PORTAL_VALIDATION_ERROR&result=need-payment-plan-update&asin=B0HCH7FT9G&displayedPrice=199.0&displayedPriceCurrency=INR&displayedPriceCurrencyCode=INR&site=AnywhereTouch&_token=gx4%2FgbEOnJ56%2Fx%2F5%2FzkN4kInTQpgiZo7UFP8to0snmhcAAAAAQAAAABqbdbycmF3AAAAAKs%2BFBXVfD4nuL9rqj%2BOIQ%3D%3D&collectShippingAddress=1&clientId=dbs&t=fiona&isSeriesPurchase=0&device.encryptedDeviceAccountId=A045774474ZGJGYI6DNQ&transactionContext=checkout&paymentPlanId=amzn1.pc.pma.djItTGkxcG43MFBuOTFHSHJNTmdrSlJvdw&paymentContractId=amzn1.pc.pma.djItTGkxcG43MFBuOTFHSHJNTmdrSlJvdw&destinationPath=%2Fapi%2Fbifrost%2Facquisitions%2Fv1%2Factions%2Farn%3Aaction%3Abifrost%3Adbs%3A1%3AQjBIQ0g3RlQ5RzpCdXk6bnVsbDoxOTkuMDA6SU5S%3Fcsrf%3Dg0I8eoZ0jAzJYb53PdxhYBaM%252F42HWAuCiJNaDgArqsiEAAAAAQAAAABqbdT6cmF3AAAAAKs%252BFBXVfD4nuL9rqj%252BOIQ%253D%253D%26x-client-id%3Debook-dp-buyingexperience%26payment.paymentPlanId%3Damzn1.pc.pma.djItTGkxcG43MFBuOTFHSHJNTmdrSlJvdw&bifrost_enabled=1&payment.mode=checkout&items%5B0%5D.audibleNarration.audibleAsin=&submit.checkout-order.x=Buy+now++&x-client-id=ebook-dp-buyingexperience&ref_=dbs_p_ebk_w0m_pbcb_cvco00&csrf=g0I8eoZ0jAzJYb53PdxhYBaM%2F42HWAuCiJNaDgArqsiEAAAAAQAAAABqbdT6cmF3AAAAAKs%2BFBXVfD4nuL9rqj%2BOIQ%3D%3D&items%5B0%5D.audibleNarration.addNarration=0&items%5B0%5D.audibleNarration.audibleOurPrice="
const BOOK_COVER_URL = "https://images.upforge.org/the%20unfinished%20millionaire.jpg"
const WHATSAPP_LINK = "https://wa.link/gmntyi"

export function PartnerProgramSection() {
  const [showRulebookModal, setShowRulebookModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleDownloadRulebook = () => {
    const rulebookText = `===========================================================
UPFORGE CREATOR PARTNER PROGRAM — OFFICIAL GUIDELINES
Official Web: https://upforge.org | ISO Verified Program
===========================================================

1. GET THE BOOK ON AMAZON KINDLE
   - Read "The Unfinished Millionaire" at your own pace.
   - This is the only prerequisite for this specific Partner Program.

2. VERIFY YOUR PURCHASE
   - Click the WhatsApp Verification link (https://wa.link/gmntyi).
   - Send our verification desk your Amazon Order ID, social handle (@username), and full name.

3. GET APPROVED (SLA: WITHIN 1-2 DAYS)
   - Our team verifies the Order ID against genuine purchase records.
   - Confirmation is sent via WhatsApp within 1–2 days.

4. AUTHENTIC CONTENT CREATION
   - Create original video content (review, reaction, breakdown of author's journey).
   - Tag @UpForge and mention UpForge in the post.
   - NOTE: We DO NOT require or ask for Amazon ratings/reviews. Keep the ask strictly to social video content.

5. PAYOUTS & DISQUALIFICATION RULES
   - Payout rate: ₹0.01 per verified organic view (Paid weekly).
   - Strict Anti-Fraud Policy: Views from bought sources, click farms, bot networks, or reciprocal engagement will lead to immediate disqualification.

===========================================================
© 2026 UpForge Global Registry. All Rights Reserved.
`
    const blob = new Blob([rulebookText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "UpForge_Partner_Program_Guidelines.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const faqItems = [
    {
      q: "Do I have to buy the book to join UpForge's creator community?",
      a: "No. Community membership, your profile, and the spotlight rotation are free and open to everyone. The book is only required for this specific Partner Program."
    },
    {
      q: "Is this just a way to sell more books?",
      a: "We're not going to pretend the program doesn't help book visibility — it does. But the exchange is honest: you get paid for content you'd only make after genuinely reading and engaging with the material, and you keep full creative control over what you say."
    },
    {
      q: "What if my video is critical of the book?",
      a: "Honest content is fine, as long as it's genuinely yours and follows the disqualification rules above. This isn't a program that only accepts praise."
    },
    {
      q: "How fast is verification?",
      a: "Within 1–2 days after you send your Order ID, handle, and name on WhatsApp."
    }
  ]

  return (
    <section className="border-b border-border bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/20 dark:via-background dark:to-background">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-16 space-y-14">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C59A2E]" />
            <span className="text-[11px] font-mono font-bold text-[#C59A2E] dark:text-amber-400 uppercase tracking-widest">
              Official UpForge Partner Program
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Become a Partner. Earn for Every Verified View.
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-serif max-w-2xl mx-auto mb-6">
            Read the story. Understand the journey. Create content that&apos;s genuinely yours — and get paid for the organic reach it earns.
          </p>
        </div>

        {/* 2. FULL TRANSPARENCY, UPFRONT */}
        <div className="bg-white dark:bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C59A2E] dark:text-amber-400 uppercase tracking-wider mb-2">
            <Info className="w-4 h-4" />
            <span>Full Transparency, Upfront</span>
          </div>
          <h2
            className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            We&apos;d rather over-explain this than have anyone feel misled later:
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  This program requires a Kindle purchase.
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  There&apos;s no way around that — it&apos;s how we verify you&apos;ve engaged with the actual material, not a technicality we&apos;re hiding.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  You are never required to buy anything to be part of the UpForge Creator Community.
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The registry, profile listing, and spotlight rotation are open and free.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  We&apos;re not asking for reviews or ratings.
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The program is about original video content — your take on the author&apos;s journey, the ideas in the book, or anything genuinely related to it. What you post on Amazon (if anything) is entirely up to you.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Payouts are based on real, verified organic views only.
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  No follower count minimums, no forced quotas, no pressure to &quot;sell&quot; anything in your content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. HOW IT WORKS + BOOK SHOWCASE & VERIFICATION CARD */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 5 STEPS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C59A2E] dark:text-amber-400">
                Step-by-step Process
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-2"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                How It Works
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Follow these 5 transparent steps to participate and start earning per view.
              </p>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Get the book on Amazon.
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                    Read it at your own pace. This is the only prerequisite for the Partner Program specifically.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Verify your purchase.
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    WhatsApp link had been provided just message our verification team with your <strong className="text-slate-900 dark:text-white">Amazon Order ID</strong>, <strong className="text-slate-900 dark:text-white">social media handle</strong>, and <strong className="text-slate-900 dark:text-white">full name</strong>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Get approved.
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Our Program Manager checks the order ID against genuine purchase records and confirms your entry — <strong className="text-slate-900 dark:text-white">typically within 1–2 days</strong>. You&apos;ll get a confirmation message either way.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Create your content.
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Make a video — a review, a reaction, a breakdown of the author&apos;s journey, anything honestly related to the book or its themes. Tag <strong className="text-slate-900 dark:text-white">@UpForge</strong> and mention <strong className="text-slate-900 dark:text-white">UpForge</strong> in the post so we can track it.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Post organically. Get paid per verified view.
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    No boosting, no paid promotion, no bought engagement — just your real audience. Views are manually verified before they count toward earnings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FEATURED BOOK COVER + DIRECT WHATSAPP ACTION CARD (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl sticky top-24">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C59A2E] dark:text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Featured Program Title
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-mono">
                  <Clock className="w-3 h-3" /> 1–2 Days Verification SLA
                </span>
              </div>

              {/* BOOK COVER IMAGE DISPLAY */}
              <div className="relative w-full max-w-[220px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 mb-6 group">
                <img
                  src={BOOK_COVER_URL}
                  alt="The Unfinished Millionaire Book Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="text-center mb-6">
                <h3
                  className="text-xl font-bold text-slate-900 dark:text-white mb-1"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  The Unfinished Millionaire
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Required reading for the Official UpForge Creator Partner Program
                </p>
              </div>

              {/* DIRECT ACTION BUTTONS (NO FORM) */}
              <div className="space-y-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>Verify Purchase on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Get Kindle Edition on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Program Guidelines</span>
              </span>
              <button
                onClick={() => setShowRulebookModal(true)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Read Full Rules</span> →
              </button>
            </div>
          </div>

        </div>

        {/* 4. EARNINGS PER VERIFIED VIEW */}
        <div className="bg-slate-900 dark:bg-black rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold font-serif text-white mb-1">
                Earnings Per Verified View
              </h2>
              <p className="text-xs text-slate-400">
                Approved posts only · Paid weekly
              </p>
            </div>
            <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Rate: ₹0.01 per verified view
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-amber-500/40 transition">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">
                10,000 Views
              </p>
              <p className="font-serif font-black text-3xl text-amber-300">
                ₹100
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-amber-500/40 transition">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">
                1,00,000 Views
              </p>
              <p className="font-serif font-black text-3xl text-amber-300">
                ₹1,000
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-amber-500/40 transition">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">
                10,00,000 Views
              </p>
              <p className="font-serif font-black text-3xl text-amber-300">
                ₹10,000
              </p>
            </div>
          </div>
        </div>

        {/* 5. PROGRAM RULES — WHAT GETS YOU DISQUALIFIED */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Program Rules</span>
            </div>
            <h2
              className="text-2xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              What Gets You Disqualified
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              We built this for genuine creators, and we protect it like one. The following will get a submission (or a creator&apos;s standing in the program) disqualified:
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-3 font-sans text-xs">
            {[
              "Views or engagement from bought, boosted, or ad-panel sources",
              "Views from click farms, bot networks, or view-exchange groups",
              "Fake, purchased, or reciprocal engagement (like-for-like, comment pods, etc.)",
              "Reposting or duplicating another creator's content as your own",
              "Any content that misrepresents the book, the author, or UpForge"
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-rose-100 dark:border-rose-900/30 text-slate-800 dark:text-slate-200">
                <span className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-rose-300/40 dark:border-rose-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
            Every submission is manually reviewed before views are counted. If something looks off, we&apos;ll ask before we assume — but repeated violations mean permanent removal from the program.
          </div>
        </div>

        {/* 6. QUICK FAQ */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#C59A2E]" />
            <h2
              className="text-2xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Quick FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      {faq.a}
                    </div>
                  )}
                </div>
              )}
            )}
          </div>
        </div>

      </div>

      {/* RULEBOOK MODAL */}
      {showRulebookModal && (
        <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="w-6 h-6 text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Official UpForge Partner Guidelines
                </h3>
              </div>
              <button
                onClick={() => setShowRulebookModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              <p className="font-semibold text-slate-900 dark:text-white">
                Summary of UpForge Partner Program Rules & Standard Operating Procedures:
              </p>
              
              <ul className="space-y-3 list-disc pl-4">
                <li><strong>Kindle Purchase Required:</strong> Must own &quot;The Unfinished Millionaire&quot; on Kindle to participate in payouts.</li>
                <li><strong>No Forced Ratings or Reviews:</strong> You are NOT required to review on Amazon. Focus strictly on original social video content.</li>
                <li><strong>WhatsApp Verification:</strong> Send your Order ID, handle, and name to https://wa.link/gmntyi. Processing SLA is 1–2 days.</li>
                <li><strong>Content Scope:</strong> Tag @UpForge and mention UpForge in video content. Honest commentary is welcomed.</li>
                <li><strong>Zero Tolerance for Fraud:</strong> Ad-panels, bots, or reciprocal pods lead to permanent removal.</li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={handleDownloadRulebook}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download (.TXT)
              </button>
              <button
                onClick={() => setShowRulebookModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
