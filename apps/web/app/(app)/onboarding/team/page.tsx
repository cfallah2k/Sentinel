'use client';

import { useState } from 'react';
import { Mail, Trash2, UserPlus } from 'lucide-react';
import { OnboardingShell, inputCls, labelCls } from '@/components/onboarding/onboarding-shell';
import { roleOptions } from '@/lib/mock-data';

interface Invite {
  id: number;
  email: string;
  role: string;
}

export default function Page() {
  const [rows, setRows] = useState<Invite[]>([
    { id: 1, email: 'jordan.patel@nexora.io', role: 'SECURITY_ANALYST' },
    { id: 2, email: 'maya.chen@nexora.io', role: 'SECURITY_ANALYST' }
  ]);

  const update = (id: number, patch: Partial<Invite>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const remove = (id: number) => {
    setRows((rs) => rs.filter((r) => r.id !== id));
  };

  const add = () => {
    setRows((rs) => [...rs, { id: Date.now(), email: '', role: 'VIEWER' }]);
  };

  return (
    <OnboardingShell
      step={13}
      title="Invite your team"
      description="Bring in the people who will operate the control plane. Invitations are sent when you finish setup."
      prev="/onboarding/api"
      next="/onboarding/complete"
      nextLabel="Finish setup"
    >
      <div className="divide-y divide-white/5">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className={labelCls}>Email</label>
              <input
                type="email"
                value={r.email}
                onChange={(e) => update(r.id, { email: e.target.value })}
                placeholder="teammate@company.com"
                className={`${inputCls} mt-2`}
              />
            </div>
            <div className="w-full sm:w-56">
              <label className={labelCls}>Role</label>
              <select
                value={r.role}
                onChange={(e) => update(r.id, { role: e.target.value })}
                className={`${inputCls} mt-2 appearance-none`}
              >
                {roleOptions.map((o) => (
                  <option key={o} value={o} className="bg-slate-950">{o.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => remove(r.id)}
              disabled={rows.length === 1}
              aria-label="Remove member"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:text-rose-300 disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <UserPlus className="h-3.5 w-3.5" /> Add member
        </button>
        <p className="text-[0.7rem] text-slate-500">{rows.length} invite{rows.length === 1 ? '' : 's'} queued</p>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-[0.7rem] text-slate-400">
        <Mail className="h-3.5 w-3.5 shrink-0 text-slate-500" />
        Each invite includes a role-based permission set that governs what the member can see and change.
      </div>
    </OnboardingShell>
  );
}
