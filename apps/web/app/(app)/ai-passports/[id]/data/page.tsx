import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PassportHeader, PassportSubnav, PassportDataTable } from '@/components/data-intel/passport-shared';
import { dataInventory, resolvePassport, sensitivityLabel } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const inventory = dataInventory(p);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Data" />
      <PassportHeader p={p} />
      <Card>
        <CardHeader title="Data inventory" subtitle={`${inventory.length} declared data types`} />
        <CardBody>
          <PassportDataTable p={p} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Data types declared" subtitle="Categories registered in this passport" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {p.dataTypes.map((d) => (
              <span key={d} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">{d}</span>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Sensitivity summary" subtitle="Classification of processed data" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {['Public', 'Internal', 'Confidential', 'Restricted'].map((lvl) => {
              const count = inventory.filter((d) => sensitivityLabel(d.sensitivity) === lvl).length;
              return (
                <div key={lvl} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">{lvl}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{count}</p>
                  <Badge label={lvl} tone={lvl === 'Restricted' ? 'rose' : lvl === 'Confidential' ? 'amber' : lvl === 'Internal' ? 'blue' : 'green'} />
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}