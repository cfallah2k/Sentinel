'use client';

import { useState } from 'react';
import { OnboardingShell, inputCls, labelCls } from '@/components/onboarding/onboarding-shell';
import { currentUser, roleOptions } from '@/lib/mock-data';

export default function Page() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [title, setTitle] = useState(currentUser.title);
  const [role, setRole] = useState(currentUser.role);

  return (
    <OnboardingShell
      step={2}
      title="Your profile"
      description="Tell us who is setting up this workspace. This identifies you in the audit trail and approval flows."
      prev="/onboarding"
      next="/onboarding/organization"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className={`${inputCls} mt-2`} />
        </div>
        <div>
          <label className={labelCls}>Work email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" className={`${inputCls} mt-2`} />
        </div>
        <div>
          <label className={labelCls}>Job title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VP of AI Security" className={`${inputCls} mt-2`} />
        </div>
        <div>
          <label className={labelCls}>Default role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            {roleOptions.map((r) => (
              <option key={r} value={r} className="bg-slate-950">{r.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>
    </OnboardingShell>
  );
}
