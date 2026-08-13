import { Ban, Database, Lock, ShieldAlert } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SourcesTable } from '@/components/registry/registry-tables';
import { dataSources } from '@/lib/mock-data';

export default function Page() {
  const rows = dataSources.filter((s) => s.status === 'Restricted');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Data Sources"
        title="Restricted Data Sources"
        description="Sources blocked from feeding AI traffic pending remediation or approved exceptions."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Restricted" value={rows.length} icon={Ban} accent="rose" />
        <StatCard label="High Risk" value={rows.filter((s) => s.risk === 'High').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Sensitive Categories" value={rows.filter((s) => s.categories.some((c) => ['PII', 'Health', 'Financial'].includes(c))).length} icon={Lock} accent="amber" />
        <StatCard label="Records Blocked" value={rows.reduce((a, s) => a + s.records, 0).toLocaleString()} icon={Database} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Restricted Data Sources" subtitle="Blocked at the gateway" />
        <CardBody>
          <SourcesTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}