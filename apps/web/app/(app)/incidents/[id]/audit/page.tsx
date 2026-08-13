import { ClipboardList, Eye, Fingerprint, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AuditTable } from '@/components/enforcement/tables';
import { SeverityBadge } from '@/components/enforcement/badges';
import { auditRowsFor, incidentById, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const rows = auditRowsFor(id, inc.title);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Immutable audit trail for this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Audit Events" value={rows.length} icon={ClipboardList} accent="sky" />
        <StatCard label="Viewers" value={new Set(rows.map((r) => r.actor)).size} icon={Eye} accent="violet" />
        <StatCard label="Immutability" value="Write-only" icon={Fingerprint} accent="green" />
        <StatCard label="Signatures" value="HMAC" icon={UserCheck} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Audit log" subtitle="Append-only record of every access and change" />
        <CardBody>
          <AuditTable rows={rows} searchPlaceholder="Search audit events..." />
        </CardBody>
      </Card>
    </div>
  );
}