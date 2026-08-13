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
        title="Policy Testing"
        description="Test candidate policies against realistic traffic before enforcement."
      />
      <ModuleNav items={policyNavItems} active="/policies/test" />
      <PolicySimulator defaultPolicyId="pol-6" />
    </div>
  );
}