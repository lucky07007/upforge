import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { getQuizLeaderboardEntries } from "@/lib/quiz-google-sheets";

type LeaderboardEntry = {
  rank: number;
  id: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds: number;
  completedAt: string;
  quizSlug?: string;
  quizTitle?: string;
};

const memoryCache = new Map<string, { expiresAt: number; leaderboard: LeaderboardEntry[]; hasMore: boolean }>();
const CACHE_TTL_MS = 60_000;

function response(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
      "CDN-Cache-Control": "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
    },
  });
}

function sanitize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

function quizMeta(slug: string) {
  const quiz = QUIZ_REGISTRY.find((item) => item.slug === slug || item.id === slug);
  return quiz ? { slug: quiz.slug, title: quiz.title.split("|")[0].trim() } : null;
}

function findQuizByTitle(title: string) {
  const normalized = title.trim().toLowerCase();
  return QUIZ_REGISTRY.find((quiz) => quiz.title.split("|")[0].trim().toLowerCase() === normalized);
}

function rankEntries(entries: LeaderboardEntry[], limit: number) {
  return [...entries]
    .sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      if (b.score !== a.score) return b.score - a.score;
      const aDate = Date.parse(a.completedAt) || 0;
      const bDate = Date.parse(b.completedAt) || 0;
      return bDate - aDate;
    })
    .slice(0, limit)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

function toEntries(rows: Awaited<ReturnType<typeof getQuizLeaderboardEntries>>) {
  return rows.map((row) => {
    const quiz = findQuizByTitle(row.quizTitle);
    return {
      rank: 0,
      id: row.id,
      userName: row.userName,
      score: row.score,
      totalQuestions: row.totalQuestions,
      percentage: row.percentage,
      badgeEarned:
        row.percentage >= 90 ? "Top 1% Founder Elite" :
        row.percentage >= 70 ? "Growth Master" :
        row.percentage >= 50 ? "Startup Operator" : "Emerging Founder",
      timeTakenSeconds: 0,
      completedAt: row.completedAt,
      quizSlug: quiz?.slug,
      quizTitle: quiz?.title || row.quizTitle,
    } satisfies LeaderboardEntry;
  });
}

export async function GET(request: NextRequest) {
  const rawSlug = request.nextUrl.searchParams.get("quizSlug") ?? request.nextUrl.searchParams.get("quiz") ?? "";
  const quizSlug = sanitize(rawSlug);
  const scope = request.nextUrl.searchParams.get("scope") === "global" ? "global" : "quiz";
  const pageRaw = Number(request.nextUrl.searchParams.get("page") || "1");
  const page = Number.isFinite(pageRaw) ? Math.min(100, Math.max(1, Math.floor(pageRaw))) : 1;
  const period = request.nextUrl.searchParams.get("period") === "daily" ? "daily" : "all-time";

  if (scope === "quiz" && !quizSlug) {
    return response({ success: false, error: "Quiz slug is required.", leaderboard: [] }, 400);
  }
  if (scope === "quiz" && !quizMeta(quizSlug)) {
    return response({ success: false, error: "Quiz not found.", leaderboard: [] }, 404);
  }

  const cacheKey = `${scope}:${quizSlug || "global"}:${period}:${page}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return response({ success: true, leaderboard: cached.leaderboard, hasMore: cached.hasMore, page, scope, period, cached: true });
  }

  try {
    let entries = toEntries(await getQuizLeaderboardEntries());

    if (scope === "quiz") {
      entries = entries.filter((entry) => entry.quizSlug === quizSlug);
    }

    if (period === "daily") {
      const today = new Date().toISOString().slice(0, 10);
      entries = entries.filter((entry) => {
        const parsed = Date.parse(entry.completedAt);
        return Number.isFinite(parsed) ? new Date(parsed).toISOString().slice(0, 10) === today : entry.completedAt === today;
      });
    }

    const ranked = rankEntries(entries, page * 10);
    const pageEntries = ranked.slice((page - 1) * 10, page * 10);
    const hasMore = ranked.length > page * 10;

    memoryCache.set(cacheKey, { leaderboard: pageEntries, hasMore, expiresAt: Date.now() + CACHE_TTL_MS });
    if (memoryCache.size > 150) memoryCache.delete(memoryCache.keys().next().value as string);

    return response({ success: true, leaderboard: pageEntries, hasMore, page, scope, period, cached: false });
  } catch (error) {
    console.error("[quiz/leaderboard] GET failed:", error);
    if (cached) {
      return response({ success: true, leaderboard: cached.leaderboard, hasMore: cached.hasMore, page, scope, period, stale: true });
    }
    return response({ success: false, error: "Leaderboard temporarily unavailable.", leaderboard: [] }, 503);
  }
}
