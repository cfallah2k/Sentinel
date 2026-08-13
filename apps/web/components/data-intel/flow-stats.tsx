import { Ban, Network, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { hourlySeries } from '@/lib/mock-data';
import { fmt, type FlowRow } from './derived';

export function FlowStats({ flows }: { flows: FlowRow[] }) {
  const blocked = flows.filter((f) => f.status === 'Blocked').length;
  const highRisk = flows.filter((f) => f.risk === 'High' || f.risk === 'Critical').length;
  const redacted = flows.filter((f) => f.decision === 'Redact').length;
  const volume = flows.reduce((a, f) => a + f.volumeMb, 0);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Active flows"
        value={flows.length}
        delta={12.4}
        deltaLabel="vs last 24h"
        icon={Network}
        accent="sky"
        spark={hourlySeries.map((h) => h.allowed)}
      />
      <StatCard
        label="Blocked"
        value={blocked}
        delta={-3.1}
        deltaLabel="block rate down"
        icon={Ban}
        accent="rose"
        sub={`${Math.round((blocked / Math.max(1, flows.length)) * 100)}% of flows`}
      />
      <StatCard
        label="High risk"
        value={highRisk}
        delta={4.2}
        deltaLabel="flows flagged"
        icon={ShieldAlert}
        accent="amber"
        sub="Risk rating High or above"
      />
      <StatCard
        label="Redacted"
        value={redacted}
        delta={1.8}
        deltaLabel="redaction applied"
        icon={SlidersHorizontal}
        accent="cyan"
        sub={`${fmt(volume)} MB routed today`}
      />
    </div>
  );
}