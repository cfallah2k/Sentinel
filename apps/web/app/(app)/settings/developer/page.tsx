'use client';

import { useState } from 'react';
import { Boxes } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';

export default function Page() {
  const [customKeyName, setCustomKeyName] = useState('');
  const [keyTtl, setKeyTtl] = useState('90');
  const [sandbox, setSandbox] = useState(true);
  const [keyPrefix, setKeyPrefix] = useState('sn_nexora');
  const [keyRotation, setKeyRotation] = useState(true);
  const [ldap, setLdap] = useState(false);
  const [liveCalls, setLiveCalls] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Developer Settings"
        description="Controls for the developer portal: keys, sandbox and SDK access."
        actions={<Badge label="Preview enabled" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="API keys" description="Defaults for keys created in the portal.">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Key prefix">
                <TextInput value={keyPrefix} onChange={setKeyPrefix} />
              </Field>
              <Field label="Default rotation (days)">
                <SelectInput value={keyTtl} onChange={setKeyTtl} options={[{ value: '30', label: '30 days' }, { value: '60', label: '60 days' }, { value: '90', label: '90 days' }]} />
              </Field>
            </div>
            <Field label="Next key name" hint="Prefilled when creating a key">
              <TextInput value={customKeyName} onChange={setCustomKeyName} placeholder="production-gateway" />
            </Field>
            <Toggle label="Auto-rotate keys" hint="Forced rotation at the configured interval" checked={keyRotation} onChange={setKeyRotation} />
          </div>
        </SectionCard>

        <SectionCard title="Sandbox" description="Isolated environment for testing.">
          <div className="space-y-2.5">
            <Toggle label="Sandbox enabled" hint="Gateways can route to the sandbox tier" checked={sandbox} onChange={setSandbox} />
            <Toggle label="Live provider calls" hint="Allow sandbox keys to reach real models" checked={liveCalls} onChange={setLiveCalls} />
            <Toggle label="LDAP / SCIM sync" hint="Provision developer identities" checked={ldap} onChange={setLdap} />
          </div>
          <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
            SDK token TTL: <span className="font-semibold text-slate-200">24h</span> · changelog webhook: <span className="font-semibold text-slate-200">enabled</span>
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}