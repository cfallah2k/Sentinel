import { ClipboardList, Eye, Fingerprint, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AuditTable } from '@/components/enforcement/tables';
import { auditRowsFor, policyById, policyNav } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const rows = auditRowsFor(id, policy.name);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Immutable audit trail for this policy — who did what, and when."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
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