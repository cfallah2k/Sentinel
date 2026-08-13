'use client';

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Toggle, SaveButton } from '@/components/platform/settings-form';

export default function Page() {
  const [shareBenchmarks, setShareBenchmarks] = useState(true);
  const [shareDetectors, setShareDetectors] = useState(true);
  const [sharePii, setSharePii] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [profilePublic, setProfilePublic] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Privacy Settings"
        description="Control how your organization's data is used by Sentinel."
        actions={<Badge label="GDPR ready" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Product improvement" description="Anonymous, aggregate data used to improve Sentinel.">
          <div className="space-y-2.5">
            <Toggle label="Share benchmark comparisons" hint="Compare latency and cost against industry peers" checked={shareBenchmarks} onChange={setShareBenchmarks} />
            <Toggle label="Share detector feedback" hint="Help improve PII and jailbreak detection" checked={shareDetectors} onChange={setShareDetectors} />
            <Toggle label="Share PII patterns" hint="Opt-in samples of redacted content" checked={sharePii} onChange={setSharePii} />
          </div>
        </SectionCard>

        <SectionCard title="Third parties" description="Partners and integrations outside Sentinel.">
          <div className="space-y-2.5">
            <Toggle label="Allow third-party data processing" hint="For connected integrations to function" checked={thirdParty} onChange={setThirdParty} />
            <Toggle label="Marketing communications" hint="Product updates and webinar invites" checked={marketing} onChange={setMarketing} />
            <Toggle label="Public profile" hint="Show org in the Sentinel directory" checked={profilePublic} onChange={setProfilePublic} />
          </div>
        </SectionCard>

        <SectionCard title="Your rights" description="Exercisable under GDPR and CCPA.">
          <div className="space-y-2.5">
            {[
              { label: 'Export all org data', hint: 'Delivered within 48 hours' },
              { label: 'Delete org data', hint: 'All processed data, 30-day grace' }
            ].map((r) => (
              <button
                key={r.label}
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition hover:border-sentinel-500/30"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-200">{r.label}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{r.hint}</p>
                </div>
                <ShieldCheck className="h-4 w-4 text-sentinel-300" />
              </button>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}