'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import ConfirmDialog from '@/components/ui/confirm-dialog';

export interface ResolutionAction {
  id: string;
  title: string;
  owner: string;
  status: string;
}

export default function ResolutionTracker({
  actions,
  incidentId
}: {
  actions: ResolutionAction[];
  incidentId: string;
}) {
  const [items, setItems] = useState<ResolutionAction[]>(actions);
  const [resolved, setResolved] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const done = items.filter((a) => a.status === 'Done').length;
  const pct = Math.round((done / items.length) * 100);
  const allDone = done === items.length;

  return (
    <Card>
      <CardHeader
        title="Remediation status"
        subtitle="Tracked actions toward closure"
        action={
          <button
            type="button"
            disabled={!allDone || resolved}
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle2 className="h-3.5 w-3.5" size={14} />
            {resolved ? 'Resolved' : 'Resolve incident'}
          </button>
        }
      />
      <CardBody className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-[0.65rem]">
            <span className="uppercase tracking-wider text-slate-500">Completed</span>
            <span className="font-semibold text-slate-300">{done} of {items.length}</span>
          </div>
          <ProgressBar value={pct} color={resolved || pct === 100 ? 'bg-emerald-400' : pct >= 60 ? 'bg-amber-400' : 'bg-rose-400'} />
        </div>
        <div className="space-y-2">
          {items.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-white">{a.title}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{a.owner}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={a.status} tone={a.status === 'Done' ? 'green' : a.status === 'In Progress' ? 'amber' : 'sky'} />
                {a.status !== 'Done' ? (
                  <button
                    type="button"
                    onClick={() =>
                      setItems((prev) =>
                        prev.map((x) => (x.id === a.id ? { ...x, status: 'Done' } : x))
                      )
                    }
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold text-slate-300 transition hover:bg-white/10"
                  >
                    Mark done
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardBody>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setResolved(true);
          setConfirmOpen(false);
        }}
        title={`Resolve ${incidentId}?`}
        description="marks the incident as Resolved and closes the SLA window."
        confirmLabel="Mark resolved"
      />
    </Card>
  );
}