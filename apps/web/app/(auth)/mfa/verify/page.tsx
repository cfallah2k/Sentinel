'use client';

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyRound, Loader2, ShieldAlert } from 'lucide-react';

const CODE_LENGTH = 6;

export default function MfaVerifyPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '');
    if (!digit) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit.slice(-1);
      return next;
    });
    if (index < CODE_LENGTH - 1) refs.current[index + 1]?.focus();
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;
    setDigits((prev) => {
      const next = [...prev];
      pasted.split('').forEach((d, i) => {
        next[i] = d;
      });
      return next;
    });
    refs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const verify = () => {
    if (digits.some((d) => !d)) {
      setError('Enter all 6 digits of your code.');
      return;
    }
    setLoading(true);
    setError('');
    window.setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const codeEmpty = digits.every((d) => !d);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
          <ShieldAlert className="h-5 w-5 text-white" size={20} />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
        </div>
      </div>

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[var(--surface)] p-6 shadow-panel sm:p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Confirm it&apos;s you</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Enter the 6-digit code from your authenticator app or phone.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between gap-2">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => updateDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                onPaste={onPaste}
                aria-label={`Digit ${i + 1}`}
                className="h-14 min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/75 text-center font-mono text-lg text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15 max-w-[3.5rem]"
              />
            ))}
          </div>

          {error ? (
            <p className="flex items-center gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" size={14} /> {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={verify}
            disabled={loading || codeEmpty}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" size={16} /> : <KeyRound className="h-4 w-4" size={16} />}
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              className="font-semibold text-sentinel-300 transition hover:text-sentinel-200"
              onClick={() => router.push('/mfa/verify?mode=recovery')}
            >
              Use recovery code
            </button>
            <button
              type="button"
              className="font-semibold text-slate-400 transition hover:text-white"
              onClick={() => setDigits(Array(CODE_LENGTH).fill(''))}
            >
              Resend code
            </button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Trouble signing in?{' '}
        <Link href="/forgot-password" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Reset your password
        </Link>
      </p>
    </div>
  );
}
