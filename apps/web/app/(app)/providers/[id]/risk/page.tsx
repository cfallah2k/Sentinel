import { AlertTriangle, FileSearch, ShieldCheck, ShieldX } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { providerNav } from '@/components/registry/nav';
import { seededTake } from '@/components/registry/helpers';
import { providers, riskFindings } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const findings = seededTake(riskFindings, provider.id, 3);
  const openFindings = findings.filter((f) => f.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Risk posture and open findings for this provider."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Risk Level" value={provider.risk} icon={AlertTriangle} accent={provider.risk === 'Low' ? 'green' : provider.risk === 'Medium' ? 'amber' : 'rose'} />
        <StatCard label="Findings" value={findings.length} icon={FileSearch} accent="violet" />
        <StatCard label="Open Findings" value={openFindings} icon={ShieldX} accent="rose" />
        <StatCard label="Status" value={provider.status} icon={ShieldCheck} accent="sky" />
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