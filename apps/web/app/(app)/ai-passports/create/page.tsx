import { Layers } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PassportNav } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  const dataTypes = [...new Set(passports.flatMap((p) => p.dataTypes))];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Create Passport"
        description="Issue a data-handling declaration for a new AI system. The passport captures purpose, data types, retention and accountable owner."
        actions={
          <>
            <SecondaryButton href="/ai-passports/import">Import instead</SecondaryButton>
            <PrimaryButton href="/ai-passports">Back to registry</PrimaryButton>
          </>
        }
      />
      <PassportNav active="Create" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Step 1 — System identity" subtitle="Link the passport to a registered system" />
          <CardBody className="space-y-2">
            {passports.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-sky-300">
                    <Layers className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">{p.name}</p>
                    <p className="text-[0.65rem] text-slate-400">{p.type} · {p.version}</p>
                  </div>
                </div>
                <Badge label={p.status} tone={p.status === 'Certified' ? 'green' : 'amber'} />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Step 2 — Declaration" subtitle="What the passport must document" />
          <CardBody className="space-y-3">
            {[
              { name: 'Purpose & scope', note: 'Statement of why the system processes data' },
              { name: 'Data inventory', note: 'Every data type the system consumes or produces' },
              { name: 'Retention policy', note: 'How long data is kept and when it is deleted' },
              { name: 'Risk controls', note: 'Controls attached to the system risk rating' },
              { name: 'Certifications', note: 'Frameworks the declaration certifies against' }
            ].map((it) => (
              <div key={it.name} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-xs font-semibold text-white">{it.name}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-400">{it.note}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Step 3 — Known data types" subtitle="Categories already in the taxonomy" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {dataTypes.map((d) => (
              <span key={d} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">{d}</span>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}