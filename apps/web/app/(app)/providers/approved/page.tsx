import { Activity, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = providers.filter((p) => p.status === 'Approved');
  const requests = rows.reduce((a, p) => a + p.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Providers"
        title="Approved Providers"
        description="Providers cleared to serve inference traffic. Approved providers may appear in any system's request path."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved" value={rows.length} icon={ShieldCheck} accent="green" />
        <StatCard label="External" value={rows.filter((p) => p.type === 'External').length} icon={Globe} accent="sky" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Activity} accent="violet" />
        <StatCard label="High Risk" value={rows.filter((p) => p.risk === 'High').length} icon={Zap} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Approved Providers" subtitle="Cleared for gateway traffic" />
        <CardBody>
          <ProvidersTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}