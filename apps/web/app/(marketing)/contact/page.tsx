'use client';

import { useState } from 'react';
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';

const officeLocations = [
  {
    city: 'San Francisco',
    region: 'United States',
    address: '535 Mission Street, Suite 1200',
    type: 'Headquarters'
  },
  {
    city: 'London',
    region: 'United Kingdom',
    address: '1 Finsbury Avenue, Floor 7',
    type: 'EMEA office'
  },
  {
    city: 'Singapore',
    region: 'Singapore',
    address: 'Marina Bay Financial Centre, Tower 3',
    type: 'APAC office'
  }
];

const contactTopics = ['Sales', 'Security & compliance', 'Support', 'Partnerships', 'Careers', 'Press'];

const inputStyles =
  'w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/50 focus:ring-2 focus:ring-sentinel-500/20';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState('Sales');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Contact"
        title="Talk to the team building the AI governance control plane."
        description="Whether you are evaluating Sentinel, have a security question, or want to partner — we reply within one business day."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                <Check className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-white">Message sent</h2>
              <p className="mt-2 max-w-sm text-sm leading-7 text-slate-400">
                Thanks, {email.split('@')[0] || 'friend'}. Our team will get back to you within one business day.
              </p>
              <button
                type="button"
                className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm"
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  setCompany('');
                  setMessage('');
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Send a message</p>
                <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">We usually reply within a day</h2>
              </div>
              <div>
                <label htmlFor="topic" className="mb-2 block text-xs font-semibold text-slate-300">
                  Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactTopics.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTopic(item)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                        topic === item
                          ? 'border-sentinel-500/50 bg-sentinel-500/15 text-sentinel-200'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
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
                    placeholder="you@company.com"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-xs font-semibold text-slate-300">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Acme Corp"
                    className={inputStyles}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us about your AI estate and what you are trying to govern."
                  className={`${inputStyles} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto"
              >
                Send message <Send className="h-4 w-4" />
              </button>
              <p className="text-xs leading-6 text-slate-500">
                By submitting, you agree to our{' '}
                <a href="/legal/privacy" className="text-sentinel-300 hover:text-sentinel-200">
                  privacy policy
                </a>
                .
              </p>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</p>
                <a href="mailto:sales@sentinel.ai" className="text-sm font-semibold text-white transition hover:text-sentinel-200">
                  sales@sentinel.ai
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Phone</p>
                <a href="tel:+14155550132" className="text-sm font-semibold text-white transition hover:text-sentinel-200">
                  +1 (415) 555-0132
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Response time</p>
                <p className="text-sm font-semibold text-white">Within one business day</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Security disclosures</p>
                <a href="/legal/security" className="text-sm font-semibold text-white transition hover:text-sentinel-200">
                  Report a vulnerability
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Our offices</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Global reach, remote-friendly by default</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {officeLocations.map((office) => (
            <div
              key={office.city}
              className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-sentinel-500/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sentinel-300">
                <MapPin className="h-3 w-3" />
                {office.type}
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{office.city}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{office.region}</p>
              <p className="mt-3 text-xs leading-6 text-slate-400">{office.address}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
