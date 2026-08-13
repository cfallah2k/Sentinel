import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody } from '@/components/ui/card';
import { Metric } from '@/components/ui/progress';
import { ModuleNav } from './module-nav';
import { systemById, systemName } from './risk-helpers';
import type { RiskAssessment } from '@/lib/mock-data';

export function assessmentNavItems(id: string) {
  return [
    { href: `/risk/assessments/${id}`, label: 'Overview' },
    { href: `/risk/assessments/${id}/questions`, label: 'Questions' },
    { href: `/risk/assessments/${id}/evidence`, label: 'Evidence' },
    { href: `/risk/assessments/${id}/findings`, label: 'Findings' },
    { href: `/risk/assessments/${id}/actions`, label: 'Actions' },
    { href: `/risk/assessments/${id}/report`, label: 'Report' }
  ];
}

export default function AssessmentHeader({ assessment, active }: { assessment: RiskAssessment; active: string }) {
  const system = systemById(assessment.systemId);
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Governance · Risk</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {systemName(assessment.systemId)}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Assessment {assessment.id} · {system?.type} · owned by {system?.owner} · {system?.environment} environment
        </p>
      </div>
      <ModuleNav items={assessmentNavItems(assessment.id)} active={active} />
      <Card>
        <CardBody className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Status</p>
            <div className="mt-2">
              <Badge label={assessment.status} tone={toneForStatus(assessment.status)} />
            </div>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Severity</p>
            <div className="mt-2">
              <Badge label={assessment.severity} tone={toneForStatus(assessment.severity)} />
            </div>
          </div>
          <Metric label="Residual score" value={assessment.score} suffix="/ 100" />
          <Metric label="Findings" value={assessment.findings} />
          <Metric label="Assessor" value={assessment.assessor} />
          <Metric label="Started" value={assessment.startedAt} />
          <Metric label="Completed" value={assessment.completedAt ?? '—'} />
        </CardBody>
      </Card>
    </div>
  );
}