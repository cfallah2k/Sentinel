import { Fingerprint, KeyRound, ShieldCheck, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { teamMembers, invitations, rolePermissions, approvals, currentOrg } from '@/lib/mock-data';
import { serviceAccounts } from '@/components/platform/developer-data';

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
    { key: 'lastActive', label: 'Last Active', sortValue: (r) => r.lastActive, render: (r) => <span className="text-slate-400">{r.lastActive === '—' ? '—' : r.lastActive.slice(0, 10)}</span> },
    { key: 'mfa', label: 'MFA', render: (r) => <Badge label={r.mfa ? 'Enabled' : 'Off'} tone={r.mfa ? 'green' : 'slate'} /> }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Team"
        description={`Manage who has access to ${currentOrg.name} and what they can do.`}
        actions={<PrimaryButton href="/team/invitations">Invite Member</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Members" value={teamMembers.length} icon={Users} accent="sky" sub={`${currentOrg.seats} seats on plan`} />
        <StatCard label="Invitations" value={invitations.filter((i) => i.status === 'Pending').length} icon={UserPlus} accent="amber" sub="Awaiting acceptance" />
        <StatCard label="Roles" value={Object.keys(rolePermissions).length} icon={ShieldCheck} accent="cyan" sub="Predefined scopes" />
        <StatCard label="Service Accounts" value={serviceAccounts.length} icon={KeyRound} accent="violet" sub="Machine identities" />
        <StatCard label="Access Requests" value={approvals.filter((a) => a.status === 'Pending').length} icon={Fingerprint} accent="rose" sub="Pending review" />
      </div>

      <Card>
        <CardHeader title="Members" subtitle="Everyone with access to the organization" action={<Link href="/team/members" className="text-xs font-semibold text-sentinel-300 hover:text-sentinel-400">View all</Link>} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search members..." pageSize={6} initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Role inventory" subtitle="Permissions granted to each role" action={<Link href="/team/roles" className="text-xs font-semibold text-sentinel-300 hover:text-sentinel-400">Manage roles</Link>} />
          <CardBody className="space-y-3">
            {Object.entries(rolePermissions).map(([role, perms]) => (
              <Link key={role} href={`/team/roles/${role.toLowerCase()}`} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.05]">
                <span className="text-xs font-semibold text-slate-200">{role}</span>
                <span className="text-[0.65rem] text-slate-500">{perms.length} permissions</span>
              </Link>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Open invitations" action={<Link href="/team/invitations" className="text-xs font-semibold text-sentinel-300 hover:text-sentinel-400">View all</Link>} />
          <CardBody className="space-y-3">
            {invitations.filter((i) => i.status === 'Pending').map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{i.email}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">Sent {i.sentAt}</p>
                </div>
                <Badge label={i.role} tone="blue" />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}