import { FileUp, FileCheck2, ShieldCheck } from 'lucide-react';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { PassportNav, PassportTable } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Import Passports"
        description="Bulk-import data-handling declarations from CSV or JSON. Imported rows are staged as drafts until validated."
        actions={<SecondaryButton href="/ai-passports/create">Create manually</SecondaryButton>}
      />
      <PassportNav active="Import" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Last import" value="2026-08-10" icon={FileUp} accent="sky" sub="18 declarations staged" />
        <StatCard label="Validated" value="16" icon={FileCheck2} accent="green" sub="Passed schema checks" />
        <StatCard label="Rejected" value="2" icon={ShieldCheck} accent="rose" sub="Missing fields" />
        <StatCard label="In draft" value={passports.filter((p) => p.status === 'Draft').length} icon={FileUp} accent="amber" sub="Awaiting completion" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Import format" subtitle="Accepted schemas" />
          <CardBody className="space-y-3">
            {[
              { name: 'CSV', note: 'One row per system: name, type, purpose, data_types, retention, owner' },
              { name: 'JSON', note: 'Array of passport objects matching the declaration schema' },
              { name: 'Registry export', note: 'Direct re-import of a prior registry export, preserving IDs' }
            ].map((f) => (
              <div key={f.name} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">{f.name}</p>
                  <Badge label="Supported" tone="green" />
                </div>
                <p className="mt-1 text-[0.65rem] text-slate-400">{f.note}</p>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Validation rules" subtitle="Checks applied to every row" />
          <CardBody className="space-y-3">
            {[
              'System name must match the AI registry',
              'Data types must exist in the classification taxonomy',
              'Owner must be an active team member',
              'Retention policy is required for every data type',
              'High risk systems require a risk assessment reference'
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-[0.6rem] font-bold text-sky-300">{i + 1}</span>
                <p className="text-xs leading-5 text-slate-300">{r}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Draft passports" subtitle="Rows staged from the last import" />
        <CardBody>
          <PassportTable passports={passports.filter((p) => p.status === 'Draft')} />
        </CardBody>
      </Card>
    </div>
  );
}