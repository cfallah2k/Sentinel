'use client';

import { useState } from 'react';
import { Send, UserPlus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Field, TextInput, SelectInput, SectionCard } from '@/components/platform/settings-form';
import { invitations, assignableRoleOptions, roleLabel, roleDescriptions, currentOrg } from '@/lib/mock-data';

type Row = {
  id: string;
  email: string;
  role: string;
  sentAt: string;
  status: string;
};

export default function Page() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('SECURITY_ANALYST');
  const [sent, setSent] = useState(false);

  const rows: Row[] = invitations.map((i) => ({ ...i }));

  const columns: Column<Row>[] = [
    { key: 'email', label: 'Email', render: (r) => <span className="text-slate-200">{r.email}</span> },
    { key: 'role', label: 'Role', render: (r) => <Badge label={r.role} tone="blue" /> },
    { key: 'sentAt', label: 'Sent', sortValue: (r) => r.sentAt },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Platform" title="Invitations" description="Send and track invitations to join the organization." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Pending" value={invitations.filter((i) => i.status === 'Pending').length} icon={UserPlus} accent="amber" sub="Awaiting acceptance" />
        <StatCard label="Accepted" value={invitations.filter((i) => i.status === 'Accepted').length} icon={UserPlus} accent="green" sub="Joined the org" />
        <StatCard label="Expires In" value="7d" icon={UserPlus} accent="sky" sub="Default invitation TTL" />
      </div>

      <SectionCard title="Send invitation" description="New members receive an email with a unique sign-up link and are assigned a seat role inside this account.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email address">
            <TextInput value={email} onChange={setEmail} placeholder="teammate@nexora.io" />
          </Field>
          <Field label="Seat role">
            <SelectInput
              value={role}
              onChange={setRole}
              options={assignableRoleOptions.map((r) => ({ value: r, label: `${roleLabel(r)} (${r})` }))}
            />
          </Field>
        </div>
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[0.7rem] leading-5 text-slate-400">
          Seats are the six working roles inside the {currentOrg.name} account. Account-level roles (Owner, Admin) belong
          to the account itself and are not assignable by invitation.
          {role ? (
            <span className="mt-1 block text-slate-500">
              {roleLabel(role)} — {roleDescriptions[role] ?? ''}
            </span>
          ) : null}
        </p>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => email && setSent(true)}
            disabled={!email}
            className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-40 sm:text-sm"
          >
            <Send className="h-4 w-4" />
            Send Invitation
          </button>
        </div>
        {sent ? (
          <p className="mt-3 text-right text-xs text-emerald-300">Invitation sent to {email}</p>
        ) : null}
      </SectionCard>

      <Card>
        <CardHeader title="Invitation history" subtitle="All invitations sent to this organization" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search invitations..." initialSort={{ key: 'sentAt', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}