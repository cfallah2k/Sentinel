# SENTINEL

SENTINEL is an AI data governance and control infrastructure product designed to help organizations discover where data goes, what AI systems touch it, and what policies control exposure.

## Monorepo structure

- `apps/web` – Next.js marketing and SaaS frontend
- `apps/api` – NestJS API and control plane
- `packages/*` – shared libraries for types, policy logic, and security primitives
- `infrastructure/docker` – Docker Compose and container assets
- `docs` – architecture, security, and deployment documentation

## Core commands

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`
- `pnpm db:migrate`
- `pnpm db:seed`
- `docker compose up`

## MVP focus

The initial milestone delivers the foundation for a secure, deterministic governance platform:

- monorepo and developer environment
- public marketing website and auth shell
- NestJS API foundation
- classification and policy engine
- audit-ready data-flow model
- Docker-based local deployment

This is not a complete regulator or enterprise feature set, but it establishes the architecture and engineering standards required for the production-grade MVP.
