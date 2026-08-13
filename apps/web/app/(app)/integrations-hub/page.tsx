import { Activity, Boxes, Cable, Clock, Plug, RefreshCw, Webhook, Wrench } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { IntegrationGrid } from '@/components/platform/integration-card';
import { categoryMeta, integrationCatalog, type IntegrationCategory } from '@/components/platform/integration-data';

const categoryOrder: IntegrationCategory[] = [
  'ai-providers',
  'cloud',
  'databases',
  'security',
  'identity',
  'siem',
  'monitoring',
  'developer-tools',
  'webhooks',
  'custom'
];

const categoryIcons: Record<string, typeof Boxes> = {
  'ai-providers': Plug,
  cloud: Boxes,
  databases: Cable,
  security: Activity,
  identity: Wrench,
  siem: Activity,
  monitoring: Activity,
  'developer-tools': Wrench,
  webhooks: Webhook,
  custom: Plug
};

export default function Page() {
  const connected = integrationCatalog.filter((i) => i.status === 'Connected').length;
  const failing = integrationCatalog.filter((i) => i.status === 'Error').length;
  const configured = integrationCatalog.filter((i) => i.status === 'Configured').length;
  const avgLatency = Math.round(
    integrationCatalog.filter((i) => i.syncMs > 0).reduce((a, i) => a + i.syncMs, 0) /
      Math.max(1, integrationCatalog.filter((i) => i.syncMs > 0).length)
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Integrations Hub"
        description="Connect AI providers, data sources, security tooling and identity systems to the Sentinel control plane."
        actions={
          <>
            <SecondaryButton href="/integrations-hub/webhooks">Webhooks</SecondaryButton>
            <PrimaryButton href="/integrations-hub/custom">Add Integration</PrimaryButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Integrations" value={connected} delta={8} deltaLabel="this quarter" icon={Boxes} accent="sky" sub={`${integrationCatalog.length} total in catalog`} />
        <StatCard label="Configured" value={configured} icon={Activity} accent="cyan" sub="Needs attention" />
        <StatCard label="Failing" value={failing} icon={RefreshCw} accent={failing > 0 ? 'rose' : 'green'} sub="Sync or auth errors" />
        <StatCard label="Avg Sync Latency" value={`${avgLatency}ms`} delta={-12} deltaLabel="vs last week" icon={Clock} accent="violet" sub="p95 across all connectors" />
      </div>

      <div className="space-y-10">
        {categoryOrder.map((cat) => {
          const items = integrationCatalog.filter((i) => i.category === cat);
          const Icon = categoryIcons[cat];
          return (
            <section key={cat} className="space-y-4">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">{categoryMeta[cat].label}</h2>
                    <p className="text-[0.7rem] text-slate-500">{categoryMeta[cat].description}</p>
                  </div>
                </div>
                <Link href={`/integrations-hub/${cat}`} className="text-[0.7rem] font-semibold text-sentinel-300 transition hover:text-sentinel-400">
                  View all {items.length}
                </Link>
              </div>
              <IntegrationGrid integrations={items.slice(0, 4)} />
            </section>
          );
        })}
      </div>

      <Card>
        <CardHeader title="Connector health" subtitle="Sync status across all configured connectors" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {integrationCatalog
              .filter((i) => i.status === 'Error' || i.status === 'Pending')
              .map((i) => (
                <div key={i.id} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <p className="text-xs font-semibold text-white">{i.name}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">
                    {i.status === 'Error' ? `Failing since ${i.lastSync}` : 'Awaiting configuration'}
                  </p>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}