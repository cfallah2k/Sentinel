'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { SectionCard, Field, TextInput, CopyButton } from '@/components/platform/settings-form';
import { IntegrationHeader, IntegrationNav } from '@/components/platform/integration-detail';
import { integrationById } from '@/components/platform/integration-data';

const MASKED = 'sk_live_••••••••••••••••••••••••••••••••';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const integration = integrationById(id);
  if (!integration) notFound();

  const [revealed, setRevealed] = useState(false);
  const [clientId, setClientId] = useState(`sentinel-${id}-client`);
  const [secret, setSecret] = useState(MASKED);
  const [rotating, setRotating] = useState(false);

  const rotate = () => {
    setRotating(true);
    setTimeout(() => {
      setSecret(MASKED);
      setRotating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={`${integration.name} Credentials`} description="Authentication secrets for this connector. Secrets are shown once at creation." />
      <IntegrationNav id={id} active="credentials" />
      <IntegrationHeader integration={integration} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Active credentials" subtitle="OAuth 2.0 client for this connector" action={<Badge label="Rotates every 90d" tone="blue" />} />
          <CardBody className="space-y-4">
            <Field label="Client ID">
              <div className="flex items-center gap-2">
                <TextInput value={clientId} onChange={setClientId} />
                <CopyButton text={clientId} />
              </div>
            </Field>
            <Field label="Client Secret">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <TextInput value={revealed ? `${MASKED.replace('sk_live_', 'sk_live_9f2a1c8e4b7d6a05e3c2f1b')}` : secret} onChange={setSecret} disabled />
                </div>
                <button
                  type="button"
                  onClick={() => setRevealed((v) => !v)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"
                >
                  {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <CopyButton text={revealed ? `${MASKED.replace('sk_live_', 'sk_live_9f2a1c8e4b7d6a05e3c2f1b')}` : secret} />
              </div>
            </Field>
          </CardBody>
        </Card>

        <SectionCard title="Rotation" description="Credentials are rotated on a schedule or on demand.">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-200">Last rotated</p>
                <p className="mt-0.5 text-[0.7rem] text-slate-500">2026-07-15 by Amara Okafor</p>
              </div>
              <Badge label="21 days ago" tone="slate" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-200">Auto-rotation</p>
                <p className="mt-0.5 text-[0.7rem] text-slate-500">Every 90 days with overlap window</p>
              </div>
              <Badge label="Enabled" tone="green" />
            </div>
            <button
              type="button"
              onClick={rotate}
              disabled={rotating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sentinel-500/40 bg-sentinel-500/10 px-5 py-2.5 text-xs font-semibold text-sentinel-300 transition hover:bg-sentinel-500/20 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${rotating ? 'animate-spin' : ''}`} />
              {rotating ? 'Rotating...' : 'Rotate Now'}
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}