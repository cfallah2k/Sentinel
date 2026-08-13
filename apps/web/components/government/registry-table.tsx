import Link from 'next/link';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { dailySeries, governmentRegistry } from '@/lib/mock-data';

export type RegistryRow = (typeof governmentRegistry)[number];

export function riskTone(risk: string): BadgeTone {
  if (risk === 'Critical') return 'rose';
  if (risk === 'High') return 'red';
  if (risk === 'Medium') return 'amber';
  return 'green';
}

export function severityTone(severity: string): BadgeTone {
  if (severity === 'Critical') return 'rose';
  if (severity === 'High') return 'red';
  if (severity === 'Medium') return 'amber';
  return 'blue';
}

export function registryTone(status: string): BadgeTone {
  switch (status) {
    case 'Registered':
      return 'green';
    case 'Pending':
      return 'amber';
    case 'Restricted':
      return 'rose';
    case 'Review Required':
      return 'red';
    default:
      return 'slate';
  }
}

export const registryColumns: Column<RegistryRow>[] = [
  {
    key: 'name',
    label: 'System',
    render: (r) => (
      <Link href={`/government/ai-registry/${r.id}`} className="font-semibold text-white transition hover:text-sentinel-300">
        {r.name}
      </Link>
    )
  },
  { key: 'operator', label: 'Operator', className: 'text-slate-400' },
  { key: 'purpose', label: 'Category', className: 'text-slate-400' },
  { key: 'risk', label: 'Risk Tier', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={registryTone(r.status)} /> },
  { key: 'approvedAt', label: 'Date', sortValue: (r) => r.approvedAt, className: 'text-slate-400' }
];

export function RegistryTable({
  title = 'AI Registry',
  subtitle,
  rows = governmentRegistry
}: {
  title?: string;
  subtitle?: string;
  rows?: RegistryRow[];
}) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <CardBody>
        <DataTable columns={registryColumns} rows={rows} searchPlaceholder="Search registry..." initialSort={{ key: 'approvedAt', dir: 'desc' }} />
      </CardBody>
    </Card>
  );
}

export function registryStatusDistribution() {
  const counts: Record<string, number> = {};
  for (const r of governmentRegistry) counts[r.status] = (counts[r.status] ?? 0) + 1;
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function registrationsOver30d() {
  return dailySeries.map((d) => ({ date: d.date, registrations: Math.round(d.requests / 1500) }));
}