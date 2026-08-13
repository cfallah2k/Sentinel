import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { IntegrationIcon } from './integration-card';
import { integrationEvents, type Integration } from './integration-data';

const navItems = [
  { label: 'Overview', href: '/integrations-hub/{id}/overview' },
  { label: 'Configuration', href: '/integrations-hub/{id}/configuration' },
  { label: 'Credentials', href: '/integrations-hub/{id}/credentials' },
  { label: 'Logs', href: '/integrations-hub/{id}/logs' },
  { label: 'Events', href: '/integrations-hub/{id}/events' },
  { label: 'Settings', href: '/integrations-hub/{id}/settings' }
];

export function IntegrationNav({ id, active }: { id: string; active: string }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
      {navItems.map((n) => {
        const href = n.href.replace('{id}', id);
        const isActive = href.endsWith(`/${active}`);
        return (
          <Link
            key={n.label}
            href={href}
            className={`rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
              isActive ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </div>
  );
}

export function IntegrationHeader({ integration }: { integration: Integration }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href="/integrations-hub"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sentinel-500/25 bg-sentinel-500/10 text-sentinel-300">
        <IntegrationIcon name={integration.icon} className="h-7 w-7" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">{integration.name}</h1>
          <Badge label={integration.status} tone={toneForStatus(integration.status)} />
        </div>
        <p className="mt-0.5 text-xs text-slate-400">
          v{integration.version.replace('v', '')} · last sync {integration.lastSync}
          {integration.account ? ` · ${integration.account}` : ''}
        </p>
      </div>
    </div>
  );
}

export function AttributeGrid({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 xl:grid-cols-4">
      {rows.map((r) => (
        <div key={r.label} className="bg-slate-950/80 px-4 py-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{r.label}</p>
          <p className="mt-1 truncate text-sm font-medium text-slate-200">{r.value}</p>
        </div>
      ))}
    </div>
  );
}

type LogRow = {
  id: string;
  time: string;
  type: string;
  detail: string;
  status: string;
};

export function SyncLogTable({ integration }: { integration: Integration }) {
  const rows: LogRow[] = integrationEvents(integration.id).map((e) => ({ ...e }));
  const columns: Column<LogRow>[] = [
    { key: 'time', label: 'Time', sortValue: (r) => r.time },
    { key: 'type', label: 'Type' },
    { key: 'detail', label: 'Detail' },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) }
  ];
  return (
    <Card>
      <CardHeader title="Sync & event history" subtitle={`Most recent activity for ${integration.name}`} />
      <CardBody>
        <DataTable columns={columns} rows={rows} searchPlaceholder="Search events..." pageSize={6} />
      </CardBody>
    </Card>
  );
}