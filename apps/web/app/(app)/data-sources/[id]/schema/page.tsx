import { Braces, Database, Table2 } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { schemaFor } from '@/components/registry/helpers';
import { sourceNav } from '@/components/registry/nav';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];
  const columns = schemaFor(source.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Discovered schema preview for this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Columns" subtitle="Discovered fields" />
          <CardBody>
            <p className="text-2xl font-semibold text-white">{columns.length}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400">
              <Braces className="h-3.5 w-3.5" /> sampled from {source.connector}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Nullable" subtitle="Optional fields" />
          <CardBody>
            <p className="text-2xl font-semibold text-white">{columns.filter((c) => c.nullable).length}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400">
              <Database className="h-3.5 w-3.5" /> may be empty
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Record Count" subtitle="Indexed rows" />
          <CardBody>
            <p className="text-2xl font-semibold text-white">{source.records === 0 ? 'Live' : source.records.toLocaleString()}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400">
              <Table2 className="h-3.5 w-3.5" /> synced {source.lastSync}
            </p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Schema Preview" subtitle="Sample columns from the last sync" />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  {['Column', 'Type', 'Nullable', 'Sample'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {columns.map((c) => (
                  <tr key={c.name} className="border-b border-white/5 text-xs text-slate-300">
                    <td className="px-4 py-3 font-mono text-sentinel-300">{c.name}</td>
                    <td className="px-4 py-3 font-mono text-slate-400">{c.type}</td>
                    <td className="px-4 py-3">{c.nullable ? <Badge label="Nullable" tone="amber" /> : <Badge label="Required" tone="green" />}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{c.sample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}