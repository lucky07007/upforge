import React from "react";
import { 
  Rocket, 
  ShieldCheck, 
  Map, 
  Zap, 
  Layers, 
  Users, 
  ArrowLeft,
  Download,
  CheckCircle2,
  Calendar,
  Milestone
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function StartupPlanTemplate() {
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
                  <Rocket className="h-5 w-5 text-[#c6a43f]" />
                </div>
                <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#c6a43f]">
                  Registry Standard Template: SP-V1
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter leading-tight text-slate-900 uppercase">
                The Strategic <br />
                <span className="text-slate-400 italic font-medium">Startup Plan.</span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
                Vision ko reality mein badalne ke liye ek rigorous operational framework. Yeh koi business plan nahi hai, yeh execution ka blueprint hai.
              </p>
            </div>

            {/* ========== THE PLAN STRUCTURE (PREVIEW) ========== */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-inner">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
                
                {/* Internal Doc Header */}
                <div className="bg-slate-950 p-10 text-white flex justify-between items-start border-b-4 border-[#c6a43f]">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">[ENTITY NAME]</h2>
                    <p className="text-[#c6a43f] text-[10px] font-bold tracking-[0.4em] uppercase mt-2">Operational Roadmap · FY 2026-27</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                    <Layers className="h-3 w-3 text-[#c6a43f]" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Master Blueprint</span>
                  </div>
                </div>

                <div className="p-10 space-y-16">
                  {/* Section 1: The Thesis */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-l-2 border-slate-200 pl-4">01. Core Thesis</h3>
                    <div className="grid md:grid-cols-2 gap-10">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Market Inefficiency</p>
                        <p className="text-slate-800 text-sm leading-relaxed font-medium">
                          [Explain exactly what is broken in the current market and why it cannot be fixed by incumbents.]
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">The Solution Strike</p>
                        <p className="text-slate-800 text-sm leading-relaxed font-medium">
                          [Describe your surgical approach to capturing this value through technology or distribution.]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Milestones Ledger */}
                  <div className="space-y-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-l-2 border-slate-200 pl-4">02. Execution Milestones</h3>
                    <div className="grid gap-4">
                      <MilestoneRow status="Complete" phase="Phase 01" task="Alpha Infrastructure & Initial Validation" date="Q4 2025" />
                      <MilestoneRow status="In Progress" phase="Phase 02" task="Scale Distribution & Ecosystem Integration" date="Q1 2026" />
                      <MilestoneRow status="Pending" phase="Phase 03" task="Revenue Optimization & Market Dominance" date="Q3 2026" />
                    </div>
                  </div>

                  {/* Section 3: Distribution Engine */}
                  <div className="grid md:grid-cols-3 gap-8 border-t border-slate-100 pt-10">
                    <div className="md:col-span-2 space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 border-l-2 border-slate-200 pl-4">03. Growth Engine</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                          <Zap className="h-5 w-5 text-[#c6a43f] mb-4" />
                          <h4 className="text-[10px] font-black uppercase mb-2">Acquisition</h4>
                          <p className="text-xs text-slate-500 font-medium">[Channel Strategy]</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                          <Users className="h-5 w-5 text-[#c6a43f] mb-4" />
                          <h4 className="text-[10px] font-black uppercase mb-2">Retention</h4>
                          <p className="text-xs text-slate-500 font-medium">[Flywheel Logic]</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-950 p-8 rounded-2xl text-white flex flex-col justify-between">
                      <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#c6a43f]">Risk Analysis</h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium mt-4 italic">
                        "Execution is the only moat that matters in the Bharat-Tech ecosystem."
                      </p>
                      <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-[#c6a43f]" />
                      </div>
                    </div>
                  </div>

                  {/* Doc Footer */}
                  <div className="pt-8 border-t border-slate-100 flex justify-between items-center opacity-30">
                    <div className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-400">UpForge Strategy Vault // 2026</div>
                    <div className="h-1 w-10 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* ========== WHY THIS WORKS ========== */}
            <div className="mt-24 grid md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h4 className="font-black uppercase tracking-widest text-slate-900 text-sm mb-4">Precision Logic</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Bina kisi faltu words ke, yeh plan sirf un points par focus karta hai jo execution ke liye zaroori hain.</p>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-slate-900 text-sm mb-4">Registry Aligned</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Aapke UpForge profile ke metrics aur goals ke saath sync rehne ke liye optimize kiya gaya hai.</p>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-slate-900 text-sm mb-4">Founder's Ledger</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Internal teams aur stakeholders ko dikhane ke liye sabse professional structured document.</p>
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

function MilestoneRow({ status, phase, task, date }: { status: string, phase: string, task: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 group hover:bg-white transition-all">
      <div className="flex items-center gap-4">
        <div className={`h-2 w-2 rounded-full ${status === 'Complete' ? 'bg-emerald-500' : status === 'In Progress' ? 'bg-[#c6a43f]' : 'bg-slate-200'}`} />
        <span className="text-[10px] font-black uppercase text-slate-400 w-16">{phase}</span>
        <span className="text-sm font-bold text-slate-800">{task}</span>
      </div>
      <span className="text-[10px] font-bold text-slate-400 font-mono">{date}</span>
    </div>
  );
}
