import { AppWindow, Layers, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApplicationsTable } from '@/components/registry/registry-tables';
import { gatewayNavItems } from '@/components/enforcement/helpers';
import { applications } from '@/lib/mock-data';

export default function Page() {
  const production = applications.filter((a) => a.environment === 'Production').length;
  const highRisk = applications.filter((a) => a.risk === 'High').length;
  const active = applications.filter((a) => a.status === 'Active').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Applications"
        description="Applications routing traffic through the gateway, with their key and risk posture."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/applications" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Applications" value={applications.length} icon={AppWindow} accent="sky" />
        <StatCard label="Active" value={active} icon={ShieldCheck} accent="green" />
        <StatCard label="Production" value={production} icon={Layers} accent="violet" />
        <StatCard label="High Risk" value={highRisk} icon={ShieldAlert} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Registered applications" subtitle="Traffic sources attached to the gateway" />
        <CardBody>
          <ApplicationsTable rows={applications} />
        </CardBody>
      </Card>
    </div>
  );
}