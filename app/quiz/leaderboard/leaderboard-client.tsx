"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Medal, Search, X } from "lucide-react";
import { LeaderboardLoading } from "@/components/quiz/quiz-loading";

interface QuizMeta {
  slug: string;
  title: string;
  category: string;
}

interface Entry {
  rank: number;
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds?: number;
  completedAt?: string;
  quizSlug?: string;
  quizTitle?: string;
}

type Scope = "global" | "quiz";
type Period = "all-time" | "daily";

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Leaderboard service returned an invalid response.");
  }
  return res.json();
}

function rankTone(rank: number) {
  if (rank === 1) return "border-accent-gold/60 bg-accent-gold/[0.08]";
  if (rank === 2) return "border-slate-300/70 bg-muted/70";
  if (rank === 3) return "border-amber-700/25 bg-amber-50/60 dark:bg-amber-950/10";
  return "border-[var(--glass-border)] bg-card";
}

function rankIcon(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

function formatTime(seconds = 0) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function PodiumCard({ entry, place }: { entry: Entry; place: 1 | 2 | 3 }) {
  const height = place === 1 ? "min-h-[178px]" : "min-h-[150px]";
  const order = place === 1 ? "md:order-2" : place === 2 ? "md:order-1" : "md:order-3";

  return (
    <div
      className={`flex ${order} ${height} flex-1 flex-col justify-between rounded-2xl border p-5 ${rankTone(place)} ${
        place === 1 ? "shadow-[0_14px_40px_rgba(197,154,46,0.12)]" : "shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-xl shadow-sm" aria-label={`Rank ${place}`}>
          {rankIcon(place)}
        </span>
        <span className="rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
          {place === 1 ? "Top result" : `${place}${place === 2 ? "nd" : "rd"}`}
        </span>
      </div>

      <div className="mt-5 min-w-0">
        <p className="truncate text-base font-black text-foreground">{entry.userName}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {entry.score}/{entry.totalQuestions} correct · {formatTime(entry.timeTakenSeconds)}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xl font-black tracking-tight text-foreground">{entry.percentage}%</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent-gold">#{entry.rank}</span>
      </div>
    </div>
  );
}

export default function LeaderboardClient({ quizzes }: { quizzes: QuizMeta[] }) {
  const [scope, setScope] = useState<Scope>("global");
  const [period, setPeriod] = useState<Period>("all-time");
  const [selectedSlug, setSelectedSlug] = useState(quizzes[0]?.slug || "");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Entry[]>([]);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("quiz");
    const requestedPeriod = params.get("period");
    if (requested && quizzes.some((quiz) => quiz.slug === requested)) {
      setSelectedSlug(requested);
      setScope("quiz");
    }
    if (requestedPeriod === "daily") setPeriod("daily");
  }, [quizzes]);

  useEffect(() => {
    if (scope === "quiz" && !selectedSlug) return;
    let active = true;
    setLoading(true);
    setError("");
    setSearchResults([]);
    setSearchMessage("");

    const params = new URLSearchParams({ scope, period, page: "1", limit: "10" });
    if (scope === "quiz") params.set("quizSlug", selectedSlug);

    fetch(`/api/quiz/leaderboard?${params.toString()}`, { headers: { "x-upforge-domain": "quiz" } })
      .then(readJson)
      .then((data) => {
        if (!active) return;
        setEntries(Array.isArray(data?.leaderboard) ? data.leaderboard : []);
        if (!data?.success && data?.error) setError(data.error);
      })
      .catch((err) => {
        if (!active) return;
        setEntries([]);
        setError(err?.message || "Leaderboard is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scope, period, selectedSlug]);

  async function searchPosition(event?: FormEvent) {
    event?.preventDefault();
    const name = searchName.trim();
    if (!name || searching) return;

    setSearching(true);
    setSearchMessage("");
    setSearchResults([]);

    try {
      const params = new URLSearchParams({
        scope: "rank",
        searchScope: scope,
        period,
        name,
      });
      if (scope === "quiz") params.set("quizSlug", selectedSlug);

      const res = await fetch(`/api/quiz/leaderboard?${params.toString()}`, {
        headers: { "x-upforge-domain": "quiz" },
      });
      const data = await readJson(res);
      const matches = Array.isArray(data?.matches) ? data.matches : [];
      setSearchResults(matches);
      if (!matches.length) setSearchMessage(`No verified result found for “${name}”.`);
    } catch (err) {
      setSearchMessage(err instanceof Error ? err.message : "Could not find that name.");
    } finally {
      setSearching(false);
    }
  }

  const activeQuiz = useMemo(() => quizzes.find((quiz) => quiz.slug === selectedSlug), [quizzes, selectedSlug]);
  const heading = scope === "global" ? "Global leaderboard" : `${activeQuiz?.title || "Challenge"} leaderboard`;
  const podium = entries.slice(0, 3);
  const listEntries = entries.slice(3);
  const hasMore = entries.length === 10;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/quiz" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to challenges
        </Link>

        {loading ? (
          <section className="mt-5 rounded-[24px] border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7"><LeaderboardLoading /></section>
        ) : entries.length > 0 ? (
          <section className="mt-5 rounded-[24px] border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent-gold">Top performers</p>
                <h2 className="mt-1 text-xl font-black text-foreground sm:text-2xl">The leaders right now</h2>
              </div>
              <span className="hidden rounded-full bg-muted px-3 py-1.5 text-[10px] font-bold text-muted-foreground sm:inline-flex">Top 10</span>
            </div>

            <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-center">
              {podium.map((entry, index) => <PodiumCard key={entry.id || index} entry={entry} place={(index + 1) as 1 | 2 | 3} />)}
            </div>
          </section>
        ) : null}

        <section className="mt-5 rounded-[24px] border border-[var(--glass-border)] bg-card shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[var(--glass-border)] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <button type="button" onClick={() => setScope("global")} className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${scope === "global" ? "bg-accent-gold text-slate-950" : "text-muted-foreground hover:bg-muted"}`}>Global</button>
              <button type="button" onClick={() => setScope("quiz")} className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${scope === "quiz" ? "bg-accent-gold text-slate-950" : "text-muted-foreground hover:bg-muted"}`}>By challenge</button>
              <span className="mx-1 hidden h-6 w-px bg-[var(--glass-border)] sm:block" />
              <button type="button" onClick={() => setPeriod("daily")} className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${period === "daily" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}>Today</button>
              <button type="button" onClick={() => setPeriod("all-time")} className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${period === "all-time" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}>All time</button>
            </div>

            {scope === "quiz" && (
              <label className="relative block w-full lg:max-w-[360px]">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select value={selectedSlug} onChange={(event) => setSelectedSlug(event.target.value)} className="w-full appearance-none rounded-xl border border-[var(--glass-border)] bg-background py-2.5 pl-10 pr-9 text-xs font-bold text-foreground outline-none">
                  {quizzes.map((quiz) => <option key={quiz.slug} value={quiz.slug}>{quiz.title}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </label>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b border-[var(--glass-border)] pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent-gold">{period === "daily" ? "Today" : "All time"}</p>
                <h2 className="mt-1 text-xl font-black text-foreground sm:text-2xl">{heading}</h2>
              </div>
              <div className="text-right text-xs text-muted-foreground"><span className="font-bold text-foreground">Top 10</span> shown</div>
            </div>

            {error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-300">{error}</div>}

            {entries.length === 0 && !loading ? (
              <div className="rounded-2xl border border-dashed border-[var(--glass-border)] p-10 text-center text-sm text-muted-foreground">No verified scores yet. Be the first.</div>
            ) : (
              <>
                <div className="space-y-2">
                  {listEntries.map((entry) => (
                    <div key={entry.id || `${entry.rank}-${entry.userName}`} className={`flex items-center gap-3 rounded-2xl border p-3.5 transition sm:p-4 ${rankTone(entry.rank)}`}>
                      <div className="flex w-10 shrink-0 items-center justify-center text-xs font-black text-muted-foreground">{rankIcon(entry.rank)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-foreground">{entry.userName}</p>
                        <p className="mt-0.5 truncate text-[10px] font-medium text-muted-foreground">
                          {scope === "global" && entry.quizTitle ? `${entry.quizTitle} · ` : ""}{entry.score}/{entry.totalQuestions} correct · {formatTime(entry.timeTakenSeconds)}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-black text-foreground">{entry.percentage}%</span>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-6 border-t border-[var(--glass-border)] pt-5">
                    <button
                      type="button"
                      onClick={() => { setSearchOpen((open) => !open); setSearchMessage(""); setSearchResults([]); }}
                      className="mx-auto flex items-center gap-2 rounded-xl border border-accent-gold/40 bg-accent-gold px-5 py-2.5 text-xs font-black text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:opacity-90"
                    >
                      +99 more
                      <Search className="h-4 w-4" />
                    </button>
                    <p className="mt-2 text-center text-[11px] text-muted-foreground">Click to reveal the search and find your verified rank.</p>

                    <div className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${searchOpen ? "mt-4 max-h-[420px] translate-y-0 opacity-100" : "max-h-0 translate-y-1 opacity-0"}`}>
                      <div className="rounded-2xl border border-accent-gold/25 bg-accent-gold/[0.045] p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-black text-foreground">Find your verified rank</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">Search by the exact name used when completing the challenge.</p>
                          </div>
                          <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label="Close rank search"><X className="h-4 w-4" /></button>
                        </div>

                        <form onSubmit={searchPosition} className="mt-4 flex flex-col gap-2 sm:flex-row">
                          <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input value={searchName} onChange={(event) => setSearchName(event.target.value)} placeholder="Enter your name" autoComplete="off" maxLength={80} className="w-full rounded-xl border border-[var(--glass-border)] bg-background py-3 pl-10 pr-3 text-sm font-semibold text-foreground outline-none transition focus:border-accent-gold/60" />
                          </div>
                          <button type="submit" disabled={searching || !searchName.trim()} className="rounded-xl bg-accent-gold px-5 py-3 text-xs font-black text-slate-950 transition hover:opacity-90 disabled:cursor-wait disabled:opacity-50">{searching ? "Finding…" : "Find rank"}</button>
                        </form>

                        {searchResults.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {searchResults.map((entry) => (
                              <div key={`${entry.id}-${entry.rank}`} className="flex items-center gap-3 rounded-xl border border-accent-gold/30 bg-background px-3.5 py-3 shadow-sm">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-gold text-slate-950"><Medal className="h-4 w-4" /></span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-black text-foreground">{entry.userName}</p>
                                  <p className="text-[10px] text-muted-foreground">{entry.score}/{entry.totalQuestions} correct · {formatTime(entry.timeTakenSeconds)}</p>
                                </div>
                                <div className="text-right"><p className="text-lg font-black text-foreground">#{entry.rank}</p><p className="text-[10px] font-bold text-muted-foreground">{entry.percentage}%</p></div>
                              </div>
                            ))}
                          </div>
                        )}
                        {searchMessage && <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">{searchMessage}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
