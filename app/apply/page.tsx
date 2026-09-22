// app/apply/page.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Globe,
  Rocket,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      );
      setIsSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white text-black min-h-screen">
      {/* Navbar and Footer are in global layout. Calling them here causes double rendering */}

      <main className="relative pt-2">
        <section className="pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Context & Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 text-center lg:text-left"
              >
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="h-px w-10 bg-[#c6a43f]/20 hidden sm:block"></span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c6a43f]">
                    VAULT REGISTRY APPLICATION
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] text-slate-900">
                  Join the <br />
                  <span className="text-slate-400 italic font-medium">Registry.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Apply for verification to gain institutional trust and connect with the top 1% of the Indian startup ecosystem.
                </p>

                <div className="space-y-6 pt-4 max-w-md mx-auto lg:mx-0">
                  <BenefitItem
                    icon={ShieldCheck}
                    title="Verified Status"
                    desc="Achieve institutional trust for your startup profile."
                  />
                  <BenefitItem
                    icon={Globe}
                    title="Elite Syndicate"
                    desc="Direct access to high-tier builders and capital."
                  />
                  <BenefitItem
                    icon={Rocket}
                    title="Scale Channels"
                    desc="Priority listing for curated investor networking."
                  />
                </div>

                {/* Decorative seal */}
                <div className="hidden lg:flex items-center gap-4 pt-8 border-t border-slate-100">
                  <div className="space-y-0.5">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-slate-400 font-black">
                      Identity Ledger v2.4
                    </p>
                    <p className="text-[7px] text-slate-300 font-bold font-mono">
                      HASH_AUTH: 0xFD91...883
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:sticky lg:top-24"
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 sm:p-10"
                    >
                      <div className="mb-8 space-y-2">
                        <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">Founder Submission</h2>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <p className="text-slate-400 text-[9px] uppercase tracking-widest font-black">
                            SSL Secured Entry
                          </p>
                        </div>
                      </div>

                      <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Legal Name</label>
                            <Input
                              name="from_name"
                              placeholder="e.g. Lucky Tiwari"
                              required
                              className="h-14 border-slate-100 focus:border-[#c6a43f] rounded-2xl text-xs font-bold"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Entity Name</label>
                            <Input
                              name="business_name"
                              placeholder="e.g. UpForge, Zerodha, Groww"
                              required
                              className="h-14 border-slate-100 focus:border-[#c6a43f] rounded-2xl text-xs font-bold"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Institutional Email</label>
                          <Input
                            name="reply_to"
                            type="email"
                            placeholder="name@company.in"
                            required
                            className="h-14 border-slate-100 focus:border-[#c6a43f] rounded-2xl text-xs font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Official Website</label>
                          <Input
                            name="website"
                            type="url"
                            placeholder="https://..."
                            required
                            className="h-14 border-slate-100 focus:border-[#c6a43f] rounded-2xl text-xs font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Executive Summary</label>
                          <Textarea
                            name="message"
                            placeholder="Describe the institutional problem you are solving..."
                            required
                            className="min-h-[140px] border-slate-100 focus:border-[#c6a43f] rounded-2xl resize-none p-5 text-xs font-bold leading-relaxed"
                          />
                        </div>

                        <Button
                          disabled={isLoading}
                          className="w-full h-16 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl uppercase text-[10px] font-black tracking-[0.3em] transition-all mt-4 relative overflow-hidden group shadow-xl"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? (
                              <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                              <>
                                Submit For Verification
                                <Zap className="h-3 w-3 fill-[#c6a43f] text-[#c6a43f]" />
                              </>
                            )}
                          </span>
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-16 text-center space-y-8"
                    >
                      <div className="relative mx-auto h-28 w-28">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-full w-full rounded-full bg-[#c6a43f]/10 border border-[#c6a43f]/20 flex items-center justify-center text-[#c6a43f]"
                        >
                          <CheckCircle2 className="h-14 w-14 animate-pulse" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[-12px] border border-dashed border-[#c6a43f]/30 rounded-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-black tracking-tighter uppercase text-slate-900">
                          Registry Logged
                        </h3>
                        <p className="text-slate-400 max-w-[280px] mx-auto text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                          Synchronization with Intelligence Group in progress. Redirecting...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="py-12 text-center text-[10px] tracking-[0.5em] uppercase text-slate-400 font-bold border-t border-slate-100">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>
    </div>
  );
}

function BenefitItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-5 items-start group text-left">
      <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h4 className="font-black text-[11px] tracking-widest uppercase text-slate-900">{title}</h4>
        <p className="text-slate-400 text-[10px] leading-relaxed font-bold uppercase tracking-tight">{desc}</p>
      </div>
    </div>
  );
}
