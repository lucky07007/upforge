// app/partner-program/partner-program-client.tsx
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
  Video,
  DollarSign,
  Award,
  Zap,
} from "lucide-react"

const AMAZON_URL = "https://www.amazon.in/dppui/pay-select?ie=UTF8&ASIN.0=B0HCH7FT9G&isPaymentInstrumentSelected=0&isPreorder=0&message=Customer+needs+to+set+his+credit+card+details.+DOS+Error+Code+%3D+PAYMENT_PORTAL_VALIDATION_ERROR&result=need-payment-plan-update&asin=B0HCH7FT9G&displayedPrice=199.0&displayedPriceCurrency=INR&displayedPriceCurrencyCode=INR&site=AnywhereTouch&_token=gx4%2FgbEOnJ56%2Fx%2F5%2FzkN4kInTQpgiZo7UFP8to0snmhcAAAAAQAAAABqbdbycmF3AAAAAKs%2BFBXVfD4nuL9rqj%2BOIQ%3D%3D&collectShippingAddress=1&clientId=dbs&t=fiona&isSeriesPurchase=0&device.encryptedDeviceAccountId=A045774474ZGJGYI6DNQ&transactionContext=checkout&paymentPlanId=amzn1.pc.pma.djItTGkxcG43MFBuOTFHSHJNTmdrSlJvdw&paymentContractId=amzn1.pc.pma.djItTGkxcG43MFBuOTFHSHJNTmdrSlJvdw&destinationPath=%2Fapi%2Fbifrost%2Facquisitions%2Fv1%2Factions%2Farn%3Aaction%3Abifrost%3Adbs%3A1%3AQjBIQ0g3RlQ5RzpCdXk6bnVsbDoxOTkuMDA6SU5S%3Fcsrf%3Dg0I8eoZ0jAzJYb53PdxhYBaM%252F42HWAuCiJNaDgArqsiEAAAAAQAAAABqbdT6cmF3AAAAAKs%252BFBXVfD4nuL9rqj%252BOIQ%253D%253D%26x-client-id%3Debook-dp-buyingexperience%26payment.paymentPlanId%3Damzn1.pc.pma.djItTGkxcG43MFBuOTFHSHJNTmdrSlJvdw&bifrost_enabled=1&payment.mode=checkout&items%5B0%5D.audibleNarration.audibleAsin=&submit.checkout-order.x=Buy+now++&x-client-id=ebook-dp-buyingexperience&ref_=dbs_p_ebk_w0m_pbcb_cvco00&csrf=g0I8eoZ0jAzJYb53PdxhYBaM%2F42HWAuCiJNaDgArqsiEAAAAAQAAAABqbdT6cmF3AAAAAKs%2BFBXVfD4nuL9rqj%2BOIQ%3D%3D&items%5B0%5D.audibleNarration.addNarration=0&items%5B0%5D.audibleNarration.audibleOurPrice="
const BOOK_COVER_URL = "https://images.upforge.org/the%20unfinished%20millionaire.jpg"
const WHATSAPP_LINK = "https://wa.link/gmntyi"
const YOUTUBE_EMBED_URL = "https://www.youtube-nocookie.com/embed/OfGIVOpGd4g"

export function PartnerProgramClient() {
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
      q: "Who is eligible for the UpForge Partner Program?",
      a: "Founders, tech ecosystem creators, startup analysts, and community leaders with an authentic audience. Any verified creator in our community can participate."
    },
    {
      q: "Do I have to buy the book to join UpForge's creator community?",
      a: "No. Community membership, your profile, and the spotlight rotation are free and open to everyone. The book is only required for this specific Partner Program."
    },
    {
      q: "Is this just a way to sell more books?",
      a: "We're transparent about it: the program increases book visibility, but the deal is completely fair. You get paid for content you make after genuinely reading the material, and you maintain 100% creative freedom."
    },
    {
      q: "What if my video is critical of the book?",
      a: "Honest, constructive content is welcomed. As long as it is genuine, original, and adheres to our community anti-fraud guidelines, critical takes are valid."
    },
    {
      q: "How are views verified and payouts calculated?",
      a: "Payouts are calculated transparently at ₹0.01 per verified organic view. Submissions pass through human audit and verification algorithms to filter out fake/bot traffic."
    },
    {
      q: "How fast is the verification process?",
      a: "Our processing SLA is within 1–2 business days after you send your Amazon Order ID, social handle, and full name on WhatsApp."
    }
  ]

  return (
    <div className="bg-background min-h-screen text-foreground font-serif">
      {/* HOMEPAGE LOOK - HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-amber-500/10 via-background to-background dark:from-amber-950/30 dark:via-background dark:to-background pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#C59A2E]/10 dark:bg-amber-500/10 blur-[120px] rounded-full" />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-[#C59A2E]/40 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C59A2E]" />
            <span className="text-xs font-mono font-bold text-[#C59A2E] dark:text-amber-400 uppercase tracking-widest">
              Official UpForge Partner Program
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight max-w-4xl mx-auto leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Become a Partner. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-600 via-[#C59A2E] to-amber-500 bg-clip-text text-transparent">
              Earn for Every Verified View.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-serif mb-8">
            Read the story. Understand the journey. Create authentic video content — and get paid <strong className="text-foreground">₹0.01 per verified view</strong> with complete transparency.
          </p>

          {/* Quick Hero Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Verify Purchase on WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 bg-card border border-border hover:bg-muted text-foreground font-bold text-xs uppercase tracking-widest rounded-full transition shadow-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#C59A2E]" />
              <span>Get Book on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>

          {/* SLA Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Fast Turnaround: 1–2 Days Verification SLA</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 space-y-16">
        
        {/* PROGRAM OVERVIEW VIDEO SECTION */}
        <section className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C59A2E] uppercase tracking-widest mb-3">
            <Video className="w-4 h-4" />
            <span>Official Video Walkthrough</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2
                className="text-2xl sm:text-3xl font-bold text-foreground"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Watch How the Program Works
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-serif">
                Watch our quick walkthrough video detailing how partner verification, Amazon Order ID submission, content creation, and view-based payouts operate.
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-muted-foreground font-sans">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59A2E] shrink-0" />
                  <span>Step-by-step verification guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59A2E] shrink-0" />
                  <span>Transparent payout criteria (₹0.01 / view)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59A2E] shrink-0" />
                  <span>Anti-fraud standards & rulebook details</span>
                </div>
              </div>
            </div>

            {/* YouTube Embed Container */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl ring-1 ring-amber-500/20">
                <iframe
                  className="w-full h-full"
                  src={YOUTUBE_EMBED_URL}
                  title="UpForge Partner Program Overview & Walkthrough Video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>    
          </div>
        </section>

        {/* FULL TRANSPARENCY UPFRONT */}
        <section className="bg-card border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C59A2E] uppercase tracking-wider mb-2">
            <Info className="w-4 h-4" />
            <span>Full Transparency, Upfront</span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Clear Terms Before You Get Started:
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-foreground mb-1">
                  Kindle Purchase Required for Payouts
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To participate in view payouts, you must own &quot;The Unfinished Millionaire&quot; on Kindle so content stems from real engagement.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-foreground mb-1">
                  Community & Registry Stay 100% Free
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your creator listing, profile, and registry access are free for everyone without any purchase obligation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-foreground mb-1">
                  No Forced Amazon Ratings or Reviews
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We never require Amazon reviews. We only ask for original social video content sharing your perspective.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-foreground mb-1">
                  Verified Organic Views Only
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No minimum follower barrier. Payouts are calculated transparently based on audited organic audience reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS + FEATURED BOOK CARD */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 5 STEPS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C59A2E]">
                Step-by-step Process
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-foreground mt-1 mb-2"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Follow these 5 transparent steps to join the program and start earning.
              </p>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#C59A2E] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    Get the book on Amazon Kindle.
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Read it at your own pace. This is the sole prerequisite for entering this specific Partner Program.
                  </p>
                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C59A2E] font-bold hover:underline"
                  >
                    View Kindle Edition on Amazon <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#C59A2E] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    Verify your purchase via WhatsApp.
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Message our verification team with your <strong className="text-foreground">Amazon Order ID</strong>, <strong className="text-foreground">social media handle</strong>, and <strong className="text-foreground">full name</strong>.
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    Send Order ID on WhatsApp <MessageCircle className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#C59A2E] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    Get approved (1–2 Days SLA).
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our verification manager audits the Order ID against genuine Amazon purchase logs and confirms your entry within 1–2 business days.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#C59A2E] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    Create your original video content.
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Record a video — a review, reaction, or breakdown of the author&apos;s journey. Tag <strong className="text-foreground">@UpForge</strong> and mention <strong className="text-foreground">UpForge</strong> so we can track engagement.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#C59A2E] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    Post organically & receive weekly payouts.
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Post to your organic audience. Views are manually audited before weekly payouts at ₹0.01 per verified organic view.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FEATURED BOOK COVER & DIRECT ACTION CARD (5 cols) */}
          <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl sticky top-24">
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C59A2E] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Featured Book Prerequisite
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-mono">
                  <Clock className="w-3 h-3" /> 1–2 Days SLA
                </span>
              </div>

              {/* BOOK COVER IMAGE DISPLAY */}
              <div className="relative w-full max-w-[220px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-border mb-6 group">
                <img
                  src={BOOK_COVER_URL}
                  alt="The Unfinished Millionaire Book Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="text-center mb-6">
                <h3
                  className="text-xl font-bold text-foreground mb-1"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  The Unfinished Millionaire
                </h3>
                <p className="text-xs text-muted-foreground">
                  Required title for the Official UpForge Partner Program
                </p>
              </div>

              {/* DIRECT ACTION BUTTONS */}
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
                  className="w-full py-3 bg-muted hover:bg-muted/80 text-foreground font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 border border-border"
                >
                  <BookOpen className="w-4 h-4 text-[#C59A2E]" />
                  <span>Get Kindle Edition on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C59A2E]" />
                <span>Program Guidelines</span>
              </span>
              <button
                onClick={() => setShowRulebookModal(true)}
                className="text-xs font-bold text-[#C59A2E] hover:underline flex items-center gap-1"
              >
                <span>Read Full Rules</span> →
              </button>
            </div>
          </div>

        </section>

        {/* EARNINGS PER VERIFIED VIEW */}
        <section className="bg-slate-900 dark:bg-black rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Transparent Compensation Matrix</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Earnings Per Verified View
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Approved posts only · Paid weekly · No minimum follower cap
              </p>
            </div>
            <span className="text-xs text-amber-300 font-mono uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full font-bold">
              Base Rate: ₹0.01 per verified view
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-all group">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">
                10,000 Views
              </p>
              <p className="font-serif font-black text-4xl text-amber-300 group-hover:scale-105 transition-transform">
                ₹100
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">Paid directly to creator</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                Popular
              </div>
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">
                1,00,000 Views
              </p>
              <p className="font-serif font-black text-4xl text-amber-300 group-hover:scale-105 transition-transform">
                ₹1,000
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">Paid directly to creator</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-all group">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">
                10,00,000 Views
              </p>
              <p className="font-serif font-black text-4xl text-amber-300 group-hover:scale-105 transition-transform">
                ₹10,000
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">Paid directly to creator</p>
            </div>
          </div>
        </section>

        {/* ANTI-FRAUD DISQUALIFICATION RULES */}
        <section className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Program Rules & Safeguards</span>
            </div>
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              What Gets You Disqualified
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              We protect editorial integrity and real creators. The following practices lead to immediate disqualification:
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-3 font-sans text-xs">
            {[
              "Views or engagement from bought, boosted, or ad-panel sources",
              "Views from click farms, bot networks, or view-exchange groups",
              "Fake, purchased, or reciprocal engagement (like-for-like, comment pods)",
              "Reposting or duplicating another creator's content as your own",
              "Any content that misrepresents the book, the author, or UpForge"
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-card border border-rose-100 dark:border-rose-900/30 text-foreground">
                <span className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-2xl bg-card border border-rose-300/40 dark:border-rose-800/40 text-xs text-muted-foreground leading-relaxed italic">
            Every video submission undergoes human audit before view verification. Repeated fraud attempts result in permanent removal from all UpForge creator programs.
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#C59A2E]" />
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="border border-border rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-foreground flex items-center justify-between gap-4 bg-muted/30 hover:bg-muted/60 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border bg-card">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="text-center p-8 md:p-12 rounded-3xl border border-border bg-gradient-to-r from-amber-500/10 via-card to-amber-500/10 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#C59A2E]/30 mb-4">
            <Award className="w-3.5 h-3.5 text-[#C59A2E]" />
            <span className="text-[10px] font-mono font-bold text-[#C59A2E] uppercase tracking-widest">
              Ready to Get Started?
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Join the UpForge Partner Program Today
          </h2>

          <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 font-serif">
            Get the book on Amazon, send your Order ID on WhatsApp, and begin creating authentic content to earn ₹0.01 per verified view.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Verify Order on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-card hover:bg-muted text-foreground border border-border font-mono text-xs uppercase tracking-widest font-bold rounded-full transition shadow-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#C59A2E]" />
              Get Book on Amazon <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </section>

      </div>

      {/* RULEBOOK MODAL */}
      {showRulebookModal && (
        <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="w-6 h-6 text-[#C59A2E]" />
                <h3 className="font-serif font-bold text-lg text-foreground">
                  Official UpForge Partner Guidelines
                </h3>
              </div>
              <button
                onClick={() => setShowRulebookModal(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed font-sans">
              <p className="font-semibold text-foreground">
                Summary of UpForge Partner Program Rules & Standard Operating Procedures:
              </p>
              
              <ul className="space-y-3 list-disc pl-4">
                <li><strong>Kindle Purchase Required:</strong> Must own &quot;The Unfinished Millionaire&quot; on Kindle to qualify for view payouts.</li>
                <li><strong>No Forced Ratings or Reviews:</strong> You are NOT required to review on Amazon. Focus strictly on original social video content.</li>
                <li><strong>WhatsApp Verification:</strong> Send your Order ID, handle, and name to https://wa.link/gmntyi. Processing SLA is 1–2 business days.</li>
                <li><strong>Content Scope:</strong> Tag @UpForge and mention UpForge in video content. Honest commentary is welcomed.</li>
                <li><strong>Zero Tolerance for Fraud:</strong> Ad-panels, bots, or reciprocal pods lead to permanent removal.</li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-end gap-3">
              <button
                onClick={handleDownloadRulebook}
                className="px-4 py-2 bg-[#C59A2E] hover:bg-[#A8821E] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download (.TXT)
              </button>
              <button
                onClick={() => setShowRulebookModal(false)}
                className="px-4 py-2 bg-muted text-foreground font-bold text-xs uppercase tracking-wider rounded-xl transition hover:bg-muted/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
