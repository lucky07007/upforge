# UpForge submission email setup

The startup submission flow uses two EmailJS templates. Keep identifiers in deployment environment variables instead of source code.

## Admin template

Suggested ID: `template_upforge_submission_admin_v2`

Variables: `to_email`, `reply_to`, `founder_name`, `startup_name`, `sender_email`, `company_website`, `industry`, `founded_year`, `message`.

Subject: `New UpForge registry submission — {{startup_name}}`

Send to `{{to_email}}`, with Reply-To `{{reply_to}}`.

## Founder confirmation template

Suggested ID: `template_upforge_submission_confirmation_v2`

Variables: `to_email`, `reply_to`, `founder_name`, `startup_name`, `sender_email`, `ufrn_status`, `message`.

Subject: `UpForge submission received — {{startup_name}}`

Use an official UpForge sender such as `contact@upforge.org`.

## Environment variables

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Never commit private SMTP credentials or dashboard private keys.

## Company-email rule

The public form rejects common consumer mailbox domains such as Gmail, Yahoo, Outlook, Hotmail, iCloud and Proton. It expects a company-domain address such as `founder@company.com`. This is an intake-quality rule, not proof of employment or ownership.
