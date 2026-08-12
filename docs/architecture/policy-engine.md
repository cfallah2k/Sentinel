# Policy engine design

The policy engine is designed to evaluate organization rules against request context. It receives the requesting system, provider, detected data categories, environment, and request metadata.

## Deterministic outputs

- decision
- policy reference
- reason
- severity
- redactions
- approvalRequired

The MVP uses explicit rule ordering for common cases such as national ID transmission to external providers and phone redaction before provider calls.

## Example

WHEN data_category = NATIONAL_ID AND provider_type = EXTERNAL THEN BLOCK

This model can be extended with versioned policy objects and rollback support as the platform grows.
