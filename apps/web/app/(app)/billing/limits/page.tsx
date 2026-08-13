'use client';

import { useState } from 'react';
import { Gauge } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SaveButton } from '@/components/platform/settings-form';

const limits = [
  { id: 'lim-1', label: 'Monthly requests', current: 8200000, max: 10000000, unit: 'requests', soft: 80, color: 'bg-amber-400' },
  { id: 'lim-2', label: 'Monthly spend', current: 4120, max: 5000, unit: 'USD', soft: 80, color: 'bg-rose-400' },
  { id: 'lim-3', label: 'Concurrent streams', current: 120, max: 250, unit: 'streams', soft: 70, color: 'bg-violet-400' },
  { id: 'lim-4', label: 'Webhook deliveries', current: 12401, max: 100000, unit: 'deliveries', soft: 85, color: 'bg-sky-400' }
];

export default function Page() {
  const [spendHard, setSpendHard] = useState('5000');
  const [spendSoft, setSpendSoft] = useState('4000');
  const [notifyAt, setNotifyAt] = useState('80');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Limits"
        description="Soft alerts and hard caps that protect your bill and your quota."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Hard caps" value="4" icon={Gauge} accent="rose" sub="Blocking at limit" />
        <StatCard label="Soft alerts" value="4" icon={Gauge} accent="amber" sub="Notify at threshold" />
        <StatCard label="At hard cap" value="1" icon={Gauge} accent="green" sub="Streams, 48% used" />
        <StatCard label="Notifications" value="Email" icon={Gauge} accent="sky" sub="+ Slack on-call" />
      </div>

      <Card>
        <CardHeader title="Active limits" subtitle="Current utilization against caps" />
        <CardBody>
          <div className="space-y-5">
            {limits.map((l) => {
              const pct = (l.current / l.max) * 100;
              const over = pct >= 100;
              return (
                <div key={l.id}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">{l.label}</span>
                    <span className="font-mono text-slate-500">
                      {l.current.toLocaleString()} / {l.max.toLocaleString()} {l.unit}
                    </span>
                  </div>
                  <ProgressBar value={Math.min(pct, 100)} color={over ? 'bg-rose-400' : l.color} />
                  <div className="mt-1 flex items-center justify-between text-[0.65rem] text-slate-500">
                    <span>{pct.toFixed(0)}% used</span>
                    {over ? <Badge label="Hard cap reached" tone="rose" /> : pct >= l.soft ? <Badge label="Approaching cap" tone="amber" /> : <Badge label="Healthy" tone="green" />}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <SectionCard title="Spend guardrails" description="Monthly spend controls.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Hard cap (USD)">
            <TextInput value={spendHard} onChange={setSpendHard} type="number" />
          </Field>
          <Field label="Soft alert (USD)">
            <TextInput value={spendSoft} onChange={setSpendSoft} type="number" />
          </Field>
          <Field label="Notify at (%)">
            <TextInput value={notifyAt} onChange={setNotifyAt} type="number" />
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton />
        </div>
      </SectionCard>
    </div>
  );
}