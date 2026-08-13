import { Activity, Braces, KeyRound, Webhook } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { CodeBlock } from '@/components/platform/code-block';
import { apiKeys, serviceAccounts, webhookEndpoints } from '@/components/platform/developer-data';
import { hourlySeries } from '@/lib/mock-data';

const quickLinks = [
  { label: 'API Reference', href: '/developer-portal/api', description: 'Every endpoint, method and auth requirement.' },
  { label: 'API Keys', href: '/developer-portal/api-keys', description: 'Create and manage scoped credentials.' },
  { label: 'Service Accounts', href: '/developer-portal/service-accounts', description: 'Machine identities for automations.' },
  { label: 'Webhooks', href: '/developer-portal/webhooks', description: 'Event delivery and retry policies.' },
  { label: 'SDKs', href: '/developer-portal/sdks', description: 'First-party client libraries.' },
  { label: 'Testing', href: '/developer-portal/testing', description: 'Interactive API playground.' }
];

export default function Page() {
  const requests24h = hourlySeries.reduce((a, h) => a + h.allowed + h.blocked + h.redacted, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Developer Portal"
        description="Everything you need to integrate applications with the Sentinel AI governance plane."
        actions={<PrimaryButton href="/developer-portal/api">Browse API Reference</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="API Keys" value={apiKeys.filter((k) => k.status === 'Active').length} delta={1} deltaLabel="this month" icon={KeyRound} accent="sky" sub="Live and test environments" />
        <StatCard label="Service Accounts" value={serviceAccounts.filter((s) => s.status === 'Active').length} icon={Braces} accent="cyan" sub="Machine identities" />
        <StatCard label="Webhooks" value={webhookEndpoints.filter((w) => w.status === 'Active').length} icon={Webhook} accent="violet" sub="Delivering events" />
        <StatCard label="Requests (24h)" value={requests24h.toLocaleString()} delta={12} deltaLabel="vs yesterday" icon={Activity} accent="green" sub="Evaluated by the gateway" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Gateway traffic" subtitle="Requests evaluated in the last 24 hours" />
          <CardBody>
            <AreaTrend data={hourlySeries} dataKey="allowed" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Quick start" subtitle="The fastest path to your first request" />
          <CardBody className="space-y-3">
            <CodeBlock
              label="npm"
              code={'npm install @sentinel/ts\nimport { Sentinel } from "@sentinel/ts";\n\nconst sentinel = new Sentinel({ apiKey: process.env.SENTINEL_API_KEY });\n\nconst res = await sentinel.requests.create({\n  model: "gpt-4.1",\n  messages: [{ role: "user", content: "Hello" }]\n});'}
            />
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((l) => (
                <a key={l.href} href={l.href} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:bg-white/10">
                  {l.label}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}