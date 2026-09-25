/**
 * UpForge Quiz Leaderboard Google Apps Script
 * Sheet columns MUST be:
 * Name | Quiz | Score | Total | Date
 *
 * Deploy as Web app:
 * Execute as: Me
 * Who has access: Anyone
 *
 * Then set the same secret in your UpForge deployment as:
 * UPFORGE_QUIZ_SHEET_SECRET
 */
const SHEET_NAME = "Leaderboard";
const SECRET = "CHANGE_THIS_TO_THE_SAME_SECRET_USED_IN_CLOUDFLARE";

function doGet(e) {
  return json_({ success: true, service: "UpForge Quiz Leaderboard" });
}

function doPost(e) {
  try {
    const body = JSON.parse(e?.postData?.contents || "{}");
    if (body.secret !== SECRET) return json_({ success: false, error: "Unauthorized" });

    const name = String(body.name || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
    const quiz = String(body.quiz || "").trim().slice(0, 180);
    const score = Number(body.score);
    const total = Number(body.total);
    const date = String(body.date || new Date().toISOString()).trim().slice(0, 80);

    if (!name || !quiz || !Number.isFinite(score) || !Number.isFinite(total)) {
      return json_({ success: false, error: "Invalid leaderboard row" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([name, quiz, Math.floor(score), Math.max(1, Math.floor(total)), date]);

    return json_({ success: true });
  } catch (error) {
    return json_({ success: false, error: String(error) });
  }
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
