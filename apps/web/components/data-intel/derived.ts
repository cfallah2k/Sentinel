import type { BadgeTone } from '@/components/ui/badge';
import {
  aiSystems,
  applications,
  auditLogs,
  classificationCategories,
  complianceFrameworks,
  dataFlows,
  dataSources,
  gatewayRequests,
  models,
  policies,
  providers,
  riskFindings,
  sensitiveCategories
} from '@/lib/mock-data';

export function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export function fmtTime(ts: string): string {
  return ts.length >= 16 ? `${ts.slice(5, 10)} ${ts.slice(11, 16)}` : ts;
}

const catTones: Record<string, BadgeTone> = {
  PII: 'rose',
  Financial: 'amber',
  Health: 'green',
  Employee: 'violet',
  Customer: 'cyan',
  Internal: 'slate',
  Confidential: 'amber',
  Public: 'blue'
};

export function toneForCategory(cat: string): BadgeTone {
  return catTones[cat] ?? 'slate';
}

export type FlowRow = {
  id: string;
  systemId: string;
  applicationId: string;
  providerId: string;
  source: string;
  destination: string;
  applicationName: string;
  systemName: string;
  providerName: string;
  providerType: string;
  category: string;
  decision: string;
  status: string;
  risk: string;
  timestamp: string;
  volumeMb: number;
};

export const enrichedFlows: FlowRow[] = dataFlows.map((f) => {
  const app = applications.find((a) => a.id === f.applicationId);
  const sys = aiSystems.find((s) => s.id === f.systemId);
  const prv = providers.find((p) => p.id === f.providerId);
  return {
    id: f.id,
    systemId: f.systemId,
    applicationId: f.applicationId,
    providerId: f.providerId,
    source: f.source,
    destination: sys?.name ?? 'Unregistered system',
    applicationName: app?.name ?? 'Unregistered app',
    systemName: sys?.name ?? 'Unregistered system',
    providerName: prv?.name ?? 'Unregistered provider',
    providerType: prv?.type ?? 'External',
    category: f.category,
    decision: f.decision,
    status: f.status,
    risk: f.risk,
    timestamp: f.timestamp,
    volumeMb: f.volumeMb
  };
});

export function resolveFlow(id: string): FlowRow {
  return enrichedFlows.find((f) => f.id === id) ?? enrichedFlows[0];
}

export function findSource(name: string) {
  return dataSources.find((s) => s.name === name);
}

export function flowLatency(flow: FlowRow): number {
  return ((parseInt(flow.id.slice(4), 10) * 37) % 800) + 120;
}

export function flowRecords(flow: FlowRow): number {
  return findSource(flow.source)?.records ?? flow.volumeMb * 1200;
}

export function riskScoreValue(risk: string): number {
  return risk === 'Critical' ? 92 : risk === 'High' ? 76 : risk === 'Medium' ? 52 : 24;
}

export function riskBarColor(risk: string): string {
  return risk === 'Critical' ? 'bg-rose-500' : risk === 'High' ? 'bg-amber-400' : risk === 'Medium' ? 'bg-sky-400' : 'bg-emerald-400';
}

export type EventItem = { time: string; title: string; detail: string; tone?: 'green' | 'amber' | 'rose' | 'sky' };

export function flowEvents(flow: FlowRow): EventItem[] {
  return [
    { time: '2026-08-13 08:00', title: 'Route registered', detail: `${flow.source} → ${flow.destination}`, tone: 'sky' },
    { time: '2026-08-13 08:12', title: 'Policy evaluated', detail: `${flow.decision} decision applied by gateway`, tone: 'green' },
    { time: '2026-08-13 09:00', title: 'Volume checkpoint', detail: `${fmt(flow.volumeMb)} MB transferred`, tone: 'sky' },
    { time: flow.timestamp, title: 'Last activity', detail: `Category ${flow.category} · risk ${flow.risk}`, tone: 'amber' },
    { time: '2026-08-14 00:00', title: 'Next review', detail: 'Scheduled classification review', tone: 'sky' }
  ];
}

const categoryPolicyMap: Record<string, string[]> = {
  PII: ['pol-1', 'pol-7'],
  Financial: ['pol-2', 'pol-3'],
  Health: ['pol-5'],
  Employee: ['pol-10', 'pol-4'],
  Customer: ['pol-7', 'pol-4'],
  Internal: ['pol-4'],
  Confidential: ['pol-3', 'pol-4'],
  Public: ['pol-4']
};

export function policyMatches(flow: FlowRow) {
  const ids = categoryPolicyMap[flow.category] ?? ['pol-4'];
  return policies.filter((p) => ids.includes(p.id));
}

export function groupFlows(flows: FlowRow[], key: 'source' | 'destination') {
  const map = new Map<string, FlowRow[]>();
  flows.forEach((f) => {
    const k = f[key];
    map.set(k, [...(map.get(k) ?? []), f]);
  });
  return [...map.entries()].map(([name, rows]) => ({
    name,
    count: rows.length,
    volumeMb: rows.reduce((a, r) => a + r.volumeMb, 0),
    blocked: rows.filter((r) => r.status === 'Blocked').length,
    categories: [...new Set(rows.map((r) => r.category))],
    risk: rows.some((r) => r.risk === 'Critical' || r.risk === 'High') ? 'High' : 'Low'
  }));
}

export const flowNavItems = [
  { label: 'Overview', href: '/data-flows/overview' },
  { label: 'Live', href: '/data-flows/live' },
  { label: 'Map', href: '/data-flows/map' },
  { label: 'Sources', href: '/data-flows/sources' },
  { label: 'Destinations', href: '/data-flows/destinations' },
  { label: 'External', href: '/data-flows/external' },
  { label: 'Internal', href: '/data-flows/internal' },
  { label: 'High risk', href: '/data-flows/high-risk' },
  { label: 'Blocked', href: '/data-flows/blocked' },
  { label: 'Recent', href: '/data-flows/recent' }
];

export type Passport = {
  id: string;
  systemId: string;
  providerId: string;
  modelId: string;
  name: string;
  type: string;
  version: string;
  purpose: string;
  owner: string;
  status: 'Certified' | 'Pending Review' | 'Draft' | 'Expired';
  risk: string;
  environment: string;
  oversight: string;
  dataTypes: string[];
  retention: string;
  certifications: string[];
  complianceScore: number;
  providerName: string;
  modelName: string;
  approvedAt: string;
  lastActivity: string;
  requests24h: number;
  blocked24h: number;
  redacted24h: number;
};

const certPool = ['SOC 2 Type II', 'ISO/IEC 27001', 'EU AI Act Tier 2', 'GDPR Readiness', 'HIPAA Controls'];
const retentionPool = ['90 days', '12 months', '24 months', '36 months', '7 years'];

export const passports: Passport[] = aiSystems.map((s, i) => {
  const prv = providers.find((p) => p.id === s.providerId);
  const mdl = models.find((m) => m.id === s.modelId);
  return {
    id: `psp-${i + 1}`,
    systemId: s.id,
    providerId: s.providerId,
    modelId: s.modelId,
    name: s.name,
    type: s.type,
    version: `v${1 + (i % 3)}.${(i * 3) % 10}`,
    purpose: s.purpose,
    owner: s.owner,
    status: s.status === 'Approved' ? 'Certified' : s.status === 'Pending' ? 'Pending Review' : s.status === 'Registered' ? 'Draft' : 'Expired',
    risk: s.risk,
    environment: s.environment,
    oversight: s.oversight,
    dataTypes: s.dataCategories,
    retention: retentionPool[(i * 5) % retentionPool.length],
    certifications: [certPool[i % certPool.length], certPool[(i + 2) % certPool.length]],
    complianceScore: (s.risk === 'Low' ? 92 : s.risk === 'Medium' ? 76 : s.risk === 'High' ? 58 : 42) - (i % 3),
    providerName: prv?.name ?? '—',
    modelName: mdl?.name ?? '—',
    approvedAt: s.approvedAt,
    lastActivity: s.lastActivity,
    requests24h: s.requests24h,
    blocked24h: s.blocked24h,
    redacted24h: s.redacted24h
  };
});

export function resolvePassport(id: string): Passport {
  return passports.find((p) => p.id === id) ?? passports[0];
}

const sensitivityOf: Record<string, number> = {
  PUBLIC: 1,
  INTERNAL: 2,
  CONFIDENTIAL: 3,
  RESTRICTED: 4,
  PII: 4,
  Financial: 3,
  Health: 4,
  Biometric: 4,
  Location: 2,
  Employee: 3,
  Customer: 3
};

export function sensitivityLabel(level: number): string {
  return level >= 4 ? 'Restricted' : level === 3 ? 'Confidential' : level === 2 ? 'Internal' : 'Public';
}

export function dataInventory(p: Passport) {
  return p.dataTypes.map((c) => ({
    category: c,
    sensitivity: sensitivityOf[c] ?? 2,
    purpose: c === 'Health' || c === 'Biometric' ? 'Processing' : 'Inference',
    storage: p.environment === 'Production' ? 'US-East (Virginia)' : 'EU-West (Dublin)',
    retention: p.retention
  }));
}

export function passportControls(p: Passport) {
  return [
    { id: 'pc-1', name: 'Access control & least privilege', status: p.risk === 'High' || p.risk === 'Critical' ? 'Partially Implemented' : 'Implemented', evidence: 4 + (p.complianceScore % 6) },
    { id: 'pc-2', name: 'Input filtering & prompt injection defense', status: 'Implemented', evidence: 3 + (p.complianceScore % 4) },
    { id: 'pc-3', name: 'Data retention & deletion schedules', status: p.dataTypes.includes('Health') || p.dataTypes.includes('PII') ? 'Implemented' : 'In Review', evidence: 2 + (p.complianceScore % 3) },
    { id: 'pc-4', name: 'Output monitoring & redaction', status: p.risk === 'Critical' ? 'At Risk' : 'Implemented', evidence: 4 + (p.complianceScore % 5) },
    { id: 'pc-5', name: 'Human oversight & escalation', status: p.oversight === 'Human' ? 'Implemented' : 'Partially Implemented', evidence: 3 + (p.complianceScore % 3) }
  ];
}

export function passportEvents(p: Passport): EventItem[] {
  return [
    { time: p.approvedAt, title: 'Passport issued', detail: `Registered by ${p.owner} · ${p.version}`, tone: 'green' },
    { time: '2026-08-01', title: 'Annual certification', detail: p.certifications.join(' · '), tone: 'green' },
    { time: p.lastActivity, title: 'Gateway activity', detail: `${fmt(p.requests24h)} requests in the last 24h`, tone: 'sky' },
    { time: '2026-09-30', title: 'Scheduled review', detail: 'Renewal and risk reassessment due', tone: 'amber' }
  ];
}

export const passportNavItems = [
  { label: 'Overview', href: '/ai-passports/overview' },
  { label: 'All', href: '/ai-passports/all' },
  { label: 'Approved', href: '/ai-passports/approved' },
  { label: 'Pending', href: '/ai-passports/pending' },
  { label: 'High risk', href: '/ai-passports/high-risk' },
  { label: 'Create', href: '/ai-passports/create' },
  { label: 'Import', href: '/ai-passports/import' }
];

export function modelForPassport(p: Passport) {
  return models.find((m) => m.id === p.modelId);
}

export function providerForPassport(p: Passport) {
  return providers.find((pr) => pr.id === p.providerId);
}

export type ClassRow = {
  id: string;
  name: string;
  description: string;
  color: string;
  sensitivity: number;
  systems: number;
  coverage: number;
  matched24h: number;
  blocked24h: number;
};

export const classRows: ClassRow[] = classificationCategories.map((c, i) => ({
  id: c.name.toLowerCase(),
  name: c.name,
  description: c.description,
  color: c.color,
  sensitivity: c.sensitivity,
  systems: c.systems,
  coverage: [94, 81, 66, 47][i],
  matched24h: [4821, 3390, 1488, 517][i],
  blocked24h: [214, 176, 77, 43][i]
}));

export function resolveClass(id: string): ClassRow {
  return classRows.find((c) => c.id === id.toLowerCase()) ?? classRows[0];
}

export function catBarColor(color: string): string {
  return color === 'emerald' ? 'bg-emerald-400' : color === 'sky' ? 'bg-sky-400' : color === 'amber' ? 'bg-amber-400' : 'bg-rose-400';
}

export function catBadgeTone(color: string): BadgeTone {
  return color === 'emerald' ? 'green' : color === 'sky' ? 'blue' : color === 'amber' ? 'amber' : 'rose';
}

export const classifierRules = classRows.map((c, i) => ({
  id: `rule-${i + 1}`,
  name: `${c.name} handling rule`,
  category: c.name,
  detector: sensitiveCategories[i % sensitiveCategories.length].detector,
  action: i % 2 === 0 ? 'Block' : 'Redact',
  scope: `${c.systems} systems`,
  status: i === 3 ? 'Review' : 'Active',
  enforcements: c.matched24h * 6
}));

export const detectorRows = sensitiveCategories.map((s, i) => ({
  id: s.detector,
  name: s.name,
  detector: s.detector,
  matches24h: s.matches24h,
  blocked24h: s.blocked24h,
  blockRate: Math.round((s.blocked24h / s.matches24h) * 100),
  status: i < 6 ? 'Active' : 'Review',
  accuracy: 97 - i
}));

export const customRows = [
  { id: 'cst-1', name: 'Source Code', detector: 'code-detector', sensitivity: 2, matches24h: 421, blocked24h: 18, status: 'Active' },
  { id: 'cst-2', name: 'Board Materials', detector: 'board-detector', sensitivity: 4, matches24h: 12, blocked24h: 3, status: 'Active' },
  { id: 'cst-3', name: 'Credentials & Keys', detector: 'secret-detector', sensitivity: 5, matches24h: 88, blocked24h: 41, status: 'Review' },
  { id: 'cst-4', name: 'Legal Records', detector: 'legal-detector', sensitivity: 3, matches24h: 156, blocked24h: 12, status: 'Active' }
];

export const testResults = sensitiveCategories.slice(0, 6).map((s, i) => ({
  id: s.detector,
  detector: s.detector,
  sample: ['customer@example.com', 'IBAN FR76 3000 6020 5815 8456', 'SSN 123-45-6789', 'Blood type O+', '48.85 N, 2.35 E', 'Salary band P5'][i],
  result: i % 3 === 0 ? 'Clean' : 'Detected',
  confidence: 92 - i * 5
}));

export function classEvents(c: ClassRow): EventItem[] {
  return [
    { time: '2026-08-13', title: 'Detector sweep', detail: `${fmt(c.matched24h)} matches in the last 24h`, tone: 'sky' },
    { time: '2026-08-12', title: 'Policy re-evaluation', detail: `${fmt(c.blocked24h)} transmissions blocked`, tone: 'amber' },
    { time: '2026-08-09', title: 'Coverage scan', detail: `${c.systems} systems tagged ${c.name}`, tone: 'green' },
    { time: '2026-07-30', title: 'Taxonomy sync', detail: 'Labels propagated to gateway', tone: 'sky' }
  ];
}

export const classificationNavItems = [
  { label: 'Overview', href: '/data-classification/overview' },
  { label: 'Categories', href: '/data-classification/categories' },
  { label: 'Types', href: '/data-classification/types' },
  { label: 'Sensitive Data', href: '/data-classification/sensitive-data' },
  { label: 'Detectors', href: '/data-classification/detectors' },
  { label: 'Rules', href: '/data-classification/rules' },
  { label: 'Custom', href: '/data-classification/custom' },
  { label: 'Create', href: '/data-classification/create' },
  { label: 'Test', href: '/data-classification/test' }
];

export function flowAuditRows(flow: FlowRow) {
  const mine = auditLogs.filter((l) => l.resource.includes(flow.systemId));
  const base = mine.length > 0 ? mine : auditLogs.slice(0, 6);
  return base.map((l) => ({
    id: l.id,
    timestamp: l.timestamp,
    actor: l.actor,
    action: l.action,
    resource: l.resource,
    result: l.result,
    ip: l.ip,
    context: l.context
  }));
}

export function systemGatewayRows(flow: FlowRow) {
  return gatewayRequests.filter((r) => r.systemId === flow.systemId).slice(0, 8).map((r) => ({
    id: r.id,
    timestamp: r.timestamp,
    model: models.find((m) => m.id === r.modelId)?.name ?? r.modelId,
    category: r.category,
    decision: r.decision,
    latencyMs: r.latencyMs,
    tokens: r.tokens,
    policyId: r.policyId ?? '—'
  }));
}

export function passportAuditRows(p: Passport) {
  const mine = auditLogs.filter((l) => l.resource.includes(p.systemId));
  const base = mine.length > 0 ? mine : auditLogs.slice(2, 8);
  return base.map((l) => ({
    id: l.id,
    timestamp: l.timestamp,
    actor: l.actor,
    action: l.action,
    resource: l.resource,
    result: l.result,
    ip: l.ip
  }));
}

export function approvalRows(p: Passport) {
  return [
    { id: 'apr-881', requester: p.owner, type: 'High-Risk Request', status: 'Pending', risk: p.risk, note: 'One-time bulk enrichment for migration project' },
    { id: 'apr-878', requester: 'Sam Whitfield', type: 'Data Access', status: 'Approved', risk: 'Medium', note: 'Read access to board materials' },
    { id: 'apr-877', requester: 'Maya Chen', type: 'Provider Access', status: 'Approved', risk: 'Medium', note: 'Enable Mistral endpoint for prototyping' }
  ];
}

export const frameworkRows = complianceFrameworks.map((f) => ({
  id: f.id,
  name: f.name,
  standard: f.standard,
  progress: f.progress,
  controls: f.controls,
  passed: f.passed,
  failed: f.failed,
  gaps: f.gaps,
  status: f.status,
  nextAudit: f.nextAudit
}));

export function findingsForSystem(systemId: string) {
  return riskFindings.filter((f) => {
    const assessment = ['ras-51', 'ras-50', 'ras-49', 'ras-48', 'ras-47', 'ras-46'];
    const map: Record<string, string> = { 'sys-2': 'ras-51', 'sys-3': 'ras-50', 'sys-6': 'ras-49', 'sys-1': 'ras-48', 'sys-4': 'ras-47', 'sys-8': 'ras-46' };
    return map[systemId] === f.assessmentId;
  });
}
