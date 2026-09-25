//app/quiz/page.tsx

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
  Filter,
  Flame,
  Search,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import QuizCompletionCount from "@/components/quiz/quiz-completion-count";

const BASE_URL = "https://upforge.org";

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    month?: string;
    popular?: string;
  }>;
}

const categories = Array.from(
  new Set(QUIZ_REGISTRY.map((quiz) => quiz.category))
).sort();

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;

  const q = sp.q?.trim() || "";
  const category = sp.category?.trim() || "";

  const title = q
    ? `"${q}" Quiz Results | UpForge`
    : category
      ? `${category} Quizzes | UpForge`
      : "UpForge Challenges | Startup, Marketing, Career & Fundraising IQ";

  const description = q
    ? `Find UpForge challenges matching ${q}. Take a practical assessment, earn a professional certificate and join the public leaderboard.`
    : category
      ? `Take practical ${category} assessments on UpForge. Earn a professional completion certificate and join the public leaderboard.`
      : "Take practical UpForge challenges, receive a professional completion certificate and appear automatically on the public leaderboard.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/quiz`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/quiz`,
      siteName: "UpForge",
      type: "website",
    },
    robots: {
      index: !q,
      follow: true,
    },
  };
}

export default async function QuizIndexPage({
  searchParams,
}: PageProps) {
  const sp = await searchParams;

  const q = sp.q?.trim().toLowerCase() || "";
  const category = sp.category?.trim() || "";
  const month = sp.month?.trim() || "";

  const sort = sp.sort === "date" ? "date" : "name";
  const popular = sp.popular === "1";

  const hasDateMetadata = QUIZ_REGISTRY.some(
    (quiz) =>
      Boolean(
        (quiz as typeof quiz & {
          publishedAt?: string;
        }).publishedAt
      )
  );

  const months = Array.from(
    new Set(
      QUIZ_REGISTRY.map(
        (quiz) =>
          (
            quiz as typeof quiz & {
              publishedAt?: string;
            }
          ).publishedAt?.slice(0, 7)
      ).filter(Boolean) as string[]
    )
  ).sort((a, b) => b.localeCompare(a));

  const quizzes = QUIZ_REGISTRY.filter((quiz) => {
    const haystack =
      `${quiz.title} ${quiz.tagline} ${
        quiz.description || ""
      } ${quiz.category}`.toLowerCase();

    const publishedAt =
      (
        quiz as typeof quiz & {
          publishedAt?: string;
        }
      ).publishedAt || "";

    return (
      (!q || haystack.includes(q)) &&
      (!category || quiz.category === category) &&
      (!month || publishedAt.startsWith(month))
    );
  }).sort((a, b) => {
    if (popular) {
      return b.baseParticipants - a.baseParticipants;
    }

    if (sort === "date") {
      const ad =
        (
          a as typeof a & {
            publishedAt?: string;
          }
        ).publishedAt || "";

      const bd =
        (
          b as typeof b & {
            publishedAt?: string;
          }
        ).publishedAt || "";

      return bd.localeCompare(ad);
    }

    return a.title.localeCompare(b.title);
  });

  const filtered = Boolean(
    q ||
      category ||
      month ||
      sort !== "name" ||
      popular
  );

  const makeHref = (
    overrides: Record<string, string | undefined>
  ) => {
    const values = {
      q: q || undefined,
      category: category || undefined,
      month: month || undefined,
      sort: sort !== "name" ? sort : undefined,
      popular: popular ? "1" : undefined,
      ...overrides,
    };

    const params = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const query = params.toString();

    return `/quiz${query ? `?${query}` : ""}`;
  };

  const totalCompletions = QUIZ_REGISTRY.reduce(
    (sum, quiz) => sum + quiz.baseParticipants,
    0
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="border-b border-[var(--glass-border)] bg-card">
        <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-10 px-6 py-9 lg:px-10 xl:py-11">
          <div className="min-w-0">
            <span className="inline-flex rounded-full border border-accent-gold/25 bg-accent-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-accent-gold">
              UpForge Assessments
            </span>

            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[52px]">
              Practical challenges for builders.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Short, scenario-based assessments across startup
              intelligence, growth and professional skills. Earn a
              verifiable credential when you finish.
            </p>
          </div>

          <div className="hidden shrink-0 items-end gap-8 lg:flex">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                Challenges
              </p>
              <p className="mt-1 text-2xl font-black text-foreground">
                {QUIZ_REGISTRY.length}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                Completions
              </p>
              <p className="mt-1 text-2xl font-black text-foreground">
                {totalCompletions.toLocaleString()}+
              </p>
            </div>

            <Link
              href="/quiz/leaderboard"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-background px-4 py-3 text-xs font-black text-foreground transition hover:border-accent-gold/50 hover:bg-muted"
            >
              <Trophy className="h-4 w-4 text-accent-gold" />
              Leaderboards
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH / CONTROLS */}
      <section className="border-b border-[var(--glass-border)] bg-background">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-4 lg:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <form
              action="/quiz"
              method="GET"
              className="relative min-w-0 flex-1"
            >
              {category && (
                <input
                  type="hidden"
                  name="category"
                  value={category}
                />
              )}

              {sort !== "name" && (
                <input
                  type="hidden"
                  name="sort"
                  value={sort}
                />
              )}

              {popular && (
                <input
                  type="hidden"
                  name="popular"
                  value="1"
                />
              )}

              <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />

              <input
                type="search"
                name="q"
                defaultValue={sp.q || ""}
                placeholder={`Search ${QUIZ_REGISTRY.length} challenges by topic, skill or title...`}
                className="h-12 w-full rounded-xl border border-[var(--glass-border)] bg-card py-3 pl-11 pr-24 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-accent-gold/60 focus:ring-2 focus:ring-accent-gold/10"
                autoComplete="off"
                aria-label="Search UpForge challenges"
              />

              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg bg-accent-gold px-4 text-[11px] font-black uppercase tracking-wide text-slate-950 transition hover:opacity-90"
              >
                Search
              </button>
            </form>

            <div className="flex shrink-0 items-center gap-2">
              <details className="group relative">
                <summary className="flex h-12 cursor-pointer list-none items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-card px-4 text-xs font-black text-foreground shadow-sm">
                  <Filter className="h-3.5 w-3.5 text-accent-gold" />
                  Filters
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition group-open:rotate-180" />
                </summary>

                <div className="absolute right-0 top-full z-40 mt-2 w-[min(92vw,440px)] rounded-2xl border border-[var(--glass-border)] bg-card p-4 shadow-2xl">
                  <div className="grid gap-5">
                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                        Category
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        <Link
                          href={makeHref({
                            category: undefined,
                          })}
                          className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                            !category
                              ? "bg-accent-gold text-slate-950"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          All
                        </Link>

                        {categories.map((item) => (
                          <Link
                            key={item}
                            href={makeHref({
                              category: item,
                            })}
                            className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                              category === item
                                ? "bg-accent-gold text-slate-950"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                        Publication
                      </p>

                      {hasDateMetadata ? (
                        <div className="flex flex-wrap gap-1.5">
                          <Link
                            href={makeHref({
                              month: undefined,
                            })}
                            className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                              !month
                                ? "bg-accent-gold text-slate-950"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            All dates
                          </Link>

                          {months.map((m) => (
                            <Link
                              key={m}
                              href={makeHref({
                                month: m,
                              })}
                              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                                month === m
                                  ? "bg-accent-gold text-slate-950"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {new Date(
                                `${m}-01T00:00:00`
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="rounded-xl bg-muted/60 p-3 text-[11px] leading-5 text-muted-foreground">
                          Publication filters will appear when
                          challenge dates are available.
                        </p>
                      )}
                    </div>

                    <div className="border-t border-[var(--glass-border)] pt-4">
                      <Link
                        href={makeHref({
                          popular: popular
                            ? undefined
                            : "1",
                        })}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                          popular
                            ? "bg-accent-gold text-slate-950"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Flame className="h-3.5 w-3.5" />
                        Popular challenges
                      </Link>
                    </div>
                  </div>
                </div>
              </details>

              <Link
                href="/quiz/leaderboard"
                className="hidden h-12 items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-card px-4 text-xs font-black text-foreground transition hover:border-accent-gold/50 hover:bg-muted xl:inline-flex"
              >
                <Trophy className="h-3.5 w-3.5 text-accent-gold" />
                Rankings
              </Link>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <span className="hidden text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground sm:inline">
                Sort
              </span>

              <Link
                href={makeHref({
                  sort: "name",
                })}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-bold ${
                  sort === "name"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                A–Z
              </Link>

              <Link
                href={makeHref({
                  sort: "date",
                })}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-bold ${
                  sort === "date"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Date
              </Link>

              {filtered && (
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-accent-gold hover:bg-accent-gold/10"
                >
                  <X className="h-3 w-3" />
                  Clear
                </Link>
              )}
            </div>

            <span className="text-[11px] font-medium text-muted-foreground">
              {quizzes.length}{" "}
              {quizzes.length === 1
                ? "challenge"
                : "challenges"}
            </span>
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-10 lg:py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent-gold">
              Assessment library
            </p>

            <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              {q
                ? `Results for “${sp.q}”`
                : category || "All challenges"}
            </h2>
          </div>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Real assessments · server-verified · certificate included
          </p>
        </div>

        {quizzes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--glass-border)] bg-card p-14 text-center">
            <p className="font-bold text-foreground">
              No matching challenges
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try another keyword or clear the filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((quiz, index) => (
              <article
                key={quiz.slug}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:border-accent-gold/45 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
              >
                {/* IMAGE */}
                <Link
                  href={`/quiz/${quiz.slug}`}
                  className="relative block overflow-hidden bg-muted"
                >
                  <div className="aspect-[16/9] w-full">
                    <img
                      src={quiz.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/65 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {quiz.category}
                  </span>

                </Link>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-5">
                  <Link href={`/quiz/${quiz.slug}`}>
                    <h3 className="font-serif text-[23px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground transition group-hover:text-accent-gold">
                      {quiz.title
                        .split("|")[0]
                        .trim()}
                    </h3>
                  </Link>

                  <p className="mt-2.5 line-clamp-2 text-[13px] leading-5 text-muted-foreground">
                    {quiz.description ||
                      quiz.tagline}
                  </p>

                  {/* META */}
                  <div className="mt-5 grid grid-cols-2 gap-2 border-y border-[var(--glass-border)] py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-accent-gold" />

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                          Time
                        </p>

                        <p className="mt-0.5 text-xs font-bold text-foreground">
                          {quiz.duration ||
                            quiz.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex h-3.5 w-3.5 items-center justify-center text-[10px] font-black text-accent-gold">
                        #
                      </span>

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                          Questions
                        </p>

                        <p className="mt-0.5 text-xs font-bold text-foreground">
                          {quiz.questions.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-auto pt-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <QuizCompletionCount quizSlug={quiz.slug} fallback={quiz.baseParticipants > 0 ? quiz.baseParticipants : undefined} />
                      </span>

                      <span className="text-[10px] font-black uppercase tracking-wider text-accent-gold">
                        Certificate
                      </span>
                    </div>

                    <Link
                      href={`/quiz/${quiz.slug}`}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent-gold px-4 text-[11px] font-black uppercase tracking-[0.08em] text-slate-950 transition hover:opacity-90"
                    >
                      Start challenge
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
