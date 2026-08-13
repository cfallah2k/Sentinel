import { Bot, ClipboardList, Hourglass, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SystemsTable } from '@/components/registry/registry-tables';
import { aiSystems } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = aiSystems.filter((s) => s.status === 'Registered');
  const requests = rows.reduce((a, s) => a + s.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · AI Systems"
        title="Registered AI Systems"
        description="Systems entered into the registry but not yet submitted for formal approval. These are typically early-stage or self-registered systems."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered" value={rows.length} icon={ClipboardList} accent="sky" />
        <StatCard label="Automated Oversight" value={rows.filter((s) => s.oversight === 'Automated').length} icon={Bot} accent="cyan" />
        <StatCard label="Awaiting Review" value={rows.filter((s) => s.risk === 'High' || s.risk === 'Critical').length} icon={Hourglass} accent="amber" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={ShieldCheck} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Registered AI Systems" subtitle="Logged in the inventory, pending formal approval" />
        <CardBody>
          <SystemsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}