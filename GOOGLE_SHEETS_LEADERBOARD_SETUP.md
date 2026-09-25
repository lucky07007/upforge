# UpForge Google Sheets Quiz Leaderboard

The quiz leaderboard no longer reads or writes quiz scores through Firebase.

## Sheet columns

Use exactly this first row:

Name | Quiz | Score | Total | Date

Your published Sheet URL is already wired into the app for public reads.

## One-time write setup

1. Open the Google Sheet.
2. Make sure the first row is exactly `Name | Quiz | Score | Total | Date`.
3. Create an Apps Script from Extensions → Apps Script.
4. Paste `google-apps-script/Code.gs` into the script editor.
5. Change `CHANGE_THIS_TO_A_LONG_RANDOM_SECRET` to a long random secret.
6. Deploy → New deployment → Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Copy the Web app URL ending in `/exec`.
10. Set these environment variables on the UpForge deployment:

`UPFORGE_QUIZ_SHEET_WEB_APP_URL=<your /exec URL>`

`UPFORGE_QUIZ_SHEET_SECRET=<the exact same secret>`

Do not put the secret in frontend code or the public repository.

## Automatic updates

The published Sheet is used as the leaderboard's read source and is cached for 60 seconds by the application. The current UpForge /exec endpoint is already configured in the server-side code, so no URL change is needed unless you replace the Apps Script deployment. Google says published Sheets automatically republish source changes; the public version can take a few minutes to reflect changes.

## Security

Do NOT give public users Editor access to the Sheet. The Apps Script web app is the only write path.
