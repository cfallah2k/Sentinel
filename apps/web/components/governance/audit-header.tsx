import { Badge, toneForStatus } from '@/components/ui/badge';
import { ModuleNav } from './module-nav';
import type { AuditLog } from '@/lib/mock-data';

export function auditEventNavItems(id: string) {
  return [
    { href: `/audit/${id}`, label: 'Overview' },
    { href: `/audit/${id}/context`, label: 'Context' },
    { href: `/audit/${id}/actor`, label: 'Actor' },
    { href: `/audit/${id}/resource`, label: 'Resource' },
    { href: `/audit/${id}/timeline`, label: 'Timeline' }
  ];
}

export default function AuditEventHeader({ log, active }: { log: AuditLog; active: string }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Governance · Audit</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{log.action}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {log.id} · {log.timestamp.slice(0, 16).replace('T', ' ')} UTC · <span className="text-slate-300">{log.resource}</span>
          </p>
        </div>
        <Badge label={log.result} tone={toneForStatus(log.result)} />
      </div>
      <ModuleNav items={auditEventNavItems(log.id)} active={active} />
    </div>
  );
}