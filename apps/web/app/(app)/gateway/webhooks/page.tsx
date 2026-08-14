'use client';

import { useState } from 'react';
import { BellRing, Gauge, Send, Webhook } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { WebhookTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems, webhooks, type WebhookRow } from '@/components/enforcement/helpers';
import QuickCreateModal from '@/components/ui/quick-create-modal';

export default function Page() {
  const [endpoints, setEndpoints] = useState<WebhookRow[]>(webhooks);
  const [createOpen, setCreateOpen] = useState(false);

  const active = endpoints.filter((w) => w.status === 'Active').length;
  const deliveries = endpoints.reduce((a, w) => a + w.deliveries24h, 0);
  const avgSuccess = (endpoints.reduce((a, w) => a + w.successRate, 0) / endpoints.length).toFixed(1);
  const failed = endpoints.filter((w) => w.status === 'Failed').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Webhooks"
        description="Outbound event delivery to your SIEM, Slack and reporting endpoints."
        actions={[
          <button
            key="add"
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Add Endpoint
          </button>
        ]}
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/api-keys" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Endpoints" value={active} icon={Webhook} accent="green" />
        <StatCard label="Deliveries / 24h" value={fmt(deliveries)} icon={Send} accent="sky" />
        <StatCard label="Avg Success Rate" value={`${avgSuccess}%`} icon={Gauge} accent="cyan" />
        <StatCard label="Failing Endpoints" value={failed} icon={BellRing} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Webhook endpoints" subtitle="Delivery stats over the last 24 hours" />
        <CardBody>
          <WebhookTable rows={endpoints} />
        </CardBody>
      </Card>

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add webhook endpoint"
        description="Events will start delivering once the endpoint is verified."
        fields={[
          { name: 'name', label: 'Endpoint name', placeholder: 'e.g. Security Alerts' },
          { name: 'url', label: 'Endpoint URL', placeholder: 'https://hooks.example.com/events' }
        ]}
        submitLabel="Add endpoint"
        onCreate={(values) => {
          setEndpoints((prev) => [
            {
              id: `wh-${Date.now()}`,
              name: values.name,
              url: values.url,
              events: ['decision.blocked'],
              deliveries24h: 0,
              successRate: 100,
              lastDelivery: '—',
              status: 'Active'
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}