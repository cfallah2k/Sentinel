'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Eye, EyeOff, Globe2, Lock, Mail, Megaphone, ShieldAlert, User } from 'lucide-react';

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Netherlands',
  'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Ireland', 'Australia',
  'New Zealand', 'Japan', 'Singapore', 'South Korea', 'United Arab Emirates',
  'Saudi Arabia', 'South Africa', 'Brazil', 'Mexico', 'India', 'Nigeria', 'Kenya', 'Other'
];

const sectors = [
  'Government', 'Fintech', 'Banks', 'Insurance', 'Healthcare', 'Technology / SaaS',
  'Telecommunications', 'Energy', 'Defense / Aerospace', 'Education', 'Legal',
  'Retail / E-commerce', 'Manufacturing', 'Consulting', 'Nonprofit', 'Other'
];

const referralSources = [
  'Google search', 'LinkedIn', 'X / Twitter', 'YouTube', 'Podcast', 'Webinar / Event',
  'Conference', 'Referral from a colleague', 'Partner / Reseller', 'Blog / Newsletter',
  'News article', 'Other'
];

const inputCls =
  'w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';
const selectCls =
  'w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('');
  const [sector, setSector] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [referral, setReferral] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !org.trim() || !password.trim() || !country || !sector) {
      setError('Please complete all required fields to create your workspace.');
      return;
    }
    setLoading(true);
    setError('');
    window.setTimeout(() => {
      document.cookie = `sentinel_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-session;path=/;max-age=86400;SameSite=Lax`;
      router.push('/onboarding');
    }, 500);
  };

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

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[var(--surface)] p-6 shadow-panel sm:p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Create your workspace</h1>
        <p className="mt-1.5 text-sm text-slate-400">Tell us a little about your organization so we can tailor your governance plane.</p>

        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Full name <span className="text-sentinel-300">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label htmlFor="job-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Job title
            </label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Chief Information Security Officer"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label htmlFor="reg-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company or government email <span className="text-sentinel-300">*</span>
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.gov"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label htmlFor="org" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Organization <span className="text-sentinel-300">*</span>
            </label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="org"
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="Acme Corp"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Country <span className="text-sentinel-300">*</span>
            </label>
            <div className="relative">
              <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${selectCls} ${country ? '' : 'text-slate-500'}`}
              >
                <option value="" disabled className="bg-slate-950 text-slate-500">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-slate-950 text-white">{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="sector" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sector <span className="text-sentinel-300">*</span>
            </label>
            <div className="relative">
              <ShieldAlert className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <select
                id="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className={`${selectCls} ${sector ? '' : 'text-slate-500'}`}
              >
                <option value="" disabled className="bg-slate-950 text-slate-500">Select sector</option>
                {sectors.map((s) => (
                  <option key={s} value={s} className="bg-slate-950 text-white">{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="referral" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Where did you hear about us?
            </label>
            <div className="relative">
              <Megaphone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <select
                id="referral"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                className={`${selectCls} ${referral ? '' : 'text-slate-500'}`}
              >
                <option value="" disabled className="bg-slate-950 text-slate-500">Select an option</option>
                {referralSources.map((r) => (
                  <option key={r} value={r} className="bg-slate-950 text-white">{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="reg-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Password <span className="text-sentinel-300">*</span>
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 12 characters"
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-4 w-4" size={16} /> : <Eye className="h-4 w-4" size={16} />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="flex items-center gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300 sm:col-span-2">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" size={14} /> {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          >
            {loading ? 'Creating workspace...' : 'Create workspace'}
          </button>

          <p className="text-center text-[0.65rem] leading-4 text-slate-500 sm:col-span-2">
            By creating an account you agree to the <Link href="/terms" className="text-slate-400 underline underline-offset-2 hover:text-white">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-slate-400 underline underline-offset-2 hover:text-white">Privacy Policy</Link>.
          </p>
        </form>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Sign in
        </Link>
      </p>
    </div>
  );
}