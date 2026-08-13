import { FileSearch, Fingerprint, ShieldCheck, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentById, incidentEvidence, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const rows = incidentEvidence(inc);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'title', label: 'Evidence', render: (r) => <span className="text-slate-200">{r.title}</span> },
    { key: 'type', label: 'Type', sortValue: (r) => r.type, render: (r) => <Badge label={r.type} tone="blue" /> },
    { key: 'source', label: 'Source', render: (r) => <span className="text-slate-400">{r.source}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={r.status === 'Captured' || r.status === 'Analyzed' ? 'green' : 'amber'} /> },
    { key: 'collectedAt', label: 'Collected', render: (r) => <span className="text-slate-400">{r.collectedAt}</span> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Captured artifacts supporting this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Artifacts" value={rows.length} icon={FileSearch} accent="sky" />
        <StatCard label="Captured" value={rows.filter((r) => r.status === 'Captured' || r.status === 'Analyzed').length} icon={ShieldCheck} accent="green" />
        <StatCard label="Pending" value={rows.filter((r) => r.status === 'Pending').length} icon={Timer} accent="amber" />
        <StatCard label="Chain of Custody" value="Intact" icon={Fingerprint} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Evidence log" subtitle="Collected artifacts with custody status" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}