import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MethodBadge } from '@/components/platform/shared';
import { CodeBlock } from '@/components/platform/code-block';
import { apiEndpoints } from '@/components/platform/developer-data';

export default function Page() {
  const auth = apiEndpoints.reduce((acc, e) => {
    acc[e.auth] = (acc[e.auth] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="API Reference"
        description="The Sentinel v1 API. All endpoints return JSON with a consistent error envelope. Requests are authenticated with an API key or OAuth token."
      />

      <div className="flex flex-wrap gap-2">
        {Object.entries(auth).map(([a, n]) => (
          <Badge key={a} label={`${a} · ${n} endpoints`} tone="blue" />
        ))}
      </div>

      <Card>
        <CardHeader title="Endpoints" subtitle="13 resources under the v1 namespace" />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Method</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Path</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Description</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Auth</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((e) => (
                  <tr key={`${e.method}-${e.path}`} className="border-b border-white/5 text-xs text-slate-300 transition hover:bg-white/[0.03]">
                    <td className="px-4 py-3"><MethodBadge method={e.method} /></td>
                    <td className="px-4 py-3 font-mono text-sentinel-300">{e.path}</td>
                    <td className="px-4 py-3 text-slate-400">{e.description}</td>
                    <td className="px-4 py-3"><Badge label={e.auth} tone={e.auth === 'Public' ? 'slate' : 'cyan'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Authentication" subtitle="How requests are authorized" />
          <CardBody className="space-y-3">
            <CodeBlock
              label="Bearer token"
              code={'curl https://api.sentinel.ai/v1/requests \\\n  -H "Authorization: Bearer sk_live_8f3k...9a2c" \\\n  -H "Content-Type: application/json"'}
            />
            <CodeBlock
              label="Error envelope"
              code={'{\n  "error": {\n    "code": "rate_limited",\n    "message": "Request quota exceeded for this key",\n    "retryAfter": 14\n  }\n}'}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Pagination & filtering" subtitle="Common query conventions" />
          <CardBody className="space-y-3">
            <CodeBlock
              label="List with filters"
              code={'GET /v1/requests?decision=blocked&from=2026-08-01&to=2026-08-13&limit=50&cursor=abc123'}
            />
            <p className="text-xs leading-5 text-slate-400">
              List endpoints return <span className="font-mono text-slate-200">data</span>, <span className="font-mono text-slate-200">nextCursor</span> and <span className="font-mono text-slate-200">total</span>.
              Pass <span className="font-mono text-slate-200">nextCursor</span> to page through results. Filters are applied server-side before pagination.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}