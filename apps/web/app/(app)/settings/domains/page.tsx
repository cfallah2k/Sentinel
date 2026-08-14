'use client';

import { useState } from 'react';
import { Globe, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SaveButton } from '@/components/platform/settings-form';

type Row = {
  id: string;
  domain: string;
  status: string;
  verified: string;
  method: string;
};

const domains: Row[] = [
  { id: 'dm-1', domain: 'nexora.io', status: 'Verified', verified: '2026-02-14', method: 'DNS TXT' },
  { id: 'dm-2', domain: 'nexora.com', status: 'Verified', verified: '2026-03-02', method: 'DNS TXT' },
  { id: 'dm-3', domain: 'nexora.dev', status: 'Pending', verified: '—', method: 'DNS TXT' }
];

export default function Page() {
  const [domain, setDomain] = useState('');
  const [rows, setRows] = useState<Row[]>(domains);

  const handleAdd = () => {
    const value = domain.trim().toLowerCase();
    if (!value) return;
    setRows((prev) => [
      ...prev,
      { id: `dm-${Date.now()}`, domain: value, status: 'Pending', verified: '—', method: 'DNS TXT' }
    ]);
    setDomain('');
  };

  const columns: Column<Row>[] = [
    { key: 'domain', label: 'Domain', render: (r) => <span className="font-mono text-slate-200">{r.domain}</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'verified', label: 'Verified' },
    { key: 'method', label: 'Method' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Domains"
        description="Verified domains control who can be invited and which email domains can sign in with SSO."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Verified" value={rows.filter((d) => d.status === 'Verified').length} icon={Globe} accent="green" sub="Accepting invites" />
        <StatCard label="Pending" value={rows.filter((d) => d.status === 'Pending').length} icon={Globe} accent="amber" sub="Awaiting DNS" />
        <StatCard label="Invite Policy" value="Verified only" icon={Globe} accent="sky" sub="Unverified rejected" />
      </div>

      <Card>
        <CardHeader title="Domain directory" subtitle="All domains bound to this organization" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search domains..." pageSize={6} />
        </CardBody>
      </Card>

      <SectionCard title="Add a domain" description="Verify ownership with a DNS TXT record.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Domain name">
            <div className="flex items-center gap-2">
              <TextInput value={domain} onChange={setDomain} placeholder="example.com" />
              <button
                type="button"
                disabled={!domain}
                onClick={handleAdd}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sentinel-500 px-4 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton label="Save" />
        </div>
      </SectionCard>
    </div>
  );
}