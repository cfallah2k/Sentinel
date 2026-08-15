import { CheckCircle2, FileText, ShieldCheck, XCircle } from 'lucide-react';
import { ComplianceFrameworkHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import ExportCsvButton from '@/components/ui/export-button';
import { complianceControls, complianceEvidence, complianceFrameworks, complianceGaps } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const framework = complianceFrameworks.find((f) => f.id === id);
  if (!framework) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Framework not found</p>
          <p className="mt-1 text-xs text-slate-500">No framework exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }

  const controls = complianceControls.filter((c) => c.frameworkId === id);
  const evidence = complianceEvidence.filter((e) => controls.some((c) => c.id === e.controlId));
  const openGaps = complianceGaps.filter((g) => g.frameworkId === id && g.status === 'Open').length;

  const summaryRows = [
    { id: framework.id, name: framework.name, standard: framework.standard, status: framework.status, progress: framework.progress, controls: framework.controls, passed: framework.passed, failed: framework.failed, evidence: framework.evidence, gaps: framework.gaps, nextAudit: framework.nextAudit }
  ];

  return (
    <div className="space-y-8">
      <ComplianceFrameworkHeader framework={framework} active={`/compliance/frameworks/${id}/report`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Implementation" value={`${framework.progress}%`} sub="overall posture" icon={ShieldCheck} accent="sky" />
        <StatCard label="Evidence" value={evidence.length} sub={`${framework.evidence} across standard`} icon={FileText} accent="green" />
        <StatCard label="Failed controls" value={framework.failed} sub="need remediation" icon={XCircle} accent="rose" />
        <StatCard label="Open gaps" value={openGaps} sub={`${framework.gaps} total tracked`} icon={CheckCircle2} accent="amber" />
      </div>
      <Card>
        <CardHeader
          title="Framework report"
          subtitle={`Readiness snapshot for ${framework.name} (${framework.standard})`}
          action={
            <ExportCsvButton
              label="Export report"
              filename={`report-${framework.id}`}
              rows={summaryRows.map((r) => ({ name: r.name, standard: r.standard, status: r.status, progress: `${r.progress}%`, controls: r.controls, passed: r.passed, failed: r.failed, evidence: r.evidence, gaps: r.gaps, nextAudit: r.nextAudit }))}
            />
          }
        />
        <CardBody>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Coverage vs controls</span>
            <span className="font-semibold text-white">{framework.progress}%</span>
          </div>
          <ProgressBar
            value={framework.progress}
            color={framework.status === 'Behind' ? 'bg-rose-400' : framework.status === 'At Risk' ? 'bg-amber-400' : 'bg-sky-400'}
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {[
              { label: 'Controls', value: framework.controls },
              { label: 'Passed', value: framework.passed },
              { label: 'Failed', value: framework.failed },
              { label: 'Evidence', value: framework.evidence },
              { label: 'Gaps', value: framework.gaps },
              { label: 'Next audit', value: framework.nextAudit }
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{s.label}</p>
                <p className="mt-1.5 text-lg font-semibold text-white">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Badge label={framework.status} tone={toneForStatus(framework.status)} />
            <p className="text-xs text-slate-500">Generated {new Date().toISOString().slice(0, 10)} · evidence verified against the control register</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
