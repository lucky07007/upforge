import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { appendQuizResult } from "@/lib/quiz-google-sheets";
import { allowRateLimitedRequest, getClientIp } from "@/lib/quiz-rate-limit";

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function json(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function cleanName(value: unknown) {
  return String(value ?? "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
}

function makeId(prefix: string) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
    : Math.random().toString(36).slice(2, 14);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
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
      const result = json({ success: false, error: "Too many completion attempts. Please try again shortly." }, 429);
      result.headers.set("Retry-After", String(rate.retryAfterSeconds));
      return result;
    }

    const body = await req.json();
    if (String(body?.website || "").trim()) return json({ success: false, error: "Invalid submission." }, 400);

    const quizSlug = String(body?.quizSlug || "").trim();
    const answers = body?.answers && typeof body.answers === "object" ? body.answers : {};
    const userName = cleanName(body?.userName);
    if (!userName) return json({ success: false, error: "Please enter your name before starting the challenge." }, 400);

    const quiz = QUIZ_REGISTRY.find((item) => item.slug === quizSlug);
    if (!quiz) return json({ success: false, error: "Quiz not found." }, 404);

    let score = 0;
    let answered = 0;
    for (const question of quiz.questions) {
      const selected = Number(answers[String(question.id)]);
      if (Number.isInteger(selected) && selected >= 0 && selected < question.options.length) {
        answered += 1;
        if (selected === question.correctIndex) score += 1;
      }
    }

    const totalQuestions = quiz.questions.length;
    if (answered !== totalQuestions) {
      return json({ success: false, error: "Please answer every question before completing the challenge." }, 400);
    }

    const percentage = Math.round((score / Math.max(totalQuestions, 1)) * 100);
    const badgeEarned = getBadge(percentage);
    const completedAt = new Date().toISOString();
    const completionId = makeId("sheet");
    const certificateId = `UFR-CERT-${quizSlug.slice(0, 8).toUpperCase()}-${completionId.slice(-8).toUpperCase()}`;
    const quizTitle = quiz.title.split("|")[0].trim();

    await appendQuizResult({
      userName,
      quizTitle,
      score,
      totalQuestions,
      date: completedAt,
    });

    return json({
      success: true,
      completionId,
      certificateId,
      record: {
        id: completionId,
        userName,
        score,
        totalQuestions,
        percentage,
        badgeEarned,
        timeTakenSeconds: Math.max(0, Math.min(Number(body?.timeTakenSeconds) || 0, 3600)),
        completedAt,
        quizSlug,
        quizTitle,
      },
    });
  } catch (error) {
    console.error("Quiz completion error:", error);
    return json({ success: false, error: "We could not record this completion. Please retry once." }, 500);
  }
}
