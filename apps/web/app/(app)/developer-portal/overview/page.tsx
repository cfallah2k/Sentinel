import { Activity, Braces, KeyRound, Webhook } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/charts';
import { apiKeys, serviceAccounts, webhookEndpoints } from '@/components/platform/developer-data';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const decisions = (['Allowed', 'Blocked', 'Redacted', 'Approval Required', 'Logged'] as const).map((d) => ({
    name: d,
    value: gatewayRequests.filter((r) => r.decision === d).length
  }));

  const sections = [
    { title: 'API Reference', description: 'Complete endpoint documentation with request and response shapes.', count: '13 endpoints', href: '/developer-portal/api', icon: Braces },
    { title: 'API Keys', description: 'Scoped credentials for applications, CI and internal services.', count: `${apiKeys.length} keys`, href: '/developer-portal/api-keys', icon: KeyRound },
    { title: 'Service Accounts', description: 'Machine identities with role-based access for automation.', count: `${serviceAccounts.length} accounts`, href: '/developer-portal/service-accounts', icon: Activity },
    { title: 'Webhooks', description: 'Event subscriptions for incidents, approvals and usage.', count: `${webhookEndpoints.length} endpoints`, href: '/developer-portal/webhooks', icon: Webhook }
  ];

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Platform" title="Developer Overview" description="Your API surface at a glance." actions={<PrimaryButton href="/developer-portal/api-keys">Create API Key</PrimaryButton>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Endpoints" value="13" icon={Braces} accent="sky" sub="v1 API surface" />
        <StatCard label="Active Keys" value={apiKeys.filter((k) => k.status === 'Active').length} icon={KeyRound} accent="green" sub="Across all environments" />
        <StatCard label="Active Accounts" value={serviceAccounts.filter((s) => s.status === 'Active').length} icon={Activity} accent="cyan" sub="Machine identities" />
        <StatCard label="Active Webhooks" value={webhookEndpoints.filter((w) => w.status === 'Active').length} icon={Webhook} accent="violet" sub="Delivering events" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-400">{s.description}</p>
                </div>
                <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500">{s.count}</span>
              </Link>
            );
          })}
        </div>
        <Card>
          <CardHeader title="Decisions (40 sample)" subtitle="Gateway outcomes from the request log" />
          <CardBody>
            <DonutChart data={decisions} height={190} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}