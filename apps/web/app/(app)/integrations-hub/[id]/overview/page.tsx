import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Metric } from '@/components/ui/progress';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { AreaTrend } from '@/components/ui/charts';
import { IntegrationHeader, IntegrationNav, AttributeGrid } from '@/components/platform/integration-detail';
import { integrationById } from '@/components/platform/integration-data';
import { hourlySeries } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const integration = integrationById(id);
  if (!integration) notFound();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={`${integration.name} Overview`} description="Throughput, latency and governance signals for this connector." />
      <IntegrationNav id={id} active="overview" />
      <IntegrationHeader integration={integration} />

      <AttributeGrid
        rows={[
          { label: 'Category', value: integration.category.replace('-', ' ') },
          { label: 'Status', value: integration.status },
          { label: 'Events (30d)', value: String(integration.events) },
          { label: 'Sync Cadence', value: '5 min incremental' },
          { label: 'Last Sync', value: integration.lastSync },
          { label: 'Account', value: integration.account ?? '—' },
          { label: 'Region', value: 'US-East (Virginia)' },
          { label: 'Connector Version', value: integration.version }
        ]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardBody>
            <Metric label="Requests (24h)" value="48,210" suffix="req" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Metric label="Avg Latency" value={integration.syncMs > 0 ? integration.syncMs : '—'} suffix="ms" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Metric label="Blocked (24h)" value="312" suffix="req" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Metric label="Error Rate" value={integration.status === 'Error' ? '7.6' : '0.12'} suffix="%" />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Gateway throughput"
          subtitle="Requests evaluated through this connector over the last 24 hours"
          action={<Badge label={integration.status} tone={toneForStatus(integration.status)} />}
        />
        <CardBody>
          <AreaTrend data={hourlySeries} dataKey="allowed" color="#38bdf8" height={220} />
        </CardBody>
      </Card>
    </div>
  );
}