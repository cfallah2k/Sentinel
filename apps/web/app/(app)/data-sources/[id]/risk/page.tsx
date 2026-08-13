import { AlertTriangle, FileSearch, ShieldCheck, ShieldX } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { sourceNav } from '@/components/registry/nav';
import { seededTake } from '@/components/registry/helpers';
import { dataSources, riskFindings } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];
  const findings = seededTake(riskFindings, source.id, 3);
  const openFindings = findings.filter((f) => f.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Risk posture and open findings for this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Risk Level" value={source.risk} icon={AlertTriangle} accent={source.risk === 'Low' ? 'green' : source.risk === 'Medium' ? 'amber' : 'rose'} />
        <StatCard label="Sensitive Categories" value={source.categories.filter((c) => ['PII', 'Health', 'Financial', 'Biometric'].includes(c)).length} icon={ShieldCheck} accent="sky" />
        <StatCard label="Findings" value={findings.length} icon={FileSearch} accent="violet" />
        <StatCard label="Open Findings" value={openFindings} icon={ShieldX} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Risk Findings" subtitle="Deterministic assessment view" />
        <CardBody className="space-y-3">
          {findings.map((f) => (
            <div key={f.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">{f.title}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">
                  {f.id} · {f.owner} · due {f.due}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={f.severity} tone={toneForStatus(f.severity)} />
                <Badge label={f.status} tone={toneForStatus(f.status)} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}