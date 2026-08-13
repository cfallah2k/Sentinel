import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import AuditEventHeader from '@/components/governance/audit-header';
import { logById, payloadFor } from '@/components/governance/audit-helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = logById(id);
  if (!log) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Event not found</p>
          <p className="mt-1 text-xs text-slate-500">No audit event exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }
  const payload = payloadFor(log);
  return (
    <div className="space-y-5">
      <AuditEventHeader log={log} active={`/audit/${id}/context`} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Execution context" subtitle="Where and how this event was produced" />
          <CardBody>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Context</p>
                <p className="mt-1 text-sm text-white">{log.context}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Source IP</p>
                <p className="mt-1 text-sm text-white">{log.ip}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Result</p>
                <p className="mt-1 text-sm text-white">
                  <Badge label={log.result} tone={toneForStatus(log.result)} />
                </p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Timestamp</p>
                <p className="mt-1 text-sm text-white">{log.timestamp}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Raw payload" subtitle="Structured event data" />
          <CardBody>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-[0.7rem] leading-5 text-slate-300">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}