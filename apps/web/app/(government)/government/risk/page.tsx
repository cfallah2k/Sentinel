import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend, BarSeries } from '@/components/ui/charts';
import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { SectionTable } from '@/components/government/sections';
import { riskTone } from '@/components/government/registry-table';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { dailySeries, governmentRegistry, riskFindings } from '@/lib/mock-data';

type FindingRow = (typeof riskFindings)[number];

const findingsColumns: Column<FindingRow>[] = [
  { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-sky-300">{r.id}</span> },
  { key: 'title', label: 'Finding', render: (r) => <span className="font-semibold text-white">{r.title}</span> },
  { key: 'severity', label: 'Severity', render: (r) => <Badge label={r.severity} tone={riskTone(r.severity)} /> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Resolved' ? 'green' : r.status === 'In Progress' ? 'amber' : 'rose'} /> },
  { key: 'owner', label: 'Owner', className: 'text-slate-400' },
  { key: 'due', label: 'Due', className: 'text-slate-400' }
];

const byPurpose = ['Citizen services', 'Regulatory compliance', 'Public safety', 'Administrative automation', 'Data analytics'].map((p) => ({
  name: p,
  systems: governmentRegistry.filter((r) => (r.risk === 'High' || r.risk === 'Critical') && r.purpose === p).length
}));

export default function Page() {
  const critical = governmentRegistry.filter((r) => r.risk === 'Critical').length;
  const high = governmentRegistry.filter((r) => r.risk === 'High').length;
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="National Risk Dashboard"
        description="Aggregate risk posture of AI systems across sectors, with open findings from assessments."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="High-Risk Systems by Sector" subtitle="High and critical tier systems per use category" />
          <CardBody>
            <BarSeries data={byPurpose} dataKey="systems" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="National Risk Trend — 30 Days" subtitle="Rolling risk score from daily telemetry" />
          <CardBody>
            <AreaTrend data={dailySeries.map((d) => ({ ...d }))} dataKey="riskScore" xKey="date" color="#f87171" height={220} />
          </CardBody>
        </Card>
      </div>
      <SectionTable title="Open Findings" subtitle={`${critical} critical and ${high} high-risk systems under assessment`} columns={findingsColumns} rows={riskFindings} searchPlaceholder="Search findings..." />
    </GovShell>
  );
}