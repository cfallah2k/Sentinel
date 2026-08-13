import {
  aiSystems,
  applications,
  providers,
  models,
  dataSources,
  dailySeries,
  riskAssessments,
  riskFindings
} from '@/lib/mock-data';
import type { RiskAssessment } from '@/lib/mock-data';

export const riskNavItems = [
  { href: '/risk', label: 'Overview' },
  { href: '/risk/ai-systems', label: 'AI Systems' },
  { href: '/risk/applications', label: 'Applications' },
  { href: '/risk/providers', label: 'Providers' },
  { href: '/risk/models', label: 'Models' },
  { href: '/risk/data', label: 'Data' },
  { href: '/risk/data-flows', label: 'Data Flows' },
  { href: '/risk/policies', label: 'Policies' },
  { href: '/risk/incidents', label: 'Incidents' },
  { href: '/risk/high-risk', label: 'High Risk' },
  { href: '/risk/assessments', label: 'Assessments' }
];

export function systemById(id: string) {
  return aiSystems.find((s) => s.id === id);
}

export function systemName(id: string) {
  return systemById(id)?.name ?? id;
}

export function systemMeta(id: string) {
  const s = systemById(id);
  return { name: s?.name ?? id, type: s?.type ?? '—', risk: s?.risk ?? 'Low' };
}

export function appName(id: string) {
  return applications.find((a) => a.id === id)?.name ?? id;
}

export function providerName(id: string) {
  return providers.find((p) => p.id === id)?.name ?? id;
}

export function modelName(id: string) {
  return models.find((m) => m.id === id)?.name ?? id;
}

export function sourceName(id: string) {
  return dataSources.find((d) => d.id === id)?.name ?? id;
}

export function assessmentById(id: string) {
  return riskAssessments.find((a) => a.id === id);
}

export function findingsForAssessment(id: string) {
  return riskFindings.filter((f) => f.assessmentId === id);
}

export function findingsForSystem(systemId: string) {
  const ids = riskAssessments.filter((a) => a.systemId === systemId).map((a) => a.id);
  return riskFindings.filter((f) => ids.includes(f.assessmentId));
}

export function openFindingsCount() {
  return riskFindings.filter((f) => f.status !== 'Resolved').length;
}

export function criticalFindingsCount() {
  return riskFindings.filter((f) => f.severity === 'Critical').length;
}

export function highRiskSystemsCount() {
  return aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical').length;
}

export function avgResidualRisk() {
  const scored = riskAssessments.filter((a) => a.score > 0);
  return scored.length ? Math.round(scored.reduce((sum, a) => sum + a.score, 0) / scored.length) : 0;
}

export function riskTrendData() {
  return dailySeries.map((d) => ({ date: d.date, score: d.riskScore, incidents: d.incidents }));
}

export function riskDonutData() {
  const order = ['Critical', 'High', 'Medium', 'Low'] as const;
  return order
    .map((level) => ({ name: level, value: aiSystems.filter((s) => s.risk === level).length }))
    .filter((d) => d.value > 0);
}

export function assessmentProgress(a: RiskAssessment): number {
  if (a.completedAt) return 100;
  const start = new Date(a.startedAt).getTime();
  const now = new Date('2026-08-13').getTime();
  const days = Math.max(1, (now - start) / 86400000);
  return Math.min(90, Math.round(20 + days * 6));
}

export function hashOf(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) % 100000;
  return h;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  answer: 'Yes' | 'No' | 'Partial';
  note: string;
}

const questionPool: { category: string; question: string }[] = [
  { category: 'Inventory & Governance', question: 'Is the system registered in the AI inventory with a named owner?' },
  { category: 'Data Handling', question: 'Are data classification labels applied to all inputs and outputs?' },
  { category: 'Data Handling', question: 'Is data residency and transfer policy enforced for this system?' },
  { category: 'Access Control', question: 'Is access to the model restricted to approved roles and services?' },
  { category: 'Security', question: 'Are prompt injection defenses tested and documented?' },
  { category: 'Security', question: 'Are model outputs validated and monitored for sensitive data?' },
  { category: 'Privacy', question: 'Is there a documented retention policy for prompts and outputs?' },
  { category: 'Vendor', question: 'Are provider subprocessors reviewed and approved?' },
  { category: 'Resilience', question: 'Does the system have a tested failover and recovery plan?' },
  { category: 'Auditability', question: 'Are all requests logged with correlation IDs for audit?' }
];

export function questionsForAssessment(id: string): AssessmentQuestion[] {
  const seed = hashOf(id);
  const notes = {
    Yes: 'Documented and enforced in current operating procedures.',
    Partial: 'Partially covered; remaining scope tracked in remediation plan.',
    No: 'No evidence found; flagged for follow-up assessment.'
  } as const;
  return questionPool.map((q, i) => {
    const v = (seed + i * 7) % 9;
    const answer = v < 4 ? 'Yes' : v < 7 ? 'Partial' : 'No';
    return { id: `q-${i + 1}`, category: q.category, question: q.question, answer, note: notes[answer] };
  });
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: string;
  uploadedBy: string;
  date: string;
  status: string;
}

const evidenceTypes = ['Policy', 'Report', 'Configuration', 'Screenshot', 'Document', 'Export'];
const evidenceTitles = [
  'System architecture diagram',
  'Data flow inventory extract',
  'Access review attestation',
  'Monitoring configuration export',
  'Incident response runbook',
  'Vendor due diligence report'
];

export function evidenceForAssessment(id: string): EvidenceItem[] {
  const seed = hashOf(id);
  return evidenceTitles.map((title, i) => ({
    id: `aev-${seed % 900 + i + 1}`,
    title,
    type: evidenceTypes[(seed + i) % evidenceTypes.length],
    uploadedBy: i % 2 === 0 ? 'Amara Okafor' : 'Alicia Monroe',
    date: `2026-0${(seed % 7) + 1}-${String((seed * (i + 3)) % 26 + 1).padStart(2, '0')}`,
    status: (seed + i) % 4 === 0 ? 'Needs Review' : 'Valid'
  }));
}