import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { IntegrationHeader, IntegrationNav } from '@/components/platform/integration-detail';
import { integrationById, integrationEvents } from '@/components/platform/integration-data';

type EventRow = {
  id: string;
  time: string;
  type: string;
  detail: string;
  status: string;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const integration = integrationById(id);
  if (!integration) notFound();

  const rows: EventRow[] = integrationEvents(id, 16).map((e) => ({ ...e }));

  const columns: Column<EventRow>[] = [
    { key: 'time', label: 'Timestamp', sortValue: (r) => r.time },
    { key: 'type', label: 'Type' },
    { key: 'detail', label: 'Event', className: 'max-w-md' },
    { key: 'status', label: 'Result', tone: (r) => toneForStatus(r.status) }
  ];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={`${integration.name} Events`} description="Event stream emitted by this connector and the gateway." />
      <IntegrationNav id={id} active="events" />
      <IntegrationHeader integration={integration} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Events (24h)</p>
            <p className="mt-1.5 text-2xl font-semibold text-white">{integration.events.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Consumers</p>
            <p className="mt-1.5 text-2xl font-semibold text-white">6</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Failed Deliveries</p>
            <p className="mt-1.5 text-2xl font-semibold text-rose-300">2</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Retention</p>
            <p className="mt-1.5 text-2xl font-semibold text-white">90 days</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Event stream"
          subtitle="Latest events from the connector pipeline"
          action={<Badge label="Streaming" tone="green" />}
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search events..." pageSize={10} initialSort={{ key: 'time', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}