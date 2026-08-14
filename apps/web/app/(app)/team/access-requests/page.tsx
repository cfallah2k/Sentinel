'use client';

import { useState } from 'react';
import { Check, Fingerprint, X } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { approvals } from '@/lib/mock-data';
import QuickCreateModal from '@/components/ui/quick-create-modal';
import ConfirmDialog from '@/components/ui/confirm-dialog';

type Row = {
  id: string;
  requester: string;
  type: string;
  status: string;
  risk: string;
  requestedAt: string;
  expiresAt: string;
  note: string;
};

export default function Page() {
  const [rows, setRows] = useState<Row[]>(approvals.map((a) => ({ ...a })));
  const [createOpen, setCreateOpen] = useState(false);
  const [decision, setDecision] = useState<{ id: string; approve: boolean } | null>(null);

  const decide = (id: string, approve: boolean) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: approve ? 'Approved' : 'Denied' } : r)));
    setDecision(null);
  };

  const columns: Column<Row>[] = [
    { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-slate-400">{r.id}</span> },
    { key: 'requester', label: 'Requester', sortValue: (r) => r.requester, render: (r) => <span className="text-slate-200">{r.requester}</span> },
    { key: 'type', label: 'Type', render: (r) => <Badge label={r.type} tone="blue" /> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(r.risk) },
    { key: 'requestedAt', label: 'Requested', sortValue: (r) => r.requestedAt, render: (r) => r.requestedAt.slice(0, 10) },
    { key: 'note', label: 'Note', className: 'max-w-xs truncate text-slate-400' },
    {
      key: 'actions',
      label: 'Review',
      render: (r) =>
        r.status === 'Pending' ? (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDecision({ id: r.id, approve: true })}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 transition hover:bg-emerald-500/20"
              aria-label={`Approve ${r.id}`}
            >
              <Check className="h-3.5 w-3.5" size={14} />
            </button>
            <button
              type="button"
              onClick={() => setDecision({ id: r.id, approve: false })}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/10 text-rose-300 transition hover:bg-rose-500/20"
              aria-label={`Deny ${r.id}`}
            >
              <X className="h-3.5 w-3.5" size={14} />
            </button>
          </div>
        ) : (
          <span className="text-[0.65rem] text-slate-600">Resolved</span>
        )
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Access Requests"
        description="Requests from team members for data, policy exceptions and high-risk access."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Request Access
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={rows.filter((a) => a.status === 'Pending').length} icon={Fingerprint} accent="amber" sub="Awaiting decision" />
        <StatCard label="Approved (7d)" value={rows.filter((a) => a.status === 'Approved').length} icon={Fingerprint} accent="green" sub="Granted access" />
        <StatCard label="Denied (7d)" value={rows.filter((a) => a.status === 'Denied').length} icon={Fingerprint} accent="rose" sub="Rejected requests" />
        <StatCard label="High Risk" value={rows.filter((a) => a.risk === 'High' || a.risk === 'Critical').length} icon={Fingerprint} accent="red" sub="Require escalation" />
      </div>

      <Card>
        <CardHeader title="Access request queue" subtitle="All requests with review status" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search requests..." initialSort={{ key: 'requestedAt', dir: 'desc' }} />
        </CardBody>
      </Card>

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Request access"
        description="Submitted for review by your team's approvers."
        fields={[
          {
            name: 'type',
            label: 'Request type',
            type: 'select',
            options: ['Data access', 'Policy exception', 'High-risk access', 'Model access'],
            defaultValue: 'Data access'
          },
          { name: 'note', label: 'Justification', placeholder: 'Why do you need this access?' }
        ]}
        submitLabel="Submit request"
        onCreate={(values) => {
          setRows((prev) => [
            {
              id: `REQ-${1000 + prev.length + 1}`,
              requester: 'Amara Okafor',
              type: values.type,
              status: 'Pending',
              risk: 'Medium',
              requestedAt: new Date().toISOString().slice(0, 10),
              expiresAt: '2026-09-13',
              note: values.note
            },
            ...prev
          ]);
        }}
      />

      <ConfirmDialog
        open={decision !== null}
        onClose={() => setDecision(null)}
        onConfirm={() => decision && decide(decision.id, decision.approve)}
        title={decision?.approve ? 'Approve this request?' : 'Deny this request?'}
        description={decision?.approve ? 'grants the requested access to the requester.' : 'rejects the request and notifies the requester.'}
        confirmLabel={decision?.approve ? 'Approve' : 'Deny'}
      />
    </div>
  );
}