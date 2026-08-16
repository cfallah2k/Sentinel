'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Bot, Lock, MessagesSquare, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import {
  MODELS,
  POLICIES,
  decide,
  detect,
  sanitize,
  type Decision,
  type Detection,
  type ModelOption,
  type Policy
} from '../playground/detector';

interface Governance {
  decision: Decision;
  detections: Detection[];
  forwarded: string | null;
  auditId: string;
  appliedAt: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  governance?: Governance;
  model?: ModelOption;
}

const SUGGESTIONS = [
  'Summarize this customer record and explain their recent transactions.\nCustomer: John Doe\nEmail: john.doe@example.com\nPhone: +231 77 700 0000\nNational ID: LR-123456\nBank account: LR77000012345678',
  'My customer ID is LR-123456 and my phone is 0886123456. Give me a payment plan for the balance.',
  'Name: Maria Kone\nAddress: 12 Broad Street, Monrovia\nEmail: maria.kone@mail.com\nCard: 4242 4242 4242 4242\nPlease draft a welcome email.',
  'Explain the difference between a data flow and an AI system in Sentinel.'
];

const ALLOWED_REPLIES = [
  "Here's what you asked for. I checked the request against {policy} — no sensitive fields were detected, so it was forwarded to the model unchanged.",
  "Got it. Your request passed policy evaluation under {policy} with no redactions needed. Here's the detail you wanted.",
  "Sure — I can help with that. The request was allowed under {policy} and an audit event was written for the record."
];

const REDACTED_REPLIES = [
  "I received your message with {count} sensitive field{s} redacted before it reached the model. I'll work with the safe version below.",
  "Your request was sanitized first — {count} sensitive field{s} replaced with [REDACTED] before the model saw it. Here's the response based on what was shared."
];

const BLOCKED_REPLY =
  "I can't process that request. Under {policy}, the following prohibited fields were detected: {fields}. Nothing was forwarded to the model, and the attempt was recorded as an audit event. You can adjust the data you share or ask an admin to review the policy.";

function makeId() {
  return `evt_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function fmtTime(d: Date) {
  return d.toISOString().slice(11, 19) + ' UTC';
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [policyId, setPolicyId] = useState(POLICIES[0].id);
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [busy, setBusy] = useState(false);
  const [streamId, setStreamId] = useState<string | null>(null);
  const [typedLen, setTypedLen] = useState(0);
  const [replyIndex, setReplyIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const policy = useMemo(() => POLICIES.find((p) => p.id === policyId) ?? POLICIES[0], [policyId]);
  const model = useMemo(() => MODELS.find((m) => m.id === modelId) ?? MODELS[0], [modelId]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typedLen, busy]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;

    const userMsg: Message = { id: makeId(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setBusy(true);
    setStreamId(null);

    window.setTimeout(() => {
      const detections = detect(text, policy);
      const decision = decide(detections, policy);
      const forwarded = decision.tone === 'blocked' ? null : sanitize(text, policy);

      const reply =
        decision.tone === 'blocked'
          ? BLOCKED_REPLY.replace('{policy}', policy.name).replace(
              '{fields}',
              detections.filter((d) => d.status === 'blocked').map((d) => d.category).join(', ')
            )
          : detections.some((d) => d.status === 'redacted')
            ? REDACTED_REPLIES[replyIndex % REDACTED_REPLIES.length]
                .replace('{count}', String(detections.filter((d) => d.status === 'redacted').length))
                .replace('{s}', detections.filter((d) => d.status === 'redacted').length > 1 ? 's' : '')
            : ALLOWED_REPLIES[replyIndex % ALLOWED_REPLIES.length].replace('{policy}', policy.name);

      const fullReply = `${reply}\n\n_Simulated preview — generated in your browser by ${model.name} via ${model.provider}._`;
      const msgId = makeId();
      const governance: Governance = {
        decision,
        detections,
        forwarded,
        auditId: msgId,
        appliedAt: fmtTime(new Date())
      };

      setMessages((prev) => [
        ...prev,
        { id: msgId, role: 'assistant', content: fullReply, governance, model }
      ]);
      setReplyIndex((i) => i + 1);
      setBusy(false);
      setStreamId(msgId);
      setTypedLen(0);
    }, 900);
  };

  useEffect(() => {
    if (!streamId) return;
    const msg = messages.find((m) => m.id === streamId);
    if (!msg) return;
    if (typedLen >= msg.content.length) {
      setStreamId(null);
      return;
    }
    const t = window.setTimeout(() => setTypedLen((n) => n + 2), 16);
    return () => window.clearTimeout(t);
  }, [streamId, typedLen, messages]);

  const reset = () => {
    setMessages([]);
    setBusy(false);
    setStreamId(null);
    setReplyIndex(0);
  };

  const selectCls =
    'w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

  const decisionTone =
    (decision: Decision) =>
    decision.tone === 'blocked'
      ? { badge: 'border-rose-500/30 bg-rose-500/10 text-rose-300', dot: 'bg-rose-400' }
      : { badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300', dot: 'bg-emerald-400' };

  return (
    <div className="flex min-h-[72vh] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface)] shadow-panel backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
            <MessagesSquare className="h-5 w-5 text-white" size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Sentinel Chat</p>
            <p className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
              <Lock className="h-3 w-3" size={12} />
              Governed assistant
            </p>
          </div>
        </div>

        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-slate-400">
          <Sparkles className="h-3 w-3" size={12} />
          Simulated preview
        </span>

        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-2">
          <select value={modelId} onChange={(e) => setModelId(e.target.value)} className={selectCls} aria-label="Model">
            {MODELS.map((m) => (
              <option key={m.id} value={m.id} className="bg-slate-950 text-white">
                {m.name} · {m.provider}
              </option>
            ))}
          </select>
          <select value={policyId} onChange={(e) => setPolicyId(e.target.value)} className={selectCls} aria-label="Policy">
            {POLICIES.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-950 text-white">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.length === 0 ? (
          <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
              <ShieldCheck className="h-7 w-7 text-white" size={28} />
            </span>
            <p className="mt-5 text-lg font-semibold text-white">Chat with Sentinel as your AI assistant</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Every message is evaluated against the active policy before any model sees it — sensitive data is
              detected, redacted, or blocked, and every exchange is written to the audit trail. All replies are
              simulated previews in your browser.
            </p>
            <div className="mt-6 w-full space-y-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.slice(0, 24)}
                  type="button"
                  onClick={() => send(s)}
                  className="block w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-left text-xs leading-5 text-slate-300 transition hover:border-sentinel-500/40 hover:bg-slate-950 hover:text-white"
                >
                  {s.split('\n')[0]}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const streaming = msg.id === streamId;
            const shown = streaming ? msg.content.slice(0, typedLen) : msg.content;
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-3xl rounded-br-lg border border-sentinel-500/25 bg-sentinel-500/10 px-4 py-3 sm:max-w-[75%]">
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-white">{msg.content}</p>
                  </div>
                </div>
              );
            }
            const tone = decisionTone(msg.governance!.decision);
            return (
              <div key={msg.id} className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sentinel-300">
                    <Bot className="h-4 w-4" size={16} />
                  </span>
                  <div className="min-w-0 flex-1 rounded-3xl rounded-tl-lg border border-white/10 bg-slate-950/80 px-4 py-3">
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">
                      {shown}
                      {streaming ? (
                        <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-sentinel-400 align-middle" />
                      ) : null}
                    </p>
                  </div>
                </div>

                {msg.governance ? (
                  <div className="ml-11 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] ${tone.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                        {msg.governance.decision.title}
                      </span>
                      {msg.governance.detections.map((d) => (
                        <span
                          key={d.category}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] text-slate-400"
                        >
                          {d.category}
                          <span className={`h-1 w-1 rounded-full ${d.status === 'blocked' ? 'bg-rose-400' : d.status === 'redacted' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                          {d.status}
                        </span>
                      ))}
                      <span className="font-mono text-[0.6rem] text-slate-500">
                        simulated · {msg.governance.auditId} · {msg.governance.appliedAt}
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 px-3.5 py-2.5">
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
                        {msg.governance.decision.tone === 'blocked'
                          ? 'Nothing forwarded to the model'
                          : 'What the model received'}
                      </p>
                      {msg.governance.forwarded ? (
                        <p className="mt-1 whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-5 text-slate-300">
                          {msg.governance.forwarded}
                        </p>
                      ) : (
                        <p className="mt-1 text-[0.7rem] leading-5 text-rose-300">
                          Request rejected before the model — blocked fields were detected under {policy.name}.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        )}

        {busy ? (
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sentinel-300">
              <Bot className="h-4 w-4" size={16} />
            </span>
            <div className="flex items-center gap-2 rounded-3xl rounded-tl-lg border border-white/10 bg-slate-950/80 px-4 py-3">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sentinel-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sentinel-400 [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sentinel-400 [animation-delay:240ms]" />
              </span>
              <span className="text-xs text-slate-400">Evaluating against {policy.name}…</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex items-end gap-2 rounded-3xl border border-white/10 bg-slate-950/75 p-2 focus-within:border-sentinel-500/50 focus-within:ring-2 focus-within:ring-sentinel-500/10">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask anything — every message is governed by Sentinel…"
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={() => send(input)}
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sentinel-500 text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-40"
            >
              {busy ? <RefreshCw className="h-4 w-4 animate-spin" size={16} /> : <ArrowUp className="h-4 w-4" size={16} />}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.65rem] leading-4 text-slate-500">
              <Lock className="mr-1 inline h-3 w-3" size={12} />
              Simulated in your browser — no request leaves this workspace. Every exchange is governed by{' '}
              <span className="text-slate-300">{policy.name}</span> and written to the audit trail.
            </p>
            {messages.length > 0 ? (
              <button
                type="button"
                onClick={reset}
                className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 transition hover:text-white"
              >
                New conversation
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}