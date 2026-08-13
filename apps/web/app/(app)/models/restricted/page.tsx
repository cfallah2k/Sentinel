import { Activity, AlertTriangle, Lock, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ModelsTable } from '@/components/registry/registry-tables';
import { models } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = models.filter((m) => m.status === 'Restricted');
  const requests = rows.reduce((a, m) => a + m.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Models"
        title="Restricted Models"
        description="Models blocked from serving traffic pending remediation or explicit approval."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Restricted" value={rows.length} icon={Lock} accent="rose" />
        <StatCard label="High Risk" value={rows.filter((m) => m.risk === 'High').length} icon={AlertTriangle} accent="rose" />
        <StatCard label="Requests Blocked" value={fmt(requests)} icon={Activity} accent="amber" />
        <StatCard label="Approved Sibling Models" value={models.filter((m) => m.status === 'Approved').length} icon={ShieldCheck} accent="green" />
      </div>
      <Card>
        <CardHeader title="Restricted Models" subtitle="Blocked at the gateway" />
        <CardBody>
          <ModelsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}