import { CheckCircle2, FileWarning, ShieldCheck, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentActions, incidentById, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const actions = incidentActions(inc);
  const done = actions.filter((a) => a.status === 'Done').length;
  const pct = Math.round((done / actions.length) * 100);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Remediation progress and closure state."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Closure Progress" value={`${pct}%`} icon={CheckCircle2} accent="green" />
        <StatCard label="Actions Done" value={done} icon={ShieldCheck} accent="sky" />
        <StatCard label="Actions Open" value={actions.length - done} icon={FileWarning} accent="amber" />
        <StatCard label="SLA" value={`${inc.slaHours}h`} icon={Timer} accent="violet" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Remediation status" subtitle="Tracked actions toward closure" />
          <CardBody className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-[0.65rem]">
                <span className="uppercase tracking-wider text-slate-500">Completed</span>
                <span className="font-semibold text-slate-300">{done} of {actions.length}</span>
              </div>
              <ProgressBar value={pct} color={pct === 100 ? 'bg-emerald-400' : pct >= 60 ? 'bg-amber-400' : 'bg-rose-400'} />
            </div>
            <div className="space-y-2">
              {actions.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white">{a.title}</p>
                    <p className="mt-0.5 text-[0.65rem] text-slate-500">{a.owner}</p>
                  </div>
                  <Badge label={a.status} tone={a.status === 'Done' ? 'green' : a.status === 'In Progress' ? 'amber' : 'sky'} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Resolution record" subtitle="Closure notes" />
          <CardBody className="space-y-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-xs font-semibold text-white">Outcome</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {inc.status === 'Resolved'
                  ? 'Remediation verified and enforcement restored. Post-incident review scheduled.'
                  : 'Remediation in progress. Incident remains open until all actions are verified.'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-xs font-semibold text-white">Post-incident review</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">Owner: Engineering · Due 7 days after closure</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}