import Link from 'next/link';
import { AlertTriangle, BarChart3, CheckCircle2, FileText, ShieldCheck, Activity, Layers, Scale } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { BarSeries, DonutChart } from '@/components/ui/charts';
import { ProgressBar } from '@/components/ui/progress';
import {
  riskAssessments,
  incidents,
  policies,
  complianceFrameworks,
  complianceGaps,
  usageByApp,
  usageByProvider,
  approvals,
  aiSystems,
  reports
} from '@/lib/mock-data';
import { systemName, riskDonutData, openFindingsCount, criticalFindingsCount, highRiskSystemsCount, avgResidualRisk } from './risk-helpers';
import type { Report } from '@/lib/mock-data';

function IncidentSeverityDonut() {
  const order = ['Critical', 'High', 'Medium', 'Low'] as const;
  return (
    <DonutChart
      data={order.map((s) => ({ name: s, value: incidents.filter((i) => i.severity === s).length })).filter((d) => d.value > 0)}
    />
  );
}

function RiskPreview() {
  const rows = riskAssessments.map((a) => ({ ...a, system: systemName(a.systemId) }));
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High risk systems" value={highRiskSystemsCount()} delta={25} deltaLabel="of registry" icon={AlertTriangle} accent="rose" />
        <StatCard label="Open findings" value={openFindingsCount()} delta={-12} deltaLabel="this month" icon={Activity} accent="amber" />
        <StatCard label="Critical findings" value={criticalFindingsCount()} delta={0} deltaLabel="unchanged" icon={ShieldCheck} accent="rose" />
        <StatCard label="Avg residual risk" value={avgResidualRisk()} delta={-6} deltaLabel="vs last quarter" icon={Layers} accent="sky" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Assessments" subtitle="Registered systems with residual scores" />
          <CardBody>
            <DataTable
              searchable={false}
              pageSize={6}
              rows={rows}
              columns={[
                { key: 'system', label: 'System' },
                { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
                { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(String(r.severity)) },
                { key: 'score', label: 'Residual' },
                { key: 'assessor', label: 'Assessor' },
                { key: 'startedAt', label: 'Started' }
              ] as Column<(typeof rows)[number]>[]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk distribution" subtitle="Systems by risk level" />
          <CardBody>
            <DonutChart data={riskDonutData()} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function IncidentsPreview() {
  const rows = incidents.map((i) => ({ ...i }));
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Incidents" value={incidents.length} delta={9} deltaLabel="this month" icon={AlertTriangle} accent="rose" />
        <StatCard label="Open" value={incidents.filter((i) => i.status === 'Open').length} delta={0} deltaLabel="unchanged" icon={Activity} accent="amber" />
        <StatCard label="Critical" value={incidents.filter((i) => i.severity === 'Critical').length} delta={33} deltaLabel="of total" icon={ShieldCheck} accent="rose" />
        <StatCard label="Resolved" value={incidents.filter((i) => i.status === 'Resolved').length} delta={50} deltaLabel="resolution rate" icon={CheckCircle2} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Incident register" subtitle="All incidents with severity and status" />
          <CardBody>
            <DataTable
              searchable={false}
              pageSize={6}
              rows={rows}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Title' },
                { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(String(r.severity)) },
                { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
                { key: 'assignee', label: 'Assignee' },
                { key: 'openedAt', label: 'Opened' }
              ] as Column<(typeof rows)[number]>[]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Severity mix" subtitle="Incidents by severity" />
          <CardBody>
            <IncidentSeverityDonut />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function PolicyPreview() {
  const rows = policies.map((p) => ({ ...p }));
  const violations = policies.reduce((sum, p) => sum + p.violations, 0);
  const enforcements = policies.reduce((sum, p) => sum + p.enforcements, 0);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active policies" value={policies.filter((p) => p.status === 'Active').length} delta={12} deltaLabel="this quarter" icon={ShieldCheck} accent="green" />
        <StatCard label="Draft" value={policies.filter((p) => p.status === 'Draft').length} delta={100} deltaLabel="new" icon={FileText} accent="amber" />
        <StatCard label="Violations" value={violations} delta={-8} deltaLabel="vs last month" icon={AlertTriangle} accent="rose" />
        <StatCard label="Enforcements" value={enforcements.toLocaleString()} delta={5} deltaLabel="this week" icon={BarChart3} accent="sky" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Policy register" subtitle="Active policy configurations" />
          <CardBody>
            <DataTable
              searchable={false}
              pageSize={6}
              rows={rows}
              columns={[
                { key: 'name', label: 'Policy' },
                { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
                { key: 'version', label: 'Version' },
                { key: 'violations', label: 'Violations' },
                { key: 'enforcements', label: 'Enforcements' },
                { key: 'updatedAt', label: 'Updated' }
              ] as Column<(typeof rows)[number]>[]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Violations by policy" subtitle="30-day enforcement failures" />
          <CardBody>
            <BarSeries data={policies.map((p) => ({ name: p.name.split(' ').slice(0, 3).join(' '), violations: p.violations }))} dataKey="violations" color="#38bdf8" height={220} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function CompliancePreview() {
  const rows = complianceGaps.map((g) => ({ ...g }));
  const avgProgress = Math.round(complianceFrameworks.reduce((sum, f) => sum + f.progress, 0) / complianceFrameworks.length);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Frameworks" value={complianceFrameworks.length} delta={1} deltaLabel="added this year" icon={Scale} accent="violet" />
        <StatCard label="Avg implementation" value={`${avgProgress}%`} delta={6} deltaLabel="vs last quarter" icon={CheckCircle2} accent="green" />
        <StatCard label="Open gaps" value={complianceGaps.length} delta={20} deltaLabel="needs attention" icon={AlertTriangle} accent="amber" />
        <StatCard label="Evidence items" value={complianceFrameworks.reduce((sum, f) => sum + f.evidence, 0)} delta={14} deltaLabel="uploaded" icon={FileText} accent="sky" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader title="Framework progress" subtitle="Implementation by standard" />
          <CardBody className="space-y-4">
            {complianceFrameworks.map((f) => (
              <div key={f.id}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-300">{f.name}</span>
                  <span className="font-semibold text-white">{f.progress}%</span>
                </div>
                <ProgressBar value={f.progress} color={f.status === 'Behind' ? 'bg-rose-400' : f.status === 'At Risk' ? 'bg-amber-400' : 'bg-sky-400'} />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Gap register" subtitle="Open compliance gaps" />
          <CardBody>
            <DataTable
              searchable={false}
              pageSize={6}
              rows={rows}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Gap' },
                { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(String(r.severity)) },
                { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
                { key: 'owner', label: 'Owner' },
                { key: 'due', label: 'Due' }
              ] as Column<(typeof rows)[number]>[]}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function UsagePreview() {
  const rows = usageByApp.map((u) => ({ ...u }));
  const totalRequests = usageByApp.reduce((sum, u) => sum + u.requests, 0);
  const totalTokens = usageByApp.reduce((sum, u) => sum + u.tokens, 0);
  const totalCost = usageByProvider.reduce((sum, u) => sum + u.cost, 0);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests 24h" value={totalRequests.toLocaleString()} delta={7} deltaLabel="vs yesterday" icon={BarChart3} accent="sky" />
        <StatCard label="Tokens 24h" value={totalTokens.toLocaleString()} delta={12} deltaLabel="vs yesterday" icon={Activity} accent="violet" />
        <StatCard label="Estimated cost" value={`$${totalCost.toLocaleString()}`} delta={4} deltaLabel="this month" icon={FileText} accent="amber" />
        <StatCard label="Providers" value={usageByProvider.length} delta={0} deltaLabel="unchanged" icon={Layers} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Usage by application" subtitle="Requests and tokens per application" />
          <CardBody>
            <DataTable
              searchable={false}
              pageSize={6}
              rows={rows}
              columns={[
                { key: 'name', label: 'Application' },
                { key: 'requests', label: 'Requests' },
                { key: 'tokens', label: 'Tokens' },
                { key: 'cost', label: 'Cost', render: (r) => <span>${String(r.cost)}</span> }
              ] as Column<(typeof rows)[number]>[]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Spend by provider" subtitle="Estimated monthly cost" />
          <CardBody>
            <BarSeries data={usageByProvider.map((u) => ({ name: u.name, cost: u.cost }))} dataKey="cost" color="#a78bfa" height={220} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function GovernancePreview() {
  const rows = aiSystems.map((s) => ({ ...s }));
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI systems" value={aiSystems.length} delta={2} deltaLabel="registered this month" icon={Layers} accent="sky" />
        <StatCard label="Approved" value={aiSystems.filter((s) => s.status === 'Approved').length} delta={9} deltaLabel="of registry" icon={CheckCircle2} accent="green" />
        <StatCard label="High / critical risk" value={highRiskSystemsCount()} delta={25} deltaLabel="of registry" icon={AlertTriangle} accent="rose" />
        <StatCard label="Pending approvals" value={approvals.filter((a) => a.status === 'Pending').length} delta={0} deltaLabel="awaiting decision" icon={FileText} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="AI registry" subtitle="All registered AI systems" />
          <CardBody>
            <DataTable
              searchable={false}
              pageSize={6}
              rows={rows}
              columns={[
                { key: 'name', label: 'System' },
                { key: 'type', label: 'Type' },
                { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
                { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(String(r.risk)) },
                { key: 'owner', label: 'Owner' },
                { key: 'requests24h', label: 'Req / 24h' }
              ] as Column<(typeof rows)[number]>[]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk distribution" subtitle="Systems by risk level" />
          <CardBody>
            <DonutChart data={riskDonutData()} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function DefaultPreview() {
  const rows = reports.map((r) => ({ ...r }));
  return (
    <Card>
      <CardHeader title="All reports" subtitle="Complete report inventory" />
      <CardBody>
        <DataTable
          searchable={false}
          pageSize={6}
          rows={rows}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'type', label: 'Type' },
            { key: 'schedule', label: 'Schedule', tone: (r) => toneForStatus(String(r.schedule)) },
            { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
            { key: 'lastRun', label: 'Last run' }
          ] as Column<(typeof rows)[number]>[]}
        />
      </CardBody>
    </Card>
  );
}

export function ReportPreview({ report }: { report: Report }) {
  if (report.type === 'Risk') return <RiskPreview />;
  if (report.type === 'Incidents') return <IncidentsPreview />;
  if (report.type === 'Policy') return <PolicyPreview />;
  if (report.type === 'Compliance') return <CompliancePreview />;
  if (report.type === 'Usage') return <UsagePreview />;
  if (report.type === 'Governance' || report.type === 'Executive') return <GovernancePreview />;
  return <DefaultPreview />;
}

export function ReportDataView({ report }: { report: Report }) {
  const t = report.type;
  if (t === 'Risk' || t === 'Governance' || t === 'Executive') {
    const rows = aiSystems.map((s) => ({ ...s }));
    return (
      <DataTable
        rows={rows}
        columns={[
          { key: 'name', label: 'System' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
          { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(String(r.risk)) },
          { key: 'owner', label: 'Owner' },
          { key: 'environment', label: 'Environment' },
          { key: 'requests24h', label: 'Req / 24h' },
          { key: 'blocked24h', label: 'Blocked' }
        ] as Column<(typeof rows)[number]>[]}
      />
    );
  }
  if (t === 'Incidents') {
    const rows = incidents.map((i) => ({ ...i }));
    return (
      <DataTable
        rows={rows}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(String(r.severity)) },
          { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
          { key: 'type', label: 'Type' },
          { key: 'assignee', label: 'Assignee' },
          { key: 'openedAt', label: 'Opened' },
          { key: 'slaHours', label: 'SLA (h)' }
        ] as Column<(typeof rows)[number]>[]}
      />
    );
  }
  if (t === 'Policy') {
    const rows = policies.map((p) => ({ ...p }));
    return (
      <DataTable
        rows={rows}
        columns={[
          { key: 'name', label: 'Policy' },
          { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
          { key: 'version', label: 'Version' },
          { key: 'scope', label: 'Scope' },
          { key: 'violations', label: 'Violations' },
          { key: 'enforcements', label: 'Enforcements' },
          { key: 'updatedAt', label: 'Updated' }
        ] as Column<(typeof rows)[number]>[]}
      />
    );
  }
  if (t === 'Compliance') {
    const rows = complianceGaps.map((g) => ({ ...g }));
    return (
      <DataTable
        rows={rows}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Gap' },
          { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(String(r.severity)) },
          { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
          { key: 'owner', label: 'Owner' },
          { key: 'due', label: 'Due' }
        ] as Column<(typeof rows)[number]>[]}
      />
    );
  }
  if (t === 'Usage') {
    const rows = usageByApp.map((u) => ({ ...u }));
    return (
      <DataTable
        rows={rows}
        columns={[
          { key: 'name', label: 'Application' },
          { key: 'requests', label: 'Requests' },
          { key: 'tokens', label: 'Tokens' },
          { key: 'cost', label: 'Cost', render: (r) => <span>${String(r.cost)}</span> }
        ] as Column<(typeof rows)[number]>[]}
      />
    );
  }
  const rows = reports.map((r) => ({ ...r }));
  return (
    <DataTable
      rows={rows}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'schedule', label: 'Schedule' },
        { key: 'status', label: 'Status', tone: (r) => toneForStatus(String(r.status)) },
        { key: 'lastRun', label: 'Last run' }
      ] as Column<(typeof rows)[number]>[]}
    />
  );
}