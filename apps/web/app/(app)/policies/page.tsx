import { FileCheck2, FileX2, ShieldCheck, ShieldOff, ShieldAlert, Boxes, ScrollText } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries } from '@/components/ui/charts';
import { Badge } from '@/components/ui/badge';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyTable } from '@/components/enforcement/tables';
import { DecisionBadge } from '@/components/enforcement/badges';
import { fmt, policyNavItems, policyStats, policyTemplates } from '@/components/enforcement/helpers';
import { dailySeries, policies } from '@/lib/mock-data';
import Link from 'next/link';

export default function Page() {
  const stats = policyStats();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Policies"
        description="Rules that decide what data may reach AI systems, and what happens when it shouldn't."
        actions={[
          <PrimaryButton key="create" href="/policies/create">Create Policy</PrimaryButton>,
          <SecondaryButton key="import" href="/policies/import">Import</SecondaryButton>
        ]}
      />
      <ModuleNav items={policyNavItems} active="/policies" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Policies" value={stats.active} delta={1} deltaLabel="this month" icon={ShieldCheck} accent="green" />
        <StatCard label="Draft" value={stats.draft} icon={FileCheck2} accent="amber" />
        <StatCard label="Disabled" value={stats.disabled} icon={FileX2} accent="slate" />
        <StatCard label="Violations / 24h" value={fmt(stats.violations24h)} delta={-5.2} deltaLabel="vs yesterday" icon={ShieldAlert} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Enforcements" value={fmt(stats.enforcements)} icon={ScrollText} accent="sky" />
        <StatCard label="Active Rules" value={stats.conditions} icon={Boxes} accent="violet" />
        <StatCard label="Violated Policies" value={stats.violated} icon={ShieldOff} accent="amber" />
        <StatCard label="Policies Tracked" value={stats.total} icon={FileCheck2} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Violations — last 30 days" subtitle="Blocked requests attributable to policy enforcement" />
        <CardBody>
          <BarSeries data={dailySeries} dataKey="blocked" xKey="date" color="#f87171" height={220} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="All policies" subtitle={`${policies.length} policies in the enforcement engine`} />
        <CardBody>
          <PolicyTable rows={policies} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Starter templates" subtitle="Quick-start policies maintained by Sentinel" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {policyTemplates.slice(0, 6).map((t) => (
              <div key={t.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-sentinel-500/40">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-white">{t.name}</p>
                    <DecisionBadge label={t.decision} />
                  </div>
                  <p className="mt-1.5 text-[0.65rem] leading-5 text-slate-500">{t.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge label={t.category} tone="blue" />
                    <span className="text-[0.65rem] text-slate-500">{t.rules} rules</span>
                  </div>
                </div>
                <Link href="/policies/create" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
                  Use template
                </Link>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}