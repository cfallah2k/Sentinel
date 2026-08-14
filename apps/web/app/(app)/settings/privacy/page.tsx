'use client';

import { useState } from 'react';
import { Download, ShieldCheck, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Toggle, SaveButton } from '@/components/platform/settings-form';
import ConfirmDialog from '@/components/ui/confirm-dialog';

export default function Page() {
  const [shareBenchmarks, setShareBenchmarks] = useState(true);
  const [shareDetectors, setShareDetectors] = useState(true);
  const [sharePii, setSharePii] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [profilePublic, setProfilePublic] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  const handleExportAll = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            organization: 'Nexora Labs',
            exportedAt: new Date().toISOString(),
            note: 'Sample export — full data delivery is queued to your email.'
          },
          null,
          2
        )
      ],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexora-data-export.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

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
            <button
              type="button"
              onClick={handleExportAll}
              className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition hover:border-sentinel-500/30"
            >
              <div>
                <p className="text-xs font-semibold text-slate-200">Export all org data</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">Delivered within 48 hours</p>
              </div>
              <Download className="h-4 w-4 text-sentinel-300" />
            </button>
            {deleteRequested ? (
              <div className="flex items-center justify-between rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-rose-200">Deletion requested</p>
                  <p className="mt-0.5 text-[0.65rem] text-rose-300/70">30-day grace period started — contact support to cancel.</p>
                </div>
                <ShieldCheck className="h-4 w-4 text-rose-300" />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition hover:border-rose-500/40"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-200">Delete org data</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">All processed data, 30-day grace</p>
                </div>
                <Trash2 className="h-4 w-4 text-rose-300" />
              </button>
            )}
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false);
          setDeleteRequested(true);
        }}
        title="Delete all org data?"
        description="permanently deletes all processed data after a 30-day grace period."
        confirmLabel="Delete data"
      />
    </div>
  );
}