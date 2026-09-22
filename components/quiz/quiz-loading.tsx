"use client";

import React from "react";

export function QuizLoading({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-10" role="status" aria-live="polite">
      <div className="inline-flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-card px-4 py-2.5 shadow-sm">
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-accent-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
        </span>
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

export function LeaderboardLoading() {
  return (
    <div className="space-y-2" role="status" aria-live="polite" aria-label="Loading rankings">
      {["gold", "silver", "bronze", "plain", "plain"].map((tone, index) => (
        <div key={index} className={`flex items-center gap-3 rounded-2xl border p-3.5 ${tone === "gold" ? "border-accent-gold/30 bg-accent-gold/5" : "border-[var(--glass-border)] bg-card"}`}>
          <span className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-muted" />
          <div className="min-w-0 flex-1 space-y-2">
            <span className="block h-3.5 w-36 max-w-[70%] animate-pulse rounded-full bg-muted" />
            <span className="block h-2.5 w-24 animate-pulse rounded-full bg-muted" />
          </div>
          <span className="h-5 w-12 animate-pulse rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}

