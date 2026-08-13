import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { PassportHeader, PassportSubnav, PassportControlsTable } from '@/components/data-intel/passport-shared';
import { passportControls, resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const controls = passportControls(p);
  const implemented = controls.filter((c) => c.status === 'Implemented').length;
  const rate = Math.round((implemented / controls.length) * 100);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Controls" />
      <PassportHeader p={p} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Control coverage" subtitle="Controls declared in this passport" />
          <CardBody>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-white">{rate}%</span>
              <div className="flex-1">
                <ProgressBar value={rate} color={rate > 75 ? 'bg-emerald-400' : rate > 50 ? 'bg-amber-400' : 'bg-rose-400'} />
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              {implemented} of {controls.length} controls implemented for {p.name}.
            </p>
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Control summary" subtitle="Distribution by state" />
          <CardBody>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Implemented', value: controls.filter((c) => c.status === 'Implemented').length, tone: 'text-emerald-300' },
                { label: 'Partially implemented', value: controls.filter((c) => c.status === 'Partially Implemented').length, tone: 'text-amber-300' },
                { label: 'At risk', value: controls.filter((c) => c.status === 'At Risk' || c.status === 'In Review').length, tone: 'text-rose-300' }
              ].map((it) => (
                <div key={it.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className={`text-2xl font-semibold ${it.tone}`}>{it.value}</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-slate-500">{it.label}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Declared controls" subtitle="Evidence-backed safeguards" />
        <CardBody>
          <PassportControlsTable p={p} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Control notes" subtitle="Additional declarations" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            <Badge label={p.oversight} tone="blue" />
            <Badge label={`${p.complianceScore}% compliance`} tone={p.complianceScore > 70 ? 'green' : 'amber'} />
            <Badge label={p.retention} tone="slate" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}