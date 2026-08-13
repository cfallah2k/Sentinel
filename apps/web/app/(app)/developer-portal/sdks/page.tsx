import { FileCode2, Terminal } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { CodeBlock } from '@/components/platform/code-block';
import { sdks } from '@/components/platform/developer-data';

const logos: Record<string, string> = {
  TypeScript: 'TS',
  Python: 'Py',
  Go: 'Go',
  Java: 'Java'
};

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="SDKs"
        description="First-party client libraries that handle authentication, retries, streaming and error envelopes."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sdks.map((s) => (
          <Card key={s.name}>
            <CardHeader
              title={s.name}
              subtitle={s.description}
              action={
                <div className="flex items-center gap-2">
                  <Badge label={`v${s.version}`} tone="slate" />
                  <Badge label={s.stability} tone={s.stability === 'Stable' ? 'green' : 'amber'} />
                </div>
              }
            />
            <CardBody>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-xs font-bold text-sentinel-300">
                  {logos[s.language] ?? 'SDK'}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FileCode2 className="h-4 w-4" />
                  {s.language}
                </div>
              </div>
              <div className="mt-4">
                <CodeBlock label="Install" code={s.install} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge label={s.language.toLowerCase()} tone="blue" />
                <Badge label="mit license" tone="slate" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Environment configuration" subtitle="Same SDK, any environment" />
        <CardBody className="space-y-3">
          <CodeBlock
            label=".env"
            code={'SENTINEL_API_KEY=sk_live_8f3k...\nSENTINEL_BASE_URL=https://api.sentinel.ai\nSENTINEL_TIMEOUT_MS=30000'}
          />
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-sentinel-300" />
            All SDKs support automatic retries, streaming and request correlation IDs.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}