import { ShieldAlert, ShieldCheck, TriangleAlert, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { ProgressBar } from '@/components/ui/progress';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  const highRisk = passports.filter((p) => p.risk === 'High' || p.risk === 'Critical');
  const critical = highRisk.filter((p) => p.risk === 'Critical');
  const avgScore = Math.round(highRisk.reduce((a, p) => a + p.complianceScore, 0) / Math.max(1, highRisk.length));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="High-Risk Passports"
        description="Passports for systems rated High or Critical risk. These declarations carry mandatory extra controls and human oversight."
      />
      <PassportNav active="High risk" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High risk" value={highRisk.length} icon={ShieldAlert} accent="amber" sub="Risk High or Critical" />
        <StatCard label="Critical" value={critical.length} icon={TriangleAlert} accent="rose" sub="Escalated oversight" />
        <StatCard label="Avg compliance" value={`${avgScore}%`} icon={ShieldCheck} accent="sky" sub="Against frameworks" />
        <StatCard label="Certified" value={highRisk.filter((p) => p.status === 'Certified').length} icon={Zap} accent="cyan" sub="Still in production" />
      </div>
      <Card>
        <CardHeader title="Compliance exposure" subtitle={`Average compliance score across ${highRisk.length} high-risk declarations`} />
        <CardBody>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-semibold text-white">{avgScore}%</span>
            <div className="flex-1">
              <ProgressBar value={avgScore} color={avgScore > 60 ? 'bg-amber-400' : 'bg-rose-400'} />
              <div className="mt-2 flex justify-between text-[0.65rem] text-slate-500">
                <span>0%</span>
                <span>Threshold 60%</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="High-risk passports" subtitle="Declarations requiring additional controls" />
        <CardBody>
          <PassportTable passports={highRisk} />
        </CardBody>
      </Card>
    </div>
  );
}