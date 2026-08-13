export type IntegrationCategory =
  | 'ai-providers'
  | 'cloud'
  | 'databases'
  | 'security'
  | 'identity'
  | 'siem'
  | 'monitoring'
  | 'developer-tools'
  | 'webhooks'
  | 'custom';

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  status: 'Connected' | 'Configured' | 'Available' | 'Error' | 'Pending' | 'Disabled';
  version: string;
  lastSync: string;
  syncMs: number;
  icon: string;
  account?: string;
  events: number;
}

export const categoryMeta: Record<IntegrationCategory, { label: string; description: string }> = {
  'ai-providers': { label: 'AI Providers', description: 'LLM and embedding providers routed through the Sentinel gateway' },
  cloud: { label: 'Cloud', description: 'Cloud infrastructure and platform integrations' },
  databases: { label: 'Databases', description: 'Data sources connected to governance, discovery and redaction pipelines' },
  security: { label: 'Security', description: 'Vulnerability, posture and secrets management tooling' },
  identity: { label: 'Identity', description: 'SSO, directory and identity provider connections' },
  siem: { label: 'SIEM', description: 'Security information and event management platforms' },
  monitoring: { label: 'Monitoring', description: 'Observability, alerting and incident response' },
  'developer-tools': { label: 'Developer Tools', description: 'Source control, CI/CD and collaboration platforms' },
  webhooks: { label: 'Webhooks', description: 'Inbound and outbound event delivery endpoints' },
  custom: { label: 'Custom', description: 'Custom protocols and bring-your-own endpoints' }
};

export const integrationCatalog: Integration[] = [
  { id: 'int-openai', name: 'OpenAI', category: 'ai-providers', description: 'GPT-4.1, o-series and embedding models with gateway routing, policy evaluation and token metering.', status: 'Connected', version: 'v2.4.1', lastSync: '2m ago', syncMs: 340, icon: 'Bot', account: 'Nexora Production', events: 1284 },
  { id: 'int-anthropic', name: 'Anthropic', category: 'ai-providers', description: 'Claude 3.7 Sonnet and Haiku with prompt-level redaction and approval gating.', status: 'Connected', version: 'v1.9.0', lastSync: '5m ago', syncMs: 410, icon: 'Sparkles', account: 'Nexora Production', events: 942 },
  { id: 'int-vertex', name: 'Google Vertex AI', category: 'ai-providers', description: 'Gemini 2.5 models with regional routing and EU data residency controls.', status: 'Connected', version: 'v3.1.2', lastSync: '8m ago', syncMs: 280, icon: 'Cloud', account: 'Nexora Production', events: 715 },
  { id: 'int-azure-ai', name: 'Azure OpenAI', category: 'ai-providers', description: 'GPT models on Azure with private network endpoints and managed identity.', status: 'Connected', version: 'v2.0.3', lastSync: '12m ago', syncMs: 305, icon: 'Cloud', account: 'Nexora Production', events: 688 },
  { id: 'int-bedrock', name: 'Amazon Bedrock', category: 'ai-providers', description: 'Foundation models via Bedrock with cross-account role-based access.', status: 'Connected', version: 'v1.7.5', lastSync: '15m ago', syncMs: 380, icon: 'Cloud', account: 'Nexora Production', events: 451 },
  { id: 'int-mistral', name: 'Mistral AI', category: 'ai-providers', description: 'Mistral Large on EU endpoints. Requires risk approval before activation.', status: 'Available', version: 'v1.2.0', lastSync: '—', syncMs: 0, icon: 'Wind', events: 0 },
  { id: 'int-selfhosted', name: 'Self-Hosted LLM Cluster', category: 'ai-providers', description: 'Internal llama-3.3 cluster in Nexora DC-1 with local inference and no egress.', status: 'Connected', version: 'v0.9.4', lastSync: '1m ago', syncMs: 190, icon: 'Server', account: 'Nexora DC-1', events: 2210 },
  { id: 'int-aws', name: 'AWS', category: 'cloud', description: 'S3, IAM and CloudTrail event ingestion for data lake and audit feeds.', status: 'Connected', version: 'v4.6.0', lastSync: '3m ago', syncMs: 260, icon: 'Cloud', account: 'arn:aws:iam::84419', events: 1502 },
  { id: 'int-gcp', name: 'Google Cloud', category: 'cloud', description: 'BigQuery lineage and IAM policy import for cloud data governance.', status: 'Connected', version: 'v3.0.1', lastSync: '6m ago', syncMs: 275, icon: 'Cloud', account: 'nexora-prod', events: 866 },
  { id: 'int-azure', name: 'Microsoft Azure', category: 'cloud', description: 'Azure AD, Storage and Key Vault integrations with SCIM provisioning.', status: 'Connected', version: 'v4.1.7', lastSync: '9m ago', syncMs: 300, icon: 'Cloud', account: 'nexora.onmicrosoft.com', events: 734 },
  { id: 'int-cloudflare', name: 'Cloudflare', category: 'cloud', description: 'WAF events and DNS audit logs forwarded to the Sentinel event pipeline.', status: 'Connected', version: 'v2.3.2', lastSync: '11m ago', syncMs: 150, icon: 'Globe', account: 'nexora.io', events: 3201 },
  { id: 'int-k8s', name: 'Kubernetes', category: 'cloud', description: 'Cluster audit events and workload metadata for AI system discovery.', status: 'Pending', version: 'v1.1.0', lastSync: '—', syncMs: 0, icon: 'Container', account: 'nexora-prod-eus', events: 0 },
  { id: 'int-postgres', name: 'PostgreSQL', category: 'databases', description: 'Customer database with schema discovery, PII classification and masking.', status: 'Connected', version: 'v5.2.0', lastSync: '2m ago', syncMs: 120, icon: 'Database', account: 'customer-db', events: 410 },
  { id: 'int-mysql', name: 'MySQL', category: 'databases', description: 'Application databases with column-level sensitivity tagging.', status: 'Connected', version: 'v4.0.2', lastSync: '7m ago', syncMs: 140, icon: 'Database', account: 'app-db-2', events: 302 },
  { id: 'int-snowflake', name: 'Snowflake', category: 'databases', description: 'Finance data warehouse with lineage export and usage analytics.', status: 'Connected', version: 'v2.8.1', lastSync: '10m ago', syncMs: 220, icon: 'Snowflake', account: 'nexora-finance', events: 188 },
  { id: 'int-bigquery', name: 'BigQuery', category: 'databases', description: 'Analytics warehouse with tag-based classification policies.', status: 'Connected', version: 'v3.3.0', lastSync: '14m ago', syncMs: 260, icon: 'Database', account: 'nexora-analytics', events: 264 },
  { id: 'int-redis', name: 'Redis', category: 'databases', description: 'Cache layers scanned for sensitive payload leakage detection.', status: 'Connected', version: 'v2.1.5', lastSync: '4m ago', syncMs: 90, icon: 'Database', account: 'cache-eus', events: 96 },
  { id: 'int-oracle', name: 'Oracle DB', category: 'databases', description: 'Legacy Oracle instance with nightly sync. Connector version requires upgrade.', status: 'Error', version: 'v1.0.1', lastSync: '2d ago', syncMs: 1200, icon: 'Database', account: 'legacy-oracle', events: 44 },
  { id: 'int-crowdstrike', name: 'CrowdStrike', category: 'security', description: 'Endpoint detection signals correlated with AI system access patterns.', status: 'Connected', version: 'v2.2.0', lastSync: '1m ago', syncMs: 310, icon: 'ShieldCheck', account: 'nexora-crowdstrike', events: 1890 },
  { id: 'int-wiz', name: 'Wiz', category: 'security', description: 'Cloud posture findings ingested for risk scoring of AI workloads.', status: 'Connected', version: 'v1.8.3', lastSync: '5m ago', syncMs: 290, icon: 'ShieldAlert', account: 'nexora-wiz', events: 1244 },
  { id: 'int-vault', name: 'HashiCorp Vault', category: 'security', description: 'Secrets management with dynamic credentials for gateway service accounts.', status: 'Connected', version: 'v3.4.1', lastSync: '8m ago', syncMs: 180, icon: 'Lock', account: 'vault-nexora', events: 512 },
  { id: 'int-guardduty', name: 'AWS GuardDuty', category: 'security', description: 'Threat detection findings mapped to affected AI systems and data flows.', status: 'Configured', version: 'v1.2.0', lastSync: '22h ago', syncMs: 340, icon: 'Radar', account: '84419-eus1', events: 87 },
  { id: 'int-defender', name: 'Microsoft Defender', category: 'security', description: 'Endpoint and identity alerts for hybrid environment coverage.', status: 'Connected', version: 'v2.0.4', lastSync: '13m ago', syncMs: 320, icon: 'Shield', account: 'nexora-m365', events: 658 },
  { id: 'int-okta', name: 'Okta', category: 'identity', description: 'SSO, SCIM and group sync with JIT provisioning for Sentinel roles.', status: 'Connected', version: 'v4.2.0', lastSync: '2m ago', syncMs: 250, icon: 'Fingerprint', account: 'nexora.okta.com', events: 980 },
  { id: 'int-azuread', name: 'Azure AD', category: 'identity', description: 'Entra ID directory sync with role-based assignment mapping.', status: 'Connected', version: 'v3.0.2', lastSync: '6m ago', syncMs: 270, icon: 'Fingerprint', account: 'nexora.onmicrosoft.com', events: 745 },
  { id: 'int-gworkspace', name: 'Google Workspace', category: 'identity', description: 'Directory and group provisioning for Gmail and Drive access reviews.', status: 'Connected', version: 'v2.4.0', lastSync: '9m ago', syncMs: 240, icon: 'Globe', account: 'nexora.io', events: 431 },
  { id: 'int-onelogin', name: 'OneLogin', category: 'identity', description: 'Alternate identity provider available for regulated subsidiaries.', status: 'Available', version: 'v1.1.0', lastSync: '—', syncMs: 0, icon: 'Fingerprint', events: 0 },
  { id: 'int-ldap', name: 'LDAP', category: 'identity', description: 'On-prem directory for legacy service authentication.', status: 'Connected', version: 'v1.9.2', lastSync: '12m ago', syncMs: 210, icon: 'KeyRound', account: 'dc1-ldap', events: 356 },
  { id: 'int-splunk', name: 'Splunk', category: 'siem', description: 'Gateway decisions and audit events streamed for SOC dashboards.', status: 'Connected', version: 'v5.1.0', lastSync: '1m ago', syncMs: 350, icon: 'Radar', account: 'splunk-nexora', events: 8450 },
  { id: 'int-datadog', name: 'Datadog', category: 'siem', description: 'SIEM + APM correlation for AI traffic anomaly detection.', status: 'Connected', version: 'v4.3.1', lastSync: '3m ago', syncMs: 230, icon: 'Activity', account: 'nexora-dd', events: 3220 },
  { id: 'int-elastic', name: 'Elastic', category: 'siem', description: 'OpenSearch-backed SIEM with full-text request log search.', status: 'Connected', version: 'v3.2.4', lastSync: '7m ago', syncMs: 280, icon: 'Search', account: 'elastic-nexora', events: 4100 },
  { id: 'int-qradar', name: 'IBM QRadar', category: 'siem', description: 'Enterprise SIEM forwarding for financial services compliance.', status: 'Configured', version: 'v1.0.2', lastSync: '1d ago', syncMs: 380, icon: 'Radar', account: 'qradar-prod', events: 210 },
  { id: 'int-sentinel', name: 'Microsoft Sentinel', category: 'siem', description: 'Cloud-native SIEM with UEBA analytics workbooks for AI access.', status: 'Connected', version: 'v2.0.1', lastSync: '5m ago', syncMs: 300, icon: 'ShieldCheck', account: 'nexora-sentinel', events: 1890 },
  { id: 'int-grafana', name: 'Grafana', category: 'monitoring', description: 'Dashboards for gateway latency, policy enforcement and token spend.', status: 'Connected', version: 'v2.9.0', lastSync: '4m ago', syncMs: 160, icon: 'LineChart', account: 'grafana.nexora.io', events: 240 },
  { id: 'int-prometheus', name: 'Prometheus', category: 'monitoring', description: 'Metrics scrape endpoints for gateway and redaction workers.', status: 'Connected', version: 'v1.4.2', lastSync: '30s ago', syncMs: 110, icon: 'Activity', account: 'prom-prod', events: 5010 },
  { id: 'int-pagerduty', name: 'PagerDuty', category: 'monitoring', description: 'Incident escalation for gateway failures and SLA breaches.', status: 'Connected', version: 'v2.5.0', lastSync: '6m ago', syncMs: 170, icon: 'Bell', account: 'nexora-pd', events: 148 },
  { id: 'int-sentry', name: 'Sentry', category: 'monitoring', description: 'SDK error reporting for the gateway control plane services.', status: 'Available', version: 'v1.3.1', lastSync: '—', syncMs: 0, icon: 'Bug', events: 0 },
  { id: 'int-github', name: 'GitHub', category: 'developer-tools', description: 'Repository and CI metadata for AI system code provenance.', status: 'Connected', version: 'v3.5.0', lastSync: '2m ago', syncMs: 200, icon: 'GitBranch', account: 'nexora-org', events: 2210 },
  { id: 'int-gitlab', name: 'GitLab', category: 'developer-tools', description: 'Self-managed GitLab with pipeline attestation ingestion.', status: 'Connected', version: 'v2.7.2', lastSync: '8m ago', syncMs: 230, icon: 'GitBranch', account: 'gitlab.nexora.io', events: 980 },
  { id: 'int-jira', name: 'Jira', category: 'developer-tools', description: 'Risk findings and remediation tasks synced to engineering boards.', status: 'Connected', version: 'v1.9.1', lastSync: '5m ago', syncMs: 250, icon: 'CheckSquare', account: 'nexora-jira', events: 420 },
  { id: 'int-slack', name: 'Slack', category: 'developer-tools', description: 'Approval and incident notifications delivered to channels.', status: 'Connected', version: 'v4.0.3', lastSync: '3m ago', syncMs: 130, icon: 'MessageSquare', account: '#security-ops', events: 3120 },
  { id: 'int-teams', name: 'Microsoft Teams', category: 'developer-tools', description: 'Approval workflows and compliance alerts in Teams channels.', status: 'Configured', version: 'v1.6.0', lastSync: '1d ago', syncMs: 0, icon: 'MessageSquare', account: '#ai-governance', events: 94 },
  { id: 'int-linear', name: 'Linear', category: 'developer-tools', description: 'Product team issue sync for platform engineering backlog.', status: 'Connected', version: 'v1.1.0', lastSync: '10m ago', syncMs: 140, icon: 'CircleDot', account: 'nexora-linear', events: 310 },
  { id: 'int-outbound', name: 'Outbound Webhooks', category: 'webhooks', description: 'Signed event delivery to customer endpoints with retry and replay.', status: 'Connected', version: 'v1.0.0', lastSync: 'Live', syncMs: 45, icon: 'Webhook', account: '8 endpoints', events: 12400 },
  { id: 'int-inbound', name: 'Inbound Webhooks', category: 'webhooks', description: 'Ingest endpoints for third-party events with signature verification.', status: 'Connected', version: 'v1.0.0', lastSync: 'Live', syncMs: 50, icon: 'Webhook', account: '4 endpoints', events: 6800 },
  { id: 'int-rest', name: 'Custom REST', category: 'custom', description: 'Generic REST connector for internal APIs with bearer auth.', status: 'Connected', version: 'v1.2.0', lastSync: '6m ago', syncMs: 190, icon: 'Plug', account: 'api.nexora.internal', events: 540 },
  { id: 'int-mcp', name: 'MCP Server', category: 'custom', description: 'Model Context Protocol server exposing governance tools to agents.', status: 'Pending', version: 'v0.4.0', lastSync: '—', syncMs: 0, icon: 'Cable', events: 0 },
  { id: 'int-grpc', name: 'gRPC Gateway', category: 'custom', description: 'High-throughput protobuf gateway for streaming decisions.', status: 'Available', version: 'v0.9.0', lastSync: '—', syncMs: 0, icon: 'Cpu', events: 0 }
];

export function integrationsFor(category: IntegrationCategory): Integration[] {
  return integrationCatalog.filter((i) => i.category === category);
}

export function integrationById(id: string): Integration | undefined {
  return integrationCatalog.find((i) => i.id === id);
}

const eventTemplates: { type: string; detail: string; status: string }[] = [
  { type: 'Sync', detail: 'Full sync completed with schema and classification refresh', status: 'Success' },
  { type: 'Sync', detail: 'Incremental sync pulled 1,240 new records', status: 'Success' },
  { type: 'Auth', detail: 'OAuth token refreshed successfully', status: 'Success' },
  { type: 'Config', detail: 'Connector settings updated by Amara Okafor', status: 'Success' },
  { type: 'Sync', detail: 'Rate limit warning — 86% of hourly quota consumed', status: 'Warning' },
  { type: 'Health', detail: 'Health check passed — latency within SLA', status: 'Success' },
  { type: 'Error', detail: 'Transient network timeout retried and recovered', status: 'Recovered' },
  { type: 'Config', detail: 'Policy scope re-evaluated for connected data categories', status: 'Success' },
  { type: 'Sync', detail: 'Metadata cache invalidated and rebuilt', status: 'Success' },
  { type: 'Auth', detail: 'Credential rotation completed without downtime', status: 'Success' },
  { type: 'Health', detail: 'Uptime check completed — 99.98% rolling 30d', status: 'Success' },
  { type: 'Sync', detail: 'Schema drift detected — 3 columns reclassified', status: 'Warning' }
];

function seedFor(id: string): number {
  return [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export interface IntegrationEvent {
  id: string;
  time: string;
  type: string;
  detail: string;
  status: string;
}

export function integrationEvents(id: string, count = 10): IntegrationEvent[] {
  const seed = seedFor(id);
  return Array.from({ length: count }, (_, i) => {
    const t = eventTemplates[(seed + i * 3) % eventTemplates.length];
    const h = (seed + i) % 9;
    const m = (seed * 7 + i * 13) % 60;
    const day = 13 - (i % 4);
    return {
      id: `${id}-evt-${pad(day)}${pad(h)}${pad(m)}`,
      time: `2026-08-${pad(day)}T0${h}:${pad(m)}:${pad((seed + i) % 60)}Z`,
      type: t.type,
      detail: t.detail,
      status: t.status
    };
  });
}

export function fmtDate(iso: string): string {
  if (iso === '—' || iso === 'Live') return iso;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
}

export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.toISOString().slice(0, 10)} ${d.toISOString().slice(11, 16)}Z`;
}