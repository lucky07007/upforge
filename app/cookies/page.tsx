"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie, BarChart3, EyeOff, Settings2, Info } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#C59A2E]/20 selection:text-foreground">
      <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-10 lg:px-12">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-[#B48A2B]"
        >
          <ArrowLeft size={13} />
          Back to UpForge
        </Link>

        <section className="border-b border-border pb-9">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C59A2E]/25 bg-[#C59A2E]/5 px-3 py-1.5">
            <Cookie size={13} className="text-[#C59A2E]" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#A27A22]">
              UpForge Privacy Standard
            </span>
          </div>

          <h1
            className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Cookie Policy
          </h1>

          <p className="mt-4 max-w-2xl font-serif text-sm leading-6 text-muted-foreground md:text-base">
            A concise overview of how UpForge uses cookies and related site technologies.
          </p>
        </section>

        <div className="my-9 grid grid-cols-1 gap-5 md:grid-cols-2">
          <section className="rounded-[3px] border border-border bg-card p-6 md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C59A2E]/25 bg-[#C59A2E]/5">
                <EyeOff className="h-4 w-4 text-[#C59A2E]" />
              </div>
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A27A22]">
                Essential use
              </h2>
            </div>
            <p className="font-serif text-sm leading-6 text-muted-foreground">
              Essential storage supports core site functions, preferences and registry experiences.
            </p>
          </section>

          <section className="rounded-[3px] border border-border bg-card p-6 md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C59A2E]/25 bg-[#C59A2E]/5">
                <BarChart3 className="h-4 w-4 text-[#C59A2E]" />
              </div>
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A27A22]">
                Site analytics
              </h2>
            </div>
            <p className="font-serif text-sm leading-6 text-muted-foreground">
              Optional analytics may be used to understand site performance and improve the UpForge experience.
            </p>
          </section>
        </div>

        <section className="mb-10">
          <div className="mb-5 flex items-center gap-2">
            <Info size={14} className="text-[#C59A2E]" />
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A27A22]">
              Cookie overview
            </h2>
          </div>

          <div className="overflow-x-auto rounded-[3px] border border-border bg-card">
            <table className="w-full min-w-[620px] border-collapse font-serif">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  <th className="p-4">Category</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Typical duration</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-[10px] font-bold">Essential</td>
                  <td className="p-4 text-muted-foreground">Core site functions and consent preferences.</td>
                  <td className="p-4 font-mono text-[10px] font-bold uppercase">Session / persistent</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-[10px] font-bold">Preferences</td>
                  <td className="p-4 text-muted-foreground">Remembering selected registry and interface preferences.</td>
                  <td className="p-4 font-mono text-[10px] font-bold uppercase">Up to 30 days</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-[10px] font-bold">Analytics</td>
                  <td className="p-4 text-muted-foreground">Understanding aggregate site usage and performance.</td>
                  <td className="p-4 font-mono text-[10px] font-bold uppercase">Provider dependent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[3px] border border-[#C59A2E]/20 bg-[#C59A2E]/5 p-6 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C59A2E]/25 bg-background">
              <Settings2 className="h-4 w-4 text-[#C59A2E]" />
            </div>
            <div>
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A27A22]">
                Your choices
              </h2>
              <p className="mt-2 max-w-2xl font-serif text-sm leading-6 text-muted-foreground">
                You can choose essential cookies only or allow optional analytics from the consent banner. Browser settings can also be used to manage stored data.
              </p>
              <Link
                href="/legal/privacy"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#A27A22] transition-colors hover:text-[#7E5F1D]"
              >
                Read privacy policy
                <ArrowLeft className="h-3 w-3 rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-16 border-t border-border pt-7 text-center">
          <img
            src="/seal.jpg"
            alt="UpForge official seal"
            className="mx-auto mb-4 w-20 grayscale opacity-45 transition-opacity hover:opacity-100"
          />
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            UpForge Global Startup Registry
          </p>
        </div>

      </div>
    </div>
  );
}
