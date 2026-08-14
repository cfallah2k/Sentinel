'use client';

import { useState } from 'react';
import { CalendarDays, Check, Clock, Send, User } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';

const useCases = ['AI governance review', 'Nigeria / Ghana DPA readiness', 'Incident response', 'Compliance automation', 'Gateway deployment', 'Other'];

const inputStyles =
  'w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/50 focus:ring-2 focus:ring-sentinel-500/20';

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [useCase, setUseCase] = useState(useCases[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !company) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Request a demo"
        title="See Sentinel govern your AI stack in 30 minutes."
        description="A live walkthrough of the gateway, policy engine, classification, and audit trail — tailored to your providers and compliance obligations."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { label: 'Duration', value: '30 minutes', icon: Clock },
            { label: 'Audience', value: 'Security & data', icon: User },
            { label: 'Format', value: 'Live or recorded', icon: CalendarDays }
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl">
              <Icon className="h-4 w-4 text-sentinel-300" />
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                <Check className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-white">Demo request received</h2>
              <p className="mt-2 max-w-sm text-sm leading-7 text-slate-400">
                Thanks, {name.split(' ')[0] || 'there'}. A solutions engineer will reach out to {email} within one
                business day to schedule your walkthrough.
              </p>
              <button
                type="button"
                className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setCompany('');
                }}
              >
                Request another demo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Schedule a walkthrough</p>
                <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Tell us about your stack</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold text-slate-300">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Alex Rivera"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold text-slate-300">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="alex@company.com"
                    className={inputStyles}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="mb-2 block text-xs font-semibold text-slate-300">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  required
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Acme Corp"
                  className={inputStyles}
                />
              </div>
              <div>
                <span className="mb-2 block text-xs font-semibold text-slate-300">Primary use case</span>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setUseCase(item)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                        useCase === item
                          ? 'border-sentinel-500/50 bg-sentinel-500/15 text-sentinel-200'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto"
              >
                Request demo <Send className="h-4 w-4" />
              </button>
              <p className="text-xs leading-6 text-slate-500">
                No sales pressure, no contracts. Just a technical walkthrough of the platform.
              </p>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">What you will see</p>
            <ul className="mt-5 space-y-3">
              {[
                'Live gateway traffic with policy decisions',
                'Classification and redaction in action',
                'AI passports and system registry',
                'Audit trail and compliance evidence',
                'Incident triage and approval flows'
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs leading-6 text-slate-300 sm:text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Prefer to explore alone?</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Create a free workspace and run the gateway against your own providers in under an hour.
            </p>
            <a
              href="/register"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sentinel-300 transition hover:text-sentinel-200 sm:text-sm"
            >
              Start free trial
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
