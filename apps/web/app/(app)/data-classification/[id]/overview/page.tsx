import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar, Metric } from '@/components/ui/progress';
import { ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { ClassActivity } from '@/components/data-intel/classification-shared';
import { catBarColor, fmt, resolveClass } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Overview" />
      <ClassHeader row={row} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Coverage" subtitle="Label propagation" />
          <CardBody>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold text-white">{row.coverage}%</span>
              <div className="flex-1">
                <ProgressBar value={row.coverage} color={catBarColor(row.color)} />
              </div>
            </div>
            <div className="mt-5 space-y-4">
              <Metric label="Systems tagged" value={row.systems} />
              <Metric label="Matches 24h" value={fmt(row.matched24h)} />
              <Metric label="Blocked 24h" value={fmt(row.blocked24h)} />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Label definition" subtitle="Controls tied to this level" />
          <CardBody className="space-y-3">
            {[
              { name: 'Access', value: row.sensitivity >= 3 ? 'Restricted distribution' : 'Org-wide access' },
              { name: 'Retention', value: row.sensitivity >= 4 ? '24 months' : '12 months' },
              { name: 'Transmission', value: row.sensitivity >= 3 ? 'Requires policy match' : 'Allowed with audit' },
              { name: 'Human review', value: row.sensitivity >= 4 ? 'Required for egress' : 'On demand' }
            ].map((it) => (
              <div key={it.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-xs text-slate-400">{it.name}</span>
                <span className="text-right text-xs font-semibold text-white">{it.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Gateway behavior" subtitle="Decisions applied to this label" />
          <CardBody className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge label={row.sensitivity >= 3 ? 'Redact' : 'Log'} tone={row.sensitivity >= 3 ? 'amber' : 'blue'} />
              <Badge label="Audit" tone="slate" />
              <Badge label={`S${row.sensitivity}`} tone={catBarColor(row.color).includes('emerald') ? 'green' : catBarColor(row.color).includes('sky') ? 'blue' : catBarColor(row.color).includes('amber') ? 'amber' : 'rose'} />
            </div>
            <p className="text-xs leading-5 text-slate-400">
              Payloads carrying {row.name} data are evaluated against active policies before transmission, and every decision is written to the audit trail.
            </p>
          </CardBody>
        </Card>
      </div>
      <ClassActivity row={row} />
    </div>
  );
}