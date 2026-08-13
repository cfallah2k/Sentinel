import { Rocket } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { changelog } from '@/components/platform/developer-data';

const typeTone: Record<string, BadgeTone> = {
  Feature: 'green',
  Improvement: 'blue',
  Fix: 'amber',
  Breaking: 'rose'
};

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Changelog"
        description="What changed in the Sentinel developer platform, release by release."
        actions={
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Rocket className="h-4 w-4 text-sentinel-300" />
            Latest: v2.4.0
          </div>
        }
      />

      <div className="relative space-y-4 before:absolute before:left-[5px] before:top-2 before:h-full before:w-px before:bg-white/10">
        {changelog.map((c) => (
          <div key={c.version} className="relative pl-8">
            <span className="absolute left-0 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-sentinel-400 bg-slate-950" />
            <Card className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-white">{c.version}</h3>
                <Badge label={c.type} tone={typeTone[c.type]} />
                <span className="text-[0.65rem] text-slate-500">{c.date}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-slate-200">{c.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{c.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}