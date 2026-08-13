import { Database, Radar, ShieldAlert, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SourcesTable } from '@/components/registry/registry-tables';
import { dataSources } from '@/lib/mock-data';

export default function Page() {
  const rows = dataSources.filter((s) => s.status !== 'Connected');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Data Sources"
        title="Discover Data Sources"
        description="Sources surfaced from cloud accounts and network telemetry that have not been onboarded."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Discovered" value={rows.length} icon={Radar} accent="sky" />
        <StatCard label="Pending" value={rows.filter((s) => s.status === 'Pending').length} icon={Zap} accent="amber" />
        <StatCard label="Restricted" value={rows.filter((s) => s.status === 'Restricted').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Unindexed" value={rows.reduce((a, s) => a + s.records, 0).toLocaleString()} icon={Database} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Discovered Data Sources" subtitle="Awaiting connector setup and classification" />
        <CardBody>
          <SourcesTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}