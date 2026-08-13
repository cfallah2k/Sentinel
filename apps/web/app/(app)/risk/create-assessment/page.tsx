'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems } from '@/components/governance/risk-helpers';
import { aiSystems } from '@/lib/mock-data';

const steps = ['System & scope', 'Scoring', 'Findings', 'Review'];

const likelihoodOptions = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost certain'];
const impactOptions = ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'];

export default function Page() {
  const [step, setStep] = useState(0);
  const [systemId, setSystemId] = useState(aiSystems[0].id);
  const [environment, setEnvironment] = useState('Production');
  const [likelihood, setLikelihood] = useState(2);
  const [impact, setImpact] = useState(3);
  const [selectedFindings, setSelectedFindings] = useState<string[]>(['Unencrypted model outputs cached']);
  const [submitted, setSubmitted] = useState(false);

  const system = aiSystems.find((s) => s.id === systemId) ?? aiSystems[0];
  const likelihoodScore = (likelihood + 1) * impact;
  const score = Math.round((likelihoodScore / 25) * 100);
  const severity = score >= 70 ? 'Critical' : score >= 55 ? 'High' : score >= 40 ? 'Medium' : 'Low';

  const findingOptions = [
    'Unencrypted model outputs cached',
    'Missing input validation for prompts',
    'Over-provisioned service account scope',
    'No data retention policy on transcripts',
    'Provider subprocessors not reviewed',
    'Prompt injection defenses not tested'
  ];

  const toggleFinding = (f: string) =>
    setSelectedFindings((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else setSubmitted(true);
  };

  const label = (v: number) => (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-400">{likelihoodOptions[v]}</span>
      <span className="font-semibold text-white">{v + 1} / 5</span>
    </div>
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Create Assessment"
        description="Run a structured risk assessment against a registered AI system."
      />
      <ModuleNav items={riskNavItems} active="/risk/create-assessment" />
      <Card>
        <CardBody>
          <div className="mb-6 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                    i < step || submitted ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40' : i === step ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40' : 'bg-white/5 text-slate-500'
                  }`}
                >
                  {i < step || submitted ? <CheckCircle2 size={14} /> : i + 1}
                </span>
                <span className={`text-xs font-semibold ${i === step ? 'text-white' : 'text-slate-500'}`}>{s}</span>
              </div>
            ))}
          </div>
          <ProgressBar value={((step + 1) / steps.length) * 100} />

          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30">
                <ClipboardList size={24} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Assessment submitted</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                {system.name} has been queued for review with an estimated residual score of {score} ({severity}).
                A reviewer will validate the answers before the assessment is approved.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <Badge label={system.name} tone="blue" />
                <Badge label={severity} tone={severity === 'Critical' || severity === 'High' ? 'red' : 'blue'} />
              </div>
            </div>
          ) : (
            <div className="mt-6">
              {step === 0 ? (
                <div className="space-y-5">
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Target system</label>
                    <select
                      value={systemId}
                      onChange={(e) => setSystemId(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sentinel-500/60"
                    >
                      {aiSystems.map((s) => (
                        <option key={s.id} value={s.id}>{s.name} — {s.type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Environment</label>
                    <select
                      value={environment}
                      onChange={(e) => setEnvironment(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sentinel-500/60"
                    >
                      {['Production', 'Staging', 'Development'].map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-slate-400">
                    <p className="font-semibold text-white">Scope</p>
                    <p className="mt-1">{system.purpose}. Owner: {system.owner} · Oversight: {system.oversight} · Data: {system.dataCategories.join(', ')}</p>
                  </div>
                </div>
              ) : step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Likelihood</label>
                    <div className="mt-2">{label(likelihood)}</div>
                    <input type="range" min={0} max={4} value={likelihood} onChange={(e) => setLikelihood(Number(e.target.value))} className="mt-3 w-full accent-sky-400" />
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Impact</label>
                    <div className="mt-2">{label(impact)}</div>
                    <input type="range" min={0} max={4} value={impact} onChange={(e) => setImpact(Number(e.target.value))} className="mt-3 w-full accent-sky-400" />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-white">Inherent risk estimate</p>
                      <p className="text-[0.65rem] text-slate-500">Composite likelihood × impact</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-semibold text-white">{score}</span>
                      <Badge label={severity} tone={severity === 'Critical' || severity === 'High' ? 'red' : severity === 'Medium' ? 'blue' : 'green'} />
                    </div>
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="space-y-3">
                  {findingOptions.map((f) => {
                    const checked = selectedFindings.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFinding(f)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                          checked ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="text-xs text-slate-300">{f}</span>
                        <span className={`h-4 w-4 rounded-full border ${checked ? 'border-sentinel-400 bg-sentinel-400' : 'border-slate-600'}`} />
                      </button>
                    );
                  })}
                  <p className="text-[0.65rem] text-slate-500">{selectedFindings.length} findings will be registered</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Target</p>
                    <p className="mt-0.5 text-sm text-slate-400">{system.name} · {environment} · {system.type}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Inherent risk</p>
                    <p className="mt-0.5 text-sm text-slate-400">{likelihoodOptions[likelihood]} × {impactOptions[impact]} → score {score} ({severity})</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Findings</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedFindings.map((f) => (
                        <Badge key={f} label={f} tone="amber" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!submitted ? (
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                {step === steps.length - 1 ? 'Submit Assessment' : 'Continue'} <ArrowRight size={14} />
              </button>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}