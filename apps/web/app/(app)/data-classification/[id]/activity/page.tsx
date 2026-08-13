import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { ClassActivity } from '@/components/data-intel/classification-shared';
import { resolveClass } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Activity" />
      <ClassHeader row={row} />
      <ClassActivity row={row} />
      <Card>
        <CardHeader title="Recent enforcement" subtitle="Latest decisions involving this label" />
        <CardBody className="space-y-3">
          {[
            { action: 'Blocked transmission', detail: 'PII payload to external provider denied', time: '2026-08-13 09:12' },
            { action: 'Redaction applied', detail: 'Matched values stripped before egress', time: '2026-08-13 08:47' },
            { action: 'Policy evaluated', detail: `${row.name} handling rule matched`, time: '2026-08-13 08:31' },
            { action: 'Source rescan', detail: 'Label re-applied to 3 sources', time: '2026-08-12 22:05' }
          ].map((e, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-white">{e.action}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-400">{e.detail}</p>
              </div>
              <Badge label={e.time} tone="slate" />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}