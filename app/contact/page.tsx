// app/contact/page.tsx — UpForge Registry Contact & Editorial Inquiries
"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  Mail,
  MessageSquare,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Clock
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update =
    (f: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((p) => ({ ...p, [f]: e.target.value }));

  const isValid = form.name && form.email && form.message;

  const handleSubmit = async () => {
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          title: form.title || "Inquiry",
          email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSent(true);
    } catch (err) {
      setError("Transmission failed. Please try again or use direct email.");
    } finally {
      setLoading(false);
    }
  };

  /* SUCCESS STATE */
  if (sent) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4 md:p-8 font-serif">
          <div className="bg-background border-2 border-foreground max-w-lg w-full p-8 md:p-12 text-center shadow-sm relative">
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
            </div>

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59A2E] block mb-2">
              Transmission Received
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Georgia', serif" }}>
              Inquiry Logged
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-serif">
              Thank you, <strong className="text-foreground">{form.name}</strong>. Your message has been routed to our editorial review desk.
            </p>

            <div className="bg-muted border border-[#C59A2E]/30 p-5 mb-8 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#C59A2E]">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Response Protocol</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Replies are sent to <strong className="text-foreground">{form.email}</strong> within 24-48 business hours.
              </p>
            </div>

            <Link
              href="/registry"
              className="inline-flex items-center justify-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors w-full"
            >
              Return to Registry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* MAIN PAGE */
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
                EDITORIAL DESK & INQUIRIES
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Contact the Registry
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-serif italic leading-relaxed">
              For registry disputes, profile verification updates, or partnership inquiries. Our editorial team operates with strict independence.
            </p>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

            {/* FORM CARD */}
            <div className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
              <div className="border-b border-border/60 pb-4">
                <h3 className="text-xl font-bold text-foreground font-serif" style={{ fontFamily: "'Georgia', serif" }}>
                  Submit Inquiry Transmission
                </h3>
                <p className="text-xs text-muted-foreground font-serif italic">
                  Fill out the details below to reach our analyst desk.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full Name" required>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </Field>

                <Field label="Email Address" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="jane@company.com"
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </Field>
              </div>

              <Field label="Nature of Inquiry">
                <select
                  value={form.title}
                  onChange={update("title")}
                  className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="">Select inquiry classification…</option>
                  <option value="Startup Verification">Startup Verification Request</option>
                  <option value="Data Correction">Registry Data Correction</option>
                  <option value="Partnership">Ecosystem Partnership</option>
                  <option value="Support">General Operational Support</option>
                </select>
              </Field>

              <Field label="Message Payload" required>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Provide context, UFRN identifier (if applicable), or inquiry payload..."
                  rows={5}
                  className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors resize-y font-serif"
                />
              </Field>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs font-mono">
                  ⚠️ {error}
                </div>
              )}

              <div className="pt-4 border-t border-border/60 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!isValid || loading}
                  className="inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 hover:text-black rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed text-background px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting…</>
                  ) : (
                    <>Send Transmission <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">

              {/* DIRECT CHANNELS */}
              <div className="border border-border/80 bg-card/90 rounded-3xl p-6 shadow-sm space-y-6">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 block">
                  Direct Communications
                </span>

                {/* EDITORIAL */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span>Editorial Review Desk</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-serif">Registry disputes & record updates:</p>
                  <a
                    href="mailto:support@upforge.org"
                    className="inline-block text-sm font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    support@upforge.org
                  </a>
                </div>

                <div className="h-px bg-border/60" />

                {/* PARTNERSHIPS */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Ecosystem & Partnerships</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-serif">Institutional collaborations & media:</p>
                  <a
                    href="mailto:partners@upforge.org"
                    className="inline-block text-sm font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    partners@upforge.org
                  </a>
                </div>

                <div className="h-px bg-border/60" />

                {/* WHATSAPP */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 text-[#22C55E] font-mono text-xs font-bold">
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Desk</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-serif">
                    Urgent verification or profile status check?
                  </p>
                  <a
                    href="https://wa.link/x6uu80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#22C55E] hover:bg-[#1ea34d] text-white rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Start WhatsApp Chat
                  </a>
                </div>
              </div>

              {/* OPERATIONAL HOURS */}
              <div className="border border-border/80 bg-muted/40 rounded-2xl p-5 text-center shadow-xs">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                  Desk SLA & Hours
                </span>
                <p className="text-xs font-serif text-foreground">
                  Mon – Fri · 10:00 – 18:00 IST<br />
                  <span className="text-muted-foreground text-[11px] italic">Typical turn-around: 24-48 business hours</span>
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}

