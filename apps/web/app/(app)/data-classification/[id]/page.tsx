import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { ClassActivity, ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { catBadgeTone, catBarColor, fmt, resolveClass, toneForCategory } from '@/components/data-intel/derived';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  const taggedSources = dataSources.filter((s) => s.categories.some((c) => c.toLowerCase() === row.name.toLowerCase()));
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Overview" />
      <ClassHeader row={row} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Coverage" subtitle="Label propagation across systems" />
          <CardBody>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-white">{row.coverage}%</span>
              <div className="flex-1">
                <ProgressBar value={row.coverage} color={catBarColor(row.color)} />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">Systems tagged</p>
                <p className="mt-1 text-lg font-semibold text-white">{row.systems}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">Sources linked</p>
                <p className="mt-1 text-lg font-semibold text-white">{taggedSources.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="24h activity" subtitle="Detector performance" />
          <CardBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">Matches</p>
                <p className="mt-1 text-lg font-semibold text-white">{fmt(row.matched24h)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">Blocked</p>
                <p className="mt-1 text-lg font-semibold text-rose-300">{fmt(row.blocked24h)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge label={`Sensitivity S${row.sensitivity}`} tone={catBadgeTone(row.color)} />
              <Badge label={`${row.coverage}% coverage`} tone={row.coverage > 70 ? 'green' : 'amber'} />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Policy mapping" subtitle="Rules governing this label" />
          <CardBody className="space-y-3">
            {[
              { name: `${row.name} handling rule`, action: row.id === 'restricted' || row.id === 'public' ? 'Block' : 'Redact', status: 'Active' },
              { name: 'Gateway audit trail', action: 'Log', status: 'Active' },
              { name: 'Retention & deletion schedule', action: 'Require Approval', status: 'Active' }
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <p className="text-xs font-semibold text-white">{r.name}</p>
                  <p className="text-[0.65rem] text-slate-400">{r.action}</p>
                </div>
                <Badge label={r.status} tone="green" />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Sources carrying this label" subtitle="Connected systems with matching categories" />
          <CardBody className="space-y-3">
            {taggedSources.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">{s.name}</p>
                  <p className="text-[0.65rem] text-slate-400">{s.type} · {fmt(s.records)} records</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1">
                  {s.categories.map((c) => (
                    <Badge key={c} label={c} tone={toneForCategory(c)} />
                  ))}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        <ClassActivity row={row} />
      </div>
    </div>
  );
}