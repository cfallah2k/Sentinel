import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { StorageBreakdown } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="storage">
        <Card>
          <CardHeader title="Object Storage" subtitle="Total 2.96 TB across all data classes" />
          <CardBody>
            <StorageBreakdown />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Retention Windows" subtitle="Data lifecycle policies" />
          <CardBody className="divide-y divide-white/5">
            {[
              { label: 'Gateway request logs', detail: '30 days hot · 12 months archive', retention: 45 },
              { label: 'Audit trail archive', detail: '7 years immutability', retention: 90 },
              { label: 'Redaction cache', detail: 'TTL 24 hours', retention: 15 },
              { label: 'Report artifacts', detail: '90 days, then tier to glacier', retention: 30 }
            ].map((r) => (
              <div key={r.label} className="py-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{r.label}</span>
                  <span className="text-slate-400">{r.detail}</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={r.retention} color="bg-violet-400" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </SystemShell>
    </AdminShell>
  );
}