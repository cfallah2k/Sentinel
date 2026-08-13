export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  auth: string;
  version: string;
}

export const apiEndpoints: ApiEndpoint[] = [
  { method: 'GET', path: '/v1/requests', description: 'List gateway requests with filters for decision, category and time range.', auth: 'API Key', version: 'v1' },
  { method: 'POST', path: '/v1/requests', description: 'Proxy an AI request through the gateway for evaluation and redaction.', auth: 'API Key', version: 'v1' },
  { method: 'GET', path: '/v1/systems', description: 'List registered AI systems with risk posture and approval status.', auth: 'API Key', version: 'v1' },
  { method: 'GET', path: '/v1/policies', description: 'List governance policies and their enforcement counters.', auth: 'API Key', version: 'v1' },
  { method: 'POST', path: '/v1/policies', description: 'Create a new policy with decision rules and scope.', auth: 'OAuth', version: 'v1' },
  { method: 'PATCH', path: '/v1/policies/{id}', description: 'Update policy conditions or enable/disable enforcement.', auth: 'OAuth', version: 'v1' },
  { method: 'DELETE', path: '/v1/policies/{id}', description: 'Archive a policy. Active violations continue to be logged.', auth: 'OAuth', version: 'v1' },
  { method: 'GET', path: '/v1/audit', description: 'Query the audit trail with actor, action and resource filters.', auth: 'API Key', version: 'v1' },
  { method: 'POST', path: '/v1/keys', description: 'Create a scoped API key for an application or service.', auth: 'OAuth', version: 'v1' },
  { method: 'DELETE', path: '/v1/keys/{id}', description: 'Revoke an API key immediately.', auth: 'OAuth', version: 'v1' },
  { method: 'GET', path: '/v1/webhooks', description: 'List webhook endpoints and delivery statistics.', auth: 'API Key', version: 'v1' },
  { method: 'POST', path: '/v1/webhooks', description: 'Register an outbound webhook endpoint with event filters.', auth: 'OAuth', version: 'v1' },
  { method: 'GET', path: '/v1/usage', description: 'Return token, request and cost usage broken down by app.', auth: 'API Key', version: 'v1' }
];

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  status: 'Active' | 'Revoked' | 'Expired';
  environment: 'Live' | 'Test';
}

export const apiKeys: ApiKey[] = [
  { id: 'key-1', name: 'Production Gateway', prefix: 'sk_live_8f3k…9a2c', scopes: ['requests.read', 'requests.write'], created: '2026-02-14', lastUsed: '2026-08-13T09:02:00Z', status: 'Active', environment: 'Live' },
  { id: 'key-2', name: 'CI/CD Pipeline', prefix: 'sk_live_2d7n…41ef', scopes: ['systems.read', 'usage.read'], created: '2026-03-27', lastUsed: '2026-08-13T08:44:00Z', status: 'Active', environment: 'Live' },
  { id: 'key-3', name: 'Support Tooling', prefix: 'sk_test_6b9m…77d1', scopes: ['requests.read'], created: '2026-05-08', lastUsed: '2026-08-12T17:20:00Z', status: 'Active', environment: 'Test' },
  { id: 'key-4', name: 'Legacy Automation', prefix: 'sk_live_0c4x…33be', scopes: ['requests.write', 'audit.read'], created: '2025-11-02', lastUsed: '2026-06-30T14:10:00Z', status: 'Revoked', environment: 'Live' },
  { id: 'key-5', name: 'Partner Integration', prefix: 'sk_test_9h8y…52af', scopes: ['requests.write'], created: '2025-12-19', lastUsed: '2026-04-03T10:55:00Z', status: 'Expired', environment: 'Test' }
];

export interface ServiceAccount {
  id: string;
  name: string;
  type: 'Machine' | 'Integration' | 'Automation';
  scopes: string[];
  status: 'Active' | 'Disabled';
  created: string;
  lastUsed: string;
  owner: string;
}

export const serviceAccounts: ServiceAccount[] = [
  { id: 'sa-1', name: 'gateway-redaction-worker', type: 'Machine', scopes: ['redaction.run', 'audit.write'], status: 'Active', created: '2026-01-20', lastUsed: '2026-08-13T09:00:00Z', owner: 'Devon Clarke' },
  { id: 'sa-2', name: 'nightly-classification-job', type: 'Automation', scopes: ['sources.read', 'classifications.write'], status: 'Active', created: '2026-02-03', lastUsed: '2026-08-13T03:00:00Z', owner: 'Maya Chen' },
  { id: 'sa-3', name: 'splunk-siem-forwarder', type: 'Integration', scopes: ['audit.read', 'events.write'], status: 'Active', created: '2026-04-11', lastUsed: '2026-08-13T08:58:00Z', owner: 'Jordan Patel' },
  { id: 'sa-4', name: 'legacy-etl-bridge', type: 'Automation', scopes: ['sources.read'], status: 'Disabled', created: '2025-10-14', lastUsed: '2026-05-22T22:00:00Z', owner: 'Alicia Monroe' }
];

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'Active' | 'Paused' | 'Disabled';
  deliveryRate: number;
  lastDelivery: string;
}

export const webhookEndpoints: WebhookEndpoint[] = [
  { id: 'wh-1', name: 'SOC Alert Fanout', url: 'https://hooks.nexora.io/soc/alerts', events: ['incident.created', 'incident.updated', 'incident.resolved'], status: 'Active', deliveryRate: 99.2, lastDelivery: '2026-08-13T09:05:00Z' },
  { id: 'wh-2', name: 'Compliance Archive', url: 'https://archive.nexora.io/ingest/audit', events: ['audit.created'], status: 'Active', deliveryRate: 98.7, lastDelivery: '2026-08-13T09:04:00Z' },
  { id: 'wh-3', name: 'Usage Billing Sync', url: 'https://billing.nexora.io/hooks/usage', events: ['usage.monthly', 'usage.quota'], status: 'Paused', deliveryRate: 96.4, lastDelivery: '2026-08-11T00:00:00Z' },
  { id: 'wh-4', name: 'Partner Data Bridge', url: 'https://partner.example.com/webhooks', events: ['request.blocked', 'request.redacted'], status: 'Disabled', deliveryRate: 88.1, lastDelivery: '2026-07-18T12:30:00Z' }
];

export interface SdkEntry {
  language: string;
  name: string;
  version: string;
  install: string;
  description: string;
  stability: string;
}

export const sdks: SdkEntry[] = [
  { language: 'TypeScript', name: '@sentinel/ts', version: '2.4.0', install: 'npm install @sentinel/ts@2.4.0', description: 'First-party SDK for Node.js and browser. Typed gateway client with streaming support.', stability: 'Stable' },
  { language: 'Python', name: 'sentinel-python', version: '1.9.2', install: 'pip install sentinel-python==1.9.2', description: 'Async gateway client with redaction helpers and policy validation for ML pipelines.', stability: 'Stable' },
  { language: 'Go', name: 'sentinel-go', version: '1.3.1', install: 'go get github.com/sentinel-ai/sentinel-go@v1.3.1', description: 'High-throughput client for gateway and audit endpoints with context-aware retries.', stability: 'Beta' },
  { language: 'Java', name: 'sentinel-java', version: '1.2.0', install: 'implementation "ai.sentinel:sentinel-java:1.2.0"', description: 'JVM SDK for Spring Boot services with reactive and blocking transports.', stability: 'Beta' }
];

export interface ChangelogEntry {
  version: string;
  date: string;
  type: 'Feature' | 'Improvement' | 'Fix' | 'Breaking';
  title: string;
  description: string;
}

export const changelog: ChangelogEntry[] = [
  { version: 'v2.4.0', date: '2026-08-05', type: 'Feature', title: 'Streaming proxy support', description: 'Gateway now streams tokens with policy evaluation still applied to the full payload before release.' },
  { version: 'v2.3.1', date: '2026-07-21', type: 'Fix', title: 'Webhook retry backoff', description: 'Exponential backoff now honors Retry-After headers from receiving services.' },
  { version: 'v2.3.0', date: '2026-07-09', type: 'Feature', title: 'MCP server endpoints', description: 'Expose governance tools to AI agents through the Model Context Protocol.' },
  { version: 'v2.2.0', date: '2026-06-18', type: 'Improvement', title: 'Faster redaction pipeline', description: 'Transformer-based redaction is now 4x faster on long documents.' },
  { version: 'v2.1.0', date: '2026-05-30', type: 'Feature', title: 'Scoped API keys', description: 'API keys can now be restricted to read-only or per-endpoint scopes.' },
  { version: 'v2.0.0', date: '2026-04-14', type: 'Breaking', title: 'Unified /v1 API', description: 'All legacy endpoints consolidated under /v1 with consistent error envelopes.' },
  { version: 'v1.8.2', date: '2026-03-02', type: 'Fix', title: 'Timestamp normalization', description: 'Response timestamps are now consistently returned in UTC ISO-8601.' }
];

export function fmtRelative(iso: string): string {
  if (!iso || iso === '—') return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return d.toISOString().slice(0, 10);
}