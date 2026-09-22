"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { LeaderboardLoading } from "@/components/quiz/quiz-loading";

const QuizCertificate = dynamic(() => import("@/components/quiz/quiz-certificate"), {
  ssr: false,
});

const QuizComments = dynamic(() => import("@/components/quiz/quiz-comments"), {
  ssr: false,
  loading: () => <div className="mt-6 rounded-2xl border border-[var(--glass-border)] bg-card p-5 shadow-sm"><LeaderboardLoading /></div>,
});

export interface Question {
  id: string | number;
  question: string;
  options: string[];
  explanation?: string;
}

export interface QuizDetailData {
  slug: string;
  title: string;
  description?: string;
  category: string;
  duration?: string;
  badge?: string;
  credentialTier?: string;
  image: string;
  questions: Question[];
}

interface LeaderboardItem {
  rank: number;
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds?: number;
  completedAt?: string;
}

interface CompletionResult {
  certificateId: string;
  record: LeaderboardItem & { id?: string; completedAt?: string };
}

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("The assessment service returned an invalid response.");
  }
  return res.json();
}

function getBadge(pct: number) {
  if (pct >= 90) return "Top 1% Founder Elite";
  if (pct >= 70) return "Growth Master";
  if (pct >= 50) return "Startup Operator";
  return "Emerging Founder";
}

function makeAttemptId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function rankStyle(rank: number) {
  if (rank === 1) return "border-accent-gold/50 bg-accent-gold/10";
  if (rank === 2) return "border-slate-300/60 bg-muted/50";
  if (rank === 3) return "border-amber-700/25 bg-amber-50/50 dark:bg-amber-950/10";
  return "border-[var(--glass-border)] bg-card";
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return <span className="text-lg" aria-label="1st place">🥇</span>;
  }
  if (rank === 2) {
    return <span className="text-lg" aria-label="2nd place">🥈</span>;
  }
  if (rank === 3) {
    return <span className="text-lg" aria-label="3rd place">🥉</span>;
  }
  return <span className="w-7 text-center text-xs font-bold text-muted-foreground">#{rank}</span>;
}

export default function QuizDetailClient({ quiz }: { quiz: QuizDetailData }) {
  const questions = quiz.questions || [];
  const title = quiz.title.split("|")[0].trim();

  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userName, setUserName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittingResult, setSubmittingResult] = useState(false);
  const [completionError, setCompletionError] = useState("");
  const [completion, setCompletion] = useState<CompletionResult | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [attemptId, setAttemptId] = useState("");

  useEffect(() => setAttemptId(makeAttemptId()), []);

  useEffect(() => {
    if (!started || isCompleted) return;
    const interval = window.setInterval(() => setTimeElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [started, isCompleted]);

  useEffect(() => {
    if (!isCompleted) return;
    let active = true;
    setLeaderboardLoading(true);

    fetch(`/api/quiz/leaderboard?quizSlug=${encodeURIComponent(quiz.slug)}&period=all-time`, {
      headers: { "x-upforge-domain": "quiz" },
    })
      .then(readJson)
      .then((data) => {
        if (active) setLeaderboard(Array.isArray(data?.leaderboard) ? data.leaderboard : []);
      })
      .catch(() => {
        if (active) setLeaderboard([]);
      })
      .finally(() => {
        if (active) setLeaderboardLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isCompleted, quiz.slug]);

  const currentQuestion = questions[currentIdx];
  const currentKey = String(currentQuestion?.id ?? currentIdx);
  const hasAnsweredCurrent = selectedAnswers[currentKey] !== undefined;
  const canStart = userName.trim().length >= 2;

  const startChallenge = () => {
    if (!canStart || !questions.length) return;
    setUserName(userName.trim().replace(/\s+/g, " ").slice(0, 80));
    setStarted(true);
  };

  const submitCompletion = async (nextAnswers: Record<string, number>) => {
    if (!attemptId) {
      setCompletionError("Preparing your secure attempt. Please try again.");
      return;
    }
    if (!userName.trim()) {
      setCompletionError("Please enter your name before completing the challenge.");
      return;
    }

    setSubmittingResult(true);
    setCompletionError("");

    try {
      const res = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug: quiz.slug,
          answers: nextAnswers,
          attemptId,
          userName: userName.trim(),
          timeTakenSeconds: timeElapsed,
          website: "",
        }),
      });

      const data = await readJson(res);
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "We could not record the leaderboard result.");
      }

      const record = data.record;
      const submittedEntry: LeaderboardItem = {
        rank: Number(data.rank || 0),
        id: data.completionId,
        userName: record.userName,
        score: record.score,
        totalQuestions: record.totalQuestions,
        percentage: record.percentage,
        badgeEarned: record.badgeEarned,
        timeTakenSeconds: record.timeTakenSeconds,
        completedAt: record.completedAt,
      };

      try { sessionStorage.setItem("upforge:last-completion", data.completionId); } catch {}

      setCompletion({ certificateId: data.certificateId, record: submittedEntry });

      setLeaderboard((previous) => {
        const merged = [submittedEntry, ...previous.filter((entry) => entry.id !== submittedEntry.id)];
        merged.sort((a, b) => {
          if (b.percentage !== a.percentage) return b.percentage - a.percentage;
          if (b.score !== a.score) return b.score - a.score;
          return (a.timeTakenSeconds || 999999) - (b.timeTakenSeconds || 999999);
        });
        return merged.slice(0, 10).map((entry, index) => ({ ...entry, rank: index + 1 }));
      });

      setIsCompleted(true);
    } catch (error: any) {
      setCompletionError(error?.message || "We could not record this completion. Please retry once.");
      setIsCompleted(true);
    } finally {
      setSubmittingResult(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent || submittingResult) return;
    setSelectedAnswers((previous) => ({ ...previous, [currentKey]: optionIndex }));
    setShowExplanation(false);
  };

  const handleNext = async () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((value) => value + 1);
      return;
    }
    await submitCompletion(selectedAnswers);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setTimeElapsed(0);
    setIsCompleted(false);
    setStarted(false);
    setSubmittingResult(false);
    setCompletionError("");
    setCompletion(null);
    setLeaderboard([]);
    setAttemptId(makeAttemptId());
  };

  const liveScore = completion?.record.score ?? 0;
  const livePercentage = completion?.record.percentage ?? 0;
  const liveBadge = completion?.record.badgeEarned ?? getBadge(livePercentage);

  const progress = useMemo(
    () => (questions.length ? ((currentIdx + 1) / questions.length) * 100 : 0),
    [currentIdx, questions.length]
  );

  if (!currentQuestion && !isCompleted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <p className="text-sm text-muted-foreground">No questions are available for this challenge.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Link href="/quiz" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            All challenges
          </Link>
          {started && !isCompleted && (
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-card px-3 py-2 text-xs font-bold text-muted-foreground shadow-sm">
              <Clock className="h-4 w-4 text-accent-gold" />
              {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>

        {!started && !isCompleted ? (
          <section className="overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-card shadow-sm">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
              <div className="relative min-h-[240px] overflow-hidden bg-muted lg:min-h-[420px]">
                <img src={quiz.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7">
                  <span className="inline-flex rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] backdrop-blur">{quiz.category}</span>
                  <p className="mt-3 text-xs font-semibold text-white/80">{quiz.badge}</p>
                  <p className="mt-1 text-lg font-black sm:text-xl">{questions.length} questions · {quiz.duration || "3–5 minutes"}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold">
                  <Award className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-accent-gold">UpForge assessment</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">{title}</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{quiz.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
                  <span className="rounded-xl bg-muted px-3 py-2.5">{questions.length} questions</span>
                  <span className="rounded-xl bg-muted px-3 py-2.5">{quiz.duration || "3–5 minutes"}</span>
                  <span className="rounded-xl bg-muted px-3 py-2.5">Server scored</span>
                  <span className="rounded-xl bg-muted px-3 py-2.5">Certificate</span>
                </div>

                <div className="mt-6">
                  <label htmlFor="quiz-name" className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">Your name</label>
                  <input
                    id="quiz-name"
                    type="text"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value.slice(0, 80))}
                    onKeyDown={(event) => { if (event.key === "Enter") startChallenge(); }}
                    autoComplete="name"
                    maxLength={80}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-background px-4 py-3.5 text-sm font-semibold text-foreground outline-none transition focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/10"
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">Shown on your certificate and public ranking.</p>
                </div>

                <button type="button" onClick={startChallenge} disabled={!canStart} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gold px-6 py-3.5 text-sm font-black text-slate-950 shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45">
                  <Play className="h-4 w-4" /> Start challenge
                </button>
              </div>
            </div>
          </section>
        ) : !isCompleted ? (
          <section className="rounded-2xl border border-[var(--glass-border)] bg-card p-4 shadow-sm sm:p-7 lg:p-9">
            <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-gold">
              <span>Question {currentIdx + 1}</span>
              <span>{currentIdx + 1} / {questions.length}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent-gold transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <h2 className="mt-5 max-w-5xl text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentKey] === index;
                return (
                  <button
                    key={index}
                    type="button"
                    disabled={hasAnsweredCurrent || submittingResult}
                    onClick={() => handleSelectOption(index)}
                    className={`flex min-h-14 w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition sm:min-h-16 sm:px-5 ${
                      isSelected
                        ? "border-accent-gold bg-accent-gold/10 text-foreground shadow-sm"
                        : "border-[var(--glass-border)] bg-background text-foreground hover:border-accent-gold/40 hover:bg-accent-gold/5"
                    } disabled:cursor-default`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && isSelected && <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-gold" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="mt-3 rounded-xl border border-accent-primary/15 bg-accent-primary/5 px-4 py-3 text-xs leading-5 text-muted-foreground">
                <span className="font-bold text-accent-primary">Why: </span>{currentQuestion.explanation}
              </div>
            )}

            {hasAnsweredCurrent && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submittingResult}
                  className="rounded-xl bg-accent-gold px-6 py-3 text-sm font-black text-slate-950 transition hover:opacity-90 disabled:opacity-50"
                >
                  {currentIdx + 1 === questions.length ? (submittingResult ? "Recording…" : "Finish") : "Next"}
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="mt-2 space-y-5">
            <div className="rounded-2xl border border-[var(--glass-border)] bg-card p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                <Trophy className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Challenge completed</h2>
              <p className="mt-1 text-sm text-muted-foreground">{liveScore}/{completion?.record.totalQuestions ?? questions.length} correct · {livePercentage}%</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-primary/10 px-4 py-2 text-xs font-bold text-accent-primary">
                <Award className="h-4 w-4" /> {liveBadge}
              </div>

              {completionError ? (
                <div className="mx-auto mt-5 max-w-xl rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-700 dark:text-red-300">
                  <p>{completionError}</p>
                  <button type="button" onClick={() => submitCompletion(selectedAnswers)} disabled={submittingResult} className="mt-2 underline">
                    {submittingResult ? "Retrying…" : "Retry completion"}
                  </button>
                </div>
              ) : completion ? (
                <div className="mx-auto mt-5 max-w-xl rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Result recorded on the public UpForge leaderboard.
                </div>
              ) : null}
            </div>

            {completion && (
              <QuizCertificate
                userName={completion.record.userName}
                quizTitle={title}
                category={quiz.category}
                score={completion.record.score}
                totalQuestions={completion.record.totalQuestions}
                percentage={completion.record.percentage}
                certificateId={completion.certificateId}
                issuedAt={completion.record.completedAt}
                credentialTier={quiz.credentialTier}
              />
            )}

            <section className="rounded-2xl border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--glass-border)] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent-primary">Public results</p>
                  <h3 className="mt-1 text-xl font-bold text-foreground">{title} leaderboard</h3>
                </div>
                <Link href={`/quiz/leaderboard?quiz=${encodeURIComponent(quiz.slug)}`} className="text-xs font-bold text-accent-primary underline underline-offset-4">
                  View all
                </Link>
              </div>

              <div className="mt-4">
                {leaderboardLoading ? (
                  <LeaderboardLoading />
                ) : leaderboard.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">No scores yet.</div>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.slice(0, 10).map((entry) => (
                      <div key={entry.id || `${entry.rank}-${entry.userName}`} className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${rankStyle(entry.rank)}`}>
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex w-8 justify-center"><RankBadge rank={entry.rank} /></div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-foreground">{entry.userName}</p>
                            <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">{entry.score}/{entry.totalQuestions} · {entry.timeTakenSeconds || 0}s</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-accent-primary/10 px-2.5 py-1 text-xs font-bold text-accent-primary">{entry.percentage}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="flex flex-wrap justify-center gap-2.5">
              <button type="button" onClick={handleRestart} className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-card px-5 py-3 text-xs font-bold text-foreground transition hover:border-accent-primary/40">
                <RotateCcw className="h-4 w-4" /> Retake
              </button>
              <Link href="/quiz/leaderboard" className="rounded-xl bg-accent-primary px-5 py-3 text-xs font-bold text-white transition hover:opacity-90">All leaderboards</Link>
              <Link href="/quiz" className="rounded-xl border border-[var(--glass-border)] bg-card px-5 py-3 text-xs font-bold text-foreground">Other challenges</Link>
            </div>
          </section>
        )}

        <div className="mt-6"><QuizComments quizSlug={quiz.slug} /></div>
      </div>
    </main>
  );
}
