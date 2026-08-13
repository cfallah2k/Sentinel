import { Brain, ShieldCheck, ShieldX, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ModelsTable } from '@/components/registry/registry-tables';
import { fmt, gatewayNavItems } from '@/components/enforcement/helpers';
import { models } from '@/lib/mock-data';

export default function Page() {
  const approved = models.filter((m) => m.status === 'Approved').length;
  const restricted = models.filter((m) => m.status === 'Restricted').length;
  const requests = models.reduce((a, m) => a + m.requests24h, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Models"
        description="Foundation models reachable through the gateway, with approval and risk status."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/models" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Models" value={models.length} icon={Brain} accent="sky" />
        <StatCard label="Approved" value={approved} icon={ShieldCheck} accent="green" />
        <StatCard label="Restricted" value={restricted} icon={ShieldX} accent="rose" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Sparkles} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Model registry" subtitle="All models routed through the gateway" />
        <CardBody>
          <ModelsTable rows={models} />
        </CardBody>
      </Card>
    </div>
  );
}