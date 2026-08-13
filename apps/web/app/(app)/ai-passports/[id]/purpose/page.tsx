import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { AttributeGrid } from '@/components/data-intel/flow-detail';
import { resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Purpose" />
      <PassportHeader p={p} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Purpose statement" subtitle="Declared by the system owner" />
          <CardBody>
            <p className="text-sm leading-6 text-slate-300">{p.purpose}</p>
            <div className="mt-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Scope</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">
                This passport covers all gateway traffic between {p.name} and its approved providers. Any change to the declared purpose requires a new version of this passport.
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Use cases" subtitle="Approved processing activities" />
          <CardBody className="space-y-3">
            {[
              { name: 'Primary processing', note: p.purpose },
              { name: 'Inference', note: `Model: ${p.modelName}` },
              { name: 'Data enrichment', note: 'Structured records appended to outputs' },
              { name: 'Evaluation', note: 'Offline scoring against holdout sets' }
            ].map((u, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">{u.name}</p>
                  <Badge label="Approved" tone="green" />
                </div>
                <p className="mt-1 text-[0.65rem] text-slate-400">{u.note}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Purpose attributes" subtitle="Registration metadata" />
        <CardBody>
          <AttributeGrid
            items={[
              { label: 'Owner', value: p.owner },
              { label: 'Oversight', value: p.oversight },
              { label: 'Environment', value: p.environment },
              { label: 'Version', value: p.version },
              { label: 'Issued', value: p.approvedAt },
              { label: 'Status', value: p.status }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}