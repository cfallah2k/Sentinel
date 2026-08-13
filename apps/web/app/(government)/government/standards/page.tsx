import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { governmentStandards } from '@/lib/mock-data';

const toneFor: Record<string, BadgeTone> = { Active: 'green', Draft: 'amber', Retired: 'slate' };

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="National Standards"
        description="Standards governing AI use across the public sector, with adoption progress."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {governmentStandards.map((s) => {
          const adoption = Math.min(100, Math.round((s.systems / 42) * 100));
          return (
            <Card key={s.id}>
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{s.name}</h3>
                    <p className="mt-1 text-[0.65rem] text-slate-500">Version {s.version}</p>
                  </div>
                  <Badge label={s.status} tone={toneFor[s.status]} />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[0.65rem]">
                    <span className="text-slate-400">Adoption</span>
                    <span className="font-semibold text-white">{adoption}%</span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar value={adoption} color={adoption > 70 ? 'bg-emerald-400' : adoption > 40 ? 'bg-amber-400' : 'bg-rose-400'} />
                  </div>
                  <p className="mt-2 text-[0.65rem] text-slate-500">{s.systems} systems aligned to this standard</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader title="Adoption Notes" subtitle="Standards with below-target uptake" />
        <CardBody>
          <p className="text-xs leading-5 text-slate-400">
            {governmentStandards.filter((s) => (s.systems / 42) * 100 < 40).map((s) => s.name).join(', ') || 'All standards at or above target adoption.'}
          </p>
        </CardBody>
      </Card>
    </GovShell>
  );
}