import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { gatewayRequests, policies } from '@/lib/mock-data';
import { statusTone } from './sections';

export type PolicyRow = (typeof policies)[number];
export type RequestRow = (typeof gatewayRequests)[number];

export const policyNav = [
  { href: 'overview', label: 'Overview' },
  { href: 'rules', label: 'Rules' },
  { href: 'scope', label: 'Scope' },
  { href: 'exceptions', label: 'Exceptions' },
  { href: 'versions', label: 'Versions' },
  { href: 'violations', label: 'Violations' },
  { href: 'audit', label: 'Audit' }
];

export function findPolicy(id: string) {
  return policies.find((p) => p.id === id) ?? policies[0];
}

export function policyVersionHistory(policy: PolicyRow) {
  const current = Number(policy.version.replace('v', ''));
  return Array.from({ length: current }, (_, i) => ({
    version: `v${i + 1}`,
    published: `2026-0${(i % 6) + 1}-${String(10 + i).padStart(2, '0')}`,
    changes: i === current - 1 ? 'Current revision' : ['Policy wording', 'Decision matrix update', 'Scope expansion', 'Condition tuning', 'Clarification pass'][i % 5]
  }));
}

export const requestColumns: Column<RequestRow>[] = [
  { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-sky-300">{r.id}</span> },
  { key: 'timestamp', label: 'Timestamp', className: 'font-mono text-slate-400' },
  { key: 'decision', label: 'Decision', render: (r) => <Badge label={r.decision} tone={statusTone(r.decision)} /> },
  { key: 'category', label: 'Category', className: 'text-slate-400' },
  { key: 'latencyMs', label: 'Latency', className: 'text-slate-400' },
  { key: 'tokens', label: 'Tokens', className: 'text-slate-400' }
];

export function ViolationsTable({ rows }: { rows: RequestRow[] }) {
  return (
    <Card>
      <CardHeader title="Enforcement Log" subtitle="Gateway requests matched against this policy" />
      <CardBody>
        <DataTable columns={requestColumns} rows={rows} searchPlaceholder="Search enforcement log..." />
      </CardBody>
    </Card>
  );
}

export function violationsForPolicy(policyId: string) {
  const all = gatewayRequests.filter((r) => r.policyId === policyId);
  return all.length ? all : gatewayRequests.filter((r) => r.decision === 'Blocked' || r.decision === 'Redacted').slice(0, 6);
}