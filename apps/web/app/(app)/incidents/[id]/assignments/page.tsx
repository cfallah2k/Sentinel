import { FileSignature, History, ShieldCheck, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentAssignments, incidentById, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const rows = incidentAssignments(inc);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'responder', label: 'Responder', sortValue: (r) => r.responder, render: (r) => <span className="text-slate-200">{r.responder}</span> },
    { key: 'role', label: 'Role', render: (r) => <span className="text-slate-400">{r.role}</span> },
    { key: 'joined', label: 'Joined', render: (r) => <span className="text-slate-400">{r.joined}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'slate'} /> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Response team assignments for this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assignments" value={rows.length} icon={FileSignature} accent="sky" />
        <StatCard label="Active" value={rows.filter((r) => r.status === 'Active').length} icon={ShieldCheck} accent="green" />
        <StatCard label="Standby" value={rows.filter((r) => r.status === 'Standby').length} icon={Timer} accent="amber" />
        <StatCard label="Lead" value={inc.assignee} icon={History} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Response team" subtitle="Roles and assignments" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}