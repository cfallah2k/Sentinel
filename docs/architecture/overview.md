# Sentinel architecture overview

Sentinel is a modular monolith built around a deterministic data-governance control plane. The product combines a Next.js marketing and application frontend with a NestJS API, PostgreSQL as the source of truth, Valkey for caching and rate limiting, and a policy/classification engine that enforces access decisions before data reaches external AI providers.

## Core components

- Frontend: Next.js app-router interface for public marketing, tenant SaaS, regulator console, and internal admin surfaces.
- Backend: NestJS modular monolith organized by domain modules and security primitives.
- Classification engine: deterministic pattern-based detection for identifiers such as email, phone, national ID, passport, and API keys.
- Policy engine: deterministic decision-making for allow, block, redact, approval, and log policies.
- Audit: append-only event stream for security and compliance evidence.
- Data plane: data flow model that binds application, AI system, provider, and policy evaluation into one traceable path.

## Design principles

- Security decisions must be deterministic.
- Organization context is enforced at the API layer.
- Sensitive payloads are never exposed by default.
- Provider secrets are never stored in plaintext.
- Audit records are append-only and cannot be rewritten.
