'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowRight, Code2, FileSearch, Send, ShieldCheck } from 'lucide-react';
import {
  EXAMPLE_PROMPTS,
  MODELS,
  ORGS,
  POLICIES,
  buildApiPreview,
  decide,
  detect,
  sanitize,
  type Detection
} from '../../../components/playground/detector';

const STATUS_STYLES: Record<Detection['status'], { badge: string; dot: string }> = {
  allowed: { badge: 'text-emerald-300', dot: 'bg-emerald-400' },
  redacted: { badge: 'text-amber-300', dot: 'bg-amber-400' },
  blocked: { badge: 'text-rose-300', dot: 'bg-rose-400' }
};

function makeAuditId() {
  return `evt_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState(EXAMPLE_PROMPTS[0]);
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [orgId, setOrgId] = useState(ORGS[0].id);
  const [policyId, setPolicyId] = useState(POLICIES[0].id);
  const [ranAt, setRanAt] = useState<number | null>(null);
  const [auditId, setAuditId] = useState('');

  const model = useMemo(() => MODELS.find((m) => m.id === modelId) ?? MODELS[0], [modelId]);
  const org = useMemo(() => ORGS.find((o) => o.id === orgId) ?? ORGS[0], [orgId]);
  const policy = useMemo(() => POLICIES.find((p) => p.id === policyId) ?? POLICIES[0], [policyId]);

  const detections = useMemo(() => detect(prompt, policy), [prompt, policy]);
  const after = useMemo(() => sanitize(prompt, policy), [prompt, policy]);
  const decision = useMemo(() => decide(detections, policy), [detections, policy]);
  const apiPreview = useMemo(
    () => buildApiPreview({ prompt: after, policy, model, orgKey: org.id }),
    [after, policy, model, org]
  );

  useEffect(() => {
    setAuditId(makeAuditId());
    setRanAt(Date.now());
  }, []);

  const run = (value: string) => {
    setPrompt(value);
    setAuditId(makeAuditId());
    setRanAt(Date.now());
  };

  const selectCls =
    'w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

  const tokenParts = after.split(/(\[REDACTED\]|\[BLOCKED\])/g);

  return (
    <div className="space-y-10 lg:space-y-14">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sentinel-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          AI Gateway Playground
        </span>
        <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
          Type a prompt. Watch Sentinel govern it before any AI model sees it.
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
          This is not a chatbot — it is the control layer. Sentinel inspects every request, redacts and blocks what your
          policy forbids, then forwards only the safe version to the model. Detection runs locally in your browser.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Compose a request</p>
            <Activity className="h-4 w-4 text-sentinel-300" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Model</span>
              <select value={modelId} onChange={(e) => setModelId(e.target.value)} className={selectCls}>
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-slate-950 text-white">
                    {m.name} — {m.provider}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Organization</span>
              <select value={orgId} onChange={(e) => setOrgId(e.target.value)} className={selectCls}>
                {ORGS.map((o) => (
                  <option key={o.id} value={o.id} className="bg-slate-950 text-white">
                    {o.org}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Policy</span>
              <select value={policyId} onChange={(e) => setPolicyId(e.target.value)} className={selectCls}>
                {POLICIES.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-950 text-white">
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            placeholder="Type a prompt to an AI model…"
            className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3.5 text-sm leading-6 text-white placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => run(example)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-sentinel-500/40 hover:text-white"
              >
                Example {index + 1}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => run(prompt)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sentinel-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Send through gateway
            </button>
            <p className="text-xs text-slate-500">Simulated in-browser — no request leaves your machine.</p>
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <div
            className={`rounded-3xl border p-5 shadow-panel backdrop-blur-xl sm:p-6 ${
              decision.tone === 'blocked'
                ? 'border-rose-500/40 bg-rose-500/5'
                : 'border-emerald-500/30 bg-emerald-500/5'
            }`}
          >
            <p
              className={`text-[0.65rem] uppercase tracking-[0.3em] ${
                decision.tone === 'blocked' ? 'text-rose-300' : 'text-emerald-300'
              }`}
            >
              Decision
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">{decision.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{decision.message}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Governance panel</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] text-slate-300">
                {policy.name}
              </span>
            </div>

            {detections.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/75 p-4 text-sm text-slate-400">
                <FileSearch className="mr-2 inline h-4 w-4 text-slate-500" />
                No sensitive fields detected in this prompt.
              </div>
            ) : (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-950/75 text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                      <th className="px-4 py-2.5 font-semibold">Data</th>
                      <th className="hidden px-4 py-2.5 font-semibold sm:table-cell">Detected</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detections.map((d) => {
                      const style = STATUS_STYLES[d.status];
                      return (
                        <tr key={d.category} className="border-b border-white/5 last:border-b-0">
                          <td className="px-4 py-3 font-medium text-white">{d.category}</td>
                          <td className="hidden px-4 py-3 font-mono text-xs text-slate-400 sm:table-cell">{d.sample}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] ${style.badge}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                Audit event created
              </span>
              <span className="font-mono text-[0.7rem] text-slate-500">
                {auditId} · {ranAt ? new Date(ranAt).toLocaleTimeString([], { hour12: false }) : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Before / After</p>
            <ArrowRight className="h-4 w-4 text-sentinel-300" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">What you typed</p>
              <div className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/75 p-4 font-mono text-xs leading-6 text-slate-300">
                {prompt}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">What the model receives</p>
              <div className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/75 p-4 font-mono text-xs leading-6 text-slate-300">
                {tokenParts.map((part, index) =>
                  part === '[REDACTED]' ? (
                    <mark key={index} className="rounded bg-amber-400/15 px-1 text-amber-300">
                      [REDACTED]
                    </mark>
                  ) : part === '[BLOCKED]' ? (
                    <mark key={index} className="rounded bg-rose-400/15 px-1 text-rose-300">
                      [BLOCKED]
                    </mark>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">What your app would send</p>
            <Code2 className="h-4 w-4 text-sentinel-300" />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            Developers can preview the exact request their application would make — and test it here before wiring up
            their own integration.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/75 p-4 text-xs leading-6 text-slate-300">
            <code>{apiPreview}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
