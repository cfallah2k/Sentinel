import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import type { ComplianceFramework } from '@/lib/mock-data';

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-[0.6rem] uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

export default function FrameworkCard({ framework }: { framework: ComplianceFramework }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">{framework.name}</h3>
            <p className="mt-0.5 text-xs text-slate-500">{framework.standard}</p>
          </div>
          <Badge label={framework.status} tone={toneForStatus(framework.status)} />
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Implementation</span>
            <span className="font-semibold text-white">{framework.progress}%</span>
          </div>
          <ProgressBar
            value={framework.progress}
            color={framework.status === 'Behind' ? 'bg-rose-400' : framework.status === 'At Risk' ? 'bg-amber-400' : 'bg-sky-400'}
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
          <MiniStat label="Controls" value={framework.controls} />
          <MiniStat label="Evidence" value={framework.evidence} />
          <MiniStat label="Gaps" value={framework.gaps} />
        </div>
        <p className="mt-4 text-[0.65rem] text-slate-500">Next audit: {framework.nextAudit} · {framework.passed} passed / {framework.failed} failed</p>
      </CardBody>
    </Card>
  );
}