import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { AuditTable } from '@/components/government/sections';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Metric } from '@/components/ui/progress';
import { auditLogs } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Regulatory Audits"
        description="Audit activity across operators, standards reviews, and evidence collection."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card><CardBody><Metric label="Audit Events" value={auditLogs.length} /></CardBody></Card>
        <Card><CardBody><Metric label="Successful" value={auditLogs.filter((l) => l.result === 'Success').length} /></CardBody></Card>
        <Card><CardBody><Metric label="Denied" value={auditLogs.filter((l) => l.result === 'Denied').length} /></CardBody></Card>
        <Card><CardBody><Metric label="Errors" value={auditLogs.filter((l) => l.result === 'Error').length} /></CardBody></Card>
      </div>
      <AuditTable rows={auditLogs} title="Audit Trail" subtitle="Events recorded across regulated operators" />
    </GovShell>
  );
}