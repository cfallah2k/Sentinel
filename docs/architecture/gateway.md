# Sentinel gateway architecture

The gateway sits between applications and external AI providers. It authenticates API keys, resolves tenant context, inspects request payloads, classifies sensitive data, evaluates policy, and either allows, blocks, redacts, or requests approval before provider calls are sent.

## Request flow

1. Authenticate API key
2. Resolve organization and application
3. Resolve AI system and provider
4. Inspect request body and metadata
5. Classify detected data categories
6. Evaluate policy based on organization rules
7. Decision: ALLOW / BLOCK / REDACT / REQUIRE_APPROVAL
8. Forward provider request when permitted
9. Inspect response metadata and store evidence
10. Emit audit records

## Determinism

The core gateway and policy engine are intentionally deterministic. AI-generated recommendations may support operations, but the final enforcement layer must remain rule-based and auditable.
