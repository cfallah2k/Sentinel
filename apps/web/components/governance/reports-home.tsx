import Link from 'next/link';
import { BarChart3, CalendarClock, CheckCircle2, FileText, RefreshCw } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ModuleNav } from './module-nav';
import { reports } from '@/lib/mock-data';

export const reportsNavItems = [
  { href: '/reports', label: 'Overview' },
  { href: '/reports/security', label: 'Security' },
  { href: '/reports/ai-governance', label: 'AI Governance' },
  { href: '/reports/data-governance', label: 'Data Governance' },
  { href: '/reports/compliance', label: 'Compliance' },
  { href: '/reports/incidents', label: 'Incidents' },
  { href: '/reports/policies', label: 'Policies' },
  { href: '/reports/usage', label: 'Usage' },
  { href: '/reports/risk', label: 'Risk' },
  { href: '/reports/custom', label: 'Custom' },
  { href: '/reports/scheduled', label: 'Scheduled' },
  { href: '/reports/templates', label: 'Templates' }
];

const categoryMeta: { href: string; label: string; blurb: string }[] = [
  { href: '/reports/security', label: 'Security', blurb: 'Incident and enforcement metrics' },
  { href: '/reports/ai-governance', label: 'AI Governance', blurb: 'Registry and approval summaries' },
  { href: '/reports/data-governance', label: 'Data Governance', blurb: 'Flow and classification compliance' },
  { href: '/reports/compliance', label: 'Compliance', blurb: 'Framework progress and gaps' },
  { href: '/reports/incidents', label: 'Incidents', blurb: 'Response and severity trends' },
  { href: '/reports/policies', label: 'Policies', blurb: 'Enforcement and violations' },
  { href: '/reports/usage', label: 'Usage', blurb: 'Requests, tokens and spend' },
  { href: '/reports/risk', label: 'Risk', blurb: 'Assessments and residual scores' }
];

export default function ReportsHome({ active }: { active: string }) {
  const scheduled = reports.filter((r) => r.schedule !== 'On-demand').length;
  const ready = reports.filter((r) => r.status === 'Ready').length;
  const deliveryRate = Math.round((ready / reports.length) * 100);
  const latest = reports.reduce((a, b) => (b.lastRun > a.lastRun ? b : a), reports[0]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Reports"
        description="Schedule, generate and distribute governance reports across security, compliance, risk and usage."
        actions={
          <>
            <PrimaryButton href="/reports/create">Create Report</PrimaryButton>
            <SecondaryButton href="/reports/custom">Custom Builder</SecondaryButton>
          </>
        }
      />
      <ModuleNav items={reportsNavItems} active={active} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Scheduled" value={scheduled} delta={20} deltaLabel="of 8 reports" icon={CalendarClock} accent="sky" />
        <StatCard label="Last generated" value={latest.lastRun.slice(5)} delta={0} deltaLabel={latest.name} icon={RefreshCw} accent="green" />
        <StatCard label="Delivery success" value={`${deliveryRate}%`} delta={deliveryRate - 75} deltaLabel="vs target" icon={CheckCircle2} accent="violet" />
        <StatCard label="Total reports" value={reports.length} delta={33} deltaLabel="added this year" icon={BarChart3} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reports.map((r) => (
              <Link key={r.id} href={`/reports/${r.id}`} className="group">
                <Card className="transition group-hover:border-sentinel-500/40">
                  <CardBody>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white group-hover:text-sky-300">{r.name}</p>
                        <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-slate-500">{r.type} · {r.format}</p>
                      </div>
                      <Badge label={r.status} tone={toneForStatus(r.status)} />
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[0.65rem] text-slate-500">
                      <span>{r.schedule}</span>
                      <span>Last: {r.lastRun}</span>
                      <span>{r.recipients}</span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
          <Card>
            <CardHeader title="Popular categories" subtitle="Browse report catalogs by topic" />
            <CardBody className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categoryMeta.map((c) => (
                <Link key={c.href} href={c.href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-sentinel-500/40 hover:bg-white/[0.06]">
                  <div>
                    <p className="text-xs font-semibold text-white">{c.label}</p>
                    <p className="mt-0.5 text-[0.65rem] text-slate-500">{c.blurb}</p>
                  </div>
                  <FileText className="h-4 w-4 text-slate-500" size={16} />
                </Link>
              ))}
            </CardBody>
          </Card>
        </div>
        <Card className="h-fit">
          <CardHeader title="Delivery pipeline" subtitle="Report generation health" />
          <CardBody className="space-y-3">
            {reports.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">{r.name}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{r.lastRun} · {r.recipients}</p>
                </div>
                <Badge label={r.status} tone={toneForStatus(r.status)} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}