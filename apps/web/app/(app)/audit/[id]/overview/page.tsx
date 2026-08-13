import { Card, CardBody } from '@/components/ui/card';
import AuditEventOverview from '@/components/governance/audit-overview';
import { logById } from '@/components/governance/audit-helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = logById(id);
  if (!log) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Event not found</p>
          <p className="mt-1 text-xs text-slate-500">No audit event exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }
  return <AuditEventOverview log={log} active={`/audit/${id}/overview`} />;
}