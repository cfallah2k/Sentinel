'use client';

import { PageHeader } from '@/components/ui/page-header';
import { ModuleNav } from '@/components/governance/module-nav';
import { GatewayConfigForm } from '@/components/enforcement/forms';
import { gatewayNavItems } from '@/components/enforcement/helpers';

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Gateway Configuration"
        description="Proxy, redaction and caching settings for the enforcement layer."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/configuration" />
      <GatewayConfigForm />
    </div>
  );
}