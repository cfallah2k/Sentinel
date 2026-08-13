import { CheckCircle2, FlaskConical, XCircle } from 'lucide-react';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { testResults } from '@/components/data-intel/derived';

type TestRow = { id: string; detector: string; sample: string; result: string; confidence: number };

const testColumns: Column<TestRow>[] = [
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'sample', label: 'Test payload', render: (r) => <span className="font-mono text-[0.65rem] text-slate-300">{r.sample}</span> },
  { key: 'result', label: 'Result', render: (r) => <Badge label={r.result} tone={r.result === 'Detected' ? 'green' : 'slate'} /> },
  { key: 'confidence', label: 'Confidence', render: (r) => <span className="text-slate-300">{r.confidence}%</span>, sortValue: (r) => r.confidence }
];

export default function Page() {
  const detected = testResults.filter((t) => t.result === 'Detected').length;
  const avgConfidence = Math.round(testResults.reduce((a, t) => a + t.confidence, 0) / testResults.length);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Test Classification"
        description="Validate detectors against sample payloads before rules go live. Results below reflect the latest dry-run."
        actions={<SecondaryButton href="/data-classification/create">Create a rule</SecondaryButton>}
      />
      <ClassificationNav active="Test" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Payloads tested" value={testResults.length} icon={FlaskConical} accent="sky" sub="Dry-run corpus" />
        <StatCard label="Detected" value={detected} icon={CheckCircle2} accent="green" sub="Correctly flagged" />
        <StatCard label="Clean" value={testResults.length - detected} icon={XCircle} accent="rose" sub="No match expected" />
        <StatCard label="Avg confidence" value={`${avgConfidence}%`} icon={FlaskConical} accent="violet" sub="Detector certainty" />
      </div>
      <Card>
        <CardHeader title="Latest test run" subtitle="Sample payloads evaluated against active detectors" />
        <CardBody>
          <DataTable columns={testColumns} rows={testResults} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="What happens on match" subtitle="Behavior by enforcement action" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { name: 'Block', note: 'Payload rejected, incident raised, policy violation recorded' },
              { name: 'Redact', note: 'Matched values replaced, request forwarded with audit trail' },
              { name: 'Log', note: 'Match recorded, no action taken on the payload' }
            ].map((o) => (
              <div key={o.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold text-white">{o.name}</p>
                <p className="mt-1 text-[0.65rem] leading-5 text-slate-400">{o.note}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}