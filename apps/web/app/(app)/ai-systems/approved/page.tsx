import { Activity, AlertTriangle, Bot, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SystemsTable } from '@/components/registry/registry-tables';
import { aiSystems } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = aiSystems.filter((s) => s.status === 'Approved');
  const highRisk = rows.filter((s) => s.risk === 'High' || s.risk === 'Critical');
  const requests = rows.reduce((a, s) => a + s.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · AI Systems"
        title="Approved AI Systems"
        description="Systems cleared for operation after governance review. Approved systems may route production traffic through the gateway."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved Systems" value={rows.length} icon={ShieldCheck} accent="green" />
        <StatCard label="Production" value={rows.filter((s) => s.environment === 'Production').length} icon={Bot} accent="sky" />
        <StatCard label="High Risk" value={highRisk.length} icon={AlertTriangle} accent="rose" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Activity} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Approved AI Systems" subtitle={`${rows.length} systems cleared for operation`} />
        <CardBody>
          <SystemsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}