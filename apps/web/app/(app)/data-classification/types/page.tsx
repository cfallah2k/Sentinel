import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { sensitivityLabel } from '@/components/data-intel/derived';

type TypeRow = {
  id: string;
  name: string;
  detector: string;
  sensitivity: number;
  matches24h: number;
  blocked24h: number;
  status: string;
};

const typeColumns: Column<TypeRow>[] = [
  { key: 'name', label: 'Data type', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  {
    key: 'sensitivity',
    label: 'Sensitivity',
    render: (r) => (
      <Badge label={sensitivityLabel(r.sensitivity)} tone={r.sensitivity >= 4 ? 'rose' : r.sensitivity === 3 ? 'amber' : r.sensitivity === 2 ? 'blue' : 'green'} />
    ),
    sortValue: (r) => r.sensitivity
  },
  { key: 'matches24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{r.matches24h.toLocaleString('en-US')}</span>, sortValue: (r) => r.matches24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{r.blocked24h.toLocaleString('en-US')}</span>, sortValue: (r) => r.blocked24h },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'amber'} /> }
];

export default function Page() {
  const rows: TypeRow[] = [
    { id: 't1', name: 'Personal Information (PII)', detector: 'pii-detector', sensitivity: 4, matches24h: 4821, blocked24h: 214, status: 'Active' },
    { id: 't2', name: 'Identity & Credentials', detector: 'identity-detector', sensitivity: 4, matches24h: 1102, blocked24h: 98, status: 'Active' },
    { id: 't3', name: 'Financial Data', detector: 'finance-detector', sensitivity: 3, matches24h: 3390, blocked24h: 176, status: 'Active' },
    { id: 't4', name: 'Health Data (PHI)', detector: 'health-detector', sensitivity: 4, matches24h: 517, blocked24h: 43, status: 'Active' },
    { id: 't5', name: 'Biometric Data', detector: 'biometric-detector', sensitivity: 4, matches24h: 98, blocked24h: 12, status: 'Active' },
    { id: 't6', name: 'Location Data', detector: 'location-detector', sensitivity: 2, matches24h: 764, blocked24h: 31, status: 'Review' },
    { id: 't7', name: 'Employee Data', detector: 'employee-detector', sensitivity: 3, matches24h: 1488, blocked24h: 77, status: 'Active' },
    { id: 't8', name: 'Customer Data', detector: 'customer-detector', sensitivity: 3, matches24h: 5210, blocked24h: 263, status: 'Active' }
  ];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Data Types"
        description="Every data type Sentinel can detect, with its sensitivity level, detector engine and enforcement activity."
      />
      <ClassificationNav active="Types" />
      <Card>
        <CardHeader title="Registered data types" subtitle="8 detector-backed types in the taxonomy" />
        <CardBody>
          <DataTable columns={typeColumns} rows={rows} pageSize={10} searchPlaceholder="Search data types..." />
        </CardBody>
      </Card>
    </div>
  );
}