'use client';

import { useState } from 'react';
import { Webhook } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { webhookEndpoints, fmtRelative, type WebhookEndpoint } from '@/components/platform/developer-data';
import QuickCreateModal from '@/components/ui/quick-create-modal';

export default function Page() {
  const [rows, setRows] = useState<WebhookEndpoint[]>(webhookEndpoints);
  const [createOpen, setCreateOpen] = useState(false);

  const columns: Column<WebhookEndpoint>[] = [
    {
      key: 'name',
      label: 'Endpoint',
      sortValue: (r) => r.name,
      render: (r) => (
        <div>
          <Link href={`/developer-portal/webhooks/${r.id}`} className="font-medium text-slate-200 transition hover:text-sentinel-300">
            {r.name}
          </Link>
          <p className="mt-0.5 max-w-xs truncate font-mono text-[0.65rem] text-slate-500">{r.url}</p>
        </div>
      )
    },
    { key: 'events', label: 'Events', render: (r) => <span className="text-xs text-slate-400">{r.events.length} subscribed</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    {
      key: 'deliveryRate',
      label: 'Delivery Rate',
      sortValue: (r) => r.deliveryRate,
      render: (r) => <span className={r.deliveryRate >= 97 ? 'text-emerald-300' : 'text-amber-300'}>{r.deliveryRate}%</span>
    },
    { key: 'lastDelivery', label: 'Last Delivery', sortValue: (r) => r.lastDelivery, render: (r) => fmtRelative(r.lastDelivery) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Webhooks"
        description="Outbound event delivery with signing, retries and delivery analytics."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Add Endpoint
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Endpoints" value={rows.length} icon={Webhook} accent="sky" sub="Registered" />
        <StatCard label="Delivering" value={rows.filter((w) => w.status === 'Active').length} icon={Webhook} accent="green" sub="Active endpoints" />
        <StatCard label="Avg Delivery Rate" value="98.4%" icon={Webhook} accent="cyan" sub="7-day window" />
        <StatCard label="Events (24h)" value="12,401" icon={Webhook} accent="violet" sub="Delivered and retried" />
      </div>

      <Card>
        <CardHeader title="Endpoint directory" subtitle="All outbound webhooks" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search endpoints..." initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Signing" subtitle="Verify payloads with the signature header" />
        <CardBody className="space-y-3">
          <p className="text-xs leading-5 text-slate-400">
            Each delivery includes <span className="font-mono text-slate-200">Sentinel-Signature</span>, an HMAC-SHA256 of the raw body using your endpoint secret, prefixed with a timestamp to bound replay windows.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge label="HMAC-SHA256" tone="blue" />
            <Badge label="5 min replay window" tone="slate" />
            <Badge label="3 retries · backoff" tone="slate" />
          </div>
        </CardBody>
      </Card>

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add webhook endpoint"
        description="Deliveries start once the endpoint is verified with a ping."
        fields={[
          { name: 'name', label: 'Endpoint name', placeholder: 'e.g. SOC Alert Fanout' },
          { name: 'url', label: 'Endpoint URL', placeholder: 'https://hooks.example.com/events' }
        ]}
        submitLabel="Add endpoint"
        onCreate={(values) => {
          setRows((prev) => [
            {
              id: `wh-${Date.now()}`,
              name: values.name,
              url: values.url,
              events: ['incident.created'],
              status: 'Active',
              deliveryRate: 100,
              lastDelivery: '2026-08-13T09:00:00Z'
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}