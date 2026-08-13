import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import AuditEventHeader from '@/components/governance/audit-header';
import { logById } from '@/components/governance/audit-helpers';
import { auditLogs, teamMembers, type AuditLog } from '@/lib/mock-data';

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || 'SY';
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = logById(id) ?? auditLogs[0];
  const member = teamMembers.find((m) => m.email === log.actor);
  const displayName = member?.name ?? (log.actor === 'system' ? 'System Service Account' : log.actor);
  const initials = member ? initialsOf(member.name) : 'SY';
  const role = member?.role ?? 'SERVICE';
  const events = auditLogs.filter((l) => l.actor === log.actor);
  const ips = [...new Set(events.map((l) => l.ip))];
  const contexts = events.reduce<Record<string, number>>((acc, l) => {
    acc[l.context] = (acc[l.context] ?? 0) + 1;
    return acc;
  }, {});

  const columns: {
    key: string;
    label: string;
    sortValue?: (row: AuditLog) => string | number;
    render?: (row: AuditLog) => React.ReactNode;
  }[] = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortValue: (r) => r.timestamp,
      render: (r) => <span className="whitespace-nowrap">{r.timestamp.slice(0, 16).replace('T', ' ')}</span>
    },
    { key: 'action', label: 'Action', sortValue: (r) => r.action, render: (r) => <span className="font-mono text-[0.7rem]">{r.action}</span> },
    { key: 'resource', label: 'Resource', sortValue: (r) => r.resource },
    { key: 'context', label: 'Context', sortValue: (r) => r.context },
    {
      key: 'result',
      label: 'Result',
      sortValue: (r) => r.result,
      render: (r) => <Badge label={r.result} tone={toneForStatus(r.result)} />
    }
  ];

  return (
    <div className="space-y-5">
      <AuditEventHeader log={log} active={`/audit/${log.id}/actor`} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader title="Actor profile" subtitle="Identity associated with this event" />
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sentinel-500/25 bg-sentinel-500/10 text-base font-bold text-sentinel-300">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">{log.actor}</p>
                <div className="mt-2">
                  <Badge label={role} tone="slate" />
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-4 text-center">
              <div>
                <p className="text-lg font-semibold text-white">{events.length}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">Events</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{ips.length}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">IPs</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{Object.keys(contexts).length}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">Channels</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Recent events" subtitle={`Audit activity attributed to ${displayName}`} />
          <CardBody>
            <DataTable
              columns={columns}
              rows={events.map((e) => ({ ...e }))}
              searchable={false}
              pageSize={6}
              initialSort={{ key: 'timestamp', dir: 'desc' }}
            />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Authentication context" subtitle="Channels this actor operated through" />
          <CardBody>
            <ul className="divide-y divide-white/5">
              {Object.entries(contexts)
                .sort((a, b) => b[1] - a[1])
                .map(([ctx, count]) => (
                  <li key={ctx} className="flex items-center justify-between gap-4 py-3">
                    <span className="font-mono text-[0.7rem] text-slate-300">{ctx}</span>
                    <span className="text-xs text-slate-500">{count} event{count === 1 ? '' : 's'}</span>
                  </li>
                ))}
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="IP addresses" subtitle="Source addresses observed for this actor" />
          <CardBody>
            <ul className="divide-y divide-white/5">
              {ips.map((ip) => (
                <li key={ip} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-mono text-[0.7rem] text-slate-300">{ip}</span>
                  <Badge label="internal" tone="slate" />
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
