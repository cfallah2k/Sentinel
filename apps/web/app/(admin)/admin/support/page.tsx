import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Inbox, Clock3, CheckCircle2, Flame } from 'lucide-react';
import { platformOrganizations } from '@/lib/mock-data';

const tickets = [
  { id: 'TKT-1042', org: 'Nexa Health', subject: 'Redaction engine dropping PII on PDFs', priority: 'High', status: 'In Progress', age: '2h' },
  { id: 'TKT-1039', org: 'Vanguard Logistics', subject: 'Gateway latency spike after deploy', priority: 'Medium', status: 'In Progress', age: '5h' },
  { id: 'TKT-1036', org: 'Northwind Retail', subject: 'Cannot rotate API keys for provider', priority: 'Medium', status: 'Waiting on User', age: '1d' },
  { id: 'TKT-1031', org: 'Lumina Capital', subject: 'SCIM provisioning failing for new users', priority: 'High', status: 'In Progress', age: '1d' },
  { id: 'TKT-1028', org: 'Atlas Public', subject: 'Invoice mismatch on Growth plan', priority: 'Low', status: 'Resolved', age: '3d' },
  { id: 'TKT-1024', org: 'DataGov Solutions', subject: 'Request for EU data residency', priority: 'Low', status: 'Open', age: '4d' }
];

export default function Page() {
  const open = tickets.filter((t) => t.status !== 'Resolved').length;
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Support"
        description="Tenant support tickets and escalation status."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Tickets" value={open} icon={Inbox} accent="sky" />
        <StatCard label="In Progress" value={tickets.filter((t) => t.status === 'In Progress').length} icon={Clock3} accent="amber" />
        <StatCard label="Resolved" value={tickets.filter((t) => t.status === 'Resolved').length} icon={CheckCircle2} accent="green" />
        <StatCard label="High Priority" value={tickets.filter((t) => t.priority === 'High').length} icon={Flame} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Ticket Queue" subtitle={`${platformOrganizations.length} tenants supported by the platform team`} />
        <CardBody className="p-0">
          <div className="divide-y divide-white/5">
            {tickets.map((t) => (
              <div key={t.id} className="flex flex-wrap items-center gap-3 px-5 py-4 text-xs sm:px-6">
                <span className="font-mono text-sky-300">{t.id}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{t.subject}</p>
                  <p className="mt-0.5 text-slate-500">{t.org} · opened {t.age} ago</p>
                </div>
                <Badge label={t.priority} tone={t.priority === 'High' ? 'rose' : t.priority === 'Medium' ? 'amber' : 'slate'} />
                <Badge label={t.status} tone={t.status === 'Resolved' ? 'green' : t.status === 'Open' ? 'blue' : 'amber'} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </AdminShell>
  );
}