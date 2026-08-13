import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import AuditEventHeader from '@/components/governance/audit-header';
import { logById } from '@/components/governance/audit-helpers';
import { aiSystems, applications, auditLogs, incidents, models, policies, providers, reports, teamMembers, type AuditLog } from '@/lib/mock-data';

function registryEntry(rtype: string, rid: string) {
  switch (rtype) {
    case 'policy': {
      const p = policies.find((x) => x.id === rid);
      return p ? { name: p.name, status: p.status, detail: `v${p.version} · ${p.scope}` } : null;
    }
    case 'system': {
      const s = aiSystems.find((x) => x.id === rid);
      return s ? { name: s.name, status: s.status, detail: s.purpose } : null;
    }
    case 'app': {
      const a = applications.find((x) => x.id === rid);
      return a ? { name: a.name, status: a.status, detail: a.type } : null;
    }
    case 'provider': {
      const p = providers.find((x) => x.id === rid);
      return p ? { name: p.name, status: p.status, detail: p.type } : null;
    }
    case 'incident': {
      const i = incidents.find((x) => x.id === rid);
      return i ? { name: i.title, status: i.status, detail: i.severity } : null;
    }
    case 'user': {
      const u = teamMembers.find((x) => x.id === rid);
      return u ? { name: u.name, status: u.status, detail: u.role } : null;
    }
    case 'report': {
      const r = reports.find((x) => x.id === rid);
      return r ? { name: r.name, status: r.status, detail: r.type } : null;
    }
    default:
      return null;
  }
}

function relatedRefs(rtype: string, rid: string): { kind: string; id: string; name: string; status: string }[] {
  if (rtype === 'policy') {
    return incidents.filter((i) => i.policyId === rid).map((i) => ({ kind: 'Incident', id: i.id, name: i.title, status: i.status }));
  }
  if (rtype === 'system') {
    const sys = aiSystems.find((s) => s.id === rid);
    const refs: { kind: string; id: string; name: string; status: string }[] = applications
      .filter((a) => a.aiSystemIds.includes(rid))
      .map((a) => ({ kind: 'Application', id: a.id, name: a.name, status: a.status }));
    if (sys) {
      const prv = providers.find((p) => p.id === sys.providerId);
      const mdl = models.find((m) => m.id === sys.modelId);
      if (prv) refs.push({ kind: 'Provider', id: prv.id, name: prv.name, status: prv.status });
      if (mdl) refs.push({ kind: 'Model', id: mdl.id, name: mdl.name, status: mdl.status });
    }
    return refs;
  }
  if (rtype === 'app') {
    const app = applications.find((a) => a.id === rid);
    if (!app) return [];
    return app.aiSystemIds.map((sid) => {
      const sys = aiSystems.find((s) => s.id === sid);
      return { kind: 'AI System', id: sid, name: sys?.name ?? sid, status: sys?.status ?? 'Unknown' };
    });
  }
  if (rtype === 'provider') {
    return [
      ...aiSystems.filter((s) => s.providerId === rid).map((s) => ({ kind: 'AI System', id: s.id, name: s.name, status: s.status })),
      ...models.filter((m) => m.providerId === rid).map((m) => ({ kind: 'Model', id: m.id, name: m.name, status: m.status }))
    ];
  }
  if (rtype === 'incident') {
    const inc = incidents.find((i) => i.id === rid);
    if (!inc) return [];
    const sys = aiSystems.find((s) => s.id === inc.systemId);
    return [{ kind: 'AI System', id: inc.systemId, name: sys?.name ?? inc.systemId, status: sys?.status ?? 'Unknown' }];
  }
  if (rtype === 'user') {
    const u = teamMembers.find((x) => x.id === rid);
    if (!u) return [];
    return auditLogs.filter((l) => l.actor === u.email).map((l) => ({ kind: 'Event', id: l.id, name: l.action, status: l.result }));
  }
  return [];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = logById(id) ?? auditLogs[0];
  const [rtype, rid] = log.resource.split(':');
  const entry = registryEntry(rtype, rid);
  const refs = relatedRefs(rtype, rid);
  const events = auditLogs.filter((l) => l.resource === log.resource);

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
    { key: 'actor', label: 'Actor', sortValue: (r) => r.actor },
    { key: 'action', label: 'Action', sortValue: (r) => r.action, render: (r) => <span className="font-mono text-[0.7rem]">{r.action}</span> },
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
      <AuditEventHeader log={log} active={`/audit/${log.id}/resource`} />
      <Card>
        <CardHeader title="Resource detail" subtitle="Target object of this audit event" />
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sm font-bold text-sky-300">
                {rtype.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{entry?.name ?? log.resource}</p>
                <p className="mt-0.5 font-mono text-xs text-slate-400">{log.resource}</p>
              </div>
            </div>
            {entry ? <Badge label={entry.status} tone={toneForStatus(entry.status)} /> : <Badge label="unregistered" tone="slate" />}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-white/5 pt-5 sm:grid-cols-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Type</p>
              <p className="mt-1 text-sm text-white">{rtype}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Resource id</p>
              <p className="mt-1 font-mono text-sm text-white">{rid}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Detail</p>
              <p className="mt-1 text-sm text-slate-300">{entry?.detail ?? 'No registry entry for this resource'}</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Events touching this resource" subtitle={`${events.length} audit events reference ${log.resource}`} />
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
      <Card>
        <CardHeader title="Related references" subtitle="Registry cross-references for this resource" />
        <CardBody>
          {refs.length > 0 ? (
            <ul className="divide-y divide-white/5">
              {refs.map((r) => (
                <li key={`${r.kind}-${r.id}`} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Badge label={r.kind} tone="slate" />
                    <span className="truncate text-xs text-slate-200">{r.name}</span>
                    <span className="hidden font-mono text-[0.65rem] text-slate-500 sm:block">{r.id}</span>
                  </div>
                  <Badge label={r.status} tone={toneForStatus(r.status)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-4 text-center text-xs text-slate-500">No registry references found for this resource.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
