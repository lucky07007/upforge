import React from "react";
import { 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Briefcase, 
  Globe,
  ArrowLeft,
  Download,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function InvestorBriefTemplate() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />

      <main className="relative pt-2">
        <section className="pt-8 sm:pt-12 pb-20 sm:pb-32 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            
            {/* ========== NAVIGATION & ACTIONS ========== */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-slate-100 pb-8">
              <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-colors">
                <ArrowLeft className="h-3 w-3" /> Back to Intelligence
              </Link>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full px-6 border-slate-200 text-[10px] font-black uppercase tracking-widest h-10">
                  <Download className="mr-2 h-3 w-3" /> Export PDF
                </Button>
                <Button className="rounded-full px-6 bg-black text-white text-[10px] font-black uppercase tracking-widest h-10 shadow-lg">
                  Use This Template
                </Button>
              </div>
            </div>

            {/* ========== DOCUMENT HEADER ========== */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#c6a43f]/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-[#c6a43f]" />
                </div>
                <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#c6a43f]">
                  Registry Standard Template: IB-V2
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter leading-tight text-slate-900 uppercase">
                The Institutional <br />
                <span className="text-slate-400 italic font-medium">Investor Brief.</span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
                A structured executive summary designed to bridge the gap between founder vision and institutional capital requirements. High-density, zero-fluff.
              </p>
            </div>

            {/* ========== THE BRIEF STRUCTURE (PREVIEW) ========== */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-inner">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Internal Doc Header */}
                <div className="bg-slate-950 p-10 text-white flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">[ENTITY NAME]</h2>
                    <p className="text-[#c6a43f] text-[10px] font-bold tracking-[0.4em] uppercase mt-2">Executive Summary · Q1 2026</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                    <ShieldCheck className="h-3 w-3 text-[#c6a43f]" />
                    <span className="text-[9px] font-black uppercase tracking-widest">UpForge Verified</span>
                  </div>
                </div>

                <div className="p-10 space-y-12">
                  {/* Section 1: The Core */}
                  <div className="grid md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">01. Mission Critical</h3>
                      <p className="text-slate-800 font-bold text-xl leading-snug">
                        [Provide a 2-sentence summary of the specific problem you are solving and why your solution is the definitive market response.]
                      </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Investment Ask</h3>
                      <div className="text-2xl font-black text-slate-900">$[Amount]</div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">[Round Tier / Equity %]</p>
                    </div>
                  </div>

                  {/* Section 2: Traction Ledger */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">02. Traction Ledger</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <MetricCard label="Revenue (ARR)" value="$--M" icon={TrendingUp} />
                      <MetricCard label="Growth (MoM)" value="--%" icon={BarChart3} />
                      <MetricCard label="Unit Economics" value="--x" icon={Target} />
                      <MetricCard label="Burn Rate" value="$--k" icon={Briefcase} />
                    </div>
                  </div>

                  {/* Section 3: Strategic Moat */}
                  <div className="grid md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">03. Competitive Moat</h3>
                      <ul className="space-y-3">
                        {["Proprietary Tech", "Distribution Advantage", "Founder-Market Fit"].map((moat, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-[#c6a43f]" /> {moat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">04. Use of Capital</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Allocation focused on [R&D, Sales Scaling, Operations] to reach [Next Milestone] within [Timeframe].
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-8 border-t border-slate-100 flex justify-between items-center opacity-50">
                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Generated via UpForge Intelligence</div>
                    <Globe className="h-4 w-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* ========== WHY THIS WORKS ========== */}
            <div className="mt-24 grid md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h4 className="font-black uppercase tracking-widest text-slate-900 text-sm mb-4">Signal over Noise</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Investors spend 3.4 minutes on a pitch. This brief ensures they hit the high-conviction points in under 60 seconds.</p>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-slate-900 text-sm mb-4">Institutional Trust</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Using a standardized registry format signals that you respect the investor's time and process.</p>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-slate-900 text-sm mb-4">Registry Sync</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Directly pull data from your UpForge profile to keep metrics updated in real-time across your Brief.</p>
              </div>
            </div>

          </div>
        </section>

        <div className="py-12 text-center text-[10px] tracking-[0.6em] uppercase text-slate-400 font-black border-t border-slate-100">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>

      <Footer />
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center md:text-left">
      <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
        <Icon className="h-3 w-3 text-slate-400" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      </div>
      <div className="text-lg font-black text-slate-900">{value}</div>
    </div>
  );
}
