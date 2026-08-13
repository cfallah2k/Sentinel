import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PassportDataTable, PassportHeader, PassportMetrics, PassportSubnav, PassportCertifications } from '@/components/data-intel/passport-shared';
import { PassportActivity } from '@/components/data-intel/passport-shared';
import { resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Overview" />
      <PassportHeader p={p} />
      <PassportMetrics p={p} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Purpose & scope" subtitle="Why this system processes data" />
          <CardBody>
            <p className="text-sm leading-6 text-slate-300">{p.purpose}</p>
            <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {[
                { label: 'Type', value: p.type },
                { label: 'Environment', value: p.environment },
                { label: 'Oversight', value: p.oversight },
                { label: 'Owner', value: p.owner },
                { label: 'Version', value: p.version },
                { label: 'Issued', value: p.approvedAt }
              ].map((it) => (
                <div key={it.label} className="bg-slate-950/90 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
                  <p className="mt-1 text-xs text-slate-200">{it.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <PassportCertifications p={p} />
      </div>
      <Card>
        <CardHeader title="Data inventory" subtitle="Data types this system processes and how they are handled" />
        <CardBody>
          <PassportDataTable p={p} />
        </CardBody>
      </Card>
      <PassportActivity p={p} />
    </div>
  );
}