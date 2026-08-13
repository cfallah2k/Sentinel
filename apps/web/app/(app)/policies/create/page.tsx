'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyCreateForm } from '@/components/enforcement/forms';
import { policyNavItems } from '@/components/enforcement/helpers';

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Create Policy"
        description="Define a policy with rules, scope, actions and enforcement mode."
      />
      <ModuleNav items={policyNavItems} active="/policies/create" />
      <PolicyCreateForm />
    </div>
  );
}