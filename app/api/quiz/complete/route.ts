import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { appendQuizSheetResult } from "@/lib/quiz-sheets";
import { allowRateLimitedRequest, getClientIp } from "@/lib/quiz-rate-limit";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
};

function json(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function cleanName(value: unknown) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function cleanAttemptId(value: unknown) {
  return String(value ?? "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 48);
}

function makeId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
    }
  } catch {}
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

function getBadge(percentage: number) {
  if (percentage >= 90) return "Top 1% Founder Elite";
  if (percentage >= 70) return "Growth Master";
  if (percentage >= 50) return "Startup Operator";
  return "Emerging Founder";
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 64 * 1024) return json({ success: false, error: "Request is too large." }, 413);

    const rate = allowRateLimitedRequest(`complete:${getClientIp(req)}`, 30);
    if (!rate.allowed) {
      const response = json({ success: false, error: "Too many completion attempts. Please try again shortly." }, 429);
      response.headers.set("Retry-After", String(rate.retryAfterSeconds));
      return response;
    }

    const body = await req.json();
    if (String(body?.website || "").trim()) return json({ success: false, error: "Invalid submission." }, 400);

    const quizSlug = String(body?.quizSlug || "").trim();
    const answers = body?.answers && typeof body.answers === "object" ? body.answers : {};
    const userName = cleanName(body?.userName);
    const attemptId = cleanAttemptId(body?.attemptId) || makeId();

    if (!userName) return json({ success: false, error: "Please enter your name before starting the challenge." }, 400);

    const quiz = QUIZ_REGISTRY.find((item) => item.slug === quizSlug || item.id === quizSlug);
    if (!quiz) return json({ success: false, error: "Quiz not found." }, 404);

    let score = 0;
    let answeredQuestionCount = 0;

    for (const question of quiz.questions) {
      const selected = Number(answers[String(question.id)]);
      if (Number.isInteger(selected) && selected >= 0 && selected < question.options.length) {
        answeredQuestionCount += 1;
        if (selected === question.correctIndex) score += 1;
      }
    }

    if (answeredQuestionCount !== quiz.questions.length) {
      return json({ success: false, error: "Please answer every question before completing the challenge." }, 400);
    }

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / Math.max(totalQuestions, 1)) * 100);
    const timeTakenSeconds = Math.max(1, Math.min(Number(body?.timeTakenSeconds) || 1, 60 * 60));
    const badgeEarned = getBadge(percentage);
    const certificateId = `UFR-CERT-${quizSlug.slice(0, 8).toUpperCase()}-${attemptId.slice(-8).toUpperCase()}`;
    const completedAt = new Date().toISOString();

    const record = {
      id: `sheet_${attemptId}`,
      attemptId,
      userName,
      quizSlug: quiz.slug,
      quizTitle: quiz.title.split("|")[0].trim(),
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      badgeEarned,
      certificateId,
      completedAt,
    };

    const saved = await appendQuizSheetResult(record);
    const savedRecord = saved?.record && typeof saved.record === "object"
      ? { ...record, ...saved.record }
      : record;

    return json({
      success: true,
      completionId: String(saved?.completionId || record.id),
      certificateId: String(savedRecord.certificateId || certificateId),
      rank: Number(saved?.rank || 0),
      top: saved?.top || null,
      record: savedRecord,
    });
  } catch (error) {
    console.error("Quiz completion error:", error);
    return json({ success: false, error: "We could not record this completion. Please retry once." }, 500);
  }
}
