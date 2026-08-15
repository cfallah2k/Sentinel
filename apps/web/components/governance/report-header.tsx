import { Badge, toneForStatus } from '@/components/ui/badge';
import { ModuleNav } from './module-nav';
import type { Report } from '@/lib/mock-data';

export function reportDetailNavItems(id: string) {
  return [
    { href: `/reports/${id}`, label: 'Preview' },
    { href: `/reports/${id}/data`, label: 'Data' },
    { href: `/reports/${id}/schedule`, label: 'Schedule' },
    { href: `/reports/${id}/recipients`, label: 'Recipients' },
    { href: `/reports/${id}/history`, label: 'History' }
  ];
}

export default function ReportHeader({ report, active }: { report: Report; active: string }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Governance · Reports</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{report.name}</h1>
          <p className="mt-2 break-words text-sm leading-6 text-slate-400">
            {report.id} · {report.type} · {report.format} · last run {report.lastRun} · {report.recipients}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge label={report.schedule} tone={toneForStatus(report.schedule)} />
          <Badge label={report.format} tone="slate" />
          <Badge label={report.status} tone={toneForStatus(report.status)} />
        </div>
      </div>
      <ModuleNav items={reportDetailNavItems(report.id)} active={active} />
    </div>
  );
}