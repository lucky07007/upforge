# UpForge credential rotation checklist

The previous project snapshot contained a Firebase Admin service-account private key in source code. Treat that credential as compromised and rotate it before production deployment.

## 1. Firebase Admin

1. In Google Cloud Console, open project `upforge-quizz`.
2. Open IAM & Admin → Service Accounts.
3. Find the service account used by the UpForge quiz/Firestore API.
4. Delete/revoke the old exposed key.
5. Create a new JSON key only if your deployment requires it; store it securely.
6. Configure the deployment with:

```text
FIREBASE_ADMIN_PROJECT_ID=...
FIREBASE_ADMIN_CLIENT_EMAIL=...
FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

These are server-only values. Never prefix them with `NEXT_PUBLIC_` and never commit them.

## 2. EmailJS

The submission/contact/feedback/campaign flows now read EmailJS configuration from environment variables. If the old EmailJS account/service configuration was exposed or is being replaced, rotate/recreate the relevant EmailJS configuration and update the deployment variables.

## 3. Public frontend configuration

EmailJS service IDs and public keys are not substitutes for server secrets. Keep private SMTP credentials and dashboard private keys out of the repository.
