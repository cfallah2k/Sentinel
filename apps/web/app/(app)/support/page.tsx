import { LifeBuoy } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { supportTickets, kbArticles } from '@/components/platform/support-data';

const modules = [
  { title: 'Overview', desc: 'Ticket health and response times', href: '/support/overview', metric: 'SLA 98.6%' },
  { title: 'Tickets', desc: 'Open and historical requests', href: '/support/tickets', metric: '3 open' },
  { title: 'Knowledge base', desc: 'Self-serve articles and guides', href: '/support/knowledge-base', metric: '8 articles' },
  { title: 'Contact', desc: 'Reach the support team', href: '/support/contact', metric: 'Email + Slack' },
  { title: 'System status', desc: 'Live health of Sentinel services', href: '/support/status', metric: 'All systems' }
];

export default function Page() {
  const open = supportTickets.filter((t) => !['Resolved', 'Closed'].includes(t.status));
  const critical = supportTickets.filter((t) => t.priority === 'Critical' && !['Resolved', 'Closed'].includes(t.status));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Support"
        title="Support"
        description="Get help from the Sentinel team or help yourself."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open tickets" value={open.length} icon={LifeBuoy} accent="amber" sub={`${critical.length} critical`} />
        <StatCard label="Response time" value="14 min" icon={LifeBuoy} accent="green" sub="Median, last 30 days" />
        <StatCard label="SLA compliance" value="98.6%" icon={LifeBuoy} accent="sky" sub="Enterprise priority" />
        <StatCard label="KB articles" value={kbArticles.length} icon={LifeBuoy} accent="violet" sub="Reads this month" />
      </div>

      <Card>
        <CardHeader title="Support areas" subtitle="Everything you need, in one place" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((m) => (
              <a key={m.title} href={m.href} className="group rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition hover:border-sentinel-500/30 hover:bg-sentinel-500/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-200 transition group-hover:text-sentinel-300">{m.title}</p>
                  <span className="text-[0.65rem] text-slate-500">{m.metric}</span>
                </div>
                <p className="mt-1 text-[0.7rem] text-slate-500">{m.desc}</p>
              </a>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Recent tickets" subtitle="Latest activity from your org" />
        <CardBody>
          <div className="space-y-2.5">
            {supportTickets.slice(0, 4).map((t) => (
              <a key={t.id} href={`/support/tickets/${t.id}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-sentinel-500/30">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-200">{t.subject}</p>
                  <p className="text-[0.65rem] text-slate-500">{t.id} · {t.category} · updated {t.updated.slice(0, 10)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge label={t.priority} tone={t.priority === 'Critical' ? 'rose' : t.priority === 'High' ? 'amber' : 'blue'} />
                  <Badge label={t.status} tone={toneForStatus(t.status)} />
                </div>
              </a>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}