import { Building2, Database, Radio, Waypoints } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowMap } from '@/components/data-intel/flow-map';
import { enrichedFlows, flowNavItems } from '@/components/data-intel/derived';

export default function Page() {
  const sources = [...new Set(enrichedFlows.map((f) => f.source))];
  const destinations = [...new Set(enrichedFlows.map((f) => f.destination))];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Flow Map"
        description="Topology of every route between source systems and AI destinations, colored by the decision the gateway applies."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Map' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Unique sources" value={sources.length} icon={Database} accent="sky" sub="Systems data originates from" />
        <StatCard label="Unique destinations" value={destinations.length} icon={Building2} accent="cyan" sub="AI systems receiving data" />
        <StatCard label="Routes mapped" value={enrichedFlows.length} icon={Waypoints} accent="violet" sub="Live connected flows" />
        <StatCard label="Routes blocked" value={enrichedFlows.filter((f) => f.status === 'Blocked').length} icon={Radio} accent="rose" sub="No active transmission" />
      </div>
      <FlowMap flows={enrichedFlows} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Source systems</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sources.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">AI destinations</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <span key={d} className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}