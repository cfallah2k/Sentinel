import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import type { Integration } from './integration-data';

export function MethodBadge({ method }: { method: string }) {
  const tones: Record<string, 'green' | 'blue' | 'amber' | 'rose' | 'violet'> = {
    GET: 'blue',
    POST: 'green',
    PATCH: 'amber',
    DELETE: 'rose',
    PUT: 'violet'
  };
  return <Badge label={method} tone={tones[method] ?? 'slate'} />;
}

export function ScopeList({ scopes }: { scopes: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {scopes.map((s) => (
        <span
          key={s}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-slate-300"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[var(--surface)] px-5 py-4 shadow-panel backdrop-blur-xl">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1.5 text-xl font-semibold text-white">{value}</p>
      {sub ? <p className="mt-0.5 text-[0.65rem] text-slate-500">{sub}</p> : null}
    </div>
  );
}

export function IntegrationSummary({ integration }: { integration: Integration }) {
  return (
    <Card>
      <CardHeader title={integration.name} subtitle={integration.description} />
      <CardBody>
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={integration.status} tone={toneForStatus(integration.status)} />
          <Badge label={`v${integration.version.replace('v', '')}`} tone="slate" />
        </div>
        <p className="mt-3 text-xs text-slate-400">{integration.account ? `Account: ${integration.account}` : ''}</p>
      </CardBody>
    </Card>
  );
}