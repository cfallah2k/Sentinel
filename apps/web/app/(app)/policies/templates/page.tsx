import { BookOpen, Boxes, Layers, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { DecisionBadge } from '@/components/enforcement/badges';
import { policyNavItems, policyTemplates } from '@/components/enforcement/helpers';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Page() {
  const totalUses = policyTemplates.reduce((a, t) => a + t.uses, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Policy Templates"
        description="Battle-tested policy blueprints maintained by Sentinel — configure and deploy in minutes."
      />
      <ModuleNav items={policyNavItems} active="/policies/templates" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Templates" value={policyTemplates.length} icon={BookOpen} accent="sky" />
        <StatCard label="Deployments" value={totalUses} icon={Layers} accent="green" />
        <StatCard label="Rule Count" value={policyTemplates.reduce((a, t) => a + t.rules, 0)} icon={Boxes} accent="violet" />
        <StatCard label="Categories" value={4} icon={Users} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Template library" subtitle="Start from a proven baseline and customize" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {policyTemplates.map((t) => (
              <div key={t.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-sentinel-500/40">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <DecisionBadge label={t.decision} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{t.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge label={t.category} tone="blue" />
                    <span className="text-[0.65rem] text-slate-500">{t.rules} rules</span>
                    <span className="text-[0.65rem] text-slate-500">· {t.uses} deployments</span>
                  </div>
                </div>
                <Link
                  href={`/policies/create`}
                  className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
                >
                  Configure from template
                </Link>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}