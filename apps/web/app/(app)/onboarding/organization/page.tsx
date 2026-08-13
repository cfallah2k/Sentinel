'use client';

import { useState } from 'react';
import { OnboardingShell, inputCls, labelCls } from '@/components/onboarding/onboarding-shell';
import { billingPlans, currentOrg } from '@/lib/mock-data';

export default function Page() {
  const [name, setName] = useState(currentOrg.name);
  const [slug, setSlug] = useState(currentOrg.slug);
  const [region, setRegion] = useState(currentOrg.region);
  const [plan, setPlan] = useState(currentOrg.plan);
  const [seats, setSeats] = useState(currentOrg.seats);

  return (
    <OnboardingShell
      step={3}
      title="Your organization"
      description="Set up the workspace details that appear across the control plane, from the registry to generated reports."
      prev="/onboarding/profile"
      next="/onboarding/industry"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Organization name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme Corp" className={`${inputCls} mt-2`} />
        </div>
        <div>
          <label className={labelCls}>Workspace slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value.replace(/\s+/g, '-').toLowerCase())} placeholder="acme" className={`${inputCls} mt-2 font-mono`} />
        </div>
        <div>
          <label className={labelCls}>Primary region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            <option value="US-East (Virginia)" className="bg-slate-950">US-East (Virginia)</option>
            <option value="US-West (Oregon)" className="bg-slate-950">US-West (Oregon)</option>
            <option value="EU (Frankfurt)" className="bg-slate-950">EU (Frankfurt)</option>
            <option value="EU (Ireland)" className="bg-slate-950">EU (Ireland)</option>
            <option value="APAC (Singapore)" className="bg-slate-950">APAC (Singapore)</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Plan</label>
          <select value={plan} onChange={(e) => setPlan(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            {billingPlans.map((p) => (
              <option key={p.id} value={p.name} className="bg-slate-950">{p.name} — ${p.price}/mo</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Seats</label>
          <input type="number" min={1} value={seats} onChange={(e) => setSeats(Number(e.target.value))} className={`${inputCls} mt-2`} />
        </div>
      </div>
    </OnboardingShell>
  );
}
