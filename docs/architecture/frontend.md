# Sentinel frontend architecture

The frontend uses Next.js App Router with route groups for marketing, auth, tenant app, internal admin, and regulator surfaces.

## Route groups

- `(marketing)` for product education and conversion pages
- `(auth)` for registration and login flows
- `app` for authenticated tenant experience
- `gov` for regulator views
- `admin` for internal platform administrators

## Design system

The MVP uses a neutral enterprise security aesthetic: slate surfaces, blue trust accents, strong information hierarchy, and dense UI patterns suited for security operations workflows.

## Key screens

- public landing page
- product and solutions pages
- login and registration flows
- onboarding wizard
- dashboard with risk KPIs and data-flow trends
- policy simulator for live decision demos
- reports and AI data passports
