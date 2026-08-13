'use client';

import { useState } from 'react';
import { OnboardingShell, ToggleRow, inputCls, labelCls } from '@/components/onboarding/onboarding-shell';

export default function Page() {
  const [mfa, setMfa] = useState(true);
  const [sso, setSso] = useState(false);
  const [scim, setScim] = useState(false);
  const [passwordless, setPasswordless] = useState(true);
  const [timeoutMins, setTimeoutMins] = useState('720');

  return (
    <OnboardingShell
      step={11}
      title="Security defaults"
      description="Configure authentication and session policies for every member of this workspace. MFA is strongly recommended."
      prev="/onboarding/integrations"
      next="/onboarding/api"
    >
      <div className="divide-y divide-white/5">
        <ToggleRow
          label="Require MFA for all members"
          description="Members must enroll a second factor before accessing the console."
          checked={mfa}
          onToggle={() => setMfa((v) => !v)}
        />
        <ToggleRow
          label="Enable SSO (SAML 2.0)"
          description="Connect your identity provider for single sign-on across the workspace."
          checked={sso}
          onToggle={() => setSso((v) => !v)}
        />
        <ToggleRow
          label="SCIM provisioning"
          description="Automatically sync members and roles from your identity provider."
          checked={scim}
          onToggle={() => setScim((v) => !v)}
        />
        <ToggleRow
          label="Passwordless login"
          description="Allow magic-link sign in in addition to passwords."
          checked={passwordless}
          onToggle={() => setPasswordless((v) => !v)}
        />
      </div>
      <div className="mt-5 border-t border-white/5 pt-5">
        <label className={labelCls}>Session timeout</label>
        <select value={timeoutMins} onChange={(e) => setTimeoutMins(e.target.value)} className={`${inputCls} mt-2 max-w-64 appearance-none`}>
          <option value="120" className="bg-slate-950">2 hours</option>
          <option value="480" className="bg-slate-950">8 hours</option>
          <option value="720" className="bg-slate-950">12 hours</option>
          <option value="1440" className="bg-slate-950">24 hours</option>
        </select>
      </div>
    </OnboardingShell>
  );
}
