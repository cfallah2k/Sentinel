import { Clock, Database, Plug, ShieldAlert } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SourcesTable } from '@/components/registry/registry-tables';
import { dataSources } from '@/lib/mock-data';

export default function Page() {
  const rows = dataSources.filter((s) => s.status === 'Pending');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Data Sources"
        title="Pending Data Sources"
        description="Sources awaiting connector setup or classification review before traffic is allowed."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={rows.length} icon={Clock} accent="amber" />
        <StatCard label="High Risk" value={rows.filter((s) => s.risk === 'High').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Unclassified" value={rows.filter((s) => s.categories.length === 0).length} icon={Database} accent="sky" />
        <StatCard label="Needs Connector" value={rows.filter((s) => s.lastSync === 'Live').length} icon={Plug} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Pending Data Sources" subtitle="Awaiting setup and classification" />
        <CardBody>
          <SourcesTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}