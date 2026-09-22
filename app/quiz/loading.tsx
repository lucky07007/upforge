import React from "react";

export default function QuizLoading() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
        <div className="mt-6 h-10 w-72 animate-pulse rounded-xl bg-muted" />
        <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-full bg-muted" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-card">
              <div className="aspect-[16/9] animate-pulse bg-muted" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-28 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-4/5 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
                <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
