import { BadgeCheck, Clock3, FileSearch, ShieldAlert } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { ProgressBar } from '@/components/ui/progress';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { frameworkRows, passports } from '@/components/data-intel/derived';

export default function Page() {
  const certified = passports.filter((p) => p.status === 'Certified').length;
  const pending = passports.filter((p) => p.status === 'Pending Review').length;
  const expired = passports.filter((p) => p.status === 'Expired').length;
  const statusData = ['Certified', 'Pending Review', 'Draft', 'Expired'].map((s) => ({
    name: s,
    value: passports.filter((p) => p.status === s).length
  }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="AI Passports"
        description="A passport is the data-handling declaration for every AI system: what it processes, where data lives, how long it is kept and who is accountable."
        actions={
          <>
            <PrimaryButton href="/ai-passports/create">Create passport</PrimaryButton>
            <SecondaryButton href="/ai-passports/import">Import passports</SecondaryButton>
          </>
        }
      />
      <PassportNav active="Overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Passports" value={passports.length} icon={FileSearch} accent="sky" sub="Registered AI systems" />
        <StatCard label="Certified" value={certified} delta={5.2} deltaLabel="vs last quarter" icon={BadgeCheck} accent="green" sub={`${Math.round((certified / passports.length) * 100)}% of registry`} />
        <StatCard label="Pending review" value={pending} delta={2.1} deltaLabel="awaiting decision" icon={Clock3} accent="amber" sub="Renewals and new systems" />
        <StatCard label="Expired" value={expired} delta={0.4} deltaLabel="needs reissue" icon={ShieldAlert} accent="rose" sub="Certification lapsed" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Passport status" subtitle="Distribution across the registry" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Framework compliance" subtitle="Progress against governing frameworks" />
          <CardBody className="space-y-4">
            {frameworkRows.map((f) => (
              <div key={f.id}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{f.name}</span>
                  <span className="text-slate-400">{f.progress}% · {f.status}</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={f.progress} color={f.progress > 70 ? 'bg-emerald-400' : f.progress > 55 ? 'bg-amber-400' : 'bg-rose-400'} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Passport registry" subtitle={`${passports.length} data-handling declarations`} action={<SecondaryButton href="/ai-passports/all">View all</SecondaryButton>} />
        <CardBody>
          <PassportTable passports={passports} />
        </CardBody>
      </Card>
    </div>
  );
}