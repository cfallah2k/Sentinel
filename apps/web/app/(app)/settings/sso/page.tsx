'use client';

import { useState } from 'react';
import { Fingerprint, Globe, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, SaveButton, Toggle } from '@/components/platform/settings-form';

const providers = [
  { id: 'okta', name: 'Okta', icon: Fingerprint, tenant: 'nexora.okta.com', status: 'Connected', enforced: true },
  { id: 'azuread', name: 'Microsoft Entra ID', icon: ShieldCheck, tenant: 'nexora.onmicrosoft.com', status: 'Connected', enforced: false },
  { id: 'google', name: 'Google Workspace', icon: Globe, tenant: 'nexora.io', status: 'Not configured', enforced: false }
];

export default function Page() {
  const [samlUrl, setSamlUrl] = useState('https://login.sentinel.ai/saml2/nexora');
  const [metadata, setMetadata] = useState('https://nexora.okta.com/app/abcdef/metadata.xml');
  const [jit, setJit] = useState(true);
  const [scim, setScim] = useState(true);
  const [defaultRole, setDefaultRole] = useState('VIEWER');
  const [requireSso, setRequireSso] = useState(true);
  const [apiKeySignin, setApiKeySignin] = useState(false);
  const [blockUnknown, setBlockUnknown] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Single Sign-On"
        description="Connect your identity provider so members sign in with their corporate identity."
        actions={<Badge label="SSO enforced" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {providers.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge label={p.status} tone={toneForStatus(p.status)} />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{p.name}</h3>
              <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{p.tenant}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[0.65rem] text-slate-500">{p.enforced ? 'Enforced' : 'Optional'}</span>
                <Badge label={p.enforced ? 'Required' : 'Optional'} tone={p.enforced ? 'green' : 'slate'} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Primary provider" description="SAML 2.0 configuration for Okta.">
          <div className="space-y-4">
            <Field label="ACS URL" hint="Share this with your identity provider.">
              <TextInput value={samlUrl} onChange={setSamlUrl} />
            </Field>
            <Field label="IdP metadata URL">
              <TextInput value={metadata} onChange={setMetadata} />
            </Field>
            <div className="space-y-2.5">
              <Toggle label="JIT provisioning" hint="Create members on first sign-in" checked={jit} onChange={setJit} />
              <Toggle label="SCIM group sync" hint="Provision groups and members from the IdP" checked={scim} onChange={setScim} />
            </div>
            <Field label="Default role for new members">
              <SelectInput value={defaultRole} onChange={setDefaultRole} options={[{ value: 'VIEWER', label: 'VIEWER' }, { value: 'DEVELOPER', label: 'DEVELOPER' }, { value: 'SECURITY_ANALYST', label: 'SECURITY_ANALYST' }]} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Enforcement" description="How SSO applies to sign-in flows.">
          <div className="space-y-2.5">
            <Toggle label="Require SSO for all members" hint="Password sign-in is disabled" checked={requireSso} onChange={setRequireSso} />
            <Toggle label="Allow API key sign-in" hint="Machine access is unaffected by SSO" checked={apiKeySignin} onChange={setApiKeySignin} />
            <Toggle label="Block sign-in from unknown IdP tenants" hint="Prevents token smuggling" checked={blockUnknown} onChange={setBlockUnknown} />
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <p className="text-xs text-slate-400">
              SSO enforcement covers <span className="font-semibold text-emerald-300">100%</span> of members. 0 members would lose access.
            </p>
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}