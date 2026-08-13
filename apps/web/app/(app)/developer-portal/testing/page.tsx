'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Field, SelectInput, SaveButton } from '@/components/platform/settings-form';
import { CodeBlock } from '@/components/platform/code-block';

const methods = ['GET', 'POST', 'PATCH', 'DELETE'];

const responses: Record<string, { status: number; body: string }> = {
  GET: { status: 200, body: '{\n  "data": [\n    {\n      "id": "req-10032",\n      "decision": "Allowed",\n      "latencyMs": 212,\n      "tokens": 1840\n    }\n  ],\n  "nextCursor": "abc123",\n  "total": 1284902\n}' },
  POST: { status: 201, body: '{\n  "data": {\n    "id": "req-10033",\n    "decision": "Allowed",\n    "category": "Internal",\n    "latencyMs": 344,\n    "tokens": 512\n  }\n}' },
  PATCH: { status: 200, body: '{\n  "data": {\n    "id": "pol-7",\n    "status": "Active",\n    "updatedAt": "2026-08-13T09:10:00Z"\n  }\n}' },
  DELETE: { status: 204, body: '' }
};

export default function Page() {
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('https://api.sentinel.ai/v1/requests');
  const [body, setBody] = useState('{\n  "model": "gpt-4.1",\n  "messages": [{ "role": "user", "content": "Hello" }]\n}');
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState<{ status: number; body: string } | null>(null);

  const send = () => {
    setSending(true);
    setTimeout(() => {
      setResponse(responses[method] ?? responses.GET);
      setSending(false);
    }, 700);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="API Testing"
        description="Send test requests against the gateway using your saved credentials."
      />

      <Card>
        <CardHeader title="Request" subtitle="Compose a request to the Sentinel API" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr]">
            <Field label="Method">
              <SelectInput value={method} onChange={setMethod} options={methods.map((m) => ({ value: m, label: m }))} />
            </Field>
            <Field label="URL">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 font-mono text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Body">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 font-mono text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={send}
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-50"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? 'Sending...' : 'Send Request'}
            </button>
            <SaveButton label="Save as Example" />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Response"
          subtitle={response ? `Request completed with status ${response.status}` : 'Send a request to see the response'}
        />
        <CardBody>
          {response ? (
            <div className="space-y-3">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${response.status < 300 ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/25 bg-amber-500/10 text-amber-300'}`}>
                {response.status}
              </span>
              {response.body ? <CodeBlock code={response.body} /> : <p className="text-xs text-slate-400">No content returned.</p>}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-xs text-slate-500">
              Response will appear here
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}