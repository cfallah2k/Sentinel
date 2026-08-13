import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PassportHeader, PassportSubnav, PassportModelCard } from '@/components/data-intel/passport-shared';
import { modelForPassport, resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const m = modelForPassport(p);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Models" />
      <PassportHeader p={p} />
      <PassportModelCard p={p} />
      <Card>
        <CardHeader title="Model details" subtitle="Capabilities registered for this deployment" />
        <CardBody>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
            {[
              { label: 'Model ID', value: p.modelId },
              { label: 'Name', value: m?.name ?? '—' },
              { label: 'Modality', value: m?.modality ?? '—' },
              { label: 'Context window', value: m?.contextWindow ?? '—' },
              { label: 'Pricing', value: m?.pricing ?? '—' },
              { label: 'Status', value: m?.status ?? '—' }
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
        <CardHeader title="Model risk" subtitle="Approval state for this model" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            <Badge label={m?.status ?? '—'} tone={m?.status === 'Approved' ? 'green' : 'rose'} />
            <Badge label={m?.risk ?? '—'} tone={m?.risk === 'High' ? 'rose' : m?.risk === 'Medium' ? 'amber' : 'blue'} />
            <Badge label={p.type} tone="slate" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}