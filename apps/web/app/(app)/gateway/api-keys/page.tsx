'use client';

import { useState } from 'react';
import { KeyRound, ShieldCheck, ShieldX, Timer } from 'lucide-react';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { GatewayApiKeyTable } from '@/components/enforcement/tables';
import { apiKeys, gatewayNavItems, type ApiKeyRow } from '@/components/enforcement/helpers';
import QuickCreateModal from '@/components/ui/quick-create-modal';

export default function Page() {
  const [keys, setKeys] = useState<ApiKeyRow[]>(apiKeys);
  const [createOpen, setCreateOpen] = useState(false);

  const active = keys.filter((k) => k.status === 'Active').length;
  const revoked = keys.filter((k) => k.status === 'Revoked').length;
  const scopes = new Set(keys.flatMap((k) => k.scopes)).size;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="API Keys"
        description="Authenticate applications against the gateway with scoped, rotatable keys."
        actions={[
          <button
            key="create"
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Create API Key
          </button>,
          <SecondaryButton key="rotate" href="/gateway/logs">View Key Logs</SecondaryButton>
        ]}
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/api-keys" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Keys" value={active} icon={KeyRound} accent="green" />
        <StatCard label="Revoked" value={revoked} icon={ShieldX} accent="rose" />
        <StatCard label="Scopes in Use" value={scopes} icon={ShieldCheck} accent="sky" />
        <StatCard label="Expired" value={keys.filter((k) => k.status === 'Expired').length} icon={Timer} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Key management" subtitle="Masked keys — full values are only shown at creation time" />
        <CardBody>
          <GatewayApiKeyTable rows={keys} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Key policy" subtitle="Recommended practices for gateway keys" />
        <CardBody className="space-y-3">
          {[
            { rule: 'Rotate keys every 90 days', detail: 'Set a rotation reminder for production keys.' },
            { rule: 'Least-privilege scopes', detail: 'Issue read-only scopes unless write access is required.' },
            { rule: 'Revoke on personnel change', detail: 'Revoke keys when the owning engineer leaves the team.' },
            { rule: 'Never share keys', detail: 'Store keys in the secret manager; never in source control.' }
          ].map((r) => (
            <div key={r.rule} className="flex items-start justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-white">{r.rule}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{r.detail}</p>
              </div>
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" />
            </div>
          ))}
        </CardBody>
      </Card>

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create API key"
        description="Full key value is shown once at creation time."
        fields={[
          { name: 'name', label: 'Key name', placeholder: 'e.g. production-gateway' },
          { name: 'scope', label: 'Scope', type: 'select', options: ['read', 'write', 'admin'], defaultValue: 'read' }
        ]}
        submitLabel="Create key"
        onCreate={(values) => {
          setKeys((prev) => [
            {
              id: `key-${Date.now()}`,
              name: values.name,
              key: `sk_sn_${Math.random().toString(36).slice(2, 14)}`,
              scopes: [values.scope],
              created: new Date().toISOString().slice(0, 10),
              lastUsed: 'Never',
              status: 'Active'
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}