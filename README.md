# ZeePredict

ZeePredict is currently a responsible football-analysis product prototype. The public pages contain clearly labelled, read-only sample data. They do not publish current fixtures, results, performance claims or betting advice.

## 72-hour containment implemented

- All prediction records are explicitly marked as fictional demo content.
- Win-rate, outcome and accuracy claims have been removed.
- The client-side admin and browser Firebase integration have been removed.
- Firestore rules deny every direct client read and write.
- 18+, responsible-use, interim terms and interim privacy notices are visible.
- A server-only API foundation uses Firebase ID tokens, role claims, validation, rate limiting, CORS allowlisting and immutable published records.

## Run and test

Requires Node.js 20 or later.

```bash
npm ci
npm test
```

The API requires Application Default Credentials and environment settings copied from `.env.example`. Do not commit credentials or service-account JSON.

```bash
npm start
```

Endpoints:

- `GET /health`
- `GET /api/v1/predictions`
- `POST /api/v1/admin/predictions`, requiring a valid Firebase ID token with an `editor` or `admin` role claim

There is deliberately no update or delete endpoint for published predictions. Corrections must be added as separate audited records in a later phase.

## Deployment gate

Do not deploy the API until a dedicated least-privilege service account, production origin allowlist, secrets manager, logging, backup policy and legal review are in place. Deploy `firestore.rules` before connecting any client or backend to the production project.
