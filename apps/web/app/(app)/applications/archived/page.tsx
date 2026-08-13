import { Activity, Archive, KeyRound, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ApplicationsTable } from '@/components/registry/registry-tables';
import { applications } from '@/lib/mock-data';

export default function Page() {
  const rows = applications.filter((a) => a.status === 'Archived');
  const keys = rows.reduce((a, x) => a + x.apiKeys, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Applications"
        title="Archived Applications"
        description="Applications that have been decommissioned. Their keys are revoked and traffic is blocked at the gateway."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Archived" value={rows.length} icon={Archive} accent="slate" />
        <StatCard label="Systems Attached" value={rows.reduce((a, x) => a + x.aiSystemIds.length, 0)} icon={Activity} accent="sky" />
        <StatCard label="Keys Revoked" value={keys} icon={KeyRound} accent="amber" />
        <StatCard label="Low Risk" value={rows.filter((a) => a.risk === 'Low').length} icon={ShieldCheck} accent="green" />
      </div>
      <Card>
        <CardHeader title="Archived Applications" subtitle="Decommissioned records retained for audit" />
        <CardBody>
          <ApplicationsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}