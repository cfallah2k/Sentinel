'use client';

import { useState } from 'react';
import { KeyRound, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import QuickCreateModal from '@/components/ui/quick-create-modal';

export default function IssueKeyButton({ appName }: { appName: string }) {
  const [open, setOpen] = useState(false);
  const [issued, setIssued] = useState<{ id: string; name: string; key: string; scopes: string; created: string; status: string }[]>([]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
        >
          <Plus className="h-3.5 w-3.5" /> Issue New Key
        </button>
        <p className="text-[0.65rem] text-slate-500">New keys are shown once and stored encrypted.</p>
      </div>

      {issued.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Key</th>
                <th className="px-4 py-2.5 font-medium">Scopes</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {issued.map((k) => (
                <tr key={k.id}>
                  <td className="px-4 py-3 font-medium text-white">{k.name}</td>
                  <td className="px-4 py-3 font-mono text-sky-300">{k.key}</td>
                  <td className="px-4 py-3 text-slate-400">{k.scopes}</td>
                  <td className="px-4 py-3"><Badge label={k.status} tone="green" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-white/10 bg-amber-500/5 px-4 py-2.5 text-[0.65rem] text-amber-200">
            Copy these keys now — they are masked everywhere else.
          </p>
        </div>
      ) : null}

      <QuickCreateModal
        open={open}
        onClose={() => setOpen(false)}
        title={`Issue key for ${appName}`}
        description="The full key is shown once after creation."
        fields={[
          { name: 'name', label: 'Key name', placeholder: 'e.g. production-key' },
          { name: 'scopes', label: 'Scope', type: 'select', options: ['read', 'read, write'], defaultValue: 'read' }
        ]}
        submitLabel="Issue key"
        onCreate={(values) => {
          setIssued((prev) => [
            {
              id: `key-${Date.now()}`,
              name: values.name,
              key: `sk_live_${Math.random().toString(36).slice(2, 18)}`,
              scopes: values.scopes,
              created: new Date().toISOString().slice(0, 10),
              status: 'Active'
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}