import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { CopyButton } from '@/components/platform/settings-form';
import { webhookEndpoints, fmtRelative } from '@/components/platform/developer-data';

type DeliveryRow = {
  id: string;
  event: string;
  time: string;
  status: string;
  attempts: number;
  latency: number;
};

const deliveries: DeliveryRow[] = [
  { id: 'd-1', event: 'incident.created', time: '2026-08-13T09:05:00Z', status: 'Success', attempts: 1, latency: 240 },
  { id: 'd-2', event: 'audit.created', time: '2026-08-13T09:04:00Z', status: 'Success', attempts: 1, latency: 198 },
  { id: 'd-3', event: 'incident.updated', time: '2026-08-13T08:58:00Z', status: 'Success', attempts: 1, latency: 231 },
  { id: 'd-4', event: 'audit.created', time: '2026-08-13T08:52:00Z', status: 'Retried', attempts: 3, latency: 4100 },
  { id: 'd-5', event: 'incident.updated', time: '2026-08-13T08:41:00Z', status: 'Success', attempts: 1, latency: 205 },
  { id: 'd-6', event: 'incident.resolved', time: '2026-08-13T08:30:00Z', status: 'Failed', attempts: 4, latency: 8200 }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const webhook = webhookEndpoints.find((w) => w.id === id);
  if (!webhook) notFound();

  const columns: Column<DeliveryRow>[] = [
    { key: 'id', label: 'Delivery' },
    { key: 'event', label: 'Event', render: (r) => <span className="font-mono text-slate-400">{r.event}</span> },
    { key: 'time', label: 'Time', sortValue: (r) => r.time, render: (r) => fmtRelative(r.time) },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'attempts', label: 'Attempts', render: (r) => <span className="text-slate-400">{r.attempts}</span> },
    { key: 'latency', label: 'Latency', render: (r) => `${r.latency}ms` }
  ];

  return (
    <div className="space-y-6">
      <Link href="/developer-portal/webhooks" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-slate-200">
        <ArrowLeft className="h-3.5 w-3.5" /> Webhooks
      </Link>
      <PageHeader
        eyebrow="Platform"
        title={webhook.name}
        description="Endpoint configuration and delivery history."
        actions={<Badge label={webhook.status} tone={toneForStatus(webhook.status)} />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Endpoint details" />
          <CardBody>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {[
                { label: 'URL', value: webhook.url },
                { label: 'Status', value: webhook.status },
                { label: 'Delivery Rate', value: `${webhook.deliveryRate}%` },
                { label: 'Last Delivery', value: fmtRelative(webhook.lastDelivery) }
              ].map((r) => (
                <div key={r.label} className="bg-slate-950/80 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{r.label}</p>
                  <p className="mt-1 truncate font-mono text-sm text-slate-200">{r.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {webhook.events.map((e) => (
                <Badge key={e} label={e} tone="blue" />
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500">whsec_8f2b…9c1a</span>
              <CopyButton text="whsec_8f2b9c1a4d7e6f5a3b2c1d0e9f8a7b6c" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Stats" subtitle="7-day window" />
          <CardBody className="space-y-3">
            {[
              { label: 'Deliveries', value: '18,204' },
              { label: 'Success', value: `${webhook.deliveryRate}%` },
              { label: 'Retries', value: '342' },
              { label: 'Avg Latency', value: '214ms' }
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-xs text-slate-400">{s.label}</span>
                <span className="text-sm font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent deliveries" subtitle="Latest events sent to this endpoint" />
        <CardBody>
          <DataTable columns={columns} rows={deliveries} searchable={false} pageSize={6} />
        </CardBody>
      </Card>
    </div>
  );
}