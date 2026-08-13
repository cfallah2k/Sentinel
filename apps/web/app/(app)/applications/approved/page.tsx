import { Activity, AlertTriangle, KeyRound, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ApplicationsTable } from '@/components/registry/registry-tables';
import { applications } from '@/lib/mock-data';

export default function Page() {
  const rows = applications.filter((a) => a.status === 'Active');
  const highRisk = rows.filter((a) => a.risk === 'High');
  const keys = rows.reduce((a, x) => a + x.apiKeys, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Applications"
        title="Approved Applications"
        description="Active applications cleared to call AI systems through the gateway. Discovered or archived applications are excluded."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved" value={rows.length} icon={ShieldCheck} accent="green" />
        <StatCard label="High Risk" value={highRisk.length} icon={AlertTriangle} accent="rose" />
        <StatCard label="API Keys" value={keys} icon={KeyRound} accent="sky" />
        <StatCard label="AI Systems Used" value={rows.reduce((a, x) => a + x.aiSystemIds.length, 0)} icon={Activity} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Approved Applications" subtitle="Active and cleared for gateway traffic" />
        <CardBody>
          <ApplicationsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}