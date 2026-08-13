import { ArrowRight, Box, Braces, Cloud, Database, GitBranch, Globe2, KeyRound, Layers, ShieldCheck, Workflow } from 'lucide-react';
import Link from 'next/link';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const categories = [
  {
    name: 'AI providers',
    icon: Cloud,
    description: 'Connect every model endpoint your teams use — hosted or self-hosted.',
    providers: ['OpenAI', 'Anthropic', 'Google Vertex AI', 'Azure OpenAI', 'Amazon Bedrock', 'Mistral']
  },
  {
    name: 'Data sources',
    icon: Database,
    description: 'Scan and classify data where it lives — warehouses, lakes, and SaaS.',
    providers: ['Snowflake', 'PostgreSQL', 'Amazon S3', 'Databricks', 'BigQuery', 'Kafka']
  },
  {
    name: 'Identity & access',
    icon: KeyRound,
    description: 'Align governance roles with the identity provider you already run.',
    providers: ['Okta', 'Microsoft Entra ID', 'Ping Identity', 'Google Workspace', 'SAML', 'SCIM']
  },
  {
    name: 'Security operations',
    icon: ShieldCheck,
    description: 'Stream gateway decisions and incidents into your existing SOC tooling.',
    providers: ['Splunk', 'Datadog', 'AWS Security Hub', 'PagerDuty', 'ServiceNow', 'Jira']
  },
  {
    name: 'CI/CD & developer tools',
    icon: GitBranch,
    description: 'Test policies and scan prompts in the same pipelines your engineers trust.',
    providers: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 'Helm', 'Kubernetes']
  },
  {
    name: 'Governance platforms',
    icon: Workflow,
    description: 'Publish AI inventory and audit evidence to your GRC system of record.',
    providers: ['OneTrust', 'Vanta', 'Drata', 'Secureframe', 'SAP GRC', 'ServiceNow GRC']
  }
];

const protocols = [
  { icon: Braces, label: 'REST API', detail: 'Full CRUD for registry, policies, and reports' },
  { icon: Layers, label: 'OpenAI-compatible proxy', detail: 'Drop-in base URL replacement' },
  { icon: Box, label: 'Webhooks', detail: 'Real-time events for decisions and incidents' },
  { icon: Globe2, label: 'SDKs', detail: 'TypeScript, Python, Go, and Java' }
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Integrations"
        title="Govern AI across the stack you already run."
        description="Sentinel connects to your providers, data sources, identity layer, and SOC tooling — so governance fits the workflow instead of fighting it."
        primary={{ label: 'Browse developer docs', href: '/developers' }}
        secondary={{ label: 'Request an integration', href: '/contact' }}
      />

      <section className="space-y-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Integration catalog</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Build on everything, govern across all of it</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categories.map(({ name, icon: Icon, description, providers }) => (
            <div
              key={name}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-white sm:text-base">{name}</h3>
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {providers.map((provider) => (
                  <span
                    key={provider}
                    className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-1 text-[0.65rem] font-medium text-slate-300"
                  >
                    {provider}
                  </span>
                ))}
              </div>
              <Link
                href="/developers"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-sentinel-300 transition hover:text-sentinel-200"
              >
                Integration guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {protocols.map(({ icon: Icon, label, detail }) => (
          <div
            key={label}
            className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">{label}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{detail}</p>
          </div>
        ))}
      </section>

      <CtaSection
        eyebrow="Missing something?"
        title="Build a custom integration in an afternoon."
        description="Every integration is built on the same public API — if your tool can call REST, Sentinel can govern it."
        primary={{ label: 'Read API docs', href: '/developers' }}
        secondary={{ label: 'Talk to our team', href: '/contact' }}
      />
    </div>
  );
}
