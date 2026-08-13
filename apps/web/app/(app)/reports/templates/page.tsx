import Link from 'next/link';
import { FileJson, FileSpreadsheet, FileText, LayoutTemplate, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleNav } from '@/components/governance/module-nav';
import { reportsNavItems } from '@/components/governance/reports-home';

const templates = [
  { id: 'executive', name: 'Executive AI Governance Summary', category: 'Executive', description: 'Board-ready posture summary covering registry, approvals and residual risk exposure.', format: 'PDF', schedule: 'Monthly', icon: Sparkles },
  { id: 'policy', name: 'Policy Enforcement Weekly', category: 'Policy', description: 'Enforcement and violation metrics for all active policies with 30-day trends.', format: 'CSV', schedule: 'Weekly', icon: FileSpreadsheet },
  { id: 'incidents', name: 'Incident Response Metrics', category: 'Incidents', description: 'Severity mix, SLA adherence and resolution time for the SOC leadership.', format: 'PDF', schedule: 'Weekly', icon: FileText },
  { id: 'compliance', name: 'Data Flow Compliance Report', category: 'Compliance', description: 'Flow decisions and sensitive-category coverage by source and destination.', format: 'PDF', schedule: 'Monthly', icon: FileText },
  { id: 'usage', name: 'Provider Spend & Usage', category: 'Usage', description: 'Requests, tokens and estimated cost broken down by provider and application.', format: 'JSON', schedule: 'Monthly', icon: FileJson },
  { id: 'risk', name: 'Risk Register Snapshot', category: 'Risk', description: 'Residual scores, open findings and assessment status for the risk committee.', format: 'PDF', schedule: 'On-demand', icon: FileText }
];

const formatIcon: Record<string, typeof FileText> = {
  PDF: FileText,
  CSV: FileSpreadsheet,
  JSON: FileJson
};

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Report Templates"
        description="Pre-built report definitions covering security, governance, compliance, usage and risk."
      />
      <ModuleNav items={reportsNavItems} active="/reports/templates" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => {
          const Icon = formatIcon[t.format] ?? FileText;
          return (
            <Card key={t.id} className="flex flex-col">
              <CardBody className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <Badge label={t.category} tone="blue" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">{t.name}</h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">{t.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge label={t.format} tone="slate" />
                  <Badge label={t.schedule} tone="violet" />
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <Link href={`/reports/${t.id === 'executive' ? 'rpt-31' : t.id === 'policy' ? 'rpt-30' : t.id === 'incidents' ? 'rpt-29' : t.id === 'compliance' ? 'rpt-28' : t.id === 'usage' ? 'rpt-27' : 'rpt-26'}`} className="text-xs font-semibold text-sky-300 transition hover:text-sky-200">
                    View sample
                  </Link>
                  <Link
                    href="/reports/create"
                    className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
                  >
                    <LayoutTemplate className="h-3.5 w-3.5" /> Use template
                  </Link>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
