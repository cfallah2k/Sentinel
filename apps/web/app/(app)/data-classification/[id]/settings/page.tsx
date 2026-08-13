import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { resolveClass } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Settings" />
      <ClassHeader row={row} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Label settings" subtitle="Configuration for this classification level" />
          <CardBody className="space-y-3">
            {[
              { name: 'Auto-labeling', value: row.coverage > 70 ? 'Enabled' : 'Draft' },
              { name: 'Retention window', value: row.sensitivity >= 3 ? '24 months' : '12 months' },
              { name: 'Require approval for egress', value: row.sensitivity >= 4 ? 'Yes' : 'No' },
              { name: 'Notify on match', value: row.sensitivity >= 3 ? 'Security team' : 'Disabled' },
              { name: 'Audit level', value: 'Full payload metadata' }
            ].map((it) => (
              <div key={it.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-xs text-slate-400">{it.name}</span>
                <Badge label={it.value} tone={String(it.value).toLowerCase() === 'yes' || String(it.value).includes('Enabled') || String(it.value).includes('Full') ? 'green' : 'slate'} />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Data handling" subtitle="How this label is applied" />
          <CardBody className="space-y-4">
            <p className="text-xs leading-6 text-slate-400">
              {row.description} Payloads detected as {row.name} are evaluated against the {row.name.toLowerCase()} handling rule before any transmission to an AI system.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: 'Sensitivity', value: `S${row.sensitivity}` },
                { label: 'Systems', value: row.systems },
                { label: 'Coverage', value: `${row.coverage}%` },
                { label: 'Status', value: row.coverage > 70 ? 'Active' : 'Review' }
              ].map((it) => (
                <div key={it.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">{it.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{it.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}