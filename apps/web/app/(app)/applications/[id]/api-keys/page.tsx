import { KeyRound, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ApiKeyTable } from '@/components/registry/related-tables';
import { keysFor } from '@/components/registry/helpers';
import { appNav } from '@/components/registry/nav';
import { applications } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const keys = keysFor(app.id, app.apiKeys);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="API keys issued to this application. Keys are masked after creation."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <Card>
        <CardHeader
          title="API Keys"
          subtitle={`${keys.length} keys issued`}
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold text-slate-300">
              <KeyRound className="h-3 w-3 text-sentinel-400" /> Rotate on revocation
            </span>
          }
        />
        <CardBody>
          <ApiKeyTable rows={keys} />
        </CardBody>
      </Card>
      <div className="flex items-center gap-3">
        <button type="button" className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
          <Plus className="h-3.5 w-3.5" /> Issue New Key
        </button>
        <p className="text-[0.65rem] text-slate-500">New keys are shown once and stored encrypted.</p>
      </div>
    </div>
  );
}