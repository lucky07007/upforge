/**
 * UpForge Quiz Leaderboard — Google Apps Script Web App
 *
 * Visible columns (kept first):
 * Name | Quiz | Score | Total | Date | Time Taken
 *
 * Internal columns are appended automatically:
 * Attempt ID | Certificate ID | Quiz Slug
 *
 * Website -> Cloudflare/Next server -> this Web App -> Google Sheet
 */

const SHEET_NAME = "Leaderboard";

// Keep this value identical to the UpForge server-side quiz configuration.
// Security can be upgraded later; the current goal is a stable production flow.
const SECRET = "UF-QZ-2026-9xK7mP4vR8tN2sL6wC5yH3jD";

const REQUIRED_HEADERS = [
  "Name",
  "Quiz",
  "Score",
  "Total",
  "Date",
  "Time Taken",
  "Attempt ID",
  "Certificate ID",
  "Quiz Slug",
];

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || "health").toLowerCase();

    if (action === "health") {
      return json_({
        success: true,
        service: "UpForge Quiz Leaderboard",
        status: "online",
      });
    }

    const sheet = getSheet_();
    const rows = readRows_(sheet);

    if (action === "stats" || action === "counts") {
      return json_(buildStats_(rows));
    }

    if (action === "rank") {
      const id = clean_(e && e.parameter && e.parameter.id, 120);
      if (!id) return json_({ success: false, error: "Result ID is required." });

      const target = rows.find(function (row) { return row.id === id; });
      if (!target) return json_({ success: false, error: "Result not found." });

      const scope = String((e && e.parameter && e.parameter.scope) || "global").toLowerCase();
      const period = String((e && e.parameter && e.parameter.period) || "all-time").toLowerCase() === "daily"
        ? "daily"
        : "all-time";
      const ranked = scope === "quiz"
        ? rankRows_(rows, target.quizSlug, target.quizTitle, period)
        : rankRows_(rows, "", "", period);
      const rank = findRank_(ranked, target.id);

      return json_({
        success: true,
        rank: rank,
        record: toPublicEntry_(target, rank),
        top: ranked.length ? toPublicEntry_(ranked[0], 1) : null,
      });
    }

    if (action === "leaderboard") {
      const scope = String((e && e.parameter && e.parameter.scope) || "quiz").toLowerCase();
      const quizSlug = clean_(e && e.parameter && e.parameter.quizSlug, 180);
      const quizTitle = clean_(e && e.parameter && e.parameter.quizTitle, 180);
      const period = String((e && e.parameter && e.parameter.period) || "all-time").toLowerCase() === "daily"
        ? "daily"
        : "all-time";
      const limit = clampInt_(e && e.parameter && e.parameter.limit, 10, 1, 50);
      const offset = clampInt_(e && e.parameter && e.parameter.offset, 0, 0, 10000);

      let filtered = rows;

      if (scope !== "global") {
        const slug = quizSlug.toLowerCase();
        const title = quizTitle.toLowerCase();
        filtered = filtered.filter(function (row) {
          return (slug && row.quizSlug.toLowerCase() === slug) ||
            (title && row.quizTitle.toLowerCase() === title) ||
            (!slug && !title);
        });
      }

      if (period === "daily") {
        const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "UTC", "yyyy-MM-dd");
        filtered = filtered.filter(function (row) {
          return dateKey_(row.completedAt) === today;
        });
      }

      filtered.sort(compareRows_);

      const total = filtered.length;
      const page = filtered.slice(offset, offset + limit).map(function (row, index) {
        return toPublicEntry_(row, offset + index + 1);
      });

      return json_({
        success: true,
        leaderboard: page,
        count: total,
        hasMore: offset + limit < total,
        scope: scope === "global" ? "global" : "quiz",
        period: period,
      });
    }

    return json_({
      success: false,
      error: "Unknown action",
    });
  } catch (error) {
    return json_({
      success: false,
      error: String(error && error.message ? error.message : error),
    });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ success: false, error: "Missing request body" });
    }

    const body = JSON.parse(e.postData.contents);

    if (String(body.secret || "") !== SECRET) {
      return json_({ success: false, error: "Unauthorized" });
    }

    const name = clean_(body.name, 80);
    const quiz = clean_(body.quiz || body.quizTitle, 180);
    const quizSlug = clean_(body.quizSlug, 180);
    const score = int_(body.score, 0);
    const total = Math.max(1, int_(body.total, 1));
    const timeTakenSeconds = clampInt_(body.timeTakenSeconds, 1, 1, 3600);
    const date = clean_(body.date || new Date().toISOString(), 80);
    const attemptId = clean_(body.attemptId, 80);
    const certificateId = clean_(body.certificateId, 120);

    if (!name || !quiz || score < 0 || score > total) {
      return json_({ success: false, error: "Invalid leaderboard data" });
    }

    lock.waitLock(5000);

    const sheet = getSheet_();
    ensureHeaders_(sheet);

    const rows = readRows_(sheet);

    if (attemptId) {
      const duplicate = rows.find(function (row) {
        return row.attemptId && row.attemptId === attemptId;
      });

      if (duplicate) {
        const ranked = rankRows_(rows, duplicate.quizSlug || quizSlug, duplicate.quizTitle || quiz, "all-time");
        return json_({
          success: true,
          duplicate: true,
          completionId: duplicate.id,
          certificateId: duplicate.certificateId || certificateId,
          rank: findRank_(ranked, duplicate.id),
          top: ranked.length ? toPublicEntry_(ranked[0], 1) : null,
          record: toPublicEntry_(duplicate, findRank_(ranked, duplicate.id)),
        });
      }
    }

    const id = attemptId || makeId_(name, quiz, date);
    const finalCertificateId = certificateId || ("UFR-CERT-" + slugPart_(quizSlug || quiz) + "-" + id.slice(-8).toUpperCase());

    sheet.appendRow([
      name,
      quiz,
      score,
      total,
      date,
      timeTakenSeconds,
      id,
      finalCertificateId,
      quizSlug,
    ]);

    SpreadsheetApp.flush();

    const updatedRows = readRows_(sheet);
    const ranked = rankRows_(updatedRows, quizSlug, quiz, "all-time");
    const saved = updatedRows.find(function (row) { return row.id === id; }) || updatedRows[updatedRows.length - 1];
    const rank = findRank_(ranked, saved.id);

    return json_({
      success: true,
      message: "Leaderboard result saved",
      completionId: id,
      certificateId: finalCertificateId,
      rank: rank,
      top: ranked.length ? toPublicEntry_(ranked[0], 1) : null,
      record: toPublicEntry_(saved, rank),
    });
  } catch (error) {
    return json_({
      success: false,
      error: String(error && error.message ? error.message : error),
    });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
  if (!sheet) throw new Error("Leaderboard sheet not found");
  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), REQUIRED_HEADERS.length);
  const current = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];

  for (var i = 0; i < REQUIRED_HEADERS.length; i++) {
    if (!String(current[i] || "").trim()) current[i] = REQUIRED_HEADERS[i];
  }

  // If the first row is blank, create the standard header row.
  const hasAny = current.some(function (value) { return String(value || "").trim(); });
  if (!hasAny) {
    for (var j = 0; j < REQUIRED_HEADERS.length; j++) current[j] = REQUIRED_HEADERS[j];
  }

  sheet.getRange(1, 1, 1, REQUIRED_HEADERS.length).setValues([current.slice(0, REQUIRED_HEADERS.length)]);
}

function readRows_(sheet) {
  ensureHeaders_(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const width = Math.max(sheet.getLastColumn(), REQUIRED_HEADERS.length);
  const values = sheet.getRange(2, 1, lastRow - 1, width).getValues();
  const rows = [];

  values.forEach(function (row, index) {
    const name = clean_(row[0], 80);
    const quizTitle = clean_(row[1], 180);
    if (!name || !quizTitle) return;

    const score = Math.max(0, int_(row[2], 0));
    const totalQuestions = Math.max(1, int_(row[3], 1));
    const completedAt = clean_(row[4], 80);
    const timeTakenSeconds = clampInt_(row[5], 0, 0, 3600);
    const attemptId = clean_(row[6], 80);
    const certificateId = clean_(row[7], 120);
    const quizSlug = clean_(row[8], 180);
    const id = attemptId || ("row_" + String(index + 2));

    rows.push({
      id: id,
      attemptId: attemptId,
      certificateId: certificateId,
      userName: name,
      quizTitle: quizTitle,
      quizSlug: quizSlug,
      score: score,
      totalQuestions: totalQuestions,
      percentage: Math.min(100, Math.max(0, Math.round((score / totalQuestions) * 100))),
      timeTakenSeconds: timeTakenSeconds,
      completedAt: completedAt,
    });
  });

  return rows;
}

function buildStats_(rows) {
  const counts = {};

  rows.forEach(function (row) {
    const slug = row.quizSlug || "";
    const title = row.quizTitle || "";
    if (slug) counts[slug] = (counts[slug] || 0) + 1;
    if (title) counts[title] = (counts[title] || 0) + 1;
  });

  return {
    success: true,
    total: rows.length,
    counts: counts,
  };
}

function rankRows_(rows, quizSlug, quizTitle, period) {
  const slug = String(quizSlug || "").toLowerCase();
  const title = String(quizTitle || "").toLowerCase();
  let filtered = rows.filter(function (row) {
    const slugMatch = slug && row.quizSlug.toLowerCase() === slug;
    const titleMatch = title && row.quizTitle.toLowerCase() === title;
    return slugMatch || titleMatch || (!slug && !title);
  });

  if (period === "daily") {
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "UTC", "yyyy-MM-dd");
    filtered = filtered.filter(function (row) { return dateKey_(row.completedAt) === today; });
  }

  return filtered.sort(compareRows_);
}

function compareRows_(a, b) {
  if (b.percentage !== a.percentage) return b.percentage - a.percentage;
  if (b.score !== a.score) return b.score - a.score;

  const aTime = a.timeTakenSeconds > 0 ? a.timeTakenSeconds : 999999;
  const bTime = b.timeTakenSeconds > 0 ? b.timeTakenSeconds : 999999;
  if (aTime !== bTime) return aTime - bTime;

  const aDate = Date.parse(a.completedAt) || 0;
  const bDate = Date.parse(b.completedAt) || 0;
  return bDate - aDate;
}

function toPublicEntry_(row, rank) {
  return {
    rank: rank || 0,
    id: row.id,
    userName: row.userName,
    score: row.score,
    totalQuestions: row.totalQuestions,
    percentage: row.percentage,
    badgeEarned: getBadge_(row.percentage),
    timeTakenSeconds: row.timeTakenSeconds || 0,
    completedAt: row.completedAt,
    quizSlug: row.quizSlug || "",
    quizTitle: row.quizTitle,
    certificateId: row.certificateId || "",
  };
}

function findRank_(rows, id) {
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].id === id) return i + 1;
  }
  return 0;
}

function getBadge_(percentage) {
  if (percentage >= 90) return "Top 1% Founder Elite";
  if (percentage >= 70) return "Growth Master";
  if (percentage >= 50) return "Startup Operator";
  return "Emerging Founder";
}

function dateKey_(value) {
  const parsed = Date.parse(String(value || ""));
  if (!Number.isNaN(parsed)) {
    return Utilities.formatDate(new Date(parsed), Session.getScriptTimeZone() || "UTC", "yyyy-MM-dd");
  }
  return String(value || "").slice(0, 10);
}

function clean_(value, maxLength) {
  return String(value == null ? "" : value)
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength || 180);
}

function int_(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.floor(parsed) : fallback;
}

function clampInt_(value, fallback, min, max) {
  return Math.min(max, Math.max(min, int_(value, fallback)));
}

function slugPart_(value) {
  return String(value || "QUIZ")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 8)
    .toUpperCase() || "QUIZ";
}

function makeId_(name, quiz, date) {
  const source = name + "|" + quiz + "|" + date + "|" + new Date().getTime();
  let hash = 2166136261;
  for (var i = 0; i < source.length; i++) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return "uf_" + (hash >>> 0).toString(36) + "_" + new Date().getTime().toString(36);
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
