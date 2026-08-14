import { KeyRound } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ApiKeyTable } from '@/components/registry/related-tables';
import IssueKeyButton from '@/components/registry/issue-key-button';
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
      <IssueKeyButton appName={app.name} />
    </div>
  );
}