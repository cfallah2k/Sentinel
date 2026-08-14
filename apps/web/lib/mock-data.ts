// Deterministic seeded RNG so dashboards are stable across builds
export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr].sort(() => rand() - 0.5);
  return copy.slice(0, Math.min(n, copy.length));
}

export function intBetween(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

// ---------- Types ----------

export interface AiSystem {
  id: string;
  name: string;
  type: 'LLM' | 'Agent' | 'Assistant' | 'Chatbot' | 'Copilot' | 'Decision' | 'Embedding' | 'Vision';
  status: 'Registered' | 'Pending' | 'Approved' | 'Rejected';
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  providerId: string;
  modelId: string;
  owner: string;
  purpose: string;
  environment: 'Production' | 'Staging' | 'Development';
  dataCategories: string[];
  approvedAt: string;
  lastActivity: string;
  oversight: 'Human' | 'Automated' | 'Supervised';
  requests24h: number;
  blocked24h: number;
  redacted24h: number;
}

export interface Application {
  id: string;
  name: string;
  type: 'Web App' | 'Mobile App' | 'AI Agent' | 'Internal System' | 'Automation';
  environment: 'Production' | 'Staging' | 'Development';
  status: 'Active' | 'Archived' | 'Discovered';
  owner: string;
  apiKeys: number;
  aiSystemIds: string[];
  lastActivity: string;
  risk: 'Low' | 'Medium' | 'High';
}

export interface Provider {
  id: string;
  name: string;
  type: 'External' | 'Cloud' | 'Self-hosted' | 'OpenAI-compatible' | 'Custom';
  status: 'Approved' | 'Pending' | 'Restricted';
  region: string;
  models: number;
  requests24h: number;
  risk: 'Low' | 'Medium' | 'High';
  latencyMs: number;
  uptime: number;
}

export interface Model {
  id: string;
  name: string;
  providerId: string;
  modality: 'Text' | 'Vision' | 'Audio' | 'Embedding' | 'Multimodal';
  status: 'Approved' | 'Restricted';
  risk: 'Low' | 'Medium' | 'High';
  contextWindow: string;
  pricing: string;
  requests24h: number;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'Database' | 'Data Warehouse' | 'Data Lake' | 'SaaS' | 'CRM' | 'HRIS' | 'Messaging' | 'Streaming';
  connector: string;
  status: 'Connected' | 'Pending' | 'Restricted';
  categories: string[];
  records: number;
  lastSync: string;
  risk: 'Low' | 'Medium' | 'High';
}

export interface DataFlow {
  id: string;
  source: string;
  applicationId: string;
  systemId: string;
  providerId: string;
  category: string;
  decision: 'Allow' | 'Block' | 'Redact' | 'Require Approval' | 'Log';
  status: 'Active' | 'Blocked' | 'Review';
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
  volumeMb: number;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Draft' | 'Disabled';
  version: string;
  decisions: ('Allow' | 'Block' | 'Redact' | 'Require Approval' | 'Log')[];
  scope: string;
  conditions: number;
  violations: number;
  enforcements: number;
  updatedAt: string;
}

export interface GatewayRequest {
  id: string;
  timestamp: string;
  applicationId: string;
  systemId: string;
  providerId: string;
  modelId: string;
  decision: 'Allowed' | 'Blocked' | 'Redacted' | 'Approval Required' | 'Logged';
  category: string;
  latencyMs: number;
  tokens: number;
  policyId: string | null;
  ip: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Investigating' | 'Resolved';
  type: 'Policy Violation' | 'Data Exposure' | 'AI Risk' | 'Anomaly';
  systemId: string;
  policyId: string | null;
  assignee: string;
  openedAt: string;
  slaHours: number;
  description: string;
}

export interface Approval {
  id: string;
  requester: string;
  type: 'Policy Exception' | 'High-Risk Request' | 'New System' | 'Data Access' | 'Provider Access';
  status: 'Pending' | 'Approved' | 'Denied' | 'Expired';
  policyId: string | null;
  systemId: string | null;
  risk: 'Medium' | 'High' | 'Critical';
  requestedAt: string;
  expiresAt: string;
  note: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  result: 'Success' | 'Denied' | 'Error';
  ip: string;
  context: string;
}

export interface RiskAssessment {
  id: string;
  systemId: string;
  status: 'Draft' | 'In Review' | 'Approved';
  score: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  findings: number;
  assessor: string;
  startedAt: string;
  completedAt: string | null;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  standard: string;
  progress: number;
  controls: number;
  passed: number;
  failed: number;
  evidence: number;
  gaps: number;
  status: 'On Track' | 'At Risk' | 'Behind';
  nextAudit: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  schedule: 'On-demand' | 'Daily' | 'Weekly' | 'Monthly';
  format: 'PDF' | 'CSV' | 'JSON';
  status: 'Ready' | 'Scheduled' | 'Failed';
  lastRun: string;
  recipients: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
  mfa: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
}

// ---------- Organizations & user ----------

export const currentOrg = {
  id: 'org-nexora',
  name: 'Nexora Industries',
  slug: 'nexora',
  plan: 'Enterprise',
  seats: 42,
  region: 'US-East (Virginia)',
  industry: 'Financial Services',
  accountType: 'corporate' as 'corporate' | 'government',
  created: '2024-03-12',
  trial: false
};

export const currentUser = {
  name: 'Amara Okafor',
  email: 'amara.okafor@nexora.io',
  role: 'OWNER',
  title: 'VP of AI Security',
  initials: 'AO',
  mfa: true,
  lastLogin: '2026-08-13T09:42:00Z'
};

// Account-level roles belong to the account itself (the government agency or the
// private organization that purchased Sentinel). They are not assignable seats.
export const accountRoleOptions = ['OWNER', 'ADMIN'] as const;

// Assignable seat roles are the roles members within the account are invited into.
export const assignableRoleOptions = ['SECURITY_ANALYST', 'PRIVACY_OFFICER', 'COMPLIANCE_OFFICER', 'DEVELOPER', 'AUDITOR', 'VIEWER'] as const;

export const roleOptions = [...accountRoleOptions, ...assignableRoleOptions];

export const roleDescriptions: Record<string, string> = {
  OWNER: 'The account itself — holds the subscription and full control over billing, settings, and role assignment.',
  ADMIN: 'Account administrator — manages settings, team, and policies on behalf of the account owner.',
  SECURITY_ANALYST: 'Monitors incidents, gateway traffic, and risk signals. Responds to security events and reviews approvals.',
  PRIVACY_OFFICER: 'Owns privacy controls: data classification, retention, and privacy policy management.',
  COMPLIANCE_OFFICER: 'Owns compliance programs: frameworks, audit readiness, policy coverage, and regulatory reporting.',
  DEVELOPER: 'Builds and operates AI integrations: registry entries, API keys, gateway access, and application logs.',
  AUDITOR: 'Read-only evidence role: full audit log, reports, and export for internal or regulatory review.',
  VIEWER: 'Read-only dashboard visibility for stakeholders who need to see status without acting.'
};

// B2G accounts show government-friendly labels for the same seat roles.
export const governmentRoleLabels: Record<string, string> = {
  SECURITY_ANALYST: 'Security Officer',
  PRIVACY_OFFICER: 'Privacy Officer',
  COMPLIANCE_OFFICER: 'Compliance Officer',
  DEVELOPER: 'Systems Developer',
  AUDITOR: 'Records Auditor',
  VIEWER: 'Observer'
};

export function roleLabel(role: string): string {
  if (currentOrg.accountType === 'government') {
    return governmentRoleLabels[role] ?? role;
  }
  return role;
}

export function isAccountRole(role: string): boolean {
  return (accountRoleOptions as readonly string[]).includes(role);
}

// ---------- Providers ----------

const providerSeeds: Omit<Provider, 'id' | 'requests24h' | 'latencyMs' | 'uptime'>[] = [
  { name: 'OpenAI', type: 'External', status: 'Approved', region: 'US / EU', models: 4, risk: 'Medium' },
  { name: 'Anthropic', type: 'External', status: 'Approved', region: 'US', models: 3, risk: 'Medium' },
  { name: 'Google Vertex AI', type: 'Cloud', status: 'Approved', region: 'US / Global', models: 3, risk: 'Low' },
  { name: 'Microsoft Azure OpenAI', type: 'Cloud', status: 'Approved', region: 'US-East', models: 3, risk: 'Low' },
  { name: 'Amazon Bedrock', type: 'Cloud', status: 'Approved', region: 'US-East', models: 2, risk: 'Low' },
  { name: 'Self-hosted LLM Cluster', type: 'Self-hosted', status: 'Approved', region: 'Nexora DC-1', models: 2, risk: 'Low' },
  { name: 'Mistral AI', type: 'External', status: 'Pending', region: 'EU', models: 2, risk: 'High' }
];

export const providers: Provider[] = providerSeeds.map((p, i) => ({
  id: `prv-${i + 1}`,
  ...p,
  requests24h: intBetween(4000, 90000),
  latencyMs: intBetween(120, 2400),
  uptime: 99.4 + rand() * 0.55
}));

// ---------- Models ----------

const modelSeeds: Omit<Model, 'id' | 'requests24h'>[] = [
  { name: 'gpt-4.1', providerId: 'prv-1', modality: 'Multimodal', status: 'Approved', risk: 'Medium', contextWindow: '200k', pricing: '$2.00 / 1M in' },
  { name: 'gpt-4.1-mini', providerId: 'prv-1', modality: 'Text', status: 'Approved', risk: 'Low', contextWindow: '128k', pricing: '$0.40 / 1M in' },
  { name: 'gpt-4o', providerId: 'prv-1', modality: 'Multimodal', status: 'Approved', risk: 'Medium', contextWindow: '128k', pricing: '$2.50 / 1M in' },
  { name: 'claude-3.7-sonnet', providerId: 'prv-2', modality: 'Text', status: 'Approved', risk: 'Medium', contextWindow: '200k', pricing: '$3.00 / 1M in' },
  { name: 'claude-3.5-haiku', providerId: 'prv-2', modality: 'Text', status: 'Approved', risk: 'Low', contextWindow: '200k', pricing: '$0.80 / 1M in' },
  { name: 'claude-opus-4', providerId: 'prv-2', modality: 'Multimodal', status: 'Restricted', risk: 'High', contextWindow: '200k', pricing: '$15.00 / 1M in' },
  { name: 'gemini-2.5-pro', providerId: 'prv-3', modality: 'Multimodal', status: 'Approved', risk: 'Medium', contextWindow: '1M', pricing: '$1.25 / 1M in' },
  { name: 'gemini-2.0-flash', providerId: 'prv-3', modality: 'Multimodal', status: 'Approved', risk: 'Low', contextWindow: '1M', pricing: '$0.10 / 1M in' },
  { name: 'text-embedding-4', providerId: 'prv-4', modality: 'Embedding', status: 'Approved', risk: 'Low', contextWindow: '—', pricing: '$0.10 / 1M tokens' },
  { name: 'llama-3.3-70b-instruct', providerId: 'prv-6', modality: 'Text', status: 'Approved', risk: 'Low', contextWindow: '128k', pricing: 'Self-hosted' },
  { name: 'mistral-large-2', providerId: 'prv-7', modality: 'Text', status: 'Restricted', risk: 'High', contextWindow: '128k', pricing: '$2.00 / 1M in' },
  { name: 'nova-2b-embed', providerId: 'prv-6', modality: 'Embedding', status: 'Approved', risk: 'Low', contextWindow: '—', pricing: 'Self-hosted' }
];

export const models: Model[] = modelSeeds.map((m, i) => ({ id: `mdl-${i + 1}`, ...m, requests24h: intBetween(500, 40000) }));

// ---------- AI Systems ----------

const systemSeeds = [
  { name: 'Atlas Support Copilot', type: 'Copilot', owner: 'Maya Chen', purpose: 'Customer support triage and resolution suggestions', environment: 'Production', approvedAt: '2026-05-02', oversight: 'Supervised' },
  { name: 'Nova Fraud Sentinel', type: 'Decision', owner: 'Jordan Patel', purpose: 'Real-time fraud scoring on payment transactions', environment: 'Production', approvedAt: '2026-04-11', oversight: 'Human' },
  { name: 'Insight Finance Analyst', type: 'Agent', owner: 'Alicia Monroe', purpose: 'Quarterly financial report summarization', environment: 'Production', approvedAt: '2026-06-18', oversight: 'Supervised' },
  { name: 'Vertex Code Assistant', type: 'Assistant', owner: 'Devon Clarke', purpose: 'Internal engineering assistant for code review', environment: 'Production', approvedAt: '2026-03-27', oversight: 'Automated' },
  { name: 'Aurora HR Chatbot', type: 'Chatbot', owner: 'Priya Raman', purpose: 'Employee HR policy Q&A and benefits guidance', environment: 'Production', approvedAt: '2026-05-30', oversight: 'Automated' },
  { name: 'Cortex Email Agent', type: 'Agent', owner: 'Sam Whitfield', purpose: 'Draft and route executive correspondence', environment: 'Production', approvedAt: '2026-06-09', oversight: 'Human' },
  { name: 'Lumen Search Embedder', type: 'Embedding', owner: 'Devon Clarke', purpose: 'Document embedding for internal knowledge search', environment: 'Production', approvedAt: '2026-02-14', oversight: 'Automated' },
  { name: 'Pulse Sales Predictor', type: 'LLM', owner: 'Tara Osei', purpose: 'Lead scoring and revenue forecasting', environment: 'Staging', approvedAt: '2026-07-21', oversight: 'Automated' },
  { name: 'Iris Document Extractor', type: 'Vision', owner: 'Maya Chen', purpose: 'Invoice and contract data extraction', environment: 'Production', approvedAt: '2026-01-19', oversight: 'Supervised' },
  { name: 'Halo Risk Agent', type: 'Agent', owner: 'Jordan Patel', purpose: 'Third-party risk narrative generation', environment: 'Staging', approvedAt: '2026-07-08', oversight: 'Human' },
  { name: 'Zephyr Support Classifier', type: 'LLM', owner: 'Priya Raman', purpose: 'Ticket intent classification and routing', environment: 'Development', approvedAt: '2026-07-30', oversight: 'Automated' },
  { name: 'Echo Meeting Summarizer', type: 'Assistant', owner: 'Alicia Monroe', purpose: 'Meeting transcription and action items', environment: 'Production', approvedAt: '2026-04-22', oversight: 'Automated' }
] as const;

const systemTypes = systemSeeds.map((s) => s.type);
const statusPool: AiSystem['status'][] = ['Approved', 'Approved', 'Approved', 'Approved', 'Approved', 'Pending', 'Pending', 'Registered', 'Rejected'];
const riskPool: AiSystem['risk'][] = ['Low', 'Low', 'Medium', 'Medium', 'High', 'Critical'];
const dataCats = ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'PII', 'Financial', 'Health', 'Biometric', 'Location', 'Employee', 'Customer'];

export const aiSystems: AiSystem[] = systemSeeds.map((s, i) => ({
  id: `sys-${i + 1}`,
  ...s,
  status: pick(statusPool),
  risk: pick(riskPool),
  providerId: pick(providers.map((p) => p.id)),
  modelId: pick(models.map((m) => m.id)),
  dataCategories: pickN(dataCats, intBetween(2, 4)),
  lastActivity: `2026-08-13T0${intBetween(1, 9)}:${intBetween(10, 59)}:00Z`,
  requests24h: intBetween(200, 65000),
  blocked24h: intBetween(0, 420),
  redacted24h: intBetween(0, 180)
}));

// ---------- Applications ----------

const appSeeds = [
  { name: 'Nexora Web Portal', type: 'Web App', owner: 'Devon Clarke', environment: 'Production' },
  { name: 'Nexora Mobile App', type: 'Mobile App', owner: 'Devon Clarke', environment: 'Production' },
  { name: 'Customer Support Console', type: 'Internal System', owner: 'Maya Chen', environment: 'Production' },
  { name: 'Payments Orchestrator', type: 'Automation', owner: 'Jordan Patel', environment: 'Production' },
  { name: 'Executive Briefing Bot', type: 'AI Agent', owner: 'Sam Whitfield', environment: 'Production' },
  { name: 'HR Self-Service', type: 'Web App', owner: 'Priya Raman', environment: 'Production' },
  { name: 'Data Science Workbench', type: 'Internal System', owner: 'Tara Osei', environment: 'Staging' },
  { name: 'Legacy Reporting Suite', type: 'Internal System', owner: 'Alicia Monroe', environment: 'Production' }
] as const;

export const applications: Application[] = appSeeds.map((a, i) => ({
  id: `app-${i + 1}`,
  ...a,
  status: pick(['Active', 'Active', 'Active', 'Discovered'] as Application['status'][]),
  apiKeys: intBetween(1, 8),
  aiSystemIds: pickN(aiSystems.map((s) => s.id), intBetween(1, 4)),
  lastActivity: `2026-08-13T0${intBetween(1, 9)}:${intBetween(10, 59)}:00Z`,
  risk: pick(['Low', 'Low', 'Medium', 'High'] as Application['risk'][])
}));

// ---------- Data Sources ----------

const sourceSeeds = [
  { name: 'Customer PostgreSQL', type: 'Database', connector: 'postgres', records: 2480000, lastSync: '2026-08-13T08:00:00Z' },
  { name: 'Finance Data Warehouse', type: 'Data Warehouse', connector: 'snowflake', records: 18400000, lastSync: '2026-08-13T07:30:00Z' },
  { name: 'Raw Events Lake', type: 'Data Lake', connector: 's3', records: 92000000, lastSync: '2026-08-13T09:00:00Z' },
  { name: 'Salesforce CRM', type: 'CRM', connector: 'salesforce', records: 640000, lastSync: '2026-08-13T08:45:00Z' },
  { name: 'Workday HRIS', type: 'HRIS', connector: 'workday', records: 18400, lastSync: '2026-08-13T06:15:00Z' },
  { name: 'Slack Archive', type: 'Messaging', connector: 'slack', records: 12500000, lastSync: '2026-08-13T09:05:00Z' },
  { name: 'Clickstream Kafka', type: 'Streaming', connector: 'kafka', records: 0, lastSync: 'Live' },
  { name: 'Legacy Oracle DB', type: 'Database', connector: 'oracle', records: 412000, lastSync: '2026-08-11T22:00:00Z' }
] as const;

export const dataSources: DataSource[] = sourceSeeds.map((s, i) => ({
  id: `src-${i + 1}`,
  ...s,
  status: pick(['Connected', 'Connected', 'Connected', 'Pending'] as DataSource['status'][]),
  categories: pickN(['PII', 'Financial', 'Health', 'Employee', 'Customer', 'Internal', 'Confidential'], intBetween(1, 3)),
  risk: pick(['Low', 'Low', 'Medium', 'High'] as DataSource['risk'][])
}));

// ---------- Data Classification ----------

export const classificationCategories = [
  { name: 'PUBLIC', description: 'Information approved for public release', color: 'emerald', sensitivity: 1, systems: 3 },
  { name: 'INTERNAL', description: 'Internal information with restricted distribution', color: 'sky', sensitivity: 2, systems: 8 },
  { name: 'CONFIDENTIAL', description: 'Sensitive information requiring strict controls', color: 'amber', sensitivity: 3, systems: 12 },
  { name: 'RESTRICTED', description: 'Highly sensitive information with limited access', color: 'rose', sensitivity: 4, systems: 6 }
];

export const sensitiveCategories = [
  { name: 'Personal Information (PII)', detector: 'pii-detector', matches24h: 4821, blocked24h: 214 },
  { name: 'Identity & Credentials', detector: 'identity-detector', matches24h: 1102, blocked24h: 98 },
  { name: 'Financial Data', detector: 'finance-detector', matches24h: 3390, blocked24h: 176 },
  { name: 'Health Data (PHI)', detector: 'health-detector', matches24h: 517, blocked24h: 43 },
  { name: 'Biometric Data', detector: 'biometric-detector', matches24h: 98, blocked24h: 12 },
  { name: 'Location Data', detector: 'location-detector', matches24h: 764, blocked24h: 31 },
  { name: 'Employee Data', detector: 'employee-detector', matches24h: 1488, blocked24h: 77 },
  { name: 'Customer Data', detector: 'customer-detector', matches24h: 5210, blocked24h: 263 }
];

// ---------- Data Flows ----------

const decisions: DataFlow['decision'][] = ['Allow', 'Allow', 'Allow', 'Block', 'Redact', 'Require Approval', 'Log'];
const flowCats = ['PII', 'Financial', 'Health', 'Employee', 'Customer', 'Internal', 'Confidential', 'Public'];

export const dataFlows: DataFlow[] = Array.from({ length: 24 }, (_, i) => ({
  id: `flw-${i + 1}`,
  source: pick(dataSources.map((s) => s.name)),
  applicationId: pick(applications.map((a) => a.id)),
  systemId: pick(aiSystems.map((s) => s.id)),
  providerId: pick(providers.map((p) => p.id)),
  category: pick(flowCats),
  decision: pick(decisions),
  status: pick(['Active', 'Active', 'Active', 'Blocked', 'Review'] as DataFlow['status'][]),
  risk: pick(['Low', 'Low', 'Medium', 'High', 'Critical'] as DataFlow['risk'][]),
  timestamp: `2026-08-13T${String(intBetween(0, 23)).padStart(2, '0')}:${String(intBetween(0, 59)).padStart(2, '0')}:00Z`,
  volumeMb: intBetween(2, 900)
}));

// ---------- Policies ----------

export const policies: Policy[] = [
  { id: 'pol-1', name: 'Block PII to Unapproved Providers', description: 'Blocks any request containing PII to providers not approved for sensitive data.', status: 'Active', version: 'v3', decisions: ['Block'], scope: 'All AI systems', conditions: 4, violations: 312, enforcements: 21840, updatedAt: '2026-08-02' },
  { id: 'pol-2', name: 'Redact Financial Data in External Calls', description: 'Redacts financial identifiers before transmission to external providers.', status: 'Active', version: 'v5', decisions: ['Redact'], scope: 'External providers', conditions: 3, violations: 0, enforcements: 6120, updatedAt: '2026-07-28' },
  { id: 'pol-3', name: 'Require Approval for High-Risk AI Systems', description: 'Any request to a High or Critical risk system requires human approval.', status: 'Active', version: 'v2', decisions: ['Require Approval'], scope: 'High/Critical risk systems', conditions: 2, violations: 44, enforcements: 980, updatedAt: '2026-07-15' },
  { id: 'pol-4', name: 'Log All AI Requests', description: 'Records every AI request for governance and audit purposes.', status: 'Active', version: 'v1', decisions: ['Log'], scope: 'All AI traffic', conditions: 1, violations: 0, enforcements: 154230, updatedAt: '2026-06-01' },
  { id: 'pol-5', name: 'Block Health Data Outside EU', description: 'Prevents health data from leaving EU region.', status: 'Active', version: 'v2', decisions: ['Block'], scope: 'Health data', conditions: 3, violations: 18, enforcements: 442, updatedAt: '2026-07-20' },
  { id: 'pol-6', name: 'Restrict Biometric Model Access', description: 'Blocks requests to biometric-capable models without explicit approval.', status: 'Draft', version: 'v1', decisions: ['Block', 'Require Approval'], scope: 'Biometric models', conditions: 2, violations: 0, enforcements: 0, updatedAt: '2026-08-10' },
  { id: 'pol-7', name: 'Customer Data Allowlist', description: 'Only approved applications may transmit customer data to AI systems.', status: 'Active', version: 'v4', decisions: ['Allow'], scope: 'Customer data', conditions: 5, violations: 67, enforcements: 8940, updatedAt: '2026-07-05' },
  { id: 'pol-8', name: 'Rate Limit Self-Hosted Inference', description: 'Limits daily inference volume on the self-hosted cluster.', status: 'Disabled', version: 'v1', decisions: ['Block'], scope: 'Self-hosted cluster', conditions: 2, violations: 0, enforcements: 0, updatedAt: '2026-05-30' },
  { id: 'pol-9', name: 'Require MFA for Admin Policy Changes', description: 'Administrative policy changes require verified MFA session.', status: 'Active', version: 'v1', decisions: ['Require Approval'], scope: 'Admin actions', conditions: 1, violations: 0, enforcements: 114, updatedAt: '2026-08-01' },
  { id: 'pol-10', name: 'Block Employee Data to Consumer Tools', description: 'Prevents employee data from reaching consumer-grade AI tools.', status: 'Active', version: 'v3', decisions: ['Block'], scope: 'Employee data', conditions: 3, violations: 129, enforcements: 3120, updatedAt: '2026-07-11' }
];

// ---------- Gateway requests ----------

export const gatewayDecisions = ['Allowed', 'Blocked', 'Redacted', 'Approval Required', 'Logged'] as const;

export const gatewayRequests: GatewayRequest[] = Array.from({ length: 40 }, (_, i) => {
  const decision = pick([...gatewayDecisions]);
  return {
    id: `req-${String(10000 + i)}`,
    timestamp: `2026-08-13T${String(intBetween(0, 23)).padStart(2, '0')}:${String(intBetween(0, 59)).padStart(2, '0')}:${String(intBetween(0, 59)).padStart(2, '0')}Z`,
    applicationId: pick(applications.map((a) => a.id)),
    systemId: pick(aiSystems.map((s) => s.id)),
    providerId: pick(providers.map((p) => p.id)),
    modelId: pick(models.map((m) => m.id)),
    decision,
    category: pick(flowCats),
    latencyMs: intBetween(80, 3200),
    tokens: intBetween(120, 24000),
    policyId: decision === 'Blocked' || decision === 'Redacted' ? pick(policies.filter((p) => p.status === 'Active').map((p) => p.id)) : null,
    ip: `10.${intBetween(0, 9)}.${intBetween(0, 255)}.${intBetween(1, 254)}`
  };
});

// Hourly volume series (24 points) for charts
export const hourlySeries = Array.from({ length: 24 }, (_, i) => {
  const hour = `${String(i).padStart(2, '0')}:00`;
  return {
    hour,
    allowed: intBetween(800, 2400),
    blocked: intBetween(20, 160),
    redacted: intBetween(10, 90),
    pending: intBetween(2, 30),
    latency: intBetween(220, 900)
  };
});

// Daily series (30 days)
export const dailySeries = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 6, 15 + i);
  return {
    date: d.toISOString().slice(5, 10),
    requests: intBetween(12000, 42000),
    blocked: intBetween(180, 1400),
    incidents: intBetween(1, 12),
    riskScore: 38 + intBetween(-6, 8)
  };
});

// ---------- Incidents ----------

export const incidents: Incident[] = [
  { id: 'inc-1042', title: 'PII transmitted to unapproved provider', severity: 'Critical', status: 'Investigating', type: 'Policy Violation', systemId: 'sys-3', policyId: 'pol-1', assignee: 'Jordan Patel', openedAt: '2026-08-13T08:12:00Z', slaHours: 4, description: 'Gateway blocked 6 requests, but 1 request completed before policy propagation. Customer PII (email, SSN) observed in provider logs.' },
  { id: 'inc-1041', title: 'Financial data exposure in staging agent', severity: 'High', status: 'Open', type: 'Data Exposure', systemId: 'sys-8', policyId: 'pol-2', assignee: 'Maya Chen', openedAt: '2026-08-13T06:40:00Z', slaHours: 8, description: 'Staging agent accessed production finance warehouse credentials and transmitted sample rows.' },
  { id: 'inc-1040', title: 'Anomalous embedding extraction pattern', severity: 'Medium', status: 'Investigating', type: 'Anomaly', systemId: 'sys-7', policyId: null, assignee: 'Devon Clarke', openedAt: '2026-08-12T22:15:00Z', slaHours: 24, description: '10x increase in embedding requests from Lumen Search Embedder over 4 hours.' },
  { id: 'inc-1039', title: 'Health data crossing EU boundary', severity: 'High', status: 'Open', type: 'Policy Violation', systemId: 'sys-2', policyId: 'pol-5', assignee: 'Priya Raman', openedAt: '2026-08-12T18:02:00Z', slaHours: 8, description: 'Requests containing PHI routed to US-hosted provider for two minutes during failover.' },
  { id: 'inc-1038', title: 'Suspected credential exfiltration attempt', severity: 'Critical', status: 'Investigating', type: 'AI Risk', systemId: 'sys-4', policyId: null, assignee: 'Jordan Patel', openedAt: '2026-08-12T15:30:00Z', slaHours: 4, description: 'Prompt-injection pattern detected attempting to extract stored API keys from context.' },
  { id: 'inc-1037', title: 'Employee data leaked via consumer tool', severity: 'High', status: 'Resolved', type: 'Data Exposure', systemId: 'sys-5', policyId: 'pol-10', assignee: 'Sam Whitfield', openedAt: '2026-08-11T11:00:00Z', slaHours: 8, description: 'HR chatbot exposed employee salary bands to a consumer-grade AI tool. Policy updated and enforced.' },
  { id: 'inc-1036', title: 'Rate limit bypass on self-hosted cluster', severity: 'Medium', status: 'Resolved', type: 'AI Risk', systemId: 'sys-10', policyId: 'pol-8', assignee: 'Devon Clarke', openedAt: '2026-08-10T09:45:00Z', slaHours: 24, description: 'Batch job bypassed rate limiting via multiple service accounts. Job throttled.' },
  { id: 'inc-1035', title: 'Biometric model access request', severity: 'Low', status: 'Resolved', type: 'AI Risk', systemId: 'sys-6', policyId: 'pol-6', assignee: 'Tara Osei', openedAt: '2026-08-09T14:20:00Z', slaHours: 48, description: 'Developer requested access to biometric-capable model; denied pending policy approval.' },
  { id: 'inc-1034', title: 'Customer data without allowlist entry', severity: 'Medium', status: 'Open', type: 'Policy Violation', systemId: 'sys-1', policyId: 'pol-7', assignee: 'Maya Chen', openedAt: '2026-08-08T10:05:00Z', slaHours: 24, description: 'New application attempted to transmit customer data without allowlist registration.' },
  { id: 'inc-1033', title: 'Unapproved provider in request chain', severity: 'High', status: 'Resolved', type: 'Policy Violation', systemId: 'sys-9', policyId: 'pol-1', assignee: 'Alicia Monroe', openedAt: '2026-08-07T16:40:00Z', slaHours: 8, description: 'Mistral endpoint received CONFIIDENTIAL document text. Provider registration completed and re-approved.' },
  { id: 'inc-1032', title: 'Token usage spike from automation', severity: 'Low', status: 'Resolved', type: 'Anomaly', systemId: 'sys-12', policyId: null, assignee: 'Devon Clarke', openedAt: '2026-08-06T07:55:00Z', slaHours: 48, description: 'Meeting summarizer consumed 3x monthly token budget in one day. Quota applied.' },
  { id: 'inc-1031', title: 'Cross-tenant data flow attempt', severity: 'Critical', status: 'Resolved', type: 'Data Exposure', systemId: 'sys-11', policyId: null, assignee: 'Jordan Patel', openedAt: '2026-08-05T19:10:00Z', slaHours: 4, description: 'Attempted access to another organization resource detected and blocked at gateway.' }
];

// ---------- Approvals ----------

export const approvals: Approval[] = [
  { id: 'apr-881', requester: 'Devon Clarke', type: 'High-Risk Request', status: 'Pending', policyId: 'pol-3', systemId: 'sys-3', risk: 'Critical', requestedAt: '2026-08-13T07:30:00Z', expiresAt: '2026-08-13T15:30:00Z', note: 'One-time bulk customer profile enrichment for migration project.' },
  { id: 'apr-880', requester: 'Priya Raman', type: 'Policy Exception', status: 'Pending', policyId: 'pol-10', systemId: 'sys-5', risk: 'High', requestedAt: '2026-08-13T06:10:00Z', expiresAt: '2026-08-14T06:10:00Z', note: 'Temporary exception for open enrollment campaign (48h).' },
  { id: 'apr-879', requester: 'Tara Osei', type: 'New System', status: 'Pending', policyId: null, systemId: 'sys-8', risk: 'High', requestedAt: '2026-08-12T17:45:00Z', expiresAt: '2026-08-15T17:45:00Z', note: 'Production promotion of Pulse Sales Predictor after 30-day staging.' },
  { id: 'apr-878', requester: 'Sam Whitfield', type: 'Data Access', status: 'Approved', policyId: 'pol-7', systemId: 'sys-6', risk: 'Medium', requestedAt: '2026-08-12T09:20:00Z', expiresAt: '2026-08-13T09:20:00Z', note: 'Executive briefing bot needs read access to board materials.' },
  { id: 'apr-877', requester: 'Maya Chen', type: 'Provider Access', status: 'Approved', policyId: null, systemId: 'sys-1', risk: 'Medium', requestedAt: '2026-08-11T13:00:00Z', expiresAt: '2026-08-18T13:00:00Z', note: 'Enable Mistral endpoint for internal prototyping only.' },
  { id: 'apr-876', requester: 'Alicia Monroe', type: 'Policy Exception', status: 'Denied', policyId: 'pol-5', systemId: 'sys-2', risk: 'High', requestedAt: '2026-08-10T11:15:00Z', expiresAt: '2026-08-11T11:15:00Z', note: 'Requested EU data residency override; denied by compliance.' },
  { id: 'apr-875', requester: 'Devon Clarke', type: 'Data Access', status: 'Expired', policyId: 'pol-2', systemId: 'sys-7', risk: 'Medium', requestedAt: '2026-08-08T08:00:00Z', expiresAt: '2026-08-09T08:00:00Z', note: 'One-time embedding of finance archive; expired before approval.' },
  { id: 'apr-874', requester: 'Jordan Patel', type: 'High-Risk Request', status: 'Approved', policyId: 'pol-3', systemId: 'sys-2', risk: 'Critical', requestedAt: '2026-08-07T10:30:00Z', expiresAt: '2026-08-07T18:30:00Z', note: 'Fraud model retraining on live transaction sample.' }
];

// ---------- Audit logs ----------

const auditActions = ['policy.create', 'policy.update', 'policy.delete', 'system.approve', 'system.register', 'system.reject', 'incident.create', 'incident.resolve', 'approval.decide', 'key.rotate', 'key.create', 'user.invite', 'user.role_change', 'export.run', 'settings.update', 'auth.login', 'auth.mfa_challenge', 'integration.connect'];

export const auditLogs: AuditLog[] = Array.from({ length: 28 }, (_, i) => {
  const action = pick(auditActions);
  return {
    id: `log-${8000 + i}`,
    timestamp: `2026-08-13T${String(intBetween(0, 23)).padStart(2, '0')}:${String(intBetween(0, 59)).padStart(2, '0')}:${String(intBetween(0, 59)).padStart(2, '0')}Z`,
    actor: pick(['amara.okafor@nexora.io', 'jordan.patel@nexora.io', 'maya.chen@nexora.io', 'devon.clarke@nexora.io', 'priya.raman@nexora.io', 'system', 'alicia.monroe@nexora.io']),
    action,
    resource: pick(['policy:pol-1', 'system:sys-3', 'app:app-2', 'provider:prv-7', 'key:sk_live_***', 'incident:inc-1042', 'user:u-12', 'integration:slack', 'report:rpt-31']),
    result: pick(['Success', 'Success', 'Success', 'Denied', 'Error'] as AuditLog['result'][]),
    ip: pick(['10.0.4.22', '10.0.7.91', '10.2.1.14', '10.2.9.63', '172.16.8.4']),
    context: pick(['web-console', 'api', 'gateway', 'cli', 'webhook'])
  };
});

// ---------- Risk ----------

export const riskAssessments: RiskAssessment[] = [
  { id: 'ras-51', systemId: 'sys-2', status: 'Approved', score: 84, severity: 'High', findings: 7, assessor: 'Jordan Patel', startedAt: '2026-07-20', completedAt: '2026-07-28' },
  { id: 'ras-50', systemId: 'sys-3', status: 'In Review', score: 72, severity: 'High', findings: 5, assessor: 'Alicia Monroe', startedAt: '2026-08-01', completedAt: null },
  { id: 'ras-49', systemId: 'sys-6', status: 'In Review', score: 61, severity: 'Medium', findings: 3, assessor: 'Maya Chen', startedAt: '2026-08-05', completedAt: null },
  { id: 'ras-48', systemId: 'sys-1', status: 'Approved', score: 38, severity: 'Low', findings: 2, assessor: 'Tara Osei', startedAt: '2026-06-14', completedAt: '2026-06-22' },
  { id: 'ras-47', systemId: 'sys-4', status: 'Approved', score: 55, severity: 'Medium', findings: 4, assessor: 'Devon Clarke', startedAt: '2026-05-30', completedAt: '2026-06-10' },
  { id: 'ras-46', systemId: 'sys-8', status: 'Draft', score: 0, severity: 'High', findings: 0, assessor: 'Jordan Patel', startedAt: '2026-08-11', completedAt: null }
];

export const riskFindings = [
  { id: 'fnd-201', assessmentId: 'ras-51', title: 'Unencrypted model outputs cached', severity: 'High', status: 'Open', owner: 'Devon Clarke', due: '2026-08-20' },
  { id: 'fnd-202', assessmentId: 'ras-51', title: 'Missing input validation for prompts', severity: 'Medium', status: 'In Progress', owner: 'Maya Chen', due: '2026-08-25' },
  { id: 'fnd-203', assessmentId: 'ras-50', title: 'Over-provisioned service account scope', severity: 'Critical', status: 'Open', owner: 'Jordan Patel', due: '2026-08-15' },
  { id: 'fnd-204', assessmentId: 'ras-50', title: 'No data retention policy on transcripts', severity: 'High', status: 'Open', owner: 'Priya Raman', due: '2026-08-22' },
  { id: 'fnd-205', assessmentId: 'ras-49', title: 'Provider subprocessors not reviewed', severity: 'Medium', status: 'In Progress', owner: 'Alicia Monroe', due: '2026-08-30' },
  { id: 'fnd-206', assessmentId: 'ras-48', title: 'Log retention below compliance threshold', severity: 'Low', status: 'Resolved', owner: 'Devon Clarke', due: '2026-07-30' },
  { id: 'fnd-207', assessmentId: 'ras-47', title: 'Prompt injection defenses not tested', severity: 'Medium', status: 'Resolved', owner: 'Jordan Patel', due: '2026-08-05' }
];

// ---------- Compliance ----------

export const complianceFrameworks: ComplianceFramework[] = [
  { id: 'cf-1', name: 'SOC 2 Type II', standard: 'AICPA', progress: 82, controls: 68, passed: 56, failed: 3, evidence: 214, gaps: 9, status: 'On Track', nextAudit: '2026-11-14' },
  { id: 'cf-2', name: 'ISO/IEC 27001', standard: 'ISO', progress: 74, controls: 93, passed: 69, failed: 5, evidence: 187, gaps: 19, status: 'On Track', nextAudit: '2026-12-02' },
  { id: 'cf-3', name: 'NIST AI RMF', standard: 'NIST', progress: 61, controls: 47, passed: 29, failed: 4, evidence: 96, gaps: 14, status: 'At Risk', nextAudit: '2026-10-21' },
  { id: 'cf-4', name: 'GDPR Readiness', standard: 'EU', progress: 88, controls: 32, passed: 28, failed: 1, evidence: 141, gaps: 3, status: 'On Track', nextAudit: '2026-09-30' },
  { id: 'cf-5', name: 'HIPAA Controls', standard: 'HHS', progress: 69, controls: 41, passed: 28, failed: 2, evidence: 74, gaps: 11, status: 'At Risk', nextAudit: '2026-11-05' },
  { id: 'cf-6', name: 'EU AI Act (Tier 2)', standard: 'EU', progress: 47, controls: 38, passed: 18, failed: 6, evidence: 52, gaps: 14, status: 'Behind', nextAudit: '2027-02-01' }
];

export const complianceControls = [
  { id: 'ctl-1', frameworkId: 'cf-1', code: 'CC6.1', name: 'Logical and physical access control', status: 'Implemented', evidence: 12, owner: 'Devon Clarke', updated: '2026-08-02' },
  { id: 'ctl-2', frameworkId: 'cf-1', code: 'CC7.2', name: 'Monitoring and detection procedures', status: 'Implemented', evidence: 9, owner: 'Jordan Patel', updated: '2026-07-28' },
  { id: 'ctl-3', frameworkId: 'cf-1', code: 'CC8.1', name: 'Change management', status: 'Partially Implemented', evidence: 6, owner: 'Tara Osei', updated: '2026-08-05' },
  { id: 'ctl-4', frameworkId: 'cf-2', code: 'A.9.4.2', name: 'Secure log-on procedures', status: 'Implemented', evidence: 8, owner: 'Devon Clarke', updated: '2026-07-15' },
  { id: 'ctl-5', frameworkId: 'cf-3', code: 'GOVERN 1.1', name: 'AI governance framework', status: 'Not Implemented', evidence: 0, owner: 'Alicia Monroe', updated: '2026-08-10' },
  { id: 'ctl-6', frameworkId: 'cf-4', code: 'Art. 30', name: 'Records of processing activities', status: 'Implemented', evidence: 11, owner: 'Priya Raman', updated: '2026-08-01' },
  { id: 'ctl-7', frameworkId: 'cf-5', code: '164.308', name: 'Access control standard', status: 'Partially Implemented', evidence: 5, owner: 'Jordan Patel', updated: '2026-07-22' },
  { id: 'ctl-8', frameworkId: 'cf-6', code: 'Art. 13', name: 'Transparency obligations', status: 'Not Implemented', evidence: 1, owner: 'Alicia Monroe', updated: '2026-08-09' }
];

export const complianceEvidence = [
  { id: 'ev-301', controlId: 'ctl-1', title: 'Access review Q2 2026', type: 'Policy', uploadedBy: 'Devon Clarke', date: '2026-07-02', status: 'Valid' },
  { id: 'ev-302', controlId: 'ctl-1', title: 'IAM entitlement report', type: 'Report', uploadedBy: 'Devon Clarke', date: '2026-07-10', status: 'Valid' },
  { id: 'ev-303', controlId: 'ctl-2', title: 'SIEM alert configuration', type: 'Configuration', uploadedBy: 'Jordan Patel', date: '2026-06-25', status: 'Valid' },
  { id: 'ev-304', controlId: 'ctl-4', title: 'SSO enforcement screenshot', type: 'Screenshot', uploadedBy: 'Tara Osei', date: '2026-07-18', status: 'Needs Review' },
  { id: 'ev-305', controlId: 'ctl-6', title: 'DPO processing register export', type: 'Export', uploadedBy: 'Priya Raman', date: '2026-07-30', status: 'Valid' },
  { id: 'ev-306', controlId: 'ctl-3', title: 'Change advisory board minutes', type: 'Document', uploadedBy: 'Maya Chen', date: '2026-08-03', status: 'Expired' }
];

export const complianceGaps = [
  { id: 'gap-401', frameworkId: 'cf-3', title: 'No documented AI inventory process', severity: 'High', owner: 'Alicia Monroe', due: '2026-09-15', status: 'Open' },
  { id: 'gap-402', frameworkId: 'cf-5', title: 'BAAs not executed with 2 providers', severity: 'Critical', owner: 'Priya Raman', due: '2026-09-01', status: 'Open' },
  { id: 'gap-403', frameworkId: 'cf-6', title: 'Transparency documentation incomplete', severity: 'High', owner: 'Alicia Monroe', due: '2026-10-01', status: 'Open' },
  { id: 'gap-404', frameworkId: 'cf-2', title: 'Vendor due diligence backlog', severity: 'Medium', owner: 'Tara Osei', due: '2026-09-30', status: 'In Progress' },
  { id: 'gap-405', frameworkId: 'cf-1', title: 'Disaster recovery test outstanding', severity: 'Medium', owner: 'Devon Clarke', due: '2026-11-01', status: 'Open' }
];

// ---------- Reports ----------

export const reports: Report[] = [
  { id: 'rpt-31', name: 'Executive AI Governance Summary', type: 'Executive', schedule: 'Monthly', format: 'PDF', status: 'Ready', lastRun: '2026-08-01', recipients: 'Exec team (12)' },
  { id: 'rpt-30', name: 'Policy Enforcement Weekly', type: 'Policy', schedule: 'Weekly', format: 'CSV', status: 'Ready', lastRun: '2026-08-11', recipients: 'Security (6)' },
  { id: 'rpt-29', name: 'Incident Response Metrics', type: 'Incidents', schedule: 'Weekly', format: 'PDF', status: 'Ready', lastRun: '2026-08-12', recipients: 'SOC (9)' },
  { id: 'rpt-28', name: 'Data Flow Compliance Report', type: 'Compliance', schedule: 'Monthly', format: 'PDF', status: 'Scheduled', lastRun: '2026-07-30', recipients: 'Compliance (4)' },
  { id: 'rpt-27', name: 'Provider Spend & Usage', type: 'Usage', schedule: 'Monthly', format: 'JSON', status: 'Ready', lastRun: '2026-08-02', recipients: 'Finance (3)' },
  { id: 'rpt-26', name: 'Risk Register Snapshot', type: 'Risk', schedule: 'On-demand', format: 'PDF', status: 'Ready', lastRun: '2026-08-13', recipients: 'Risk committee (8)' },
  { id: 'rpt-25', name: 'AI Registry Annual Review', type: 'Governance', schedule: 'Monthly', format: 'PDF', status: 'Failed', lastRun: '2026-08-01', recipients: 'Board (5)' },
  { id: 'rpt-24', name: 'Token Usage by Application', type: 'Usage', schedule: 'Daily', format: 'CSV', status: 'Ready', lastRun: '2026-08-13', recipients: 'Engineering (11)' }
];

// ---------- Team ----------

export const teamMembers: TeamMember[] = [
  { id: 'u-1', name: 'Amara Okafor', email: 'amara.okafor@nexora.io', role: 'OWNER', status: 'Active', lastActive: '2026-08-13T09:42:00Z', mfa: true },
  { id: 'u-2', name: 'Jordan Patel', email: 'jordan.patel@nexora.io', role: 'SECURITY_ANALYST', status: 'Active', lastActive: '2026-08-13T09:10:00Z', mfa: true },
  { id: 'u-3', name: 'Maya Chen', email: 'maya.chen@nexora.io', role: 'SECURITY_ANALYST', status: 'Active', lastActive: '2026-08-13T08:55:00Z', mfa: true },
  { id: 'u-4', name: 'Devon Clarke', email: 'devon.clarke@nexora.io', role: 'DEVELOPER', status: 'Active', lastActive: '2026-08-13T08:30:00Z', mfa: false },
  { id: 'u-5', name: 'Priya Raman', email: 'priya.raman@nexora.io', role: 'PRIVACY_OFFICER', status: 'Active', lastActive: '2026-08-13T07:44:00Z', mfa: true },
  { id: 'u-6', name: 'Alicia Monroe', email: 'alicia.monroe@nexora.io', role: 'COMPLIANCE_OFFICER', status: 'Active', lastActive: '2026-08-12T18:20:00Z', mfa: true },
  { id: 'u-7', name: 'Tara Osei', email: 'tara.osei@nexora.io', role: 'AUDITOR', status: 'Active', lastActive: '2026-08-12T16:05:00Z', mfa: true },
  { id: 'u-8', name: 'Sam Whitfield', email: 'sam.whitfield@nexora.io', role: 'VIEWER', status: 'Active', lastActive: '2026-08-12T15:40:00Z', mfa: false },
  { id: 'u-9', name: 'Nadia Haddad', email: 'nadia.haddad@nexora.io', role: 'SECURITY_ANALYST', status: 'Invited', lastActive: '—', mfa: false },
  { id: 'u-10', name: 'Luis Ferreira', email: 'luis.ferreira@nexora.io', role: 'DEVELOPER', status: 'Suspended', lastActive: '2026-07-28T11:12:00Z', mfa: false }
];

export const rolePermissions: Record<string, string[]> = {
  OWNER: ['billing.manage', 'settings.manage', 'team.manage', 'policies.manage', 'audit.read', 'reports.manage', 'billing.read', 'api.manage'],
  ADMIN: ['settings.manage', 'team.manage', 'policies.manage', 'audit.read', 'reports.manage', 'api.manage'],
  SECURITY_ANALYST: ['incidents.manage', 'gateway.read', 'policies.read', 'audit.read', 'reports.read'],
  PRIVACY_OFFICER: ['data.read', 'policies.read', 'classifications.manage', 'audit.read'],
  COMPLIANCE_OFFICER: ['compliance.manage', 'audit.read', 'reports.read', 'policies.read'],
  DEVELOPER: ['applications.read', 'keys.manage', 'gateway.read', 'logs.read'],
  AUDITOR: ['audit.read', 'reports.read', 'export.run'],
  VIEWER: ['dashboard.read']
};

export const invitations = [
  { id: 'inv-1', email: 'nadia.haddad@nexora.io', role: 'SECURITY_ANALYST', sentAt: '2026-08-12', status: 'Pending' },
  { id: 'inv-2', email: 'peter.graves@nexora.io', role: 'AUDITOR', sentAt: '2026-08-11', status: 'Pending' },
  { id: 'inv-3', email: 'olivia.schmidt@nexora.io', role: 'COMPLIANCE_OFFICER', sentAt: '2026-08-09', status: 'Accepted' }
];

// ---------- Billing ----------

export const billingPlans = [
  { id: 'plan-starter', name: 'Starter', price: 49, monthlyRequests: 100000, users: 5, features: ['Core gateway', '10 policies', '7-day audit retention', 'Community support'] },
  { id: 'plan-growth', name: 'Growth', price: 249, monthlyRequests: 1000000, users: 25, features: ['Full gateway', 'Unlimited policies', '90-day audit retention', 'Redaction engine', 'Email support'] },
  { id: 'plan-enterprise', name: 'Enterprise', price: 1499, monthlyRequests: 10000000, users: 100, features: ['Everything in Growth', 'SSO + SCIM', 'Custom retention', 'Dedicated support', 'SLA 99.9%'] }
];

export const invoices: Invoice[] = [
  { id: 'inv-01', number: 'INV-2026-0841', date: '2026-08-01', amount: 1499, status: 'Paid' },
  { id: 'inv-02', number: 'INV-2026-0777', date: '2026-07-01', amount: 1499, status: 'Paid' },
  { id: 'inv-03', number: 'INV-2026-0704', date: '2026-06-01', amount: 1499, status: 'Paid' },
  { id: 'inv-04', number: 'INV-2026-0629', date: '2026-05-01', amount: 1499, status: 'Paid' },
  { id: 'inv-05', number: 'INV-2026-0558', date: '2026-04-01', amount: 1499, status: 'Paid' },
  { id: 'inv-06', number: 'INV-2026-0490', date: '2026-03-01', amount: 1249, status: 'Failed' }
];

export const usageByApp = applications.slice(0, 6).map((a, i) => ({
  name: a.name,
  requests: [24000, 18000, 31000, 15000, 27000, 22000][i],
  tokens: [4200000, 2100000, 6800000, 990000, 3300000, 4100000][i],
  cost: [8800, 3100, 14200, 1900, 7600, 5900][i]
}));

export const usageByProvider = providers.slice(0, 6).map((p, i) => ({
  name: p.name.split(' ')[0],
  requests: [88000, 64000, 41000, 35000, 22000, 9000][i],
  cost: [18200, 14900, 6100, 5200, 3100, 450][i]
}));

// ---------- Notifications ----------

export const notifications = [
  { id: 'ntf-1', type: 'Incident', title: 'Critical incident escalated: inc-1042', detail: 'PII transmitted to unapproved provider', time: '4m ago', unread: true },
  { id: 'ntf-2', type: 'Approval', title: 'Approval request awaiting decision', detail: 'apr-881 — High-Risk Request by Devon Clarke', time: '28m ago', unread: true },
  { id: 'ntf-3', type: 'Security', title: 'MFA challenge completed', detail: 'New device sign-in from 10.2.9.63', time: '1h ago', unread: true },
  { id: 'ntf-4', type: 'System', title: 'Report scheduled successfully', detail: 'Data Flow Compliance Report queued for 08-14', time: '2h ago', unread: false },
  { id: 'ntf-5', type: 'Incident', title: 'Incident resolved: inc-1037', detail: 'Employee data leak — policy enforced', time: '1d ago', unread: false },
  { id: 'ntf-6', type: 'Policy', title: 'Policy drift detected', detail: 'pol-7 enforcement dropped 4% over 48h', time: '1d ago', unread: false },
  { id: 'ntf-7', type: 'Usage', title: 'Monthly usage at 82%', detail: '10M request tier — 8.2M used', time: '2d ago', unread: false },
  { id: 'ntf-8', type: 'System', title: 'Worker queue healthy', detail: 'All BullMQ workers operational', time: '3d ago', unread: false }
];

// ---------- Admin (platform) ----------

export const platformOrganizations = [
  { id: 'org-1', name: 'Nexora Industries', plan: 'Enterprise', users: 42, systems: 12, status: 'Active', mrr: 1499, region: 'US' },
  { id: 'org-2', name: 'Atlas Health', plan: 'Enterprise', users: 87, systems: 31, status: 'Active', mrr: 1499, region: 'EU' },
  { id: 'org-3', name: 'Vertex Systems', plan: 'Growth', users: 18, systems: 6, status: 'Active', mrr: 249, region: 'US' },
  { id: 'org-4', name: 'Nova Financial', plan: 'Enterprise', users: 64, systems: 27, status: 'Active', mrr: 1499, region: 'US' },
  { id: 'org-5', name: 'Pulse Retail Group', plan: 'Growth', users: 11, systems: 4, status: 'Trial', mrr: 0, region: 'UK' },
  { id: 'org-6', name: 'Iris Biometrics', plan: 'Starter', users: 4, systems: 2, status: 'Overdue', mrr: 49, region: 'CA' },
  { id: 'org-7', name: 'Halo Insurance', plan: 'Growth', users: 23, systems: 9, status: 'Active', mrr: 249, region: 'US' },
  { id: 'org-8', name: 'Zephyr Logistics', plan: 'Starter', users: 7, systems: 3, status: 'Suspended', mrr: 49, region: 'AU' }
];

export const platformUsers = Array.from({ length: 14 }, (_, i) => ({
  id: `pu-${i + 1}`,
  name: pick(['Amara Okafor', 'Jordan Patel', 'Maya Chen', 'Devon Clarke', 'Priya Raman', 'Alicia Monroe', 'Tara Osei', 'Sam Whitfield', 'Nadia Haddad', 'Luis Ferreira', 'Peter Graves', 'Olivia Schmidt', 'Ravi Kumar', 'Ingrid Bauer']),
  email: `user${i + 1}@${pick(['nexora.io', 'atlas.health', 'vertex.systems', 'nova.finance', 'pulse.retail'])}`,
  orgId: pick(platformOrganizations.map((o) => o.id)),
  role: pick(roleOptions),
  status: pick(['Active', 'Active', 'Active', 'Suspended'] as const),
  lastSeen: `2026-08-13T0${intBetween(1, 9)}:${intBetween(10, 59)}:00Z`
}));

export const systemJobs = [
  { id: 'job-1', name: 'audit-retention-sweep', queue: 'maintenance', status: 'Running', progress: 68, startedAt: '2026-08-13T08:00:00Z' },
  { id: 'job-2', name: 'report-monthly-ai-governance', queue: 'reports', status: 'Running', progress: 42, startedAt: '2026-08-13T08:15:00Z' },
  { id: 'job-3', name: 'classification-rebuild-index', queue: 'classification', status: 'Queued', progress: 0, startedAt: null },
  { id: 'job-4', name: 'incident-sla-escalation', queue: 'incidents', status: 'Completed', progress: 100, startedAt: '2026-08-13T07:30:00Z' },
  { id: 'job-5', name: 'data-flow-graph-recompute', queue: 'analytics', status: 'Completed', progress: 100, startedAt: '2026-08-13T06:00:00Z' },
  { id: 'job-6', name: 'provider-health-checks', queue: 'integrations', status: 'Failed', progress: 14, startedAt: '2026-08-13T08:20:00Z' }
];

export const queueStats = [
  { name: 'gateway-eval', pending: 214, active: 6, rate: '410/s', latencyMs: 18 },
  { name: 'redaction', pending: 62, active: 3, rate: '120/s', latencyMs: 24 },
  { name: 'audit-write', pending: 1240, active: 8, rate: '820/s', latencyMs: 9 },
  { name: 'notifications', pending: 41, active: 2, rate: '30/s', latencyMs: 15 },
  { name: 'reports', pending: 7, active: 1, rate: '2/s', latencyMs: 320 },
  { name: 'incidents', pending: 3, active: 1, rate: '1/s', latencyMs: 45 }
];

export const featureFlags = [
  { id: 'ff-1', name: 'gateway.v3.proxy', description: 'Enable v3 proxy layer for OpenAI-compatible endpoints', enabled: true, owner: 'Devon Clarke', updated: '2026-08-05' },
  { id: 'ff-2', name: 'redaction.transformer-v2', description: 'Use transformer-based redaction pipeline', enabled: true, owner: 'Maya Chen', updated: '2026-07-30' },
  { id: 'ff-3', name: 'approvals.auto-expire', description: 'Auto-expire pending approvals after TTL', enabled: true, owner: 'Jordan Patel', updated: '2026-07-22' },
  { id: 'ff-4', name: 'reports.ai-summary', description: 'AI-generated executive summaries in reports', enabled: false, owner: 'Alicia Monroe', updated: '2026-08-08' },
  { id: 'ff-5', name: 'government.registry-v2', description: 'Next-gen government AI registry', enabled: false, owner: 'Amara Okafor', updated: '2026-08-11' },
  { id: 'ff-6', name: 'gateway.streaming', description: 'Streaming responses through the gateway', enabled: false, owner: 'Devon Clarke', updated: '2026-08-02' }
];

// ---------- Government ----------

export const governmentAgencies = [
  { id: 'gov-1', name: 'Ministry of Digital Affairs', type: 'Federal', systems: 24, status: 'Active', risk: 'Medium', contact: 'Regina Solis' },
  { id: 'gov-2', name: 'National Cybersecurity Center', type: 'Federal', systems: 41, status: 'Active', risk: 'High', contact: 'Marcus Webb' },
  { id: 'gov-3', name: 'Public Health Authority', type: 'Federal', systems: 17, status: 'Active', risk: 'High', contact: 'Dr. Lina Fares' },
  { id: 'gov-4', name: 'State Tax Administration', type: 'State', systems: 9, status: 'Review', risk: 'Medium', contact: 'Omar Khalil' },
  { id: 'gov-5', name: 'Social Security Agency', type: 'Federal', systems: 14, status: 'Active', risk: 'Critical', contact: 'Elena Petrova' },
  { id: 'gov-6', name: 'City Transit Authority', type: 'Municipal', systems: 3, status: 'Pending', risk: 'Low', contact: 'Jonas Berg' }
];

export const governmentRegistry = Array.from({ length: 18 }, (_, i) => ({
  id: `reg-${i + 1}`,
  name: pick(['Civic Chat Assistant', 'Permit Analyzer', 'Fraud Detection Unit', 'Document Translator', 'Public Records Search', 'Benefit Eligibility Engine', 'Traffic Signal Optimizer', 'Complaint Classifier', 'Tax Anomaly Detector', 'Health Alert System']),
  agencyId: pick(governmentAgencies.map((a) => a.id)),
  purpose: pick(['Citizen services', 'Regulatory compliance', 'Public safety', 'Administrative automation', 'Data analytics']),
  status: pick(['Registered', 'Registered', 'Registered', 'Pending', 'Restricted', 'Expired'] as const),
  risk: pick(['Low', 'Low', 'Medium', 'High', 'Critical'] as const),
  approvedAt: `2026-0${intBetween(1, 8)}-${String(intBetween(1, 28)).padStart(2, '0')}`,
  operator: pick(['CivicTech Ltd', 'GovLabs', 'Atlas Public', 'DataGov Solutions'])
}));

export const governmentStandards = [
  { id: 'std-1', name: 'National AI Governance Framework', version: 'v2.1', status: 'Active', systems: 28 },
  { id: 'std-2', name: 'Public Sector Data Protection Rules', version: 'v1.4', status: 'Active', systems: 41 },
  { id: 'std-3', name: 'AI Risk Classification Standard', version: 'v3.0', status: 'Active', systems: 33 },
  { id: 'std-4', name: 'Cross-Agency Interoperability Spec', version: 'v1.0', status: 'Draft', systems: 6 }
];

// ---------- System metrics ----------

export const systemMetrics = [
  { label: 'CPU', value: 46, series: Array.from({ length: 24 }, () => intBetween(20, 80)) },
  { label: 'Memory', value: 61, series: Array.from({ length: 24 }, () => intBetween(40, 85)) },
  { label: 'Disk I/O', value: 33, series: Array.from({ length: 24 }, () => intBetween(10, 70)) },
  { label: 'Network', value: 54, series: Array.from({ length: 24 }, () => intBetween(25, 75)) }
];

export const kpiHistory = {
  requests: Array.from({ length: 12 }, (_, i) => ({ month: `M${i + 1}`, value: [620, 690, 730, 810, 940, 1020, 1100, 1210, 1290, 1420, 1510, 1630][i] })),
  blocked: Array.from({ length: 12 }, (_, i) => ({ month: `M${i + 1}`, value: [31, 38, 42, 51, 58, 64, 71, 82, 95, 101, 112, 124][i] })),
  incidents: Array.from({ length: 12 }, (_, i) => ({ month: `M${i + 1}`, value: [18, 16, 19, 14, 12, 13, 11, 9, 10, 8, 7, 6][i] }))
};