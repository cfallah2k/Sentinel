import { EyeOff, Activity, ShieldCheck, Layers } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems, gatewayTotals, policyName, sensitivityOf } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const rows = gatewayRequests.filter((r) => r.decision === 'Redacted');
  const share = Math.round((rows.length / Math.max(1, gatewayRequests.length)) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Redacted Requests"
        description="Requests where sensitive fields were scrubbed before transmission."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/redacted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Redacted / 24h" value={fmt(totals.redacted)} delta={3.1} deltaLabel="vs yesterday" icon={EyeOff} accent="violet" />
        <StatCard label="Share of traffic" value={`${share}%`} icon={Activity} accent="sky" />
        <StatCard label="Detector Coverage" value="8 detectors" icon={ShieldCheck} accent="green" />
        <StatCard label="Sample Requests" value={rows.length} icon={Layers} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Redacted requests" subtitle="Sensitive data scrubbed by the redaction engine" />
        <CardBody>
          <RequestTable rows={rows} searchPlaceholder="Search redacted requests..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Redaction details" subtitle="What was scrubbed on each request" />
        <CardBody className="space-y-3">
          {rows.slice(0, 6).map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">{r.id}</p>
                <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">{r.policyId ? policyName(r.policyId) : 'No policy matched'}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={r.category} tone="violet" />
                <Badge label={sensitivityOf(r.category)} tone="slate" />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}