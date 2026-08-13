'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyImportForm } from '@/components/enforcement/forms';
import { policyNavItems } from '@/components/enforcement/helpers';

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Import Policies"
        description="Import policy definitions in YAML — validate before they touch the engine."
      />
      <ModuleNav items={policyNavItems} active="/policies/import" />
      <PolicyImportForm />
    </div>
  );
}