import { hashOf } from '@/components/registry/helpers';
import {
  aiSystems,
  applications,
  approvals,
  auditLogs,
  gatewayRequests,
  hourlySeries,
  incidents,
  models,
  policies,
  providers
} from '@/lib/mock-data';
import type { Approval, GatewayRequest, Incident, Policy } from '@/lib/mock-data';

export const gatewayNavItems = [
  { href: '/gateway', label: 'Overview' },
  { href: '/gateway/live', label: 'Live' },
  { href: '/gateway/requests', label: 'Requests' },
  { href: '/gateway/allowed', label: 'Allowed' },
  { href: '/gateway/blocked', label: 'Blocked' },
  { href: '/gateway/redacted', label: 'Redacted' },
  { href: '/gateway/approval-required', label: 'Approval Required' },
  { href: '/gateway/errors', label: 'Errors' },
  { href: '/gateway/applications', label: 'Applications' },
  { href: '/gateway/models', label: 'Models' },
  { href: '/gateway/providers', label: 'Providers' },
  { href: '/gateway/api-keys', label: 'API Keys' },
  { href: '/gateway/webhooks', label: 'Webhooks' },
  { href: '/gateway/logs', label: 'Logs' },
  { href: '/gateway/configuration', label: 'Configuration' }
];

export const policyNavItems = [
  { href: '/policies', label: 'Overview' },
  { href: '/policies/active', label: 'Active' },
  { href: '/policies/draft', label: 'Draft' },
  { href: '/policies/disabled', label: 'Disabled' },
  { href: '/policies/violated', label: 'Violated' },
  { href: '/policies/templates', label: 'Templates' },
  { href: '/policies/create', label: 'Create' },
  { href: '/policies/import', label: 'Import' },
  { href: '/policies/simulator', label: 'Simulator' },
  { href: '/policies/test', label: 'Test' }
];

export const incidentNavItems = [
  { href: '/incidents', label: 'Overview' },
  { href: '/incidents/open', label: 'Open' },
  { href: '/incidents/investigating', label: 'Investigating' },
  { href: '/incidents/resolved', label: 'Resolved' },
  { href: '/incidents/critical', label: 'Critical' },
  { href: '/incidents/high', label: 'High' },
  { href: '/incidents/policy-violations', label: 'Policy Violations' },
  { href: '/incidents/data-exposure', label: 'Data Exposure' },
  { href: '/incidents/ai-risk', label: 'AI Risk' },
  { href: '/incidents/create', label: 'Report Incident' }
];

export const approvalNavItems = [
  { href: '/approvals', label: 'Overview' },
  { href: '/approvals/pending', label: 'Pending' },
  { href: '/approvals/approved', label: 'Approved' },
  { href: '/approvals/denied', label: 'Denied' },
  { href: '/approvals/expired', label: 'Expired' },
  { href: '/approvals/my-approvals', label: 'My Approvals' },
  { href: '/approvals/create', label: 'New Request' }
];

export function requestNav(id: string) {
  return [
    { href: `/gateway/requests/${id}`, label: 'Overview' },
    { href: `/gateway/requests/${id}/data`, label: 'Data' },
    { href: `/gateway/requests/${id}/classification`, label: 'Classification' },
    { href: `/gateway/requests/${id}/policy`, label: 'Policy' },
    { href: `/gateway/requests/${id}/decision`, label: 'Decision' },
    { href: `/gateway/requests/${id}/provider`, label: 'Provider' },
    { href: `/gateway/requests/${id}/audit`, label: 'Audit' }
  ];
}

export function policyNav(id: string) {
  return [
    { href: `/policies/${id}`, label: 'Overview' },
    { href: `/policies/${id}/rules`, label: 'Rules' },
    { href: `/policies/${id}/conditions`, label: 'Conditions' },
    { href: `/policies/${id}/actions`, label: 'Actions' },
    { href: `/policies/${id}/scope`, label: 'Scope' },
    { href: `/policies/${id}/exceptions`, label: 'Exceptions' },
    { href: `/policies/${id}/versions`, label: 'Versions' },
    { href: `/policies/${id}/simulation`, label: 'Simulation' },
    { href: `/policies/${id}/activity`, label: 'Activity' },
    { href: `/policies/${id}/violations`, label: 'Violations' },
    { href: `/policies/${id}/settings`, label: 'Settings' },
    { href: `/policies/${id}/audit`, label: 'Audit' }
  ];
}

export function incidentNav(id: string) {
  return [
    { href: `/incidents/${id}`, label: 'Overview' },
    { href: `/incidents/${id}/timeline`, label: 'Timeline' },
    { href: `/incidents/${id}/data`, label: 'Data' },
    { href: `/incidents/${id}/evidence`, label: 'Evidence' },
    { href: `/incidents/${id}/policy`, label: 'Policy' },
    { href: `/incidents/${id}/application`, label: 'Application' },
    { href: `/incidents/${id}/ai-system`, label: 'AI System' },
    { href: `/incidents/${id}/assignments`, label: 'Assignments' },
    { href: `/incidents/${id}/actions`, label: 'Actions' },
    { href: `/incidents/${id}/comments`, label: 'Comments' },
    { href: `/incidents/${id}/resolution`, label: 'Resolution' },
    { href: `/incidents/${id}/audit`, label: 'Audit' }
  ];
}

export function approvalNav(id: string) {
  return [
    { href: `/approvals/${id}`, label: 'Overview' },
    { href: `/approvals/${id}/request`, label: 'Request' },
    { href: `/approvals/${id}/data`, label: 'Data' },
    { href: `/approvals/${id}/policy`, label: 'Policy' },
    { href: `/approvals/${id}/history`, label: 'History' },
    { href: `/approvals/${id}/audit`, label: 'Audit' }
  ];
}

export function systemById(id: string) {
  return aiSystems.find((s) => s.id === id);
}

export function systemName(id: string | null) {
  return id ? systemById(id)?.name ?? id : '—';
}

export function systemRisk(id: string) {
  return systemById(id)?.risk ?? 'Low';
}

export function appName(id: string | null) {
  return id ? applications.find((a) => a.id === id)?.name ?? id : '—';
}

export function providerName(id: string | null) {
  return id ? providers.find((p) => p.id === id)?.name ?? id : '—';
}

export function modelName(id: string | null) {
  return id ? models.find((m) => m.id === id)?.name ?? id : '—';
}

export function policyById(id: string | null) {
  return id ? policies.find((p) => p.id === id) ?? null : null;
}

export function policyName(id: string | null) {
  return policyById(id)?.name ?? '—';
}

export function requestById(id: string) {
  return gatewayRequests.find((r) => r.id === id) ?? gatewayRequests[0];
}

export function incidentById(id: string) {
  return incidents.find((i) => i.id === id) ?? incidents[0];
}

export function approvalById(id: string) {
  return approvals.find((a) => a.id === id) ?? approvals[0];
}

export function fmt(n: number) {
  return n.toLocaleString();
}

export function timeOnly(iso: string) {
  return iso.slice(11, 16);
}

export function dateOnly(iso: string) {
  return iso.slice(0, 10);
}

export function dateTime(iso: string) {
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)}`;
}

export function gatewayTotals() {
  const sum = (k: 'allowed' | 'blocked' | 'redacted' | 'pending') => hourlySeries.reduce((a, h) => a + h[k], 0);
  const blocked = sum('blocked');
  return {
    requests: sum('allowed') + blocked + sum('redacted') + sum('pending'),
    allowed: sum('allowed'),
    blocked,
    redacted: sum('redacted'),
    pending: sum('pending'),
    latency: Math.round(hourlySeries.reduce((a, h) => a + h.latency, 0) / hourlySeries.length),
    errors: gatewayRequests.filter((r) => r.latencyMs > 2500).length,
    tokens: gatewayRequests.reduce((a, r) => a + r.tokens, 0)
  };
}

export function decisionDonut() {
  const order = ['Allowed', 'Blocked', 'Redacted', 'Approval Required', 'Logged'];
  return order
    .map((d) => ({ name: d, value: gatewayRequests.filter((r) => r.decision === d).length }))
    .filter((d) => d.value > 0);
}

export interface RequestView extends GatewayRequest {
  system: string;
  app: string;
  model: string;
  provider: string;
  risk: string;
}

export function requestView(r: GatewayRequest): RequestView {
  return {
    ...r,
    system: systemName(r.systemId),
    app: appName(r.applicationId),
    model: modelName(r.modelId),
    provider: providerName(r.providerId),
    risk: systemRisk(r.systemId)
  };
}

export interface PolicyRule {
  id: string;
  name: string;
  field: string;
  operator: string;
  value: string;
  action: string;
  hits: number;
}

const ruleTemplates = [
  { field: 'data.category', operator: 'contains', value: 'PII' },
  { field: 'provider.risk', operator: 'is', value: 'High' },
  { field: 'system.environment', operator: 'is', value: 'Production' },
  { field: 'destination.region', operator: 'not in', value: 'EU' },
  { field: 'payload.size', operator: '>', value: '10 MB' },
  { field: 'model.modality', operator: 'is', value: 'Vision' },
  { field: 'request.tokens', operator: '>', value: '100k' },
  { field: 'application.status', operator: 'is', value: 'Active' }
];

export function rulesForPolicy(p: Policy): PolicyRule[] {
  const idx = Number(p.id.split('-')[1]) - 1;
  return Array.from({ length: Math.max(1, p.conditions) }, (_, i) => {
    const t = ruleTemplates[(idx + i) % ruleTemplates.length];
    return {
      id: `rule-${p.id}-${i + 1}`,
      name: `Rule ${i + 1}`,
      field: t.field,
      operator: t.operator,
      value: t.value,
      action: p.decisions[i % p.decisions.length],
      hits: Math.max(0, Math.round((p.enforcements / Math.max(1, p.conditions)) * (1 + ((idx + i) % 3) * 0.2)))
    };
  });
}

export function policyViolations(policyId: string) {
  return gatewayRequests.filter((r) => r.policyId === policyId).map(requestView);
}

export function policyStats() {
  const active = policies.filter((p) => p.status === 'Active');
  return {
    total: policies.length,
    active: active.length,
    draft: policies.filter((p) => p.status === 'Draft').length,
    disabled: policies.filter((p) => p.status === 'Disabled').length,
    violated: policies.filter((p) => p.violations > 0).length,
    enforcements: policies.reduce((a, p) => a + p.enforcements, 0),
    conditions: policies.reduce((a, p) => a + p.conditions, 0),
    violations24h: hourlySeries.reduce((a, h) => a + h.blocked, 0),
    violatedPolicies: policies.filter((p) => p.violations > 0)
  };
}

export function incidentCounts() {
  return {
    open: incidents.filter((i) => i.status === 'Open').length,
    investigating: incidents.filter((i) => i.status === 'Investigating').length,
    resolved: incidents.filter((i) => i.status === 'Resolved').length,
    critical: incidents.filter((i) => i.severity === 'Critical').length,
    high: incidents.filter((i) => i.severity === 'High').length,
    slaBreached: incidents.filter((i) => (i.status === 'Open' || i.status === 'Investigating') && i.slaHours <= 8).length,
    avgSla: Math.round(incidents.reduce((a, i) => a + i.slaHours, 0) / incidents.length)
  };
}

export function severityDonut() {
  const order = ['Critical', 'High', 'Medium', 'Low'];
  return order
    .map((s) => ({ name: s, value: incidents.filter((i) => i.severity === s).length }))
    .filter((d) => d.value > 0);
}

export function approvalCounts() {
  const decided = approvals.filter((a) => a.status === 'Approved' || a.status === 'Denied');
  const avgWindow =
    decided.length > 0
      ? decided.reduce((sum, a) => sum + (Date.parse(a.expiresAt) - Date.parse(a.requestedAt)), 0) / decided.length / 3600000
      : 0;
  const h = Math.floor(avgWindow);
  const m = Math.round((avgWindow - h) * 60);
  return {
    pending: approvals.filter((a) => a.status === 'Pending').length,
    approved: approvals.filter((a) => a.status === 'Approved').length,
    denied: approvals.filter((a) => a.status === 'Denied').length,
    expired: approvals.filter((a) => a.status === 'Expired').length,
    avgDecision: `${h}h ${m}m`,
    awaitingMe: approvals.filter((a) => a.status === 'Pending').length,
    expiring24h: approvals.filter((a) => a.status === 'Pending' && Date.parse(a.expiresAt) - Date.parse(a.requestedAt) < 86400000).length
  };
}

export function approvalStatusDonut() {
  const order = ['Pending', 'Approved', 'Denied', 'Expired'];
  return order
    .map((s) => ({ name: s, value: approvals.filter((a) => a.status === s).length }))
    .filter((d) => d.value > 0);
}

export interface TimelineItem {
  title: string;
  detail: string;
  time: string;
}

export function requestTimeline(r: GatewayRequest): TimelineItem[] {
  const base = Date.parse(r.timestamp);
  const at = (mins: number) => new Date(base + mins * 60000).toISOString();
  const v = requestView(r);
  return [
    { title: 'Request received', detail: `${v.app} → ${v.system} via ${v.model}`, time: timeOnly(r.timestamp) },
    { title: 'Identity & scope check', detail: `Actor session validated · IP ${r.ip}`, time: timeOnly(at(1)) },
    { title: 'Policy evaluation', detail: r.policyId ? `Matched ${policyName(r.policyId)}` : 'No policy matched · default decision', time: timeOnly(at(2)) },
    { title: 'Decision applied', detail: `${r.decision} · ${r.category} category`, time: timeOnly(at(3)) },
    { title: 'Response returned', detail: `${fmt(r.tokens)} tokens · ${r.latencyMs} ms`, time: timeOnly(at(4)) }
  ];
}

export function incidentTimeline(inc: Incident): TimelineItem[] {
  const base = Date.parse(inc.openedAt);
  const at = (mins: number) => new Date(base + mins * 60000).toISOString();
  const items: TimelineItem[] = [
    { title: 'Incident opened', detail: `${inc.title} · detected by gateway enforcement`, time: dateTime(inc.openedAt) },
    { title: 'Severity classified', detail: `${inc.severity} severity · ${inc.slaHours}h SLA window`, time: dateTime(at(12)) },
    { title: 'Responder assigned', detail: `Lead responder ${inc.assignee}`, time: dateTime(at(30)) },
    { title: 'Investigation started', detail: `Scope: ${systemName(inc.systemId)}`, time: dateTime(at(70)) }
  ];
  if (inc.status === 'Resolved') {
    items.push({ title: 'Incident resolved', detail: 'Remediation verified · enforcement restored', time: dateTime(at(240)) });
  }
  return items;
}

export function approvalTimeline(apr: Approval): TimelineItem[] {
  const base = Date.parse(apr.requestedAt);
  const at = (mins: number) => new Date(base + mins * 60000).toISOString();
  return [
    { title: 'Request submitted', detail: `${apr.requester} requested ${apr.type.toLowerCase()} access`, time: dateTime(apr.requestedAt) },
    { title: 'Policy evaluation', detail: apr.policyId ? `Matched ${policyName(apr.policyId)}` : 'No policy constraint · manual review', time: dateTime(at(15)) },
    { title: 'Reviewer assignment', detail: `Queued for ${apr.risk} risk review`, time: dateTime(at(40)) },
    {
      title: apr.status === 'Pending' ? 'Awaiting decision' : `Request ${apr.status.toLowerCase()}`,
      detail: apr.status === 'Pending' ? 'No decision recorded yet' : `Window closed · expires ${dateOnly(apr.expiresAt)}`,
      time: apr.status === 'Expired' ? dateTime(apr.expiresAt) : apr.status === 'Pending' ? dateTime(at(60)) : dateTime(at(90))
    }
  ];
}

const fieldMap: Record<string, string> = {
  PII: 'email, SSN, DOB, phone',
  Financial: 'account, amount, card number',
  Health: 'diagnosis, medication, provider',
  Employee: 'salary, review, title',
  Customer: 'profile, history, tier',
  Confidential: 'documents, contracts',
  Internal: 'records, metadata',
  Biometric: 'face, fingerprint',
  Location: 'gps, address',
  Public: 'public records'
};

const sensitivityMap: Record<string, string> = {
  PII: 'RESTRICTED',
  Financial: 'CONFIDENTIAL',
  Health: 'RESTRICTED',
  Employee: 'CONFIDENTIAL',
  Customer: 'INTERNAL',
  Biometric: 'RESTRICTED',
  Location: 'INTERNAL',
  Internal: 'INTERNAL',
  Confidential: 'CONFIDENTIAL',
  Public: 'PUBLIC'
};

export function sensitivityOf(category: string) {
  return sensitivityMap[category] ?? 'INTERNAL';
}

export function incidentDataRows(inc: Incident) {
  const categories = systemById(inc.systemId)?.dataCategories ?? ['PII', 'Internal'];
  return categories.map((cat, i) => ({
    id: `${inc.id}-d${i + 1}`,
    category: cat,
    fields: fieldMap[cat] ?? 'records',
    records: ((hashOf(inc.id + cat) % 480) + 12) * 100,
    sensitivity: sensitivityOf(cat),
    source: systemName(inc.systemId)
  }));
}

export function incidentEvidence(inc: Incident) {
  const base = Date.parse(inc.openedAt);
  const at = (mins: number) => new Date(base + mins * 60000).toISOString();
  return [
    { id: `${inc.id}-ev1`, title: 'Gateway request trace', type: 'Trace', source: `Gateway · ${inc.systemId}`, status: 'Captured', collectedAt: dateTime(inc.openedAt) },
    { id: `${inc.id}-ev2`, title: 'Provider response logs', type: 'Log', source: systemName(inc.systemId), status: 'Captured', collectedAt: dateTime(at(14)) },
    { id: `${inc.id}-ev3`, title: 'Policy evaluation snapshot', type: 'Policy', source: policyName(inc.policyId), status: inc.policyId ? 'Analyzed' : 'Pending', collectedAt: dateTime(at(35)) },
    { id: `${inc.id}-ev4`, title: 'Network flow capture', type: 'PCAP', source: 'Edge collector · DC-1', status: 'Pending', collectedAt: '—' }
  ];
}

export function incidentComments(inc: Incident) {
  const people = ['Jordan Patel', 'Maya Chen', 'Devon Clarke', 'Priya Raman'];
  return [
    {
      id: `${inc.id}-c1`,
      author: inc.assignee,
      time: dateTime(inc.openedAt),
      body: 'Initial triage complete. Gateway trace pulled and attached to evidence.'
    },
    {
      id: `${inc.id}-c2`,
      author: people[hashOf(inc.id) % people.length],
      time: '2026-08-13T09:15:00Z',
      body:
        inc.severity === 'Critical' || inc.severity === 'High'
          ? 'Escalating to on-call security lead. Parallel investigation is underway across affected systems.'
          : 'Monitoring enforcement metrics while investigation continues.'
    },
    {
      id: `${inc.id}-c3`,
      author: 'system',
      time: '2026-08-13T10:02:00Z',
      body: 'SLA clock running — response required before the SLA window expires.'
    }
  ];
}

export function incidentActions(inc: Incident) {
  const pool = [
    { title: 'Block provider endpoint', owner: 'Security Engineering', status: 'In Progress' },
    { title: 'Rotate affected credentials', owner: inc.assignee, status: 'Open' },
    { title: 'Tighten policy conditions', owner: 'Compliance', status: 'Open' },
    { title: 'Notify affected data subjects', owner: 'Privacy Office', status: inc.severity === 'Critical' || inc.severity === 'High' ? 'Open' : 'Done' },
    { title: 'Schedule post-incident review', owner: 'Engineering', status: 'Done' }
  ];
  return pool.map((a, i) => ({ id: `${inc.id}-a${i + 1}`, ...a }));
}

export function incidentAssignments(inc: Incident) {
  const people = ['Jordan Patel', 'Maya Chen', 'Devon Clarke', 'Priya Raman', 'Alicia Monroe', 'Tara Osei'];
  const roles = ['Lead responder', 'Policy analyst', 'Data owner', 'Communications'];
  return roles.map((role, i) => ({
    id: `${inc.id}-as${i + 1}`,
    responder: i === 0 ? inc.assignee : people[(hashOf(inc.id) + i) % people.length],
    role,
    joined: dateTime(inc.openedAt),
    status: i === 0 ? 'Active' : i === 3 ? 'Standby' : 'Active'
  }));
}

export function policyVersions(p: Policy) {
  const current = Number(p.version.replace('v', ''));
  const base = Date.parse(p.updatedAt);
  const authors = ['Amara Okafor', 'Jordan Patel', 'Maya Chen', 'Alicia Monroe'];
  return Array.from({ length: current }, (_, i) => {
    const v = i + 1;
    return {
      version: `v${v}`,
      date: new Date(base - (current - v) * 18 * 86400000).toISOString().slice(0, 10),
      author: authors[(hashOf(p.id) + v) % authors.length],
      summary:
        v === 1
          ? 'Initial policy definition'
          : v === current
            ? 'Latest revision — applied to all scoped traffic'
            : `Revision ${v} — condition and scope updates`,
      status: v === current ? 'Current' : 'Superseded'
    };
  });
}

export function policyExceptions(p: Policy) {
  const systems = aiSystems.slice(0, 4);
  return [
    { id: `${p.id}-ex1`, system: systems[0]?.name ?? '-', scope: 'Temporary migration window', reason: 'Legacy migration requires interim access', expires: '2026-08-20', grantedBy: 'Amara Okafor', active: true },
    { id: `${p.id}-ex2`, system: systems[1]?.name ?? '-', scope: 'Bulk export', reason: 'One-time analytics export approved by compliance', expires: '2026-08-16', grantedBy: 'Jordan Patel', active: true },
    { id: `${p.id}-ex3`, system: applications[3]?.name ?? '-', scope: 'Staging only', reason: 'Integration testing outside enforcement', expires: '2026-09-01', grantedBy: 'Alicia Monroe', active: false }
  ];
}

export function policyActivity(p: Policy) {
  const pool = ['policy.create', 'policy.update', 'policy.enforce', 'policy.violation'];
  const h = hashOf(p.id);
  const actors = ['amara.okafor@nexora.io', 'jordan.patel@nexora.io', 'maya.chen@nexora.io', 'system'];
  const tones = ['green', 'blue', 'amber', 'rose'];
  return Array.from({ length: 8 }, (_, i) => {
    const hour = Math.max(0, 13 - Math.floor(i * 1.7) + (h % 2));
    const action = pool[(h + i * 3) % pool.length];
    const actor = actors[(h + i) % actors.length];
    return {
      id: `evt-${p.id}-${i + 1}`,
      time: `2026-08-13 ${String(hour).padStart(2, '0')}:${String((h + i * 37) % 60).padStart(2, '0')} UTC`,
      title: action.replace('.', ' '),
      description: `${actor} triggered ${action} on ${p.name}`,
      actor,
      tone: tones[(h + i) % tones.length]
    };
  });
}

export function approvalAuditRows(apr: Approval): { id: string; timestamp: string; actor: string; action: string; resource: string; result: string; ip?: string; context?: string }[] {
  return [
    { id: `${apr.id}-a1`, timestamp: dateTime(apr.requestedAt), actor: apr.requester, action: 'approval.request', resource: `approval:${apr.id}`, result: 'Success' },
    { id: `${apr.id}-a2`, timestamp: dateTime(new Date(Date.parse(apr.requestedAt) + 15 * 60000).toISOString()), actor: 'policy.engine', action: 'approval.policy_check', resource: `approval:${apr.id}`, result: 'Success' },
    {
      id: `${apr.id}-a3`,
      timestamp: dateTime(new Date(Date.parse(apr.requestedAt) + 40 * 60000).toISOString()),
      actor: 'jordan.patel@nexora.io',
      action: apr.status === 'Pending' ? 'approval.review' : 'approval.decide',
      resource: `approval:${apr.id}`,
      result: apr.status === 'Denied' ? 'Denied' : 'Success'
    }
  ];
}

export interface ApiKeyRow {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  status: 'Active' | 'Expired' | 'Revoked';
}

export const apiKeys: ApiKeyRow[] = [
  { id: 'key-1', name: 'Production Gateway', key: 'sk_live_9f2c81a4d6b3e7f0c1a5d4b8e2a9c3f1', scopes: ['gateway.read', 'gateway.write'], created: '2026-05-12', lastUsed: '2026-08-13T09:12:00Z', status: 'Active' },
  { id: 'key-2', name: 'Payments Orchestrator', key: 'sk_live_7a1d9c0b4e8f2a3c5d6b7e1f9a0c2d4', scopes: ['gateway.read', 'gateway.write'], created: '2026-04-03', lastUsed: '2026-08-13T08:58:00Z', status: 'Active' },
  { id: 'key-3', name: 'Staging Environment', key: 'sk_test_3b8e2f1c7d4a9e0b5c6f1d8a2e4b9c7', scopes: ['gateway.read'], created: '2026-06-21', lastUsed: '2026-08-13T07:41:00Z', status: 'Active' },
  { id: 'key-4', name: 'CI Pipeline', key: 'sk_live_1c5a9e3b7d2f8c4a6e0b9d1f3a5c7e2', scopes: ['gateway.read', 'audit.read'], created: '2026-03-17', lastUsed: '2026-08-12T19:22:00Z', status: 'Active' },
  { id: 'key-5', name: 'Partner Integration', key: 'sk_live_5e8b2d7a1c4f9e3b6a0c2d8e4f7b1a3', scopes: ['gateway.read'], created: '2026-02-28', lastUsed: '2026-08-01T11:05:00Z', status: 'Revoked' },
  { id: 'key-6', name: 'Legacy Reporting', key: 'sk_live_2d7f1b5e9a3c6d0f8e2a4b7c1d9f3e5', scopes: ['audit.read'], created: '2026-01-09', lastUsed: '2026-07-20T14:33:00Z', status: 'Expired' }
];

export interface WebhookRow {
  id: string;
  name: string;
  url: string;
  events: string[];
  deliveries24h: number;
  successRate: number;
  lastDelivery: string;
  status: 'Active' | 'Paused' | 'Failed';
}

export const webhooks: WebhookRow[] = [
  { id: 'wh-1', name: 'Security Alerts', url: 'https://hooks.sentinel.dev/nexora/security', events: ['decision.blocked', 'incident.created', 'policy.violation'], deliveries24h: 482, successRate: 99.6, lastDelivery: '2026-08-13T09:10:00Z', status: 'Active' },
  { id: 'wh-2', name: 'Approval Queue', url: 'https://hooks.sentinel.dev/nexora/approvals', events: ['approval.requested', 'approval.decided'], deliveries24h: 96, successRate: 98.9, lastDelivery: '2026-08-13T08:47:00Z', status: 'Active' },
  { id: 'wh-3', name: 'SIEM Forwarder', url: 'https://hooks.example-siem.io/v1/events', events: ['gateway.request', 'audit.write'], deliveries24h: 12040, successRate: 99.2, lastDelivery: '2026-08-13T09:14:00Z', status: 'Active' },
  { id: 'wh-4', name: 'Compliance Reporter', url: 'https://hooks.sentinel.dev/nexora/compliance', events: ['policy.updated', 'system.registered'], deliveries24h: 14, successRate: 100, lastDelivery: '2026-08-12T22:00:00Z', status: 'Paused' },
  { id: 'wh-5', name: 'Legacy Slack Bot', url: 'https://hooks.slack.com/services/nexora/legacy', events: ['decision.blocked'], deliveries24h: 310, successRate: 87.4, lastDelivery: '2026-08-13T06:30:00Z', status: 'Failed' }
];

export interface GatewayLogRow {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  component: string;
  message: string;
  requestId: string | null;
}

const logPool: [GatewayLogRow['level'], string, string][] = [
  ['INFO', 'gateway', 'Request evaluated and allowed'],
  ['INFO', 'gateway', 'Response streamed back to application'],
  ['WARN', 'policy-eval', 'Policy evaluation exceeded 120ms'],
  ['ERROR', 'redaction', 'Redaction transformer retried 3 times'],
  ['INFO', 'auth', 'Actor session refreshed'],
  ['WARN', 'gateway', 'Latency p99 spike observed'],
  ['INFO', 'policy-eval', 'No policy matched — default decision applied'],
  ['ERROR', 'gateway', 'Upstream provider timeout after 2.8s'],
  ['INFO', 'audit', 'Audit record written'],
  ['INFO', 'redaction', 'Fields redacted before transmission'],
  ['WARN', 'gateway', 'Token budget approaching limit'],
  ['INFO', 'auth', 'Scoped token validated']
];

export const gatewayLogs: GatewayLogRow[] = Array.from({ length: 16 }, (_, i) => {
  const h = hashOf(`glog-${i}`);
  const [level, component, message] = logPool[(h + i * 3) % logPool.length];
  return {
    id: `glog-${i + 1}`,
    timestamp: `2026-08-13T${String((h + i) % 24).padStart(2, '0')}:${String((h + i * 7) % 60).padStart(2, '0')}:${String((h + i * 13) % 60).padStart(2, '0')}Z`,
    level,
    component,
    message,
    requestId: (h + i) % 2 === 0 ? `req-${10000 + ((h + i * 5) % 40)}` : null
  };
});

export interface PolicyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  rules: number;
  decision: string;
  uses: number;
}

export const policyTemplates: PolicyTemplate[] = [
  { id: 'tpl-1', name: 'Block PII Exfiltration', description: 'Block any request containing PII to providers not approved for sensitive data.', category: 'Data protection', rules: 4, decision: 'Block', uses: 128 },
  { id: 'tpl-2', name: 'GDPR Data Residency', description: 'Enforce EU data residency for health and employee data flows.', category: 'Compliance', rules: 3, decision: 'Block', uses: 74 },
  { id: 'tpl-3', name: 'High-Risk System Approval', description: 'Require human approval for any request to High or Critical risk systems.', category: 'Governance', rules: 2, decision: 'Require Approval', uses: 96 },
  { id: 'tpl-4', name: 'Sensitive Data Redaction', description: 'Redact financial and biometric identifiers before external transmission.', category: 'Redaction', rules: 3, decision: 'Redact', uses: 61 },
  { id: 'tpl-5', name: 'Prompt Injection Guard', description: 'Block requests flagged for prompt-injection patterns targeting system context.', category: 'Security', rules: 3, decision: 'Block', uses: 52 },
  { id: 'tpl-6', name: 'Rate Limit Self-Hosted Inference', description: 'Cap daily inference volume on the self-hosted model cluster.', category: 'Operations', rules: 2, decision: 'Block', uses: 38 }
];

export function auditRowsFor(entityId: string, entityLabel: string) {
  const pool = ['policy.update', 'policy.enforce', 'approval.decide', 'incident.create', 'settings.update', 'audit.export'];
  const actors = ['amara.okafor@nexora.io', 'jordan.patel@nexora.io', 'maya.chen@nexora.io', 'system', 'devon.clarke@nexora.io'];
  const h = hashOf(entityId);
  return Array.from({ length: 8 }, (_, i) => {
    const hour = Math.max(0, 13 - Math.floor(i * 1.7) + (h % 2));
    return {
      id: `aud-${entityId}-${i + 1}`,
      timestamp: `2026-08-13T${String(hour).padStart(2, '0')}:${String((h + i * 37) % 60).padStart(2, '0')}:${String((h + i * 11) % 60).padStart(2, '0')}Z`,
      actor: actors[(h + i) % actors.length],
      action: pool[(h + i * 3) % pool.length],
      resource: `${entityLabel}:${entityId}`,
      result: (['Success', 'Success', 'Success', 'Denied', 'Error'] as const)[(h + i) % 5],
      ip: ['10.0.4.22', '10.0.7.91', '10.2.1.14', '10.2.9.63', '172.16.8.4'][(h + i) % 5],
      context: ['web-console', 'api', 'gateway', 'cli', 'webhook'][(h + i) % 5]
    };
  });
}

export { auditLogs };
