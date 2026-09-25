// Google Sheets leaderboard data layer.
// Public reads use the published CSV URL. Writes go through a Google Apps Script
// web app so the Sheet itself never needs public edit access.

export type QuizSheetEntry = {
  id: string;
  userName: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
};

const PUBLISHED_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOxI1zaTdZOvNIK56SnjdBUwk67H8spwL3S8KCMQUmsNy3wezcMwAPYSok1L8lZclvvwSt2eUo6fsd/pub?output=csv";

const WRITE_URL = process.env.UPFORGE_QUIZ_SHEET_WEB_APP_URL || "https://script.google.com/macros/s/AKfycbxdIB3PGmg1SM7BWXEodbj20KuiQQnY7OtC2uDfqDflXREeIWyg5p5O5zf4JFpzsWYf3w/exec";
const WRITE_SECRET = process.env.UPFORGE_QUIZ_SHEET_SECRET || "";
const CACHE_TTL_MS = 60_000;

let cache: { expiresAt: number; entries: QuizSheetEntry[] } | null = null;
let inflight: Promise<QuizSheetEntry[]> | null = null;

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value.trim());
      value = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      continue;
    }

    value += char;
  }

  if (value.length || row.length) {
    row.push(value.trim());
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function normalizeHeader(value: string) {
  return value.replace(/^\uFEFF/, "").trim().toLowerCase();
}

function toNumber(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function makeId(name: string, quiz: string, date: string, index: number) {
  const source = `${name}|${quiz}|${date}|${index}`;
  let hash = 2166136261;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `sheet_${(hash >>> 0).toString(36)}_${index}`;
}

async function fetchEntries(): Promise<QuizSheetEntry[]> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.entries;
  if (inflight) return inflight;

  inflight = (async () => {
    const response = await fetch(PUBLISHED_SHEET_URL, {
      headers: { Accept: "text/csv,text/plain,*/*" },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Google Sheet read failed: ${response.status}`);
    }

    const rows = parseCSV(await response.text());
    if (rows.length < 2) return [];

    const headers = rows[0].map(normalizeHeader);
    const column = (name: string) => headers.indexOf(normalizeHeader(name));
    const nameIndex = column("name");
    const quizIndex = column("quiz");
    const scoreIndex = column("score");
    const totalIndex = column("total");
    const dateIndex = column("date");

    if ([nameIndex, quizIndex, scoreIndex, totalIndex, dateIndex].some((i) => i < 0)) {
      throw new Error("Google Sheet must use: Name | Quiz | Score | Total | Date");
    }

    const entries: QuizSheetEntry[] = [];
    for (let i = 1; i < rows.length; i += 1) {
      const row = rows[i];
      const userName = String(row[nameIndex] || "").replace(/[<>]/g, "").trim().slice(0, 80);
      const quizTitle = String(row[quizIndex] || "").trim().slice(0, 180);
      const score = Math.max(0, Math.floor(toNumber(row[scoreIndex] || "0")));
      const totalQuestions = Math.max(1, Math.floor(toNumber(row[totalIndex] || "1", 1)));
      const completedAt = String(row[dateIndex] || "").trim().slice(0, 80);
      if (!userName || !quizTitle) continue;

      entries.push({
        id: makeId(userName, quizTitle, completedAt, i),
        userName,
        quizTitle,
        score,
        totalQuestions,
        percentage: Math.min(100, Math.max(0, Math.round((score / totalQuestions) * 100))),
        completedAt,
      });
    }

    cache = { entries, expiresAt: Date.now() + CACHE_TTL_MS };
    return entries;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export async function getQuizLeaderboardEntries() {
  try {
    return await fetchEntries();
  } catch (error) {
    console.error("[quiz-sheets] read failed:", error);
    if (cache) return cache.entries;
    throw error;
  }
}

export async function appendQuizResult(input: {
  userName: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
}) {
  if (!WRITE_URL) {
    throw new Error("UPFORGE_QUIZ_SHEET_WEB_APP_URL is not configured.");
  }
  if (!WRITE_SECRET) {
    throw new Error("UPFORGE_QUIZ_SHEET_SECRET is not configured.");
  }

  const payload = JSON.stringify({
    secret: WRITE_SECRET,
    name: input.userName,
    quiz: input.quizTitle,
    score: input.score,
    total: input.totalQuestions,
    date: input.date,
  });

  let lastError: unknown = null;

  // Google Apps Script can occasionally take a moment to wake a web-app
  // instance. A single short retry keeps real completions reliable without
  // creating a retry storm or unnecessary Worker CPU usage.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(WRITE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json,text/plain,*/*",
        },
        body: payload,
        cache: "no-store",
        redirect: "follow",
        signal: AbortSignal.timeout(attempt === 0 ? 8000 : 6000),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        cache = null;
        return result;
      }

      lastError = new Error(
        result?.error || `Google Sheet write failed: ${response.status}`
      );
    } catch (error) {
      lastError = error;
    }

    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Google Sheet write failed.");
}
