'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import { approvals as initialApprovals } from '@/lib/mock-data';

type Approval = (typeof initialApprovals)[number];

export default function Page() {
  const [rows, setRows] = useState<Approval[]>(initialApprovals);
  const [confirm, setConfirm] = useState<{ id: string; action: 'Approve' | 'Deny' } | null>(null);

  const pending = rows.filter((a) => a.status === 'Pending');

  const decide = (id: string, action: 'Approve' | 'Deny') => {
    setRows((prev) => prev.map((a) => (a.id === id ? { ...a, status: action === 'Approve' ? 'Approved' : 'Denied' } : a)));
    setConfirm(null);
  };

  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Regulatory Approvals"
        description="Queue of requests requiring regulatory decision."
      />
      <Card>
        <CardHeader
          title="Approval Queue"
          subtitle={`${pending.length} pending · ${rows.filter((a) => a.status === 'Approved').length} approved · ${rows.filter((a) => a.status === 'Denied').length} denied`}
        />
        <CardBody className="divide-y divide-white/5">
          {rows.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-3 py-3 text-xs">
              <div>
                <p className="font-semibold text-white">{a.type}</p>
                <p className="mt-0.5 text-slate-400">{a.requester} — {a.note}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{a.id} · requested {a.requestedAt} · expires {a.expiresAt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={a.risk} tone={a.risk === 'Critical' ? 'rose' : a.risk === 'High' ? 'red' : 'amber'} />
                <Badge label={a.status} tone={a.status === 'Approved' ? 'green' : a.status === 'Denied' ? 'rose' : a.status === 'Expired' ? 'slate' : 'amber'} />
                {a.status === 'Pending' ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setConfirm({ id: a.id, action: 'Approve' })}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[0.65rem] font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <Check className="h-3 w-3" /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirm({ id: a.id, action: 'Deny' })}
                      className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-[0.65rem] font-semibold text-rose-300 transition hover:bg-rose-500/20"
                    >
                      <X className="h-3 w-3" /> Deny
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirm !== null}
        title={confirm ? `${confirm.action} approval` : ''}
        description={
          confirm
            ? `This ${confirm.action.toLowerCase()}s ${confirm.id} and records your decision in the regulatory audit log. This cannot be undone.`
            : ''
        }
        confirmLabel={confirm ? confirm.action : 'Confirm'}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (confirm) decide(confirm.id, confirm.action);
        }}
      />
    </GovShell>
  );
}