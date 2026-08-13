'use client';

import { use } from 'react';
import { Badge } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { PolicySimulator } from '@/components/enforcement/forms';
import { policyById, policyNav } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const policy = policyById(id) ?? policies[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Simulate this policy against synthetic scenarios before changing it."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${policy.id}`} items={policyNav(policy.id)} />
      <PolicySimulator defaultPolicyId={policy.id} />
    </div>
  );
}