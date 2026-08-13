import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { providerForPassport, resolvePassport, fmt } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const prv = providerForPassport(p);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Providers" />
      <PassportHeader p={p} />
      <Card>
        <CardHeader title="Provider" subtitle="Endpoint serving this system" />
        <CardBody>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10 text-sm font-bold text-violet-300">
              {prv?.name.slice(0, 2).toUpperCase() ?? '—'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{prv?.name ?? 'Unassigned provider'}</p>
              <p className="text-xs text-slate-400">{prv?.type} · {prv?.region}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
            {[
              { label: 'Provider ID', value: p.providerId },
              { label: 'Type', value: prv?.type ?? '—' },
              { label: 'Region', value: prv?.region ?? '—' },
              { label: 'Models hosted', value: prv?.models ?? 0 },
              { label: 'Requests 24h', value: fmt(prv?.requests24h ?? 0) },
              { label: 'Latency', value: prv ? `${prv.latencyMs} ms` : '—' },
              { label: 'Uptime', value: prv ? `${prv.uptime.toFixed(1)}%` : '—' },
              { label: 'Status', value: prv?.status ?? '—' }
            ].map((it) => (
              <div key={it.label} className="bg-slate-950/90 px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
                <p className="mt-1 text-xs text-slate-200">{it.value}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Provider status" subtitle="Registration and risk" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            <Badge label={prv?.status ?? '—'} tone={prv?.status === 'Approved' ? 'green' : prv?.status === 'Pending' ? 'amber' : 'rose'} />
            <Badge label={prv?.risk ?? '—'} tone={prv?.risk === 'High' ? 'rose' : prv?.risk === 'Medium' ? 'amber' : 'blue'} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}