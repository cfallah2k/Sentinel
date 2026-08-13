import { BadgeCheck, FileSearch, ShieldCheck, TriangleAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  const certified = passports.filter((p) => p.status === 'Certified').length;
  const pending = passports.filter((p) => p.status === 'Pending Review').length;
  const expired = passports.filter((p) => p.status === 'Expired').length;
  const highRisk = passports.filter((p) => p.risk === 'High' || p.risk === 'Critical').length;
  const statusData = ['Certified', 'Pending Review', 'Draft', 'Expired'].map((s) => ({
    name: s,
    value: passports.filter((p) => p.status === s).length
  }));
  const avgCompliance = Math.round(passports.reduce((a, p) => a + p.complianceScore, 0) / passports.length);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Passport Overview"
        description="Health of the passport program: certification coverage, risk exposure and renewal pipeline."
      />
      <PassportNav active="Overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Passports" value={passports.length} icon={FileSearch} accent="sky" sub="Total declarations" />
        <StatCard label="Certified" value={certified} icon={BadgeCheck} accent="green" sub="Fully compliant" />
        <StatCard label="Pending review" value={pending} icon={TriangleAlert} accent="amber" sub="In the renewal pipeline" />
        <StatCard label="High risk" value={highRisk} icon={ShieldCheck} accent="rose" sub="Require extra controls" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Status distribution" subtitle="Registry composition" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Registry health" subtitle="Key metrics across all passports" />
          <CardBody className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Avg compliance score', value: `${avgCompliance}%` },
              { label: 'Expired', value: expired },
              { label: 'Drafts', value: passports.filter((p) => p.status === 'Draft').length },
              { label: 'Production systems', value: passports.filter((p) => p.environment === 'Production').length },
              { label: 'Data types tracked', value: [...new Set(passports.flatMap((p) => p.dataTypes))].length },
              { label: 'Certifications held', value: [...new Set(passports.flatMap((p) => p.certifications))].length }
            ].map((it) => (
              <div key={it.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">{it.label}</p>
                <p className="mt-1 text-xl font-semibold text-white">{it.value}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Recent passports" subtitle="Latest registrations" />
        <CardBody>
          <PassportTable passports={[...passports].sort((a, b) => b.approvedAt.localeCompare(a.approvedAt)).slice(0, 8)} pageSize={8} />
        </CardBody>
      </Card>
    </div>
  );
}