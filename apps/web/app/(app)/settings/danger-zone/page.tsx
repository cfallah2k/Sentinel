'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard } from '@/components/platform/settings-form';
import ConfirmDialog from '@/components/ui/confirm-dialog';

type DoneAction = 'reset' | 'leave' | 'delete' | null;

export default function Page() {
  const [confirmDelete, setConfirmDelete] = useState('');
  const [confirmLeave, setConfirmLeave] = useState('');
  const [confirmOpen, setConfirmOpen] = useState<DoneAction>(null);
  const [done, setDone] = useState<DoneAction>(null);

  const handleConfirm = () => {
    if (confirmOpen) setDone(confirmOpen);
    setConfirmOpen(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Danger Zone"
        description="Irreversible actions that affect the whole organization. Handle with care."
        actions={<div className="flex items-center gap-2 text-xs text-rose-300"><AlertTriangle className="h-4 w-4" /> Sensitive area</div>}
      />

      <SectionCard title="Reset workspace" description="Clears all incident data, models and API keys. Configuration stays.">
        {done === 'reset' ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Workspace reset requested. A confirmation email has been sent.
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmOpen('reset')}
            className="rounded-full border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
          >
            Reset workspace
          </button>
        )}
      </SectionCard>

      <SectionCard title="Leave organization" description="Your membership is removed and access is revoked immediately.">
        {done === 'leave' ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> You have been removed from the organization.
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={confirmLeave}
              onChange={(e) => setConfirmLeave(e.target.value)}
              placeholder="Type 'leave' to confirm"
              className="w-full max-w-sm rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15"
            />
            <button
              type="button"
              disabled={confirmLeave.toLowerCase() !== 'leave'}
              onClick={() => setConfirmOpen('leave')}
              className="rounded-full border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Leave org
            </button>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Delete organization" description="Permanently deletes all data, keys, logs and billing records. Not recoverable.">
        {done === 'delete' ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Deletion scheduled. Data will be purged after the 30-day grace period.
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
              placeholder="Type the org name 'Nexora Labs' to confirm"
              className="w-full max-w-sm rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/15"
            />
            <button
              type="button"
              disabled={confirmDelete.trim() !== 'Nexora Labs'}
              onClick={() => setConfirmOpen('delete')}
              className="rounded-full bg-rose-500/90 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Delete organization
            </button>
          </div>
        )}
      </SectionCard>

      <ConfirmDialog
        open={confirmOpen !== null}
        onClose={() => setConfirmOpen(null)}
        onConfirm={handleConfirm}
        title={
          confirmOpen === 'reset'
            ? 'Reset workspace?'
            : confirmOpen === 'leave'
              ? 'Leave organization?'
              : 'Delete organization?'
        }
        description={
          confirmOpen === 'reset'
            ? 'will permanently clear all incidents, models and API keys.'
            : confirmOpen === 'leave'
              ? 'cannot be undone — your access is revoked immediately.'
              : 'permanently deletes all data, keys, logs and billing records.'
        }
        confirmLabel={confirmOpen === 'reset' ? 'Reset workspace' : confirmOpen === 'leave' ? 'Leave org' : 'Delete organization'}
      />
    </div>
  );
}