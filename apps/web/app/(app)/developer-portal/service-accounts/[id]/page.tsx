import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Metric } from '@/components/ui/progress';
import { ScopeList } from '@/components/platform/shared';
import { serviceAccounts, fmtRelative } from '@/components/platform/developer-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = serviceAccounts.find((s) => s.id === id);
  if (!account) notFound();

  return (
    <div className="space-y-6">
      <Link href="/developer-portal/service-accounts" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-slate-200">
        <ArrowLeft className="h-3.5 w-3.5" /> Service Accounts
      </Link>
      <PageHeader
        eyebrow="Platform"
        title={account.name}
        description={`${account.type} identity owned by ${account.owner}.`}
        actions={<Badge label={account.status} tone={toneForStatus(account.status)} />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Account details" />
          <CardBody>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {[
                { label: 'Account ID', value: account.id },
                { label: 'Type', value: account.type },
                { label: 'Created', value: account.created },
                { label: 'Last Used', value: fmtRelative(account.lastUsed) },
                { label: 'Owner', value: account.owner },
                { label: 'Status', value: account.status }
              ].map((r) => (
                <div key={r.label} className="bg-slate-950/80 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{r.label}</p>
                  <p className="mt-1 text-sm text-slate-200">{r.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Scopes</p>
              <div className="mt-2"><ScopeList scopes={account.scopes} /></div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Activity" subtitle="Rolling 30 days" />
          <CardBody className="space-y-4">
            <Metric label="Requests" value="842,110" />
            <Metric label="Tokens" value="31.4M" />
            <Metric label="Blocked Requests" value="1,024" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge label="Audit logged" tone="green" />
              <Badge label="No web access" tone="blue" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}