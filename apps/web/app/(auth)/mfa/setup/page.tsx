'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  KeyRound,
  Lock,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

const QR_SIZE = 21;
const SECRET = 'S3C1A5X7 Q9K2P8T4';

const qrCells = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => {
  const x = i % QR_SIZE;
  const y = Math.floor(i / QR_SIZE);
  const inFinder = (x < 7 && y < 7) || (x >= QR_SIZE - 7 && y < 7) || (x < 7 && y >= QR_SIZE - 7);
  if (inFinder) {
    const lx = x < 7 ? x : x - (QR_SIZE - 7);
    const ly = y < 7 ? y : y - (QR_SIZE - 7);
    return lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx === 3 && ly === 3);
  }
  return (x * 37 + y * 23 + 7) % 5 < 2;
});

type Method = 'authenticator' | 'sms' | 'key' | null;
type Step = 'method' | 'qr' | 'code' | 'done';

const methods = [
  { id: 'authenticator' as const, icon: Smartphone, title: 'Authenticator app', desc: 'Time-based codes from your mobile authenticator' },
  { id: 'sms' as const, icon: MessageSquare, title: 'SMS', desc: 'One-time codes sent to your phone' },
  { id: 'key' as const, icon: KeyRound, title: 'Security key', desc: 'A physical passkey you plug in or tap' }
];

export default function MfaSetupPage() {
  const [step, setStep] = useState<Step>('method');
  const [method, setMethod] = useState<Method>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const chooseMethod = (id: NonNullable<Method>) => {
    setMethod(id);
    if (id === 'authenticator') setStep('qr');
    if (id === 'sms') setStep('code');
    if (id === 'key') setStep('done');
  };

  const confirmCode = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim().length !== 6) {
      setError('Enter the 6-digit code from your device.');
      return;
    }
    setError('');
    setStep('done');
  };

  const backToMethods = () => {
    setStep('method');
    setMethod(null);
    setCode('');
    setError('');
  };

  const title = method === 'sms' ? 'SMS verification' : method === 'key' ? 'Security key' : 'Authenticator app';
  const subtitle =
    method === 'sms'
      ? 'Enter the one-time code sent to your phone.'
      : method === 'key'
        ? 'Confirm this key is physically present to register it.'
        : 'Scan the QR code with your authenticator app, then confirm the code.';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
          <ShieldAlert className="h-5 w-5 text-white" size={20} />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
        </div>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
        {step === 'method' ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Set up MFA</h1>
            <p className="mt-1.5 text-sm text-slate-400">Choose a second factor to protect your account.</p>

            <div className="mt-6 space-y-3">
              {methods.map(({ id, icon: Icon, title: t, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => chooseMethod(id)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/75 p-4 text-left transition hover:border-sentinel-500/60 hover:bg-slate-950"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sentinel-500/15 text-sentinel-300">
                    <Icon className="h-5 w-5" size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t}</span>
                    <span className="mt-0.5 block text-xs text-slate-400">{desc}</span>
                  </span>
                </button>
              ))}
            </div>

            {error ? (
              <p className="mt-4 flex items-center gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" size={14} /> {error}
              </p>
            ) : null}
          </>
        ) : null}

        {step === 'qr' ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Scan with your app</h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Open your authenticator app and scan the code below, or enter it manually.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex justify-center rounded-2xl border border-white/10 bg-white p-4">
                <div className="grid grid-cols-[repeat(21,1fr)] gap-px" style={{ gridTemplateColumns: `repeat(${QR_SIZE}, 1fr)` }}>
                  {qrCells.map((filled, i) => (
                    <span key={i} className={`h-[0.55rem] w-[0.55rem] ${filled ? 'bg-slate-900' : 'bg-white'}`} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Setup key</p>
                <p className="mt-1.5 font-mono text-sm tracking-widest text-white">{SECRET}</p>
              </div>

              <button
                type="button"
                onClick={() => setStep('code')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                I&apos;ve scanned the code
              </button>
            </div>
          </>
        ) : null}

        {step === 'code' ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
            <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>

            <form onSubmit={confirmCode} className="mt-6 space-y-4">
              <div>
                <label htmlFor="mfa-code" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Verification code
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    id="mfa-code"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-4 font-mono text-sm tracking-[0.4em] text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
                  />
                </div>
              </div>

              {error ? (
                <p className="flex items-center gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" size={14} /> {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                Confirm and enable
              </button>
            </form>
          </>
        ) : null}

        {step === 'done' ? (
          <>
            <div className="flex flex-col items-center py-2 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
                <CheckCircle2 className="h-7 w-7 text-emerald-400" size={28} />
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {method === 'key' ? 'Security key registered' : 'MFA enabled'}
              </h1>
              <p className="mt-1.5 text-sm text-slate-400">
                {method === 'key'
                  ? 'Your security key is now tied to your account and will be requested on sign-in.'
                  : 'A second factor is now required whenever you sign in to Sentinel.'}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/mfa"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                <ShieldCheck className="h-4 w-4" size={16} /> Back to MFA overview
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Continue to dashboard
              </Link>
            </div>
          </>
        ) : null}

        {step !== 'done' ? (
          <button
            type="button"
            onClick={step === 'method' ? undefined : backToMethods}
            disabled={step === 'method'}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white disabled:cursor-default disabled:text-slate-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" size={14} /> {step === 'method' ? 'Choose a method below to begin' : 'Back to methods'}
          </button>
        ) : (
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Check className="h-3 w-3" size={12} /> MFA setup wizard
          </p>
        )}
      </div>
    </div>
  );
}
