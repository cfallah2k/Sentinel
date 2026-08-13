import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { ModuleNav } from './module-nav';
import {
  catBadgeTone,
  catBarColor,
  classEvents,
  fmt,
  type ClassRow
} from './derived';

export function ClassificationNav({ active }: { active: string }) {
  const items = [
    { label: 'Overview', href: '/data-classification/overview' },
    { label: 'Categories', href: '/data-classification/categories' },
    { label: 'Types', href: '/data-classification/types' },
    { label: 'Sensitive Data', href: '/data-classification/sensitive-data' },
    { label: 'Detectors', href: '/data-classification/detectors' },
    { label: 'Rules', href: '/data-classification/rules' },
    { label: 'Custom', href: '/data-classification/custom' },
    { label: 'Create', href: '/data-classification/create' },
    { label: 'Test', href: '/data-classification/test' }
  ];
  return <ModuleNav items={items.map((it) => ({ ...it, active: it.label === active }))} />;
}

export function ClassSubnav({ id, active }: { id: string; active: string }) {
  const base = `/data-classification/${id}`;
  const items = [
    { label: 'Overview', href: base },
    { label: 'Rules', href: `${base}/rules` },
    { label: 'Detectors', href: `${base}/detectors` },
    { label: 'Usage', href: `${base}/usage` },
    { label: 'Activity', href: `${base}/activity` },
    { label: 'Settings', href: `${base}/settings` }
  ];
  return <ModuleNav items={items.map((it) => ({ ...it, active: it.label === active }))} />;
}

export function CategoryCard({ row }: { row: ClassRow }) {
  return (
    <Link href={`/data-classification/${row.id}`} className="group block">
      <Card className="h-full transition group-hover:border-sky-500/30">
        <CardBody>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${catBarColor(row.color)}`} />
                <h3 className="text-sm font-semibold text-white">{row.name}</h3>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">{row.description}</p>
            </div>
            <Badge label={`S${row.sensitivity}`} tone={catBadgeTone(row.color)} />
          </div>
          <div className="mt-4 flex items-center justify-between text-[0.65rem] text-slate-500">
            <span>{row.systems} systems tagged</span>
            <span className="font-semibold text-slate-300">{row.coverage}% coverage</span>
          </div>
          <div className="mt-1.5">
            <ProgressBar value={row.coverage} color={catBarColor(row.color)} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-3">
            <div>
              <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">Matches 24h</p>
              <p className="mt-0.5 text-sm font-semibold text-white">{fmt(row.matched24h)}</p>
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">Blocked 24h</p>
              <p className="mt-0.5 text-sm font-semibold text-rose-300">{fmt(row.blocked24h)}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export function CategoryGrid({ rows }: { rows: ClassRow[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {rows.map((r) => (
        <CategoryCard key={r.id} row={r} />
      ))}
    </div>
  );
}

export function ClassHeader({ row }: { row: ClassRow }) {
  return (
    <Card className="overflow-hidden">
      <div className={`bg-gradient-to-r ${row.color === 'emerald' ? 'from-emerald-500/15' : row.color === 'sky' ? 'from-sky-500/15' : row.color === 'amber' ? 'from-amber-500/15' : 'from-rose-500/15'} via-transparent to-transparent p-5 sm:p-6`}>
        <Link href="/data-classification" className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500 transition hover:text-sentinel-300">
          Data Classification
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{row.name}</h1>
          <Badge label={`Sensitivity ${row.sensitivity}`} tone={catBadgeTone(row.color)} />
          <Badge label={`${row.coverage}% coverage`} tone={row.coverage > 70 ? 'green' : row.coverage > 55 ? 'amber' : 'rose'} />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{row.description}</p>
      </div>
    </Card>
  );
}

export function ClassActivity({ row }: { row: ClassRow }) {
  return (
    <Card>
      <CardHeader title="Activity" subtitle="Recent classification events for this label" />
      <CardBody>
        <div className="relative space-y-5 pl-5">
          <span className="absolute left-1.5 top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
          {classEvents(row).map((e, i) => (
            <div key={i} className="relative">
              <span className={`absolute -left-5 top-1 h-2.5 w-2.5 rounded-full ${e.tone === 'green' ? 'bg-emerald-400' : e.tone === 'amber' ? 'bg-amber-400' : 'bg-sky-400'}`} />
              <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">{e.time}</p>
              <p className="mt-0.5 text-xs font-semibold text-white">{e.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">{e.detail}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}