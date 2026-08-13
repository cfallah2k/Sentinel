# Sentinel

**AI Data Governance & Control Infrastructure**

> Know where your data goes. Know what AI touches it. Control what AI is allowed to use.

[![Status](https://img.shields.io/badge/status-MVP%20Development-blue)](#project-status)
[![License](https://img.shields.io/badge/license-TBD-lightgrey)](#license)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-e0234e)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791)](https://www.postgresql.org/)
[![Valkey](https://img.shields.io/badge/Valkey-cache%20%2B%20queue-red)](https://valkey.io/)
[![Docker](https://img.shields.io/badge/Docker-supported-2496ed)](https://www.docker.com/)

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Core Capabilities](#core-capabilities)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development](#development)
- [MVP Scope](#mvp-scope)
- [Security Principles](#security-principles)
- [Product Roadmap](#product-roadmap)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Project Status](#project-status)

---

## Overview

Sentinel is an enterprise-grade AI governance platform that provides organizations with visibility and control over how data moves through AI systems. As organizations increasingly adopt large language models, AI agents, AI-powered applications, and automated decision systems, traditional approaches to documenting AI usage in spreadsheets and policy documents are no longer sufficient.

Sentinel addresses this gap by providing infrastructure that answers critical questions:

- What AI systems are we using?
- What data are they processing?
- Where is that data going?
- Which AI providers receive it?
- Are those transfers allowed?
- What happens when a policy is violated?
- Can we prove that our policies are actually being enforced?

---

## The Problem

AI adoption is moving faster than organizational governance. A typical organization may have employees using ChatGPT, Claude, Gemini, Cursor, and other AI tools, while applications leverage Customer Support AI, Internal Assistants, Fraud Detection systems, and AI Agents—all processing internal data including customer records, transactions, employee information, and sensitive identifiers.

Without centralized governance, organizations lack visibility into:
- Which AI systems exist and which models they use
- What information these systems process
- Which providers receive the information
- Whether sensitive data leaves the organization
- Whether AI usage complies with internal policies
- Who approved the systems
- What happens during policy violations

---

## The Solution

Sentinel introduces a governance and enforcement layer between organizational applications and AI services. Every relevant decision can be recorded and audited, providing deterministic enforcement of organizational policies at the infrastructure layer.

### How It Works

```
┌──────────────────────────────┐
│       ORGANIZATION DATA      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       APPLICATIONS           │
│  Web Apps • Mobile Apps      │
│  AI Agents • Internal Systems│
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          SENTINEL            │
│  Authentication • Classification│
│  Policy Evaluation • Redaction│
│  Approval • Audit              │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
    ALLOW            BLOCK
       │
       ▼
    REDACT
       │
       ▼
   APPROVAL
       │
       ▼
┌──────────────────────────────┐
│       AI PROVIDERS           │
│  External • Cloud • Self-hosted│
└──────────────────────────────┘
```

---

## Core Capabilities

Sentinel is built around five core capabilities:

### 1. Discover
Identify and register AI systems, applications, providers, and data sources across the organization.

### 2. Map
Understand how data moves between applications, AI systems, and providers through comprehensive data flow visualization.

### 3. Classify
Identify sensitive data categories and establish organizational classifications with configurable detection rules.

### 4. Control
Enforce policies through multiple enforcement mechanisms:
- **Allow** – Request complies with organizational policy
- **Block** – Request violates a policy
- **Redact** – Sensitive information is removed or transformed before transmission
- **Require Approval** – Request requires authorized human decision
- **Log** – Request is allowed but recorded for governance purposes

### 5. Prove
Generate auditable evidence showing:
- What happened
- When it happened
- Which policy applied
- What decision was made
- Who performed the action
- Which AI system was involved

---

## Architecture

### High-Level Architecture

```
                         ┌─────────────────────┐
                         │    Public Website   │
                         │      Next.js        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     B2B SaaS UI     │
                         │      Next.js        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Sentinel API    │
                         │   NestJS / Node.js  │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       Policy Engine          Classification         Gateway
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
               PostgreSQL        Valkey           Worker
               Source of Truth   Cache/Queue      BullMQ
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                                    ▼
                              AI Providers
```

### Multi-Tenant Architecture

Sentinel is built as a multi-tenant SaaS platform with strict tenant isolation enforced server-side. Every tenant-owned resource is associated with an `organization_id`, and the frontend is never trusted to determine authorization boundaries.

### Government Architecture

Sentinel supports both enterprise and government deployments. Government deployments include AI system registries, agency-level governance, risk classification, approved AI providers, policy frameworks, compliance reporting, incident reporting, and audit evidence. The government console is designed around authorized governance information, not unrestricted access to private organizational AI conversations.

---

## Technology Stack

### Frontend
- **Next.js 15** – React framework for marketing site and SaaS dashboard
- **React** – UI library
- **TypeScript 5.x** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Component library
- **TanStack Query** – Data fetching and caching
- **React Hook Form** – Form management
- **Zod** – Schema validation
- **React Flow** – Data flow visualization
- **Recharts** – Data visualization

### Backend
- **Node.js** – JavaScript runtime
- **TypeScript** – Type-safe backend development
- **NestJS** – Node.js framework for API and control plane
- **REST API** – API architecture
- **OpenAPI** – API documentation

### Database
- **PostgreSQL 17** – Primary database and source of truth

### Cache & Queue
- **Valkey** – Caching, rate limiting, temporary state, distributed locks, policy caching, and background jobs (not the source of truth)
- **BullMQ** – Background job processing

### Infrastructure
- **Docker** – Containerization
- **Docker Compose** – Local development orchestration
- **Nginx** – Reverse proxy
- **GitHub Actions** – CI/CD
- **OpenTelemetry** – Observability
- **Prometheus** – Metrics collection
- **Grafana** – Metrics visualization

### Security Tooling
- **Gitleaks** – Secret scanning
- **Trivy** – Container scanning
- **Semgrep** – Static analysis
- **Dependency scanning** – Vulnerability detection
- **SBOM generation** – Software Bill of Materials

---

## Project Structure

```
sentinel/
├── apps/
│   ├── web/          # Next.js marketing and SaaS frontend
│   ├── api/          # NestJS API and control plane
│   └── worker/       # Background workers
├── packages/
│   ├── classifier/   # Data classification library
│   ├── policy-engine/# Policy evaluation engine
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configuration
│   ├── database/     # Database utilities
│   ├── sdk/          # Client SDK
│   └── security/     # Security primitives
├── infrastructure/
│   ├── docker/       # Docker configurations
│   ├── nginx/        # Nginx configurations
│   ├── terraform/    # Infrastructure as Code
│   ├── kubernetes/   # Kubernetes manifests
│   └── monitoring/   # Monitoring configurations
├── docs/
│   ├── architecture/ # System architecture documentation
│   ├── security/     # Security guidelines
│   ├── deployment/   # Deployment guides
│   ├── api/          # API documentation
│   └── product/      # Product specifications
├── scripts/          # Build and utility scripts
├── tests/            # Test suites
├── .github/
│   └── workflows/    # CI/CD workflows
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── ARCHITECTURE.md
├── SECURITY.md
├── THREAT_MODEL.md
├── DEPLOYMENT.md
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm
- Docker
- Docker Compose
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/cfallah2k/Sentinel.git
cd Sentinel

# Install dependencies
pnpm install

# Copy environment configuration
cp .env.example .env

# Start infrastructure services
docker compose up -d

# Run database migrations
pnpm db:migrate

# Seed development data (optional)
pnpm db:seed

# Start development servers
pnpm dev
```

### Development Commands

```bash
pnpm dev          # Start all development services
pnpm build        # Build all applications
pnpm lint         # Run linting
pnpm typecheck    # Run TypeScript checks
pnpm test         # Run unit tests
pnpm test:e2e     # Run end-to-end tests
pnpm db:migrate   # Run database migrations
pnpm db:seed      # Seed development data
```

---

## Development

### Local Architecture

Running Sentinel locally with Docker Compose:

```
┌─────────────────────────────────────────┐
│              Docker Compose             │
│                                         │
│  ┌─────────┐    ┌─────────┐             │
│  │   Web   │    │   API   │             │
│  │ Next.js │───▶│ NestJS  │             │
│  └─────────┘    └────┬────┘             │
│                      │                  │
│             ┌────────┴────────┐         │
│             ▼                 ▼         │
│        PostgreSQL           Valkey      │
│             │                 │         │
│             └────────┬────────┘         │
│                      ▼                  │
│                   Worker                 │
└─────────────────────────────────────────┘
```

### Testing Strategy

Sentinel uses multiple testing layers:

- **Unit Tests** – Policy evaluation, classification, redaction, authorization, tenant resolution, business logic
- **Integration Tests** – PostgreSQL, Valkey, authentication, gateway, provider integrations, audit pipeline
- **End-to-End Tests** – Complete user flows from registration through policy enforcement
- **Security Tests** – Cross-tenant access, privilege escalation, API key exposure, authentication bypass, injection, rate-limit bypass, unauthorized resource access

### CI/CD

Every pull request passes through:
```
Install → Lint → Typecheck → Unit Tests → Integration Tests → Build → Dependency Scan → Secret Scan → SAST → Container Scan → SBOM
```

Production deployments must not proceed if critical checks fail.

---

## MVP Scope

The initial milestone delivers the foundation for a secure, deterministic governance platform:

- Monorepo structure with optimized developer experience
- Public marketing website and authentication shell
- NestJS API foundation with PostgreSQL integration
- Data classification and policy engine
- AI gateway for request inspection and enforcement
- Audit-ready data flow model
- Docker-based local deployment

This establishes the architecture and engineering standards required for the production-grade MVP.

### Core Modules

- **AI System Registry** – Register and manage AI applications, agents, models, providers, owners, purposes, environments, risk classifications, approval status, and human oversight
- **Application Registry** – Manage technical clients that interact with AI systems with API credentials, owners, environments, AI systems, and activity history
- **AI Provider Registry** – Track AI providers and models with support for external AI, cloud AI, self-hosted AI, OpenAI-compatible APIs, and custom providers
- **Data Classification** – Configurable classification framework with default classifications (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED) and sensitive categories (personal information, identity, financial, security, health data, biometric data, location data, employee data, customer data)
- **Policy Engine** – Heart of Sentinel's governance architecture with versioned policies expressed as WHEN/THEN conditions supporting ALLOW, BLOCK, REDACT, REQUIRE_APPROVAL, and LOG decisions
- **Policy Simulator** – Safe environment for testing policies before deployment
- **Sentinel Gateway** – AI gateway compatible with common AI request patterns for easy integration into existing applications
- **Data Flow Visualization** – Visual representation of AI data flows with inspection of source, application, AI system, provider, data category, policy, decision, timestamp, and risk
- **Incidents** – Policy violations become security/governance incidents with lifecycle management (OPEN → INVESTIGATING → RESOLVED)
- **Approvals** – Human authorization workflow for sensitive AI operations with full audit trail
- **Audit Infrastructure** – Append-oriented audit trail with contextual information (actor, organization, resource, action, result, timestamp, request ID, correlation ID, metadata)
- **AI Data Passport** – Machine-readable governance record for each registered AI system with standardized governance posture description

---

## Security Principles

Security is foundational to Sentinel:

- **Never trust the client** – Authorization happens server-side
- **Tenant isolation** – Every organization-owned resource is scoped to its organization
- **Least privilege** – Users receive only the permissions required for their role
- **Data minimization** – Inspect only what's necessary to make a governance decision
- **Secrets protection** – Secrets are never committed to source control or exposed through client-side code
- **Auditability** – Security-relevant actions are recorded
- **Deterministic enforcement** – Critical governance decisions do not depend on an LLM

### AI in Sentinel

Sentinel may use AI to assist governance (policy recommendations, risk summaries, anomaly analysis, governance reports, classification recommendations, natural-language explanations). However, **AI does not control Sentinel's security boundary**. Critical decisions remain deterministic. Authentication, authorization, tenant isolation, and policy enforcement must not depend on an LLM.

### Role-Based Access Control

Default roles:
- **OWNER** – Full administrative access
- **ADMIN** – Administrative access without billing
- **SECURITY_ANALYST** – View incidents, investigate incidents, view data flows, evaluate policies
- **PRIVACY_OFFICER** – Privacy-focused governance access
- **COMPLIANCE_OFFICER** – Compliance-focused governance access
- **DEVELOPER** – View applications, manage API keys, view gateway activity
- **AUDITOR** – Read-only audit access
- **VIEWER** – Read-only access

---

## Product Roadmap

### Phase 1 — Foundation
- Authentication
- Organizations
- RBAC
- PostgreSQL
- Valkey
- Core API
- Dashboard

### Phase 2 — Governance
- AI Registry
- Applications
- Providers
- Data Classification
- Policies
- Policy Simulator

### Phase 3 — Enforcement
- Sentinel Gateway
- Request inspection
- Redaction
- Blocking
- Approval workflow
- Audit

### Phase 4 — Intelligence
- Data Flow Map
- Risk analysis
- AI Data Passport
- Reports
- Analytics

### Phase 5 — Enterprise
- SSO
- MFA
- SIEM integrations
- Cloud integrations
- Advanced identity
- Enterprise deployment

### Phase 6 — Government
- Government console
- Agency management
- AI registry
- Governance frameworks
- Regulatory reporting
- Sovereign deployment

---

## Frontend Page Architecture

The following comprehensive page structure defines the complete information architecture for the Sentinel web application. This ensures no major workflow, dashboard, administrative function, security function, governance function, developer function, billing function, government function, or operational page is missing.

### Route Architecture

```
/app
├── (marketing)      # Public website
├── (auth)           # Authentication pages
├── (onboarding)     # Organization onboarding
├── (dashboard)      # Main organization dashboard
├── (government)     # Government dashboard
├── (admin)          # Platform admin dashboard
└── (system)         # System operations
```

### Page Inventory

**Public Website** (`/`, `/about`, `/solutions/*`, `/product/*`, `/integrations`, `/security`, `/pricing`, `/docs`, `/blog`, `/contact`, `/request-demo`, `/status`, `/careers`, `/legal/*`)

**Authentication** (`/login`, `/register`, `/verify-email`, `/forgot-password`, `/reset-password`, `/accept-invitation`, `/mfa`, `/logout`, `/auth/error`)

**Onboarding** (`/onboarding`, `/onboarding/organization`, `/onboarding/profile`, `/onboarding/industry`, `/onboarding/use-case`, `/onboarding/team`, `/onboarding/security`, `/onboarding/data-classification`, `/onboarding/policies`, `/onboarding/ai-providers`, `/onboarding/applications`, `/onboarding/api`, `/onboarding/integrations`, `/onboarding/complete`)

**Dashboard** (`/dashboard`, `/dashboard/overview`, `/dashboard/activity`, `/dashboard/risk`, `/dashboard/ai-usage`, `/dashboard/data-flow`, `/dashboard/incidents`, `/dashboard/policies`, `/dashboard/compliance`, `/dashboard/approvals`)

**AI Systems** (`/ai-systems`, `/ai-systems/discover`, `/ai-systems/registered`, `/ai-systems/pending`, `/ai-systems/approved`, `/ai-systems/rejected`, `/ai-systems/high-risk`, `/ai-systems/create`, `/ai-systems/import`, `/ai-systems/:id/*`)

**Applications** (`/applications`, `/applications/create`, `/applications/import`, `/applications/discovered`, `/applications/approved`, `/applications/archived`, `/applications/:id/*`)

**Providers** (`/providers`, `/providers/discover`, `/providers/approved`, `/providers/pending`, `/providers/restricted`, `/providers/create`, `/providers/import`, `/providers/:id/*`)

**Models** (`/models`, `/models/discover`, `/models/approved`, `/models/restricted`, `/models/create`, `/models/import`, `/models/:id/*`)

**Data Sources** (`/data-sources`, `/data-sources/discover`, `/data-sources/connected`, `/data-sources/pending`, `/data-sources/restricted`, `/data-sources/create`, `/data-sources/import`, `/data-sources/:id/*`)

**Data Classification** (`/data-classification`, `/data-classification/overview`, `/data-classification/categories`, `/data-classification/types`, `/data-classification/sensitive-data`, `/data-classification/detectors`, `/data-classification/rules`, `/data-classification/custom`, `/data-classification/create`, `/data-classification/test`, `/data-classification/:id/*`)

**Data Flows** (`/data-flows`, `/data-flows/overview`, `/data-flows/live`, `/data-flows/map`, `/data-flows/sources`, `/data-flows/destinations`, `/data-flows/external`, `/data-flows/internal`, `/data-flows/high-risk`, `/data-flows/blocked`, `/data-flows/recent`, `/data-flows/:id/*`)

**Policies** (`/policies`, `/policies/overview`, `/policies/active`, `/policies/draft`, `/policies/disabled`, `/policies/violated`, `/policies/templates`, `/policies/create`, `/policies/import`, `/policies/simulator`, `/policies/test`, `/policies/:id/*`)

**Gateway** (`/gateway`, `/gateway/overview`, `/gateway/requests`, `/gateway/live`, `/gateway/allowed`, `/gateway/blocked`, `/gateway/redacted`, `/gateway/approval-required`, `/gateway/errors`, `/gateway/providers`, `/gateway/models`, `/gateway/applications`, `/gateway/api-keys`, `/gateway/webhooks`, `/gateway/configuration`, `/gateway/logs`, `/gateway/requests/:id/*`)

**Incidents** (`/incidents`, `/incidents/overview`, `/incidents/open`, `/incidents/investigating`, `/incidents/resolved`, `/incidents/critical`, `/incidents/high`, `/incidents/policy-violations`, `/incidents/data-exposure`, `/incidents/ai-risk`, `/incidents/create`, `/incidents/:id/*`)

**Approvals** (`/approvals`, `/approvals/overview`, `/approvals/pending`, `/approvals/approved`, `/approvals/denied`, `/approvals/expired`, `/approvals/my-approvals`, `/approvals/create`, `/approvals/:id/*`)

**AI Passports** (`/ai-passports`, `/ai-passports/overview`, `/ai-passports/all`, `/ai-passports/approved`, `/ai-passports/pending`, `/ai-passports/high-risk`, `/ai-passports/create`, `/ai-passports/import`, `/ai-passports/:id/*`)

**Risk** (`/risk`, `/risk/overview`, `/risk/ai-systems`, `/risk/applications`, `/risk/providers`, `/risk/models`, `/risk/data`, `/risk/data-flows`, `/risk/policies`, `/risk/incidents`, `/risk/high-risk`, `/risk/assessments`, `/risk/create-assessment`, `/risk/assessments/:id/*`)

**Compliance** (`/compliance`, `/compliance/overview`, `/compliance/frameworks`, `/compliance/requirements`, `/compliance/controls`, `/compliance/evidence`, `/compliance/gaps`, `/compliance/findings`, `/compliance/remediation`, `/compliance/audits`, `/compliance/reports`, `/compliance/frameworks/:id/*`)

**Audit** (`/audit`, `/audit/overview`, `/audit/logs`, `/audit/security`, `/audit/data-access`, `/audit/ai-activity`, `/audit/policy-events`, `/audit/admin-events`, `/audit/authentication`, `/audit/api`, `/audit/export`, `/audit/:id/*`)

**Reports** (`/reports`, `/reports/overview`, `/reports/security`, `/reports/ai-governance`, `/reports/data-governance`, `/reports/compliance`, `/reports/incidents`, `/reports/policies`, `/reports/usage`, `/reports/risk`, `/reports/custom`, `/reports/scheduled`, `/reports/templates`, `/reports/create`, `/reports/:id/*`)

**Integrations** (`/integrations`, `/integrations/overview`, `/integrations/ai-providers`, `/integrations/cloud`, `/integrations/databases`, `/integrations/security`, `/integrations/identity`, `/integrations/siem`, `/integrations/monitoring`, `/integrations/developer-tools`, `/integrations/webhooks`, `/integrations/custom`, `/integrations/:id/*`)

**Developers** (`/developers`, `/developers/overview`, `/developers/api`, `/developers/api-keys`, `/developers/service-accounts`, `/developers/webhooks`, `/developers/sdks`, `/developers/logs`, `/developers/testing`, `/developers/sandbox`, `/developers/changelog`, `/developers/api-keys/:id`, `/developers/service-accounts/:id`, `/developers/webhooks/:id`)

**Team** (`/team`, `/team/members`, `/team/invitations`, `/team/roles`, `/team/permissions`, `/team/groups`, `/team/service-accounts`, `/team/access-requests`, `/team/members/:id`, `/team/roles/:id`)

**Settings** (`/settings`, `/settings/general`, `/settings/organization`, `/settings/security`, `/settings/authentication`, `/settings/mfa`, `/settings/sso`, `/settings/domains`, `/settings/roles`, `/settings/permissions`, `/settings/notifications`, `/settings/email`, `/settings/webhooks`, `/settings/api`, `/settings/data`, `/settings/data-retention`, `/settings/privacy`, `/settings/audit`, `/settings/integrations`, `/settings/developer`, `/settings/billing`, `/settings/usage`, `/settings/export`, `/settings/danger-zone`)

**Billing** (`/billing`, `/billing/overview`, `/billing/plan`, `/billing/usage`, `/billing/invoices`, `/billing/payment-methods`, `/billing/subscription`, `/billing/credits`, `/billing/limits`, `/billing/upgrade`, `/billing/downgrade`, `/billing/invoices/:id`)

**Government** (`/government`, `/government/overview`, `/government/organizations`, `/government/agencies`, `/government/ai-registry`, `/government/ai-systems`, `/government/providers`, `/government/models`, `/government/risk`, `/government/incidents`, `/government/policies`, `/government/compliance`, `/government/audits`, `/government/reports`, `/government/approvals`, `/government/standards`, `/government/frameworks`, `/government/alerts`, `/government/analytics`, `/government/organizations/:id/*`, `/government/agencies/:id/*`, `/government/ai-registry/*`, `/government/ai-registry/:id/*`, `/government/policies/*`, `/government/policies/:id/*`)

**Platform Admin** (`/admin`, `/admin/overview`, `/admin/organizations`, `/admin/users`, `/admin/subscriptions`, `/admin/billing`, `/admin/usage`, `/admin/ai-systems`, `/admin/providers`, `/admin/models`, `/admin/incidents`, `/admin/security`, `/admin/audit`, `/admin/system`, `/admin/infrastructure`, `/admin/jobs`, `/admin/queues`, `/admin/feature-flags`, `/admin/configuration`, `/admin/support`, `/admin/announcements`, `/admin/organizations/:id/*`, `/admin/system/*`)

**Support** (`/support`, `/support/overview`, `/support/tickets`, `/support/knowledge-base`, `/support/contact`, `/support/status`, `/support/tickets/:id`)

**Notifications** (`/notifications`, `/notifications/all`, `/notifications/unread`, `/notifications/security`, `/notifications/incidents`, `/notifications/approvals`, `/notifications/system`)

**Search** (`/search`)

**Error Pages** (`/404`, `//403`, `/401`, `/500`, `/error`, `/maintenance`, `/offline`, `/access-denied`, `/session-expired`)

### Global Capabilities

- Multi-tenancy with strict tenant isolation
- Role-based access control with permission-aware navigation
- Organization switching
- Government organization switching
- Global search across all entities
- Real-time notifications
- User profile management
- Help center
- Comprehensive audit trails
- API access with key management
- Billing and subscription management
- Usage tracking and limits
- Security settings
- Team management with invitations
- Integration management
- Report scheduling and generation
- Data export
- Data retention policies
- Privacy controls

### Role-Based Dashboards

Support for role-specific dashboard experiences:
- Owner Dashboard
- Admin Dashboard
- Security Analyst Dashboard
- Privacy Officer Dashboard
- Compliance Officer Dashboard
- Developer Dashboard
- Auditor Dashboard
- Viewer Dashboard
- Government Admin Dashboard
- Agency Admin Dashboard
- Platform Admin Dashboard

### Navigation Configurations

Separate navigation configurations for:
1. Public website
2. B2B organization
3. Enterprise organization
4. Government organization
5. Government agency
6. Developer
7. Auditor
8. Platform administrator

Navigation is permission-aware—users only see modules they are authorized to access.

---

## Documentation

Additional documentation is available in the `docs/` directory:

- `docs/architecture/` – System architecture and design decisions
- `docs/security/` – Security guidelines and threat model
- `docs/deployment/` – Deployment guides and infrastructure setup
- `docs/api/` – API documentation
- `docs/product/` – Product specifications and feature documentation

Root documentation files:
- `ARCHITECTURE.md` – Detailed architecture documentation
- `SECURITY.md` – Security guidelines and reporting
- `THREAT_MODEL.md` – Threat analysis and mitigation
- `DEPLOYMENT.md` – Deployment instructions

---

## Contributing

Contribution guidelines will be published as the project moves toward external collaboration. Before contributing:

1. Read the architecture documentation
2. Read the security guidelines
3. Understand the tenant model
4. Run the local development environment
5. Run all relevant tests
6. Never commit secrets

---

## License

License: TBD

---

## Project Status

🚧 **Sentinel is currently under active MVP development.**

The architecture and interfaces may change during the validation and development phase. Production security and compliance claims should not be inferred from the current development status.

---

**AI is becoming infrastructure. Governance needs to become infrastructure too.**

Sentinel is being built to provide that control layer.
