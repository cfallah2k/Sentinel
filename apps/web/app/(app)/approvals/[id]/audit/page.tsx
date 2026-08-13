import { ClipboardList, Eye, Fingerprint, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AuditTable } from '@/components/enforcement/tables';
import { approvalAuditRows, approvalById, approvalNav } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apr = approvalById(id) ?? approvals[0];
  const rows = approvalAuditRows(apr);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Approvals"
        title={`${apr.type} · ${apr.id}`}
        id={apr.id}
        description="Immutable audit trail for this approval."
        badges={[
          <Badge key="s" label={apr.status} tone={apr.status === 'Approved' ? 'green' : apr.status === 'Denied' ? 'rose' : apr.status === 'Expired' ? 'slate' : 'amber'} />,
          <Badge key="r" label={`${apr.risk} risk`} tone={apr.risk === 'Critical' ? 'red' : apr.risk === 'High' ? 'rose' : 'amber'} />
        ]}
      />
      <DetailNav base={`/approvals/${id}`} items={approvalNav(id)} />
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