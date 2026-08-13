import { notFound } from 'next/navigation';
import { Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Metric } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { IntegrationHeader, IntegrationNav, AttributeGrid, SyncLogTable } from '@/components/platform/integration-detail';
import { integrationById } from '@/components/platform/integration-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const integration = integrationById(id);
  if (!integration) notFound();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={integration.name} description={integration.description} />
      <IntegrationNav id={id} active="overview" />
      <IntegrationHeader integration={integration} />

      <AttributeGrid
        rows={[
          { label: 'Category', value: integration.category.replace('-', ' ') },
          { label: 'Version', value: integration.version },
          { label: 'Status', value: integration.status },
          { label: 'Last Sync', value: integration.lastSync },
          { label: 'Account', value: integration.account ?? '—' },
          { label: 'Avg Latency', value: integration.syncMs > 0 ? `${integration.syncMs}ms` : '—' },
          { label: 'Events (30d)', value: String(integration.events) },
          { label: 'Connected Since', value: '2026-01-15' }
        ]}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Health" subtitle="Latency and reliability for this connector" />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Metric label="Sync Success" value={integration.status === 'Error' ? '92.4' : '99.9'} suffix="%" />
              <Metric label="Avg Latency" value={integration.syncMs > 0 ? integration.syncMs : '—'} suffix={integration.syncMs > 0 ? 'ms' : undefined} />
              <Metric label="Uptime (30d)" value="99.96" suffix="%" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge label="Auth: OAuth 2.0" tone="blue" />
              <Badge label="Region: US-East" tone="slate" />
              <Badge label="Rate Limit: 500/min" tone="slate" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Quick actions" />
          <CardBody className="space-y-2.5">
            <Link href={`/integrations-hub/${id}/configuration`} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs font-medium text-slate-200 transition hover:bg-white/[0.05]">
              Configure connector <ArrowRight className="h-3.5 w-3.5 text-sentinel-300" />
            </Link>
            <Link href={`/integrations-hub/${id}/logs`} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs font-medium text-slate-200 transition hover:bg-white/[0.05]">
              View sync logs <ArrowRight className="h-3.5 w-3.5 text-sentinel-300" />
            </Link>
            <Link href={`/integrations-hub/${id}/events`} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs font-medium text-slate-200 transition hover:bg-white/[0.05]">
              Event stream <ArrowRight className="h-3.5 w-3.5 text-sentinel-300" />
            </Link>
            <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
              <Activity className="h-3.5 w-3.5 text-slate-500" />
              Health checks run every 60s
            </div>
          </CardBody>
        </Card>
      </div>

      <SyncLogTable integration={integration} />
    </div>
  );
}