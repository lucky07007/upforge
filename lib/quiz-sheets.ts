/**
 * Lightweight Google Sheets leaderboard transport.
 *
 * The Worker only proxies small JSON payloads. Sorting/counting is done by
 * the Apps Script side so quiz traffic does not consume Worker CPU on large
 * sheet scans.
 */

const DEFAULT_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycby_DTgJndG96oIUY3xhkiDvW6ZDZUn4_WmxjC5mwP5VpBMQSXvO4D90DZokZz-_WMfxQA/exec";

export const QUIZ_SHEET_WEB_APP_URL = DEFAULT_WEB_APP_URL;

// Kept in server-side code so Cloudflare Worker Variables/Secrets are not required
// for the current production setup. Move this back to a managed secret later.
const QUIZ_SHEET_SECRET = "UF-QZ-2026-9xK7mP4vR8tN2sL6wC5yH3jD";

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, timer };
}

async function readJson(response: Response) {
  const text = await response.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Google Sheets service returned an invalid response.");
  }
  if (!response.ok || !data?.success) {
    throw new Error(String(data?.error || `Google Sheets service returned ${response.status}.`));
  }
  return data;
}

export async function fetchQuizSheet(action: string, params: Record<string, string> = {}) {
  const url = new URL(QUIZ_SHEET_WEB_APP_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const { controller, timer } = withTimeout(8000);
  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });
    return await readJson(response);
  } finally {
    clearTimeout(timer);
  }
}

export async function appendQuizSheetResult(payload: Record<string, unknown>) {
  if (!QUIZ_SHEET_SECRET) {
    throw new Error("Quiz leaderboard secret is not configured.");
  }

  const { controller, timer } = withTimeout(10000);
  try {
    const response = await fetch(QUIZ_SHEET_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...payload, secret: QUIZ_SHEET_SECRET }),
      cache: "no-store",
      signal: controller.signal,
    });
    return await readJson(response);
  } finally {
    clearTimeout(timer);
  }
}
