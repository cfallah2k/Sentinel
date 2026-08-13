import { ScrollText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { toneForStatus } from '@/components/ui/badge';
import { auditLogs } from '@/lib/mock-data';

type Row = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  result: string;
  context: string;
};

export default function Page() {
  const rows: Row[] = auditLogs.map((l) => ({ ...l }));

  const columns: Column<Row>[] = [
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => `${r.timestamp.slice(0, 10)} ${r.timestamp.slice(11, 16)}Z` },
    { key: 'actor', label: 'Actor', render: (r) => <span className="text-slate-200">{r.actor}</span> },
    { key: 'action', label: 'Action', render: (r) => <span className="font-mono text-xs text-slate-300">{r.action}</span> },
    { key: 'resource', label: 'Resource' },
    { key: 'result', label: 'Result', tone: (r) => toneForStatus(r.result) },
    { key: 'context', label: 'Context', render: (r) => <span className="text-[0.7rem] text-slate-500">{r.context}</span> }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Audit Log Settings"
        description="Immutable record of every action taken in the workspace."
        actions={<div className="flex items-center gap-2 text-xs text-slate-400"><ScrollText className="h-4 w-4 text-sentinel-300" /> 12-month retention</div>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events (30d)" value="24,891" icon={ScrollText} accent="sky" sub="Recorded" />
        <StatCard label="Denied actions" value="312" icon={ScrollText} accent="rose" sub="Blocked by policy" />
        <StatCard label="Exported" value="9" icon={ScrollText} accent="violet" sub="Last 90 days" />
        <StatCard label="Integrity" value="Hash-chained" icon={ScrollText} accent="green" sub="Tamper-evident" />
      </div>

      <Card>
        <CardHeader title="Event stream" subtitle="Chronological log with actor and result" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search actor, action or resource..." initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}