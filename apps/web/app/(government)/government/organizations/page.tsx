import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Building2, Cpu, ShieldAlert, Users } from 'lucide-react';
import { platformOrganizations } from '@/lib/mock-data';

type OrgRow = (typeof platformOrganizations)[number];

const orgTone: Record<string, BadgeTone> = { Active: 'green', Trial: 'amber', Overdue: 'rose', Suspended: 'rose' };

const columns: Column<OrgRow>[] = [
  { key: 'name', label: 'Organization', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'plan', label: 'Plan', render: (r) => <Badge label={r.plan} tone={r.plan === 'Enterprise' ? 'violet' : r.plan === 'Growth' ? 'blue' : 'slate'} /> },
  { key: 'users', label: 'Users', sortValue: (r) => r.users, className: 'text-slate-400' },
  { key: 'systems', label: 'Systems', sortValue: (r) => r.systems, className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={orgTone[r.status]} /> },
  { key: 'region', label: 'Region', className: 'text-slate-400' }
];

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Operators"
        description="Organizations operating AI systems under national regulatory oversight."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Operators" value={platformOrganizations.length} icon={Building2} accent="sky" />
        <StatCard label="Total Systems" value={platformOrganizations.reduce((s, o) => s + o.systems, 0)} icon={Cpu} accent="cyan" />
        <StatCard label="Total Users" value={platformOrganizations.reduce((s, o) => s + o.users, 0)} icon={Users} accent="violet" />
        <StatCard label="High-Risk Operators" value={platformOrganizations.filter((o) => o.status !== 'Active').length} icon={ShieldAlert} accent="rose" sub="non-compliant or suspended" />
      </div>
      <Card>
        <CardHeader title="Operator Register" subtitle="Organizations subject to regulatory oversight" />
        <CardBody>
          <DataTable columns={columns} rows={platformOrganizations} searchPlaceholder="Search operators..." />
        </CardBody>
      </Card>
    </GovShell>
  );
}