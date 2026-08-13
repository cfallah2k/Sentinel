import { Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ModelsTable } from '@/components/registry/registry-tables';
import { models } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = models.filter((m) => m.status === 'Approved');
  const requests = rows.reduce((a, m) => a + m.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Models"
        title="Approved Models"
        description="Models cleared for inference through the gateway."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved" value={rows.length} icon={ShieldCheck} accent="green" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Activity} accent="violet" />
        <StatCard label="High Risk" value={rows.filter((m) => m.risk === 'High').length} icon={Zap} accent="rose" />
        <StatCard label="Multimodal" value={rows.filter((m) => m.modality === 'Multimodal').length} icon={Cpu} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Approved Models" subtitle="Cleared for gateway traffic" />
        <CardBody>
          <ModelsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}