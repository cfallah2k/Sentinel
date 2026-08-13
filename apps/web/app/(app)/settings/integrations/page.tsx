import { Plug } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { integrationCatalog, categoryMeta } from '@/components/platform/integration-data';

export default function Page() {
  const scoped = integrationCatalog.slice(0, 12);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Integration Settings"
        description="Connections to external services, managed from the integration hub."
        actions={
          <Link href="/integrations-hub" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10">
            Open Hub
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected" value={integrationCatalog.filter((i) => i.status === 'Connected').length} icon={Plug} accent="green" sub="Active" />
        <StatCard label="Available" value={integrationCatalog.length} icon={Plug} accent="sky" sub="In catalog" />
        <StatCard label="Disconnected" value={integrationCatalog.filter((i) => i.status === 'Available').length} icon={Plug} accent="amber" sub="Not installed" />
        <StatCard label="OAuth scopes" value="3 revoked" icon={Plug} accent="rose" sub="Last 90 days" />
      </div>

      <Card>
        <CardHeader title="Connected services" subtitle="Credentials and scopes per integration" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {scoped.map((i) => (
              <Link key={i.id} href={`/integrations-hub/${i.id}/settings`} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition hover:border-sentinel-500/30 hover:bg-sentinel-500/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-200">{i.name}</p>
                  <Badge label={i.status} tone={i.status === 'Connected' ? 'green' : i.status === 'Error' ? 'rose' : 'slate'} />
                </div>
                <p className="mt-1 text-[0.65rem] text-slate-500">{categoryMeta[i.category]?.label ?? i.category}</p>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}