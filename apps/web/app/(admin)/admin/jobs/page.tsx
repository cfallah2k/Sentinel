import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { StatCard } from '@/components/ui/stat-card';
import { JobsTable } from '@/components/admin/sections';
import { Play, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { systemJobs } from '@/lib/mock-data';

export default function Page() {
  const running = systemJobs.filter((j) => j.status === 'Running').length;
  const done = systemJobs.filter((j) => j.status === 'Completed').length;
  const failed = systemJobs.filter((j) => j.status === 'Failed').length;
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Background Jobs"
        description="System and tenant background jobs across the platform."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jobs" value={systemJobs.length} icon={Play} accent="sky" />
        <StatCard label="Running" value={running} icon={Loader2} accent="cyan" />
        <StatCard label="Completed" value={done} icon={CheckCircle2} accent="green" />
        <StatCard label="Failed" value={failed} icon={AlertTriangle} accent="rose" />
      </div>
      <JobsTable rows={systemJobs} title="Job Queue" subtitle="All background jobs with progress and status" />
    </AdminShell>
  );
}