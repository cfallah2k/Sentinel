# Local deployment guide

1. Copy `.env.example` to `.env` and adjust secrets.
2. Run `pnpm install`.
3. Run `docker compose up` from the repository root.
4. Run `pnpm dev` for local frontend and API development.
5. Run `pnpm db:migrate` and `pnpm db:seed` for the initial database state.

## Local stack

- PostgreSQL
- Valkey
- API
- Web UI
- Worker containers

This is intended for MVP validation and early production-like deployment testing, not Kubernetes-scale orchestration.
