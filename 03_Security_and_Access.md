# KshetraProof Security and Access Document

## 1. Purpose

Define minimum security and access controls for the KshetraProof prototype and the production direction.

## 2. Security principles

- Least privilege.
- Role-based access.
- Secure defaults.
- Data minimization.
- Auditability.
- Version preservation.
- Explicit simulated-data labelling.
- No automatic legal ownership decisions.

## 3. Roles

| Role | Permissions |
|---|---|
| Surveyor | View assigned villages, capture survey points, upload evidence, submit field notes |
| Officer | Review conflicts, view evidence, manage objections, approve or refer cases |
| Panchayat officer | View village progress and assist public verification |
| Citizen | View allowed draft information and submit objections |
| Administrator | Manage users, roles, villages, configuration, and audit access |

## 4. Access rules

- Surveyors can edit only assigned survey work.
- Surveyors cannot approve final boundaries.
- Citizens cannot view private documents or other owners’ sensitive data.
- Officers can make workflow decisions but not silently delete records.
- Administrators manage configuration but should not alter evidence without an audit entry.
- Every status-changing action must record user, time, previous value, and new value.

## 5. Authentication

### MVP

- Email/password login.
- bcrypt password hashing.
- JWT access token.
- Token expiry.
- Protected routes.
- Demo credentials labelled clearly.

### Production direction

- Government identity integration where available.
- Multi-factor authentication for officers and administrators.
- Device/session management.
- Password reset with verified identity.
- Short-lived access tokens and refresh-token rotation.

## 6. Authorization

Use middleware such as:

```js
requireAuth
requireRole('officer')
requireRole('admin')
```

Do not enforce role restrictions only in the frontend. Repeat them in backend routes.

## 7. Data protection

Protect:

- Owner names.
- Contact information.
- Identity documents.
- Photographs.
- Signatures.
- Voice recordings.
- Land-dispute documents.
- Survey evidence.

Requirements:

- HTTPS in deployment.
- Encryption at rest for production storage.
- Private evidence storage.
- Signed or expiring download links.
- No sensitive data in URLs.
- Input validation and output encoding.
- File-type and file-size checks.

## 8. File-upload security

Allow only approved file types such as JPG, PNG, PDF, and limited audio formats.

- Limit file size.
- Rename files using generated IDs.
- Do not execute uploaded files.
- Scan files in production.
- Store outside the public web root.
- Check authorization before download.

## 9. Audit trail

Record:

- Login events.
- Point captures.
- Evidence uploads.
- Objection submissions.
- Status changes.
- Officer decisions.
- Geometry changes.
- Report generation.
- Data exports.
- Failed authorization attempts.

Audit entries must be append-only for production.

## 10. Privacy and legal boundaries

- The prototype must state that it does not determine title.
- Possession claims must not be displayed as ownership decisions.
- Public maps should hide unnecessary personal information.
- Objections should be visible only to authorized roles and the relevant claimant.
- Data retention periods should be defined by the competent authority.

## 11. API security

- Validate all request bodies.
- Use parameterized database queries.
- Apply rate limits to login and uploads.
- Check ownership and role on every protected resource.
- Configure CORS for known origins only.
- Avoid returning stack traces to users.
- Use consistent error responses.
- Log security events without storing passwords or secrets.

## 12. Prototype secrets

Never commit `.env` files, passwords, JWT secrets, or private documents to Git. Use `.env.example` with placeholder values.

## 13. Security acceptance checklist

- [ ] Protected routes reject unauthenticated users.
- [ ] Surveyors cannot perform officer actions.
- [ ] Uploaded files are validated.
- [ ] Evidence is not publicly exposed by default.
- [ ] Status changes create history records.
- [ ] Demo data is clearly marked.
- [ ] No real personal data is used in the demonstration.
- [ ] Secrets are outside source control.
- [ ] Legal and accuracy disclaimers are visible.
