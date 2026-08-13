import { ScrollText, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { GatewayLogTable } from '@/components/enforcement/tables';
import { gatewayLogs, gatewayNavItems } from '@/components/enforcement/helpers';

export default function Page() {
  const errors = gatewayLogs.filter((l) => l.level === 'ERROR').length;
  const warns = gatewayLogs.filter((l) => l.level === 'WARN').length;
  const info = gatewayLogs.filter((l) => l.level === 'INFO').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Gateway Logs"
        description="Structured log feed from the gateway, policy engine, redaction and audit pipeline."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/logs" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Entries (sample)" value={gatewayLogs.length} icon={ScrollText} accent="sky" />
        <StatCard label="ERROR" value={errors} icon={AlertTriangle} accent="rose" />
        <StatCard label="WARN" value={warns} icon={ShieldAlert} accent="amber" />
        <StatCard label="INFO" value={info} icon={Info} accent="green" />
      </div>
      <Card>
        <CardHeader title="Log feed" subtitle="Recent gateway pipeline events" />
        <CardBody>
          <GatewayLogTable rows={gatewayLogs} />
        </CardBody>
      </Card>
    </div>
  );
}