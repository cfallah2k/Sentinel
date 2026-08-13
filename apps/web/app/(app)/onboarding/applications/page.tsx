'use client';

import { useState } from 'react';
import { OnboardingShell, inputCls, labelCls } from '@/components/onboarding/onboarding-shell';

export default function Page() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Web App');
  const [environment, setEnvironment] = useState('Production');
  const [description, setDescription] = useState('');

  return (
    <OnboardingShell
      step={7}
      title="Register your first application"
      description="Applications hold API keys and identity the traffic that flows through the gateway. Add more later from the registry."
      prev="/onboarding/ai-providers"
      next="/onboarding/data-classification"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Application name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Customer Support Console" className={`${inputCls} mt-2`} />
        </div>
        <div>
          <label className={labelCls}>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            {['Web App', 'Mobile App', 'AI Agent', 'Internal System', 'Automation'].map((t) => (
              <option key={t} value={t} className="bg-slate-950">{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Environment</label>
          <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            {['Production', 'Staging', 'Development'].map((e) => (
              <option key={e} value={e} className="bg-slate-950">{e}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What this application does and who operates it"
            className={`${inputCls} mt-2 resize-y`}
          />
        </div>
      </div>
    </OnboardingShell>
  );
}
