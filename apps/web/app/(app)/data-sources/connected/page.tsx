import { Database, Plug, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SourcesTable } from '@/components/registry/registry-tables';
import { dataSources } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = dataSources.filter((s) => s.status === 'Connected');
  const records = rows.reduce((a, s) => a + s.records, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Data Sources"
        title="Connected Data Sources"
        description="Sources actively syncing and available to AI systems through the gateway."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected" value={rows.length} icon={Plug} accent="green" />
        <StatCard label="Records Indexed" value={fmt(records)} icon={Database} accent="sky" />
        <StatCard label="High Risk" value={rows.filter((s) => s.risk === 'High').length} icon={Zap} accent="rose" />
        <StatCard label="Classified" value={rows.filter((s) => s.categories.length > 0).length} icon={ShieldCheck} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Connected Data Sources" subtitle="Active integrations" />
        <CardBody>
          <SourcesTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}