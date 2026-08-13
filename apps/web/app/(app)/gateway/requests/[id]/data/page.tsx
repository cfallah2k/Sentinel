import { Database, HardDrive, ShieldOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge, SeverityBadge } from '@/components/enforcement/badges';
import { fmt, requestById, requestNav, requestView, sensitivityOf } from '@/components/enforcement/helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const v = requestView(req);
  const redacted = req.decision === 'Redacted';

  const payloadRows = [
    { field: 'system_prompt', size: '2.4 KB', sensitivity: 'INTERNAL', redacted: false },
    { field: 'user_context', size: '18.1 KB', sensitivity: sensitivityOf(req.category), redacted },
    { field: 'attached_documents', size: '0 KB', sensitivity: '—', redacted: false },
    { field: 'output_stream', size: `${Math.round(req.tokens / 40)} KB`, sensitivity: 'INTERNAL', redacted: false }
  ];
  const columns: Column<(typeof payloadRows)[number]>[] = [
    { key: 'field', label: 'Field', sortValue: (r) => r.field, render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.field}</span> },
    { key: 'size', label: 'Size', sortValue: (r) => r.size, render: (r) => <span className="text-slate-200">{r.size}</span> },
    { key: 'sensitivity', label: 'Sensitivity', render: (r) => <Badge label={r.sensitivity} tone="slate" /> },
    { key: 'redacted', label: 'Redacted', render: (r) => (r.redacted ? <Badge label="Redacted" tone="violet" /> : <Badge label="Clear" tone="green" />) }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={`${req.id} · Data`}
        id={req.id}
        description="Payload fields transmitted with the request and their handling."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <Badge key="c" label={req.category} tone="blue" />
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Category" value={req.category} icon={Database} accent="sky" />
        <StatCard label="Sensitivity" value={sensitivityOf(req.category)} icon={ShieldOff} accent="violet" />
        <StatCard label="Tokens" value={fmt(req.tokens)} icon={HardDrive} accent="cyan" />
        <StatCard label="Redaction Applied" value={redacted ? 'Yes' : 'No'} icon={ShieldOff} accent={redacted ? 'violet' : 'green'} />
      </div>
      <Card>
        <CardHeader title="Payload summary" subtitle={`Transmitted by ${v.app} to ${v.system}`} />
        <CardBody>
          <DataTable columns={columns} rows={payloadRows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}