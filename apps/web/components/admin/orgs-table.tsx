import Link from 'next/link';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { platformOrganizations } from '@/lib/mock-data';

export type OrgRow = (typeof platformOrganizations)[number];

export function orgStatusTone(status: string): BadgeTone {
  switch (status) {
    case 'Active':
      return 'green';
    case 'Trial':
      return 'cyan';
    case 'Overdue':
    case 'Suspended':
      return 'rose';
    default:
      return 'slate';
  }
}

export function formatMrr(value: number) {
  return `$${value.toLocaleString()}`;
}

export function planTone(plan: string): BadgeTone {
  if (plan === 'Enterprise') return 'violet';
  if (plan === 'Growth') return 'blue';
  return 'slate';
}

export const orgColumns: Column<OrgRow>[] = [
  {
    key: 'name',
    label: 'Organization',
    render: (r) => (
      <Link href={`/admin/organizations/${r.id}`} className="font-semibold text-white transition hover:text-sentinel-300">
        {r.name}
      </Link>
    )
  },
  { key: 'plan', label: 'Plan', render: (r) => <Badge label={r.plan} tone={planTone(r.plan)} /> },
  { key: 'users', label: 'Users', sortValue: (r) => r.users, className: 'text-slate-400' },
  { key: 'systems', label: 'Systems', sortValue: (r) => r.systems, className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={orgStatusTone(r.status)} /> },
  { key: 'mrr', label: 'MRR', sortValue: (r) => r.mrr, render: (r) => <span className="font-semibold text-emerald-300">{formatMrr(r.mrr)}</span> },
  { key: 'region', label: 'Region', className: 'text-slate-400' }
];

export function OrgsTable({ title = 'Organizations', subtitle, rows = platformOrganizations }: { title?: string; subtitle?: string; rows?: OrgRow[] }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <CardBody>
        <DataTable columns={orgColumns} rows={rows} searchPlaceholder="Search organizations..." />
      </CardBody>
    </Card>
  );
}

export function totalMrr() {
  return platformOrganizations.filter((o) => o.status === 'Active').reduce((sum, o) => sum + o.mrr, 0);
}

export function activeOrgs() {
  return platformOrganizations.filter((o) => o.status === 'Active').length;
}

export function orgsByPlan() {
  const counts: Record<string, number> = {};
  for (const o of platformOrganizations) counts[o.plan] = (counts[o.plan] ?? 0) + 1;
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}