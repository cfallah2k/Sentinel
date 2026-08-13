import { BadgeCheck, FileCheck2, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  const approved = passports.filter((p) => p.status === 'Certified');
  const avgScore = Math.round(approved.reduce((a, p) => a + p.complianceScore, 0) / Math.max(1, approved.length));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Approved Passports"
        description="Systems with active, certified passports. These declarations are in full compliance with governing frameworks."
      />
      <PassportNav active="Approved" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Certified" value={approved.length} icon={BadgeCheck} accent="green" sub="Active declarations" />
        <StatCard label="Avg compliance" value={`${avgScore}%`} icon={ShieldCheck} accent="sky" sub="Across certified systems" />
        <StatCard label="In production" value={approved.filter((p) => p.environment === 'Production').length} icon={FileCheck2} accent="cyan" sub="Live systems" />
        <StatCard label="High risk certified" value={approved.filter((p) => p.risk === 'High' || p.risk === 'Critical').length} icon={ShieldCheck} accent="amber" sub="With extra controls" />
      </div>
      <Card>
        <CardHeader title="Certified passports" subtitle={`${approved.length} systems approved for production use`} />
        <CardBody>
          <PassportTable passports={approved} />
        </CardBody>
      </Card>
    </div>
  );
}