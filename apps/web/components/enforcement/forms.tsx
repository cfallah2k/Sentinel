'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { DecisionBadge } from './badges';
import { policies, aiSystems, approvals } from '@/lib/mock-data';
import { policyById, rulesForPolicy } from './helpers';

const inputCls =
  'w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60';

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left transition hover:bg-white/[0.05]"
    >
      <div>
        <p className="text-xs font-semibold text-white">{label}</p>
        <p className="mt-0.5 text-[0.65rem] text-slate-500">{description}</p>
      </div>
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? 'bg-sentinel-500' : 'bg-white/10'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? 'left-4.5' : 'left-0.5'}`} />
      </span>
    </button>
  );
}

function ChoiceChip({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold transition ${
        checked ? 'border-sentinel-500/50 bg-sentinel-500/10 text-sentinel-300' : 'border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${checked ? 'bg-sentinel-400' : 'bg-slate-600'}`} />
      {label}
    </button>
  );
}

interface RuleRow {
  field: string;
  operator: string;
  value: string;
  action: string;
}

const ruleFields = ['data.category', 'provider.risk', 'system.environment', 'destination.region', 'payload.size', 'model.modality', 'request.tokens'];
const ruleOperators = ['contains', 'is', 'not in', '>', '<'];
const ruleValues = ['PII', 'High', 'Production', 'EU', '10 MB', 'Vision', '100k', 'Financial', 'Active'];
const ruleActions = ['Block', 'Redact', 'Require Approval', 'Allow', 'Log'];

export function PolicyCreateForm() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [priority, setPriority] = useState('Normal');
  const [rules, setRules] = useState<RuleRow[]>([{ field: 'data.category', operator: 'contains', value: 'PII', action: 'Block' }]);
  const [allSystems, setAllSystems] = useState(true);
  const [selected, setSelected] = useState<string[]>([aiSystems[0].id]);
  const [decisions, setDecisions] = useState<string[]>(['Block']);
  const [mode, setMode] = useState('Enforce');
  const [notify, setNotify] = useState(true);
  const [openIncident, setOpenIncident] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = ['Basics', 'Rules', 'Scope', 'Actions', 'Review'];
  const toggleDecision = (d: string) =>
    setDecisions((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
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
                <ShieldCheck size={24} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Policy created</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                {name || 'Untitled policy'} is now {status.toLowerCase()} with {rules.length} rule{rules.length === 1 ? '' : 's'} in {mode.toLowerCase()} mode.
                Enforcement begins once the policy engine picks up the revision.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                {decisions.map((d) => (
                  <DecisionBadge key={d} label={d} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              {step === 0 ? (
                <div className="space-y-5">
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Policy name</label>
                    <input className={`${inputCls} mt-2`} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Block PII to Unapproved Providers" />
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Description</label>
                    <textarea className={`${inputCls} mt-2 min-h-24 resize-y`} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What this policy enforces and why" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Status</label>
              <select className={`${inputCls} mt-2`} value={status} onChange={(e) => setStatus(e.target.value as 'Active' | 'Draft' | 'Disabled')}>
                        {['Active', 'Draft', 'Disabled'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Priority</label>
                      <select className={`${inputCls} mt-2`} value={priority} onChange={(e) => setPriority(e.target.value)}>
                        {['Low', 'Normal', 'High', 'Critical'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : step === 1 ? (
                <div className="space-y-3">
                  {rules.map((rule, i) => (
                    <div key={i} className="grid grid-cols-1 gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                      <select className={inputCls} value={rule.field} onChange={(e) => setRules((rs) => rs.map((r, j) => (j === i ? { ...r, field: e.target.value } : r)))}>
                        {ruleFields.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <select className={inputCls} value={rule.operator} onChange={(e) => setRules((rs) => rs.map((r, j) => (j === i ? { ...r, operator: e.target.value } : r)))}>
                        {ruleOperators.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <select className={inputCls} value={rule.value} onChange={(e) => setRules((rs) => rs.map((r, j) => (j === i ? { ...r, value: e.target.value } : r)))}>
                        {ruleValues.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                      <select className={inputCls} value={rule.action} onChange={(e) => setRules((rs) => rs.map((r, j) => (j === i ? { ...r, action: e.target.value } : r)))}>
                        {ruleActions.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={rules.length === 1}
                        onClick={() => setRules((rs) => rs.filter((_, j) => j !== i))}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-slate-400 transition hover:bg-white/5 disabled:opacity-30"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRules((rs) => [...rs, { field: 'provider.risk', operator: 'is', value: 'High', action: 'Block' }])}
                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-sentinel-500/50 hover:text-sentinel-300"
                  >
                    <Plus size={14} /> Add rule
                  </button>
                  <p className="text-[0.65rem] text-slate-500">Rules are evaluated in order; the first match determines the decision.</p>
                </div>
              ) : step === 2 ? (
                <div className="space-y-4">
                  <Toggle label="Apply to all AI systems" description="Scope covers every registered system and application" checked={allSystems} onChange={setAllSystems} />
                  {!allSystems ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {aiSystems.map((s) => {
                        const checked = selected.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelected((prev) => (checked ? prev.filter((x) => x !== s.id) : [...prev, s.id]))}
                            className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 text-left transition ${
                              checked ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                            }`}
                          >
                            <span className="truncate text-xs text-slate-300">{s.name}</span>
                            <span className={`h-3.5 w-3.5 shrink-0 rounded-full border ${checked ? 'border-sentinel-400 bg-sentinel-400' : 'border-slate-600'}`} />
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  <p className="text-[0.65rem] text-slate-500">{allSystems ? 'All systems included' : `${selected.length} systems selected`}</p>
                </div>
              ) : step === 3 ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Decisions</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {ruleActions.map((d) => (
                        <ChoiceChip key={d} label={d} checked={decisions.includes(d)} onClick={() => toggleDecision(d)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Enforcement mode</label>
                    <select className={`${inputCls} mt-2`} value={mode} onChange={(e) => setMode(e.target.value)}>
                      {['Enforce', 'Simulate', 'Log-only'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <Toggle label="Notify security channel" description="Post enforcement events to the configured webhook" checked={notify} onChange={setNotify} />
                  <Toggle label="Open incident on violation" description="Auto-create an incident when this policy blocks traffic" checked={openIncident} onChange={setOpenIncident} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Policy</p>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {name || 'Untitled policy'} · {status} · {priority} priority · {mode.toLowerCase()} mode
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Rules ({rules.length})</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {rules.map((r, i) => (
                        <Badge key={i} label={`${r.field} ${r.operator} ${r.value}`} tone="blue" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Scope</p>
                    <p className="mt-0.5 text-sm text-slate-400">{allSystems ? 'All AI systems' : `${selected.length} systems selected`}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs font-semibold text-white">Actions</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {decisions.map((d) => (
                        <DecisionBadge key={d} label={d} />
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
                {step === steps.length - 1 ? 'Create Policy' : 'Continue'} <ArrowRight size={14} />
              </button>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}

const defaultYaml = `name: Block PII to Unapproved Providers
status: Draft
priority: High
enforcement: Enforce
rules:
  - if: data.category contains PII
    and: provider.risk is High
    then: Block
  - if: destination.region not in EU
    and: data.category contains Health
    then: Block
notify: true`;

export function PolicyImportForm() {
  const [text, setText] = useState(defaultYaml);
  const [mode, setMode] = useState('Create new');
  const [parsed, setParsed] = useState<{ name: string; rules: number; decisions: string[] } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const preview = () =>
    setParsed({
      name: 'Block PII to Unapproved Providers',
      rules: (text.match(/\bthen\b/g) ?? []).length,
      decisions: ['Block', 'Redact']
    });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardBody>
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Policy definition (YAML)</label>
            <textarea
              className={`${inputCls} mt-2 min-h-64 resize-y font-mono text-xs leading-5`}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setParsed(null);
              }}
              spellCheck={false}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Import mode</label>
              <select className={`${inputCls} mt-2`} value={mode} onChange={(e) => setMode(e.target.value)}>
                {['Create new', 'Merge with existing', 'Replace existing'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={preview}
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Validate & Preview
              </button>
            </div>
          </div>

          {parsed ? (
            <div className="mt-4 space-y-3 rounded-2xl border border-sentinel-500/30 bg-sentinel-500/5 p-4">
              <p className="text-xs font-semibold text-white">Parsed definition</p>
              <div className="grid grid-cols-1 gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">Name</p>
                  <p className="mt-0.5">{parsed.name}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">Rules</p>
                  <p className="mt-0.5">{parsed.rules} rules detected</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">Actions</p>
                  <div className="mt-1 flex gap-1.5">
                    {parsed.decisions.map((d) => (
                      <DecisionBadge key={d} label={d} />
                    ))}
                  </div>
                </div>
              </div>
              {submitted ? (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 size={15} /> Imported successfully as a {mode.toLowerCase()} — queued for policy engine pickup.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
                >
                  Import Policy
                </button>
              )}
            </div>
          ) : (
            <p className="mt-4 text-[0.65rem] text-slate-500">Paste a policy definition to validate it before importing.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

const simCategories = ['PII', 'Financial', 'Health', 'Employee', 'Customer', 'Internal', 'Confidential', 'Public'];
const simRegions = ['US', 'EU', 'Asia'];
const simSizes = ['1 MB', '5 MB', '10 MB', '50 MB'];
const simTokens = ['1k', '12k', '100k'];
const severityOrder = ['Block', 'Redact', 'Require Approval', 'Allow', 'Log'];

export function PolicySimulator({ defaultPolicyId }: { defaultPolicyId?: string }) {
  const [policyId, setPolicyId] = useState(defaultPolicyId ?? policies[0].id);
  const [category, setCategory] = useState('PII');
  const [region, setRegion] = useState('US');
  const [size, setSize] = useState('5 MB');
  const [tokens, setTokens] = useState('12k');
  const [ran, setRan] = useState(false);

  const policy = policyById(policyId) ?? policies[0];
  const rules = rulesForPolicy(policy);
  const outcome = rules.map((r) => {
    const matched = r.value === category || r.value === region || r.value === size || r.value === tokens;
    return { ...r, matched };
  });
  const matchedRules = outcome.filter((o) => o.matched);
  const finalDecision =
    matchedRules.length > 0
      ? [...severityOrder].sort((a, b) => severityOrder.indexOf(b) - severityOrder.indexOf(a)).find((d) => matchedRules.some((m) => m.action === d)) ?? 'Allow'
      : policy.decisions.includes('Allow')
        ? 'Allow'
        : 'Logged';

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="space-y-5">
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Policy under test</label>
            <select className={`${inputCls} mt-2`} value={policyId} onChange={(e) => setPolicyId(e.target.value)}>
              {policies.map((p) => (
                <option key={p.id} value={p.id}>{p.name} · {p.status}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Data category</label>
              <select className={`${inputCls} mt-2`} value={category} onChange={(e) => setCategory(e.target.value)}>
                {simCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Destination region</label>
              <select className={`${inputCls} mt-2`} value={region} onChange={(e) => setRegion(e.target.value)}>
                {simRegions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Payload size</label>
              <select className={`${inputCls} mt-2`} value={size} onChange={(e) => setSize(e.target.value)}>
                {simSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Token count</label>
              <select className={`${inputCls} mt-2`} value={tokens} onChange={(e) => setTokens(e.target.value)}>
                {simTokens.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRan(true)}
            className="rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Run Simulation
          </button>
        </CardBody>
      </Card>

      {ran ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardBody>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rule evaluation — {policy.name}</p>
              <div className="divide-y divide-white/5">
                {outcome.map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white">{r.name}</p>
                      <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">
                        {r.field} {r.operator} {r.value}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {r.matched ? <Badge label="Matched" tone="green" /> : <Badge label="No match" tone="slate" />}
                      <DecisionBadge label={r.action} />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Simulated decision" subtitle="Most severe matched action wins" />
            <CardBody className="flex flex-col items-center gap-4 py-8 text-center">
              <DecisionBadge label={finalDecision} />
              <p className="text-sm text-slate-400">
                {matchedRules.length > 0
                  ? `${matchedRules.length} rule${matchedRules.length === 1 ? '' : 's'} matched for ${category} traffic to ${region}.`
                  : `No rules matched — default decision ${finalDecision.toLowerCase()} applied.`}
              </p>
              <p className="text-[0.65rem] text-slate-500">Estimated impact: {finalDecision === 'Block' ? 'request terminated at gateway' : finalDecision === 'Redact' ? 'sensitive fields scrubbed' : 'request forwarded with audit record'}</p>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export function GatewayConfigForm() {
  const [proxyV3, setProxyV3] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [redactionV2, setRedactionV2] = useState(true);
  const [cacheTtl, setCacheTtl] = useState('300');
  const [timeout, setTimeoutV] = useState('30');
  const [autoApprove, setAutoApprove] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader title="Proxy & routing" subtitle="How traffic flows through the gateway" />
        <CardBody className="space-y-3">
          <Toggle label="Gateway v3 proxy layer" description="Route all OpenAI-compatible endpoints through the v3 proxy" checked={proxyV3} onChange={setProxyV3} />
          <Toggle label="Streaming responses" description="Enable token streaming through the gateway" checked={streaming} onChange={setStreaming} />
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Upstream timeout (seconds)</label>
            <input className={`${inputCls} mt-2`} value={timeout} onChange={(e) => setTimeoutV(e.target.value)} />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Redaction & classification" subtitle="Sensitive data handling" />
        <CardBody className="space-y-3">
          <Toggle label="Transformer redaction v2" description="Use the transformer-based redaction pipeline" checked={redactionV2} onChange={setRedactionV2} />
          <Toggle label="Auto-approve low-risk redaction" description="Apply redaction without human review for Low risk data" checked={autoApprove} onChange={setAutoApprove} />
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Response cache TTL (seconds)</label>
            <input className={`${inputCls} mt-2`} value={cacheTtl} onChange={(e) => setCacheTtl(e.target.value)} />
          </div>
        </CardBody>
      </Card>
      <div className="flex items-center justify-between">
        <p className="text-[0.65rem] text-slate-500">Changes apply to new requests within 30 seconds.</p>
        {saved ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
            <CheckCircle2 size={14} /> Configuration saved
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setSaved(true)}
            className="rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Save Configuration
          </button>
        )}
      </div>
    </div>
  );
}

export function PolicySettingsForm({ policyId }: { policyId: string }) {
  const policy = policyById(policyId) ?? policies[0];
  const [name, setName] = useState(policy.name);
  const [description, setDescription] = useState(policy.description);
  const [status, setStatus] = useState(policy.status);
  const [version, setVersion] = useState(policy.version);
  const [mode, setMode] = useState('Enforce');
  const [notify, setNotify] = useState(true);
  const [openIncident, setOpenIncident] = useState(true);
  const [audit, setAudit] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader title="Policy settings" subtitle={`Configuration for ${policy.id}`} />
        <CardBody className="space-y-5">
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Name</label>
            <input className={`${inputCls} mt-2`} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Description</label>
            <textarea className={`${inputCls} mt-2 min-h-20 resize-y`} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Status</label>
              <select className={`${inputCls} mt-2`} value={status} onChange={(e) => setStatus(e.target.value as 'Active' | 'Draft' | 'Disabled')}>
                {['Active', 'Draft', 'Disabled'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Version</label>
              <input className={`${inputCls} mt-2`} value={version} onChange={(e) => setVersion(e.target.value)} />
            </div>
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Enforcement mode</label>
              <select className={`${inputCls} mt-2`} value={mode} onChange={(e) => setMode(e.target.value)}>
                {['Enforce', 'Simulate', 'Log-only'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <Toggle label="Notify security channel" description="Post enforcement events to the configured webhook" checked={notify} onChange={setNotify} />
            <Toggle label="Open incident on violation" description="Auto-create an incident when this policy blocks traffic" checked={openIncident} onChange={setOpenIncident} />
            <Toggle label="Full audit trail" description="Record every evaluation for this policy in the audit log" checked={audit} onChange={setAudit} />
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <p className="text-[0.65rem] text-slate-500">Changes require an admin MFA session.</p>
            {saved ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={14} /> Settings saved
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setSaved(true)}
                className="rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                Save Settings
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export function ApprovalDecisionPanel({ approvalId }: { approvalId: string }) {
  const approval = approvals.find((a) => a.id === approvalId) ?? approvals[0];
  const [decision, setDecision] = useState<'Pending' | 'Approved' | 'Denied'>(approval.status === 'Pending' ? 'Pending' : approval.status === 'Approved' ? 'Approved' : 'Denied');

  return (
    <Card>
      <CardHeader title="Decision panel" subtitle={`Your decision on ${approval.id}`} />
      <CardBody>
        {decision === 'Pending' ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              {approval.requester} is requesting {approval.type.toLowerCase()} access for a {approval.risk.toLowerCase()}-risk resource. The request window closes{' '}
              {approval.expiresAt.slice(0, 10)}.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setDecision('Approved')}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-400"
              >
                <CheckCircle2 size={14} /> Approve
              </button>
              <button
                type="button"
                onClick={() => setDecision('Denied')}
                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-400"
              >
                Deny
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm">
            <Badge label={decision} tone={decision === 'Approved' ? 'green' : 'rose'} />
            <p className="text-slate-400">
              {decision === 'Approved' ? 'Request approved — access provisioned and logged.' : 'Request denied — requester notified and window closed.'}
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
