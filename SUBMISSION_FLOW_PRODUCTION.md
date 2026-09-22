# UpForge Startup Submission — Production Flow

The public submission flow is intentionally lightweight:

1. Founder/company identity
2. Company details
3. Server-side intake record
4. Optional EmailJS notifications
5. Editorial review
6. Registry decision
7. UFRN and public profile if approved

## Submission record

The form writes to the Firestore `startup_submissions` collection through `/api/startup-submission`.
EmailJS is a notification layer and is not the source of truth.

## Company email rule

Consumer mailbox domains (Gmail, Yahoo, Outlook, Hotmail, iCloud, Proton, etc.) are rejected.
If a company website is supplied, the email domain must align with the website host.

This is an intake-quality rule only. It does not independently prove employment, ownership, incorporation, or legal status.

## EmailJS

Configure:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

The submission can still be stored if EmailJS is temporarily unavailable; the UI does not falsely report the submission as failed after the registry record has been saved.

## Firebase Admin

Configure server-side secrets:

- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`

Rotate any Firebase service-account key that was ever exposed outside the deployment secret store.
