import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody } from '@/components/ui/card';
import { Metric } from '@/components/ui/progress';
import { ModuleNav } from './module-nav';
import { decisionTone, riskTone, statusTone } from './flow-table';
import {
  fmt,
  fmtTime,
  flowLatency,
  flowRecords,
  toneForCategory,
  type EventItem,
  type FlowRow
} from './derived';

export function FlowSubnav({ id, active }: { id: string; active: string }) {
  const base = `/data-flows/${id}`;
  const items = [
    { label: 'Overview', href: base },
    { label: 'Source', href: `${base}/source` },
    { label: 'Destination', href: `${base}/destination` },
    { label: 'Data', href: `${base}/data` },
    { label: 'Policies', href: `${base}/policies` },
    { label: 'Risk', href: `${base}/risk` },
    { label: 'Activity', href: `${base}/activity` },
    { label: 'Audit', href: `${base}/audit` }
  ];
  return <ModuleNav items={items.map((it) => ({ ...it, active: it.label === active }))} />;
}

export function FlowHeader({ flow }: { flow: FlowRow }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-sky-500/10 via-transparent to-cyan-400/10 p-5 sm:p-6">
        <Link href="/data-flows" className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500 transition hover:text-sentinel-300">
          Data Flows
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-lg font-semibold text-white sm:text-xl">
          <span className="truncate">{flow.source}</span>
          <ArrowRight className="h-5 w-5 shrink-0 text-sentinel-300" />
          <span className="truncate text-sentinel-300">{flow.destination}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge label={flow.status} tone={statusTone(flow.status)} />
          <Badge label={flow.risk} tone={riskTone(flow.risk)} />
          <Badge label={flow.category} tone={toneForCategory(flow.category)} />
          <Badge label={flow.decision} tone={decisionTone(flow.decision)} />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          {flow.applicationName} · via {flow.providerName} · last activity {fmtTime(flow.timestamp)}
        </p>
      </div>
    </Card>
  );
}

export function FlowMetrics({ flow }: { flow: FlowRow }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card>
        <CardBody>
          <Metric label="Records" value={fmt(flowRecords(flow))} />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Metric label="Volume" value={fmt(flow.volumeMb)} suffix="MB" />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Metric label="Latency" value={flowLatency(flow)} suffix="ms" />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Metric label="Last active" value={fmtTime(flow.timestamp)} />
        </CardBody>
      </Card>
    </div>
  );
}

export function AttributeGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.label} className="bg-slate-950/90 px-4 py-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
          <p className="mt-1 text-xs text-slate-200">{it.value}</p>
        </div>
      ))}
    </div>
  );
}

export function flowAttributes(flow: FlowRow) {
  return [
    { label: 'Flow ID', value: flow.id },
    { label: 'Application', value: flow.applicationName },
    { label: 'Provider', value: `${flow.providerName} (${flow.providerType})` },
    { label: 'Destination system', value: flow.systemName },
    { label: 'Data category', value: flow.category },
    { label: 'Volume', value: `${fmt(flow.volumeMb)} MB` },
    { label: 'Latency', value: `${flowLatency(flow)} ms` },
    { label: 'First seen', value: '2026-08-12 07:30' }
  ];
}

export function Timeline({ events }: { events: EventItem[] }) {
  const dots: Record<string, string> = { green: 'bg-emerald-400', amber: 'bg-amber-400', rose: 'bg-rose-400', sky: 'bg-sky-400' };
  return (
    <div className="relative space-y-5 pl-5">
      <span className="absolute left-1.5 top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
      {events.map((e, i) => (
        <div key={i} className="relative">
          <span className={`absolute -left-5 top-1 h-2.5 w-2.5 rounded-full ${dots[e.tone ?? 'sky']}`} />
          <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">{e.time}</p>
          <p className="mt-0.5 text-xs font-semibold text-white">{e.title}</p>
          <p className="mt-0.5 text-xs text-slate-400">{e.detail}</p>
        </div>
      ))}
    </div>
  );
}