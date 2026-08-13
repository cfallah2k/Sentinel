import { AlertTriangle, ShieldAlert, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SystemsTable } from '@/components/registry/registry-tables';
import { aiSystems } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical');
  const critical = rows.filter((s) => s.risk === 'Critical');
  const approved = rows.filter((s) => s.status === 'Approved');
  const blocked = rows.reduce((a, s) => a + s.blocked24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · AI Systems"
        title="High Risk AI Systems"
        description="Systems with elevated risk posture require approval for every request. Critical systems are monitored continuously by the security team."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High / Critical" value={rows.length} icon={AlertTriangle} accent="rose" />
        <StatCard label="Critical" value={critical.length} icon={TriangleAlert} accent="rose" />
        <StatCard label="Approved" value={approved.length} icon={ShieldCheck} accent="green" />
        <StatCard label="Blocked / 24h" value={fmt(blocked)} icon={ShieldAlert} accent="amber" />
      </div>
      <Card>
        <CardHeader title="High Risk AI Systems" subtitle="Elevated scrutiny required at the gateway" />
        <CardBody>
          <SystemsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}