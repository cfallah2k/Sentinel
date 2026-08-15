import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import AuditEventHeader from '@/components/governance/audit-header';
import { logById } from '@/components/governance/audit-helpers';
import { auditLogs, type AuditLog } from '@/lib/mock-data';

function StepRow({ log, index, highlighted }: { log: AuditLog; index: number; highlighted?: boolean }) {
  return (
    <li className={`relative flex gap-4 pb-6 last:pb-0 ${highlighted ? '' : 'opacity-80'}`}>
      <div className="flex flex-col items-center">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ring-1 ${
            highlighted
              ? 'bg-sentinel-500/15 text-sentinel-300 ring-sentinel-500/40'
              : 'bg-white/5 text-slate-500 ring-white/10'
          }`}
        >
          {index}
        </span>
        <span className={`mt-2 h-full w-px ${highlighted ? 'bg-sentinel-500/40' : 'bg-white/10'}`} />
      </div>
      <div className={`min-w-0 flex-1 rounded-2xl border p-4 ${highlighted ? 'border-sentinel-500/40 bg-sentinel-500/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {log.timestamp.slice(0, 16).replace('T', ' ')} UTC
          </p>
          {highlighted ? (
            <>
              <Badge label={log.result} tone={toneForStatus(log.result)} />
              <Badge label="current event" tone="blue" />
            </>
          ) : (
            <Badge label={log.result} tone={toneForStatus(log.result)} />
          )}
        </div>
        <p className={`mt-2 break-all font-mono text-xs ${highlighted ? 'text-sentinel-200' : 'text-slate-300'}`}>{log.action}</p>
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-slate-500">
          <span>{log.actor}</span>
          <span>{log.resource}</span>
          <span>{log.context}</span>
        </div>
      </div>
    </li>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = logById(id) ?? auditLogs[0];
  const idx = Math.max(0, auditLogs.findIndex((l) => l.id === log.id));
  const before = auditLogs.slice(Math.max(0, idx - 3), idx);
  const after = auditLogs.slice(idx + 1, idx + 4);
  const steps = [...before, log, ...after];

  return (
    <div className="space-y-5">
      <AuditEventHeader log={log} active={`/audit/${log.id}/timeline`} />
      <Card>
        <CardHeader
          title="Event timeline"
          subtitle={`${before.length} preceding and ${after.length} following events around ${log.id} in the audit stream`}
        />
        <CardBody>
          <ol className="mx-auto max-w-2xl">
            {steps.map((entry, i) => (
              <StepRow key={entry.id} log={entry} index={before.length + 1 + (i - before.length)} highlighted={entry.id === log.id} />
            ))}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}
