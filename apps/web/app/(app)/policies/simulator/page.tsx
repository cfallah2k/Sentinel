'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicySimulator } from '@/components/enforcement/forms';
import { policyNavItems } from '@/components/enforcement/helpers';

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Policy Simulator"
        description="Evaluate any policy against a scenario before it goes live."
      />
      <ModuleNav items={policyNavItems} active="/policies/simulator" />
      <PolicySimulator />
    </div>
  );
}