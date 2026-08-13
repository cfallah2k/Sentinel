import { FileSearch } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="All Passports"
        description="The complete registry of data-handling declarations, including drafts, expirations and systems pending review."
      />
      <PassportNav active="All" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total passports" value={passports.length} icon={FileSearch} accent="sky" sub="Full registry" />
        <StatCard label="Certified" value={passports.filter((p) => p.status === 'Certified').length} icon={FileSearch} accent="green" sub="Active certifications" />
        <StatCard label="Pending" value={passports.filter((p) => p.status === 'Pending Review').length} icon={FileSearch} accent="amber" sub="Awaiting decision" />
        <StatCard label="Expired" value={passports.filter((p) => p.status === 'Expired').length} icon={FileSearch} accent="rose" sub="Need reissue" />
      </div>
      <Card>
        <CardHeader title="Registry" subtitle={`${passports.length} passports on file`} />
        <CardBody>
          <PassportTable passports={passports} pageSize={12} />
        </CardBody>
      </Card>
    </div>
  );
}