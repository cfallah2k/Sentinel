import { FileDown, FileJson, FileText, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { PassportActivity } from '@/components/data-intel/passport-shared';
import { resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Export" />
      <PassportHeader p={p} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Exports this quarter" value="6" icon={FileDown} accent="sky" sub="Passport artifacts" />
        <StatCard label="Last export" value="2026-08-12" icon={FileText} accent="cyan" sub="PDF · auditor export" />
        <StatCard label="Signed versions" value="3" icon={FileDown} accent="violet" sub="Immutable snapshots" />
        <StatCard label="Integrity" value="Verified" icon={ShieldCheck} accent="green" sub="SHA-256 anchored" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Export formats" subtitle="Machine-readable passport artifacts" />
          <CardBody className="space-y-3">
            {[
              { name: 'PDF', note: 'Human-readable declaration for auditors and regulators' },
              { name: 'JSON', note: 'Full passport schema for registry automation' },
              { name: 'CSV', note: 'Flattened data inventory and control matrix' }
            ].map((f) => (
              <div key={f.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-sky-300">
                    <FileJson className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">{f.name}</p>
                    <p className="text-[0.65rem] text-slate-400">{f.note}</p>
                  </div>
                </div>
                <Badge label="Available" tone="green" />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Export contents" subtitle="What every artifact includes" />
          <CardBody className="space-y-3">
            {[
              'System identity and version',
              'Purpose & scope statement',
              'Data inventory with sensitivity levels',
              'Retention policies per data type',
              'Control matrix and evidence counts',
              'Certification and compliance scores'
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-[0.6rem] font-bold text-sky-300">{i + 1}</span>
                <p className="text-xs leading-5 text-slate-300">{r}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <PassportActivity p={p} />
    </div>
  );
}