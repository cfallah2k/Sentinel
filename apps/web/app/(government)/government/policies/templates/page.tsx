import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ShieldHalf, ShieldX } from 'lucide-react';

const templates = [
  { name: 'Data Residency Lockdown', category: 'Data Protection', controls: 3, scope: 'All providers', description: 'Restrict specified data categories to in-region processing.' },
  { name: 'High-Risk Approval Gate', category: 'Risk Control', controls: 2, scope: 'High/Critical systems', description: 'Require human approval for every request to high-risk systems.' },
  { name: 'PII Redaction Baseline', category: 'Privacy', controls: 3, scope: 'External providers', description: 'Redact personal identifiers before any external transmission.' },
  { name: 'Biometric Model Restriction', category: 'Sensitive Data', controls: 2, scope: 'Biometric models', description: 'Block biometric-capable models unless explicitly approved.' },
  { name: 'Consumer Tool Isolation', category: 'Data Protection', controls: 3, scope: 'Employee data', description: 'Prevent employee data from reaching consumer-grade AI tools.' },
  { name: 'Export Allowlist', category: 'Compliance', controls: 4, scope: 'Customer data', description: 'Only allowlisted applications may transmit customer data to AI systems.' }
];

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Policy Templates"
        description="Reusable policy blueprints regulators can adapt for new enforcement rounds."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <Card key={t.name}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sky-300">
                  <ShieldHalf className="h-4 w-4" size={16} />
                </div>
                <Badge label={t.category} tone="blue" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{t.name}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-400">{t.description}</p>
              <div className="mt-3 flex items-center gap-3 text-[0.65rem] text-slate-500">
                <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> {t.controls} controls</span>
                <span className="inline-flex items-center gap-1"><ShieldX className="h-3 w-3" /> {t.scope}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </GovShell>
  );
}