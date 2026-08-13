import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const pending = approvals.filter((a) => a.status === 'Pending');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Regulatory Approvals"
        description="Queue of requests requiring regulatory decision."
      />
      <Card>
        <CardHeader title="Approval Queue" subtitle={`${pending.length} pending · ${approvals.filter((a) => a.status === 'Approved').length} approved · ${approvals.filter((a) => a.status === 'Denied').length} denied`} />
        <CardBody className="divide-y divide-white/5">
          {approvals.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-3 py-3 text-xs">
              <div>
                <p className="font-semibold text-white">{a.type}</p>
                <p className="mt-0.5 text-slate-400">{a.requester} — {a.note}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{a.id} · requested {a.requestedAt} · expires {a.expiresAt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={a.risk} tone={a.risk === 'Critical' ? 'rose' : a.risk === 'High' ? 'red' : 'amber'} />
                <Badge label={a.status} tone={a.status === 'Approved' ? 'green' : a.status === 'Denied' ? 'rose' : a.status === 'Expired' ? 'slate' : 'amber'} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </GovShell>
  );
}