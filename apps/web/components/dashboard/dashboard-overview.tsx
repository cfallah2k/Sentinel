import type { ReactNode } from 'react';
import { AlertTriangle, Ban, ClipboardCheck, ShieldCheck, Timer, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries, DonutChart, MultiArea } from '@/components/ui/charts';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import ThreatLens from './threat-lens';
import {
  aiSystems,
  approvals,
  complianceFrameworks,
  dataFlows,
  dailySeries,
  gatewayDecisions,
  gatewayRequests,
  hourlySeries,
  incidents,
  kpiHistory,
  policies,
  usageByProvider
} from '@/lib/mock-data';

const hourTotals = hourlySeries.map((h) => h.allowed + h.blocked + h.redacted + h.pending);
const requests24h = hourTotals.reduce((s, v) => s + v, 0);
const blocked24h = hourlySeries.reduce((s, h) => s + h.blocked, 0);
const openIncidents = incidents.filter((i) => i.status === 'Open' || i.status === 'Investigating');
const activePolicies = policies.filter((p) => p.status === 'Active');
const avgLatency = Math.round(hourlySeries.reduce((s, h) => s + h.latency, 0) / hourlySeries.length);
const complianceScore = Math.round(complianceFrameworks.reduce((s, f) => s + f.progress, 0) / complianceFrameworks.length);

function deltaOf(series: { value: number }[]) {
  const first = series[0].value;
  const last = series[series.length - 1].value;
  return Math.round(((last - first) / first) * 100);
}

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));

const decisionData = gatewayDecisions.map((d) => ({
  name: d,
  value: gatewayRequests.filter((r) => r.decision === d).length
}));

const topPolicies = [...policies].sort((a, b) => b.violations - a.violations).slice(0, 5);
const maxViolations = Math.max(1, topPolicies[0]?.violations ?? 1);
const pendingApprovals = approvals.filter((a) => a.status === 'Pending').slice(0, 4);
const recentFlows = [...dataFlows].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 5);

const incidentRows = openIncidents.map((i) => ({
  id: i.id,
  title: i.title,
  severity: i.severity,
  status: i.status,
  type: i.type,
  assignee: i.assignee,
  openedAt: i.openedAt
}));
type IncidentRow = (typeof incidentRows)[number];

const incidentColumns: Column<IncidentRow>[] = [
  { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  { key: 'title', label: 'Incident', render: (r) => <span className="font-medium text-slate-200">{r.title}</span> },
  { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(r.severity) },
  { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
  { key: 'type', label: 'Type' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'openedAt', label: 'Opened', render: (r) => r.openedAt.slice(5, 16).replace('T', ' ') }
];

export function DashboardOverview({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={title} description={description} actions={actions} />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Gateway requests 24h"
          value={requests24h.toLocaleString()}
          delta={deltaOf(kpiHistory.requests)}
          deltaLabel="vs last month"
          icon={Zap}
          accent="sky"
          spark={hourTotals}
          sub="Allowed + blocked + redacted"
        />
        <StatCard
          label="Blocked requests"
          value={blocked24h.toLocaleString()}
          delta={deltaOf(kpiHistory.blocked)}
          deltaLabel="vs last month"
          icon={Ban}
          accent="rose"
          spark={hourlySeries.map((h) => h.blocked)}
          sub="Enforced by policy engine"
        />
        <StatCard
          label="Active policies"
          value={activePolicies.length}
          icon={ShieldCheck}
          accent="cyan"
          spark={dailySeries.map((d) => d.requests - d.blocked)}
          sub={`${policies.length} policies total`}
        />
        <StatCard
          label="Open incidents"
          value={openIncidents.length}
          delta={deltaOf(kpiHistory.incidents)}
          deltaLabel="vs last month"
          icon={AlertTriangle}
          accent="amber"
          spark={kpiHistory.incidents.map((m) => m.value)}
          sub="Open + investigating"
        />
        <StatCard
          label="Avg gateway latency"
          value={`${avgLatency}ms`}
          icon={Timer}
          accent="violet"
          spark={hourlySeries.map((h) => h.latency)}
          sub="24h rolling mean"
        />
        <StatCard
          label="Compliance score"
          value={`${complianceScore}%`}
          icon={ClipboardCheck}
          accent="green"
          spark={dailySeries.map((d) => d.riskScore)}
          sub="Across 6 frameworks"
        />
      </div>

      <div className="mt-8">
        <ThreatLens />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Gateway traffic" subtitle="Allowed, blocked and redacted requests over the last 24 hours" />
          <CardBody>
            <MultiArea data={hourlySeries} keys={['allowed', 'blocked', 'redacted']} xKey="hour" colors={['#38bdf8', '#f87171', '#fbbf24']} height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Gateway decisions" subtitle="Decision split across sampled requests" />
          <CardBody>
            <DonutChart data={decisionData} />
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Open incidents" subtitle={`${openIncidents.length} incidents awaiting response`} />
          <CardBody>
            <DataTable columns={incidentColumns} rows={incidentRows} searchable={false} pageSize={5} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Top violated policies" subtitle="Violations per active policy" />
          <CardBody className="space-y-4">
            {topPolicies.map((p) => (
              <div key={p.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-xs font-medium text-slate-200">{p.name}</span>
                  <span className="shrink-0 text-[0.65rem] font-semibold text-rose-300">{p.violations.toLocaleString()}</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={(p.violations / maxViolations) * 100} color="bg-rose-400" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Usage by provider" subtitle="Requests per provider, last 24h" />
          <CardBody>
            <BarSeries data={usageByProvider} dataKey="requests" color="#38bdf8" height={190} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Approvals pending" subtitle="Awaiting your decision" />
          <CardBody className="space-y-4">
            {pendingApprovals.length === 0 ? (
              <p className="text-xs text-slate-500">No pending approvals.</p>
            ) : (
              pendingApprovals.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-200">
                      <span className="font-mono text-sentinel-300">{a.id}</span> · {a.type}
                    </p>
                    <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">{a.requester}</p>
                  </div>
                  <Badge label={a.risk} tone={toneForStatus(a.risk)} />
                </div>
              ))
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Data flow activity" subtitle="Latest flow decisions" />
          <CardBody className="space-y-3">
            {recentFlows.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-200">{f.source}</p>
                  <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">
                    → {systemName.get(f.systemId) ?? f.systemId}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[0.65rem] text-slate-500">{f.category}</span>
                  <Badge label={f.decision} tone={toneForStatus(f.decision)} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
