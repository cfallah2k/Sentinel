import { Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { AreaTrend, BarSeries } from '@/components/ui/charts';
import { supportTickets } from '@/components/platform/support-data';

const responseSeries = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  response: 11 + Math.round(Math.random() * 14),
  resolve: 240 + Math.round(Math.random() * 300)
}));

export default function Page() {
  const open = supportTickets.filter((t) => !['Resolved', 'Closed'].includes(t.status));
  const byCategory = supportTickets.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Support"
        title="Support Overview"
        description="How support is performing for your organization."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tickets (30d)" value={supportTickets.length} icon={Activity} accent="sky" sub="All time" />
        <StatCard label="Open" value={open.length} icon={Activity} accent="amber" sub="Needs attention" />
        <StatCard label="Avg response" value="14 min" icon={Activity} accent="green" sub="Priority queue" />
        <StatCard label="CSAT" value="4.8 / 5" icon={Activity} accent="violet" sub="34 responses" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Response time" subtitle="Median first response, minutes per week" />
          <CardBody>
            <AreaTrend data={responseSeries} dataKey="response" xKey="week" color="#34d399" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Tickets by category" subtitle="Volume by area" />
          <CardBody>
            <BarSeries data={Object.entries(byCategory).map(([name, value]) => ({ name, value }))} dataKey="value" color="#38bdf8" height={200} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="SLA status" subtitle="Enterprise priority targets" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'First response — Critical', target: '15 min', status: 'On track' },
              { label: 'First response — High', target: '1 hour', status: 'On track' },
              { label: 'Resolution — Critical', target: '4 hours', status: 'At risk' }
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5">
                <p className="text-[0.65rem] text-slate-500">{s.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{s.target}</p>
                <div className="mt-1"><Badge label={s.status} tone={toneForStatus(s.status)} /></div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}