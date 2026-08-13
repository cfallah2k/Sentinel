'use client';

import { useState } from 'react';
import { Database } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Toggle, SaveButton } from '@/components/platform/settings-form';

export default function Page() {
  const [encryptAtRest, setEncryptAtRest] = useState(true);
  const [encryptInTransit, setEncryptInTransit] = useState(true);
  const [autoRedact, setAutoRedact] = useState(true);
  const [minimizeData, setMinimizeData] = useState(true);
  const [pseudonymize, setPseudonymize] = useState(false);
  const [logContent, setLogContent] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Data Settings"
        description="How Sentinel processes, protects and stores your data."
        actions={<Badge label="SOC 2 audited" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Encryption" description="Protection at rest and in transit.">
          <div className="space-y-2.5">
            <Toggle label="Encrypt at rest" hint="AES-256 with per-org keys" checked={encryptAtRest} onChange={setEncryptAtRest} />
            <Toggle label="Encrypt in transit" hint="TLS 1.3 enforced" checked={encryptInTransit} onChange={setEncryptInTransit} />
            <Toggle label="Customer-managed keys" hint="Bring your own KMS key" checked={false} onChange={() => {}} />
          </div>
        </SectionCard>

        <SectionCard title="Processing" description="Applied to AI traffic in the gateway.">
          <div className="space-y-2.5">
            <Toggle label="Auto-redact sensitive data" hint="PII, financial and health detectors" checked={autoRedact} onChange={setAutoRedact} />
            <Toggle label="Data minimization" hint="Strip unrelated context before providers" checked={minimizeData} onChange={setMinimizeData} />
            <Toggle label="Pseudonymize identifiers" hint="Replace IDs with stable tokens" checked={pseudonymize} onChange={setPseudonymize} />
          </div>
        </SectionCard>

        <SectionCard title="Logging" description="What the audit trail captures.">
          <div className="space-y-2.5">
            <Toggle label="Log request content" hint="Stores payloads subject to retention" checked={logContent} onChange={setLogContent} />
            <Toggle label="Log metadata only" hint="IDs, latency and decisions without content" checked={!logContent} onChange={(v) => setLogContent(!v)} />
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}