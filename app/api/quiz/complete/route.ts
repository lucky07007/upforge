import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { adminAddDocument } from "@/lib/firebase-admin";
import { allowRateLimitedRequest, getClientIp } from "@/lib/quiz-rate-limit";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function json(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

function cleanName(value: unknown) {
  const name = String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  return name;
}

function makeId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
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
    if (contentLength > 64 * 1024) {
      return json({ success: false, error: "Request is too large." }, 413);
    }

    const rate = allowRateLimitedRequest(`complete:${getClientIp(req)}`, 30);
    if (!rate.allowed) {
      const response = json(
        {
          success: false,
          error: "Too many completion attempts. Please try again shortly.",
        },
        429
      );
      response.headers.set("Retry-After", String(rate.retryAfterSeconds));
      return response;
    }

    const body = await req.json();
    if (String(body?.website || "").trim()) {
      return json({ success: false, error: "Invalid submission." }, 400);
    }

    const quizSlug = String(body?.quizSlug || "").trim();
    const answers =
      body?.answers && typeof body.answers === "object"
        ? body.answers
        : {};
    const userName = cleanName(body?.userName);
    if (!userName) {
      return json({ success: false, error: "Please enter your name before starting the challenge." }, 400);
    }

    const timeTakenSeconds = Math.max(
      0,
      Math.min(Number(body?.timeTakenSeconds) || 0, 60 * 60)
    );

    const suppliedAttemptId = String(body?.attemptId || "")
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .slice(0, 48);

    const attemptId = suppliedAttemptId || makeId("attempt");

    const quiz = QUIZ_REGISTRY.find((item) => item.slug === quizSlug);

    if (!quiz) {
      return json({ success: false, error: "Quiz not found." }, 404);
    }

    if (!answers || typeof answers !== "object") {
      return json({ success: false, error: "Answers are required." }, 400);
    }

    let score = 0;

    for (const question of quiz.questions) {
      const raw = answers[String(question.id)];
      const selected = Number(raw);

      if (
        Number.isInteger(selected) &&
        selected >= 0 &&
        selected < question.options.length &&
        selected === question.correctIndex
      ) {
        score += 1;
      }
    }

    const totalQuestions = quiz.questions.length;
    const answeredQuestionCount = quiz.questions.reduce((count, question) => {
      const value = Number(answers[String(question.id)]);
      return Number.isInteger(value) && value >= 0 && value < question.options.length
        ? count + 1
        : count;
    }, 0);

    if (answeredQuestionCount !== totalQuestions) {
      return json(
        { success: false, error: "Please answer every question before completing the challenge." },
        400
      );
    }

    const percentage = Math.round((score / Math.max(totalQuestions, 1)) * 100);
    const badgeEarned = getBadge(percentage);
    // Firestore listDocuments() defaults to document-name ASC ordering.
    // Encode the final score into the document ID so the first 10 documents
    // are already the true top 10 without reading the whole collection.
    const scoreKey = [
      String(100 - percentage).padStart(3, "0"),
      String(Math.max(totalQuestions - score, 0)).padStart(4, "0"),
      String(Math.max(timeTakenSeconds, 0)).padStart(6, "0"),
    ].join("_");
    const completionId = `ufc_${scoreKey}_${attemptId}`;
    const certificateId = `UFR-CERT-${quizSlug.slice(0, 8).toUpperCase()}-${attemptId
      .slice(-8)
      .toUpperCase()}`;

    const record = {
      uid: attemptId,
      userName,
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      badgeEarned,
      certificateId,
      quizSlug,
      completedAt: new Date().toISOString(),
    };

    const dayKey = record.completedAt.slice(0, 10);

    // One durable all-time record powers the main quiz leaderboard. A second
    // materialized daily record makes daily rankings cheap: daily requests
    // never need to scan the all-time collection. Both writes happen in
    // parallel, and a daily-write failure never hides a successful completion.
    const writeAllTime = async () => {
      try {
        return await adminAddDocument(
          `leaderboards/${quizSlug}/scores`,
          record,
          completionId
        );
      } catch (error: any) {
        if (String(error?.message || "").includes("409")) return null;
        throw error;
      }
    };

    const writeDaily = async () => {
      try {
        return await adminAddDocument(
          `leaderboards/${quizSlug}/daily/${dayKey}/scores`,
          record,
          completionId
        );
      } catch (error: any) {
        if (String(error?.message || "").includes("409")) return null;
        throw error;
      }
    };

    const [allTimeResult, dailyResult] = await Promise.allSettled([writeAllTime(), writeDaily()]);

    if (allTimeResult.status === "rejected") {
      throw allTimeResult.reason;
    }

    if (dailyResult.status === "rejected") {
      console.error("Quiz daily leaderboard write failed:", dailyResult.reason);
    }

    const doc = allTimeResult.value;

    return json({
      success: true,
      completionId: doc?.id || completionId,
      certificateId,
      record: {
        ...record,
        id: doc?.id || completionId,
      },
    });
  } catch (error) {
    console.error("Quiz completion error:", error);

    return json(
      {
        success: false,
        error: "We could not record this completion. Please retry once.",
      },
      500
    );
  }
}
