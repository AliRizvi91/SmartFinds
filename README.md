# smartfinds

Partnership infrastructure for advertisers and publishers — an original
affiliate marketing platform (inspired by the *category* of company Awin
operates in, with an entirely original brand, design system, and codebase).

This is a **scaffold-stage** monorepo: the backend is fully wired and
verified end-to-end (installs, type-checks, builds, and boots). The frontend
has its design system, core components, homepage hero, and every route in
the sitemap stubbed and building cleanly. Neither app has been run against a
real MongoDB instance or deployed — see "Current status" below for exactly
what's real vs. placeholder.

## Architecture

```
smartfinds/
  apps/
    web/     Next.js 15 (App Router) + TypeScript + Tailwind — frontend
    api/     NestJS + TypeScript + Mongoose — REST API
  packages/
    types/   Shared TypeScript types/enums used by both apps
```

Both apps consume `@smartfinds/types` as a real npm workspace dependency (not a
relative path hack), so a type or enum defined once — `UserRole`,
`ProgramStatus`, etc. — is the same value on both sides of the API boundary.

### Tech stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS, Framer Motion,
  Redux Toolkit, React Hook Form + Zod, Axios, Recharts, lucide-react
- **Backend**: NestJS, TypeScript, Mongoose (MongoDB), Passport-JWT, class-validator,
  Helmet, `@nestjs/throttler`, Swagger
- **Storage**: Cloudinary (module scaffolded; needs real credentials to upload)

## Current status

### Backend (`apps/api`) — fully scaffolded and verified

20 modules: `auth`, `users`, `advertisers`, `publishers`, `affiliate-programs`,
`campaigns`, `applications`, `tracking-links`, `clicks`, `conversions`,
`commissions`, `payouts`, `transactions`, `marketing-assets`, `notifications`,
`analytics`, `admin`, `cloudinary`, `health`.

- `auth` is the most complete: register/login, JWT access + refresh tokens
  with rotation, forgot/reset password, email verification, role guards.
  The email-sending and password-reset-token-lookup steps are marked `TODO`
  — they need the notification/email module wired to an actual provider
  (Resend) to be real.
- Every other domain module has a real Mongoose schema, DTOs with
  `class-validator` rules, and a working CRUD service/controller
  (paginated `findAll`, `findOne`, `update`, `remove`).
- `analytics` does real MongoDB aggregation (KPI overview + time-series) —
  not mocked — but needs the `scope` (advertiser/publisher ID) wired to the
  authenticated user instead of trusted from the query string before it's
  production-safe.
- `admin` is a thin cross-cutting controller that delegates to each domain's
  own service.
- **Verified in this environment**: `npm install`, `tsc --noEmit`, and
  `nest build` all pass clean, and the compiled app was boot-tested — the
  full dependency-injection graph resolves. It only blocks on connecting to
  a real MongoDB, which isn't available in the sandbox this was built in.
- **Not verified here** (no real MongoDB, no internet beyond package
  registries in the build sandbox): actually querying data, the seed script
  writing real documents, Cloudinary uploads, and sending email.

### Frontend (`apps/web`) — scaffolded and verified

- Design system: smartfinds brand tokens (see below), Tailwind config, global
  CSS, three font families via `next/font/google`.
- Core components: `Navbar`, `Footer`, `Button`, `Container`,
  `SectionHeading`, `DashboardShell` (role-aware sidebar for the three
  dashboards).
- Homepage: a real hero (with an original, hand-composed SVG "dashboard
  visual" — not a screenshot) plus a "How it works" section. The other ~16
  homepage sections from the spec (trusted brands, benefits, testimonials,
  FAQ, etc.) are **not built yet**.
- Every other route in the spec exists as a real, routed page — public
  pages, all seven auth pages, and all three dashboards — but as clean
  placeholder content, not final designs.
- **Verified in this environment**: `npm install` and `next build` both
  succeed across all 25 routes, with type-checking and linting passing.
  (One caveat: this sandbox has no network access to `fonts.googleapis.com`,
  so the build was verified once with the Google Fonts imports temporarily
  swapped for system fonts, then the real `next/font/google` code was
  restored afterwards — that part is unverified in *this* environment but
  is standard, well-supported Next.js and will build fine wherever the
  build has normal internet access.)

### Not started yet

- Categories, blog posts, and case studies models (mentioned in the spec's
  data model list but not yet implemented — everything else is).
- Automated tests (Jest is installed and configured for the API; no test
  files written yet).
- Real Cloudinary uploads, real transactional email sending.
- CI, deployment configuration.

## Brand & design system

**smartfinds** — "arc" (a growth trajectory) + "lane" (a tracked path/link).

| Token | Value | Use |
|---|---|---|
| `ink` | `#0F1C1A` | Dark section backgrounds |
| `paper` | `#F7F6F2` | Light page background |
| `purple` | `#1F6F5C` | Primary accent — trust/growth |
| `gold` | `#C9A227` | Sparing use — commission/value moments only |

Typography: **dmSerifDisplay** (display/headlines), **IBM Plex Sans** (UI/body),
**IBM Plex Mono** (tabular metrics only).

## Getting started

### Prerequisites

- Node.js 20+
- A MongoDB instance (local or Atlas)
- (Optional, for uploads) A Cloudinary account

### Install

```bash
npm install
```

This installs all workspaces (`apps/web`, `apps/api`, `packages/types`) from
the root, and npm's workspace resolution symlinks `@smartfinds/types` into both
apps automatically.

### Environment variables

```bash
cp .env.example .env
```

Then fill in at minimum `DATABASE_URL`, `JWT_SECRET`, and
`JWT_REFRESH_SECRET`. See `.env.example` for the full list (Cloudinary and
email variables are optional until you need uploads/email).

Copy the same file into `apps/api/.env` — NestJS's `ConfigModule` reads from
the app's own working directory.

### Build the shared types package first

```bash
npm run build --workspace=packages/types
```

(Only needed once, or after changing `packages/types/src/index.ts` — the
apps import the compiled output.)

### Run the backend

```bash
npm run dev:api
```

API runs on `http://localhost:4000/api/v1`. Swagger docs at
`http://localhost:4000/docs`. Health check at `/api/v1/health`.

### Run the frontend

```bash
npm run dev:web
```

Runs on `http://localhost:3000`.

### Seed development data

With a MongoDB instance reachable at `DATABASE_URL`:

```bash
npm run seed --workspace=apps/api
```

Seeds 1 admin, 5 advertisers, 20 publishers, 15 affiliate programs, tracking
links, 100+ clicks, and their resulting conversions, commissions, and
payouts, all using fictional brand names. All seeded users share the
password `Password123!`.

## API conventions

Every response follows:

```json
{ "success": true, "data": { }, "message": "Success" }
```

or

```json
{ "success": false, "message": "Something went wrong", "error": "ERROR_CODE" }
```

enforced globally by `ResponseInterceptor` and `AllExceptionsFilter` — no
controller needs to build this shape by hand.

## Suggested next build passes

1. Finish the remaining ~16 homepage sections (trust bar, benefits,
   testimonials, integrations, FAQ, final CTA) in the brand's visual
   language.
2. Wire the auth pages' forms to the API with React Hook Form + Zod +
   the Redux auth slice, including token storage/refresh.
3. Build out the three dashboards for real: KPI cards wired to
   `/analytics/overview`, tables with pagination/filtering for
   campaigns/programs/payouts, and the "create program" / "generate
   tracking link" flows.
4. Wire `CloudinaryService` into the advertiser program/campaign upload
   flows and the user avatar flow.
5. Implement the email module (Resend) and replace the `TODO`s in
   `AuthService`.
6. Add `categories`, `blog-posts`, and `case-studies` modules.
7. Write the Jest test suites for the ten critical flows listed in the
   original spec.
