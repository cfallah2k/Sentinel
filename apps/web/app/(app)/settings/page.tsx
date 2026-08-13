import {
  Bell,
  Building2,
  CreditCard,
  Database,
  FileDown,
  Gauge,
  Globe,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  Plug,
  ScanFace,
  ScrollText,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserCog,
  Users,
  Webhook
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody } from '@/components/ui/card';
import { currentOrg, currentUser } from '@/lib/mock-data';

const sections = [
  { label: 'General', description: 'Organization name, slug and region', href: '/settings/general', icon: Settings2 },
  { label: 'Organization', description: 'Profile, seats and plan identity', href: '/settings/organization', icon: Building2 },
  { label: 'Security', description: 'Score, MFA posture and auth events', href: '/settings/security', icon: ShieldCheck },
  { label: 'Authentication', description: 'Password policy and session rules', href: '/settings/authentication', icon: Lock },
  { label: 'MFA', description: 'Multi-factor enrollment and methods', href: '/settings/mfa', icon: ScanFace },
  { label: 'SSO', description: 'Okta, Azure AD and Google connections', href: '/settings/sso', icon: UserCog },
  { label: 'Domains', description: 'Verified domains for invitations', href: '/settings/domains', icon: Globe },
  { label: 'Roles', description: 'Role definitions and scopes', href: '/settings/roles', icon: Users },
  { label: 'Permissions', description: 'Capability matrix across roles', href: '/settings/permissions', icon: KeyRound },
  { label: 'Notifications', description: 'Alerts for incidents, approvals and usage', href: '/settings/notifications', icon: Bell },
  { label: 'Email', description: 'SMTP and outbound templates', href: '/settings/email', icon: Mail },
  { label: 'Webhooks', description: 'Delivery endpoints and signing', href: '/settings/webhooks', icon: Webhook },
  { label: 'API', description: 'Rate limits, CORS and key policies', href: '/settings/api', icon: Plug },
  { label: 'Data', description: 'Redaction, encryption and processing', href: '/settings/data', icon: Database },
  { label: 'Data Retention', description: 'Windows for logs, requests and payloads', href: '/settings/data-retention', icon: SlidersHorizontal },
  { label: 'Privacy', description: 'DPO contact and data subject controls', href: '/settings/privacy', icon: Lock },
  { label: 'Audit', description: 'Organization audit trail', href: '/settings/audit', icon: ScrollText },
  { label: 'Integrations', description: 'Connectors across the hub', href: '/settings/integrations', icon: Plug },
  { label: 'Developer', description: 'SDK, testing and changelog', href: '/settings/developer', icon: Laptop },
  { label: 'Billing', description: 'Plan, invoices and payment methods', href: '/settings/billing', icon: CreditCard },
  { label: 'Usage', description: 'Requests, tokens and cost', href: '/settings/usage', icon: Gauge },
  { label: 'Export', description: 'Data export jobs and formats', href: '/settings/export', icon: FileDown },
  { label: 'Danger Zone', description: 'Destructive organization actions', href: '/settings/danger-zone', icon: Trash2 }
];

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Settings"
        description={`Configuration for ${currentOrg.name} — ${currentUser.role}.`}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-start gap-3.5 rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-4.5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-4.5 w-4.5" size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">{s.label}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-slate-400">{s.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Card className="h-fit">
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sentinel-500/25 bg-sentinel-500/10 text-sm font-bold text-sentinel-300">
                {currentOrg.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{currentOrg.name}</p>
                <p className="text-[0.65rem] text-slate-500">{currentOrg.slug}.sentinel.ai</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 border-t border-white/5 pt-4">
              {[
                { label: 'Plan', value: currentOrg.plan },
                { label: 'Seats', value: String(currentOrg.seats) },
                { label: 'Region', value: currentOrg.region },
                { label: 'Industry', value: currentOrg.industry },
                { label: 'Created', value: currentOrg.created }
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between text-xs">
                  <dt className="text-slate-500">{r.label}</dt>
                  <dd className="font-semibold text-slate-200">{r.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-2xl border border-sentinel-500/20 bg-sentinel-500/5 px-4 py-3 text-xs text-slate-400">
              Signed in as <span className="font-semibold text-slate-200">{currentUser.email}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}