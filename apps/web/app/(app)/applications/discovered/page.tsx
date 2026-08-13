import { AppWindow, Code2, Eye, Radar } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ApplicationsTable } from '@/components/registry/registry-tables';
import { applications } from '@/lib/mock-data';

export default function Page() {
  const rows = applications.filter((a) => a.status === 'Discovered');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Applications"
        title="Discovered Applications"
        description="Applications detected calling AI systems without a registry record. They are flagged until an owner claims them."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Discovered" value={rows.length} icon={Radar} accent="amber" />
        <StatCard label="AI Systems" value={rows.reduce((a, x) => a + x.aiSystemIds.length, 0)} icon={Code2} accent="sky" />
        <StatCard label="Awaiting Claim" value={rows.length} icon={Eye} accent="violet" />
        <StatCard label="Onboarding" value={rows.filter((a) => a.environment === 'Staging').length} icon={AppWindow} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Discovered Applications" subtitle="Detected via gateway telemetry" />
        <CardBody>
          <ApplicationsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}