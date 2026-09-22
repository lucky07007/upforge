"use client";

import React from "react";
import Link from "next/link";
import { Scale, Landmark, Gavel, ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-10 pb-24">
        
        {/* HEADER */}
        <section className="max-w-[1300px] mx-auto w-full mt-5 pb-6 flex flex-col items-center text-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
            <h1
              className="mast-h1 text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Terms of Registry
            </h1>

            <p className="mast-tagline font-serif italic text-base md:text-[17px] text-muted-foreground max-w-lg mb-2 leading-relaxed">
              The legal framework governing data integrity, UFRN allocation, and institutional utilization of the Global Index.
            </p>
          </div>
        </section>


        <main className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
            
            {/* Main Legal Content */}
            <div className="space-y-8 text-center md:text-left">


              {/* Section 1 */}
              <section className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-8 shadow-xs">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-3xl font-serif italic text-muted-foreground/40">
                    01
                  </span>

                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 font-mono">
                    Binding Acceptance
                  </h2>
                </div>

                <div className="font-serif text-[17px] leading-[1.8] text-foreground">
                  <p>
                    Utilization of the UpForge Global Registry constitutes a <strong>legally binding agreement</strong> to these Protocols. Users agree to utilize data solely for lawful due diligence, research, and professional analysis.
                  </p>
                </div>
              </section>


              {/* Section 2 */}
              <section className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-8 shadow-xs">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-3xl font-serif italic text-muted-foreground/40">
                    02
                  </span>

                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 font-mono">
                    Data Integrity & UFRN
                  </h2>
                </div>

                <div className="font-serif text-[17px] leading-[1.8] text-foreground">
                  <p>
                    Founders are responsible for factual accuracy. Any deliberate misrepresentation results in immediate <strong>UFRN revocation</strong> and permanent exclusion from the Global Index.
                  </p>
                </div>
              </section>


              {/* Section 3 */}
              <section className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-8 shadow-xs">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-3xl font-serif italic text-muted-foreground/40">
                    03
                  </span>

                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 font-mono">
                    Intellectual Property
                  </h2>
                </div>

                <div className="font-serif text-[17px] leading-[1.8] text-foreground">
                  <p>
                    The "UpForge" name and "UFRN" system are exclusive intellectual property. Certified entities are granted a limited license to display their Registry Badge while status remains "Verified."
                  </p>
                </div>
              </section>


              {/* Section 4 */}
              <section className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-8 shadow-xs">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-3xl font-serif italic text-muted-foreground/40">
                    04
                  </span>

                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 font-mono">
                    Limitation of Liability
                  </h2>
                </div>

                <div className="font-serif text-[17px] leading-[1.8] text-foreground">
                  <p>
                    The registry is provided "as-is." UpForge does not guarantee the future performance of any listed entity. Independent financial auditing is advised for all users.
                  </p>
                </div>
              </section>

            </div>


            {/* Sidebar */}
            <aside className="space-y-8">

              <div className="border border-border/80 bg-card/90 rounded-3xl p-8 sticky top-10 shadow-sm text-center md:text-left">

                <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                  <ShieldCheck className="text-amber-500 w-5 h-5" />

                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
                    Jurisdiction
                  </h4>
                </div>
                
                <div className="space-y-8">

                  <SidebarItem 
                    icon={<Scale size={18}/>} 
                    title="Statutory Law" 
                    desc="Governed by the IT Act 2000 and data treaty standards." 
                  />

                  <SidebarItem 
                    icon={<Gavel size={18}/>} 
                    title="Exclusive Seat" 
                    desc="Disputes subject to exclusive jurisdiction of Mumbai Courts." 
                  />

                </div>
                
                <div className="pt-8 mt-12 border-t border-border/60">
                  <Link href="/contact" className="flex items-center justify-between group">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                      Legal Inquiry
                    </span>

                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform text-amber-500"
                    />
                  </Link>
                </div>

              </div>


              {/* Enforcement panel */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 text-foreground text-center md:text-left shadow-xs">

                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <AlertTriangle size={16} className="text-amber-500" />

                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    Enforcement
                  </h4>
                </div>

                <p className="text-[11px] font-serif leading-relaxed text-muted-foreground italic">
                  Violations lead to legal action and permanent blacklisting on the global ledger.
                </p>

              </div>

            </aside>

          </div>
        </main>


        <footer className="mt-16 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="font-mono font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            UpForge Global • Governance Division
          </p>

          <div className="flex gap-8 text-[10px] font-mono font-bold uppercase tracking-widest text-foreground">
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">
              Privacy Protocol
            </Link>

            <Link href="/contact" className="hover:text-amber-500 transition-colors">
              Contact Desk
            </Link>
          </div>

        </footer>

      </div>
    </div>
  );
}


function SidebarItem({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode,
  title: string,
  desc: string
}) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">

      <div className="text-accent shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="text-[12px] font-black uppercase tracking-wider mb-1">
          {title}
        </h4>

        <p className="text-[11px] text-muted-foreground leading-snug font-serif italic">
          {desc}
        </p>
      </div>

    </div>
  );
}
