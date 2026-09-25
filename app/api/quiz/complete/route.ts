import { NextRequest, NextResponse } from "next/server";
import { appendQuizSheetResult } from "@/lib/quiz-sheets";
import { allowRateLimitedRequest, getClientIp } from "@/lib/quiz-rate-limit";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
};

function json(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function clean(value: unknown, max = 180) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function integer(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.floor(n) : fallback;
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 16 * 1024) return json({ success: false, error: "Request is too large." }, 413);

    const rate = allowRateLimitedRequest(`quiz-sync:${getClientIp(req)}`, 20);
    if (!rate.allowed) {
      const response = json({ success: false, error: "Please wait a moment before retrying." }, 429);
      response.headers.set("Retry-After", String(rate.retryAfterSeconds));
      return response;
    }

    const body = await req.json();
    const name = clean(body?.userName || body?.name, 80);
    const quiz = clean(body?.quizTitle || body?.quiz, 180);
    const quizSlug = clean(body?.quizSlug, 180);
    const score = integer(body?.score, -1);
    const total = Math.max(1, integer(body?.total, integer(body?.totalQuestions, 1)));
    const timeTakenSeconds = Math.min(3600, Math.max(1, integer(body?.timeTakenSeconds, 1)));
    const date = clean(body?.date || new Date().toISOString(), 80);
    const attemptId = clean(body?.attemptId, 80);

    if (!name || !quiz || score < 0 || score > total) {
      return json({ success: false, error: "Invalid leaderboard result." }, 400);
    }

    // The browser calculates the quiz result and certificate instantly.
    // This endpoint only forwards the small leaderboard record to Sheets.
    const saved = await appendQuizSheetResult({
      name,
      quiz,
      quizSlug,
      score,
      total,
      timeTakenSeconds,
      date,
      attemptId,
    });

    return json({
      success: true,
      completionId: String(saved?.completionId || ""),
      rank: Number(saved?.rank || 0),
      top: saved?.top || null,
      record: saved?.record || {
        userName: name,
        quizTitle: quiz,
        quizSlug,
        score,
        totalQuestions: total,
        percentage: Math.round((score / total) * 100),
        timeTakenSeconds,
        completedAt: date,
      },
    });
  } catch (error) {
    console.error("Quiz leaderboard sync error:", error);
    return json({ success: false, error: "Leaderboard sync is temporarily unavailable." }, 503);
  }
}
