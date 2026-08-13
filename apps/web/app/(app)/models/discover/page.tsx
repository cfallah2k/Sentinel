import { Cpu, Lock, Radar, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ModelsTable } from '@/components/registry/registry-tables';
import { models, providers } from '@/lib/mock-data';

export default function Page() {
  const pendingProviderIds = new Set(providers.filter((p) => p.status !== 'Approved').map((p) => p.id));
  const rows = models.filter((m) => m.status === 'Restricted' || pendingProviderIds.has(m.providerId));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Models"
        title="Discover Models"
        description="Models surfaced from provider catalogs that have not been approved for gateway routing."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Discovered" value={rows.length} icon={Radar} accent="sky" />
        <StatCard label="Restricted" value={rows.filter((m) => m.status === 'Restricted').length} icon={Lock} accent="rose" />
        <StatCard label="Unapproved Provider" value={rows.filter((m) => pendingProviderIds.has(m.providerId)).length} icon={Zap} accent="amber" />
        <StatCard label="High Risk" value={rows.filter((m) => m.risk === 'High').length} icon={Cpu} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Discovered Models" subtitle="Awaiting approval or provider review" />
        <CardBody>
          <ModelsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}