# Phase 2 — Member portal (`circle.fba.my`)

Member login and gated content for Fishing Buddies Academy. Phase 1 (`fba.my`) stays a static marketing site; Phase 2 is a **separate app** on **`circle.fba.my`**.

## Goals

- Full auth for members (WhatsApp number + password)
- Gated **course modules**
- **Events** with register-interest via admin WhatsApp
- Lightweight **marketplace** that deep-links to the existing external store
- Roles: **member**, **coach**, **admin**
- Bilingual UI from day one (**MS** + **EN**)

## Relationship to Phase 1

| Surface | Host | Role |
| --- | --- | --- |
| Marketing site | `fba.my` | Public landing, blog, about, contact (WhatsApp) — static export + S3/CloudFront |
| Member portal | `circle.fba.my` | Auth + modules + events + marketplace links |
| Store / payments | `fishingbuddiesacademy.com` (and current CTAs) | External forever — portal only redirects |

No entitlement differences across FBA Pro / Circle / Premier / Reel Master: **any approved member gets the same portal access**.

## Auth

| Item | Decision |
| --- | --- |
| Identifier | WhatsApp number (E.164, e.g. `60176591614`) — unique |
| Credential | Password |
| Email | Optional; profile/record only — **not** used for login |
| OTP | None |
| Signup | Self-serve |
| Access | Admin must **approve** before the account can use the portal |
| Migration | None (no existing member import) |

### Signup flow

```text
User signs up (WhatsApp + password, optional email)
        ↓
Account status: pending
        ↓
Admin approves
        ↓
Role: member (default)
        ↓
User can sign in and use the portal
```

Admin may later **promote** a member to **coach**.

### Password reset / recovery

To be designed in implementation (e.g. admin-assisted reset, or optional email recovery later). Phase 2 does **not** use WhatsApp OTP.

## Roles

| Role | Capabilities |
| --- | --- |
| **Member** (default after approval) | Sign in; view modules; browse marketplace links; register interest in events (WhatsApp) |
| **Coach** | Everything a member can + **edit modules** |
| **Admin** | Approve/reject signups; promote/demote coaches; full portal control |

Decap/GitHub auth on `fba.my/admin/` remains **staff CMS for the marketing blog only** — separate from portal roles.

## Features

### Course modules

- Visible only to authenticated, **approved** users
- Content is managed **manually in code** (repo + deploy) — no in-app media uploader in Phase 2
- Coaches (and admins) can **edit modules** within the portal’s edit surface as implemented; source of truth for media/files remains code/deploy unless later expanded

### Marketplace

- Small in-portal listing / entry points
- Each item **redirects** to the same external store URLs used today
- **No in-app payments** — checkout stays on the external store forever

### Events

- Members can **register interest** only
- Interest action opens **admin WhatsApp** (same pattern as Phase 1 contact) — no in-app RSVP/attendance backend in Phase 2

## Internationalisation

- Auth and portal UI in **Bahasa Malaysia** and **English**
- Default locale aligned with Phase 1 where practical (`ms` default, `en` alternate)

## Architecture (direction)

Phase 1 stays on static export. Phase 2 needs a real app runtime (sessions/API), hosted separately:

```text
fba.my          →  existing S3 + CloudFront (static)
circle.fba.my   →  member portal (auth + APIs + gated UI)
```

Suggested AWS-aligned shape (to refine during build):

- Cognito (or equivalent) with **phone/WhatsApp as username**, email optional attribute
- Custom attribute or groups for `pending` / `member` / `coach` / `admin`
- API + datastore for approvals, events metadata, module metadata as needed
- Portal frontend on `circle.fba.my` (CloudFront + app hosting as chosen)
- CDK stacks added under `infra/` alongside existing certificate/hosting/OIDC

Exact stack (App Router SSR vs SPA + API Gateway/Lambda, Cognito Hosted UI vs custom forms) is an implementation choice; product rules above are fixed.

## Out of scope (Phase 2)

- In-app payments / checkout
- WhatsApp or SMS OTP
- Replacing `fishingbuddiesacademy.com`
- Per-program entitlements or tiered access
- Importing existing members from spreadsheets / Facebook / store
- In-app event RSVP or attendance tracking
- Rich media CMS / upload pipeline for modules (content ships via code)

## Open implementation notes

These do not change product scope but should be decided during build:

1. Cognito custom auth vs custom backend for WhatsApp-as-username + password
2. How coaches “edit modules” maps to git/deploy vs a thin admin API
3. Password recovery without OTP (admin reset vs optional email later)
4. DNS/ACM for `circle.fba.my` (extend certificate stack or new cert)
5. Link from `fba.my` marketing CTAs into `circle.fba.my` login/signup

## Acceptance checklist

- [ ] User can sign up with WhatsApp + password (email optional)
- [ ] Pending users cannot access gated content until admin approves
- [ ] Approved user is a member and can sign in on `circle.fba.my`
- [ ] Admin can promote member → coach; coach can edit modules
- [ ] Modules are gated; marketplace links out externally
- [ ] Event interest opens admin WhatsApp
- [ ] MS and EN UI available
- [ ] `fba.my` marketing site remains static and unchanged in role
