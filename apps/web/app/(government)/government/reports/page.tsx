import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { ReportsTable } from '@/components/government/sections';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { reports } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Regulatory Reports"
        description="Generated reports for regulators, boards, and oversight committees."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reports.slice(0, 4).map((r) => (
          <Card key={r.id}>
            <CardBody>
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sky-300">
                <FileText className="h-4 w-4" size={16} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{r.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{r.type} · {r.format} · {r.schedule}</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge label={r.status} tone={r.status === 'Ready' ? 'green' : r.status === 'Scheduled' ? 'amber' : 'rose'} />
                <span className="text-[0.65rem] text-slate-500">{r.recipients}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <ReportsTable rows={reports} subtitle="Full catalog of regulatory reporting artifacts" />
    </GovShell>
  );
}