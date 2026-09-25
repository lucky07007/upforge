import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { fetchQuizSheet } from "@/lib/quiz-sheets";

function sanitize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

function isValidQuizSlug(slug: string) {
  return QUIZ_REGISTRY.some((quiz) => quiz.slug === slug || quiz.id === slug);
}

function response(data: Record<string, unknown>, status = 200, maxAge = 30) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${maxAge}, stale-while-revalidate=120, stale-if-error=600`,
      "CDN-Cache-Control": `public, max-age=${maxAge}, stale-while-revalidate=120, stale-if-error=600`,
    },
  });
}

function noStore(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function GET(request: NextRequest) {
  const rawSlug = request.nextUrl.searchParams.get("quizSlug") || request.nextUrl.searchParams.get("quiz") || "";
  const quizSlug = sanitize(rawSlug);
  const scope = request.nextUrl.searchParams.get("scope") || "quiz";
  const period = request.nextUrl.searchParams.get("period") === "daily" ? "daily" : "all-time";
  const topOnly = request.nextUrl.searchParams.get("topOnly") === "1";
  const requestedPage = Number(request.nextUrl.searchParams.get("page") || "1");
  const page = Number.isFinite(requestedPage) ? Math.max(1, Math.floor(requestedPage)) : 1;
  const limit = Math.min(50, Math.max(1, Number(request.nextUrl.searchParams.get("limit") || 10)));
  const offset = (page - 1) * 10;

  try {
    if (scope === "counts") {
      const data = await fetchQuizSheet("stats");
      const rawCounts = data.counts && typeof data.counts === "object" ? data.counts : {};
      const counts: Record<string, number> = {};
      for (const quiz of QUIZ_REGISTRY) {
        const slugKey = quiz.slug;
        const titleKey = quiz.title.split("|")[0].trim();
        const slugCount = Number((rawCounts as any)[slugKey]);
        const titleCount = Number((rawCounts as any)[titleKey]);
        counts[slugKey] = Math.max(
          Number.isFinite(slugCount) ? slugCount : 0,
          Number.isFinite(titleCount) ? titleCount : 0,
        );
      }
      return response({ success: true, counts, total: Number(data.total || 0) }, 200, 60);
    }

    if (scope === "rank") {
      const name = (request.nextUrl.searchParams.get("name") || "").trim().slice(0, 80);
      if (!name) return noStore({ success: false, error: "Name is required.", matches: [] }, 400);

      const data = await fetchQuizSheet("rank", {
        scope: request.nextUrl.searchParams.get("searchScope") || "global",
        period,
        quizSlug,
        quizTitle: request.nextUrl.searchParams.get("quizTitle") || "",
        name,
      });

      return response({
        success: true,
        matches: Array.isArray(data.matches) ? data.matches : [],
        query: name,
        scope: request.nextUrl.searchParams.get("searchScope") || "global",
        period,
      }, 200, 20);
    }

    if (scope === "global") {
      const data = await fetchQuizSheet("leaderboard", {
        scope: "global",
        period,
        limit: String(topOnly ? 1 : 10),
        offset: String(topOnly ? 0 : offset),
      });
      const leaderboard = Array.isArray(data.leaderboard) ? data.leaderboard : [];
      return response({
        success: true,
        top: leaderboard[0] || null,
        leaderboard,
        hasMore: Boolean(data.hasMore),
        scope: "global",
        period,
      }, 200, topOnly ? 20 : 30);
    }

    if (!quizSlug) return noStore({ success: false, error: "Quiz slug is required.", leaderboard: [] }, 400);
    if (!isValidQuizSlug(quizSlug)) return noStore({ success: false, error: "Quiz not found.", leaderboard: [] }, 404);

    const quizMeta = QUIZ_REGISTRY.find((quiz) => quiz.slug === quizSlug || quiz.id === quizSlug);
    const data = await fetchQuizSheet("leaderboard", {
      quizSlug,
      quizTitle: quizMeta?.title.split("|")[0].trim() || "",
      period,
      limit: String(limit),
      offset: String(offset),
    });
    const leaderboard = Array.isArray(data.leaderboard) ? data.leaderboard : [];

    return response({
      success: true,
      leaderboard,
      hasMore: Boolean(data.hasMore),
      count: Number(data.count || 0),
      scope: "quiz",
      quizSlug,
      period,
    }, 200, 30);
  } catch (error) {
    console.error("[quiz/leaderboard] Sheets lookup failed:", error);
    return response({ success: false, error: "Leaderboard temporarily unavailable.", leaderboard: [] }, 503, 5);
  }
}
