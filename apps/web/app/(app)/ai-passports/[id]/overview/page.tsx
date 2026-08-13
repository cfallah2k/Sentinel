import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PassportHeader, PassportMetrics, PassportSubnav, PassportCertifications } from '@/components/data-intel/passport-shared';
import { PassportActivity } from '@/components/data-intel/passport-shared';
import { PassportDataTable } from '@/components/data-intel/passport-shared';
import { resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Overview" />
      <PassportHeader p={p} />
      <PassportMetrics p={p} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Declaration summary" subtitle="What this passport certifies" />
          <CardBody>
            <p className="text-sm leading-6 text-slate-300">{p.purpose}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: 'Data types', value: p.dataTypes.length },
                { label: 'Certifications', value: p.certifications.length },
                { label: 'Retention', value: p.retention },
                { label: 'Compliance', value: `${p.complianceScore}%` }
              ].map((it) => (
                <div key={it.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">{it.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{it.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <PassportCertifications p={p} />
      </div>
      <Card>
        <CardHeader title="Data inventory" subtitle="Declared data types" />
        <CardBody>
          <PassportDataTable p={p} />
        </CardBody>
      </Card>
      <PassportActivity p={p} />
    </div>
  );
}