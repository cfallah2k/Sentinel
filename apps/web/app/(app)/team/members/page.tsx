import { UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { teamMembers } from '@/lib/mock-data';

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  mfa: boolean;
};

export default function Page() {
  const rows: Row[] = teamMembers.map((m) => ({ ...m }));

  const columns: Column<Row>[] = [
    {
      key: 'name',
      label: 'Member',
      sortValue: (r) => r.name,
      render: (r) => (
        <Link href={`/team/members/${r.id}`} className="font-medium text-slate-200 transition hover:text-sentinel-300">
          {r.name}
        </Link>
      )
    },
    { key: 'email', label: 'Email', render: (r) => <span className="text-slate-400">{r.email}</span> },
    { key: 'role', label: 'Role', render: (r) => <Badge label={r.role} tone="blue" /> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'lastActive', label: 'Last Active', sortValue: (r) => r.lastActive, render: (r) => <span className="text-slate-400">{r.lastActive === '—' ? 'Never' : `${r.lastActive.slice(0, 10)} ${r.lastActive.slice(11, 16)}Z`}</span> },
    { key: 'mfa', label: 'MFA', render: (r) => <Badge label={r.mfa ? 'Enabled' : 'Off'} tone={r.mfa ? 'green' : 'slate'} /> }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Members"
        description="All people with access to this organization."
        actions={<PrimaryButton href="/team/invitations">Invite Member</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Members" value={teamMembers.length} icon={Users} accent="sky" sub="Human identities" />
        <StatCard label="Active" value={teamMembers.filter((m) => m.status === 'Active').length} icon={Users} accent="green" sub="Recently active" />
        <StatCard label="MFA Enabled" value={teamMembers.filter((m) => m.mfa).length} icon={Users} accent="cyan" sub="Enforced on admins" />
        <StatCard label="Suspended" value={teamMembers.filter((m) => m.status === 'Suspended').length} icon={UserPlus} accent="rose" sub="Access revoked" />
      </div>

      <Card>
        <CardHeader title="All members" subtitle="Search, sort and manage access" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search by name or email..." initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}