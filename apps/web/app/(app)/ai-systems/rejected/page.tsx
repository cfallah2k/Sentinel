import { Ban, Bot, ShieldAlert, XCircle } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SystemsTable } from '@/components/registry/registry-tables';
import { aiSystems } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = aiSystems.filter((s) => s.status === 'Rejected');
  const requests = rows.reduce((a, s) => a + s.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · AI Systems"
        title="Rejected AI Systems"
        description="Systems denied approval by governance. Traffic from rejected systems is blocked at the gateway; owners may re-submit with remediation."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Rejected" value={rows.length} icon={XCircle} accent="rose" />
        <StatCard label="High Risk" value={rows.filter((s) => s.risk === 'High' || s.risk === 'Critical').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Human Oversight" value={rows.filter((s) => s.oversight === 'Human').length} icon={Bot} accent="sky" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Ban} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Rejected AI Systems" subtitle="Denied at governance review" />
        <CardBody>
          <SystemsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}