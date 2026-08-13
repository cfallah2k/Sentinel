import { AlertTriangle, Crosshair, Radar, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems, systemMeta } from '@/components/governance/risk-helpers';
import { aiSystems, riskFindings, riskAssessments } from '@/lib/mock-data';

export default function Page() {
  const systems = aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical');
  const systemRows = systems.map((s) => ({ ...s }));
  const systemColumns: Column<(typeof systemRows)[number]>[] = [
    { key: 'name', label: 'System', sortValue: (r) => r.name },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'environment', label: 'Environment', sortValue: (r) => r.environment },
    { key: 'dataCategories', label: 'Data categories', sortValue: (r) => r.dataCategories.join(', ') },
    { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h }
  ];
  const findings = riskFindings.filter((f) => f.severity === 'Critical' || f.status !== 'Resolved');
  const findingRows = findings.map((f) => ({
    ...f,
    system: systemMeta(riskAssessments.find((a) => a.id === f.assessmentId)?.systemId ?? '').name
  }));
  const findingColumns: Column<(typeof findingRows)[number]>[] = [
    { key: 'id', label: 'Finding', sortValue: (r) => r.id },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'system', label: 'System', sortValue: (r) => r.system },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'due', label: 'Due', sortValue: (r) => r.due }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="High Risk Register"
        description="Consolidated register of High and Critical risk systems plus open and critical findings requiring remediation."
      />
      <ModuleNav items={riskNavItems} active="/risk/high-risk" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High risk systems" value={systems.length} delta={25} deltaLabel="of registry" icon={Radar} accent="rose" />
        <StatCard label="Critical systems" value={systems.filter((s) => s.risk === 'Critical').length} delta={0} deltaLabel="unchanged" icon={ShieldAlert} accent="red" />
        <StatCard label="Critical findings" value={riskFindings.filter((f) => f.severity === 'Critical').length} delta={0} deltaLabel="unchanged" icon={Crosshair} accent="rose" />
        <StatCard label="Open findings" value={riskFindings.filter((f) => f.status !== 'Resolved').length} delta={-20} deltaLabel="this month" icon={AlertTriangle} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Systems at risk" subtitle="High and Critical risk systems" />
        <CardBody>
          <DataTable columns={systemColumns} rows={systemRows} searchPlaceholder="Search systems..." initialSort={{ key: 'risk', dir: 'desc' }} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Open & critical findings" subtitle="Remediation items across the register" />
        <CardBody>
          <DataTable columns={findingColumns} rows={findingRows} searchPlaceholder="Search findings..." initialSort={{ key: 'severity', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}