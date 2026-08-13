'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard, Toggle, SaveButton } from '@/components/platform/settings-form';

const groups = [
  {
    id: 'incidents',
    label: 'Incidents',
    description: 'Critical, high and medium severity events',
    items: [
      { id: 'inc-critical', label: 'Critical incidents', hint: 'Immediate email + Slack alert to on-call', defaultValue: true },
      { id: 'inc-high', label: 'High severity incidents', hint: 'Email within 5 minutes', defaultValue: true },
      { id: 'inc-resolved', label: 'Incident resolved', hint: 'Resolution summary notification', defaultValue: false }
    ]
  },
  {
    id: 'approvals',
    label: 'Approvals',
    description: 'Access requests and policy decisions',
    items: [
      { id: 'apr-pending', label: 'New access requests', hint: 'When a request needs your decision', defaultValue: true },
      { id: 'apr-decided', label: 'Request decisions', hint: 'When a request you submitted is decided', defaultValue: true },
      { id: 'apr-expiring', label: 'Expiring approvals', hint: '24 hours before expiry', defaultValue: false }
    ]
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Sign-ins, keys and account changes',
    items: [
      { id: 'sec-signin', label: 'New device sign-in', hint: 'MFA challenge on unrecognized devices', defaultValue: true },
      { id: 'sec-key', label: 'API key events', hint: 'Key creation, rotation and revocation', defaultValue: false },
      { id: 'sec-role', label: 'Role changes', hint: 'When member roles are modified', defaultValue: true }
    ]
  },
  {
    id: 'usage',
    label: 'Usage & Billing',
    description: 'Quotas, invoices and credits',
    items: [
      { id: 'use-quota', label: 'Quota warnings', hint: 'At 80% and 95% of monthly requests', defaultValue: true },
      { id: 'use-invoice', label: 'Invoice events', hint: 'New, paid and failed invoices', defaultValue: true },
      { id: 'use-report', label: 'Report deliveries', hint: 'Scheduled report completions', defaultValue: false }
    ]
  }
];

export default function Page() {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    groups.reduce<Record<string, boolean>>((acc, g) => {
      g.items.forEach((i) => { acc[i.id] = i.defaultValue; });
      return acc;
    }, {})
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Notification Settings"
        description="Choose which events notify you and how they are delivered."
        actions={<div className="flex items-center gap-2 text-xs text-slate-400"><Bell className="h-4 w-4 text-sentinel-300" /> Email + Slack delivery</div>}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {groups.map((g) => (
          <SectionCard key={g.id} title={g.label} description={g.description}>
            <div className="space-y-2.5">
              {g.items.map((i) => (
                <Toggle key={i.id} label={i.label} hint={i.hint} checked={state[i.id]} onChange={(v) => setState((s) => ({ ...s, [i.id]: v }))} />
              ))}
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}