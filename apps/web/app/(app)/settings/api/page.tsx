'use client';

import { useState } from 'react';
import { Plug } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';

export default function Page() {
  const [rateLimit, setRateLimit] = useState('500');
  const [burstLimit, setBurstLimit] = useState('1000');
  const [defaultTimeout, setDefaultTimeout] = useState('30');
  const [corsOrigin, setCorsOrigin] = useState('https://app.nexora.io');
  const [v2Preview, setV2Preview] = useState(false);
  const [ipAllowlist, setIpAllowlist] = useState('10.0.0.0/8\n172.16.0.0/12');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="API Settings"
        description="Gateway limits, CORS and key policies for the Sentinel API."
        actions={<Badge label="v1 stable" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Rate limits" description="Per-key limits applied at the gateway edge.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Sustained (req/s)">
              <TextInput value={rateLimit} onChange={setRateLimit} type="number" />
            </Field>
            <Field label="Burst (req/s)">
              <TextInput value={burstLimit} onChange={setBurstLimit} type="number" />
            </Field>
            <Field label="Timeout (s)">
              <TextInput value={defaultTimeout} onChange={setDefaultTimeout} type="number" />
            </Field>
          </div>
          <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
            Monthly quota: <span className="font-semibold text-slate-200">10M requests</span> · used <span className="font-semibold text-sky-300">82%</span>
          </div>
        </SectionCard>

        <SectionCard title="Access control" description="Where the API is reachable from.">
          <div className="space-y-4">
            <Field label="Allowed CORS origin">
              <TextInput value={corsOrigin} onChange={setCorsOrigin} />
            </Field>
            <Field label="IP allowlist" hint="One CIDR per line. Empty means no restriction.">
              <textarea
                value={ipAllowlist}
                onChange={(e) => setIpAllowlist(e.target.value)}
                rows={3}
                className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 font-mono text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
            </Field>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Versioning & previews" description="API surface controls.">
        <div className="space-y-2.5">
          <Toggle label="Enable v2 preview endpoints" hint="Opt into the streaming proxy and MCP surface" checked={v2Preview} onChange={setV2Preview} />
          <Toggle label="Strict schema validation" hint="Reject unknown fields with 422 responses" checked onChange={() => {}} />
          <Toggle label="Redact error internals" hint="Hide stack traces in error responses" checked onChange={() => {}} />
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}