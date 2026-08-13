import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { AdminShell } from '@/components/admin/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Users, Zap, Cpu } from 'lucide-react';
import { billingPlans, platformOrganizations } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Subscriptions"
        description="Plan catalog and tenant distribution across tiers."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Paying Tenants" value={platformOrganizations.filter((o) => o.mrr > 0).length} icon={CreditCard} accent="sky" />
        <StatCard label="Enterprise Seats" value={platformOrganizations.filter((o) => o.plan === 'Enterprise').reduce((s, o) => s + o.users, 0)} icon={Users} accent="violet" />
        <StatCard label="Avg MRR / Tenant" value={`$${Math.round(platformOrganizations.filter((o) => o.mrr > 0).reduce((s, o) => s + o.mrr, 0) / Math.max(1, platformOrganizations.filter((o) => o.mrr > 0).length))}`} icon={Zap} accent="cyan" />
        <StatCard label="Trial Tenants" value={platformOrganizations.filter((o) => o.status === 'Trial').length} icon={Cpu} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {billingPlans.map((p) => {
          const tenants = platformOrganizations.filter((o) => o.plan === p.name).length;
          return (
            <Card key={p.id}>
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                    <p className="mt-1 text-2xl font-semibold text-white">${p.price}<span className="text-xs font-normal text-slate-400"> /mo</span></p>
                  </div>
                  <Badge label={`${tenants} tenants`} tone={p.name === 'Enterprise' ? 'violet' : p.name === 'Growth' ? 'blue' : 'slate'} />
                </div>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-sentinel-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </AdminShell>
  );
}