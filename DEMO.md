# Sentinel — Demo Credentials

Sentinel ships with **eight demo accounts — one per role**. Each account is locked
to its own header, left sidebar navigation, and pages. Role access is enforced by
the middleware route guard (`apps/web/proxy.ts`): any attempt to open a page outside
your role's access map is redirected to `/403`.

## Logging in

1. Open the app and go to **`/login`**.
2. Either:
   - **One-click**: press any of the eight "Demo accounts" cards on the login page, or
   - **Manual**: enter one of the emails below with the shared password.

| # | Role | Email | Password | Signs in as | Landing page |
|---|------|-------|----------|-------------|--------------|
| 1 | **Owner** | `owner@sentinel.dev` | `demo123` | Alex Morgan | `/dashboard` |
| 2 | **Admin** | `admin@sentinel.dev` | `demo123` | Jordan Lee | `/admin` |
| 3 | **Security Analyst** | `security@sentinel.dev` | `demo123` | Maya Chen | `/incidents` |
| 4 | **Privacy Officer** | `privacy@sentinel.dev` | `demo123` | Priya Raman | `/ai-passports` |
| 5 | **Compliance Officer** | `compliance@sentinel.dev` | `demo123` | Devon Clarke | `/compliance-admin` |
| 6 | **Developer** | `developer@sentinel.dev` | `demo123` | Sam Whitfield | `/gateway` |
| 7 | **Auditor** | `auditor@sentinel.dev` | `demo123` | Tara Osei | `/audit` |
| 8 | **Viewer** | `viewer@sentinel.dev` | `demo123` | Nadia Haddad | `/dashboard` |

All accounts share the password **`demo123`**.

## How the isolation works

- At login the role is encoded into the `sentinel_session` cookie — there is no
  separate role cookie and no role switcher, so a session can never present a
  different role than the one it authenticated as.
- The **header and left sidebar** are rendered from that session role only
  (`apps/web/lib/role-access.ts` → `NAV_BY_ROLE`): each role sees exactly its own
  navigation groups and identity.
- The **middleware guard** (`proxy.ts` + `canAccessRoute`) checks every request:
  non-members of a route's role list are redirected to `/403`.
- Signing out (top-right menu → **Sign out**) clears the session.

## What each role can see

| Role | Navigation & pages |
|------|--------------------|
| Owner | Everything: Registry, Data Intelligence, Enforcement, Governance, Platform, Administration (incl. Billing, Admin, Government) |
| Admin | Everything except Billing — Admin console and Government oversight included |
| Security Analyst | Gateway, Policies, Incidents, Approvals, Risk, Audit, Reports, Dashboard |
| Privacy Officer | Data Sources, Data Flows, Classification, AI Passports, Policies, Audit, Reports |
| Compliance Officer | Policies, Compliance Admin, Audit, Reports |
| Developer | AI Systems, Applications, Providers, Models, Gateway, Policies, Developer Portal, Integrations |
| Auditor | Audit, Reports (read-focused) |
| Viewer | Dashboard + notifications/search/settings only (read-only view) |

Example: a **Developer** who opens `/incidents` is redirected to `/403` and never
sees the Security Analyst sidebar — the nav and the guard agree on one role source.

## Source of truth

- `apps/web/lib/role-access.ts` — roles, credentials, route access map, per-role nav
- `apps/web/proxy.ts` — middleware session + role guard
- `apps/web/components/app-sidebar.tsx`, `app-topbar.tsx` — role-driven chrome