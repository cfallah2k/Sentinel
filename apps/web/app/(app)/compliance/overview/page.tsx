import { AlertTriangle, CheckCircle2, FileText, Scale, ShieldCheck } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import FrameworkCard from '@/components/governance/framework-card';
import { complianceControls, complianceEvidence, complianceFrameworks, complianceGaps } from '@/lib/mock-data';

export default function Page() {
  const totalControls = complianceFrameworks.reduce((s, f) => s + f.controls, 0);
  const passedControls = complianceFrameworks.reduce((s, f) => s + f.passed, 0);
  const implemented = Math.round((passedControls / totalControls) * 100);
  const openGaps = complianceGaps.filter((g) => g.status === 'Open').length;
  const criticalGaps = complianceGaps.filter((g) => g.severity === 'Critical').length;
  const onTrack = complianceFrameworks.filter((f) => f.status === 'On Track').length;

  const recentControls = [...complianceControls].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 6);
  const controlColumns: Column<(typeof recentControls)[number]>[] = [
    { key: 'code', label: 'Code', sortValue: (r) => r.code, render: (r) => <span className="font-medium text-sky-300">{r.code}</span> },
    { key: 'name', label: 'Control', sortValue: (r) => r.name },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'updated', label: 'Updated', sortValue: (r) => r.updated }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Overview"
        description="Program-wide readiness across frameworks, control implementation, evidence collection, gaps and upcoming audits."
        active="/compliance/overview"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Frameworks" value={complianceFrameworks.length} sub={`${onTrack} on track`} icon={Scale} accent="violet" />
        <StatCard label="Controls implemented" value={`${implemented}%`} sub={`${passedControls} of ${totalControls} passed`} icon={ShieldCheck} accent="sky" />
        <StatCard label="Evidence items" value={complianceEvidence.length} sub="collected across standards" icon={FileText} accent="green" />
        <StatCard label="Open gaps" value={openGaps} sub={`${criticalGaps} critical`} icon={AlertTriangle} accent="amber" />
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Framework coverage</h2>
            <p className="mt-0.5 text-xs text-slate-500">Implementation status across all tracked standards</p>
          </div>
          <Badge label={`${complianceFrameworks.length} active`} tone="blue" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {complianceFrameworks.map((f) => (
            <FrameworkCard key={f.id} framework={f} />
          ))}
        </div>
      </div>
      <Card>
        <CardHeader title="Recently updated controls" subtitle="Latest control implementation activity" action={<Badge label="Live register" tone="blue" />} />
        <CardBody>
          <DataTable columns={controlColumns} rows={recentControls} searchPlaceholder="Search controls..." />
        </CardBody>
      </Card>
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-400">
        <CheckCircle2 className="h-4 w-4 text-sentinel-300" />
        Evidence is automatically linked to controls as the gateway records policy decisions, data flows and classification events.
      </div>
    </div>
  );
}
