import { ClipboardList, FileWarning, ShieldCheck, ShieldX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentActions, incidentById, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const rows = incidentActions(inc);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'title', label: 'Action', render: (r) => <span className="text-slate-200">{r.title}</span> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner, render: (r) => <span className="text-slate-400">{r.owner}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={r.status === 'Done' ? 'green' : r.status === 'In Progress' ? 'amber' : 'sky'} /> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Remediation and containment actions for this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Actions" value={rows.length} icon={ClipboardList} accent="sky" />
        <StatCard label="Open" value={rows.filter((r) => r.status === 'Open').length} icon={FileWarning} accent="rose" />
        <StatCard label="In Progress" value={rows.filter((r) => r.status === 'In Progress').length} icon={ShieldX} accent="amber" />
        <StatCard label="Completed" value={rows.filter((r) => r.status === 'Done').length} icon={ShieldCheck} accent="green" />
      </div>
      <Card>
        <CardHeader title="Action items" subtitle="Owned remediation tasks" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}