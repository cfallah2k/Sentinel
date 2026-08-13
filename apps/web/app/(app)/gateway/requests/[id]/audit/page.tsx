import { ScrollText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AuditTable } from '@/components/enforcement/tables';
import { DecisionBadge } from '@/components/enforcement/badges';
import { auditRowsFor, requestById, requestNav } from '@/components/enforcement/helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const rows = auditRowsFor(req.id, 'request');

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={`${req.id} · Audit`}
        id={req.id}
        description="Immutable audit trail for this request."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <Badge key="a" label="Audit Policy v4" tone="blue" />
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <Card>
        <CardHeader title="Audit trail" subtitle="Every action taken against this request" action={<ScrollText className="h-4 w-4 text-slate-500" />} />
        <CardBody>
          <AuditTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}