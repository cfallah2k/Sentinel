# Sentinel security baseline

Sentinel is designed to be a governance and control plane, not an AI model wrapper or a surveillance tool. The security model centers on deterministic policy enforcement, tenant authorization, and append-only evidence.

## Security controls

- RBAC with separate customer and platform roles
- Organization-scoped authorization checks
- Input validation and rate limiting on all API and gateway endpoints
- Secret abstraction for provider credentials and API keys
- Encryption at rest and in transit for managed platform workloads
- Safe error handling that does not reveal stack traces
- Audit logs for all security-relevant events

## Constraints

- No direct public storage of raw sensitive payloads
- No mass data harvesting by default
- No automatic regulator access to private prompts
- No reliance on AI for security decisions where deterministic logic is required
