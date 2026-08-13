import { Webhook } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { webhookEndpoints, fmtRelative } from '@/components/platform/developer-data';

type Row = {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: string;
  deliveryRate: number;
  lastDelivery: string;
};

export default function Page() {
  const rows: Row[] = webhookEndpoints.map((w) => ({ ...w }));

  const columns: Column<Row>[] = [
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
    { key: 'events', label: 'Subscriptions', render: (r) => <span className="text-slate-400">{r.events.length} events</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    {
      key: 'deliveryRate',
      label: 'Delivery',
      sortValue: (r) => r.deliveryRate,
      render: (r) => <span className={r.deliveryRate >= 97 ? 'text-emerald-300' : 'text-amber-300'}>{r.deliveryRate}%</span>
    },
    { key: 'lastDelivery', label: 'Last Delivery', sortValue: (r) => r.lastDelivery, render: (r) => fmtRelative(r.lastDelivery) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Webhook Settings"
        description="Delivery endpoints for Sentinel events, shared with the developer portal."
        actions={
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Webhook className="h-4 w-4 text-sentinel-300" /> HMAC-signed payloads
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Endpoints" value={webhookEndpoints.length} icon={Webhook} accent="sky" sub="Registered" />
        <StatCard label="Delivering" value={webhookEndpoints.filter((w) => w.status === 'Active').length} icon={Webhook} accent="green" sub="Active" />
        <StatCard label="Events (24h)" value="12,401" icon={Webhook} accent="violet" sub="Delivered" />
        <StatCard label="Failures (24h)" value="38" icon={Webhook} accent="rose" sub="Retried automatically" />
      </div>

      <Card>
        <CardHeader title="Delivery endpoints" subtitle="Configure signing and retry policy per endpoint" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search endpoints..." initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}