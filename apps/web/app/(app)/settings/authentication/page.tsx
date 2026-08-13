'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard, Field, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';

export default function Page() {
  const [minLength, setMinLength] = useState('12');
  const [history, setHistory] = useState('5');
  const [expiry, setExpiry] = useState('90');
  const [requireMfaAdmins, setRequireMfaAdmins] = useState(true);
  const [lockout, setLockout] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('8');
  const [concurrentSessions, setConcurrentSessions] = useState(false);
  const [ipRestrictions, setIpRestrictions] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Authentication"
        description="Password, session and login policies for every member."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Password policy" description="Rules enforced for all member accounts.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Min length">
              <SelectInput value={minLength} onChange={setMinLength} options={[{ value: '10', label: '10 characters' }, { value: '12', label: '12 characters' }, { value: '16', label: '16 characters' }]} />
            </Field>
            <Field label="History">
              <SelectInput value={history} onChange={setHistory} options={[{ value: '3', label: '3 passwords' }, { value: '5', label: '5 passwords' }, { value: '10', label: '10 passwords' }]} />
            </Field>
            <Field label="Expiry">
              <SelectInput value={expiry} onChange={setExpiry} options={[{ value: '60', label: '60 days' }, { value: '90', label: '90 days' }, { value: '180', label: '180 days' }]} />
            </Field>
          </div>
          <div className="mt-4 space-y-2.5">
            <Toggle label="Require MFA for admin roles" hint="Admins must pass a second factor at sign-in" checked={requireMfaAdmins} onChange={setRequireMfaAdmins} />
            <Toggle label="Lock accounts after 5 failures" hint="Temporary lockout for 15 minutes" checked={lockout} onChange={setLockout} />
          </div>
        </SectionCard>

        <SectionCard title="Session rules" description="How long sessions live and where they work.">
          <div className="space-y-4">
            <Field label="Idle session timeout">
              <SelectInput value={sessionTimeout} onChange={setSessionTimeout} options={[{ value: '2', label: '2 hours' }, { value: '8', label: '8 hours' }, { value: '24', label: '24 hours' }]} />
            </Field>
            <div className="space-y-2.5">
              <Toggle label="Allow concurrent sessions" hint="Multiple devices signed in at once" checked={concurrentSessions} onChange={setConcurrentSessions} />
              <Toggle label="Restrict by IP allowlist" hint="Only office and VPN ranges can sign in" checked={ipRestrictions} onChange={setIpRestrictions} />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Login methods" description="Which sign-in flows members can use.">
        <div className="space-y-2.5">
          <Toggle label="Email + password" hint="Standard credential sign-in" checked onChange={() => {}} />
          <Toggle label="SSO (SAML/OIDC)" hint="Okta, Azure AD and Google Workspace" checked onChange={() => {}} />
          <Toggle label="Passkeys / WebAuthn" hint="Platform authenticators and security keys" checked={false} onChange={() => {}} />
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}