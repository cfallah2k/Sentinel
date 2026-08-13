import { Database, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { sourceNav } from '@/components/registry/nav';
import { classificationCategories, dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Data classification for this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <Card>
        <CardHeader title="Declared Categories" subtitle="Classification applied to this source" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {source.categories.map((c) => {
              const cls = classificationCategories.find((cc) => cc.name === c);
              return (
                <div key={c} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: { emerald: '#34d399', sky: '#38bdf8', amber: '#fbbf24', rose: '#fb7185' }[cls?.color ?? 'sky'] ?? '#38bdf8' }} />
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">{c}</p>
                  </div>
                  <p className="mt-1 text-[0.65rem] text-slate-500">{cls?.description ?? 'Custom classification'}</p>
                  <p className="mt-1 text-[0.65rem] text-slate-400">Sensitivity {cls?.sensitivity ?? '—'} · {cls?.systems ?? 0} systems tagged</p>
                </div>
              );
            })}
            {source.categories.length === 0 ? <p className="text-xs text-slate-500">This source has not been classified yet.</p> : null}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Classification Catalog" subtitle="All available categories" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {classificationCategories.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: { emerald: '#34d399', sky: '#38bdf8', amber: '#fbbf24', rose: '#fb7185' }[c.color] }} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">{c.name}</p>
                    <p className="text-[0.65rem] text-slate-500">{c.description}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400">
                  <Database className="h-3 w-3" /> {c.systems}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}