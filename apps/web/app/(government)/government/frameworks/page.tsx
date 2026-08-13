import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { Scale } from 'lucide-react';
import { complianceFrameworks } from '@/lib/mock-data';

const toneFor: Record<string, BadgeTone> = { 'On Track': 'green', 'At Risk': 'amber', Behind: 'rose' };

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="National AI Frameworks"
        description="Governance frameworks operationalized for the oversight program."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {complianceFrameworks.map((f) => (
          <Card key={f.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                  <Scale className="h-4 w-4" size={16} />
                </div>
                <Badge label={f.status} tone={toneFor[f.status]} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{f.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{f.standard} · {f.controls} controls · {f.evidence} evidence records</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[0.65rem]">
                  <span className="text-slate-400">Implementation</span>
                  <span className="font-semibold text-white">{f.progress}%</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={f.progress} color={f.progress > 75 ? 'bg-emerald-400' : f.progress > 55 ? 'bg-amber-400' : 'bg-rose-400'} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[0.65rem] text-slate-500">
                <span>{f.passed} passed · {f.failed} failed</span>
                <span>Next audit {f.nextAudit}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </GovShell>
  );
}