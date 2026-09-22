// app/newsletter/page.tsx — UpForge Weekly Dispatch Subscription
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Zap,
  Globe,
  Sparkles,
  Check
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail("");
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground font-serif selection:bg-[#C59A2E]/20">
        
        {/* MASTHEAD */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10 pb-6 text-center flex flex-col items-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                WEEKLY ECOSYSTEM BRIEFING
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Weekly Dispatch
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-serif italic leading-relaxed">
              The pulse of serious builders. Join 18,600+ founders and institutional investors receiving verified registry intel every Sunday.
            </p>
          </div>
        </section>

        {/* MAIN SUBSCRIPTION CARD */}
        <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] border border-border/80 bg-card/90 rounded-3xl shadow-sm overflow-hidden">

            {/* FORM SIDE */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border/60 flex flex-col justify-center">
              {subscribed ? (
                <div className="flex flex-col items-center text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-amber-500" />
                  </div>

                  <h2 className="text-2xl font-bold text-foreground font-serif" style={{ fontFamily: "'Georgia', serif" }}>
                    Synced to Registry
                  </h2>

                  <p className="text-sm text-muted-foreground font-serif italic max-w-xs">
                    You're officially on the list. Next briefing arrives Sunday 08:00 IST.
                  </p>

                  <div className="pt-4">
                    <Link
                      href="/registry"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider rounded-full hover:bg-amber-500 hover:text-black transition-all"
                    >
                      Explore Global Registry <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                      SUBSCRIBE FOR INTEL
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
                    Direct to your inbox every Sunday morning
                  </h3>

                  <form onSubmit={handleSubscribe} className="space-y-4 pt-2">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Work Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@company.com"
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!email || loading}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-foreground hover:bg-amber-500 hover:text-black disabled:opacity-40 text-background rounded-2xl text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all shadow-sm"
                    >
                      {loading ? "Verifying..." : "Join The Dispatch"}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>

                  <p className="text-[11px] text-muted-foreground italic font-serif">
                    Strict privacy guarantee. No spam, ever. Unsubscribe at any time with one click.
                  </p>
                </div>
              )}
            </div>

            {/* PERKS SIDE */}
            <div className="bg-muted/40 p-8 md:p-12 flex flex-col justify-between gap-8 border-t lg:border-t-0 border-border/60">
              <div className="space-y-6">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">
                  Subscribers Receive
                </span>

                <Perk
                  icon={<Zap size={16} />}
                  title="Pre-Seed Intel"
                  desc="Direct registry highlights and breakthrough startups before market hype cycles begin."
                />

                <Perk
                  icon={<ShieldCheck size={16} />}
                  title="Verified Signals Only"
                  desc="Zero sponsored noise. Only audited corporate data points and real founder metrics."
                />

                <Perk
                  icon={<Globe size={16} />}
                  title="Global Taxonomy"
                  desc="Emerging tech markets mapped with institutional accuracy for cross-border capital."
                />
              </div>

              {/* STATS BAND */}
              <div className="pt-6 border-t border-border/60 grid grid-cols-3 gap-2 text-center">
                <Stat value="18.6K+" label="Readers" />
                <Stat value="42%" label="Open Rate" />
                <Stat value="Weekly" label="Frequency" />
              </div>
            </div>

          </div>
        </main>

        {/* FOOTER NOTE */}
        <footer className="pb-16 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            UpForge Independent Dispatch © 2026
          </span>
        </footer>

      </div>
    </>
  );
}

function Perk({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground font-serif leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-sm font-mono font-bold text-foreground">
        {value}
      </p>
      <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
        {label}
      </p>
    </div>
  );
}

