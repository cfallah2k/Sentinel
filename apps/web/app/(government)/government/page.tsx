import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend, DonutChart } from '@/components/ui/charts';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable, registrationsOver30d, registryStatusDistribution } from '@/components/government/registry-table';
import { Building2, ClipboardCheck, Landmark, Radar, ShieldAlert } from 'lucide-react';
import { governmentAgencies, governmentRegistry, platformOrganizations } from '@/lib/mock-data';

const highRisk = governmentRegistry.filter((r) => r.risk === 'High' || r.risk === 'Critical').length;
const pendingReviews = governmentRegistry.filter((r) => r.status === 'Pending').length;

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="National AI Oversight"
        description="Regulatory oversight of AI operators, registered systems, and high-risk deployments across the federation."
        actions={<SecondaryButton href="/government/analytics">Oversight Analytics</SecondaryButton>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Registered Organizations" value={platformOrganizations.length} delta={12} deltaLabel="vs last quarter" icon={Building2} accent="sky" />
        <StatCard label="Registered AI Systems" value={governmentRegistry.length} delta={8} deltaLabel="vs last quarter" icon={Radar} accent="cyan" />
        <StatCard label="Agencies" value={governmentAgencies.length} icon={Landmark} accent="violet" sub="3 federal jurisdictions" />
        <StatCard label="High-Risk Systems" value={highRisk} delta={-4} deltaLabel="vs last quarter" icon={ShieldAlert} accent="rose" />
        <StatCard label="Pending Reviews" value={pendingReviews} icon={ClipboardCheck} accent="amber" sub="awaiting regulatory review" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Registrations — 30 Days" subtitle="New system registrations submitted to the national registry" />
          <CardBody>
            <AreaTrend data={registrationsOver30d()} dataKey="registrations" xKey="date" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Registry Status" subtitle="Distribution across registration states" />
          <CardBody>
            <DonutChart data={registryStatusDistribution()} height={180} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RegistryTable subtitle="All registered AI systems under national oversight" />
        </div>
        <Card>
          <CardHeader title="Registry Snapshot" subtitle="Operators filing most registrations" />
          <CardBody className="space-y-3">
            {['CivicTech Ltd', 'GovLabs', 'Atlas Public', 'DataGov Solutions'].map((op, i) => {
              const count = governmentRegistry.filter((r) => r.operator === op).length;
              const tones: BadgeTone[] = ['sky', 'cyan', 'violet', 'green'];
              return (
                <div key={op} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
                  <span className="font-semibold text-white">{op}</span>
                  <div className="flex items-center gap-2">
                    <Badge label={`${count} systems`} tone={tones[i % tones.length]} />
                  </div>
                </div>
              );
            })}
            <p className="pt-1 text-[0.65rem] leading-4 text-slate-500">Operator concentration flagged for diversity review in Q3.</p>
          </CardBody>
        </Card>
      </div>
    </GovShell>
  );
}