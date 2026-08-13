import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IntegrationHeader, IntegrationNav, SyncLogTable } from '@/components/platform/integration-detail';
import { integrationById } from '@/components/platform/integration-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const integration = integrationById(id);
  if (!integration) notFound();

  const healthy = integration.status !== 'Error';

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={`${integration.name} Logs`} description="Sync runs, health checks and connector diagnostics." />
      <IntegrationNav id={id} active="logs" />
      <IntegrationHeader integration={integration} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Sync Runs (24h)</p>
            <p className="mt-1.5 text-2xl font-semibold text-white">288</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Success Rate</p>
            <p className="mt-1.5 text-2xl font-semibold text-emerald-300">{healthy ? '99.7' : '92.4'}%</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Avg Duration</p>
            <p className="mt-1.5 text-2xl font-semibold text-white">1.8s</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Warnings</p>
            <p className="mt-1.5 text-2xl font-semibold text-amber-300">{healthy ? '4' : '31'}</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Health status"
          subtitle={`${integration.name} connector diagnostics`}
          action={<Badge label={healthy ? 'Healthy' : 'Degraded'} tone={healthy ? 'green' : 'rose'} />}
        />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { name: 'Authentication', value: 'OAuth token valid', ok: true },
              { name: 'Rate limit headroom', value: healthy ? '38% remaining' : '12% remaining', ok: true },
              { name: 'Endpoint reachability', value: healthy ? 'Reachable (42ms)' : 'Intermittent timeouts', ok: healthy },
              { name: 'Schema compatibility', value: healthy ? 'In sync' : 'Drift detected', ok: healthy },
              { name: 'Worker backlog', value: '0 items', ok: true },
              { name: 'TLS certificate', value: 'Valid until 2027-03-01', ok: true }
            ].map((c) => (
              <div key={c.name} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-200">{c.name}</p>
                  <Badge label={c.ok ? 'Pass' : 'Fail'} tone={c.ok ? 'green' : 'rose'} />
                </div>
                <p className="mt-1 text-[0.7rem] text-slate-500">{c.value}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <SyncLogTable integration={integration} />
    </div>
  );
}