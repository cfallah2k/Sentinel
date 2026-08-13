import { Clock3, FileSearch, Hourglass, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  const pending = passports.filter((p) => p.status === 'Pending Review' || p.status === 'Draft');
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Pending Passports"
        description="Declarations awaiting review or still in draft. These systems cannot be promoted to production until certified."
      />
      <PassportNav active="Pending" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending review" value={passports.filter((p) => p.status === 'Pending Review').length} icon={Hourglass} accent="amber" sub="Queued for assessor" />
        <StatCard label="Drafts" value={passports.filter((p) => p.status === 'Draft').length} icon={FileSearch} accent="sky" sub="Incomplete declarations" />
        <StatCard label="Avg wait" value="4.2 days" icon={Clock3} accent="violet" sub="Median review time" />
        <StatCard label="High risk pending" value={pending.filter((p) => p.risk === 'High' || p.risk === 'Critical').length} icon={ShieldAlert} accent="rose" sub="Prioritize review" />
      </div>
      <Card>
        <CardHeader title="Review queue" subtitle="Passports waiting on certification" />
        <CardBody>
          <PassportTable passports={pending} />
        </CardBody>
      </Card>
    </div>
  );
}