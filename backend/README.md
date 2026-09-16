# Secure API foundation

The browser must never initialise Firebase or receive database write capability. Public reads and all editorial writes pass through this API.

## Security contract

- Firestore denies all client access. Firebase Admin bypasses rules and must run under a dedicated least-privilege service account.
- Editorial writes require a verified, revocation-checked Firebase ID token and the custom role claim `editor` or `admin`.
- Published records live in `publishedPredictions`; drafts live in `predictionDrafts`.
- There is no mutation or deletion route for a published record.
- Every creation writes an `auditEvents` record in the same transaction.
- Production fails to start without an explicit CORS origin allowlist.
- Request size and rates are bounded; security headers are enabled.

## Next backend increment

Add a separate correction endpoint that links a new signed correction record to an immutable prediction, then add an audited approval workflow so an editor cannot approve their own publication.
