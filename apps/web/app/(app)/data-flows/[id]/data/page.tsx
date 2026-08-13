import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { FlowHeader, FlowSubnav, AttributeGrid } from '@/components/data-intel/flow-detail';
import { fmt, resolveFlow, toneForCategory } from '@/components/data-intel/derived';

type DataRow = {
  category: string;
  sensitivity: string;
  decision: string;
  records: string;
  retention: string;
};

const dataColumns: Column<DataRow>[] = [
  { key: 'category', label: 'Category', render: (r) => <Badge label={r.category} tone={toneForCategory(r.category)} /> },
  { key: 'sensitivity', label: 'Sensitivity', render: (r) => <Badge label={r.sensitivity} tone={r.sensitivity === 'Restricted' || r.sensitivity === 'Confidential' ? 'amber' : 'blue'} /> },
  { key: 'decision', label: 'Gateway decision', render: (r) => <span className="text-slate-300">{r.decision}</span> },
  { key: 'records', label: 'Records', render: (r) => <span className="text-slate-300">{r.records}</span> },
  { key: 'retention', label: 'Retention', render: (r) => <span className="text-slate-300">{r.retention}</span> }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const sourceRecords = flow.volumeMb * 1200;
  const rows: DataRow[] = [
    { category: flow.category, sensitivity: 'Restricted', decision: flow.decision, records: fmt(sourceRecords), retention: '24 months' },
    { category: 'Metadata', sensitivity: 'Internal', decision: 'Log', records: fmt(flow.volumeMb * 420), retention: '90 days' },
    { category: 'Embeddings', sensitivity: 'Confidential', decision: 'Require Approval', records: fmt(flow.volumeMb * 6400), retention: '36 months' },
    { category: 'System logs', sensitivity: 'Internal', decision: 'Log', records: fmt(flow.volumeMb * 860), retention: '12 months' }
  ];
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Data" />
      <FlowHeader flow={flow} />
      <Card>
        <CardHeader title="Data inventory" subtitle="What this flow carries and how each payload is handled" />
        <CardBody>
          <DataTable columns={dataColumns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Handling summary" subtitle="Aggregated payload profile" />
        <CardBody>
          <AttributeGrid
            items={[
              { label: 'Primary category', value: flow.category },
              { label: 'Sensitivity', value: 'Restricted' },
              { label: 'Decision', value: flow.decision },
              { label: 'Volume today', value: `${fmt(flow.volumeMb)} MB` },
              { label: 'Est. records', value: fmt(sourceRecords) },
              { label: 'Retention', value: '24 months' }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}