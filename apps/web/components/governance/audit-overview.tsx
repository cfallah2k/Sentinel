import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import AuditEventHeader from './audit-header';
import { payloadFor, timelineFor } from './audit-helpers';
import type { AuditLog } from '@/lib/mock-data';

function Attribute({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  );
}

export default function AuditEventOverview({ log, active }: { log: AuditLog; active: string }) {
  const payload = payloadFor(log);
  return (
    <div className="space-y-5">
      <AuditEventHeader log={log} active={active} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Event attributes" subtitle="Actor, resource and execution context" />
          <CardBody>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <Attribute label="Actor" value={log.actor} />
              <Attribute label="Action" value={log.action} />
              <Attribute label="Resource" value={log.resource} />
              <Attribute label="IP address" value={log.ip} />
              <Attribute label="Context" value={log.context} />
              <Attribute label="Timestamp" value={log.timestamp} />
              <Attribute label="Result" value={log.result} />
              <Attribute label="Event id" value={log.id} />
            </div>
            <div className="mt-5">
              <Badge label={log.result} tone={toneForStatus(log.result)} />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Raw payload" subtitle="Structured event data" />
          <CardBody>
            <pre className="max-h-72 overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-[0.7rem] leading-5 text-slate-300">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Timeline" subtitle="Event lifecycle" />
        <CardBody>
          <ol className="space-y-0">
            {timelineFor(log).map((step, i) => (
              <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
                {i < timelineFor(log).length - 1 ? (
                  <span className="absolute left-[5px] top-4 h-full w-px bg-white/10" />
                ) : null}
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${i === timelineFor(log).length - 1 ? 'bg-sentinel-400' : 'bg-slate-600'}`} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">{step.label}</p>
                  <p className="mt-0.5 text-[0.7rem] text-slate-500">{step.detail}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-600">{step.time} UTC</p>
                </div>
              </li>
            ))}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}