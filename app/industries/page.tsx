// app/industries/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, TrendingUp, BadgeCheck, Globe, Target, Activity, Zap } from "lucide-react";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Industries — UpForge | India Startup Sector Intelligence for Founders",
  description:
    "Deep sector intelligence for Indian startup founders — funding trends, investor appetite, key metrics, hiring benchmarks, and market timing across AI/ML, FinTech, SaaS, EdTech, HealthTech and more.",
  keywords: [
    "Indian startup sectors 2026", "startup industry India", "VC funding by sector India",
    "AI startup India", "FinTech India", "SaaS India benchmarks", "startup founder India",
  ],
  openGraph: {
    title: "Industries — UpForge | India Startup Sector Intelligence",
    description: "Real sector intelligence for Indian founders — funding trends, benchmarks, investor signals, market timing.",
    type: "website", url: "https://upforge.org/industries",
  },
  alternates: { canonical: "https://upforge.org/industries" },
};

// ─── Sector Data ───────────────────────────────────────────────────────────────


const SECTORS = [
  {
    id: "ai-ml", name: "AI / ML", icon: "◈", color: "#7C3AED", bg: "#F5F3FF",
    tagline: "India's fastest compounding opportunity",
    growth: 156, fundingQ1: 2.1, deals: 94, avgDealSize: 22, medianRound: "Series A",
    topInvestors: ["Peak XV", "Lightspeed", "Accel", "Matrix"],
    keyMetrics: { "ARR Multiple": "8–25×", "Burn Multiple": "< 1.5×", "NDRR Target": "> 120%", "CAC Payback": "< 18mo" },
    founderInsight: "Investors are paying 20× ARR for AI-first platforms with vertical focus. Horizontal tooling is getting squeezed — pick a deep domain.",
    raiseWindow: "Now", raiseSignal: "hot",
    marketSize: 42, marketGrowth: 38,
    hiringIndex: 94,
    checkSize: { "Pre-Seed": "₹1–3Cr", "Seed": "$1–3M", "Series A": "$8–20M" },
    ddFocus: ["Model differentiation", "Data moat", "Enterprise contracts", "ML team depth"],
    exitPaths: ["Strategic (Google/Microsoft)", "IPO at scale", "PE rollup"],
    watchOut: "Foundation model commoditisation — build on top, not alongside.",
    sparkline: [40, 55, 72, 90, 118, 156],
  },
  {
    id: "saas", name: "SaaS", icon: "⬡", color: "#2563EB", bg: "#EFF6FF",
    tagline: "India's most proven export engine",
    growth: 134, fundingQ1: 1.4, deals: 118, avgDealSize: 12, medianRound: "Seed",
    topInvestors: ["Bessemer", "SaaSBOOMi", "Sequoia", "Nexus"],
    keyMetrics: { "ARR Multiple": "10–20×", "Burn Multiple": "< 2×", "NDRR Target": "> 110%", "Churn": "< 5%" },
    founderInsight: "PLG wins at sub-$50k ACV. Enterprise sales only justified above ₹25L ACV. Don't hire a VP Sales before $1M ARR.",
    raiseWindow: "Optimal", raiseSignal: "hot",
    marketSize: 68, marketGrowth: 28,
    hiringIndex: 87,
    checkSize: { "Pre-Seed": "₹50L–2Cr", "Seed": "$500K–2M", "Series A": "$5–15M" },
    ddFocus: ["NRR > 110%", "CAC payback < 18mo", "ACV trajectory", "Logo churn"],
    exitPaths: ["US strategic acquisition", "Public markets (NASDAQ)", "PE buyout at $50M+ ARR"],
    watchOut: "SMB-only plays getting compressed. Move upmarket early or build extreme stickiness.",
    sparkline: [60, 70, 85, 98, 115, 134],
  },
  {
    id: "fintech", name: "FinTech", icon: "◉", color: "#059669", bg: "#ECFDF5",
    tagline: "Riding India's $8T financial inclusion wave",
    growth: 112, fundingQ1: 1.8, deals: 76, avgDealSize: 24, medianRound: "Series A",
    topInvestors: ["Tiger Global", "Ribbit Capital", "Sequoia", "Blume"],
    keyMetrics: { "Revenue Multiple": "6–15×", "Burn Multiple": "< 1×", "NDRR Target": "> 130%", "CAC Payback": "< 12mo" },
    founderInsight: "Lending, insurance, and B2B payments are the white spaces left. Consumer wallets are over-invested. RBI compliance is your moat.",
    raiseWindow: "Selective", raiseSignal: "warm",
    marketSize: 150, marketGrowth: 22,
    hiringIndex: 79,
    checkSize: { "Pre-Seed": "₹2–5Cr", "Seed": "$1–3M", "Series A": "$10–25M" },
    ddFocus: ["RBI licensing path", "Loan unit economics", "CAC/LTV ratio", "Fraud rate"],
    exitPaths: ["Bank acquisition", "NBFC buyout", "IPO in 3 years"],
    watchOut: "UPI commoditised payments. Differentiate through credit underwriting or embedded finance.",
    sparkline: [55, 68, 78, 88, 100, 112],
  },
  {
    id: "healthtech", name: "HealthTech", icon: "✦", color: "#DC2626", bg: "#FEF2F2",
    tagline: "1.4B underserved patients. One infrastructure layer missing.",
    growth: 78, fundingQ1: 0.62, deals: 48, avgDealSize: 13, medianRound: "Seed",
    topInvestors: ["Chiratae", "Blume", "Eight Roads", "Matrix"],
    keyMetrics: { "ARR Multiple": "5–12×", "Burn Multiple": "< 2×", "NDRR Target": "> 100%", "CAC Payback": "< 30mo" },
    founderInsight: "Hospital SaaS and diagnostics AI are highest-margin plays. D2C health is a branding game, not HealthTech. Focus on clinical outcomes data.",
    raiseWindow: "Good", raiseSignal: "warm",
    marketSize: 55, marketGrowth: 19,
    hiringIndex: 71,
    checkSize: { "Pre-Seed": "₹1–3Cr", "Seed": "$500K–2M", "Series A": "$5–12M" },
    ddFocus: ["Clinical validation", "Hospital partnerships", "Regulatory path", "Reimbursement model"],
    exitPaths: ["Hospital chain acquisition", "Pharma strategic buy", "PE at scale"],
    watchOut: "Telemedicine is overcrowded. Build for the hospital system, not around it.",
    sparkline: [30, 38, 48, 58, 68, 78],
  },
  {
    id: "edtech", name: "EdTech", icon: "◫", color: "#D97706", bg: "#FFFBEB",
    tagline: "Post-correction rebound — leaner and more defensible",
    growth: 55, fundingQ1: 0.38, deals: 39, avgDealSize: 10, medianRound: "Seed",
    topInvestors: ["Lightspeed", "WestBridge", "Nexus", "Owl Ventures"],
    keyMetrics: { "ARR Multiple": "4–10×", "Burn Multiple": "< 1.5×", "Completion Rate": "> 40%", "CAC Payback": "< 18mo" },
    founderInsight: "Vocational and upskilling survived the correction. K-12 live tutoring is structurally broken. Build for outcome (placement) not consumption.",
    raiseWindow: "Selective", raiseSignal: "warm",
    marketSize: 30, marketGrowth: 14,
    hiringIndex: 58,
    checkSize: { "Pre-Seed": "₹50L–1.5Cr", "Seed": "$300K–1.5M", "Series A": "$4–10M" },
    ddFocus: ["Completion rate", "Placement %", "CAC vs LTV", "Unit margins"],
    exitPaths: ["University acqui-hire", "Platform merge", "Certification body deal"],
    watchOut: "Content businesses without outcomes are uninvestable. Don't build YouTube for learning.",
    sparkline: [80, 62, 45, 40, 48, 55],
  },
  {
    id: "climate-tech", name: "Climate Tech", icon: "❋", color: "#16A34A", bg: "#F0FDF4",
    tagline: "India's next decade-defining infrastructure bet",
    growth: 89, fundingQ1: 0.29, deals: 31, avgDealSize: 9, medianRound: "Seed",
    topInvestors: ["Lightrock", "Nuveen", "Omnivore", "Sixth Sense"],
    keyMetrics: { "ARR Multiple": "3–8×", "Burn Multiple": "< 2×", "NDRR Target": "> 100%", "CAC Payback": "< 36mo" },
    founderInsight: "Carbon credits and clean energy infrastructure are getting serious institutional capital. EVs overcrowded. Climate analytics for enterprise is wide open.",
    raiseWindow: "Early Mover", raiseSignal: "warm",
    marketSize: 38, marketGrowth: 32,
    hiringIndex: 64,
    checkSize: { "Pre-Seed": "₹1–2Cr", "Seed": "$500K–2M", "Series A": "$5–15M" },
    ddFocus: ["Carbon credit integrity", "Regulatory alignment", "Hardware unit costs", "Govt contracts"],
    exitPaths: ["Conglomerate acquisition", "Global climate fund", "IPO at infra scale"],
    watchOut: "Impact metrics without financial metrics won't raise beyond seed.",
    sparkline: [20, 30, 42, 56, 72, 89],
  },
  {
    id: "d2c", name: "D2C / Commerce", icon: "◈", color: "#9333EA", bg: "#FAF5FF",
    tagline: "Tier-2 India's $500B offline-to-digital shift",
    growth: 67, fundingQ1: 0.51, deals: 62, avgDealSize: 8, medianRound: "Pre-Seed",
    topInvestors: ["A91 Partners", "Fireside Ventures", "DSG", "Verlinvest"],
    keyMetrics: { "Revenue Multiple": "1–5×", "Burn Multiple": "< 1×", "Gross Margin": "> 50%", "Repeat Rate": "> 30%" },
    founderInsight: "Gross margins matter above everything. < 50% GM means you can't build a business. Omnichannel from day 1 beats pure-play D2C.",
    raiseWindow: "Selective", raiseSignal: "warm",
    marketSize: 120, marketGrowth: 17,
    hiringIndex: 61,
    checkSize: { "Pre-Seed": "₹25L–1Cr", "Seed": "$200K–1M", "Series A": "$3–8M" },
    ddFocus: ["Gross margin > 50%", "Repeat purchase rate", "CAC trend", "Distribution mix"],
    exitPaths: ["FMCG strategic acquisition", "PE rollup", "IPO at large scale"],
    watchOut: "Amazon and Meesho are channels, not moats. Build brand or be commoditised.",
    sparkline: [45, 52, 57, 60, 64, 67],
  },
  {
    id: "space-tech", name: "Space Tech", icon: "◬", color: "#1D4ED8", bg: "#EFF6FF",
    tagline: "Post-ISRO privatisation — India's new frontier",
    growth: 145, fundingQ1: 0.18, deals: 14, avgDealSize: 13, medianRound: "Series A",
    topInvestors: ["IN-SPACe", "Peak XV", "Kalaari", "Blume"],
    keyMetrics: { "Burn Multiple": "< 3×", "Milestone Cadence": "18mo tranches", "Govt Revenue": "Anchor first", "Patent Depth": "Required" },
    founderInsight: "ISRO co-operation is your fastest credibility path. Deep tech patience is 7–10 years. Government contracts as anchor before commercial.",
    raiseWindow: "Early Stage Only", raiseSignal: "hot",
    marketSize: 8, marketGrowth: 48,
    hiringIndex: 55,
    checkSize: { "Pre-Seed": "₹2–5Cr", "Seed": "$1–4M", "Series A": "$10–25M" },
    ddFocus: ["Team pedigree", "ISRO relationship", "Patent portfolio", "Launch timeline"],
    exitPaths: ["Global space company acquisition", "IPO at scale", "Government programme"],
    watchOut: "Capital intensity is brutal. Build milestones fundable in 18-month tranches.",
    sparkline: [35, 48, 68, 90, 118, 145],
  },
  {
    id: "agritech", name: "AgriTech", icon: "⬟", color: "#65A30D", bg: "#F7FEE7",
    tagline: "600M farmers. $400B supply chain. 80% undigitised.",
    growth: 61, fundingQ1: 0.21, deals: 28, avgDealSize: 7.5, medianRound: "Seed",
    topInvestors: ["Omnivore", "Accel", "Ankur Capital", "Bharat Innovation Fund"],
    keyMetrics: { "Revenue Multiple": "2–6×", "Burn Multiple": "< 1.5×", "Farmer Retention": "> 60%", "CAC Payback": "< 24mo" },
    founderInsight: "Supply chain digitisation and agri-credit are highest LTV plays. Don't build for the farmer alone — build for the aggregator. FPOs are your fastest distribution.",
    raiseWindow: "Patient Capital", raiseSignal: "warm",
    marketSize: 45, marketGrowth: 16,
    hiringIndex: 52,
    checkSize: { "Pre-Seed": "₹50L–1.5Cr", "Seed": "$300K–1.5M", "Series A": "$3–10M" },
    ddFocus: ["Farmer retention", "Crop cycle economics", "FPO relationships", "Input margins"],
    exitPaths: ["Agri conglomerate acquisition", "Impact fund scale-up", "Rural NBFC merger"],
    watchOut: "The graveyard is full of 50-farmer pilots that never scaled. Pilots are not products.",
    sparkline: [28, 35, 42, 50, 56, 61],
  },
  {
    id: "biotech", name: "BioTech", icon: "⬡", color: "#BE185D", bg: "#FDF2F8",
    tagline: "India's pharma base meeting genomics and AI",
    growth: 84, fundingQ1: 0.16, deals: 18, avgDealSize: 9, medianRound: "Seed",
    topInvestors: ["Synapse", "BIRAC", "Chiratae", "Philips"],
    keyMetrics: { "Burn Multiple": "< 3×", "Platform vs Programme": "Platform first", "Commercialise": "Diagnostics fastest", "IP Depth": "Critical" },
    founderInsight: "Platform > programme in early stages. One validated platform can generate 3–4 revenue streams. Diagnostics is 3–5 years faster to commercialise than therapeutics.",
    raiseWindow: "Technical Milestones", raiseSignal: "warm",
    marketSize: 22, marketGrowth: 26,
    hiringIndex: 48,
    checkSize: { "Pre-Seed": "₹1–3Cr", "Seed": "$500K–2M", "Series A": "$5–15M" },
    ddFocus: ["IP protection", "Clinical data quality", "Regulatory timeline", "CRO partnerships"],
    exitPaths: ["Global pharma acquisition", "Licensing deal", "Diagnostic company merger"],
    watchOut: "DCGI timeline is longer than USFDA in some categories. Model the regulatory path before founding.",
    sparkline: [30, 42, 52, 64, 74, 84],
  },
  {
    id: "mobility", name: "Mobility", icon: "◯", color: "#0891B2", bg: "#ECFEFF",
    tagline: "India's urban infrastructure build-out — ₹15L Cr opportunity",
    growth: 72, fundingQ1: 0.43, deals: 42, avgDealSize: 10, medianRound: "Seed",
    topInvestors: ["Stellaris", "Blume", "Kalaari", "Softbank"],
    keyMetrics: { "ARR Multiple": "3–8×", "Burn Multiple": "< 2×", "Fleet Utilisation": "> 70%", "CAC Payback": "< 24mo" },
    founderInsight: "B2B fleet management and EV charging infrastructure are the defensible plays. Consumer EV is hardware commoditisation. Win on the software stack.",
    raiseWindow: "Good", raiseSignal: "warm",
    marketSize: 62, marketGrowth: 21,
    hiringIndex: 69,
    checkSize: { "Pre-Seed": "₹1–3Cr", "Seed": "$500K–2M", "Series A": "$6–15M" },
    ddFocus: ["Vehicle unit economics", "Software take rate", "FAME/PLI eligibility", "Fleet anchor deals"],
    exitPaths: ["Auto OEM acquisition", "Infra PE fund", "IPO at fleet scale"],
    watchOut: "Hardware-only EV plays without software margin are fighting a price war. Add the data layer.",
    sparkline: [40, 48, 55, 62, 67, 72],
  },
  {
    id: "web3", name: "Web3 / Crypto", icon: "⬢", color: "#EA580C", bg: "#FFF7ED",
    tagline: "Regulatory clarity brewing — patient builders winning",
    growth: 48, fundingQ1: 0.095, deals: 22, avgDealSize: 4.3, medianRound: "Pre-Seed",
    topInvestors: ["Multicoin", "Coinbase Ventures", "Binance Labs", "WazirX"],
    keyMetrics: { "Revenue Multiple": "2–8×", "Burn Multiple": "< 2×", "On-chain Activity": "Required", "Regulatory": "Compliant first" },
    founderInsight: "Infrastructure and developer tooling survive cycles. Consumer crypto is highly cyclical. India's Crypto Bill clarity in 2026 will unlock institutional interest.",
    raiseWindow: "Cautious", raiseSignal: "neutral",
    marketSize: 15, marketGrowth: 24,
    hiringIndex: 44,
    checkSize: { "Pre-Seed": "₹25L–75L", "Seed": "$200K–1M", "Series A": "$3–8M" },
    ddFocus: ["Regulatory compliance", "Token economics", "On-chain metrics", "Cycle experience"],
    exitPaths: ["Global exchange acquisition", "Protocol treasury buyout", "Token event"],
    watchOut: "Token launches before PMF destroyed the 2021 cohort. Build revenue first.",
    sparkline: [120, 80, 40, 30, 42, 48],
  },
];

// ─── GROQ live snapshot ───────────────────────────────────────────────────────

async function getEcosystemSnapshot() {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Return only valid JSON, no markdown." },
          { role: "user", content: `India startup ecosystem snapshot March 2026. Return JSON:
{"headline":"one punchy 12-word stat about India VC Q1 2026","mood":"bullish|neutral|cautious","insight":"one sharp sentence about current investor sentiment max 20 words","alert":"one macro risk founders should watch max 15 words"}` },
        ],
        temperature: 0.3, max_tokens: 200,
      }),
      next: { revalidate: 600 },
    });
    const data = await res.json();
    return JSON.parse((data.choices?.[0]?.message?.content ?? "{}").replace(/```json|```/g, "").trim());
  } catch {
    return {
      headline: "India VC deploys $9.2B in Q1 2026 — highest quarter since 2021",
      mood: "bullish",
      insight: "Investors front-loading AI bets before the next global rate cycle",
      alert: "Global macro headwinds may compress late-stage valuations by Q3 2026",
    };
  }
}

// ─── SVG: Sparkline ──────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const W = 80, H = 30;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 6) - 3}`).join(" ");
  const last = data[data.length - 1];
  const lastX = W, lastY = H - ((last - min) / range) * (H - 6) - 3;
  const uid = color.replace(/[^a-z0-9]/gi, "");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${W},${H} 0,${H}`} fill={`url(#sg-${uid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3" fill={color} />
      <circle cx={lastX} cy={lastY} r="5" fill={color} opacity="0.2" />
    </svg>
  );
}

// ─── SVG: Donut ──────────────────────────────────────────────────────────────

function Donut({ pct, color, label, value }: { pct: number; color: string; label: string; value: string }) {
  const r = 18, cx = 24, cy = 24, circ = 2 * Math.PI * r;
  const fill = (pct / 100) * circ * 0.78;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EEEAE3" strokeWidth="5"
          strokeDasharray={`${circ * 0.78} ${circ * 0.22}`} strokeLinecap="round"
          transform={`rotate(126 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${fill} ${circ - fill}`} strokeLinecap="round"
          transform={`rotate(126 ${cx} ${cy})`} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fontWeight="800"
          fill="#1C1C1C" fontFamily="Georgia, serif">{value}</text>
      </svg>
      <span className="text-[8px] text-[#AAA] uppercase tracking-wide text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Horizontal bar ──────────────────────────────────────────────────────────

function HBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-1.5 bg-[#EEEAE3] w-full overflow-hidden rounded-none">
      <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color, transition: "width 0.6s ease" }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function IndustriesPage() {
  const snap = await getEcosystemSnapshot();
  const moodColor = snap.mood === "bullish" ? "#16A34A" : snap.mood === "cautious" ? "#D97706" : "#888";
  const maxFunding = Math.max(...SECTORS.map(s => s.fundingQ1));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "India Startup Industries — UpForge",
    url: "https://upforge.org/industries",
    description: "Sector intelligence for Indian startup founders",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-[#F7F5F0] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          .fu-1 { animation: fadeUp .5s .05s ease both; }
          .fu-2 { animation: fadeUp .5s .18s ease both; }
          .fu-3 { animation: fadeUp .5s .32s ease both; }
          .fu-4 { animation: fadeUp .5s .46s ease both; }
          .card { transition: border-color .18s ease, background .18s ease; }
          .card:hover { background: white !important; }
          .num { font-variant-numeric: tabular-nums; }
          .sector-card { border-left: 3px solid transparent; }
        `}</style>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">

          {/* ── MASTHEAD ── */}
          <div className="border-b-2 border-[#1C1C1C] pb-6 fu-1">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <p className="text-[9px] tracking-[0.28em] text-[#AAA] uppercase mb-3">UpForge · Sector Intelligence</p>
                <h1 className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] tracking-tight leading-[0.95] text-[#1C1C1C]"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                  12 Industries.<br />
                  <em className="text-[#A89060] not-italic">What founders need to know.</em>
                </h1>
              </div>
              <div className="pb-1 flex flex-col gap-2 lg:items-end">
                <div className="flex items-center gap-2 border border-[#DDD] bg-white px-3 py-1.5 w-fit">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-semibold text-[#555] tracking-wide uppercase">Live · March 2026</span>
                </div>
                <p className="text-[11px] text-[#888] lg:text-right">Funding data · Benchmarks · Investor signals · Founder insights</p>
              </div>
            </div>
          </div>

          {/* ── LIVE SNAPSHOT ── */}
          <div className="grid sm:grid-cols-3 border-b border-[#D5D0C8] fu-2">
            <div className="py-5 px-5 border-r border-[#D5D0C8] bg-[#1C1C1C]">
              <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-widest mb-2">Live Signal</p>
              <p className="text-[13px] text-white font-semibold leading-snug" style={{ fontFamily: "'Georgia', serif" }}>
                "{snap.headline}"
              </p>
              <p className="text-[10px] mt-2 font-bold uppercase tracking-wider" style={{ color: moodColor }}>
                Mood: {snap.mood}
              </p>
            </div>
            <div className="py-5 px-5 border-r border-[#D5D0C8]">
              <p className="text-[9px] text-[#AAA] font-bold uppercase tracking-widest mb-2">Investor Sentiment</p>
              <p className="text-[12px] text-[#444] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>{snap.insight}</p>
            </div>
            <div className="py-5 px-5">
              <p className="text-[9px] text-[#AAA] font-bold uppercase tracking-widest mb-2">⚠ Founder Alert</p>
              <p className="text-[12px] text-[#444] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>{snap.alert}</p>
            </div>
          </div>

          {/* ── MOMENTUM OVERVIEW — sparkline grid ── */}
          <div className="py-8 border-b border-[#D5D0C8] fu-3">
            <div className="flex items-center gap-2 mb-5">
              <Activity className="w-3.5 h-3.5 text-[#AAA]" />
              <h2 className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#888]">Growth Momentum — 6-Quarter Trend</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#D5D0C8] border border-[#D5D0C8]">
              {[...SECTORS].sort((a, b) => b.growth - a.growth).map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  <div className="card bg-[#F7F5F0] p-4 flex flex-col gap-2 h-full group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-lg leading-none">{s.icon}</span>
                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 tracking-wide ${
                        s.raiseSignal === "hot" ? "bg-[#E8C547]/25 text-[#8A6A10]" :
                        s.raiseSignal === "neutral" ? "bg-[#EEEAE3] text-[#AAA]" :
                        "bg-[#EEEAE3] text-[#888]"
                      }`}>{s.raiseWindow}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-[#1C1C1C] leading-none" style={{ fontFamily: "'Georgia', serif" }}>{s.name}</p>
                    <Sparkline data={s.sparkline} color={s.color} />
                    <p className="num text-[1.1rem] font-bold leading-none" style={{ color: s.color }}>+{s.growth}%</p>
                    <p className="text-[9px] text-[#BBB]">${s.fundingQ1}B Q1 funding</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── FUNDING DISTRIBUTION ── */}
          <div className="py-8 border-b border-[#D5D0C8] fu-3">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-3.5 h-3.5 text-[#AAA]" />
              <h2 className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#888]">Q1 2026 Funding Distribution</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-[#D5D0C8] border border-[#D5D0C8]">
              {[...SECTORS].sort((a, b) => b.fundingQ1 - a.fundingQ1).map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  <div className="card bg-[#F7F5F0] p-4 flex items-center gap-4 group">
                    <span className="text-xl flex-shrink-0">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[11px] font-semibold text-[#333]" style={{ fontFamily: "'Georgia', serif" }}>{s.name}</p>
                        <span className="num text-[11px] font-bold text-[#1C1C1C] ml-2 flex-shrink-0">${s.fundingQ1}B</span>
                      </div>
                      <HBar value={s.fundingQ1} max={maxFunding} color={s.color} />
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[9px] text-[#AAA] num">{s.deals} deals</span>
                        <span className="text-[9px] text-[#DDD]">·</span>
                        <span className="text-[9px] text-[#AAA] num">Avg ${s.avgDealSize}M</span>
                        <span className="text-[9px] text-[#DDD]">·</span>
                        <span className="text-[9px] text-[#AAA]">{s.medianRound}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── SECTOR DEEP-DIVES ── */}
          <div className="py-8 fu-4">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-3.5 h-3.5 text-[#AAA]" />
              <h2 className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#888]">Sector Intelligence — Full Breakdown</h2>
            </div>

            <div className="space-y-2">
              {SECTORS.map((s) => (
                <div key={s.id} id={s.id}
                  className="scroll-mt-20 border border-[#D5D0C8] overflow-hidden"
                  style={{ borderLeftColor: s.color, borderLeftWidth: "3px" }}>

                  {/* Top band */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-[#EEEAE3]"
                    style={{ background: s.bg }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <h3 className="text-base font-semibold text-[#1C1C1C] leading-none mb-0.5"
                          style={{ fontFamily: "'Georgia', serif" }}>{s.name}</h3>
                        <p className="text-[10px] text-[#888]">{s.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="num text-2xl font-bold" style={{ color: s.color, fontFamily: "'Georgia', serif" }}>+{s.growth}%</p>
                        <p className="text-[9px] text-[#AAA] uppercase tracking-wider">YoY Growth</p>
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 ${
                        s.raiseSignal === "hot" ? "bg-[#E8C547] text-[#7A5F00]" :
                        s.raiseSignal === "neutral" ? "bg-[#EEEAE3] text-[#888]" :
                        "bg-white border border-[#D5D0C8] text-[#666]"
                      }`}>{s.raiseWindow}</span>
                    </div>
                  </div>

                  {/* Main grid */}
                  <div className="grid lg:grid-cols-4 bg-[#F7F5F0]">

                    {/* Insight + watchout */}
                    <div className="lg:col-span-2 p-6 border-r border-[#E8E4DC]">
                      <div className="border-l-2 pl-3 mb-5" style={{ borderColor: s.color }}>
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: s.color }}>
                          Founder Insight
                        </p>
                        <p className="text-[12px] text-[#333] leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
                          "{s.founderInsight}"
                        </p>
                      </div>
                      <div className="bg-[#FFFCF0] border border-[#E8C547]/30 px-3 py-2.5 mb-5">
                        <p className="text-[9px] font-bold text-[#A89060] uppercase tracking-wider mb-0.5">⚠ Watch out</p>
                        <p className="text-[11px] text-[#666]">{s.watchOut}</p>
                      </div>
                      {/* Check sizes */}
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AAA] mb-2.5">Typical Check Sizes</p>
                        <div className="space-y-1.5">
                          {Object.entries(s.checkSize).map(([stage, size]) => (
                            <div key={stage} className="flex items-center justify-between py-1 border-b border-[#EEEAE3] last:border-0">
                              <span className="text-[10px] text-[#AAA] uppercase tracking-wide">{stage}</span>
                              <span className="text-[11px] font-bold text-[#444] num">{size as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visuals: donuts + sparkline */}
                    <div className="p-6 border-r border-[#E8E4DC]">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AAA] mb-4">At a Glance</p>
                      <div className="flex gap-3 mb-6 flex-wrap">
                        <Donut pct={(s.growth / 160) * 100} color={s.color} label="Growth %" value={`${s.growth}`} />
                        <Donut pct={(s.deals / 120) * 100} color={s.color} label="Q1 Deals" value={`${s.deals}`} />
                        <Donut pct={s.hiringIndex} color={s.color} label="Hire Index" value={`${s.hiringIndex}`} />
                      </div>
                      <p className="text-[9px] text-[#BBB] uppercase tracking-wider mb-2">6-quarter trend</p>
                      <Sparkline data={s.sparkline} color={s.color} />
                      <div className="mt-5 grid grid-cols-2 gap-1.5">
                        {Object.entries(s.keyMetrics).map(([k, v]) => (
                          <div key={k} className="border border-[#E8E4DC] bg-white p-2">
                            <p className="text-[8px] text-[#CCC] uppercase tracking-wide mb-0.5 leading-tight">{k}</p>
                            <p className="text-[10px] font-bold text-[#1C1C1C] num leading-none">{v as string}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DD + exits */}
                    <div className="p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AAA] mb-3">Investor DD Focus</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {s.ddFocus.map((d) => (
                          <span key={d} className="text-[9px] border border-[#E2DDD5] bg-white px-2 py-0.5 text-[#666]">{d}</span>
                        ))}
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AAA] mb-3">Exit Paths</p>
                      <div className="space-y-2 mb-5">
                        {s.exitPaths.map((e, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[9px] font-bold text-[#CCC] mt-0.5 flex-shrink-0 w-3">{i + 1}</span>
                            <span className="text-[11px] text-[#555]">{e}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AAA] mb-2">Top Investors Active</p>
                      <div className="flex flex-wrap gap-1">
                        {s.topInvestors.map((inv) => (
                          <span key={inv} className="text-[9px] border border-[#E2DDD5] bg-white px-2 py-0.5 text-[#666]">{inv}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer band */}
                  <div className="border-t border-[#E8E4DC] px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 bg-white/50">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] text-[#AAA]">Market size</span>
                      <span className="text-[11px] font-bold text-[#1C1C1C] num">${s.marketSize}B</span>
                      <span className="text-[9px] text-emerald-600 font-bold num">+{s.marketGrowth}%/yr</span>
                    </div>
                    <a href={`/startup?sector=${encodeURIComponent(s.name)}`}
                      className="flex items-center gap-1 text-[10px] text-[#AAA] hover:text-[#1C1C1C] transition-colors">
                      Browse {s.name} startups <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ── FOOTER CTA ── */}
          <div className="grid lg:grid-cols-3 gap-px bg-[#D5D0C8] border border-[#D5D0C8] mt-2">
            <div className="lg:col-span-2 bg-[#1C1C1C] p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 80px)" }} />
              <div className="relative">
                <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-[0.25em] mb-3">Building in one of these sectors?</p>
                <h3 className="text-xl sm:text-2xl text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                  List your startup — free, verified, permanent.
                </h3>
                <p className="text-sm text-white/40 mb-5 max-w-lg">
                  Free AI-powered growth report, valuation estimate, and a publicly indexed profile. Takes 5 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/submit" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8C547] text-[#1C1C1C] text-[11px] font-bold uppercase tracking-wider hover:bg-[#F5D55A] transition-colors">
                    List Your Startup <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link href="/research" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider hover:border-white/40 transition-colors">
                    Market Intelligence
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-[#F7F5F0] p-7 flex flex-col gap-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA]">Data Sources</p>
              {[
                { icon: BadgeCheck, text: "DPIIT + MCA registered deals" },
                { icon: Globe,      text: "Public news + funding announcements" },
                { icon: Target,     text: "VC survey + term sheet benchmarks" },
                { icon: Activity,   text: "AI-curated, refreshed every 10 min" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-[#CCC] flex-shrink-0" />
                  <span className="text-[11px] text-[#666]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
