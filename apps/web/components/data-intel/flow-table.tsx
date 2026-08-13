import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { fmt, fmtTime, toneForCategory, type FlowRow } from './derived';

export function decisionTone(decision: string) {
  return decision === 'Block' ? 'rose' : decision === 'Redact' ? 'amber' : decision === 'Require Approval' ? 'violet' : decision === 'Log' ? 'slate' : 'green';
}

export function riskTone(risk: string) {
  return risk === 'Critical' ? 'red' : risk === 'High' ? 'rose' : risk === 'Medium' ? 'amber' : 'blue';
}

export function statusTone(status: string) {
  return status === 'Active' ? 'green' : status === 'Review' ? 'amber' : 'rose';
}

export function flowColumns(): Column<FlowRow>[] {
  return [
    {
      key: 'id',
      label: 'Flow',
      render: (r) => (
        <Link href={`/data-flows/${r.id}`} className="group inline-flex items-center gap-2">
          <span className="max-w-[170px] truncate font-medium text-white transition group-hover:text-sentinel-300">{r.source}</span>
          <ArrowRight className="h-3 w-3 shrink-0 text-slate-500" />
          <span className="max-w-[170px] truncate text-slate-400">{r.destination}</span>
        </Link>
      ),
      sortValue: (r) => r.source
    },
    {
      key: 'category',
      label: 'Category',
      render: (r) => <Badge label={r.category} tone={toneForCategory(r.category)} />
    },
    {
      key: 'decision',
      label: 'Decision',
      render: (r) => <Badge label={r.decision} tone={decisionTone(r.decision)} />
    },
    {
      key: 'status',
      label: 'Status',
      render: (r) => <Badge label={r.status} tone={statusTone(r.status)} />
    },
    {
      key: 'risk',
      label: 'Risk',
      render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} />
    },
    {
      key: 'volumeMb',
      label: 'Volume',
      render: (r) => <span className="text-slate-300">{fmt(r.volumeMb)} MB</span>,
      sortValue: (r) => r.volumeMb
    },
    {
      key: 'timestamp',
      label: 'Last active',
      render: (r) => <span className="whitespace-nowrap text-slate-400">{fmtTime(r.timestamp)}</span>,
      sortValue: (r) => r.timestamp
    }
  ];
}

export function FlowTable({
  flows,
  pageSize = 8,
  initialSort
}: {
  flows: FlowRow[];
  pageSize?: number;
  initialSort?: { key: string; dir: 'asc' | 'desc' };
}) {
  return (
    <DataTable
      columns={flowColumns()}
      rows={flows}
      pageSize={pageSize}
      initialSort={initialSort}
      searchPlaceholder="Search flows by source, destination or category..."
    />
  );
}