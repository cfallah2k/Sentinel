import { BellRing, Gauge, Send, Webhook } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { WebhookTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems, webhooks } from '@/components/enforcement/helpers';

export default function Page() {
  const active = webhooks.filter((w) => w.status === 'Active').length;
  const deliveries = webhooks.reduce((a, w) => a + w.deliveries24h, 0);
  const avgSuccess = (webhooks.reduce((a, w) => a + w.successRate, 0) / webhooks.length).toFixed(1);
  const failed = webhooks.filter((w) => w.status === 'Failed').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Webhooks"
        description="Outbound event delivery to your SIEM, Slack and reporting endpoints."
        actions={[<PrimaryButton key="add">Add Endpoint</PrimaryButton>]}
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/webhooks" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Endpoints" value={active} icon={Webhook} accent="green" />
        <StatCard label="Deliveries / 24h" value={fmt(deliveries)} icon={Send} accent="sky" />
        <StatCard label="Avg Success Rate" value={`${avgSuccess}%`} icon={Gauge} accent="cyan" />
        <StatCard label="Failing Endpoints" value={failed} icon={BellRing} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Webhook endpoints" subtitle="Delivery stats over the last 24 hours" />
        <CardBody>
          <WebhookTable rows={webhooks} />
        </CardBody>
      </Card>
    </div>
  );
}