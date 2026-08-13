import { FlaskConical } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/platform/code-block';

const environment = [
  { label: 'Environment', value: 'sandbox-us-01' },
  { label: 'Base URL', value: 'https://sandbox.sentinel.ai' },
  { label: 'Region', value: 'US-East (Virginia)' },
  { label: 'Data Isolation', value: 'Full tenant isolation' }
];

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Sandbox"
        description="A fully isolated environment for building and testing integrations without production impact."
        actions={<Badge label="Sandbox enabled" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests This Month" value="412,880" icon={FlaskConical} accent="sky" sub="Sandbox quota: 2M" />
        <StatCard label="Test Keys" value="2" icon={FlaskConical} accent="cyan" sub="sk_test_* prefixed" />
        <StatCard label="Active Projects" value="5" icon={FlaskConical} accent="violet" sub="Across 3 teams" />
        <StatCard label="Last Reset" value="Monthly" icon={FlaskConical} accent="amber" sub="Next: 2026-09-01" />
      </div>

      <Card>
        <CardHeader title="Environment details" subtitle="Connection information for the sandbox" />
        <CardBody>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
            {environment.map((e) => (
              <div key={e.label} className="bg-slate-950/80 px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{e.label}</p>
                <p className="mt-1 font-mono text-sm text-slate-200">{e.value}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Sandbox usage" subtitle="Configure your client to point at the sandbox" />
          <CardBody className="space-y-3">
            <CodeBlock
              label="Env config"
              code={'SENTINEL_BASE_URL=https://sandbox.sentinel.ai\nSENTINEL_API_KEY=sk_test_6b9m...77d1'}
            />
            <p className="text-xs leading-5 text-slate-400">
              Sandbox traffic runs against mock providers with seeded data. Policies, keys and webhooks behave identically to production.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Sandbox limitations" subtitle="Differences from production" />
          <CardBody className="space-y-2.5">
            {[
              'No real model inference — deterministic mock responses',
              'Data resets on the first of each month',
              'Rate limits are 10x production defaults',
              'Webhook deliveries are delayed by 5 seconds'
            ].map((l) => (
              <div key={l} className="flex items-start gap-2.5 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sentinel-400" />
                {l}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}