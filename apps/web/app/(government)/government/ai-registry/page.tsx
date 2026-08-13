import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { ClipboardCheck, Radar, ShieldAlert, ShieldCheck } from 'lucide-react';
import { governmentRegistry } from '@/lib/mock-data';

const registered = governmentRegistry.filter((r) => r.status === 'Registered').length;
const pending = governmentRegistry.filter((r) => r.status === 'Pending').length;
const restricted = governmentRegistry.filter((r) => r.status === 'Restricted' || r.status === 'Expired').length;
const highRisk = governmentRegistry.filter((r) => r.risk === 'High' || r.risk === 'Critical').length;

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="National AI Registry"
        description="Every AI system operating on public-sector data, with registration status and risk tier."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered" value={registered} icon={ShieldCheck} accent="green" />
        <StatCard label="Pending Review" value={pending} icon={ClipboardCheck} accent="amber" />
        <StatCard label="Restricted / Expired" value={restricted} icon={ShieldAlert} accent="rose" />
        <StatCard label="High / Critical Risk" value={highRisk} icon={Radar} accent="red" />
      </div>
      <RegistryTable title="Registry — All Systems" subtitle="Complete register of systems under oversight" />
    </GovShell>
  );
}