'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

type Decision = 'allowed' | 'blocked' | 'redacted';

interface ChatMessage {
  id: number;
  from: 'app' | 'sentinel';
  label: string;
  decision?: Decision;
  reply?: string;
  ts: string;
}

const CHAT_POOL: { label: string; decision: Decision; reply: string }[] = [
  { label: 'Customer name', decision: 'allowed', reply: 'Cleared by policy GRD-04 — no sensitive match' },
  { label: 'Product SKU', decision: 'allowed', reply: 'Allowed — non-sensitive attribute' },
  { label: 'Ticket subject', decision: 'allowed', reply: 'Allowed — passes semantic screening' },
  { label: 'Order total', decision: 'allowed', reply: 'Allowed — safe financial aggregate' },
  { label: 'National ID', decision: 'blocked', reply: 'Blocked — high-risk PII intercepted at gateway' },
  { label: 'Credit card number', decision: 'blocked', reply: 'Blocked — payment data denied before inference' },
  { label: 'Bank account number', decision: 'blocked', reply: 'Blocked — financial PII isolated' },
  { label: 'Passport number', decision: 'redacted', reply: 'Redacted — masked before forwarding' },
  { label: 'Home address', decision: 'redacted', reply: 'Redacted — stripped from model output' },
  { label: 'Phone number', decision: 'redacted', reply: 'Redacted — replaced with reversible token' }
];

const DECISION_STYLES: Record<Decision, { chip: string; dot: string }> = {
  allowed: { chip: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300', dot: 'bg-emerald-400' },
  blocked: { chip: 'border-rose-400/25 bg-rose-400/10 text-rose-300', dot: 'bg-rose-400' },
  redacted: { chip: 'border-amber-400/25 bg-amber-400/10 text-amber-300', dot: 'bg-amber-400' }
};

const STAT_TARGETS = [0, 0, 0];
const STAT_LABELS = ['Policy blocks', 'Risk reduction', 'Audit readiness'];

const MAP_NODES = [
  { x: 62, y: 56, region: 'Lagos', delay: 0 },
  { x: 156, y: 22, region: 'Cairo', delay: 0.6 },
  { x: 252, y: 66, region: 'Nairobi', delay: 1.2 },
  { x: 356, y: 38, region: 'Abidjan', delay: 1.8 },
  { x: 408, y: 74, region: 'Accra', delay: 0.3 }
];

const MAP_PATHS = [
  { d: 'M62 56 C 100 40, 130 28, 156 22', delay: 0 },
  { d: 'M156 22 C 200 55, 225 62, 252 66', delay: 0.6 },
  { d: 'M252 66 C 300 50, 330 42, 356 38', delay: 1.2 },
  { d: 'M62 56 C 200 92, 330 88, 408 74', delay: 1.8 }
];

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function seedChat(): ChatMessage[] {
  const seed: ChatMessage[] = [];
  const now = Date.now();
  for (let i = 0; i < 2; i++) {
    const src = CHAT_POOL[(i + 2) % CHAT_POOL.length];
    seed.push({ id: now + i * 2, from: 'app', label: src.label, ts: nowTime() });
    seed.push({ id: now + i * 2 + 1, from: 'sentinel', label: src.label, decision: src.decision, reply: src.reply, ts: nowTime() });
  }
  return seed;
}

export default function ThreatLens() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => seedChat());
  const [typing, setTyping] = useState(false);
  const [throughput, setThroughput] = useState(0);
  const [stats] = useState<number[]>(STAT_TARGETS);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const pushPair = () => {
      if (cancelled) return;
      const src = CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)];
      const id = Date.now();
      setTyping(true);
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setMessages((prev) => [...prev.slice(-5), { id, from: 'app', label: src.label, ts: nowTime() }]);
          timers.push(
            window.setTimeout(() => {
              if (cancelled) return;
              setMessages((prev) => [
                ...prev.slice(-5),
                { id: id + 1, from: 'sentinel', label: src.label, decision: src.decision, reply: src.reply, ts: nowTime() }
              ]);
              setTyping(false);
              setThroughput((t) => t + (Math.random() * 0.2 - 0.1));
              timers.push(window.setTimeout(pushPair, 1900 + Math.random() * 1400));
            }, 650)
          );
        }, 850)
      );
    };

    timers.push(window.setTimeout(pushPair, 1400));
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_30%)] blur-3xl" />
      <div className="relative space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">AI threat lens</p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Watch Sentinel govern your AI traffic, request by request.</h2>
            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              This is the gateway your APIs connect to — instead of calling AI providers directly, your apps call Sentinel and every request is inspected, classified, and governed here.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-slate-950/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-slate-300 sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live map
            <span className="ml-1.5 font-mono text-[0.6rem] normal-case tracking-normal text-emerald-300">
              {throughput.toFixed(2)}M req/min
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/95 p-3.5 shadow-[0_30px_70px_rgba(15,23,42,0.22)] sm:rounded-[1.5rem] sm:p-5">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-6 top-20 h-20 w-20 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 sm:h-28">
            <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: 'radial-gradient(rgba(148,163,184,0.16) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
            <svg viewBox="0 0 480 96" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {MAP_PATHS.map((path) => (
                <path
                  key={path.d}
                  d={path.d}
                  fill="none"
                  stroke="rgba(56,189,248,0.35)"
                  strokeWidth="1"
                  strokeDasharray="6 10"
                  style={{ animation: `dash-flow 2.4s linear infinite`, animationDelay: `${path.delay}s` }}
                />
              ))}
            </svg>
            {MAP_NODES.map((node) => (
              <div
                key={node.region}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                style={{ left: `${(node.x / 480) * 100}%`, top: `${(node.y / 96) * 100}%` }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sentinel-400 opacity-50" style={{ animationDelay: `${node.delay}s` }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sentinel-400 shadow-glow" />
                </span>
                <span className="whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{node.region}</span>
              </div>
            ))}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 p-3 sm:mt-5 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Gateway session — simulated preview</p>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.6rem] text-slate-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Demo feed
              </span>
            </div>

            <ul className="mt-3 flex min-h-[216px] flex-col justify-end gap-2.5 sm:min-h-[240px]">
              {messages.map((message) => {
                const style = message.decision ? DECISION_STYLES[message.decision] : null;
                return message.from === 'app' ? (
                  <li key={message.id} className="flex flex-col items-end" style={{ animation: 'feed-in 0.35s ease-out' }}>
                    <div className="max-w-[85%] rounded-2xl rounded-br-md border border-white/10 bg-slate-800/80 px-3.5 py-2">
                      <p className="text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">Your app → AI</p>
                      <p className="mt-0.5 text-xs text-slate-200 sm:text-sm">{message.label}</p>
                    </div>
                    <span className="mt-1 font-mono text-[0.55rem] text-slate-600">{message.ts}</span>
                  </li>
                ) : (
                  <li key={message.id} className="flex flex-col items-start" style={{ animation: 'feed-in 0.35s ease-out' }}>
                    <div className="flex max-w-[90%] items-start gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-slate-950/80 px-3.5 py-2">
                      <span className="mt-1 flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sentinel-500 to-cyan-400">
                        <span className={`h-1 w-1 rounded-full ${style?.dot ?? 'bg-white'}`} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-sentinel-300">Sentinel</p>
                        <p className="mt-0.5 text-xs text-slate-200 sm:text-sm">{message.reply}</p>
                        {style && (
                          <span className={`mt-1.5 inline-flex rounded-full border px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.15em] ${style.chip}`}>
                            {message.decision}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="mt-1 font-mono text-[0.55rem] text-slate-600">{message.ts}</span>
                  </li>
                );
              })}
              {typing && (
                <li className="flex items-start gap-2" style={{ animation: 'feed-in 0.35s ease-out' }}>
                  <span className="mt-1.5 flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sentinel-500 to-cyan-400">
                    <span className="h-1 w-1 rounded-full bg-white" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-slate-950/80 px-3.5 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animation: 'typing-bounce 1s ease-in-out infinite' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animation: 'typing-bounce 1s ease-in-out infinite', animationDelay: '0.15s' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animation: 'typing-bounce 1s ease-in-out infinite', animationDelay: '0.3s' }} />
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3">
            {STAT_LABELS.map((label, index) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-950/90 p-3.5 text-xs text-slate-300 transition hover:border-sentinel-500/20 hover:bg-slate-900/95 sm:rounded-3xl sm:p-4 sm:text-sm"
              >
                <p className="font-mono text-lg font-semibold text-white sm:text-xl">{Math.round(stats[index])}%</p>
                <p className="mt-1.5 uppercase tracking-[0.3em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-[0.6rem] leading-5 text-slate-600">
            Your traffic metrics start at zero and populate once your gateway is connected. The session above is a simulated preview of the product.
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4 sm:rounded-[1.5rem] sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-sentinel-500/25 bg-sentinel-500/10 text-sentinel-300">
              <Terminal className="h-4 w-4" size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white">Connect your gateway</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Point your SDKs at your Sentinel gateway URL instead of calling AI providers directly. Every request is inspected, classified, and governed before it reaches any model.
              </p>
              <div className="mt-3 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2">
                <span className="font-mono text-[0.65rem] text-slate-500">$</span>
                <code className="whitespace-nowrap font-mono text-[0.65rem] text-sentinel-200">
                  export OPENAI_BASE_URL=https://gateway.sentinel.dev/v1
                </code>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <Link href="/get-started" className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
                  Set up your gateway
                </Link>
                <Link href="/docs" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
                  Read the docs
                </Link>
                <Link href="/developer-portal" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
                  API keys
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
